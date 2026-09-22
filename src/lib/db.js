import { supabase, isSupabaseConfigured } from "./supabaseClient";

// Real data layer backed by Supabase (Postgres). Run supabase/schema.sql
// in your project's SQL Editor once before using this. See README for
// full setup steps.
//
// Every function throws a clear error if Supabase isn't configured yet
// (missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) rather than
// silently failing - callers surface that message in the UI.

function assertConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Supabase isn't configured yet - add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env."
    );
  }
}

// Generates an id client-side for anonymous inserts (bookings, orders).
// This matters because of how Postgres RLS + Supabase's .insert().select()
// interact: bookings/orders' SELECT policy is admin-only (so a patient
// can't browse other patients' bookings/orders), but .insert().select()
// tries to read the row back immediately after inserting it - which an
// anonymous visitor isn't allowed to do, even for the row they just
// created. Generating the id ourselves and skipping .select() on these
// two inserts avoids that read-back entirely, so we never need to loosen
// who can SELECT from these tables.
function makeId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function mapProductRow(row) {
  if (!row) return row;
  return { ...row, longDescription: row.long_description };
}

function mapTreatmentRow(row) {
  if (!row) return row;
  return { ...row, priceFrom: row.price_from, priceLabel: row.price_label, durationMinutes: row.duration_minutes };
}

function mapOrderRow(row) {
  if (!row) return row;
  return {
    ...row,
    paymentMethod: row.payment_method,
    paymentStatus: row.payment_status,
    fulfillmentStatus: row.fulfillment_status,
    stripeSessionId: row.stripe_session_id,
    createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
  };
}

function mapBookingRow(row) {
  if (!row) return row;
  return { ...row, createdAt: row.created_at ? new Date(row.created_at).getTime() : Date.now() };
}

// ---------- Realtime subscription (for useDbCollection) ----------

// Subscribes to INSERT/UPDATE/DELETE on the three tables the admin panel
// cares about, and calls `callback` on any change. Returns an unsubscribe
// function. If Supabase isn't configured, this is a no-op (returns a
// no-op unsubscribe) - callers still get their initial fetch attempt,
// which will surface the "not configured" error.
// Each call gets its own uniquely-named realtime channel. This matters
// because a single page can mount several useDbCollection() hooks at
// once (e.g. AdminDashboard subscribes to bookings, orders, AND products
// simultaneously) - Supabase only allows adding postgres_changes
// listeners to a channel BEFORE it's subscribed, so multiple hooks all
// trying to share one hardcoded channel name causes the second (and
// third...) subscribe() call to throw "cannot add postgres_changes
// callbacks after subscribe()", since by then the first caller has
// already subscribed that channel.
let channelCounter = 0;

