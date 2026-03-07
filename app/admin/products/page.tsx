import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { AdminProductListCard } from "@/components/storefront/admin-product-list-card";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { Button } from "@/components/ui/button";
import { getAdminProducts } from "@/lib/supabase/admin-products";
import { requireAdmin } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Admin Products",
};

type AdminProductsPageProps = {
  searchParams: Promise<{
    updated?: string;
    error?: string;
  }>;
};

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  await requireAdmin("/admin/products");
  const [products, resolvedSearchParams] = await Promise.all([
    getAdminProducts(),
    searchParams,
  ]);
  const activeCount = products.filter((product) => product.isActive).length;
  const featuredCount = products.filter((product) => product.isFeatured).length;
  const lowStockCount = products.filter(
    (product) => product.activeVariantCount > 0 && product.totalStock < 6,
  ).length;
  const metrics = [
    { label: "Products", value: `${products.length}` },
    { label: "Active", value: `${activeCount}` },
    { label: "Featured", value: `${featuredCount}` },
    { label: "Low stock", value: `${lowStockCount}` },
  ];
  const statusMessage =
    resolvedSearchParams.updated === "active"
      ? "Product publishing state updated."
      : resolvedSearchParams.updated === "featured"
        ? "Product featured state updated."
        : resolvedSearchParams.error ?? null;
  const isError = Boolean(
    resolvedSearchParams.error &&
      !["active", "featured"].includes(resolvedSearchParams.updated ?? ""),
  );

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow="Admin products"
        title="Catalog control for the Kravexo showroom."
        description="This admin-only surface manages live products, publishing state, category and collection assignment, variants, stock quantities, and simple gallery URLs without touching code."
        note="Products stay aligned with the existing Supabase catalog schema, and storefront pages are revalidated after changes so the public luxury UI stays intact."
        actions={
          <>
            <Button asChild>
              <Link href="/admin/products/new">Create product</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/admin">Admin dashboard</Link>
            </Button>
          </>
        }
      />

      {statusMessage ? (
        <section className="section-frame">
          <div className={isError ? "luxury-muted-panel p-5" : "showroom-panel p-5"}>
            <p className="eyebrow">{isError ? "Update error" : "Update saved"}</p>
            <p className="mt-4 text-sm leading-7 text-white/58">{statusMessage}</p>
          </div>
        </section>
      ) : null}

      <section className="section-frame space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="luxury-muted-panel p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/38">
                {metric.label}
              </p>
              <p className="mt-3 text-4xl leading-none text-white">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {products.length > 0 ? (
          <div className="grid gap-4">
            {products.map((product) => (
              <AdminProductListCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <CatalogStatePanel
            eyebrow="Admin products"
            title="No products exist in the catalog yet."
            description="Create the first Kravexo product here, then add variants, stock, images, and publishing state from the dedicated editor."
            action={
              <Button asChild>
                <Link href="/admin/products/new">Create the first product</Link>
              </Button>
            }
          />
        )}
      </section>
    </div>
  );
}
