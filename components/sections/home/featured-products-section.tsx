import Link from "next/link";

import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { ProductGrid } from "@/components/storefront/product-grid";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Product } from "@/types/product";

interface FeaturedProductsSectionProps {
  locale: Locale;
  copy: Dictionary["home"]["featuredProducts"];
  commonCopy: Dictionary["common"];
  products: Product[];
  statusMessage?: string | null;
  isRtl?: boolean;
}

export function FeaturedProductsSection({
  locale,
  copy,
  commonCopy,
  products,
  statusMessage,
  isRtl = false,
}: FeaturedProductsSectionProps) {
  return (
    <section className="section-frame section-space space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          note={copy.note}
          isRtl={isRtl}
        />

        <div className={`flex ${isRtl ? "justify-end" : "justify-start lg:justify-end"}`}>
          <Button asChild variant="secondary">
            <Link href={localizeHref(locale, "/shop")}>{copy.viewCatalog}</Link>
          </Button>
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
        <CatalogStatePanel
          eyebrow={copy.emptyEyebrow}
          title={copy.emptyTitle}
          description={statusMessage ?? copy.emptyDescription}
        />
      )}
    </section>
  );
}
