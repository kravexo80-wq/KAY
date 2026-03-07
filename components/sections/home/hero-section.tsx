import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProductMediaFrame } from "@/components/storefront/product-media-frame";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

interface HeroSectionProps {
  featuredProduct: Product;
}

export function HeroSection({ featuredProduct }: HeroSectionProps) {
  return (
    <section className="section-frame pt-8 md:pt-12">
      <div className="luxury-panel overflow-hidden px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,560px)] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="eyebrow">Premium storefront foundation</p>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-5xl leading-none text-white md:text-7xl">
                  <span className="text-gradient">
                    A dark luxury showroom for modest fashion.
                  </span>
                </h1>
                <p className="max-w-2xl text-base leading-8 text-white/64 md:text-lg">
                  Kravexo is designed to make every product feel singular:
                  cinematic lighting, generous whitespace, and display areas
                  prepared for zoom, angle selection, and future 360 product
                  viewing.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/shop">
                  Explore the showroom
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/collections">Browse collections</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="luxury-muted-panel p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-white/36">
                  Gallery ready
                </p>
                <p className="mt-2 text-lg text-white">Large hero media areas</p>
              </div>
              <div className="luxury-muted-panel p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-white/36">
                  Interaction path
                </p>
                <p className="mt-2 text-lg text-white">Zoom and multi-angle flow</p>
              </div>
              <div className="luxury-muted-panel p-4">
                <p className="text-xs uppercase tracking-[0.26em] text-white/36">
                  Next phase
                </p>
                <p className="mt-2 text-lg text-white">Supabase and Stripe hooks</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <ProductMediaFrame
              media={featuredProduct.gallery[0]}
              className="aspect-[4/5] rounded-[2.5rem]"
            />

            <div className="grid gap-4 md:grid-cols-[1fr_220px]">
              <ProductMediaFrame
                media={featuredProduct.gallery[1]}
                className="aspect-[4/3] rounded-[1.6rem]"
                showNote={false}
              />
              <div className="luxury-muted-panel flex flex-col justify-between p-5">
                <div>
                  <p className="eyebrow">Featured piece</p>
                  <h2 className="mt-3 text-3xl leading-none text-white">
                    {featuredProduct.name}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/56">
                    {featuredProduct.story}
                  </p>
                </div>
                <Link
                  href={`/products/${featuredProduct.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-white/70 transition hover:text-white"
                >
                  View product
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
