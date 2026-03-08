import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import { getRequestI18n } from "@/lib/i18n/request";
import { requireAuth } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Checkout Cancelled",
};

type CheckoutCancelPageProps = {
  searchParams: Promise<{
    order_id?: string;
  }>;
};

export default async function CheckoutCancelPage({
  searchParams,
}: CheckoutCancelPageProps) {
  await requireAuth("/checkout/cancel");
  const [{ locale, direction }, { order_id: orderId }] = await Promise.all([
    getRequestI18n(),
    searchParams,
  ]);
  const copy = getExtendedUiCopy(locale).checkoutCancel;
  const isRtl = direction === "rtl";

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        note={
          orderId
            ? `${copy.noteWithOrderPrefix}${orderId}${copy.noteWithOrderSuffix}`
            : copy.noteWithoutOrder
        }
        isRtl={isRtl}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={localizeHref(locale, "/cart")}>
                {locale === "ar" ? "العودة إلى السلة" : "Return to cart"}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={localizeHref(locale, "/checkout")}>
                {locale === "ar" ? "إعادة محاولة الدفع" : "Try checkout again"}
              </Link>
            </Button>
          </div>
        }
      />

      <section className="section-frame">
        <CatalogStatePanel
          eyebrow={copy.stateEyebrow}
          title={copy.stateTitle}
          description={copy.stateDescription}
        />
      </section>
    </div>
  );
}
