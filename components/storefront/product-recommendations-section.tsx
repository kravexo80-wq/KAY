import { ProductGrid } from "@/components/storefront/product-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/types/product";

interface ProductRecommendationsSectionProps {
  products: Product[];
  collectionName?: string;
  collectionHighlight?: string;
  emptyStateMessage?: string;
}

export function ProductRecommendationsSection({
  products,
  collectionName,
  collectionHighlight,
  emptyStateMessage,
}: ProductRecommendationsSectionProps) {
  return (
    <section className="section-frame section-space space-y-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <SectionHeading
          eyebrow="Curated continuation"
          title={
            collectionName
              ? `More from the ${collectionName} world.`
              : "Curated pieces that keep the same showroom mood."
          }
          description="These recommendations are presented as a continuation of the product story, not a generic upsell strip, so the page keeps its luxury editorial rhythm."
          note="The existing product card system is reused here so related pieces stay visually consistent with the rest of the storefront."
        />

        <div className="showroom-subpanel hidden p-5 lg:block">
          <p className="eyebrow">Collection context</p>
          <p className="mt-4 text-sm leading-7 text-white/54">
            {collectionHighlight ??
              "Related pieces can expand into richer recommendation logic once live catalog and customer data are connected."}
          </p>
        </div>
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="showroom-subpanel p-6 text-sm leading-7 text-white/56">
          {emptyStateMessage ??
            "Related products will appear here as the collection expands."}
        </div>
      )}
    </section>
  );
}
