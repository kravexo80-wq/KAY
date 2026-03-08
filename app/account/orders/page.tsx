import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { OrderListCard } from "@/components/storefront/order-list-card";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import { getRequestI18n } from "@/lib/i18n/request";
import { requireAuth } from "@/lib/supabase/auth";
import { getOrdersByUser } from "@/lib/supabase/orders";

export const metadata: Metadata = {
  title: "Order History",
};

export default async function AccountOrdersPage() {
  await requireAuth("/account/orders");
  const [{ locale, direction }, orders] = await Promise.all([
    getRequestI18n(),
    getOrdersByUser(),
  ]);
  const copy = getExtendedUiCopy(locale).orders;
  const isRtl = direction === "rtl";

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={copy.customerList.eyebrow}
        title={copy.customerList.title}
        description={copy.customerList.description}
        note={copy.customerList.note}
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/account")}>
                {copy.customerList.eyebrow === "سجل الطلبات"
                  ? "العودة إلى الحساب"
                  : "Back to account"}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={localizeHref(locale, "/shop")}>
                {locale === "ar" ? "متابعة التسوق" : "Continue shopping"}
              </Link>
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
                href={localizeHref(locale, `/account/orders/${order.id}`)}
                locale={locale}
                contextLabel={copy.customerContext}
              />
            ))}
          </div>
        ) : (
          <CatalogStatePanel
            eyebrow={copy.customerList.eyebrow}
            title={copy.customerList.emptyTitle}
            description={copy.customerList.emptyDescription}
            action={
              <Button asChild>
                <Link href={localizeHref(locale, "/shop")}>
                  {locale === "ar" ? "استعراض المعرض" : "Browse the showroom"}
                </Link>
              </Button>
            }
          />
        )}
      </section>
    </div>
  );
}
