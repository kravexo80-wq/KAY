import { FeaturedCollectionsSection } from "@/components/sections/home/featured-collections-section";
import { FeaturedProductsSection } from "@/components/sections/home/featured-products-section";
import { HeroSection } from "@/components/sections/home/hero-section";
import { NewsletterSection } from "@/components/sections/home/newsletter-section";
import {
  getFeaturedCollections,
  getFeaturedProducts,
} from "@/lib/supabase/catalog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featuredCollectionsResult, featuredProductsResult] = await Promise.all([
    getFeaturedCollections(),
    getFeaturedProducts(),
  ]);

  const featuredProduct = featuredProductsResult.data[0] ?? null;

  return (
    <div className="relative overflow-hidden pb-16 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10">
        <div className="absolute left-1/2 top-[22rem] h-[24rem] w-[52rem] -translate-x-1/2 bg-[radial-gradient(circle,rgba(190,169,124,0.1),transparent_70%)] blur-3xl" />
        <div className="absolute right-[-8rem] top-[70rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_72%)] blur-3xl" />
        <div className="absolute left-[-10rem] top-[96rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04),transparent_72%)] blur-3xl" />
      </div>
      <HeroSection
        featuredProduct={featuredProduct}
        statusMessage={featuredProductsResult.error}
      />
      <FeaturedCollectionsSection
        collections={featuredCollectionsResult.data}
        statusMessage={featuredCollectionsResult.error}
      />
      <FeaturedProductsSection
        products={featuredProductsResult.data}
        statusMessage={featuredProductsResult.error}
      />
      <NewsletterSection />
    </div>
  );
}
