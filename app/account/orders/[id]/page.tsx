import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/layout/page-intro";
import { OrderAddressPanel } from "@/components/storefront/order-address-panel";
import { OrderLineItemsPanel } from "@/components/storefront/order-line-items-panel";
import {
  OrderStatusBadge,
  getLocalizedOrderValueLabel,
} from "@/components/storefront/order-status-badge";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import { getRequestI18n } from "@/lib/i18n/request";
import { requireAuth } from "@/lib/supabase/auth";
import { getOrderByIdForUser } from "@/lib/supabase/orders";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order Detail",
};

type AccountOrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatDateTime(value: string | null, locale: "en" | "ar", pendingLabel: string) {
  if (!value) {
    return pendingLabel;
  }

  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function AccountOrderDetailPage({
  params,
}: AccountOrderDetailPageProps) {
  await requireAuth("/account/orders");
  const { id } = await params;
  const [{ locale, direction, dictionary }, order] = await Promise.all([
    getRequestI18n(),
    getOrderByIdForUser(id),
  ]);
  const copy = getExtendedUiCopy(locale).orders;
  const detailCopy = copy.customerDetail;
  const isRtl = direction === "rtl";

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={detailCopy.eyebrow}
        title={`${copy.detailTitlePrefix} ${order.orderNumber}`}
        description={detailCopy.description}
        note={
          order.inventoryAdjustedAt
            ? detailCopy.noteSettled
            : detailCopy.notePending
        }
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/account/orders")}>
                {dictionary.common.backToOrders}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={localizeHref(locale, "/account")}>
                {dictionary.header.account}
              </Link>
            </Button>
          </>
        }
      />

      <section className="section-frame grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="luxury-panel p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{detailCopy.summaryEyebrow}</p>
                <h2 className="mt-4 text-3xl leading-none text-white md:text-4xl">
                  {detailCopy.summaryTitle}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <OrderStatusBadge kind="order" value={order.status} locale={locale} />
                <OrderStatusBadge
                  kind="payment"
                  value={order.paymentStatus}
                  locale={locale}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  {copy.created}
                </p>
                <p className="mt-3 text-base text-white/78">
                  {formatDateTime(order.createdAt, locale, copy.pending)}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  {copy.paidAt}
                </p>
                <p className="mt-3 text-base text-white/78">
                  {formatDateTime(order.paidAt, locale, copy.pending)}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  {copy.orderStatus}
                </p>
                <p className="mt-3 text-base text-white/78">
                  {getLocalizedOrderValueLabel(order.status, locale)}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  {copy.paymentStatus}
                </p>
                <p className="mt-3 text-base text-white/78">
                  {getLocalizedOrderValueLabel(order.paymentStatus, locale)}
                </p>
              </div>
            </div>
          </section>

          <OrderLineItemsPanel items={order.lineItems} locale={locale} />
        </div>

        <div className="space-y-6">
          <section className="showroom-panel p-6 md:p-7">
            <p className="eyebrow">{detailCopy.figuresEyebrow}</p>
            <div className="mt-5 space-y-4 text-sm text-white/62">
              <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <span>{detailCopy.customerEmail}</span>
                <span className="text-right text-white/76">{order.customerEmail}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <span>{copy.pieces}</span>
                <span className="text-white/76">{order.itemCount}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <span>{detailCopy.subtotal}</span>
                <span className="text-white/76">
                  {formatPrice(order.subtotalAmount, locale)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <span>{detailCopy.shipping}</span>
                <span className="text-white/76">
                  {formatPrice(order.shippingAmount, locale)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-[#b79d67]/18 bg-[#b79d67]/8 px-4 py-4">
                <span>{copy.total}</span>
                <span className="text-white">{formatPrice(order.totalAmount, locale)}</span>
              </div>
            </div>
          </section>

          <OrderAddressPanel
            title={detailCopy.shippingSummaryTitle}
            description={detailCopy.shippingSummaryDescription}
            address={order.shippingAddress}
            emptyMessage={copy.noAddressSnapshot}
          />

          <OrderAddressPanel
            title={detailCopy.billingSummaryTitle}
            description={detailCopy.billingSummaryDescription}
            address={order.billingAddress}
            emptyMessage={copy.noAddressSnapshot}
          />

          <section className="luxury-muted-panel p-5">
            <p className="eyebrow">{detailCopy.operationalEyebrow}</p>
            <div className="mt-5 space-y-3 text-sm text-white/60">
              <div className="flex items-center justify-between gap-4">
                <span>{detailCopy.inventorySync}</span>
                <span className="text-white/76">
                  {order.inventoryAdjustedAt
                    ? formatDateTime(order.inventoryAdjustedAt, locale, copy.pending)
                    : copy.pending}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>{detailCopy.stripeSession}</span>
                <span className="max-w-[180px] truncate text-white/52">
                  {order.stripeCheckoutSessionId ?? detailCopy.unavailable}
                </span>
              </div>
            </div>
          </section>
        </div>
      </section>

      {order.notes ? (
        <section className="section-frame">
          <div className="luxury-muted-panel p-5">
            <p className="eyebrow">{detailCopy.orderNoteEyebrow}</p>
            <p className="mt-4 text-sm leading-7 text-white/58">{order.notes}</p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
