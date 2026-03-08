import "server-only";

import type { Tables } from "@/types/database";
import type { ProductTone } from "@/types/product";

import { getLocalizedCatalogField } from "@/lib/i18n/catalog";
import { getRequestLocale } from "@/lib/i18n/request";

import { createServerSupabaseClient } from "./server";

type CategoryOptionRow = Pick<
  Tables<"categories">,
  "id" | "name" | "name_ar" | "slug" | "is_active" | "sort_order"
>;
type CollectionOptionRow = Pick<
  Tables<"collections">,
  "id" | "name" | "name_ar" | "slug" | "is_active" | "sort_order"
>;
type ProductVariantRow = Pick<
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
type ProductImageRow = Pick<
  Tables<"product_images">,
  | "id"
  | "image_url"
  | "storage_path"
  | "alt_text"
  | "alt_text_ar"
  | "label"
  | "label_ar"
  | "angle"
  | "angle_ar"
  | "note"
  | "note_ar"
  | "tone"
  | "sort_order"
  | "is_primary"
>;

type AdminProductListRow = Pick<
  Tables<"products">,
  | "id"
  | "name"
  | "name_ar"
  | "slug"
  | "base_price"
  | "compare_at_price"
  | "is_active"
  | "is_featured"
  | "limited_edition"
  | "updated_at"
> & {
  category: Pick<Tables<"categories">, "name" | "name_ar" | "slug"> | null;
  collection: Pick<Tables<"collections">, "name" | "name_ar" | "slug"> | null;
  variants: Pick<Tables<"product_variants">, "stock_quantity" | "is_active">[] | null;
  images: Pick<Tables<"product_images">, "image_url" | "sort_order" | "is_primary">[] | null;
};

type AdminProductEditorRow = Pick<
  Tables<"products">,
  | "id"
  | "category_id"
  | "collection_id"
  | "name"
  | "name_ar"
  | "slug"
  | "short_description"
  | "short_description_ar"
  | "description"
  | "description_ar"
  | "story"
  | "story_ar"
  | "base_price"
  | "compare_at_price"
  | "materials"
  | "materials_ar"
  | "fabric_notes"
  | "fabric_notes_ar"
  | "care_notes"
  | "care_notes_ar"
  | "fit_notes"
  | "fit_notes_ar"
  | "limited_edition"
  | "is_active"
  | "is_featured"
  | "created_at"
  | "updated_at"
> & {
  category: Pick<Tables<"categories">, "name" | "name_ar" | "slug"> | null;
  collection: Pick<Tables<"collections">, "name" | "name_ar" | "slug"> | null;
  variants: ProductVariantRow[] | null;
  images: ProductImageRow[] | null;
};

const adminProductListSelect = `
  id,
  name,
  name_ar,
  slug,
  base_price,
  compare_at_price,
  is_active,
  is_featured,
  limited_edition,
  updated_at,
  category:categories (
    name,
    name_ar,
    slug
  ),
  collection:collections (
    name,
    name_ar,
    slug
  ),
  variants:product_variants (
    stock_quantity,
    is_active
  ),
  images:product_images (
    image_url,
    sort_order,
    is_primary
  )
`;

const adminProductEditorSelect = `
  id,
  category_id,
  collection_id,
  name,
  name_ar,
  slug,
  short_description,
  short_description_ar,
  description,
  description_ar,
  story,
  story_ar,
  base_price,
  compare_at_price,
  materials,
  materials_ar,
  fabric_notes,
  fabric_notes_ar,
  care_notes,
  care_notes_ar,
  fit_notes,
  fit_notes_ar,
  limited_edition,
  is_active,
  is_featured,
  created_at,
  updated_at,
  category:categories (
    name,
    name_ar,
    slug
  ),
  collection:collections (
    name,
    name_ar,
    slug
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
  ),
  images:product_images (
    id,
    image_url,
    storage_path,
    alt_text,
    alt_text_ar,
    label,
    label_ar,
    angle,
    angle_ar,
    note,
    note_ar,
    tone,
    sort_order,
    is_primary
  )
`;

export interface AdminCatalogOption {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
}

