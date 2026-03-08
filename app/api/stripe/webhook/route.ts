import { NextResponse } from "next/server";
import Stripe from "stripe";

import {
  clearCartAfterSuccessfulCheckout,
  finalizePaidOrderInventory,
  syncOrderItemsFromStripeSession,
  upsertOrderFromCheckoutSession,
} from "@/lib/stripe/orders";
import { getStripeWebhookSecret, hasStripeWebhookEnv } from "@/lib/stripe/config";
import { getStripeServerClient } from "@/lib/stripe/server";

export const runtime = "nodejs";

async function buildWebhookEvent(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    throw new Error("Missing Stripe signature header.");
  }

  const body = await request.text();
  const stripe = getStripeServerClient();

  return stripe.webhooks.constructEvent(body, signature, getStripeWebhookSecret());
}

export async function POST(request: Request) {
  if (!hasStripeWebhookEnv()) {
    return NextResponse.json(
      { error: "Stripe is not configured in this environment." },
      { status: 503 },
    );
  }

  let event: Stripe.Event;

  try {
    event = await buildWebhookEvent(request);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Stripe webhook verification failed.";

    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        const stripe = getStripeServerClient();
        const order = await upsertOrderFromCheckoutSession({
          session,
          paymentStatusOverride: "paid",
        });
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ["data.price.product"],
        });

        await syncOrderItemsFromStripeSession(order.id, lineItems.data);

        if (session.payment_status === "paid") {
          await finalizePaidOrderInventory(order.id);
          await clearCartAfterSuccessfulCheckout(session.metadata?.cart_id);
        }

        break;
      }

      case "checkout.session.async_payment_failed":
      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;

        await upsertOrderFromCheckoutSession({
          session,
          orderStatusOverride:
            event.type === "checkout.session.expired" ? "cancelled" : "cancelled",
          paymentStatusOverride:
            event.type === "checkout.session.expired" ? "cancelled" : "failed",
        });

        break;
      }

      default:
        break;
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Stripe webhook handling failed.";

    console.error("Stripe webhook processing error.", error);

    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
