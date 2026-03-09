import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/layout/page-intro";
import { AdminCategoryForm } from "@/components/storefront/admin-category-form";
import { Button } from "@/components/ui/button";
import { getAdminTaxonomyCopy } from "@/lib/i18n/admin-taxonomy-copy";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { updateCategoryAction } from "@/lib/supabase/admin-category-actions";
import { getAdminCategoryById } from "@/lib/supabase/admin-categories";
import { requireAdmin } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Edit Category",
};

type AdminCategoryDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    created?: string;
    updated?: string;
    error?: string;
  }>;
};

export default async function AdminCategoryDetailPage({
  params,
  searchParams,
}: AdminCategoryDetailPageProps) {
  await requireAdmin("/admin/categories");
  const [{ id }, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const [{ locale, direction, dictionary }, category] = await Promise.all([
    getRequestI18n(),
    getAdminCategoryById(id),
  ]);
  const copy = getAdminTaxonomyCopy(locale).categories;
  const isRtl = direction === "rtl";

  if (!category) {
    notFound();
  }

  const notice = resolvedSearchParams.error
    ? {
        tone: "error" as const,
        message: resolvedSearchParams.error,
      }
    : resolvedSearchParams.created === "category"
      ? {
          tone: "success" as const,
          message: copy.editPage.createdMessage,
        }
      : resolvedSearchParams.updated === "category"
        ? {
            tone: "success" as const,
            message: copy.editPage.updatedMessage,
          }
        : null;
  const backToCategories = locale === "ar" ? "العودة إلى الفئات" : "Back to categories";

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={copy.editPage.eyebrow}
        title={category.displayName}
        description={copy.editPage.description}
        note={copy.editPage.note}
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
        mode="edit"
        category={category}
        action={updateCategoryAction}
        notice={notice}
      />
    </div>
  );
}
