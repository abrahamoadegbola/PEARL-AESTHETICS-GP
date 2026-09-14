import { corsHeaders } from "../_shared/cors.ts";
import { stripe, isStripeConfigured } from "../_shared/stripeClient.ts";

// The site's real public URL, used to build Stripe's success/cancel
// redirect links. Set this as a secret once you know your frontend's
// deployed domain - see README.
const CLIENT_URL = Deno.env.get("CLIENT_URL") || "http://localhost:5173";

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
    const { orderId, items, customerEmail } = await req.json();

    if (!orderId || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "orderId and a non-empty items array are required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const line_items = items.map((item: { name: string; price: number; qty: number }) => ({
      quantity: item.qty,
      price_data: {
        currency: "aed",
        unit_amount: Math.round(item.price * 100),
        product_data: { name: item.name },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: customerEmail || undefined,
      metadata: { orderId },
      success_url: `${CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order=${orderId}`,
      cancel_url: `${CLIENT_URL}/checkout/cancel?order=${orderId}`,
    });

    return new Response(JSON.stringify({ url: session.url, id: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to create checkout session:", (err as Error).message);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
