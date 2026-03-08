import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { AdminProductForm } from "@/components/storefront/admin-product-form";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import { getRequestI18n } from "@/lib/i18n/request";
import { createProductAction } from "@/lib/supabase/admin-product-actions";
import { getAdminCatalogOptions } from "@/lib/supabase/admin-products";
import { requireAdmin } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Create Product",
};

type AdminNewProductPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminNewProductPage({
  searchParams,
}: AdminNewProductPageProps) {
  await requireAdmin("/admin/products/new");
  const [{ locale, direction, dictionary }, options, resolvedSearchParams] =
    await Promise.all([
      getRequestI18n(),
      getAdminCatalogOptions(),
      searchParams,
    ]);
  const copy = getExtendedUiCopy(locale).adminProducts;
  const isRtl = direction === "rtl";
  const notice = resolvedSearchParams.error
    ? {
        tone: "error" as const,
        message: resolvedSearchParams.error,
      }
    : null;

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
              <Link href={localizeHref(locale, "/admin/products")}>
                {dictionary.common.backToProducts}
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

      <AdminProductForm
        locale={locale}
        mode="create"
        options={options}
        action={createProductAction}
        notice={notice}
      />
    </div>
  );
}
