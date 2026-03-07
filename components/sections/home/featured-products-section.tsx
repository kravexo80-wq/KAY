import Link from "next/link";

import { ProductGrid } from "@/components/storefront/product-grid";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/types/product";

interface FeaturedProductsSectionProps {
  products: Product[];
}

export function FeaturedProductsSection({
  products,
}: FeaturedProductsSectionProps) {
  return (
    <section className="section-frame section-space space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Featured pieces"
          title="Product cards designed to spotlight the garment."
          description="The card system favors large media surfaces, quiet metadata, and strong separation so the item reads as the primary object."
        />
        <Button asChild variant="secondary">
          <Link href="/shop">View full catalog</Link>
        </Button>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}
