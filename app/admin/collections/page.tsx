import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { AdminCollectionListCard } from "@/components/storefront/admin-collection-list-card";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { Button } from "@/components/ui/button";
import { getAdminTaxonomyCopy } from "@/lib/i18n/admin-taxonomy-copy";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { getAdminCollections } from "@/lib/supabase/admin-collections";
import { requireAdmin } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Admin Collections",
};

type AdminCollectionsPageProps = {
  searchParams: Promise<{
    updated?: string;
    error?: string;
  }>;
};

export default async function AdminCollectionsPage({
  searchParams,
}: AdminCollectionsPageProps) {
  await requireAdmin("/admin/collections");
  const [{ locale, direction, dictionary }, collections, resolvedSearchParams] =
    await Promise.all([
      getRequestI18n(),
      getAdminCollections(),
      searchParams,
    ]);
  const copy = getAdminTaxonomyCopy(locale).collections;
  const isRtl = direction === "rtl";
  const activeCount = collections.filter((collection) => collection.isActive).length;
  const featuredCount = collections.filter((collection) => collection.isFeatured).length;
  const assignedProductCount = collections.reduce(
    (total, collection) => total + collection.productCount,
    0,
  );
  const metrics = [
    { label: copy.list.count, value: `${collections.length}` },
    { label: copy.list.active, value: `${activeCount}` },
    { label: copy.list.featured, value: `${featuredCount}` },
    { label: copy.list.assignedProducts, value: `${assignedProductCount}` },
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
              <Link href={localizeHref(locale, "/admin/collections/new")}>
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

        {collections.length > 0 ? (
          <div className="grid gap-4">
            {collections.map((collection) => (
              <AdminCollectionListCard
                key={collection.id}
                collection={collection}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <CatalogStatePanel
            eyebrow={copy.list.eyebrow}
            title={copy.list.emptyTitle}
            description={copy.list.emptyDescription}
            action={
              <Button asChild>
                <Link href={localizeHref(locale, "/admin/collections/new")}>
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