export interface AdminProductVariantFormValue {
  id: string | null;
  sku: string;
  size: string;
  color: string | null;
  priceOverride: number | null;
  stockQuantity: number;
  isActive: boolean;
  position: number;
}

export interface AdminProductImageFormValue {
  id: string | null;
  imageUrl: string;
  storagePath: string | null;
  altText: string;
  altTextAr: string;
  label: string;
  labelAr: string;
  angle: string;
  angleAr: string;
  note: string;
  noteAr: string;
  tone: ProductTone;
  sortOrder: number;
  isPrimary: boolean;
}

export interface AdminProductListItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  isActive: boolean;
  isFeatured: boolean;
  limitedEdition: boolean;
  categoryName: string;
  categorySlug: string;
  collectionName: string | null;
  collectionSlug: string | null;
  totalStock: number;
  activeVariantCount: number;
  variantCount: number;
  primaryImageUrl: string | null;
  updatedAt: string;
}

export interface AdminProductEditorData {
  id: string;
  name: string;
  nameAr: string;
  displayName: string;
  slug: string;
  shortDescription: string;
  shortDescriptionAr: string;
  description: string;
  descriptionAr: string;
  story: string;
  storyAr: string;
  price: number;
  compareAtPrice: number | null;
  categoryId: string;
  categoryName: string;
  collectionId: string | null;
  collectionName: string | null;
  materials: string[];
  materialsAr: string[];
  fabricNotes: string[];
  fabricNotesAr: string[];
  careNotes: string[];
  careNotesAr: string[];
  fitNotes: string[];
  fitNotesAr: string[];
  limitedEdition: boolean;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  variants: AdminProductVariantFormValue[];
  images: AdminProductImageFormValue[];
}

export interface AdminCatalogOptions {
  categories: AdminCatalogOption[];
  collections: AdminCatalogOption[];
}

function mapCatalogOption(
  option: CategoryOptionRow | CollectionOptionRow,
  locale: Awaited<ReturnType<typeof getRequestLocale>>,
): AdminCatalogOption {
  return {
    id: option.id,
    name: getLocalizedCatalogField(
      option as Record<string, unknown>,
      "name",
      locale,
    ),
    slug: option.slug,
    isActive: option.is_active,
    sortOrder: option.sort_order,
  };
}

function mapVariantRow(row: ProductVariantRow): AdminProductVariantFormValue {
  return {
    id: row.id,
    sku: row.sku,
    size: row.size,
    color: row.color,
    priceOverride: row.price_override ? Number(row.price_override) : null,
    stockQuantity: row.stock_quantity,
    isActive: row.is_active,
    position: row.position,
  };
}

function mapImageRow(row: ProductImageRow): AdminProductImageFormValue {
  return {
    id: row.id,
    imageUrl: row.image_url ?? "",
    storagePath: row.storage_path,
    altText: row.alt_text,
    altTextAr: row.alt_text_ar ?? "",
    label: row.label,
    labelAr: row.label_ar ?? "",
    angle: row.angle,
    angleAr: row.angle_ar ?? "",
    note: row.note,
    noteAr: row.note_ar ?? "",
    tone: row.tone,
    sortOrder: row.sort_order,
    isPrimary: row.is_primary,
  };
}

function mapProductListItem(
  row: AdminProductListRow,
  locale: Awaited<ReturnType<typeof getRequestLocale>>,
): AdminProductListItem {
  const variants = row.variants ?? [];
  const images = [...(row.images ?? [])].sort((left, right) => {
    if (left.is_primary === right.is_primary) {
      return left.sort_order - right.sort_order;
    }

    return left.is_primary ? -1 : 1;
  });

  return {
    id: row.id,
    name: getLocalizedCatalogField(row as Record<string, unknown>, "name", locale),
    slug: row.slug,
    price: Number(row.base_price),
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : null,
    isActive: row.is_active,
    isFeatured: row.is_featured,
    limitedEdition: row.limited_edition,
    categoryName: row.category
      ? getLocalizedCatalogField(
          row.category as Record<string, unknown>,
          "name",
          locale,
        )
      : locale === "ar"
        ? "غير مصنف"
        : "Uncategorized",
    categorySlug: row.category?.slug ?? "",
    collectionName: row.collection
      ? getLocalizedCatalogField(
          row.collection as Record<string, unknown>,
          "name",
          locale,
        )
      : null,
    collectionSlug: row.collection?.slug ?? null,
    totalStock: variants
      .filter((variant) => variant.is_active)
      .reduce((total, variant) => total + variant.stock_quantity, 0),
    activeVariantCount: variants.filter((variant) => variant.is_active).length,
    variantCount: variants.length,
    primaryImageUrl: images[0]?.image_url ?? null,
    updatedAt: row.updated_at,
  };
}

