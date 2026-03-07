import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { ProductGrid } from "@/components/storefront/product-grid";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Shop",
};

export default function ShopPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Shop"
        title="A catalog designed around display clarity."
        description="The shop foundation prioritizes strong product contrast, premium spacing, and a grid system that can later support real filters, collections, inventory, and personalization."
        note="Filtering, sorting, inventory state, and Supabase-backed catalog data can slot into this structure without changing the visual system."
        actions={
          <>
            <Button asChild>
              <Link href="/collections">Shop by collection</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/products/obsidian-thobe">Open featured product</Link>
            </Button>
          </>
        }
      />

      <section className="section-frame space-y-6">
        <div className="flex flex-wrap gap-2">
          {[
            "All pieces",
            "Men",
            "Women",
            "Ceremony",
            "Essentials",
            "Launch pieces",
          ].map((label) => (
            <span
              key={label}
              className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/50"
            >
              {label}
            </span>
          ))}
        </div>

        <ProductGrid products={products} />
      </section>
    </div>
  );
}
