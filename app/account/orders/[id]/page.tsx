import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/layout/page-intro";
import { OrderAddressPanel } from "@/components/storefront/order-address-panel";
import { OrderLineItemsPanel } from "@/components/storefront/order-line-items-panel";
import {
  OrderStatusBadge,
  formatOrderValueLabel,
} from "@/components/storefront/order-status-badge";
import { Button } from "@/components/ui/button";
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

function formatDateTime(value: string | null) {
  if (!value) {
    return "Pending";
  }

  return new Intl.DateTimeFormat("en-GB", {
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
  const order = await getOrderByIdForUser(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow="Order detail"
        title={`Order ${order.orderNumber}`}
        description="This protected detail view preserves the live order state from Supabase together with the exact line items, address snapshots, and checkout references captured at purchase time."
        note={
          order.inventoryAdjustedAt
            ? "Inventory has already been finalized for this paid order, so the purchased stock is settled."
            : "Inventory finalization remains pending until the successful payment sync completes."
        }
        actions={
          <>
            <Button asChild>
              <Link href="/account/orders">Back to orders</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/account">Account overview</Link>
            </Button>
          </>
        }
      />

      <section className="section-frame grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="luxury-panel p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Order summary</p>
                <h2 className="mt-4 text-3xl leading-none text-white md:text-4xl">
                  Payment and delivery state
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <OrderStatusBadge kind="order" value={order.status} />
                <OrderStatusBadge kind="payment" value={order.paymentStatus} />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  Created
                </p>
                <p className="mt-3 text-base text-white/78">
                  {formatDateTime(order.createdAt)}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  Paid at
                </p>
                <p className="mt-3 text-base text-white/78">
                  {formatDateTime(order.paidAt)}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  Order status
                </p>
                <p className="mt-3 text-base text-white/78">
                  {formatOrderValueLabel(order.status)}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  Payment status
                </p>
                <p className="mt-3 text-base text-white/78">
                  {formatOrderValueLabel(order.paymentStatus)}
                </p>
              </div>
            </div>
          </section>

          <OrderLineItemsPanel items={order.lineItems} />
        </div>

        <div className="space-y-6">
          <section className="showroom-panel p-6 md:p-7">
            <p className="eyebrow">Order figures</p>
            <div className="mt-5 space-y-4 text-sm text-white/62">
              <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <span>Customer email</span>
                <span className="text-right text-white/76">{order.customerEmail}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <span>Pieces</span>
                <span className="text-white/76">{order.itemCount}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <span>Subtotal</span>
                <span className="text-white/76">
                  {formatPrice(order.subtotalAmount)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <span>Shipping</span>
                <span className="text-white/76">
                  {formatPrice(order.shippingAmount)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-[#b79d67]/18 bg-[#b79d67]/8 px-4 py-4">
                <span>Total</span>
                <span className="text-white">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </section>

          <OrderAddressPanel
            title="Shipping summary"
            description="Captured from Stripe Checkout for physical fulfillment."
            address={order.shippingAddress}
          />

          <OrderAddressPanel
            title="Billing summary"
            description="Stored exactly as returned by the checkout confirmation."
            address={order.billingAddress}
          />

          <section className="luxury-muted-panel p-5">
            <p className="eyebrow">Operational state</p>
            <div className="mt-5 space-y-3 text-sm text-white/60">
              <div className="flex items-center justify-between gap-4">
                <span>Inventory sync</span>
                <span className="text-white/76">
                  {order.inventoryAdjustedAt
                    ? formatDateTime(order.inventoryAdjustedAt)
                    : "Pending"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Stripe session</span>
                <span className="max-w-[180px] truncate text-white/52">
                  {order.stripeCheckoutSessionId ?? "Unavailable"}
                </span>
              </div>
            </div>
          </section>
        </div>
      </section>

      {order.notes ? (
        <section className="section-frame">
          <div className="luxury-muted-panel p-5">
            <p className="eyebrow">Order note</p>
            <p className="mt-4 text-sm leading-7 text-white/58">{order.notes}</p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
