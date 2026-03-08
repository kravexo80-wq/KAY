import Link from "next/link";

import type { AccountOrderSummary } from "@/lib/supabase/orders";

import type { Locale } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import { formatPrice } from "@/lib/utils";

import { OrderStatusBadge } from "./order-status-badge";

interface OrderListCardProps {
  order: AccountOrderSummary;
  href: string;
  locale: Locale;
  contextLabel?: string;
  showCustomerEmail?: boolean;
}

function formatOrderDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function OrderListCard({
  order,
  href,
  locale,
  contextLabel = "Order",
  showCustomerEmail = false,
}: OrderListCardProps) {
  const copy = getExtendedUiCopy(locale).orders;

  return (
    <Link
      href={href}
      className="group luxury-panel block overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-white/14 hover:bg-white/[0.045]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.28em] text-white/34">
            {contextLabel}
          </p>
          <h2 className="mt-3 text-2xl leading-none text-white md:text-3xl">
            {order.orderNumber}
          </h2>
          <p className="mt-3 text-sm text-white/54">
            {copy.created} {formatOrderDate(order.createdAt, locale)}
          </p>
          {showCustomerEmail ? (
            <p className="mt-2 text-sm text-white/44">{order.customerEmail}</p>
          ) : null}
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

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
            {copy.pieces}
          </p>
          <p className="mt-3 text-2xl leading-none text-white">{order.itemCount}</p>
        </div>
        <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
            {copy.total}
          </p>
          <p className="mt-3 text-2xl leading-none text-white">
            {formatPrice(order.totalAmount, locale)}
          </p>
        </div>
        <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
            {copy.inventory}
          </p>
          <p className="mt-3 text-base leading-none text-white/78">
            {order.inventoryAdjustedAt ? copy.settled : copy.pendingSync}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-white/48 transition duration-300 group-hover:text-white/62">
        <span>{copy.openDetail}</span>
        <span className="uppercase tracking-[0.24em]">{copy.view}</span>
      </div>
    </Link>
  );
}
