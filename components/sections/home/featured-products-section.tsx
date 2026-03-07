import Link from "next/link";

import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { ProductGrid } from "@/components/storefront/product-grid";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/types/product";

interface FeaturedProductsSectionProps {
  products: Product[];
  statusMessage?: string | null;
}

export function FeaturedProductsSection({
  products,
  statusMessage,
}: FeaturedProductsSectionProps) {
  return (
    <section className="section-frame section-space space-y-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <SectionHeading
          eyebrow="Featured pieces"
          title="Showroom cards built to make the garment feel elevated."
          description="The products are presented with darker stages, reflective framing, refined metadata, and enough breathing room to read as premium objects."
          note="Real photography can replace the placeholder media surfaces later without changing the surrounding composition."
        />

        <div className="flex flex-col gap-4 lg:items-end">
          <div className="showroom-subpanel w-full px-5 py-4 lg:max-w-[320px]">
            <p className="eyebrow">Current focus</p>
            <p className="mt-3 text-sm leading-7 text-white/54">
              Strong card hierarchy, premium hover behavior, and spotlighted
              price treatment for a more luxurious storefront rhythm.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/shop">View full catalog</Link>
          </Button>
        </div>
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <CatalogStatePanel
          eyebrow="Featured products"
          title="Featured pieces will stage here once published."
          description={
            statusMessage ??
            "No featured products are currently active. Feature catalog pieces in Supabase to repopulate this grid."
          }
        />
      )}
    </section>
  );
}
