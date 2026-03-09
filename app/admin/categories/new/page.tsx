import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { AdminCategoryForm } from "@/components/storefront/admin-category-form";
import { Button } from "@/components/ui/button";
import { getAdminTaxonomyCopy } from "@/lib/i18n/admin-taxonomy-copy";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { createCategoryAction } from "@/lib/supabase/admin-category-actions";
import { requireAdmin } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Create Category",
};

type AdminNewCategoryPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminNewCategoryPage({
  searchParams,
}: AdminNewCategoryPageProps) {
  await requireAdmin("/admin/categories/new");
  const [{ locale, direction, dictionary }, resolvedSearchParams] = await Promise.all([
    getRequestI18n(),
    searchParams,
  ]);
  const copy = getAdminTaxonomyCopy(locale).categories;
  const isRtl = direction === "rtl";
  const notice = resolvedSearchParams.error
    ? {
        tone: "error" as const,
        message: resolvedSearchParams.error,
      }
    : null;
  const backToCategories = locale === "ar" ? "العودة إلى الفئات" : "Back to categories";

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={copy.newPage.eyebrow}
        title={copy.newPage.title}
        description={copy.newPage.description}
        note={copy.newPage.note}
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/admin/categories")}>
                {backToCategories}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={localizeHref(locale, "/admin")}>
                {dictionary.common.backToDashboard}
              </Link>
            </Button>
          </>
        }
      />

      <AdminCategoryForm
        locale={locale}
        mode="create"
        action={createCategoryAction}
        notice={notice}
      />
    </div>
  );
}
