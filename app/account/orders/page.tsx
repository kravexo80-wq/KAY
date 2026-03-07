import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { OrderListCard } from "@/components/storefront/order-list-card";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/supabase/auth";
import { getOrdersByUser } from "@/lib/supabase/orders";

export const metadata: Metadata = {
  title: "Order History",
};

export default async function AccountOrdersPage() {
  await requireAuth("/account/orders");
  const orders = await getOrdersByUser();

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow="Order history"
        title="Your Kravexo orders, captured in one protected account view."
        description="Every Stripe-backed order now lands in Supabase and remains available here with payment state, order progress, inventory sync visibility, and preserved line-item snapshots."
        note="This history is scoped to the signed-in customer only. Each order detail view keeps the original size, color, price, and address snapshots from checkout."
        actions={
          <>
            <Button asChild>
              <Link href="/account">Back to account</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/shop">Continue shopping</Link>
            </Button>
          </>
        }
      />

      <section className="section-frame">
        {orders.length > 0 ? (
          <div className="grid gap-4">
            {orders.map((order) => (
              <OrderListCard
                key={order.id}
                order={order}
                href={`/account/orders/${order.id}`}
                contextLabel="Customer order"
              />
            ))}
          </div>
        ) : (
          <CatalogStatePanel
            eyebrow="Order history"
            title="No orders have been placed on this account yet."
            description="Once a secure Stripe checkout completes, the order will appear here automatically with its live payment and fulfillment status."
            action={
              <Button asChild>
                <Link href="/shop">Browse the showroom</Link>
              </Button>
            }
          />
        )}
      </section>
    </div>
  );
}
