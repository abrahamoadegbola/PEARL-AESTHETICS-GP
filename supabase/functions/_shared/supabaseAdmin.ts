// service_role client - bypasses Row Level Security entirely. Only used
// inside edge functions (never sent to the browser). Supabase
// automatically provides SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to
// every edge function's environment - you don't need to set these
// yourself as secrets, they're already there.
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Fetches an order by id, bypassing RLS. Used by checkout-session-status
// to hand the confirmed order back to the (anonymous) shopper on the
// success page - orders' SELECT policy is admin-only, so the frontend
// can't query this directly with the anon key. Knowing the specific
// orderId (tied to a verified Stripe session) is what authorizes this.
export async function getOrderById(orderId: string | undefined) {
  if (!orderId) return null;
  const { data, error } = await supabaseAdmin.from("orders").select("*").eq("id", orderId).maybeSingle();
  if (error) {
    console.error(`[supabaseAdmin] failed to fetch order ${orderId}:`, error.message);
    return null;
  }
  return data;
}

// Marks an order paid and decrements stock for its line items. Idempotent -
// skips the write if the order is already paid. Returns the current (or
// updated) order row either way.
export async function markOrderPaid(orderId: string | undefined) {
  const order = await getOrderById(orderId);
  if (!order) return null;
  if (order.payment_status === "paid") return order;

  const { error: updateError } = await supabaseAdmin
    .from("orders")
    .update({ payment_status: "paid" })
    .eq("id", orderId);

  if (updateError) {
    console.error(`[supabaseAdmin] failed to mark order ${orderId} paid:`, updateError.message);
    return order;
  }

  for (const item of order.items || []) {
    const { error: stockError } = await supabaseAdmin.rpc("decrement_stock", {
      p_id: item.id,
      p_qty: item.qty,
    });
    if (stockError) {
      console.error(`[supabaseAdmin] failed to decrement stock for ${item.id}:`, stockError.message);
    }
  }

  return { ...order, payment_status: "paid" };
}
