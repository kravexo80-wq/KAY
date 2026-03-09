import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/layout/page-intro";
import { AdminCollectionForm } from "@/components/storefront/admin-collection-form";
import { Button } from "@/components/ui/button";
import { getAdminTaxonomyCopy } from "@/lib/i18n/admin-taxonomy-copy";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { updateCollectionAction } from "@/lib/supabase/admin-collection-actions";
import { getAdminCollectionById } from "@/lib/supabase/admin-collections";
import { requireAdmin } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Edit Collection",
};

type AdminCollectionDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    created?: string;
    updated?: string;
    error?: string;
  }>;
};

export default async function AdminCollectionDetailPage({
  params,
  searchParams,
}: AdminCollectionDetailPageProps) {
  await requireAdmin("/admin/collections");
  const [{ id }, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const [{ locale, direction, dictionary }, collection] = await Promise.all([
    getRequestI18n(),
    getAdminCollectionById(id),
  ]);
  const copy = getAdminTaxonomyCopy(locale).collections;
  const isRtl = direction === "rtl";

  if (!collection) {
    notFound();
  }

  const notice = resolvedSearchParams.error
    ? {
        tone: "error" as const,
        message: resolvedSearchParams.error,
      }
    : resolvedSearchParams.created === "collection"
      ? {
          tone: "success" as const,
          message: copy.editPage.createdMessage,
        }
      : resolvedSearchParams.updated === "collection"
        ? {
            tone: "success" as const,
            message: copy.editPage.updatedMessage,
          }
        : null;
  const backToCollections =
    locale === "ar" ? "العودة إلى المجموعات" : "Back to collections";

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={copy.editPage.eyebrow}
        title={collection.displayName}
        description={copy.editPage.description}
        note={copy.editPage.note}
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/admin/collections")}>
                {backToCollections}
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

      <AdminCollectionForm
        locale={locale}
        mode="edit"
        collection={collection}
        action={updateCollectionAction}
        notice={notice}
      />
    </div>
  );
}
