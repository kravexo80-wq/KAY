import "server-only";

import type { Tables } from "@/types/database";

import { getLocalizedCatalogField } from "@/lib/i18n/catalog";
import { getRequestLocale } from "@/lib/i18n/request";

import { createServerSupabaseClient } from "./server";

type CategoryRow = Pick<
  Tables<"categories">,
  | "id"
  | "name"
  | "name_ar"
  | "slug"
  | "description"
  | "description_ar"
  | "sort_order"
  | "is_active"
  | "updated_at"
  | "created_at"
>;

type ProductCategoryCountRow = Pick<Tables<"products">, "category_id">;

export interface AdminCategoryListItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  productCount: number;
  updatedAt: string;
}

export interface AdminCategoryEditorData {
  id: string;
  name: string;
  nameAr: string;
  displayName: string;
  slug: string;
  description: string;
  descriptionAr: string;
  isActive: boolean;
  sortOrder: number;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

const categorySelect = `
  id,
  name,
  name_ar,
  slug,
  description,
  description_ar,
  sort_order,
  is_active,
  created_at,
  updated_at
`;

async function getCategoryProductCountMap() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select("category_id");

  if (error) {
    console.error("Failed to load category product counts.", error);
    return new Map<string, number>();
  }

  return ((data ?? []) as ProductCategoryCountRow[]).reduce((map, row) => {
    map.set(row.category_id, (map.get(row.category_id) ?? 0) + 1);
    return map;
  }, new Map<string, number>());
}

function mapCategoryListItem(
  row: CategoryRow,
  productCountMap: Map<string, number>,
  locale: Awaited<ReturnType<typeof getRequestLocale>>,
): AdminCategoryListItem {
  return {
    id: row.id,
    name: getLocalizedCatalogField(row as Record<string, unknown>, "name", locale),
    slug: row.slug,
    description: getLocalizedCatalogField(
      row as Record<string, unknown>,
      "description",
      locale,
    ),
    isActive: row.is_active,
    sortOrder: row.sort_order,
    productCount: productCountMap.get(row.id) ?? 0,
    updatedAt: row.updated_at,
  };
}

function mapCategoryEditorData(
  row: CategoryRow,
  productCountMap: Map<string, number>,
  locale: Awaited<ReturnType<typeof getRequestLocale>>,
): AdminCategoryEditorData {
  return {
    id: row.id,
    name: row.name,
    nameAr: row.name_ar ?? "",
    displayName: getLocalizedCatalogField(row as Record<string, unknown>, "name", locale),
    slug: row.slug,
    description: row.description,
    descriptionAr: row.description_ar ?? "",
    isActive: row.is_active,
    sortOrder: row.sort_order,
    productCount: productCountMap.get(row.id) ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getAdminCategories() {
  const locale = await getRequestLocale();
  const supabase = await createServerSupabaseClient();
  const [{ data, error }, productCountMap] = await Promise.all([
    supabase
      .from("categories")
      .select(categorySelect)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true }),
    getCategoryProductCountMap(),
  ]);

  if (error) {
    console.error("Failed to load admin categories.", error);
    return [];
  }

  return ((data ?? []) as CategoryRow[]).map((row) =>
    mapCategoryListItem(row, productCountMap, locale),
  );
}

export async function getAdminCategoryById(categoryId: string) {
  const locale = await getRequestLocale();
  const supabase = await createServerSupabaseClient();
  const [{ data, error }, productCountMap] = await Promise.all([
    supabase
      .from("categories")
      .select(categorySelect)
      .eq("id", categoryId)
      .maybeSingle(),
    getCategoryProductCountMap(),
  ]);

  if (error) {
    console.error("Failed to load admin category by id.", error);
    return null;
  }

  return data
    ? mapCategoryEditorData(data as CategoryRow, productCountMap, locale)
    : null;
}
