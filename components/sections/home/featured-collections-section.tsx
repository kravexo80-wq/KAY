import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { CollectionCard } from "@/components/storefront/collection-card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Collection } from "@/types/collection";

interface FeaturedCollectionsSectionProps {
  locale: Locale;
  copy: Dictionary["home"]["featuredCollections"];
  commonCopy: Dictionary["common"];
  collections: Collection[];
  statusMessage?: string | null;
  isRtl?: boolean;
}

export function FeaturedCollectionsSection({
  locale,
  copy,
  commonCopy,
  collections,
  statusMessage,
  isRtl = false,
}: FeaturedCollectionsSectionProps) {
  return (
    <section className="section-frame section-space space-y-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          note={copy.note}
          isRtl={isRtl}
        />

        <div className={`showroom-subpanel hidden p-5 lg:block ${isRtl ? "text-right" : "text-left"}`}>
          <p className="eyebrow">{copy.logicTitle}</p>
          <p className="mt-4 text-sm leading-7 text-white/54">
            {copy.logicDescription}
          </p>
        </div>
      </div>

      {collections.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.slug}
              collection={collection}
              locale={locale}
              labels={{
                pieces: commonCopy.pieces,
                viewCollection: commonCopy.viewCollection,
              }}
              isRtl={isRtl}
            />
          ))}
        </div>
      ) : (
        <CatalogStatePanel
          eyebrow={copy.emptyEyebrow}
          title={copy.emptyTitle}
          description={statusMessage ?? copy.emptyDescription}
        />
      )}
    </section>
  );
}
