import { supabase } from "./supabaseClient";

// Calls a Supabase Edge Function. supabase-js automatically attaches the
// project's anon key as the Authorization header, which is what lets
// these functions run (they're deployed with Supabase's default JWT
// verification, except stripe-webhook which Stripe calls directly and is
// deployed with --no-verify-jwt instead - see supabase/functions/README).
async function invoke(name, body) {
  const { data, error } = await supabase.functions.invoke(name, { body });
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

// items: [{ id, name, price, qty }] — price in AED major units.
export function createCheckoutSession({ orderId, items, customerEmail }) {
  return invoke("create-checkout-session", { orderId, items, customerEmail });
}

export function getCheckoutSession(sessionId) {
  return invoke("checkout-session-status", { sessionId });
}

// booking: { id, category, date, time, name, email, phone, notes }
export function sendBookingEmail(booking) {
  return invoke("send-booking-email", booking);
}

// form: { firstName, lastName, email, phone, interest, message }
export function sendContactEmail(form) {
  return invoke("send-contact-email", form);
}
