import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/layout/page-intro";
import { AdminOrderStatusForm } from "@/components/storefront/admin-order-status-form";
import { OrderAddressPanel } from "@/components/storefront/order-address-panel";
import { OrderLineItemsPanel } from "@/components/storefront/order-line-items-panel";
import {
  OrderStatusBadge,
  formatOrderValueLabel,
} from "@/components/storefront/order-status-badge";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/supabase/auth";
import { getOrderByIdForAdmin } from "@/lib/supabase/orders";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Order Detail",
};

type AdminOrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    updated?: string;
    error?: string;
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

export default async function AdminOrderDetailPage({
  params,
  searchParams,
}: AdminOrderDetailPageProps) {
  await requireAdmin("/admin/orders");
  const [{ id }, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const order = await getOrderByIdForAdmin(id);

  if (!order) {
    notFound();
  }

  const statusMessage =
    resolvedSearchParams.updated === "status"
      ? "Order status updated successfully."
      : resolvedSearchParams.error ?? null;
  const isError = Boolean(
    resolvedSearchParams.error && resolvedSearchParams.updated !== "status",
  );

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow="Admin order detail"
        title={`Operational view for ${order.orderNumber}`}
        description="This page combines the immutable checkout snapshot with the admin-managed fulfillment state, Stripe references, and inventory-finalization timing."
        note={
          order.inventoryAdjustedAt
            ? "Stock has already been deducted exactly once for this paid order."
            : "Stock deduction has not been finalized yet. The existing paid-order inventory flow remains the single source of truth."
        }
        actions={
          <>
            <Button asChild>
              <Link href="/admin/orders">Back to orders</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/admin">Admin dashboard</Link>
            </Button>
          </>
        }
      />

      {statusMessage ? (
        <section className="section-frame">
          <div
            className={
              isError ? "luxury-muted-panel p-5" : "showroom-panel p-5"
            }
          >
            <p className="eyebrow">{isError ? "Update error" : "Update saved"}</p>
            <p className="mt-4 text-sm leading-7 text-white/58">{statusMessage}</p>
          </div>
        </section>
      ) : null}

      <section className="section-frame grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="luxury-panel p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Order state</p>
                <h2 className="mt-4 text-3xl leading-none text-white md:text-4xl">
                  Payment, fulfillment, and sync references
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
                  Customer
                </p>
                <p className="mt-3 text-base text-white/78">{order.customerEmail}</p>
              </div>
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
                  Inventory finalized
                </p>
                <p className="mt-3 text-base text-white/78">
                  {formatDateTime(order.inventoryAdjustedAt)}
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

          {order.notes ? (
            <section className="luxury-muted-panel p-5">
              <p className="eyebrow">Internal note</p>
              <p className="mt-4 text-sm leading-7 text-white/58">
                {order.notes}
              </p>
            </section>
          ) : null}
        </div>

        <div className="space-y-6">
          <AdminOrderStatusForm
            orderId={order.id}
            currentStatus={order.status}
            paymentStatus={order.paymentStatus}
            inventoryAdjustedAt={order.inventoryAdjustedAt}
            returnTo={`/admin/orders/${order.id}`}
          />

          <section className="showroom-panel p-6 md:p-7">
            <p className="eyebrow">Order totals</p>
            <div className="mt-5 space-y-4 text-sm text-white/62">
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
            description="Physical delivery snapshot returned by Stripe Checkout."
            address={order.shippingAddress}
          />

          <OrderAddressPanel
            title="Billing summary"
            description="Billing contact snapshot preserved alongside the order."
            address={order.billingAddress}
          />

          <section className="luxury-muted-panel p-5">
            <p className="eyebrow">Stripe references</p>
            <div className="mt-5 space-y-3 text-sm text-white/60">
              <div className="space-y-2">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  Checkout session
                </p>
                <p className="break-all text-white/72">
                  {order.stripeCheckoutSessionId ?? "Unavailable"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  Payment intent
                </p>
                <p className="break-all text-white/72">
                  {order.stripePaymentIntentId ?? "Unavailable"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
