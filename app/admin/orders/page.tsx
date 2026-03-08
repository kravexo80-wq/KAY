import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { OrderListCard } from "@/components/storefront/order-list-card";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import { getRequestI18n } from "@/lib/i18n/request";
import { requireAdmin } from "@/lib/supabase/auth";
import { getAllOrdersForAdmin } from "@/lib/supabase/orders";

export const metadata: Metadata = {
  title: "Admin Orders",
};

export default async function AdminOrdersPage() {
  await requireAdmin("/admin/orders");
  const [{ locale, direction }, orders] = await Promise.all([
    getRequestI18n(),
    getAllOrdersForAdmin(),
  ]);
  const copy = getExtendedUiCopy(locale).orders;
  const adminCopy = copy.adminList;
  const isRtl = direction === "rtl";
  const pendingOrders = orders.filter((order) =>
    ["pending", "confirmed", "processing"].includes(order.status),
  ).length;
  const paidOrders = orders.filter((order) => order.paymentStatus === "paid").length;
  const inventorySettled = orders.filter(
    (order) => order.inventoryAdjustedAt !== null,
  ).length;
  const metrics = [
    { label: adminCopy.orders, value: `${orders.length}` },
    { label: adminCopy.open, value: `${pendingOrders}` },
    { label: adminCopy.paid, value: `${paidOrders}` },
    { label: adminCopy.inventorySettled, value: `${inventorySettled}` },
  ];

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={adminCopy.eyebrow}
        title={adminCopy.title}
        description={adminCopy.description}
        note={adminCopy.note}
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/admin")}>
                {locale === "ar" ? "العودة إلى اللوحة" : "Back to dashboard"}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={localizeHref(locale, "/account/orders")}>
                {locale === "ar" ? "عرض العميل" : "Customer view"}
              </Link>
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
                href={localizeHref(locale, `/admin/orders/${order.id}`)}
                locale={locale}
                contextLabel={copy.adminContext}
                showCustomerEmail
              />
            ))}
          </div>
        ) : (
          <CatalogStatePanel
            eyebrow={adminCopy.eyebrow}
            title={adminCopy.emptyTitle}
            description={adminCopy.emptyDescription}
          />
        )}
      </section>
    </div>
  );
}
