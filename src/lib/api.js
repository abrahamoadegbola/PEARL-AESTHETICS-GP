import { supabase } from "./supabaseClient";

// Calls a Supabase Edge Function. supabase-js automatically attaches the
// project's anon key as the Authorization header, which is what lets
// these functions run (they're deployed with Supabase's default JWT
// verification, except stripe-webhook which Stripe calls directly and is
// deployed with --no-verify-jwt instead - see supabase/functions/README).
async function invoke(name, body, method = "POST") {
  const { data, error } = await supabase.functions.invoke(name, method === "GET" ? { method } : { body });
  if (error) {
    // supabase-js's FunctionsHttpError puts the raw fetch Response on
    // .context, NOT the already-parsed JSON body - awaiting .json() here
    // is what actually surfaces the real error message our functions
    // return (e.g. "Stripe is not configured yet."), instead of
    // supabase-js's generic "Edge Function returned a non-2xx status
    // code" wrapper message.
    let message = error.message || `${name} failed`;
    try {
      const body = await error.context?.json();
      if (body?.error) message = body.error;
    } catch {
      // context wasn't JSON (network error, function crashed before
      // responding, etc.) - fall back to the generic message above.
    }
    throw new Error(message);
  }
  return data;
}

// Only the order id goes over the wire - the function re-reads the order
// and re-prices every item from the products table server-side, so a
// tampered cart can't change what Stripe charges.
export function createCheckoutSession({ orderId }) {
  return invoke("create-checkout-session", { orderId });
}

export function getCheckoutSession(sessionId) {
  return invoke("checkout-session-status", { sessionId });
}

// Emails the patient a confirmation and notifies the clinic by email and
// WhatsApp. Only the booking id is sent - the function loads the booking
// itself, so it can't be used to send mail to arbitrary addresses.
// Resolves to { email: { sent }, whatsapp: { sent } }.
export function sendBookingNotifications(bookingId) {
  return invoke("send-booking-email", { id: bookingId });
}

// form: { firstName, lastName, email, phone, interest, message }
export function sendContactEmail(form) {
  return invoke("send-contact-email", form);
}

// Live @pearl_medicals posts and reels: { posts: [...] }.
export function getInstagramFeed() {
  return invoke("instagram-feed", undefined, "GET");
}

// Live Google rating + latest reviews: { rating, userRatingCount, reviews: [...] }.
export function getGoogleReviews() {
  return invoke("google-reviews", undefined, "GET");
}

// Admin -> Staff (super admin only). action: "list" | "invite" | "resend" | "remove".
export function manageStaff(action, payload = {}) {
  return invoke("manage-staff", { action, ...payload });
}
