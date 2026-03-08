import Link from "next/link";

import type { AdminProductListItem } from "@/lib/supabase/admin-products";

import { Button } from "@/components/ui/button";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import {
  toggleProductActiveAction,
  toggleProductFeaturedAction,
} from "@/lib/supabase/admin-product-actions";
import { formatPrice } from "@/lib/utils";

import { AdminProductStateBadge } from "./admin-product-state-badge";

interface AdminProductListCardProps {
  product: AdminProductListItem;
  locale: Locale;
}

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function AdminProductListCard({
  product,
  locale,
}: AdminProductListCardProps) {
  const copy = getExtendedUiCopy(locale).adminProducts.card;
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
            {product.primaryImageUrl ? copy.primaryMedia : copy.awaitingImagery}
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
                label={product.isActive ? copy.active : copy.inactive}
                active={product.isActive}
                tone="success"
              />
              <AdminProductStateBadge
                label={product.isFeatured ? copy.featured : copy.standard}
                active={product.isFeatured}
                tone="accent"
              />
              {product.limitedEdition ? (
                <AdminProductStateBadge label={copy.limited} active tone="accent" />
              ) : null}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {copy.price}
              </p>
              <p className="mt-3 text-xl leading-none text-white">
                {formatPrice(product.price, locale)}
              </p>
              {product.compareAtPrice ? (
                <p className="mt-2 text-sm text-white/42 line-through">
                  {formatPrice(product.compareAtPrice, locale)}
                </p>
              ) : null}
            </div>
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {copy.stock}
              </p>
              <p className="mt-3 text-xl leading-none text-white">
                {product.totalStock}
              </p>
              <p className="mt-2 text-sm text-white/42">
                {product.activeVariantCount} {copy.activeVariant}
                {locale === "en" && product.activeVariantCount !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {copy.variants}
              </p>
              <p className="mt-3 text-xl leading-none text-white">
                {product.variantCount}
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {copy.updated}
              </p>
              <p className="mt-3 text-base leading-none text-white/78">
                {formatDate(product.updatedAt, locale)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:w-[180px]">
          <Button asChild>
            <Link href={localizeHref(locale, `/admin/products/${product.id}`)}>
              {copy.editProduct}
            </Link>
          </Button>

          <form action={toggleProductActiveAction}>
            <input type="hidden" name="product_id" value={product.id} />
            <input
              type="hidden"
              name="next_active"
              value={product.isActive ? "false" : "true"}
            />
            <input
              type="hidden"
              name="return_to"
              value={localizeHref(locale, "/admin/products")}
            />
            <Button type="submit" variant="secondary" className="w-full">
              {product.isActive ? copy.deactivate : copy.activate}
            </Button>
          </form>

          <form action={toggleProductFeaturedAction}>
            <input type="hidden" name="product_id" value={product.id} />
            <input
              type="hidden"
              name="next_featured"
              value={product.isFeatured ? "false" : "true"}
            />
            <input
              type="hidden"
              name="return_to"
              value={localizeHref(locale, "/admin/products")}
            />
            <Button type="submit" variant="secondary" className="w-full">
              {product.isFeatured ? copy.unmarkFeatured : copy.markFeatured}
            </Button>
          </form>
        </div>
      </div>
    </article>
  );
}
