import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { ProductGrid } from "@/components/storefront/product-grid";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/supabase/catalog";

export const metadata: Metadata = {
  title: "Shop",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const productsResult = await getAllProducts();
  const products = productsResult.data;
  const filterLabels = [
    "All pieces",
    ...Array.from(new Set(products.map((product) => product.category))).slice(0, 5),
  ];
  const featuredDestination = products[0]
    ? `/products/${products[0].slug}`
    : "/collections";

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Shop"
        title="A catalog designed around display clarity."
        description="The shop keeps the same premium showroom rhythm while now reading directly from the live Supabase catalog for active public products."
        note="Filtering, sorting, inventory state, and richer merchandising can expand on top of this structure without changing the visual language."
        actions={
          <>
            <Button asChild>
              <Link href="/collections">Shop by collection</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={featuredDestination}>
                {products[0] ? "Open featured product" : "Browse collections"}
              </Link>
            </Button>
          </>
        }
      />

      <section className="section-frame space-y-6">
        {filterLabels.length > 0 ? (
          <div className="flex flex-wrap gap-2">
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
          <ProductGrid products={products} />
        ) : (
          <CatalogStatePanel
            eyebrow="Shop catalog"
            title={
              productsResult.status === "ready"
                ? "No public products are live yet."
                : "The public catalog is temporarily unavailable."
            }
            description={
              productsResult.error ??
              "Once active products are published in Supabase, they will appear here automatically."
            }
            action={
              <Button asChild variant="secondary">
                <Link href="/collections">Browse collections</Link>
              </Button>
            }
          />
        )}
      </section>
    </div>
  );
}
