import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { ProductGallery } from "@/components/storefront/product-gallery";
import { ProductPurchasePanel } from "@/components/storefront/product-purchase-panel";
import { ProductRecommendationsSection } from "@/components/storefront/product-recommendations-section";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import {
  getCollectionBySlug,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/supabase/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    cartMessage?: string;
    cartError?: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const productResult = await getProductBySlug(slug);
  const product = productResult.data;

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { slug } = await params;
  const { cartMessage, cartError } = await searchParams;
  const [{ locale, direction, dictionary }, productResult] = await Promise.all([
    getRequestI18n(),
    getProductBySlug(slug),
  ]);
  const isRtl = direction === "rtl";
  const product = productResult.data;

  if (!product) {
    if (productResult.status === "ready") {
      notFound();
    }

    return (
      <div className="space-y-8 pb-16 md:pb-24">
        <PageIntro
          eyebrow={dictionary.product.eyebrow}
          title={dictionary.product.fallbackTitle}
          description={dictionary.product.fallbackDescription}
          note={productResult.error ?? dictionary.product.fallbackNote}
          noteLabel={dictionary.common.showroomNote}
          isRtl={isRtl}
        />

        <section className="section-frame">
          <CatalogStatePanel
            eyebrow={dictionary.product.stateEyebrow}
            title={dictionary.product.stateTitle}
            description={productResult.error ?? dictionary.product.stateDescription}
          />
        </section>
      </div>
    );
  }

  const [collectionResult, relatedProductsResult] = await Promise.all([
    product.collectionSlug
      ? getCollectionBySlug(product.collectionSlug)
      : Promise.resolve({ data: null, error: null, status: "ready" as const }),
    getRelatedProducts(product),
  ]);

  const collection = collectionResult.data;
  const relatedProducts = relatedProductsResult.data;

  return (
    <div className="relative overflow-hidden space-y-16 pb-16 md:space-y-20 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10">
        <div className="absolute left-1/2 top-[10rem] h-[26rem] w-[50rem] -translate-x-1/2 bg-[radial-gradient(circle,rgba(190,169,124,0.11),transparent_70%)] blur-3xl" />
        <div className="absolute right-[-8rem] top-[18rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_72%)] blur-3xl" />
        <div className="absolute left-[-10rem] top-[54rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_72%)] blur-3xl" />
      </div>

      <section className="section-frame pt-8 md:pt-12">
        <div
          className={`mb-6 flex flex-wrap items-center gap-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/38 ${isRtl ? "justify-end" : ""}`}
        >
          <Link href={localizeHref(locale, "/shop")} className="transition hover:text-white">
            {dictionary.shop.eyebrow}
          </Link>
          <span>/</span>
          {collection ? (
            <>
              <Link
                href={localizeHref(locale, `/collections/${collection.slug}`)}
                className="transition hover:text-white"
              >
                {collection.name}
              </Link>
              <span>/</span>
            </>
          ) : null}
          <span className="text-white/62">{product.name}</span>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.02fr)_440px]">
          <ProductGallery
            locale={locale}
            productName={product.name}
            media={product.gallery}
            viewer360={product.viewer360}
          />
          <ProductPurchasePanel
            locale={locale}
            copy={dictionary.product.purchase}
            commonCopy={dictionary.common}
            product={product}
            collectionName={collection?.name}
            productPath={localizeHref(locale, `/products/${product.slug}`)}
            cartMessage={cartMessage}
            cartError={cartError}
            isRtl={isRtl}
          />
        </div>
      </section>

      <section className="section-frame grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-6">
          <div className={`showroom-panel p-6 md:p-8 ${isRtl ? "text-right" : "text-left"}`}>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              <div className="space-y-5">
                <p className="eyebrow">{dictionary.product.story}</p>
                <h2 className="max-w-3xl text-4xl leading-[0.95] text-white md:text-6xl">
                  {dictionary.product.storyHeading}
                </h2>
                <p className="max-w-3xl text-base leading-8 text-white/62">
                  {product.description}
                </p>
                <p className="max-w-3xl text-base leading-8 text-white/56">
                  {product.story}
                </p>
              </div>

              <div className="showroom-subpanel p-5">
                <p className="eyebrow">{dictionary.product.collectionNote}</p>
                <h3 className="mt-4 text-3xl leading-none text-white">
                  {collection?.name ?? dictionary.product.signatureCollection}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/56">
                  {collection?.highlight ?? dictionary.product.signatureDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className={`showroom-subpanel p-5 ${isRtl ? "text-right" : "text-left"}`}>
              <p className="eyebrow">{dictionary.product.fabricNotes}</p>
              <div className={`mt-4 flex flex-wrap gap-2 ${isRtl ? "justify-end" : ""}`}>
                {product.materials.map((material) => (
                  <span
                    key={material}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/46"
                  >
                    {material}
                  </span>
                ))}
              </div>
              <div className="mt-5 space-y-3 text-sm leading-7 text-white/58">
                {product.fabricNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>

            <div className={`showroom-subpanel p-5 ${isRtl ? "text-right" : "text-left"}`}>
              <p className="eyebrow">{dictionary.product.fit}</p>
              <div className="mt-5 space-y-3 text-sm leading-7 text-white/58">
                {product.fitNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>

            <div className={`showroom-subpanel p-5 ${isRtl ? "text-right" : "text-left"}`}>
              <p className="eyebrow">{dictionary.product.care}</p>
              <div className="mt-5 space-y-3 text-sm leading-7 text-white/58">
                {product.careNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`showroom-subpanel p-5 ${isRtl ? "text-right" : "text-left"}`}>
            <p className="eyebrow">{dictionary.product.shipping}</p>
            <div className="mt-5 space-y-3 text-sm text-white/58">
              <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  {dictionary.common.leadTime}
                </p>
                <p className="mt-2 leading-7 text-white/72">
                  {product.shipping.leadTime}
                </p>
              </div>
              <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  {dictionary.common.delivery}
                </p>
                <p className="mt-2 leading-7 text-white/72">
                  {product.shipping.delivery}
                </p>
              </div>
              <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  {dictionary.common.returns}
                </p>
                <p className="mt-2 leading-7 text-white/72">
                  {product.shipping.returns}
                </p>
              </div>
            </div>
          </div>

          <div className={`showroom-subpanel p-5 ${isRtl ? "text-right" : "text-left"}`}>
            <p className="eyebrow">{dictionary.product.metadata}</p>
            <div className="mt-5 space-y-3 text-sm text-white/58">
              <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-3">
                <span>{dictionary.common.collection}</span>
                <span className="text-white/76">
                  {collection?.name ?? product.collectionSlug}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-3">
                <span>{dictionary.common.edition}</span>
                <span className="text-white/76">
                  {product.limitedEdition
                    ? dictionary.common.limitedRelease
                    : dictionary.common.coreShowroom}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-3">
                <span>{dictionary.common.primaryFabric}</span>
                <span className="text-right text-white/76">
                  {product.materials[0]}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-3">
                <span>{dictionary.common.stillAngles}</span>
                <span className="text-white/76">{product.gallery.length}</span>
              </div>
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-3"
                >
                  <span>{spec.label}</span>
                  <span className="text-right text-white/76">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductRecommendationsSection
        locale={locale}
        copy={dictionary.product.recommendations}
        commonCopy={dictionary.common}
        products={relatedProducts}
        collectionName={collection?.name}
        collectionHighlight={collection?.highlight}
        emptyStateMessage={relatedProductsResult.error ?? undefined}
        isRtl={isRtl}
      />
    </div>
  );
}
