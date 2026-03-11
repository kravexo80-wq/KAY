import "server-only";

import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import type { Collection } from "@/types/collection";
import type { Database, Json, Tables } from "@/types/database";
import type { Product, ProductMedia, ProductSpec } from "@/types/product";

import {
  getLocalizedCatalogField,
  getLocalizedCatalogJsonField,
  getLocalizedCatalogListField,
} from "@/lib/i18n/catalog";
import { getRequestLocale } from "@/lib/i18n/request";
import type { Locale } from "@/lib/i18n/config";
import { createTestingMediaGallery } from "@/lib/testing/product-media-fallbacks";

import { hasSupabaseEnv } from "./config";
import { createReadOnlySupabaseClient } from "./server";

type CategorySummary = Pick<
  Tables<"categories">,
  "id" | "name" | "name_ar" | "slug"
>;
type CollectionSummary = Pick<
  Tables<"collections">,
  | "id"
  | "slug"
  | "name"
  | "name_ar"
  | "eyebrow"
  | "eyebrow_ar"
  | "description"
  | "description_ar"
  | "highlight"
  | "highlight_ar"
  | "tone"
>;
type ProductImageSummary = Pick<
  Tables<"product_images">,
  | "id"
  | "label"
  | "label_ar"
  | "angle"
  | "angle_ar"
  | "note"
  | "note_ar"
  | "tone"
  | "image_url"
  | "storage_path"
  | "alt_text"
  | "alt_text_ar"
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
  name_ar,
  short_description,
  short_description_ar,
  description,
  description_ar,
  story,
  story_ar,
  base_price,
  compare_at_price,
  currency_code,
  tags,
  tags_ar,
  materials,
  materials_ar,
  fabric_notes,
  fabric_notes_ar,
  care_notes,
  care_notes_ar,
  fit_notes,
  fit_notes_ar,
  specs,
  specs_ar,
  limited_edition,
  is_active,
  is_featured,
  viewer_360_enabled,
  viewer_360_label,
  viewer_360_label_ar,
  viewer_360_description,
  viewer_360_description_ar,
  viewer_360_note,
  viewer_360_note_ar,
  shipping_lead_time,
  shipping_lead_time_ar,
  shipping_delivery,
  shipping_delivery_ar,
  shipping_returns,
  shipping_returns_ar,
  shipping_presentation,
  shipping_presentation_ar,
  category:categories (
    id,
    name,
    name_ar,
    slug
  ),
  collection:collections (
    id,
    slug,
    name,
    name_ar,
    eyebrow,
    eyebrow_ar,
    description,
    description_ar,
    highlight,
    highlight_ar,
    tone
  ),
  images:product_images (
    id,
    label,
    label_ar,
    angle,
    angle_ar,
    note,
    note_ar,
    tone,
    image_url,
    storage_path,
    alt_text,
    alt_text_ar,
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
  name_ar,
  eyebrow,
  eyebrow_ar,
  description,
  description_ar,
  highlight,
  highlight_ar,
  tone,
  products:products (
    slug
  )
`;

const CATALOG_UNCONFIGURED_MESSAGE =
  "Catalog access is not configured in this environment yet.";
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

function mapProductImageToMedia(
  image: ProductImageSummary,
  locale: Locale,
): ProductMedia {
  return {
    id: image.id,
    label: getLocalizedCatalogField(
      image as Record<string, unknown>,
      "label",
      locale,
    ),
    angle: getLocalizedCatalogField(
      image as Record<string, unknown>,
      "angle",
      locale,
    ),
    note: getLocalizedCatalogField(
      image as Record<string, unknown>,
      "note",
      locale,
    ),
    tone: image.tone,
    imageUrl: image.image_url,
    storagePath: image.storage_path,
    altText: getLocalizedCatalogField(
      image as Record<string, unknown>,
      "alt_text",
      locale,
    ),
  };
}

function createFallbackMedia(
  record: ProductCatalogRecord,
  locale: Locale,
): ProductMedia {
  return createTestingMediaGallery(
    record.slug,
    locale,
    record.collection?.tone ?? "obsidian",
  )[0];
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
    .map((image) => mapProductImageToMedia(image, locale));

  return {
    slug: record.slug,
    name: getLocalizedCatalogField(record as Record<string, unknown>, "name", locale),
    category: record.category
      ? getLocalizedCatalogField(
          record.category as Record<string, unknown>,
          "name",
          locale,
        )
      : locale === "ar"
        ? "غير مصنف"
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
    story: getLocalizedCatalogField(record as Record<string, unknown>, "story", locale),
    featured: record.is_featured,
    limitedEdition: record.limited_edition,
    tags: getLocalizedCatalogListField(record as Record<string, unknown>, "tags", locale),
    materials: getLocalizedCatalogListField(
      record as Record<string, unknown>,
      "materials",
      locale,
    ),
    fabricNotes: getLocalizedCatalogListField(
      record as Record<string, unknown>,
      "fabric_notes",
      locale,
    ),
    careNotes: getLocalizedCatalogListField(
      record as Record<string, unknown>,
      "care_notes",
      locale,
    ),
    fitNotes: getLocalizedCatalogListField(
      record as Record<string, unknown>,
      "fit_notes",
      locale,
    ),
    sizes: getAvailableSizes(record.variants),
    gallery:
      gallery.length > 0
        ? gallery
        : [
            createFallbackMedia(record, locale),
            ...createTestingMediaGallery(
              record.slug,
              locale,
              record.collection?.tone ?? "obsidian",
            ).slice(1),
          ],
    viewer360: {
      enabled: record.viewer_360_enabled,
      label: getLocalizedCatalogField(
        record as Record<string, unknown>,
        "viewer_360_label",
        locale,
      ),
      description: getLocalizedCatalogField(
        record as Record<string, unknown>,
        "viewer_360_description",
        locale,
      ),
      note: getLocalizedCatalogField(
        record as Record<string, unknown>,
        "viewer_360_note",
        locale,
      ),
    },
    shipping: {
      leadTime: getLocalizedCatalogField(
        record as Record<string, unknown>,
        "shipping_lead_time",
        locale,
      ),
      delivery: getLocalizedCatalogField(
        record as Record<string, unknown>,
        "shipping_delivery",
        locale,
      ),
      returns: getLocalizedCatalogField(
        record as Record<string, unknown>,
        "shipping_returns",
        locale,
      ),
      presentation: getLocalizedCatalogField(
        record as Record<string, unknown>,
        "shipping_presentation",
        locale,
      ),
    },
    specs: normalizeSpecs(
      getLocalizedCatalogJsonField(
        record as Record<string, unknown>,
        "specs",
        locale,
      ) ?? record.specs,
    ),
  };
}

function mapCollectionRecordToCollection(
  record: CollectionCatalogRecord,
  locale: Locale,
): Collection {
  return {
    slug: record.slug,
    name: getLocalizedCatalogField(record as Record<string, unknown>, "name", locale),
    eyebrow: getLocalizedCatalogField(
      record as Record<string, unknown>,
      "eyebrow",
      locale,
    ),
    description: getLocalizedCatalogField(
      record as Record<string, unknown>,
      "description",
      locale,
    ),
    highlight: getLocalizedCatalogField(
      record as Record<string, unknown>,
      "highlight",
      locale,
    ),
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
