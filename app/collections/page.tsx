import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/page-intro";
import { CollectionCard } from "@/components/storefront/collection-card";
import { collections } from "@/lib/data/collections";

export const metadata: Metadata = {
  title: "Collections",
};

export default function CollectionsPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Collections"
        title="Curated edits with their own mood and silhouette logic."
        description="Collections are treated as luxury chapters rather than simple catalog tags, giving each product family a distinct narrative space."
        note="If you later want collection detail routes, this structure can expand cleanly into /collections/[slug] while keeping the current section cards intact."
      />

      <section className="section-frame grid gap-6 lg:grid-cols-3">
        {collections.map((collection) => (
          <div key={collection.slug} id={collection.slug}>
            <CollectionCard collection={collection} />
          </div>
        ))}
      </section>
    </div>
  );
}
