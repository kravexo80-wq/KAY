import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ProductMediaFrame } from "@/components/storefront/product-media-frame";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

export interface ProductCardLabels {
  limitedRelease: string;
  angles: string;
  sizes: string;
  material: string;
  viewPiece: string;
}

interface ProductCardProps {
  product: Product;
  locale?: Locale;
  labels?: ProductCardLabels;
  isRtl?: boolean;
}

const defaultLabels: ProductCardLabels = {
  limitedRelease: "Limited release",
  angles: "angles",
  sizes: "Sizes",
  material: "Material",
  viewPiece: "View piece",
};

export function ProductCard({
  product,
  locale = "en",
  labels = defaultLabels,
  isRtl = false,
}: ProductCardProps) {
  return (
    <Link
      href={localizeHref(locale, `/products/${product.slug}`)}
      className="group block h-full rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-[1px] shadow-[0_32px_100px_rgba(0,0,0,0.42)] transition duration-500 hover:-translate-y-2 hover:border-white/16 hover:shadow-[0_48px_140px_rgba(0,0,0,0.56),0_0_60px_rgba(190,169,124,0.08)]"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(2.25rem-1px)] bg-[linear-gradient(180deg,rgba(10,10,10,0.96),rgba(7,7,7,0.98))] p-4 md:p-5">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-8 top-0 h-28 bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_68%)] blur-2xl" />
          <div className="absolute -right-16 top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(190,169,124,0.18),transparent_72%)] blur-3xl opacity-70 transition duration-500 group-hover:opacity-100" />
        </div>

        <ProductMediaFrame
          media={product.gallery[0]}
          className="aspect-[4/5] rounded-[1.85rem]"
          chrome="minimal"
          emphasis="card"
        />

        <div className="relative mt-6 flex flex-1 flex-col justify-between">
          <div className={`space-y-5 ${isRtl ? "text-right" : "text-left"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.28em] text-white/38">
                  {product.category}
                </p>
                <div className="space-y-2">
                  <h3 className="text-[2rem] leading-none text-white md:text-[2.25rem]">
                    {product.name}
                  </h3>
                  <p className="max-w-sm text-sm leading-7 text-white/54">
                    {product.shortDescription}
                  </p>
                </div>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-[#f3e7c8]">
                {formatPrice(product.price)}
              </div>
            </div>

            <div className={`flex flex-wrap gap-2 ${isRtl ? "justify-end" : ""}`}>
              {[
                ...(product.limitedEdition ? [labels.limitedRelease] : []),
                ...product.tags,
              ]
                .slice(0, 2)
                .map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/48"
                  >
                    {tag}
                  </span>
                ))}
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/42">
                {product.gallery.length} {labels.angles}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/8 pt-5">
            <div className="flex flex-wrap gap-5 text-sm">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  {labels.sizes}
                </p>
                <p className="mt-1 text-white/74">{product.sizes.join(" / ")}</p>
              </div>
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  {labels.material}
                </p>
                <p className="mt-1 text-white/74">{product.materials[0]}</p>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.28em] text-white/56 transition duration-300 group-hover:text-white">
              {labels.viewPiece}
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
