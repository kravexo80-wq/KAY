import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { OrderListCard } from "@/components/storefront/order-list-card";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/supabase/auth";
import { getAllOrdersForAdmin } from "@/lib/supabase/orders";

export const metadata: Metadata = {
  title: "Admin Orders",
};

export default async function AdminOrdersPage() {
  await requireAdmin("/admin/orders");
  const orders = await getAllOrdersForAdmin();
  const pendingOrders = orders.filter((order) =>
    ["pending", "confirmed", "processing"].includes(order.status),
  ).length;
  const paidOrders = orders.filter((order) => order.paymentStatus === "paid").length;
  const inventorySettled = orders.filter(
    (order) => order.inventoryAdjustedAt !== null,
  ).length;
  const metrics = [
    { label: "Orders", value: `${orders.length}` },
    { label: "Open", value: `${pendingOrders}` },
    { label: "Paid", value: `${paidOrders}` },
    { label: "Inventory settled", value: `${inventorySettled}` },
  ];

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow="Admin orders"
        title="Operational order oversight for the Kravexo showroom."
        description="This admin-only surface lists every Supabase-backed order with live payment state, fulfillment state, and inventory-finalization visibility."
        note="Status updates remain separate from payment records. Inventory deduction stays in the existing paid-order finalization flow so stock changes are not duplicated here."
        actions={
          <>
            <Button asChild>
              <Link href="/admin">Back to dashboard</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/account/orders">Customer view</Link>
            </Button>
          </>
        }
      />

      <section className="section-frame space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="luxury-muted-panel p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/38">
                {metric.label}
              </p>
              <p className="mt-3 text-4xl leading-none text-white">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {orders.length > 0 ? (
          <div className="grid gap-4">
            {orders.map((order) => (
              <OrderListCard
                key={order.id}
                order={order}
                href={`/admin/orders/${order.id}`}
                contextLabel="Admin order"
                showCustomerEmail
              />
            ))}
          </div>
        ) : (
          <CatalogStatePanel
            eyebrow="Admin orders"
            title="No orders have been recorded yet."
            description="Once a Stripe checkout completes successfully, the webhook-backed order records will appear here for operational review."
          />
        )}
      </section>
    </div>
  );
}
