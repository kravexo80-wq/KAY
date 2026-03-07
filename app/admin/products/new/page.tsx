import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { AdminProductForm } from "@/components/storefront/admin-product-form";
import { Button } from "@/components/ui/button";
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
  const [options, resolvedSearchParams] = await Promise.all([
    getAdminCatalogOptions(),
    searchParams,
  ]);
  const notice = resolvedSearchParams.error
    ? {
        tone: "error" as const,
        message: resolvedSearchParams.error,
      }
    : null;

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow="Create product"
        title="Add a new showroom piece to the live Kravexo catalog."
        description="Create the core product record, set its merchandising state, assign category and collection, then define variants, stock quantities, and gallery images in one admin flow."
        note="This first admin pass prioritizes products, variants, stock, and URL-based imagery while keeping compatibility with the current storefront product and gallery routes."
        actions={
          <>
            <Button asChild>
              <Link href="/admin/products">Back to products</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/admin">Admin dashboard</Link>
            </Button>
          </>
        }
      />

      <AdminProductForm
        mode="create"
        options={options}
        action={createProductAction}
        notice={notice}
      />
    </div>
  );
}
