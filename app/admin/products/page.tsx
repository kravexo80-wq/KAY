import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { AdminProductListCard } from "@/components/storefront/admin-product-list-card";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import { getRequestI18n } from "@/lib/i18n/request";
import { getAdminProducts } from "@/lib/supabase/admin-products";
import { requireAdmin } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Admin Products",
};

type AdminProductsPageProps = {
  searchParams: Promise<{
    updated?: string;
    error?: string;
  }>;
};

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  await requireAdmin("/admin/products");
  const [{ locale, direction, dictionary }, products, resolvedSearchParams] =
    await Promise.all([
      getRequestI18n(),
      getAdminProducts(),
      searchParams,
    ]);
  const copy = getExtendedUiCopy(locale).adminProducts;
  const isRtl = direction === "rtl";
  const activeCount = products.filter((product) => product.isActive).length;
  const featuredCount = products.filter((product) => product.isFeatured).length;
  const lowStockCount = products.filter(
    (product) => product.activeVariantCount > 0 && product.totalStock < 6,
  ).length;
  const metrics = [
    { label: copy.list.products, value: `${products.length}` },
    { label: copy.list.active, value: `${activeCount}` },
    { label: copy.list.featured, value: `${featuredCount}` },
    { label: copy.list.lowStock, value: `${lowStockCount}` },
  ];
  const statusMessage =
    resolvedSearchParams.updated === "active"
      ? copy.list.activeUpdated
      : resolvedSearchParams.updated === "featured"
        ? copy.list.featuredUpdated
        : resolvedSearchParams.error ?? null;
  const isError = Boolean(
    resolvedSearchParams.error &&
      !["active", "featured"].includes(resolvedSearchParams.updated ?? ""),
  );

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={copy.list.eyebrow}
        title={copy.list.title}
        description={copy.list.description}
        note={copy.list.note}
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/admin/products/new")}>
                {copy.form.createProduct}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={localizeHref(locale, "/admin")}>
                {dictionary.common.backToDashboard}
              </Link>
            </Button>
          </>
        }
      />

      {statusMessage ? (
        <section className="section-frame">
          <div className={isError ? "luxury-muted-panel p-5" : "showroom-panel p-5"}>
            <p className="eyebrow">
              {isError ? copy.list.updateError : copy.list.updateSaved}
            </p>
            <p className="mt-4 text-sm leading-7 text-white/58">{statusMessage}</p>
          </div>
        </section>
      ) : null}

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

        {products.length > 0 ? (
          <div className="grid gap-4">
            {products.map((product) => (
              <AdminProductListCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <CatalogStatePanel
            eyebrow={copy.list.eyebrow}
            title={copy.list.emptyTitle}
            description={copy.list.emptyDescription}
            action={
              <Button asChild>
                <Link href={localizeHref(locale, "/admin/products/new")}>
                  {copy.form.createProduct}
                </Link>
              </Button>
            }
          />
        )}
      </section>
    </div>
  );
}
