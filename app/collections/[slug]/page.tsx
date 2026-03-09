import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { ProductGrid } from "@/components/storefront/product-grid";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  getCollectionBySlug,
  getProductsByCollectionSlug,
} from "@/lib/supabase/catalog";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [{ locale }, collectionResult] = await Promise.all([
    getRequestI18n(),
    getCollectionBySlug(slug),
  ]);
  const collection = collectionResult.data;

  if (!collection) {
    return buildPageMetadata({
      locale,
      pathname: `/collections/${slug}`,
      title: locale === "ar" ? "المجموعة غير موجودة" : "Collection not found",
      description:
        locale === "ar"
          ? "تعذر العثور على هذه المجموعة ضمن العروض العامة الحالية."
          : "This collection could not be found in the current public catalog.",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    locale,
    pathname: `/collections/${collection.slug}`,
    title: collection.name,
    description: collection.description,
  });
}

export default async function CollectionDetailPage({
  params,
}: CollectionPageProps) {
  const { slug } = await params;
  const [{ locale, direction, dictionary }, collectionResult, productsResult] =
    await Promise.all([
      getRequestI18n(),
      getCollectionBySlug(slug),
      getProductsByCollectionSlug(slug),
    ]);
  const isRtl = direction === "rtl";
  const collection = collectionResult.data;

  if (!collection) {
    if (collectionResult.status === "ready") {
      notFound();
    }

    return (
      <div className="space-y-8 pb-16 md:pb-24">
        <PageIntro
          eyebrow={dictionary.collections.detail.fallbackEyebrow}
          title={dictionary.collections.detail.fallbackTitle}
          description={dictionary.collections.detail.fallbackDescription}
          note={collectionResult.error ?? dictionary.collections.detail.fallbackNote}
          noteLabel={dictionary.common.showroomNote}
          isRtl={isRtl}
        />

        <section className="section-frame">
          <CatalogStatePanel
            eyebrow={dictionary.collections.detail.stateEyebrow}
            title={dictionary.collections.detail.stateTitle}
            description={
              collectionResult.error ?? dictionary.collections.detail.stateDescription
            }
          />
        </section>
      </div>
    );
  }

  const products = productsResult.data;
  const leadProduct = products[0] ?? null;

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={collection.eyebrow}
        title={collection.name}
        description={collection.description}
        note={collection.highlight}
        noteLabel={dictionary.common.showroomNote}
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/shop")}>
                {dictionary.common.backToShop}
              </Link>
            </Button>
            {leadProduct ? (
              <Button asChild variant="secondary">
                <Link href={localizeHref(locale, `/products/${leadProduct.slug}`)}>
                  {dictionary.collections.detail.openFeaturedPiece}
                </Link>
              </Button>
            ) : null}
          </>
        }
      />

      <section className="section-frame space-y-6">
        <div className={`flex flex-wrap gap-2 ${isRtl ? "justify-end" : ""}`}>
          <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/50">
            {dictionary.collections.detail.collectionPill}
          </span>
          <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/50">
            {products.length} {dictionary.common.publicPieces}
          </span>
          <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/50">
            {collection.tone} {dictionary.common.state.toLowerCase()}
          </span>
        </div>

        {products.length > 0 ? (
          <ProductGrid
            products={products}
            locale={locale}
            labels={{
              limitedRelease: dictionary.common.limitedRelease,
              angles: dictionary.common.angles,
              sizes: dictionary.common.sizes,
              material: dictionary.common.material,
              viewPiece: dictionary.common.viewPiece,
            }}
            isRtl={isRtl}
          />
        ) : (
          <CatalogStatePanel
            eyebrow={dictionary.collections.detail.catalogEyebrow}
            title={
              productsResult.status === "ready"
                ? dictionary.collections.detail.emptyTitle
                : dictionary.collections.detail.unavailableTitle
            }
            description={
              productsResult.error ?? dictionary.collections.detail.emptyDescription
            }
          />
        )}
      </section>
    </div>
  );
}
