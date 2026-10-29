import { stripe, isStripeConfigured, cryptoProvider } from "../_shared/stripeClient.ts";
import { markOrderPaid, setOrderPaymentStatus, paidExtras } from "../_shared/supabaseAdmin.ts";
import { sendOrderPaidNotifications } from "../_shared/orderNotifications.ts";

// Stripe calls this directly (not from the browser), so it must run
// WITHOUT Supabase's default JWT verification. This is already set via
// supabase/config.toml ([functions.stripe-webhook] verify_jwt = false),
// so a normal `supabase functions deploy stripe-webhook` picks it up -
// no need to pass --no-verify-jwt by hand. Signature verification below
// is what actually secures this endpoint instead - only requests signed
// with your real STRIPE_WEBHOOK_SECRET are accepted.
//
// Events to enable on the endpoint (Stripe Dashboard -> Webhooks):
//   checkout.session.completed               - card / wallet payments (paid immediately)
//   checkout.session.async_payment_succeeded - delayed methods that settle later
//   checkout.session.async_payment_failed    - delayed methods that didn't
//   checkout.session.expired                 - shopper abandoned checkout
//   charge.refunded                          - refunds issued from the Dashboard
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");

type CheckoutSession = {
  id: string;
  payment_status: string;
  amount_total: number | null;
  metadata?: { orderId?: string };
};

async function confirmPaid(session: CheckoutSession) {
  const orderId = session.metadata?.orderId;
  const { order, changed } = await markOrderPaid(orderId, paidExtras(session));
  console.log(`[stripe webhook] order ${orderId} paid (session ${session.id})${changed ? "" : " - already recorded"}`);
  if (changed && order) await sendOrderPaidNotifications(order);
}

Deno.serve(async (req: Request) => {
  if (!isStripeConfigured || !stripe || !STRIPE_WEBHOOK_SECRET) {
    return new Response("Webhook not configured.", { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      STRIPE_WEBHOOK_SECRET,
      undefined,
      cryptoProvider
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", (err as Error).message);
    return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as CheckoutSession;
        // Delayed methods complete the session while still "unpaid" -
        // they're confirmed later by async_payment_succeeded.
        if (session.payment_status === "paid" || session.payment_status === "no_payment_required") {
          await confirmPaid(session);
        }
        break;
      }
      case "checkout.session.async_payment_succeeded":
        await confirmPaid(event.data.object as CheckoutSession);
        break;
      case "checkout.session.async_payment_failed":
        await setOrderPaymentStatus((event.data.object as CheckoutSession).metadata?.orderId, "failed");
        break;
      case "checkout.session.expired":
        await setOrderPaymentStatus((event.data.object as CheckoutSession).metadata?.orderId, "expired");
        break;
      case "charge.refunded": {
        const charge = event.data.object as { payment_intent?: string; refunded?: boolean };
        // Only a full refund marks the order refunded; partial refunds stay "paid".
        if (charge.payment_intent && charge.refunded) {
          const sessions = await stripe.checkout.sessions.list({ payment_intent: charge.payment_intent, limit: 1 });
          await setOrderPaymentStatus(sessions.data[0]?.metadata?.orderId, "refunded");
        }
        break;
      }
    }
  } catch (err) {
    // A 500 makes Stripe retry the event later, which is what we want if
    // e.g. the database was briefly unreachable.
    console.error(`[stripe webhook] failed handling ${event.type}:`, (err as Error).message);
    return new Response("Handler error", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
