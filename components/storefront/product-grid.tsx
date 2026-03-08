import { ProductCard } from "@/components/storefront/product-card";
import type { Locale } from "@/lib/i18n/config";
import type { Product } from "@/types/product";
import type { ProductCardLabels } from "./product-card";

interface ProductGridProps {
  products: Product[];
  locale?: Locale;
  labels?: ProductCardLabels;
  isRtl?: boolean;
}

export function ProductGrid({
  products,
  locale = "en",
  labels,
  isRtl = false,
}: ProductGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.slug}
          product={product}
          locale={locale}
          labels={labels}
          isRtl={isRtl}
        />
      ))}
    </div>
  );
}
