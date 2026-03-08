import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { CollectionCard } from "@/components/storefront/collection-card";
import { getRequestI18n } from "@/lib/i18n/request";
import { getAllCollections } from "@/lib/supabase/catalog";

export const metadata: Metadata = {
  title: "Collections",
};

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const [{ locale, direction, dictionary }, collectionsResult] = await Promise.all([
    getRequestI18n(),
    getAllCollections(),
  ]);
  const isRtl = direction === "rtl";
  const collections = collectionsResult.data;

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow={dictionary.collections.index.eyebrow}
        title={dictionary.collections.index.title}
        description={dictionary.collections.index.description}
        note={dictionary.collections.index.note}
        noteLabel={dictionary.common.showroomNote}
        isRtl={isRtl}
      />

      <section className="section-frame">
        {collections.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {collections.map((collection) => (
              <CollectionCard
                key={collection.slug}
                collection={collection}
                locale={locale}
                labels={{
                  pieces: dictionary.common.pieces,
                  viewCollection: dictionary.common.viewCollection,
                }}
                isRtl={isRtl}
              />
            ))}
          </div>
        ) : (
          <CatalogStatePanel
            eyebrow={dictionary.collections.index.stateEyebrow}
            title={
              collectionsResult.status === "ready"
                ? dictionary.collections.index.emptyTitle
                : dictionary.collections.index.unavailableTitle
            }
            description={
              collectionsResult.error ?? dictionary.collections.index.emptyDescription
            }
          />
        )}
      </section>
    </div>
  );
}
