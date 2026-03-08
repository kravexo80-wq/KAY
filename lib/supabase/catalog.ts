import "server-only";

import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import type { Collection } from "@/types/collection";
import type { Database, Json, Tables } from "@/types/database";
import type { Product, ProductMedia, ProductSpec } from "@/types/product";

import { getLocalizedCatalogField } from "@/lib/i18n/catalog";
import { getRequestLocale } from "@/lib/i18n/request";
import type { Locale } from "@/lib/i18n/config";

import { hasSupabaseEnv } from "./config";
import { createReadOnlySupabaseClient } from "./server";

type CategorySummary = Pick<Tables<"categories">, "id" | "name" | "slug">;
type CollectionSummary = Pick<
  Tables<"collections">,
  "id" | "slug" | "name" | "eyebrow" | "description" | "highlight" | "tone"
>;
type ProductImageSummary = Pick<
  Tables<"product_images">,
  | "id"
  | "label"
  | "angle"
  | "note"
  | "tone"
  | "image_url"
  | "storage_path"
  | "alt_text"
  | "sort_order"
  | "is_primary"
>;
type ProductVariantSummary = Pick<
  Tables<"product_variants">,
  | "id"
  | "sku"
  | "size"
  | "color"
  | "price_override"
  | "stock_quantity"
  | "is_active"
  | "position"
>;

export type ProductCatalogRecord = Tables<"products"> & {
  category: CategorySummary | null;
  collection: CollectionSummary | null;
  images: ProductImageSummary[] | null;
  variants: ProductVariantSummary[] | null;
};

export type CollectionCatalogRecord = Tables<"collections"> & {
  products?: Array<Pick<Tables<"products">, "slug">> | null;
};

export type CatalogQueryStatus = "ready" | "unconfigured" | "error";

export interface CatalogQueryResult<T> {
  data: T;
  error: string | null;
  status: CatalogQueryStatus;
}

export const productCatalogSelect = `
  id,
  category_id,
  collection_id,
  slug,
  name,
  short_description,
  description,
  story,
  base_price,
  compare_at_price,
  currency_code,
  tags,
  materials,
  fabric_notes,
  care_notes,
  fit_notes,
  specs,
  limited_edition,
  is_active,
  is_featured,
  viewer_360_enabled,
  viewer_360_label,
  viewer_360_description,
  viewer_360_note,
  shipping_lead_time,
  shipping_delivery,
  shipping_returns,
  shipping_presentation,
  category:categories (
    id,
    name,
    slug
  ),
  collection:collections (
    id,
    slug,
    name,
    eyebrow,
    description,
    highlight,
    tone
  ),
  images:product_images (
    id,
    label,
    angle,
    note,
    tone,
    image_url,
    storage_path,
    alt_text,
    sort_order,
    is_primary
  ),
  variants:product_variants (
    id,
    sku,
    size,
    color,
    price_override,
    stock_quantity,
    is_active,
    position
  )
`;

export const collectionCatalogSelect = `
  id,
  slug,
  name,
  eyebrow,
  description,
  highlight,
  tone,
  products:products (
    slug
  )
`;

const CATALOG_UNCONFIGURED_MESSAGE =
  "Supabase catalog settings are not configured in this environment yet.";
const CATALOG_ERROR_MESSAGE =
  "The catalog could not be loaded right now. Please try again shortly.";

function createResult<T>(
  data: T,
  status: CatalogQueryStatus,
  error: string | null = null,
): CatalogQueryResult<T> {
  return {
    data,
    error,
    status,
  };
}

async function runCatalogQuery<T>(
  label: string,
  fallback: T,
  execute: (client: SupabaseClient<Database>) => Promise<T>,
): Promise<CatalogQueryResult<T>> {
  if (!hasSupabaseEnv()) {
    return createResult(fallback, "unconfigured", CATALOG_UNCONFIGURED_MESSAGE);
  }

  try {
    const client = createReadOnlySupabaseClient();
    const data = await execute(client);

    return createResult(data, "ready");
  } catch (error) {
    console.error(`Catalog query failed for ${label}.`, error);
    return createResult(fallback, "error", CATALOG_ERROR_MESSAGE);
  }
}

function throwOnError(error: PostgrestError | null, label: string) {
  if (error) {
    throw new Error(`${label}: ${error.message}`);
  }
}

