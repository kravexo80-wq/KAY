import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { ProductMediaFrame } from "@/components/storefront/product-media-frame";
import { Button } from "@/components/ui/button";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

interface HeroSectionProps {
  locale: Locale;
  copy: Dictionary["home"]["hero"];
  featuredProduct?: Product | null;
  statusMessage?: string | null;
  isRtl?: boolean;
}

export function HeroSection({
  locale,
  copy,
  featuredProduct,
  statusMessage,
  isRtl = false,
}: HeroSectionProps) {
  if (!featuredProduct) {
    return (
      <section className="px-4 pt-6 md:px-6 md:pt-8">
        <div className="showroom-panel mx-auto max-w-[1520px] px-6 py-8 md:px-10 md:py-12 xl:px-14 xl:py-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[12%] top-[10%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(190,169,124,0.16),transparent_72%)] blur-3xl" />
            <div className="absolute right-[10%] top-[12%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_72%)] blur-3xl" />
            <div className="absolute inset-x-[24%] top-[14%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]" />
          </div>

          <div className="grid gap-12 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,0.86fr)] xl:items-center">
            <div className={`relative z-10 space-y-10 ${isRtl ? "text-right" : "text-left"}`}>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-[#f0dfb6] shadow-[0_0_20px_rgba(240,223,182,0.6)]" />
                  <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/54">
                    {copy.badge}
                  </p>
                </div>

                <div className="space-y-5">
                  <h1 className="max-w-5xl text-[clamp(3.7rem,7.6vw,7.8rem)] leading-[0.9] text-white">
                    <span className="text-gradient">{copy.title}</span>
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-white/62 md:text-lg">
                    {copy.description}
                  </p>
                </div>
              </div>

              <div className={`flex flex-wrap gap-3 ${isRtl ? "justify-end" : ""}`}>
                <Button asChild size="lg">
                  <Link href={localizeHref(locale, "/shop")}>
                    {copy.primaryCta}
                    <ArrowRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href={localizeHref(locale, "/collections")}>
                    {copy.secondaryCta}
                  </Link>
                </Button>
              </div>
            </div>

            <CatalogStatePanel
              eyebrow={copy.fallback.eyebrow}
              title={copy.fallback.title}
              description={statusMessage ?? copy.fallback.description}
              className="min-h-[26rem] self-stretch"
            />
          </div>
        </div>
      </section>
    );
  }

  const secondaryMedia = featuredProduct.gallery[1] ?? featuredProduct.gallery[0];
  const detailMedia = featuredProduct.gallery[2] ?? secondaryMedia;

  return (
    <section className="px-4 pt-6 md:px-6 md:pt-8">
      <div className="showroom-panel mx-auto max-w-[1520px] px-6 py-8 md:px-10 md:py-12 xl:px-14 xl:py-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[12%] top-[10%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(190,169,124,0.16),transparent_72%)] blur-3xl" />
          <div className="absolute right-[10%] top-[12%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_72%)] blur-3xl" />
          <div className="absolute inset-x-[24%] top-[14%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]" />
          <div className="absolute inset-y-0 right-[38%] hidden w-px bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.06),transparent)] xl:block" />
        </div>

        <div className="grid gap-12 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,0.86fr)] xl:items-center">
          <div className={`relative z-10 space-y-10 ${isRtl ? "text-right" : "text-left"}`}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#f0dfb6] shadow-[0_0_20px_rgba(240,223,182,0.6)]" />
                <p className="text-[0.68rem] uppercase tracking-[0.34em] text-white/54">
                  {copy.badge}
                </p>
              </div>

              <div className="space-y-5">
                <h1 className="max-w-5xl text-[clamp(3.7rem,7.6vw,7.8rem)] leading-[0.9] text-white">
                  <span className="text-gradient">{copy.title}</span>
                </h1>
                <p className="max-w-2xl text-base leading-8 text-white/62 md:text-lg">
                  {copy.description}
                </p>
              </div>
            </div>

            <div className={`flex flex-wrap gap-3 ${isRtl ? "justify-end" : ""}`}>
              <Button asChild size="lg">
                <Link href={localizeHref(locale, "/shop")}>
                  {copy.primaryCta}
                  <ArrowRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={localizeHref(locale, "/collections")}>
                  {copy.secondaryCta}
                </Link>
              </Button>
            </div>

            <div className={`flex flex-wrap gap-2 ${isRtl ? "justify-end" : ""}`}>
              {featuredProduct.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-white/48"
                >
                  {tag}
                </span>
              ))}
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-white/48">
                {copy.tag360}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="showroom-subpanel px-4 py-5">
                <p className="text-[0.66rem] uppercase tracking-[0.28em] text-white/34">
                  {copy.cards.stagingTitle}
                </p>
                <p className="mt-3 text-lg leading-7 text-white">
                  {copy.cards.stagingBody}
                </p>
              </div>
              <div className="showroom-subpanel px-4 py-5">
                <p className="text-[0.66rem] uppercase tracking-[0.28em] text-white/34">
                  {copy.cards.mediaTitle}
                </p>
                <p className="mt-3 text-lg leading-7 text-white">
                  {copy.cards.mediaBody}
                </p>
              </div>
              <div className="showroom-subpanel px-4 py-5">
                <p className="text-[0.66rem] uppercase tracking-[0.28em] text-white/34">
                  {copy.cards.commerceTitle}
                </p>
                <p className="mt-3 text-lg leading-7 text-white">
                  {copy.cards.commerceBody}
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[34rem] xl:min-h-[46rem]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-[10%] h-[58%] w-[68%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16),transparent_72%)] blur-[76px]" />
              <div className="absolute inset-x-[15%] bottom-[7%] h-14 rounded-full bg-[radial-gradient(circle,rgba(190,169,124,0.2),transparent_74%)] blur-3xl" />
              <div className="absolute inset-x-[22%] bottom-[8%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.28),transparent)]" />
            </div>

            <div className="relative mx-auto max-w-[36rem]">
              <ProductMediaFrame
                media={featuredProduct.gallery[0]}
                className="aspect-[4/5] rounded-[2.8rem]"
                emphasis="hero"
              />
            </div>

            <div className="absolute -left-2 bottom-[7%] hidden w-44 lg:block xl:-left-8 xl:w-52">
              <ProductMediaFrame
                media={secondaryMedia}
                className="aspect-[3/4] rounded-[1.7rem]"
                chrome="minimal"
                emphasis="card"
                showNote={false}
              />
            </div>

            <div className="showroom-subpanel absolute right-0 top-[6%] hidden w-60 p-5 lg:block xl:right-[2%]">
              <p className="eyebrow">{copy.featuredPiece}</p>
              <h2 className="mt-4 text-4xl leading-none text-white">
                {featuredProduct.name}
              </h2>
              <p className="mt-3 text-xs uppercase tracking-[0.26em] text-[#f3e7c8]">
                {formatPrice(featuredProduct.price)}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/56">
                {featuredProduct.story}
              </p>
              <Link
                href={localizeHref(locale, `/products/${featuredProduct.slug}`)}
                className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.26em] text-white/62 transition hover:text-white"
              >
                {copy.featuredPiece}
                <ArrowRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
              </Link>
            </div>

            <div className="absolute bottom-[2%] right-[4%] hidden w-44 lg:block xl:w-48">
              <ProductMediaFrame
                media={detailMedia}
                className="aspect-[4/3] rounded-[1.6rem]"
                chrome="minimal"
                emphasis="card"
                showNote={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