export function subscribe(callback) {
  if (!isSupabaseConfigured) {
    return () => {};
  }
  const channel = supabase
    .channel(`db-changes-${channelCounter++}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "products" }, callback)
    .on("postgres_changes", { event: "*", schema: "public", table: "treatments" }, callback)
    .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, callback)
    .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, callback)
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

// ---------- Products / Inventory ----------

export async function getProducts() {
  assertConfigured();
  const { data, error } = await supabase.from("products").select("*").order("created_at");
  if (error) throw error;
  return (data || []).map(mapProductRow);
}

export async function getActiveProducts() {
  assertConfigured();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at");
  if (error) throw error;
  return (data || []).map(mapProductRow);
}

export async function getProduct(id) {
  assertConfigured();
  const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return mapProductRow(data);
}

export async function updateProduct(id, patch) {
  assertConfigured();
  const dbPatch = { ...patch };
  if ("longDescription" in dbPatch) {
    dbPatch.long_description = dbPatch.longDescription;
    delete dbPatch.longDescription;
  }
  const { error } = await supabase.from("products").update(dbPatch).eq("id", id);
  if (error) throw error;
}

function slugify(name) {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `product-${Date.now()}`
  );
}

export async function addProduct(product) {
  assertConfigured();
  const id = product.id || slugify(product.name || "product");
  const dbPatch = { ...product };
  if ("longDescription" in dbPatch) {
    dbPatch.long_description = dbPatch.longDescription;
    delete dbPatch.longDescription;
  }
  const { data, error } = await supabase
    .from("products")
    .insert({
      id,
      active: true,
      rating: 0,
      reviews: 0,
      badge: null,
      image:
        "https://images.unsplash.com/photo-1616750819456-5cdee9b85d22?auto=format&fit=crop&w=800&h=800&q=85",
      ...dbPatch,
    })
    .select()
    .single();
  if (error) throw error;
  return mapProductRow(data);
}

export async function deleteProduct(id) {
  assertConfigured();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function decrementStock(id, qty) {
  assertConfigured();
  const { error } = await supabase.rpc("decrement_stock", { p_id: id, p_qty: qty });
  if (error) {
    // Fallback if the RPC function isn't present (older schema): read-then-write.
    const product = await getProduct(id);
    if (product) {
      await updateProduct(id, { stock: Math.max(0, (product.stock || 0) - qty) });
    }
  }
}

// ---------- Treatments ----------

export async function getTreatments() {
  assertConfigured();
  const { data, error } = await supabase.from("treatments").select("*").order("created_at");
  if (error) throw error;
  return (data || []).map(mapTreatmentRow);
}

export async function getActiveTreatments() {
  assertConfigured();
  const { data, error } = await supabase
    .from("treatments")
    .select("*")
    .eq("active", true)
    .order("created_at");
  if (error) throw error;
  return (data || []).map(mapTreatmentRow);
}

function toTreatmentDbPatch(patch) {
  const dbPatch = { ...patch };
  if ("priceFrom" in dbPatch) {
    dbPatch.price_from = dbPatch.priceFrom;
    delete dbPatch.priceFrom;
  }
  if ("priceLabel" in dbPatch) {
    dbPatch.price_label = dbPatch.priceLabel;
    delete dbPatch.priceLabel;
  }
  if ("durationMinutes" in dbPatch) {
    dbPatch.duration_minutes = dbPatch.durationMinutes;
    delete dbPatch.durationMinutes;
  }
  return dbPatch;
}

export async function updateTreatment(id, patch) {
  assertConfigured();
  const { error } = await supabase.from("treatments").update(toTreatmentDbPatch(patch)).eq("id", id);
  if (error) throw error;
}

export async function addTreatment(treatment) {
  assertConfigured();
  const id = treatment.id || slugify(treatment.name || "treatment");
  const { data, error } = await supabase
    .from("treatments")
    .insert({
      active: true,
      featured: false,
      icon: "spa",
      image:
        "https://images.unsplash.com/photo-1630835425197-50feeba99ecd?auto=format&fit=crop&w=1000&h=1000&q=85",
      ...toTreatmentDbPatch(treatment),
      id,
    })
    .select()
    .single();
  if (error) throw error;
  return mapTreatmentRow(data);
}

export async function deleteTreatment(id) {
  assertConfigured();
  const { error } = await supabase.from("treatments").delete().eq("id", id);
  if (error) throw error;
}

// ---------- Bookings ----------

export async function getBookings() {
  assertConfigured();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapBookingRow);
}

export async function addBooking(booking) {
  assertConfigured();
  const id = makeId("bk");
  const record = { id, status: "pending", createdAt: Date.now(), ...booking };
  const { error } = await supabase.from("bookings").insert({
    id,
    status: "pending",
    category: booking.category,
    doctor: booking.doctor || null,
    date: booking.date,
    time: booking.time,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    notes: booking.notes,
  });
  if (error) throw error;
  return record;
}

export async function updateBooking(id, patch) {
  assertConfigured();
  const { error } = await supabase.from("bookings").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteBooking(id) {
  assertConfigured();
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) throw error;
}

// ---------- Orders / Payments ----------

export async function getOrders() {
  assertConfigured();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapOrderRow);
}

export async function getOrder(id) {
  assertConfigured();
  const { data, error } = await supabase.from("orders").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return mapOrderRow(data);
}

export async function addOrder(order) {
  assertConfigured();
  const id = makeId("ord");
  const paymentMethod = order.paymentMethod || "whatsapp";
  const record = {
    id,
    paymentStatus: "pending",
    paymentMethod,
    fulfillmentStatus: "pending",
    createdAt: Date.now(),
    items: order.items,
    customer: order.customer,
    subtotal: order.subtotal,
    shipping: order.shipping,
    tax: order.tax,
    total: order.total,
  };
  const { error } = await supabase.from("orders").insert({
    id,
    payment_status: "pending",
    payment_method: paymentMethod,
    fulfillment_status: "pending",
    items: order.items,
    customer: order.customer,
    subtotal: order.subtotal,
    shipping: order.shipping,
    tax: order.tax,
    total: order.total,
  });
  if (error) throw error;
  return record;
}

export async function updateOrder(id, patch) {
  assertConfigured();
  const dbPatch = {};
  if ("paymentStatus" in patch) dbPatch.payment_status = patch.paymentStatus;
  if ("fulfillmentStatus" in patch) dbPatch.fulfillment_status = patch.fulfillmentStatus;
  if ("stripeSessionId" in patch) dbPatch.stripe_session_id = patch.stripeSessionId;
  const { error } = await supabase.from("orders").update(dbPatch).eq("id", id);
  if (error) throw error;
}

export async function deleteOrder(id) {
  assertConfigured();
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) throw error;
}