function normalizeSpecs(specs: Json): ProductSpec[] {
  if (!Array.isArray(specs)) {
    return [];
  }

  return specs.flatMap((entry) => {
    if (
      typeof entry === "object" &&
      entry !== null &&
      "label" in entry &&
      "value" in entry &&
      typeof entry.label === "string" &&
      typeof entry.value === "string"
    ) {
      return [{ label: entry.label, value: entry.value }];
    }

    return [];
  });
}

function mapProductImageToMedia(image: ProductImageSummary): ProductMedia {
  return {
    id: image.id,
    label: image.label,
    angle: image.angle,
    note: image.note,
    tone: image.tone,
  };
}

function createFallbackMedia(record: ProductCatalogRecord): ProductMedia {
  return {
    id: `${record.slug}-placeholder`,
    label: "Showroom frame",
    angle: "Primary display",
    note: "Awaiting studio imagery",
    tone: record.collection?.tone ?? "obsidian",
  };
}

function getAvailableSizes(variants: ProductVariantSummary[] | null) {
  if (!variants) {
    return [];
  }

  const uniqueSizes = new Map<string, string>();

  variants
    .filter((variant) => variant.is_active)
    .sort((left, right) => left.position - right.position)
    .forEach((variant) => {
      if (!uniqueSizes.has(variant.size)) {
        uniqueSizes.set(variant.size, variant.size);
      }
    });

  return Array.from(uniqueSizes.values());
}

function mapProductRecordToProduct(
  record: ProductCatalogRecord,
  locale: Locale,
): Product {
  const gallery = [...(record.images ?? [])]
    .sort((left, right) => left.sort_order - right.sort_order)
    .map(mapProductImageToMedia);

  return {
    slug: record.slug,
    name: getLocalizedCatalogField(record as Record<string, unknown>, "name", locale),
    category: record.category
      ? getLocalizedCatalogField(
          record.category as Record<string, unknown>,
          "name",
          locale,
        )
      : "Uncategorized",
    collectionSlug: record.collection?.slug ?? "",
    price: Number(record.base_price),
    compareAtPrice: record.compare_at_price ? Number(record.compare_at_price) : null,
    shortDescription: getLocalizedCatalogField(
      record as Record<string, unknown>,
      "short_description",
      locale,
    ),
    description: getLocalizedCatalogField(
      record as Record<string, unknown>,
      "description",
      locale,
    ),
    story: record.story,
    featured: record.is_featured,
    limitedEdition: record.limited_edition,
    tags: record.tags ?? [],
    materials: record.materials ?? [],
    fabricNotes: record.fabric_notes ?? [],
    careNotes: record.care_notes ?? [],
    fitNotes: record.fit_notes ?? [],
    sizes: getAvailableSizes(record.variants),
    gallery: gallery.length > 0 ? gallery : [createFallbackMedia(record)],
    viewer360: {
      enabled: record.viewer_360_enabled,
      label: record.viewer_360_label,
      description: record.viewer_360_description,
      note: record.viewer_360_note,
    },
    shipping: {
      leadTime: record.shipping_lead_time,
      delivery: record.shipping_delivery,
      returns: record.shipping_returns,
      presentation: record.shipping_presentation,
    },
    specs: normalizeSpecs(record.specs),
  };
}

function mapCollectionRecordToCollection(
  record: CollectionCatalogRecord,
  locale: Locale,
): Collection {
  return {
    slug: record.slug,
    name: getLocalizedCatalogField(record as Record<string, unknown>, "name", locale),
    eyebrow: record.eyebrow,
    description: getLocalizedCatalogField(
      record as Record<string, unknown>,
      "description",
      locale,
    ),
    highlight: record.highlight,
    tone: record.tone,
    productSlugs: record.products?.map((product) => product.slug) ?? [],
  };
}

async function getActiveCollectionRowBySlug(
  client: SupabaseClient<Database>,
  slug: string,
): Promise<{ id: string } | null> {
  const { data, error } = await client
    .from("collections")
    .select("id")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  throwOnError(error, "Failed to load collection lookup");

  return (data as { id: string } | null) ?? null;
}

