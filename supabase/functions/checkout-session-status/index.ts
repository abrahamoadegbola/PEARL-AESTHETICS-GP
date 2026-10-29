import { corsHeaders } from "../_shared/cors.ts";
import { stripe, isStripeConfigured } from "../_shared/stripeClient.ts";
import { markOrderPaid, getOrderById, paidExtras } from "../_shared/supabaseAdmin.ts";
import { sendOrderPaidNotifications } from "../_shared/orderNotifications.ts";

function mapOrder(order: Record<string, unknown> | null) {
  if (!order) return null;
  return {
    id: order.id,
    items: order.items,
    customer: order.customer,
    subtotal: order.subtotal,
    shipping: order.shipping,
    tax: order.tax,
    total: order.total,
    paymentMethod: order.payment_method,
    paymentStatus: order.payment_status,
    fulfillmentStatus: order.fulfillment_status,
    createdAt: order.created_at,
  };
}

// Called by the success page after Stripe redirects the shopper back.
// This is also where the order actually gets marked paid (via the
// service_role key) - the shopper's own browser can't do this directly,
// since the orders table's RLS policy only allows admins to UPDATE or
// SELECT orders (customers can only INSERT at checkout). Returning the
// full order here (fetched with the service_role key, which bypasses
// that same RLS) is what lets the success page show order details to an
// anonymous shopper without opening up direct table access to everyone -
// knowing the specific orderId tied to a verified Stripe session is what
// authorizes this. Runs the same confirmation as stripe-webhook, so it
// works whether or not the webhook is set up yet.
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!isStripeConfigured || !stripe) {
    return new Response(JSON.stringify({ error: "Stripe is not configured yet." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { sessionId } = await req.json();
    if (!sessionId) {
      return new Response(JSON.stringify({ error: "sessionId is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const orderId = session.metadata?.orderId;

    let order;
    if (session.payment_status === "paid") {
      const result = await markOrderPaid(orderId, paidExtras(session));
      order = result.order;
      // Only the call that actually flipped the order sends the receipt -
      // if the webhook got there first, this is a no-op.
      if (result.changed && order) await sendOrderPaidNotifications(order);
    } else {
      order = await getOrderById(orderId);
    }

    return new Response(
      JSON.stringify({
        id: session.id,
        paymentStatus: session.payment_status,
        orderId,
        amountTotal: session.amount_total,
        currency: session.currency,
        order: mapOrder(order),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Failed to retrieve checkout session:", (err as Error).message);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
