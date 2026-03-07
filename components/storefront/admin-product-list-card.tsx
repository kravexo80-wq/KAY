import Link from "next/link";

import type { AdminProductListItem } from "@/lib/supabase/admin-products";

import { Button } from "@/components/ui/button";
import {
  toggleProductActiveAction,
  toggleProductFeaturedAction,
} from "@/lib/supabase/admin-product-actions";
import { formatPrice } from "@/lib/utils";

import { AdminProductStateBadge } from "./admin-product-state-badge";

interface AdminProductListCardProps {
  product: AdminProductListItem;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function AdminProductListCard({ product }: AdminProductListCardProps) {
  const mediaStyle = product.primaryImageUrl
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(8,8,9,0.08), rgba(8,8,9,0.78)), url(${product.primaryImageUrl})`,
      }
    : undefined;

  return (
    <article className="luxury-panel overflow-hidden p-5 md:p-6">
      <div className="grid gap-5 lg:grid-cols-[160px_minmax(0,1fr)_auto] lg:items-start">
        <div
          className="relative min-h-40 overflow-hidden rounded-[1.4rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.45))] bg-cover bg-center"
          style={mediaStyle}
        >
          <div className="absolute inset-x-4 bottom-4 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[0.62rem] uppercase tracking-[0.22em] text-white/62 backdrop-blur-sm">
            {product.primaryImageUrl ? "Primary media" : "Awaiting imagery"}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.26em] text-white/34">
                {product.slug}
              </p>
              <h2 className="mt-3 text-3xl leading-none text-white">
                {product.name}
              </h2>
              <p className="mt-4 text-sm text-white/52">
                {product.categoryName}
                {product.collectionName ? ` | ${product.collectionName}` : ""}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <AdminProductStateBadge
                label={product.isActive ? "Active" : "Inactive"}
                active={product.isActive}
                tone="success"
              />
              <AdminProductStateBadge
                label={product.isFeatured ? "Featured" : "Standard"}
                active={product.isFeatured}
                tone="accent"
              />
              {product.limitedEdition ? (
                <AdminProductStateBadge
                  label="Limited"
                  active
                  tone="accent"
                />
              ) : null}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                Price
              </p>
              <p className="mt-3 text-xl leading-none text-white">
                {formatPrice(product.price)}
              </p>
              {product.compareAtPrice ? (
                <p className="mt-2 text-sm text-white/42 line-through">
                  {formatPrice(product.compareAtPrice)}
                </p>
              ) : null}
            </div>
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                Stock
              </p>
              <p className="mt-3 text-xl leading-none text-white">
                {product.totalStock}
              </p>
              <p className="mt-2 text-sm text-white/42">
                {product.activeVariantCount} active variant
                {product.activeVariantCount === 1 ? "" : "s"}
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                Variants
              </p>
              <p className="mt-3 text-xl leading-none text-white">
                {product.variantCount}
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                Updated
              </p>
              <p className="mt-3 text-base leading-none text-white/78">
                {formatDate(product.updatedAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:w-[180px]">
          <Button asChild>
            <Link href={`/admin/products/${product.id}`}>Edit product</Link>
          </Button>

          <form action={toggleProductActiveAction}>
            <input type="hidden" name="product_id" value={product.id} />
            <input
              type="hidden"
              name="next_active"
              value={product.isActive ? "false" : "true"}
            />
            <input type="hidden" name="return_to" value="/admin/products" />
            <Button type="submit" variant="secondary" className="w-full">
              {product.isActive ? "Deactivate" : "Activate"}
            </Button>
          </form>

          <form action={toggleProductFeaturedAction}>
            <input type="hidden" name="product_id" value={product.id} />
            <input
              type="hidden"
              name="next_featured"
              value={product.isFeatured ? "false" : "true"}
            />
            <input type="hidden" name="return_to" value="/admin/products" />
            <Button type="submit" variant="secondary" className="w-full">
              {product.isFeatured ? "Unmark featured" : "Mark featured"}
            </Button>
          </form>
        </div>
      </div>
    </article>
  );
}
