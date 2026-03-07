"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  addToCartAction,
  buyNowAction,
} from "@/lib/supabase/cart-actions";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductPurchasePanelProps {
  product: Product;
  collectionName?: string;
  productPath?: string;
  cartMessage?: string | null;
  cartError?: string | null;
}

export function ProductPurchasePanel({
  product,
  collectionName,
  productPath,
  cartMessage,
  cartError,
}: ProductPurchasePanelProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const isPurchasable = product.sizes.length > 0;

  const fitSpec =
    product.specs.find((spec) => spec.label.toLowerCase() === "fit")?.value ??
    product.fitNotes[0];

  const primaryMaterial = product.materials[0] ?? "Premium fabrication";

  function adjustQuantity(nextValue: number) {
    setQuantity(Math.max(1, nextValue));
  }

  return (
    <aside className="space-y-4">
      <form action={addToCartAction} className="showroom-panel p-6 md:p-7">
        <input type="hidden" name="productSlug" value={product.slug} />
        <input
          type="hidden"
          name="productPath"
          value={productPath ?? `/products/${product.slug}`}
        />
        <input type="hidden" name="size" value={selectedSize} />
        <input type="hidden" name="quantity" value={quantity} />
        <input type="hidden" name="color" value="" />

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-2rem] top-0 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(190,169,124,0.14),transparent_72%)] blur-3xl" />
          <div className="absolute left-[12%] top-[18%] h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_72%)] blur-3xl" />
        </div>

        <div className="relative space-y-7">
          {cartError ? (
            <div className="luxury-muted-panel p-4 text-sm leading-7 text-white/62">
              <p className="eyebrow">Cart issue</p>
              <p className="mt-3">{cartError}</p>
            </div>
          ) : null}

          {cartMessage ? (
            <div className="showroom-subpanel p-4 text-sm leading-7 text-white/62">
              <p className="eyebrow">Cart update</p>
              <p className="mt-3">{cartMessage}</p>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-white/46">
              {product.category}
            </span>
            {collectionName ? (
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-white/46">
                {collectionName}
              </span>
            ) : null}
            {product.limitedEdition ? (
              <span className="rounded-full border border-[#b79d67]/30 bg-[#b79d67]/10 px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-[#f3e7c8]">
                Limited release
              </span>
            ) : null}
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h1 className="max-w-xl text-5xl leading-[0.92] text-white md:text-6xl">
                <span className="text-gradient">{product.name}</span>
              </h1>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm uppercase tracking-[0.26em] text-[#f3e7c8]">
                {formatPrice(product.price)}
              </div>
            </div>

            <p className="max-w-2xl text-base leading-8 text-white/62">
              {product.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/48"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.72rem] uppercase tracking-[0.28em] text-white/42">
                  Select size
                </p>
                <p className="text-xs uppercase tracking-[0.24em] text-white/32">
                  Live variant validation
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {product.sizes.map((size) => {
                  const isSelected = size === selectedSize;

                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-[1.2rem] border px-4 py-3 text-sm uppercase tracking-[0.24em] transition ${
                        isSelected
                          ? "border-[#b79d67]/40 bg-[#b79d67]/12 text-[#f3e7c8] shadow-[0_0_32px_rgba(183,157,103,0.12)]"
                          : "border-white/10 bg-white/[0.03] text-white/58 hover:border-white/16 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[0.72rem] uppercase tracking-[0.28em] text-white/42">
                Quantity
              </p>
              <div className="showroom-subpanel flex items-center justify-between rounded-[1.4rem] px-3 py-3">
                <button
                  type="button"
                  onClick={() => adjustQuantity(quantity - 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/64 transition hover:border-white/18 hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="text-center">
                  <p className="text-[0.65rem] uppercase tracking-[0.24em] text-white/30">
                    Selected
                  </p>
                  <p className="mt-1 text-2xl leading-none text-white">{quantity}</p>
                </div>
                <button
                  type="button"
                  onClick={() => adjustQuantity(quantity + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/64 transition hover:border-white/18 hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              size="lg"
              className="w-full"
              formAction={buyNowAction}
              disabled={!isPurchasable}
            >
              <Zap className="h-4 w-4" />
              Buy now
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              type="submit"
              disabled={!isPurchasable}
            >
              <ShoppingBag className="h-4 w-4" />
              Add to cart
            </Button>
          </div>

          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/32">
            {isPurchasable
              ? "Cart, quantity, and stock validation are now live for authenticated accounts."
              : "This product is not currently available for cart selection."}
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="showroom-subpanel px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                Primary fabric
              </p>
              <p className="mt-2 text-sm leading-7 text-white/72">
                {primaryMaterial}
              </p>
            </div>
            <div className="showroom-subpanel px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                Fit profile
              </p>
              <p className="mt-2 text-sm leading-7 text-white/72">{fitSpec}</p>
            </div>
          </div>

          <div className="showroom-subpanel px-4 py-4">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 text-[#f3e7c8]" />
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.26em] text-white/42">
                  Showroom note
                </p>
                <p className="mt-2 text-sm leading-7 text-white/56">
                  {product.shipping.presentation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </aside>
  );
}
