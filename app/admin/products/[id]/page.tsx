import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/layout/page-intro";
import { AdminProductForm } from "@/components/storefront/admin-product-form";
import { Button } from "@/components/ui/button";
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
  const [options, product] = await Promise.all([
    getAdminCatalogOptions(),
    getAdminProductById(id),
  ]);

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
          message: "Product created successfully. You can continue refining variants, images, and publishing state here.",
        }
      : resolvedSearchParams.updated === "product"
        ? {
            tone: "success" as const,
            message: "Product changes saved and storefront/admin pages revalidated.",
          }
        : null;

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow="Edit product"
        title={`Catalog editor for ${product.name}`}
        description="Update the live product record, manage stock-bearing variants, refine gallery imagery, and adjust publishing state without leaving the admin surface."
        note="The public storefront keeps reading the same Supabase product, variant, and image tables. This editor only changes the backend catalog records behind that existing premium UI."
        actions={
          <>
            <Button asChild>
              <Link href="/admin/products">Back to products</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={`/products/${product.slug}`}>Open storefront page</Link>
            </Button>
          </>
        }
      />

      <AdminProductForm
        mode="edit"
        options={options}
        product={product}
        action={updateProductAction}
        notice={notice}
      />
    </div>
  );
}
