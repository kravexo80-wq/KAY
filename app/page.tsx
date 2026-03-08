import { FeaturedCollectionsSection } from "@/components/sections/home/featured-collections-section";
import { FeaturedProductsSection } from "@/components/sections/home/featured-products-section";
import { HeroSection } from "@/components/sections/home/hero-section";
import { NewsletterSection } from "@/components/sections/home/newsletter-section";
import { getRequestI18n } from "@/lib/i18n/request";
import { submitNewsletterAction } from "@/lib/site-actions";
import {
  getFeaturedCollections,
  getFeaturedProducts,
} from "@/lib/supabase/catalog";

export const dynamic = "force-dynamic";

type HomePageProps = {
  searchParams: Promise<{
    newsletter?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const [
    { locale, direction, dictionary },
    featuredCollectionsResult,
    featuredProductsResult,
    resolvedSearchParams,
  ] = await Promise.all([
    getRequestI18n(),
    getFeaturedCollections(),
    getFeaturedProducts(),
    searchParams,
  ]);
  const isRtl = direction === "rtl";

  const featuredProduct = featuredProductsResult.data[0] ?? null;
  const newsletterNotice =
    resolvedSearchParams.newsletter === "success"
      ? {
          tone: "success" as const,
          title: dictionary.home.newsletter.successTitle,
          message: dictionary.home.newsletter.successMessage,
        }
      : resolvedSearchParams.newsletter === "error"
        ? {
            tone: "error" as const,
            title: dictionary.home.newsletter.errorTitle,
            message: dictionary.home.newsletter.errorMessage,
          }
        : null;

  return (
    <div className="relative overflow-hidden pb-16 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10">
        <div className="absolute left-1/2 top-[22rem] h-[24rem] w-[52rem] -translate-x-1/2 bg-[radial-gradient(circle,rgba(190,169,124,0.1),transparent_70%)] blur-3xl" />
        <div className="absolute right-[-8rem] top-[70rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_72%)] blur-3xl" />
        <div className="absolute left-[-10rem] top-[96rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04),transparent_72%)] blur-3xl" />
      </div>
      <HeroSection
        locale={locale}
        copy={dictionary.home.hero}
        featuredProduct={featuredProduct}
        statusMessage={featuredProductsResult.error}
        isRtl={isRtl}
      />
      <FeaturedCollectionsSection
        locale={locale}
        copy={dictionary.home.featuredCollections}
        commonCopy={dictionary.common}
        collections={featuredCollectionsResult.data}
        statusMessage={featuredCollectionsResult.error}
        isRtl={isRtl}
      />
      <FeaturedProductsSection
        locale={locale}
        copy={dictionary.home.featuredProducts}
        commonCopy={dictionary.common}
        products={featuredProductsResult.data}
        statusMessage={featuredProductsResult.error}
        isRtl={isRtl}
      />
      <NewsletterSection
        copy={dictionary.home.newsletter}
        action={submitNewsletterAction}
        notice={newsletterNotice}
        isRtl={isRtl}
      />
    </div>
  );
}