function mapProductEditorData(
  row: AdminProductEditorRow,
  locale: Awaited<ReturnType<typeof getRequestLocale>>,
): AdminProductEditorData {
  return {
    id: row.id,
    name: row.name,
    nameAr: row.name_ar ?? "",
    displayName: getLocalizedCatalogField(
      row as Record<string, unknown>,
      "name",
      locale,
    ),
    slug: row.slug,
    shortDescription: row.short_description,
    shortDescriptionAr: row.short_description_ar ?? "",
    description: row.description,
    descriptionAr: row.description_ar ?? "",
    story: row.story,
    storyAr: row.story_ar ?? "",
    price: Number(row.base_price),
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : null,
    categoryId: row.category_id,
    categoryName: row.category
      ? getLocalizedCatalogField(
          row.category as Record<string, unknown>,
          "name",
          locale,
        )
      : locale === "ar"
        ? "غير مصنف"
        : "Uncategorized",
    collectionId: row.collection_id,
    collectionName: row.collection
      ? getLocalizedCatalogField(
          row.collection as Record<string, unknown>,
          "name",
          locale,
        )
      : null,
    materials: row.materials ?? [],
    materialsAr: row.materials_ar ?? [],
    fabricNotes: row.fabric_notes ?? [],
    fabricNotesAr: row.fabric_notes_ar ?? [],
    careNotes: row.care_notes ?? [],
    careNotesAr: row.care_notes_ar ?? [],
    fitNotes: row.fit_notes ?? [],
    fitNotesAr: row.fit_notes_ar ?? [],
    limitedEdition: row.limited_edition,
    isActive: row.is_active,
    isFeatured: row.is_featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    variants: [...(row.variants ?? [])]
      .sort((left, right) => left.position - right.position)
      .map(mapVariantRow),
    images: [...(row.images ?? [])]
      .sort((left, right) => left.sort_order - right.sort_order)
      .map(mapImageRow),
  };
}

export async function getAdminCatalogOptions(): Promise<AdminCatalogOptions> {
  const locale = await getRequestLocale();
  const supabase = await createServerSupabaseClient();
  const [{ data: categories, error: categoriesError }, { data: collections, error: collectionsError }] =
    await Promise.all([
      supabase
        .from("categories")
        .select("id, name, name_ar, slug, is_active, sort_order")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true }),
      supabase
        .from("collections")
        .select("id, name, name_ar, slug, is_active, sort_order")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true }),
    ]);

  if (categoriesError) {
    console.error("Failed to load admin category options.", categoriesError);
  }

  if (collectionsError) {
    console.error("Failed to load admin collection options.", collectionsError);
  }

  return {
    categories: ((categories ?? []) as CategoryOptionRow[]).map((option) =>
      mapCatalogOption(option, locale),
    ),
    collections: ((collections ?? []) as CollectionOptionRow[]).map((option) =>
      mapCatalogOption(option, locale),
    ),
  };
}

export async function getAdminProducts() {
  const locale = await getRequestLocale();
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(adminProductListSelect)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Failed to load admin products.", error);
    return [];
  }

  return ((data ?? []) as AdminProductListRow[]).map((row) =>
    mapProductListItem(row, locale),
  );
}

export async function getAdminProductById(productId: string) {
  const locale = await getRequestLocale();
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(adminProductEditorSelect)
    .eq("id", productId)
    .maybeSingle();

  if (error) {
    console.error("Failed to load admin product by id.", error);
    return null;
  }

  return data ? mapProductEditorData(data as AdminProductEditorRow, locale) : null;
}
