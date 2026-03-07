import { FeaturedCollectionsSection } from "@/components/sections/home/featured-collections-section";
import { FeaturedProductsSection } from "@/components/sections/home/featured-products-section";
import { HeroSection } from "@/components/sections/home/hero-section";
import { NewsletterSection } from "@/components/sections/home/newsletter-section";
import { featuredCollections } from "@/lib/data/collections";
import { featuredProducts } from "@/lib/data/products";

export default function Home() {
  return (
    <div className="space-y-2">
      <HeroSection featuredProduct={featuredProducts[0]} />
      <FeaturedCollectionsSection collections={featuredCollections} />
      <FeaturedProductsSection products={featuredProducts} />
      <NewsletterSection />
    </div>
  );
}
