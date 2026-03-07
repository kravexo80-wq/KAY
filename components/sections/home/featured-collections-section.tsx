import { CollectionCard } from "@/components/storefront/collection-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Collection } from "@/types/collection";

interface FeaturedCollectionsSectionProps {
  collections: Collection[];
}

export function FeaturedCollectionsSection({
  collections,
}: FeaturedCollectionsSectionProps) {
  return (
    <section className="section-frame section-space space-y-8">
      <SectionHeading
        eyebrow="Collections"
        title="Built as distinct worlds, not product lists."
        description="Each collection reads like a curated room inside the same luxury showroom, with its own rhythm, surface finish, and silhouette focus."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {collections.map((collection) => (
          <CollectionCard key={collection.slug} collection={collection} />
        ))}
      </div>
    </section>
  );
}
