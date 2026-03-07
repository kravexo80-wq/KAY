import Link from "next/link";

import type { Collection } from "@/types/collection";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  collection: Collection;
}

const collectionStyles = {
  obsidian:
    "bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))]",
  bronze:
    "bg-[linear-gradient(180deg,rgba(194,143,80,0.14),rgba(255,255,255,0.03))]",
  stone:
    "bg-[linear-gradient(180deg,rgba(226,214,190,0.12),rgba(255,255,255,0.03))]",
  pearl:
    "bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))]",
};

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      href={`/collections#${collection.slug}`}
      className={cn(
        "group luxury-panel block min-h-[360px] overflow-hidden p-6",
        collectionStyles[collection.tone],
      )}
    >
      <div className="flex h-full flex-col justify-between gap-10">
        <div className="space-y-4">
          <p className="eyebrow">{collection.eyebrow}</p>
          <div className="space-y-3">
            <h3 className="text-3xl leading-none text-white md:text-4xl">
              {collection.name}
            </h3>
            <p className="max-w-sm text-sm leading-7 text-white/60">
              {collection.description}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="hairline" />
          <div className="flex items-end justify-between gap-4">
            <p className="max-w-xs text-sm leading-7 text-white/52">
              {collection.highlight}
            </p>
            <div className="shrink-0 text-right">
              <p className="text-xs uppercase tracking-[0.26em] text-white/38">
                Pieces
              </p>
              <p className="mt-1 text-3xl leading-none text-white">
                {collection.productSlugs.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
