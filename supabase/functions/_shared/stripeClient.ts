// Deno-compatible Stripe client. Edge Functions run on Deno, not Node, so
// Stripe needs its fetch-based HTTP client explicitly (Deno has no
// built-in `http`/`https` modules the way Node does).
import Stripe from "npm:stripe@17.7.0";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");

export const isStripeConfigured = Boolean(STRIPE_SECRET_KEY);

export const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: "2024-11-20.acacia",
      httpClient: Stripe.createFetchHttpClient(),
    })
  : null;

// Needed for async webhook signature verification in Deno (SubtleCrypto-based,
// since Deno doesn't have Node's crypto module Stripe normally uses).
export const cryptoProvider = Stripe.createSubtleCryptoProvider();
