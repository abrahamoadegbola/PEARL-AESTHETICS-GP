import { stripe, isStripeConfigured, cryptoProvider } from "../_shared/stripeClient.ts";
import { markOrderPaid } from "../_shared/supabaseAdmin.ts";

// Stripe calls this directly (not from the browser), so it must run
// WITHOUT Supabase's default JWT verification. This is already set via
// supabase/config.toml ([functions.stripe-webhook] verify_jwt = false),
// so a normal `supabase functions deploy stripe-webhook` picks it up -
// no need to pass --no-verify-jwt by hand. Signature verification below
// is what actually secures this endpoint instead - only requests signed
// with your real STRIPE_WEBHOOK_SECRET are accepted.
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");

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

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object as { metadata?: { orderId?: string }; id: string };
    const orderId = session.metadata?.orderId;
    console.log(`[stripe webhook] payment confirmed for order ${orderId} (session ${session.id})`);
    await markOrderPaid(orderId);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
