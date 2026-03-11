"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Rotate3D, Sparkles, X } from "lucide-react";

import { ProductMediaFrame } from "@/components/storefront/product-media-frame";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import type { ProductMedia, ProductViewer360 } from "@/types/product";

interface ProductGalleryProps {
  locale: Locale;
  productName: string;
  media: ProductMedia[];
  viewer360: ProductViewer360;
}

type ActiveSurface =
  | { kind: "media"; mediaId: string }
  | { kind: "viewer360" };

function Viewer360Stage({
  locale,
  productName,
  viewer360,
  activeFrameIndex,
  onFrameChange,
}: {
  locale: Locale;
  productName: string;
  viewer360: ProductViewer360;
  activeFrameIndex: number;
  onFrameChange: (index: number) => void;
}) {
  const copy = getExtendedUiCopy(locale).productGallery;
  const frames = viewer360.frames ?? [];
  const activeFrame = frames[activeFrameIndex] ?? frames[0];
  const hasFrames = frames.length > 0;
  const dragLabel = locale === "ar" ? "اسحب للتدوير" : "Drag to rotate";
  const frameLabel = locale === "ar" ? "إطار" : "Frame";
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  function moveToPreviousFrame() {
    onFrameChange(
      activeFrameIndex === 0 ? frames.length - 1 : activeFrameIndex - 1,
    );
  }

  function moveToNextFrame() {
    onFrameChange((activeFrameIndex + 1) % frames.length);
  }

  function handleDragMove(clientX: number) {
    if (dragStartX === null || frames.length < 2) {
      return;
    }

    const delta = clientX - dragStartX;

    if (Math.abs(delta) < 24) {
      return;
    }

    if (delta > 0) {
      moveToPreviousFrame();
    } else {
      moveToNextFrame();
    }

    setDragStartX(clientX);
  }

  if (hasFrames && activeFrame) {
    return (
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(180deg,#090909_0%,#040404_100%)] shadow-[0_40px_120px_rgba(0,0,0,0.58)] md:aspect-[5/6]"
        onPointerDown={(event) => setDragStartX(event.clientX)}
        onPointerMove={(event) => handleDragMove(event.clientX)}
        onPointerUp={() => setDragStartX(null)}
        onPointerLeave={() => setDragStartX(null)}
      >
        <ProductMediaFrame
          media={activeFrame}
          className="h-full w-full rounded-[2.4rem]"
          emphasis="hero"
        />

        <div className="absolute inset-x-4 bottom-4 rounded-[1.6rem] border border-white/10 bg-black/48 p-4 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="text-left">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/38">
                {copy.futureFrameSlot}
              </p>
              <p className="mt-2 text-sm text-white/72">
                {frameLabel} {activeFrameIndex + 1} / {frames.length}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-10 w-10"
                onClick={moveToPreviousFrame}
                aria-label={locale === "ar" ? "الإطار السابق" : "Previous frame"}
              >
                {locale === "ar" ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-10 w-10"
                onClick={moveToNextFrame}
                aria-label={locale === "ar" ? "الإطار التالي" : "Next frame"}
              >
                {locale === "ar" ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={frames.length - 1}
            step={1}
            value={activeFrameIndex}
            onChange={(event) => onFrameChange(Number(event.target.value))}
            aria-label={dragLabel}
            className="w-full accent-[#b79d67]"
          />

          <div className="mt-3 flex items-center justify-between gap-4 text-[0.72rem] text-white/48">
            <span>{dragLabel}</span>
            <span>{activeFrame.angle}</span>
          </div>
        </div>
      </div>
    );
  }

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
          {copy.futureViewerTitlePrefix} {productName}
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
  locale,
  productName,
  media,
  viewer360,
}: ProductGalleryProps) {
  const copy = getExtendedUiCopy(locale).productGallery;
  const fallbackMedia = media[0];
  const viewerFrames = viewer360.frames ?? [];
  const hasViewerFrames = viewerFrames.length > 0;
  const [activeSurface, setActiveSurface] = useState<ActiveSurface>({
    kind: "media",
    mediaId: fallbackMedia?.id ?? "",
  });
  const [zoomed, setZoomed] = useState(false);
  const [activeViewerFrameIndex, setActiveViewerFrameIndex] = useState(0);
  const isViewerMode = activeSurface.kind === "viewer360";

  if (!fallbackMedia) {
    return (
      <div className="showroom-subpanel flex min-h-[36rem] items-center justify-center p-8 text-center text-sm leading-7 text-white/54">
        {copy.unavailable}
      </div>
    );
  }

  const activeMedia =
    activeSurface.kind !== "media"
      ? fallbackMedia
      : media.find((item) => item.id === activeSurface.mediaId) ?? fallbackMedia;

  return (
    <>
      <div className="space-y-5">
        <div className="showroom-panel p-4 md:p-5">
          <div className="relative">
            {isViewerMode ? (
              <Viewer360Stage
                locale={locale}
                productName={productName}
                viewer360={viewer360}
                activeFrameIndex={activeViewerFrameIndex}
                onFrameChange={setActiveViewerFrameIndex}
              />
            ) : (
              <ProductMediaFrame
                media={activeMedia}
                className="aspect-[4/5] rounded-[2.4rem] md:aspect-[5/6]"
                emphasis="hero"
              />
            )}

            <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
              <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/56">
                {isViewerMode ? copy.viewerReady : copy.zoomReady}
              </div>
              <div className="flex items-center gap-2">
                {viewer360.enabled ? (
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setActiveSurface({ kind: "viewer360" })}
                    aria-label={`${copy.view360} ${productName}`}
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
                    aria-label={`${copy.expand} ${productName}`}
                  >
                    <Expand className="h-4 w-4" />
                  </Button>
                ) : null}
              </div>
            </div>

            {!hasViewerFrames || !isViewerMode ? (
              <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-end justify-between gap-3">
                <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/60">
                  {isViewerMode ? copy.interactiveSlot : activeMedia.angle}
                </div>
                <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/48">
                  {isViewerMode ? viewer360.note : activeMedia.note}
                </div>
              </div>
            ) : null}
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
              <p className="eyebrow">{copy.viewerEyebrow}</p>
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
                {hasViewerFrames
                  ? `${copy.futureFrameSlot} · ${viewerFrames.length}`
                  : copy.futureFrameSlot}
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
