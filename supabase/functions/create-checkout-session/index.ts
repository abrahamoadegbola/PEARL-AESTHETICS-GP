import type Stripe from "npm:stripe@17.7.0";
import { corsHeaders } from "../_shared/cors.ts";
import { stripe, isStripeConfigured } from "../_shared/stripeClient.ts";
import { supabaseAdmin, getOrderById } from "../_shared/supabaseAdmin.ts";

// The site's real public URL, used to build Stripe's success/cancel
// redirect links. Set this as a secret once you know your frontend's
// deployed domain - see README.
const CLIENT_URL = Deno.env.get("CLIENT_URL") || "http://localhost:5173";

// Optional switches (all off by default):
//   STRIPE_PAYMENT_METHOD_TYPES=card,link   - pin specific methods. Leave
//     unset to use dynamic payment methods: every method switched on in
//     Dashboard -> Settings -> Payment methods (cards, Apple Pay, Google
//     Pay, Link, and any regional/BNPL methods available for AED) shows up
//     automatically, with no code change.
//   STRIPE_ALLOW_PROMOTION_CODES=true       - show a promo-code box
//   STRIPE_INVOICES=true                    - email a PDF invoice/receipt (Stripe Invoicing fees apply)
const PAYMENT_METHOD_TYPES = (Deno.env.get("STRIPE_PAYMENT_METHOD_TYPES") || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const ALLOW_PROMOTION_CODES = Deno.env.get("STRIPE_ALLOW_PROMOTION_CODES") === "true";
const CREATE_INVOICES = Deno.env.get("STRIPE_INVOICES") === "true";

// Must match src/pages/CartCheckout.jsx - the cart shows these numbers,
// this is what's actually charged.
const TAX_RATE = 0.05;
const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_FEE = 25;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (!isStripeConfigured || !stripe) {
    return json({ error: "Stripe is not configured yet." }, 500);
  }

  try {
    const { orderId } = await req.json();
    if (!orderId) return json({ error: "orderId is required." }, 400);

    const order = await getOrderById(orderId);
    if (!order) return json({ error: "Order not found." }, 404);
    if (order.payment_status === "paid") return json({ error: "This order has already been paid." }, 409);

    const cartItems: { id: string; qty: number }[] = order.items || [];
    if (cartItems.length === 0) return json({ error: "This order has no items." }, 400);

    // Re-price every line from the products table. The order row was
    // written by the shopper's browser, so its prices can't be trusted.
    const { data: products, error: productsError } = await supabaseAdmin
      .from("products")
      .select("id, name, price, stock, active, image")
      .in("id", cartItems.map((i) => i.id));
    if (productsError) throw productsError;

    const items = [];
    for (const { id, qty } of cartItems) {
      const product = products?.find((p) => p.id === id);
      if (!product || !product.active) return json({ error: `"${id}" is no longer available.` }, 409);
      const quantity = Math.max(1, Math.floor(Number(qty) || 1));
      if (product.stock < quantity) {
        return json({ error: `Only ${product.stock} of ${product.name} left in stock.` }, 409);
      }
      items.push({ id, name: product.name, price: Number(product.price), qty: quantity, image: product.image });
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + shipping + tax;
    const customerEmail = order.customer?.email || undefined;

    const line_items = [
      ...items.map((item) => ({
        quantity: item.qty,
        price_data: {
          currency: "aed",
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: item.name,
            ...(item.image?.startsWith("https://") ? { images: [item.image] } : {}),
          },
        },
      })),
      {
        quantity: 1,
        price_data: {
          currency: "aed",
          unit_amount: Math.round(tax * 100),
          product_data: { name: "VAT (5%)" },
        },
      },
    ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: shipping === 0 ? "Free delivery (UAE)" : "Standard delivery (UAE)",
            fixed_amount: { amount: Math.round(shipping * 100), currency: "aed" },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 3 },
            },
          },
        },
      ],
      ...(PAYMENT_METHOD_TYPES.length > 0
        ? { payment_method_types: PAYMENT_METHOD_TYPES as Stripe.Checkout.SessionCreateParams.PaymentMethodType[] }
        : {}),
      customer_email: customerEmail,
      customer_creation: "always",
      client_reference_id: orderId,
      metadata: { orderId },
      payment_intent_data: {
        description: `Pearl Aesthetics order ${orderId}`,
        metadata: { orderId },
        ...(customerEmail ? { receipt_email: customerEmail } : {}),
      },
      ...(CREATE_INVOICES
        ? { invoice_creation: { enabled: true, invoice_data: { description: `Order ${orderId}`, metadata: { orderId } } } }
        : {}),
      allow_promotion_codes: ALLOW_PROMOTION_CODES || undefined,
      billing_address_collection: "auto",
      locale: "auto",
      success_url: `${CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order=${orderId}`,
      cancel_url: `${CLIENT_URL}/checkout/cancel?order=${orderId}`,
    });

    // Correct the order to the server-side prices and remember the session.
    const { error: updateError } = await supabaseAdmin
      .from("orders")
      .update({
        items: items.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
        subtotal,
        shipping,
        tax,
        total,
        stripe_session_id: session.id,
      })
      .eq("id", orderId);
    if (updateError) console.error(`[create-checkout-session] couldn't update order ${orderId}:`, updateError.message);

    return json({ url: session.url, id: session.id });
  } catch (err) {
    console.error("Failed to create checkout session:", (err as Error).message);
    return json({ error: (err as Error).message }, 500);
  }
});
