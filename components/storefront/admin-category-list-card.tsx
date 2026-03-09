import Link from "next/link";

import type { AdminCategoryListItem } from "@/lib/supabase/admin-categories";

import { Button } from "@/components/ui/button";
import { getAdminTaxonomyCopy } from "@/lib/i18n/admin-taxonomy-copy";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import { toggleCategoryActiveAction } from "@/lib/supabase/admin-category-actions";

import { AdminProductStateBadge } from "./admin-product-state-badge";

interface AdminCategoryListCardProps {
  category: AdminCategoryListItem;
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

export function AdminCategoryListCard({
  category,
  locale,
}: AdminCategoryListCardProps) {
  const copy = getAdminTaxonomyCopy(locale).categories.card;

  return (
    <article className="luxury-panel overflow-hidden p-5 md:p-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.26em] text-white/34">
                {category.slug}
              </p>
              <h2 className="mt-3 text-3xl leading-none text-white">
                {category.name}
              </h2>
            </div>
            <AdminProductStateBadge
              label={category.isActive ? copy.active : copy.inactive}
              active={category.isActive}
              tone="success"
            />
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/52">
            {clampDescription(category.description)}
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {copy.products}
              </p>
              <p className="mt-3 text-xl leading-none text-white">
                {category.productCount}
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {locale === "ar" ? "الترتيب" : "Sort"}
              </p>
              <p className="mt-3 text-xl leading-none text-white">
                {category.sortOrder}
              </p>
            </div>
            <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {copy.updated}
              </p>
              <p className="mt-3 text-base leading-none text-white/78">
                {formatDate(category.updatedAt, locale)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:w-[180px]">
          <Button asChild>
            <Link href={localizeHref(locale, `/admin/categories/${category.id}`)}>
              {copy.edit}
            </Link>
          </Button>

          <form action={toggleCategoryActiveAction}>
            <input type="hidden" name="category_id" value={category.id} />
            <input
              type="hidden"
              name="next_active"
              value={category.isActive ? "false" : "true"}
            />
            <input
              type="hidden"
              name="return_to"
              value={localizeHref(locale, "/admin/categories")}
            />
            <Button type="submit" variant="secondary" className="w-full">
              {category.isActive ? copy.deactivate : copy.activate}
            </Button>
          </form>
        </div>
      </div>
    </article>
  );
}
