import { loadStripe } from "@stripe/stripe-js";

const PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  // Non-fatal: card checkout will show a friendly error until this is set.
  console.warn(
    "[stripe] VITE_STRIPE_PUBLISHABLE_KEY is not set. Copy .env.example to .env and add your Stripe publishable key."
  );
}

let stripePromise;

export function getStripe() {
  if (!PUBLISHABLE_KEY) return Promise.resolve(null);
  if (!stripePromise) {
    stripePromise = loadStripe(PUBLISHABLE_KEY);
  }
  return stripePromise;
}

export const isStripeConfigured = Boolean(PUBLISHABLE_KEY);
