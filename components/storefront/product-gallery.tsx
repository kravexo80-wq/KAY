"use client";

import { useState } from "react";
import { Expand, Rotate3D, Sparkles, X } from "lucide-react";

import { ProductMediaFrame } from "@/components/storefront/product-media-frame";
import { Button } from "@/components/ui/button";
import type { ProductMedia, ProductViewer360 } from "@/types/product";

interface ProductGalleryProps {
  productName: string;
  media: ProductMedia[];
  viewer360: ProductViewer360;
}

type ActiveSurface =
  | { kind: "media"; mediaId: string }
  | { kind: "viewer360" };

function Viewer360Stage({
  productName,
  viewer360,
}: {
  productName: string;
  viewer360: ProductViewer360;
}) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,#090909_0%,#040404_100%)] shadow-[0_40px_120px_rgba(0,0,0,0.58)] md:aspect-[5/6]">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-[20%] h-48 w-48 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_72%)] blur-3xl" />
        <div className="absolute left-1/2 top-[50%] h-72 w-72 -translate-x-1/2 rounded-full border border-white/8 bg-[radial-gradient(circle,rgba(190,169,124,0.12),transparent_72%)] shadow-[0_0_80px_rgba(190,169,124,0.08)]" />
        <div className="absolute left-1/2 top-[50%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/14" />
        <div className="absolute inset-x-[18%] bottom-[12%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]" />
        <div className="absolute inset-x-[22%] bottom-[10%] h-12 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_72%)] blur-2xl" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center px-8 text-center">
        <div className="rounded-full border border-white/10 bg-white/[0.04] p-4">
          <Rotate3D className="h-10 w-10 text-[#f3e7c8]" />
        </div>
        <p className="mt-6 text-[0.68rem] uppercase tracking-[0.32em] text-white/44">
          {viewer360.label}
        </p>
        <h3 className="mt-4 text-4xl leading-none text-white md:text-5xl">
          Future interactive viewer for {productName}
        </h3>
        <p className="mt-4 max-w-lg text-sm leading-8 text-white/56 md:text-base">
          {viewer360.description}
        </p>
        <p className="mt-6 max-w-md text-[0.72rem] uppercase tracking-[0.26em] text-white/34">
          {viewer360.note}
        </p>
      </div>
    </div>
  );
}

export function ProductGallery({
  productName,
  media,
  viewer360,
}: ProductGalleryProps) {
  const fallbackMedia = media[0];
  const [activeSurface, setActiveSurface] = useState<ActiveSurface>({
    kind: "media",
    mediaId: fallbackMedia?.id ?? "",
  });
  const [zoomed, setZoomed] = useState(false);

  if (!fallbackMedia) {
    return (
      <div className="showroom-subpanel flex min-h-[36rem] items-center justify-center p-8 text-center text-sm leading-7 text-white/54">
        Product media will appear here once gallery assets are connected.
      </div>
    );
  }

  const activeMedia =
    activeSurface.kind !== "media"
      ? fallbackMedia
      : media.find((item) => item.id === activeSurface.mediaId) ?? fallbackMedia;

  const isViewerMode = activeSurface.kind === "viewer360";

  return (
    <>
      <div className="space-y-5">
        <div className="showroom-panel p-4 md:p-5">
          <div className="relative">
            {isViewerMode ? (
              <Viewer360Stage productName={productName} viewer360={viewer360} />
            ) : (
              <ProductMediaFrame
                media={activeMedia}
                className="aspect-[4/5] rounded-[2.4rem] md:aspect-[5/6]"
                emphasis="hero"
              />
            )}

            <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
              <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/56">
                {isViewerMode ? "360-ready module" : "Zoom-ready display"}
              </div>
              <div className="flex items-center gap-2">
                {viewer360.enabled ? (
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setActiveSurface({ kind: "viewer360" })}
                    aria-label={`View 360 placeholder for ${productName}`}
                  >
                    <Rotate3D className="h-4 w-4" />
                  </Button>
                ) : null}
                {!isViewerMode ? (
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
                ) : null}
              </div>
            </div>

            <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3">
              <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/60">
                {isViewerMode ? "Interactive module slot" : activeMedia.angle}
              </div>
              <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/48">
                {isViewerMode ? viewer360.note : activeMedia.note}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="grid gap-3 sm:grid-cols-3">
            {media.map((item) => {
              const isActive =
                activeSurface.kind === "media" && item.id === activeMedia.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setActiveSurface({ kind: "media", mediaId: item.id })
                  }
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

          <button
            type="button"
            onClick={() => setActiveSurface({ kind: "viewer360" })}
            className={`showroom-subpanel flex h-full min-h-[14rem] flex-col justify-between p-5 text-left transition ${
              isViewerMode
                ? "border-[#b79d67]/30 bg-[#b79d67]/[0.07]"
                : "hover:border-white/14 hover:bg-white/[0.04]"
            }`}
          >
            <div>
              <p className="eyebrow">360 viewer</p>
              <h3 className="mt-3 flex items-center gap-2 text-2xl leading-none text-white">
                <Rotate3D className="h-5 w-5 text-[#f3e7c8]" />
                {viewer360.label}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/54">
                {viewer360.description}
              </p>
            </div>
            <div className="space-y-3">
              <div className="hairline" />
              <div className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.26em] text-white/40">
                <Sparkles className="h-4 w-4 text-white/38" />
                Future frame sequence slot
              </div>
            </div>
          </button>
        </div>
      </div>

      {zoomed && activeMedia ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/94 p-6">
          <button
            type="button"
            onClick={() => setZoomed(false)}
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white transition hover:bg-white/[0.08]"
            aria-label="Close expanded gallery image"
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