export async function getFeaturedProducts(limit = 3) {
  return runCatalogQuery("getFeaturedProducts", [] as Product[], async (client) => {
    const locale = await getRequestLocale();
    const { data, error } = await client
      .from("products")
      .select(productCatalogSelect)
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    throwOnError(error, "Failed to load featured products");

    return ((data ?? []) as ProductCatalogRecord[]).map((record) =>
      mapProductRecordToProduct(record, locale),
    );
  });
}

export async function getAllProducts() {
  return runCatalogQuery("getAllProducts", [] as Product[], async (client) => {
    const locale = await getRequestLocale();
    const { data, error } = await client
      .from("products")
      .select(productCatalogSelect)
      .eq("is_active", true)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });

    throwOnError(error, "Failed to load products");

    return ((data ?? []) as ProductCatalogRecord[]).map((record) =>
      mapProductRecordToProduct(record, locale),
    );
  });
}

export async function getFeaturedCollections(limit = 3) {
  return runCatalogQuery(
    "getFeaturedCollections",
    [] as Collection[],
    async (client) => {
      const locale = await getRequestLocale();
      const { data, error } = await client
        .from("collections")
        .select(collectionCatalogSelect)
        .eq("is_active", true)
        .eq("is_featured", true)
        .order("sort_order", { ascending: true })
        .limit(limit);

      throwOnError(error, "Failed to load featured collections");

      return ((data ?? []) as CollectionCatalogRecord[]).map(
        (record) => mapCollectionRecordToCollection(record, locale),
      );
    },
  );
}

export async function getAllCollections() {
  return runCatalogQuery("getAllCollections", [] as Collection[], async (client) => {
    const locale = await getRequestLocale();
    const { data, error } = await client
      .from("collections")
      .select(collectionCatalogSelect)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    throwOnError(error, "Failed to load collections");

    return ((data ?? []) as CollectionCatalogRecord[]).map(
      (record) => mapCollectionRecordToCollection(record, locale),
    );
  });
}

export async function getCollectionBySlug(slug: string) {
  return runCatalogQuery(
    `getCollectionBySlug:${slug}`,
    null as Collection | null,
    async (client) => {
      const locale = await getRequestLocale();
      const { data, error } = await client
        .from("collections")
        .select(collectionCatalogSelect)
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      throwOnError(error, "Failed to load collection");

      return data
        ? mapCollectionRecordToCollection(data as CollectionCatalogRecord, locale)
        : null;
    },
  );
}

export async function getProductsByCollectionSlug(collectionSlug: string) {
  return runCatalogQuery(
    `getProductsByCollectionSlug:${collectionSlug}`,
    [] as Product[],
    async (client) => {
      const locale = await getRequestLocale();
      const collection = await getActiveCollectionRowBySlug(client, collectionSlug);

      if (!collection) {
        return [];
      }

      const { data, error } = await client
        .from("products")
        .select(productCatalogSelect)
        .eq("collection_id", collection.id)
        .eq("is_active", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });

      throwOnError(error, "Failed to load collection products");

      return ((data ?? []) as ProductCatalogRecord[]).map((record) =>
        mapProductRecordToProduct(record, locale),
      );
    },
  );
}

export async function getProductBySlug(slug: string) {
  return runCatalogQuery(
    `getProductBySlug:${slug}`,
    null as Product | null,
    async (client) => {
      const locale = await getRequestLocale();
      const { data, error } = await client
        .from("products")
        .select(productCatalogSelect)
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      throwOnError(error, "Failed to load product");

      return data
        ? mapProductRecordToProduct(data as ProductCatalogRecord, locale)
        : null;
    },
  );
}

export async function getRelatedProducts(
  product: Pick<Product, "slug" | "collectionSlug">,
  limit = 3,
) {
  if (!product.collectionSlug) {
    return createResult([] as Product[], "ready");
  }

  return runCatalogQuery(
    `getRelatedProducts:${product.slug}`,
    [] as Product[],
    async (client) => {
      const locale = await getRequestLocale();
      const collection = await getActiveCollectionRowBySlug(
        client,
        product.collectionSlug,
      );

      if (!collection) {
        return [];
      }

      const { data, error } = await client
        .from("products")
        .select(productCatalogSelect)
        .eq("collection_id", collection.id)
        .eq("is_active", true)
        .neq("slug", product.slug)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(limit);

      throwOnError(error, "Failed to load related products");

      return ((data ?? []) as ProductCatalogRecord[]).map((record) =>
        mapProductRecordToProduct(record, locale),
      );
    },
  );
}
