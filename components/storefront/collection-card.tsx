import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

const collectionGlowStyles = {
  obsidian: "bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_72%)]",
  bronze: "bg-[radial-gradient(circle,rgba(190,169,124,0.22),transparent_72%)]",
  stone: "bg-[radial-gradient(circle,rgba(240,230,212,0.18),transparent_72%)]",
  pearl: "bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_72%)]",
};

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={cn(
        "group relative isolate block min-h-[420px] overflow-hidden rounded-[2.25rem] border border-white/10 p-[1px] shadow-[0_34px_110px_rgba(0,0,0,0.46)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_52px_150px_rgba(0,0,0,0.58),0_0_60px_rgba(190,169,124,0.08)]",
      )}
    >
      <div
        className={cn(
          "relative flex h-full flex-col justify-between overflow-hidden rounded-[calc(2.25rem-1px)] bg-[linear-gradient(180deg,rgba(7,7,7,0.94),rgba(5,5,5,0.98))] p-6 md:p-7",
          collectionStyles[collection.tone],
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className={cn(
              "absolute right-[-4.5rem] top-8 h-56 w-56 rounded-full blur-3xl opacity-75 transition duration-500 group-hover:opacity-100",
              collectionGlowStyles[collection.tone],
            )}
          />
          <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]" />
          <div className="absolute inset-x-[10%] bottom-[-12%] h-40 rounded-[100%] bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_74%)] blur-3xl" />
          <div className="absolute inset-x-[18%] bottom-[17%] h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]" />
        </div>

        <div className="relative flex items-start justify-between gap-4">
          <p className="eyebrow">{collection.eyebrow}</p>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-white/48">
            {collection.productSlugs.length} pieces
          </span>
        </div>

        <div className="relative mt-16 space-y-5">
          <div className="space-y-3">
            <h3 className="max-w-xs text-4xl leading-none text-white md:text-[2.9rem]">
              {collection.name}
            </h3>
            <p className="max-w-sm text-sm leading-7 text-white/58">
              {collection.description}
            </p>
          </div>

          <div className="showroom-subpanel max-w-sm px-4 py-4">
            <p className="text-sm leading-7 text-white/50">
              {collection.highlight}
            </p>
          </div>
        </div>

        <div className="relative mt-10 flex items-center justify-between gap-4 border-t border-white/8 pt-5">
          <span className="text-[0.68rem] uppercase tracking-[0.28em] text-white/48 transition duration-300 group-hover:text-white/72">
            View collection
          </span>
          <ArrowRight className="h-4 w-4 text-white/56 transition duration-300 group-hover:translate-x-1 group-hover:text-white" />
        </div>
      </div>
    </Link>
  );
}
