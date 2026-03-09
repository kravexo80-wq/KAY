import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { AdminCollectionForm } from "@/components/storefront/admin-collection-form";
import { Button } from "@/components/ui/button";
import { getAdminTaxonomyCopy } from "@/lib/i18n/admin-taxonomy-copy";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { createCollectionAction } from "@/lib/supabase/admin-collection-actions";
import { requireAdmin } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Create Collection",
};

type AdminNewCollectionPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminNewCollectionPage({
  searchParams,
}: AdminNewCollectionPageProps) {
  await requireAdmin("/admin/collections/new");
  const [{ locale, direction, dictionary }, resolvedSearchParams] = await Promise.all([
    getRequestI18n(),
    searchParams,
  ]);
  const copy = getAdminTaxonomyCopy(locale).collections;
  const isRtl = direction === "rtl";
  const notice = resolvedSearchParams.error
    ? {
        tone: "error" as const,
        message: resolvedSearchParams.error,
      }
    : null;
  const backToCollections =
    locale === "ar" ? "العودة إلى المجموعات" : "Back to collections";

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
        mode="create"
        action={createCollectionAction}
        notice={notice}
      />
    </div>
  );
}
