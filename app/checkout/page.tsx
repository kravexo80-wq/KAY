import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { CartFeedbackPanel } from "@/components/storefront/cart-feedback-panel";
import { CheckoutLineItem } from "@/components/storefront/checkout-line-item";
import { CheckoutSummaryPanel } from "@/components/storefront/checkout-summary-panel";
import { Button } from "@/components/ui/button";
import { getCheckoutPageData } from "@/lib/stripe/checkout";

export const metadata: Metadata = {
  title: "Checkout",
};

type CheckoutPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { error } = await searchParams;
  const checkoutResult = await getCheckoutPageData();
  const checkout = checkoutResult.data;

  return (
    <div className="space-y-8 pb-16 md:space-y-10 md:pb-24">
      <PageIntro
        eyebrow="Checkout"
        title="Complete your order through a secure Stripe session."
        description="Your authenticated cart is converted into Stripe line items server-side, then finalized into a Kravexo order once payment succeeds."
        note="Shipping and billing details are collected inside Stripe Checkout. The order record and item snapshots are synchronized back into Supabase after payment confirmation."
        actions={
          <Button asChild variant="secondary">
            <Link href="/cart">Back to cart</Link>
          </Button>
        }
      />

      {(error || checkoutResult.error) && (
        <section className="section-frame">
          <CartFeedbackPanel
            title="Checkout issue"
            description={error ?? checkoutResult.error ?? "Checkout could not be prepared."}
            tone="error"
          />
        </section>
      )}

      {checkoutResult.status === "unconfigured" ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow="Checkout state"
            title="Stripe checkout is not configured yet."
            description={
              checkoutResult.error ??
              "Add the Stripe server credentials for this environment to enable checkout session creation and webhook syncing."
            }
          />
        </section>
      ) : null}

      {checkoutResult.status === "error" ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow="Checkout state"
            title="The checkout session could not be prepared."
            description={
              checkoutResult.error ??
              "Review the cart and try again. Live stock and order validation run before Stripe is opened."
            }
          />
        </section>
      ) : null}

      {checkoutResult.status === "empty" ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow="Checkout state"
            title="Your cart is empty."
            description="Add a product variant from any product page before starting checkout."
            action={
              <Button asChild>
                <Link href="/shop">Explore the collection</Link>
              </Button>
            }
          />
        </section>
      ) : null}

      {checkoutResult.status === "ready" ? (
        <section className="section-frame grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {checkout.items.map((item) => (
              <CheckoutLineItem key={item.id} item={item} />
            ))}
          </div>

          <CheckoutSummaryPanel
            itemCount={checkout.itemCount}
            subtotal={checkout.subtotal}
            shippingAmount={checkout.shippingAmount}
            total={checkout.total}
          />
        </section>
      ) : null}
    </div>
  );
}
