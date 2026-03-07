"use client";

import { useState } from "react";
import { Expand, Rotate3D, X } from "lucide-react";

import { ProductMediaFrame } from "@/components/storefront/product-media-frame";
import { Button } from "@/components/ui/button";
import type { ProductMedia } from "@/types/product";

interface ProductGalleryProps {
  productName: string;
  media: ProductMedia[];
}

export function ProductGallery({ productName, media }: ProductGalleryProps) {
  const [activeMedia, setActiveMedia] = useState(media[0]);
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <div className="relative">
          <ProductMediaFrame
            media={activeMedia}
            className="aspect-[4/5] rounded-[2rem] md:aspect-[5/6]"
          />
          <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
            <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/56">
              Zoom-ready display
            </div>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="h-10 w-10"
              onClick={() => setZoomed(true)}
              aria-label={`Expand ${productName} gallery image`}
            >
              <Expand className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_240px]">
          <div className="grid gap-3 sm:grid-cols-3">
            {media.map((item) => {
              const isActive = item.id === activeMedia.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveMedia(item)}
                  className={`overflow-hidden rounded-[1.4rem] border transition ${
                    isActive
                      ? "border-white/18 bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <ProductMediaFrame
                    media={item}
                    className="aspect-[4/3] rounded-[1.4rem]"
                    showNote={false}
                  />
                </button>
              );
            })}
          </div>

          <div className="luxury-muted-panel flex flex-col justify-between p-5">
            <div>
              <p className="eyebrow">360 viewer slot</p>
              <h3 className="mt-3 flex items-center gap-2 text-2xl leading-none text-white">
                <Rotate3D className="h-5 w-5 text-white/55" />
                Future module
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/56">
                This panel is reserved for a future 360 viewer or richer media
                sequence without changing the page layout.
              </p>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.24em] text-white/34">
              Modular media architecture
            </p>
          </div>
        </div>
      </div>

      {zoomed ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-6">
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white transition hover:bg-white/[0.08]"
            aria-label="Close expanded gallery image"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="w-full max-w-4xl">
            <ProductMediaFrame
              media={activeMedia}
              className="aspect-[4/5] rounded-[2.5rem]"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
