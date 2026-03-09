import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { AdminCategoryListCard } from "@/components/storefront/admin-category-list-card";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { Button } from "@/components/ui/button";
import { getAdminTaxonomyCopy } from "@/lib/i18n/admin-taxonomy-copy";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { getAdminCategories } from "@/lib/supabase/admin-categories";
import { requireAdmin } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Admin Categories",
};

type AdminCategoriesPageProps = {
  searchParams: Promise<{
    updated?: string;
    error?: string;
  }>;
};

export default async function AdminCategoriesPage({
  searchParams,
}: AdminCategoriesPageProps) {
  await requireAdmin("/admin/categories");
  const [{ locale, direction, dictionary }, categories, resolvedSearchParams] =
    await Promise.all([
      getRequestI18n(),
      getAdminCategories(),
      searchParams,
    ]);
  const copy = getAdminTaxonomyCopy(locale).categories;
  const isRtl = direction === "rtl";
  const activeCount = categories.filter((category) => category.isActive).length;
  const assignedProductCount = categories.reduce(
    (total, category) => total + category.productCount,
    0,
  );
  const unusedCount = categories.filter((category) => category.productCount === 0).length;
  const metrics = [
    { label: copy.list.count, value: `${categories.length}` },
    { label: copy.list.active, value: `${activeCount}` },
    { label: copy.list.assignedProducts, value: `${assignedProductCount}` },
    { label: copy.list.unused, value: `${unusedCount}` },
  ];
  const statusMessage =
    resolvedSearchParams.updated === "active"
      ? copy.list.activeUpdated
      : resolvedSearchParams.error ?? null;
  const isError = Boolean(
    resolvedSearchParams.error && resolvedSearchParams.updated !== "active",
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
              <Link href={localizeHref(locale, "/admin/categories/new")}>
                {copy.form.create}
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
              <p className="mt-3 text-4xl leading-none text-white">{metric.value}</p>
            </div>
          ))}
        </div>

        {categories.length > 0 ? (
          <div className="grid gap-4">
            {categories.map((category) => (
              <AdminCategoryListCard key={category.id} category={category} locale={locale} />
            ))}
          </div>
        ) : (
          <CatalogStatePanel
            eyebrow={copy.list.eyebrow}
            title={copy.list.emptyTitle}
            description={copy.list.emptyDescription}
            action={
              <Button asChild>
                <Link href={localizeHref(locale, "/admin/categories/new")}>
                  {copy.form.create}
                </Link>
              </Button>
            }
          />
        )}
      </section>
    </div>
  );
}
