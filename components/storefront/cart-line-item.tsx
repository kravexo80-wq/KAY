import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";

import type { CartDetailItem } from "@/lib/supabase/cart";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import {
  removeCartItemAction,
  updateCartItemQuantityAction,
} from "@/lib/supabase/cart-actions";
import { formatPrice } from "@/lib/utils";

import { ProductMediaFrame } from "./product-media-frame";

interface CartLineItemProps {
  item: CartDetailItem;
  locale: Locale;
}

export function CartLineItem({ item, locale }: CartLineItemProps) {
  const copy = getExtendedUiCopy(locale).cartLineItem;
  const isAtStockLimit =
    item.stockQuantity > 0 && item.quantity >= item.stockQuantity;
  const stockMessage =
    item.stockQuantity < 1
      ? copy.unavailable
      : isAtStockLimit
        ? `${copy.maxReached} (${item.stockQuantity}).`
        : locale === "ar"
          ? `${item.stockQuantity} ${copy.available}.`
          : `${item.stockQuantity} piece${item.stockQuantity === 1 ? "" : "s"} ${copy.available}.`;

  return (
    <article className="luxury-panel overflow-hidden p-4 md:p-5">
      <div className="grid gap-5 lg:grid-cols-[180px_minmax(0,1fr)_220px] lg:items-start">
        <ProductMediaFrame
          media={item.product.media}
          className="aspect-square w-full rounded-[1.6rem]"
          chrome="minimal"
          emphasis="card"
        />

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-white/42">
              {item.product.category}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-white/42">
              {copy.size} {item.size}
            </span>
            {item.color ? (
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-white/42">
                {item.color}
              </span>
            ) : null}
            {item.product.limitedEdition ? (
              <span className="rounded-full border border-[#b79d67]/30 bg-[#b79d67]/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-[#f3e7c8]">
                {copy.limitedRelease}
              </span>
            ) : null}
          </div>

          <div>
            <Link
              href={localizeHref(locale, `/products/${item.product.slug}`)}
              className="inline-block text-3xl leading-none text-white transition hover:text-[#f3e7c8] md:text-4xl"
            >
              {item.product.name}
            </Link>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/56 md:text-base">
              {item.product.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[0.62rem] uppercase tracking-[0.24em] text-white/34">
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
              SKU {item.sku}
            </span>
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
              {copy.unit} {formatPrice(item.unitPrice, locale)}
            </span>
          </div>

          <div className="showroom-subpanel px-4 py-4">
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
              {copy.stockNote}
            </p>
            <p className="mt-2 text-sm leading-7 text-white/62">{stockMessage}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="showroom-subpanel p-4">
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
              {copy.lineTotal}
            </p>
            <p className="mt-3 text-3xl leading-none text-white">
              {formatPrice(item.lineTotal, locale)}
            </p>
            <p className="mt-3 text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
              {copy.quantity} {item.quantity}
            </p>
          </div>

          <div className="showroom-subpanel p-4">
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
              {copy.quantityControl}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <form action={updateCartItemQuantityAction}>
                <input type="hidden" name="cartItemId" value={item.id} />
                <input type="hidden" name="quantity" value={item.quantity - 1} />
                <button
                  type="submit"
                  disabled={item.quantity <= 1}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/64 transition hover:border-white/18 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                  aria-label={`${copy.decrease} ${item.product.name}`}
                >
                  <Minus className="h-4 w-4" />
                </button>
              </form>

              <div className="min-w-14 text-center">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/30">
                  {copy.selected}
                </p>
                <p className="mt-1 text-2xl leading-none text-white">
                  {item.quantity}
                </p>
              </div>

              <form action={updateCartItemQuantityAction}>
                <input type="hidden" name="cartItemId" value={item.id} />
                <input type="hidden" name="quantity" value={item.quantity + 1} />
                <button
                  type="submit"
                  disabled={item.stockQuantity < 1 || isAtStockLimit}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/64 transition hover:border-white/18 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                  aria-label={`${copy.increase} ${item.product.name}`}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <form action={removeCartItemAction}>
            <input type="hidden" name="cartItemId" value={item.id} />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-[0.22em] text-white/60 transition hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
              {copy.removePiece}
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
