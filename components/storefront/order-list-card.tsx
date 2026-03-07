import Link from "next/link";

import type { AccountOrderSummary } from "@/lib/supabase/orders";

import { formatPrice } from "@/lib/utils";

import { OrderStatusBadge } from "./order-status-badge";

interface OrderListCardProps {
  order: AccountOrderSummary;
  href: string;
  contextLabel?: string;
  showCustomerEmail?: boolean;
}

function formatOrderDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function OrderListCard({
  order,
  href,
  contextLabel = "Order",
  showCustomerEmail = false,
}: OrderListCardProps) {
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
            Created {formatOrderDate(order.createdAt)}
          </p>
          {showCustomerEmail ? (
            <p className="mt-2 text-sm text-white/44">{order.customerEmail}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <OrderStatusBadge kind="order" value={order.status} />
          <OrderStatusBadge kind="payment" value={order.paymentStatus} />
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
            Pieces
          </p>
          <p className="mt-3 text-2xl leading-none text-white">{order.itemCount}</p>
        </div>
        <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
            Total
          </p>
          <p className="mt-3 text-2xl leading-none text-white">
            {formatPrice(order.totalAmount)}
          </p>
        </div>
        <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
            Inventory
          </p>
          <p className="mt-3 text-base leading-none text-white/78">
            {order.inventoryAdjustedAt ? "Settled" : "Pending sync"}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-white/48 transition duration-300 group-hover:text-white/62">
        <span>Open order detail</span>
        <span className="uppercase tracking-[0.24em]">View</span>
      </div>
    </Link>
  );
}
