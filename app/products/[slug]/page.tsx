import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/storefront/product-gallery";
import { ProductGrid } from "@/components/storefront/product-grid";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

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
}: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  return (
    <div className="space-y-12">
      <section className="section-frame pt-8 md:pt-12">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/38">
          <Link href="/shop" className="transition hover:text-white">
            Shop
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-white/62">{product.name}</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_420px]">
          <ProductGallery productName={product.name} media={product.gallery} />

          <aside className="space-y-4">
            <div className="luxury-panel p-6 md:p-8">
              <p className="eyebrow">{product.category}</p>
              <h1 className="mt-4 text-5xl leading-none text-white md:text-6xl">
                <span className="text-gradient">{product.name}</span>
              </h1>
              <p className="mt-4 text-sm uppercase tracking-[0.24em] text-white/72">
                {formatPrice(product.price)}
              </p>
              <p className="mt-5 text-base leading-8 text-white/64">
                {product.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="flex-1 min-w-40">Reserve piece</Button>
                <Button variant="secondary" className="flex-1 min-w-40">
                  Add to cart later
                </Button>
              </div>
            </div>

            <div className="luxury-muted-panel p-5">
              <p className="eyebrow">Craft story</p>
              <p className="mt-4 text-sm leading-7 text-white/58">
                {product.story}
              </p>
              <div className="mt-5 space-y-2">
                {product.materials.map((material) => (
                  <div
                    key={material}
                    className="rounded-full border border-white/8 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/46"
                  >
                    {material}
                  </div>
                ))}
              </div>
            </div>

            <div className="luxury-muted-panel p-5">
              <p className="eyebrow">Product details</p>
              <div className="mt-4 space-y-3 text-sm text-white/58">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-3"
                  >
                    <span>{spec.label}</span>
                    <span className="text-white/76">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.24em] text-white/36">
                  Available sizes
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/58"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-frame section-space space-y-8">
        <SectionHeading
          eyebrow="Related pieces"
          title="More from the same collection world."
          description="These placeholders show how related products can sit beneath the primary product story without diluting the main hero area."
        />

        {relatedProducts.length > 0 ? (
          <ProductGrid products={relatedProducts} />
        ) : (
          <div className="luxury-muted-panel p-6 text-sm leading-7 text-white/56">
            Related products will appear here when the collection contains more
            live pieces.
          </div>
        )}
      </section>
    </div>
  );
}
