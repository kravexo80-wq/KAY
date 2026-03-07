import "server-only";

import Stripe from "stripe";

import { getStripeSecretKey } from "./config";

let stripeClient: Stripe | null = null;

export function getStripeServerClient() {
  if (!stripeClient) {
    stripeClient = new Stripe(getStripeSecretKey());
  }

  return stripeClient;
}
