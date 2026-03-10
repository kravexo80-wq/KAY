import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { OrderListCard } from "@/components/storefront/order-list-card";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import { getRequestI18n } from "@/lib/i18n/request";
import { deleteOrderAction } from "@/lib/supabase/order-actions";
import { requireAdmin } from "@/lib/supabase/auth";
import { getAllOrdersForAdmin } from "@/lib/supabase/orders";

export const metadata: Metadata = {
  title: "Admin Orders",
};

type AdminOrdersPageProps = {
  searchParams: Promise<{
    updated?: string;
    error?: string;
  }>;
};

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {
  await requireAdmin("/admin/orders");
  const [resolvedSearchParams, { locale, direction }, orders] = await Promise.all([
    searchParams,
    getRequestI18n(),
    getAllOrdersForAdmin(),
  ]);
  const copy = getExtendedUiCopy(locale).orders;
  const adminCopy = copy.adminList;
  const isRtl = direction === "rtl";
  const statusMessage =
    resolvedSearchParams.updated === "deleted"
      ? locale === "ar"
        ? "تم حذف الطلب بنجاح."
        : "Order deleted successfully."
      : resolvedSearchParams.error ?? null;
  const isError = Boolean(
    resolvedSearchParams.error && resolvedSearchParams.updated !== "deleted",
  );
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
        {statusMessage ? (
          <div className={isError ? "luxury-muted-panel p-5" : "showroom-panel p-5"}>
            <p className="eyebrow">
              {isError
                ? locale === "ar"
                  ? "مشكلة في الطلب"
                  : "Order issue"
                : locale === "ar"
                  ? "تم الحذف"
                  : "Order deleted"}
            </p>
            <p className="mt-4 text-sm leading-7 text-white/58">{statusMessage}</p>
          </div>
        ) : null}

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
              <div key={order.id} className="space-y-3">
                <OrderListCard
                  order={order}
                  href={localizeHref(locale, `/admin/orders/${order.id}`)}
                  locale={locale}
                  contextLabel={copy.adminContext}
                  showCustomerEmail
                />
                <div className="flex justify-end">
                  <form action={deleteOrderAction}>
                    <input type="hidden" name="orderId" value={order.id} />
                    <input
                      type="hidden"
                      name="returnTo"
                      value={localizeHref(locale, "/admin/orders")}
                    />
                    <Button
                      type="submit"
                      variant="secondary"
                      size="sm"
                      className="border-[#8f4b4b]/40 bg-[#8f4b4b]/10 text-[#f3d8d8] hover:border-[#b56666]/55 hover:bg-[#8f4b4b]/18 hover:text-white"
                    >
                      {locale === "ar" ? "حذف الطلب" : "Delete order"}
                    </Button>
                  </form>
                </div>
              </div>
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
