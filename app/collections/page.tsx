import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { CollectionCard } from "@/components/storefront/collection-card";
import { getAllCollections } from "@/lib/supabase/catalog";

export const metadata: Metadata = {
  title: "Collections",
};

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const collectionsResult = await getAllCollections();
  const collections = collectionsResult.data;

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Collections"
        title="Curated edits with their own mood and silhouette logic."
        description="Collections are treated as luxury chapters rather than simple catalog tags, giving each product family a distinct narrative space."
        note="Each collection now supports its own slug route and reads from the live Supabase catalog while preserving the current editorial card system."
      />

      <section className="section-frame">
        {collections.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {collections.map((collection) => (
              <CollectionCard key={collection.slug} collection={collection} />
            ))}
          </div>
        ) : (
          <CatalogStatePanel
            eyebrow="Collection index"
            title={
              collectionsResult.status === "ready"
                ? "No public collections are available."
                : "Collections are temporarily unavailable."
            }
            description={
              collectionsResult.error ??
              "Publish active collections in Supabase to populate this page."
            }
          />
        )}
      </section>
    </div>
  );
}
