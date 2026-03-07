import Link from "next/link";

import { ProductMediaFrame } from "@/components/storefront/product-media-frame";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:border-white/18 hover:bg-white/[0.05]"
    >
      <ProductMediaFrame
        media={product.gallery[0]}
        className="aspect-[4/5] rounded-[1.6rem]"
      />

      <div className="mt-5 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.26em] text-white/42">
              {product.category}
            </p>
            <div>
              <h3 className="text-2xl leading-none text-white">
                {product.name}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-white/56">
                {product.shortDescription}
              </p>
            </div>
          </div>
          <p className="text-sm uppercase tracking-[0.18em] text-white/72">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
