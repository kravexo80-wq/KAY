"use client";

import { useState } from "react";
import { Expand, X } from "lucide-react";

import { ProductMediaFrame } from "@/components/storefront/product-media-frame";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import type { ProductMedia } from "@/types/product";

interface ProductGalleryProps {
  locale: Locale;
  productName: string;
  media: ProductMedia[];
}

export function ProductGallery({
  locale,
  productName,
  media,
}: ProductGalleryProps) {
  const copy = getExtendedUiCopy(locale).productGallery;
  const fallbackMedia = media[0];
  const [activeMediaId, setActiveMediaId] = useState(fallbackMedia?.id ?? "");
  const [zoomed, setZoomed] = useState(false);

  if (!fallbackMedia) {
    return (
      <div className="showroom-subpanel flex min-h-[36rem] items-center justify-center p-8 text-center text-sm leading-7 text-white/54">
        {copy.unavailable}
      </div>
    );
  }

  const activeMedia =
    media.find((item) => item.id === activeMediaId) ?? fallbackMedia;

  return (
    <>
      <div className="space-y-5">
        <div className="showroom-panel p-4 md:p-5">
          <div className="relative">
            <ProductMediaFrame
              media={activeMedia}
              className="aspect-[4/5] rounded-[2.4rem] md:aspect-[5/6]"
              emphasis="hero"
            />

            <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
              <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/56">
                {copy.zoomReady}
              </div>

              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-10 w-10"
                onClick={() => setZoomed(true)}
                aria-label={`${copy.expand} ${productName}`}
              >
                <Expand className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3">
              <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/60">
                {activeMedia.angle}
              </div>
              <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/48">
                {activeMedia.note}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {media.map((item) => {
            const isActive = item.id === activeMedia.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveMediaId(item.id)}
                className={`group rounded-[1.55rem] border p-[1px] transition ${
                  isActive
                    ? "border-[#b79d67]/40 bg-[#b79d67]/10 shadow-[0_0_36px_rgba(183,157,103,0.08)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/16"
                }`}
              >
                <div className="rounded-[calc(1.55rem-1px)] bg-[linear-gradient(180deg,rgba(8,8,8,0.96),rgba(6,6,6,0.98))] p-2">
                  <ProductMediaFrame
                    media={item}
                    className="aspect-[4/3] rounded-[1.25rem]"
                    chrome="minimal"
                    emphasis="card"
                    showNote={false}
                  />
                  <div className="px-2 pb-1 pt-3 text-left">
                    <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/34">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm text-white/72">{item.angle}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {zoomed ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/94 p-6">
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white transition hover:bg-white/[0.08]"
            aria-label={copy.closeExpanded}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="w-full max-w-5xl">
            <ProductMediaFrame
              media={activeMedia}
              className="aspect-[4/5] rounded-[2.8rem]"
              emphasis="hero"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
