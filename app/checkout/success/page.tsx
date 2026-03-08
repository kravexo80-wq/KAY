import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import { getRequestI18n } from "@/lib/i18n/request";
import { requireAuth } from "@/lib/supabase/auth";
import { getCurrentUserOrderByStripeSessionId } from "@/lib/supabase/orders";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Checkout Success",
};

type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  await requireAuth("/checkout/success");
  const { session_id: sessionId } = await searchParams;
  const [{ locale, direction }, order] = await Promise.all([
    getRequestI18n(),
    sessionId ? getCurrentUserOrderByStripeSessionId(sessionId) : Promise.resolve(null),
  ]);
  const uiCopy = getExtendedUiCopy(locale);
  const copy = uiCopy.checkoutSuccess;
  const isRtl = direction === "rtl";

  if (!order || order.paymentStatus !== "paid") {
    return (
      <div className="space-y-8 pb-16 md:pb-24">
        <PageIntro
          eyebrow={copy.eyebrow}
          title={
            order
              ? `${copy.waitingTitlePrefix} ${order.orderNumber} ${copy.waitingTitleSuffix}`
              : copy.waitingTitleFallback
          }
          description={copy.waitingDescription}
          note={copy.waitingNote}
          isRtl={isRtl}
          actions={
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={localizeHref(locale, "/account")}>
                  {locale === "ar" ? "فتح الحساب" : "Open account"}
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={localizeHref(locale, "/shop")}>
                  {locale === "ar" ? "متابعة التسوق" : "Continue shopping"}
                </Link>
              </Button>
            </div>
          }
        />

        <section className="section-frame">
          <CatalogStatePanel
            eyebrow={copy.syncEyebrow}
            title={copy.syncTitle}
            description={copy.syncDescription}
          />
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={copy.eyebrow}
        title={`${copy.confirmedTitlePrefix} ${order.orderNumber} ${copy.confirmedTitleSuffix}`}
        description={copy.confirmedDescription}
        note={copy.confirmedNote}
        isRtl={isRtl}
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={localizeHref(locale, "/account")}>
                {locale === "ar" ? "عرض الحساب" : "View account"}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={localizeHref(locale, "/shop")}>
                {locale === "ar" ? "متابعة التسوق" : "Continue shopping"}
              </Link>
            </Button>
          </div>
        }
      />

      <section className="section-frame grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="showroom-panel p-6 md:p-8">
          <p className="eyebrow">{copy.confirmationEyebrow}</p>
          <div className="mt-5 space-y-4 text-sm text-white/60">
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>{copy.orderNumber}</span>
              <span className="text-white/78">{order.orderNumber}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>{copy.orderStatus}</span>
              <span className="text-white/78">
                {uiCopy.status.order[order.status]}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>{copy.paymentStatus}</span>
              <span className="text-white/78">
                {uiCopy.status.payment[order.paymentStatus]}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>{copy.total}</span>
              <span className="text-white/78">{formatPrice(order.totalAmount, locale)}</span>
            </div>
          </div>
        </div>

        <div className="luxury-muted-panel p-5">
          <p className="eyebrow">{copy.showroomEyebrow}</p>
          <p className="mt-4 text-sm leading-7 text-white/58">
            {copy.showroomBody}
          </p>
        </div>
      </section>
    </div>
  );
}
