import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { CartFeedbackPanel } from "@/components/storefront/cart-feedback-panel";
import { CheckoutLineItem } from "@/components/storefront/checkout-line-item";
import { CheckoutSummaryPanel } from "@/components/storefront/checkout-summary-panel";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
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
  const [{ locale, direction, dictionary }, checkoutResult] = await Promise.all([
    getRequestI18n(),
    getCheckoutPageData(),
  ]);
  const isRtl = direction === "rtl";
  const checkout = checkoutResult.data;

  return (
    <div className="space-y-8 pb-16 md:space-y-10 md:pb-24">
      <PageIntro
        eyebrow={dictionary.checkout.eyebrow}
        title={dictionary.checkout.title}
        description={dictionary.checkout.description}
        note={dictionary.checkout.note}
        noteLabel={dictionary.common.showroomNote}
        isRtl={isRtl}
        actions={
          <Button asChild variant="secondary">
            <Link href={localizeHref(locale, "/cart")}>
              {dictionary.checkout.summary.backToCart}
            </Link>
          </Button>
        }
      />

      {(error || checkoutResult.error) && (
        <section className="section-frame">
          <CartFeedbackPanel
            title={dictionary.checkout.issueTitle}
            description={error ?? checkoutResult.error ?? dictionary.checkout.errorTitle}
            tone="error"
          />
        </section>
      )}

      {checkoutResult.status === "unconfigured" ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow={dictionary.checkout.stateEyebrow}
            title={dictionary.checkout.unconfiguredTitle}
            description={
              checkoutResult.error ?? dictionary.checkout.unconfiguredDescription
            }
          />
        </section>
      ) : null}

      {checkoutResult.status === "error" ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow={dictionary.checkout.stateEyebrow}
            title={dictionary.checkout.errorTitle}
            description={checkoutResult.error ?? dictionary.checkout.errorDescription}
          />
        </section>
      ) : null}

      {checkoutResult.status === "empty" ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow={dictionary.checkout.stateEyebrow}
            title={dictionary.checkout.emptyTitle}
            description={dictionary.checkout.emptyDescription}
            action={
              <Button asChild>
                <Link href={localizeHref(locale, "/shop")}>
                  {dictionary.common.exploreCollection}
                </Link>
              </Button>
            }
          />
        </section>
      ) : null}

      {checkoutResult.status === "ready" ? (
        <section className="section-frame grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {checkout.items.map((item) => (
              <CheckoutLineItem key={item.id} item={item} locale={locale} />
            ))}
          </div>

          <CheckoutSummaryPanel
            locale={locale}
            copy={dictionary.checkout.summary}
            itemCount={checkout.itemCount}
            subtotal={checkout.subtotal}
            shippingAmount={checkout.shippingAmount}
            total={checkout.total}
            isRtl={isRtl}
          />
        </section>
      ) : null}
    </div>
  );
}
