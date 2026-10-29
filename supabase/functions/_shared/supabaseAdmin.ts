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

// Marks an order paid and decrements stock for its line items. The
// update is conditional (only rows not already paid), so when the success
// page and the Stripe webhook race each other only one of them wins -
// stock is decremented and the receipt is sent exactly once. Returns
// { order, changed }: `changed` is true only for the call that flipped it.
export async function markOrderPaid(orderId: string | undefined, extra: Record<string, unknown> = {}) {
  if (!orderId) return { order: null, changed: false };

  const { data: updated, error: updateError } = await supabaseAdmin
    .from("orders")
    .update({ payment_status: "paid", ...extra })
    .eq("id", orderId)
    .neq("payment_status", "paid")
    .select("*");

  if (updateError) {
    console.error(`[supabaseAdmin] failed to mark order ${orderId} paid:`, updateError.message);
    return { order: await getOrderById(orderId), changed: false };
  }

  if (!updated || updated.length === 0) {
    // Already paid (or doesn't exist) - nothing else to do.
    return { order: await getOrderById(orderId), changed: false };
  }

  const order = updated[0];
  for (const item of order.items || []) {
    const { error: stockError } = await supabaseAdmin.rpc("decrement_stock", {
      p_id: item.id,
      p_qty: item.qty,
    });
    if (stockError) {
      console.error(`[supabaseAdmin] failed to decrement stock for ${item.id}:`, stockError.message);
    }
  }

  return { order, changed: true };
}

// Sets payment_status to anything other than "paid" (failed, expired,
// refunded). Never downgrades a paid order to failed/expired - a late
// "expired" event for a session that was already paid is just noise.
export async function setOrderPaymentStatus(orderId: string | undefined, status: string) {
  if (!orderId) return;
  let query = supabaseAdmin.from("orders").update({ payment_status: status }).eq("id", orderId);
  if (status !== "refunded") query = query.neq("payment_status", "paid");
  const { error } = await query;
  if (error) console.error(`[supabaseAdmin] failed to set order ${orderId} to ${status}:`, error.message);
}

// What Stripe actually charged (promo codes can change it) and which
// session paid, saved onto the order alongside payment_status.
export function paidExtras(session: { id: string; amount_total: number | null }) {
  return {
    stripe_session_id: session.id,
    ...(session.amount_total != null ? { total: session.amount_total / 100 } : {}),
  };
}
