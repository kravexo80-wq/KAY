import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { ProductGrid } from "@/components/storefront/product-grid";
import { Button } from "@/components/ui/button";
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
  const collectionResult = await getCollectionBySlug(slug);
  const collection = collectionResult.data;

  if (!collection) {
    return {
      title: "Collection",
    };
  }

  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({
  params,
}: CollectionPageProps) {
  const { slug } = await params;
  const [collectionResult, productsResult] = await Promise.all([
    getCollectionBySlug(slug),
    getProductsByCollectionSlug(slug),
  ]);

  const collection = collectionResult.data;

  if (!collection) {
    if (collectionResult.status === "ready") {
      notFound();
    }

    return (
      <div className="space-y-8 pb-16 md:pb-24">
        <PageIntro
          eyebrow="Collection"
          title="This collection is temporarily unavailable."
          description="The route is live, but the collection data could not be loaded for this request."
          note={
            collectionResult.error ??
            "Please retry once the Supabase catalog is configured and reachable."
          }
        />

        <section className="section-frame">
          <CatalogStatePanel
            eyebrow="Collection state"
            title="Collection details could not be loaded right now."
            description={
              collectionResult.error ??
              "If this collection exists and is active, it will render here once the catalog connection is available."
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
        actions={
          <>
            <Button asChild>
              <Link href="/shop">Back to shop</Link>
            </Button>
            {leadProduct ? (
              <Button asChild variant="secondary">
                <Link href={`/products/${leadProduct.slug}`}>Open featured piece</Link>
              </Button>
            ) : null}
          </>
        }
      />

      <section className="section-frame space-y-6">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/50">
            Collection
          </span>
          <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/50">
            {products.length} public pieces
          </span>
          <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/50">
            {collection.tone} tone
          </span>
        </div>

        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <CatalogStatePanel
            eyebrow="Collection catalog"
            title={
              productsResult.status === "ready"
                ? "No public products are currently assigned to this collection."
                : "This collection's products are temporarily unavailable."
            }
            description={
              productsResult.error ??
              "Publish active products against this collection in Supabase to populate this showroom."
            }
          />
        )}
      </section>
    </div>
  );
}
