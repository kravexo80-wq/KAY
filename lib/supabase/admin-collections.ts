import "server-only";

import type { Tables } from "@/types/database";
import type { ProductTone } from "@/types/product";

import { getLocalizedCatalogField } from "@/lib/i18n/catalog";
import { getRequestLocale } from "@/lib/i18n/request";

import { createServerSupabaseClient } from "./server";

type CollectionRow = Pick<
  Tables<"collections">,
  | "id"
  | "name"
  | "name_ar"
  | "slug"
  | "eyebrow"
  | "eyebrow_ar"
  | "description"
  | "description_ar"
  | "highlight"
  | "highlight_ar"
  | "tone"
  | "sort_order"
  | "is_active"
  | "is_featured"
  | "updated_at"
  | "created_at"
>;

type ProductCollectionCountRow = Pick<Tables<"products">, "collection_id">;

export interface AdminCollectionListItem {
  id: string;
  name: string;
  slug: string;
  eyebrow: string;
  description: string;
  highlight: string;
  tone: ProductTone;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  productCount: number;
  updatedAt: string;
}

export interface AdminCollectionEditorData {
  id: string;
  name: string;
  nameAr: string;
  displayName: string;
  slug: string;
  eyebrow: string;
  eyebrowAr: string;
  description: string;
  descriptionAr: string;
  highlight: string;
  highlightAr: string;
  tone: ProductTone;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

const collectionSelect = `
  id,
  name,
  name_ar,
  slug,
  eyebrow,
  eyebrow_ar,
  description,
  description_ar,
  highlight,
  highlight_ar,
  tone,
  sort_order,
  is_active,
  is_featured,
  created_at,
  updated_at
`;

async function getCollectionProductCountMap() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("collection_id")
    .not("collection_id", "is", null);

  if (error) {
    console.error("Failed to load collection product counts.", error);
    return new Map<string, number>();
  }

  return ((data ?? []) as ProductCollectionCountRow[]).reduce((map, row) => {
    const collectionId = row.collection_id;

    if (collectionId) {
      map.set(collectionId, (map.get(collectionId) ?? 0) + 1);
    }

    return map;
  }, new Map<string, number>());
}

function mapCollectionListItem(
  row: CollectionRow,
  productCountMap: Map<string, number>,
  locale: Awaited<ReturnType<typeof getRequestLocale>>,
): AdminCollectionListItem {
  return {
    id: row.id,
    name: getLocalizedCatalogField(row as Record<string, unknown>, "name", locale),
    slug: row.slug,
    eyebrow: getLocalizedCatalogField(
      row as Record<string, unknown>,
      "eyebrow",
      locale,
    ),
    description: getLocalizedCatalogField(
      row as Record<string, unknown>,
      "description",
      locale,
    ),
    highlight: getLocalizedCatalogField(
      row as Record<string, unknown>,
      "highlight",
      locale,
    ),
    tone: row.tone,
    isActive: row.is_active,
    isFeatured: row.is_featured,
    sortOrder: row.sort_order,
    productCount: productCountMap.get(row.id) ?? 0,
    updatedAt: row.updated_at,
  };
}

function mapCollectionEditorData(
  row: CollectionRow,
  productCountMap: Map<string, number>,
  locale: Awaited<ReturnType<typeof getRequestLocale>>,
): AdminCollectionEditorData {
  return {
    id: row.id,
    name: row.name,
    nameAr: row.name_ar ?? "",
    displayName: getLocalizedCatalogField(row as Record<string, unknown>, "name", locale),
    slug: row.slug,
    eyebrow: row.eyebrow,
    eyebrowAr: row.eyebrow_ar ?? "",
    description: row.description,
    descriptionAr: row.description_ar ?? "",
    highlight: row.highlight,
    highlightAr: row.highlight_ar ?? "",
    tone: row.tone,
    isActive: row.is_active,
    isFeatured: row.is_featured,
    sortOrder: row.sort_order,
    productCount: productCountMap.get(row.id) ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getAdminCollections() {
  const locale = await getRequestLocale();
  const supabase = await createServerSupabaseClient();
  const [{ data, error }, productCountMap] = await Promise.all([
    supabase
      .from("collections")
      .select(collectionSelect)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true }),
    getCollectionProductCountMap(),
  ]);

  if (error) {
    console.error("Failed to load admin collections.", error);
    return [];
  }

  return ((data ?? []) as CollectionRow[]).map((row) =>
    mapCollectionListItem(row, productCountMap, locale),
  );
}

export async function getAdminCollectionById(collectionId: string) {
  const locale = await getRequestLocale();
  const supabase = await createServerSupabaseClient();
  const [{ data, error }, productCountMap] = await Promise.all([
    supabase
      .from("collections")
      .select(collectionSelect)
      .eq("id", collectionId)
      .maybeSingle(),
    getCollectionProductCountMap(),
  ]);

  if (error) {
    console.error("Failed to load admin collection by id.", error);
    return null;
  }

  return data
    ? mapCollectionEditorData(data as CollectionRow, productCountMap, locale)
    : null;
}
