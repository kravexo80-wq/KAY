import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { CollectionCard } from "@/components/storefront/collection-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Collection } from "@/types/collection";

interface FeaturedCollectionsSectionProps {
  collections: Collection[];
  statusMessage?: string | null;
}

export function FeaturedCollectionsSection({
  collections,
  statusMessage,
}: FeaturedCollectionsSectionProps) {
  return (
    <section className="section-frame section-space space-y-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <SectionHeading
          eyebrow="Collections"
          title="Curated drops framed like editorial rooms."
          description="Every collection is presented as its own mood, tone, and silhouette world so the storefront feels closer to a luxury showroom than a generic fashion catalog."
          note="The card system is intentionally dark and restrained so future campaign imagery can sit on top of it without losing the premium tone."
        />

        <div className="showroom-subpanel hidden p-5 lg:block">
          <p className="eyebrow">Presentation logic</p>
          <p className="mt-4 text-sm leading-7 text-white/54">
            Hover states, tonal overlays, and editorial spacing are tuned to
            keep each collection feeling composed and high-value.
          </p>
        </div>
      </div>

      {collections.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      ) : (
        <CatalogStatePanel
          eyebrow="Featured collections"
          title="Curated collection worlds will appear here."
          description={
            statusMessage ??
            "No featured collections are currently published. Feature a collection in Supabase to populate this section."
          }
        />
      )}
    </section>
  );
}
