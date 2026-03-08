import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/layout/page-intro";
import { AdminProductForm } from "@/components/storefront/admin-product-form";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import { getRequestI18n } from "@/lib/i18n/request";
import { updateProductAction } from "@/lib/supabase/admin-product-actions";
import {
  getAdminCatalogOptions,
  getAdminProductById,
} from "@/lib/supabase/admin-products";
import { requireAdmin } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Edit Product",
};

type AdminProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    created?: string;
    updated?: string;
    error?: string;
  }>;
};

export default async function AdminProductDetailPage({
  params,
  searchParams,
}: AdminProductDetailPageProps) {
  await requireAdmin("/admin/products");
  const [{ id }, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const [{ locale, direction, dictionary }, options, product] = await Promise.all([
    getRequestI18n(),
    getAdminCatalogOptions(),
    getAdminProductById(id),
  ]);
  const copy = getExtendedUiCopy(locale).adminProducts;
  const isRtl = direction === "rtl";

  if (!product) {
    notFound();
  }

  const notice = resolvedSearchParams.error
    ? {
        tone: "error" as const,
        message: resolvedSearchParams.error,
      }
    : resolvedSearchParams.created === "product"
      ? {
          tone: "success" as const,
          message: copy.editPage.createdMessage,
        }
      : resolvedSearchParams.updated === "product"
        ? {
            tone: "success" as const,
            message: copy.editPage.updatedMessage,
          }
        : null;

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={copy.editPage.eyebrow}
        title={`${copy.editPage.eyebrow}: ${product.displayName}`}
        description={copy.editPage.description}
        note={copy.editPage.note}
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/admin/products")}>
                {dictionary.common.backToProducts}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={localizeHref(locale, `/products/${product.slug}`)}>
                {dictionary.common.viewProduct}
              </Link>
            </Button>
          </>
        }
      />

      <AdminProductForm
        locale={locale}
        mode="edit"
        options={options}
        product={product}
        action={updateProductAction}
        notice={notice}
      />
    </div>
  );
}
