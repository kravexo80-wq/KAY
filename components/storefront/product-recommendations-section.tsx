import { ProductGrid } from "@/components/storefront/product-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Product } from "@/types/product";

interface ProductRecommendationsSectionProps {
  locale: Locale;
  copy: Dictionary["product"]["recommendations"];
  commonCopy: Dictionary["common"];
  products: Product[];
  collectionName?: string;
  collectionHighlight?: string;
  emptyStateMessage?: string;
  isRtl?: boolean;
}

export function ProductRecommendationsSection({
  locale,
  copy,
  commonCopy,
  products,
  collectionName,
  collectionHighlight,
  emptyStateMessage,
  isRtl = false,
}: ProductRecommendationsSectionProps) {
  const title = collectionName
    ? locale === "ar"
      ? `المزيد من عالم ${collectionName}.`
      : `More from the ${collectionName} world.`
    : copy.titleFallback;

  return (
    <section className="section-frame section-space space-y-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={title}
          description={copy.description}
          note={copy.note}
          isRtl={isRtl}
        />

        <div className={`showroom-subpanel hidden p-5 lg:block ${isRtl ? "text-right" : "text-left"}`}>
          <p className="eyebrow">{copy.contextTitle}</p>
          <p className="mt-4 text-sm leading-7 text-white/54">
            {collectionHighlight ?? copy.contextFallback}
          </p>
        </div>
      </div>

      {products.length > 0 ? (
        <ProductGrid
          products={products}
          locale={locale}
          labels={{
            limitedRelease: commonCopy.limitedRelease,
            angles: commonCopy.angles,
            sizes: commonCopy.sizes,
            material: commonCopy.material,
            viewPiece: commonCopy.viewPiece,
          }}
          isRtl={isRtl}
        />
      ) : (
        <div className={`showroom-subpanel p-6 text-sm leading-7 text-white/56 ${isRtl ? "text-right" : "text-left"}`}>
          {emptyStateMessage ?? copy.empty}
        </div>
      )}
    </section>
  );
}
