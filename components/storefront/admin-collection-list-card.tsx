import Link from "next/link";

import type { AdminCollectionListItem } from "@/lib/supabase/admin-collections";

import { Button } from "@/components/ui/button";
import { getAdminTaxonomyCopy } from "@/lib/i18n/admin-taxonomy-copy";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import { toggleCollectionActiveAction } from "@/lib/supabase/admin-collection-actions";

import { AdminProductStateBadge } from "./admin-product-state-badge";

interface AdminCollectionListCardProps {
  collection: AdminCollectionListItem;
  locale: Locale;
}

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function clampDescription(value: string) {
  return value.length > 180 ? `${value.slice(0, 177)}...` : value;
}

export function AdminCollectionListCard({
  collection,
  locale,
}: AdminCollectionListCardProps) {
  const copy = getAdminTaxonomyCopy(locale).collections;
  const toneLabel = copy.tones[collection.tone];

  return (
    <article className="luxury-panel overflow-hidden p-5 md:p-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.26em] text-white/34">
                {collection.slug}
              </p>
              <h2 className="mt-3 text-3xl leading-none text-white">
                {collection.name}
              </h2>
              <p className="mt-4 text-sm text-white/52">{collection.eyebrow}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <AdminProductStateBadge
                label={collection.isActive ? copy.card.active : copy.card.inactive}
                active={collection.isActive}
                tone="success"
              />
              <AdminProductStateBadge
                label={
                  collection.isFeatured ? copy.card.featured : copy.card.standard
                }
                active={collection.isFeatured}
                tone="accent"
              />
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/52">
            {clampDescription(collection.description)}
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {copy.card.products}
              </p>
              <p className="mt-3 text-xl leading-none text-white">
                {collection.productCount}
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {copy.card.tone}
              </p>
              <p className="mt-3 text-base leading-none text-white/78">{toneLabel}</p>
            </div>
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {locale === "ar" ? "الترتيب" : "Sort"}
              </p>
              <p className="mt-3 text-xl leading-none text-white">
                {collection.sortOrder}
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {copy.card.updated}
              </p>
              <p className="mt-3 text-base leading-none text-white/78">
                {formatDate(collection.updatedAt, locale)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:w-[180px]">
          <Button asChild>
            <Link href={localizeHref(locale, `/admin/collections/${collection.id}`)}>
              {copy.card.edit}
            </Link>
          </Button>

          <form action={toggleCollectionActiveAction}>
            <input type="hidden" name="collection_id" value={collection.id} />
            <input
              type="hidden"
              name="next_active"
              value={collection.isActive ? "false" : "true"}
            />
            <input
              type="hidden"
              name="return_to"
              value={localizeHref(locale, "/admin/collections")}
            />
            <Button type="submit" variant="secondary" className="w-full">
              {collection.isActive ? copy.card.deactivate : copy.card.activate}
            </Button>
          </form>
        </div>
      </div>
    </article>
  );
}
