import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { ProductGrid } from "@/components/storefront/product-grid";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getAllProducts } from "@/lib/supabase/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getRequestI18n();

  return buildPageMetadata({
    locale,
    pathname: "/shop",
    title: locale === "ar" ? "المتجر" : "Shop",
    description:
      locale === "ar"
        ? "تصفح قطع كرافكسو النشطة من الأزياء المحتشمة الفاخرة، مع عرض بصري داكن ومحتوى يركز على الخامة والوقفة والتفاصيل."
        : "Browse Kravexo’s active luxury modest wear collection with a dark editorial presentation focused on silhouette, fabric, and finish.",
  });
}

export default async function ShopPage() {
  const [{ locale, direction, dictionary }, productsResult] = await Promise.all([
    getRequestI18n(),
    getAllProducts(),
  ]);
  const isRtl = direction === "rtl";
  const products = productsResult.data;
  const filterLabels = [
    dictionary.shop.allPieces,
    ...Array.from(new Set(products.map((product) => product.category))).slice(0, 5),
  ];
  const featuredDestination = products[0]
    ? localizeHref(locale, `/products/${products[0].slug}`)
    : localizeHref(locale, "/collections");

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow={dictionary.shop.eyebrow}
        title={dictionary.shop.title}
        description={dictionary.shop.description}
        note={dictionary.shop.note}
        noteLabel={dictionary.common.showroomNote}
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/collections")}>
                {dictionary.common.shopByCollection}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={featuredDestination}>
                {products[0]
                  ? dictionary.common.openFeaturedProduct
                  : dictionary.common.browseCollections}
              </Link>
            </Button>
          </>
        }
      />

      <section className="section-frame space-y-6">
        {filterLabels.length > 0 ? (
          <div className={`flex flex-wrap gap-2 ${isRtl ? "justify-end" : ""}`}>
            {filterLabels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/50"
              >
                {label}
              </span>
            ))}
          </div>
        ) : null}

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
            eyebrow={dictionary.shop.catalogEyebrow}
            title={
              productsResult.status === "ready"
                ? dictionary.shop.emptyTitle
                : dictionary.shop.unavailableTitle
            }
            description={productsResult.error ?? dictionary.shop.emptyDescription}
            action={
              <Button asChild variant="secondary">
                <Link href={localizeHref(locale, "/collections")}>
                  {dictionary.common.browseCollections}
                </Link>
              </Button>
            }
          />
        )}
      </section>
    </div>
  );
}
