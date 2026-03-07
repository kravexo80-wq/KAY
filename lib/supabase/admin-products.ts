import "server-only";

import type { Tables } from "@/types/database";
import type { ProductTone } from "@/types/product";

import { createServerSupabaseClient } from "./server";

type CategoryOptionRow = Pick<
  Tables<"categories">,
  "id" | "name" | "slug" | "is_active" | "sort_order"
>;
type CollectionOptionRow = Pick<
  Tables<"collections">,
  "id" | "name" | "slug" | "is_active" | "sort_order"
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
  | "label"
  | "angle"
  | "note"
  | "tone"
  | "sort_order"
  | "is_primary"
>;

type AdminProductListRow = Pick<
  Tables<"products">,
  | "id"
  | "name"
  | "slug"
  | "base_price"
  | "compare_at_price"
  | "is_active"
  | "is_featured"
  | "limited_edition"
  | "updated_at"
> & {
  category: Pick<Tables<"categories">, "name" | "slug"> | null;
  collection: Pick<Tables<"collections">, "name" | "slug"> | null;
  variants: Pick<Tables<"product_variants">, "stock_quantity" | "is_active">[] | null;
  images: Pick<Tables<"product_images">, "image_url" | "sort_order" | "is_primary">[] | null;
};

type AdminProductEditorRow = Pick<
  Tables<"products">,
  | "id"
  | "category_id"
  | "collection_id"
  | "name"
  | "slug"
  | "short_description"
  | "description"
  | "story"
  | "base_price"
  | "compare_at_price"
  | "materials"
  | "fabric_notes"
  | "care_notes"
  | "fit_notes"
  | "limited_edition"
  | "is_active"
  | "is_featured"
  | "created_at"
  | "updated_at"
> & {
  category: Pick<Tables<"categories">, "name" | "slug"> | null;
  collection: Pick<Tables<"collections">, "name" | "slug"> | null;
  variants: ProductVariantRow[] | null;
  images: ProductImageRow[] | null;
};

const adminProductListSelect = `
  id,
  name,
  slug,
  base_price,
  compare_at_price,
  is_active,
  is_featured,
  limited_edition,
  updated_at,
  category:categories (
    name,
    slug
  ),
  collection:collections (
    name,
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
  slug,
  short_description,
  description,
  story,
  base_price,
  compare_at_price,
  materials,
  fabric_notes,
  care_notes,
  fit_notes,
  limited_edition,
  is_active,
  is_featured,
  created_at,
  updated_at,
  category:categories (
    name,
    slug
  ),
  collection:collections (
    name,
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
    label,
    angle,
    note,
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
  label: string;
  angle: string;
  note: string;
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
  slug: string;
  shortDescription: string;
  description: string;
  story: string;
  price: number;
  compareAtPrice: number | null;
  categoryId: string;
  categoryName: string;
  collectionId: string | null;
  collectionName: string | null;
  materials: string[];
  fabricNotes: string[];
  careNotes: string[];
  fitNotes: string[];
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
): AdminCatalogOption {
  return {
    id: option.id,
    name: option.name,
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
    label: row.label,
    angle: row.angle,
    note: row.note,
    tone: row.tone,
    sortOrder: row.sort_order,
    isPrimary: row.is_primary,
  };
}

function mapProductListItem(row: AdminProductListRow): AdminProductListItem {
  const variants = row.variants ?? [];
  const images = [...(row.images ?? [])].sort((left, right) => {
    if (left.is_primary === right.is_primary) {
      return left.sort_order - right.sort_order;
    }

    return left.is_primary ? -1 : 1;
  });

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    price: Number(row.base_price),
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : null,
    isActive: row.is_active,
    isFeatured: row.is_featured,
    limitedEdition: row.limited_edition,
    categoryName: row.category?.name ?? "Uncategorized",
    categorySlug: row.category?.slug ?? "",
    collectionName: row.collection?.name ?? null,
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

function mapProductEditorData(row: AdminProductEditorRow): AdminProductEditorData {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    shortDescription: row.short_description,
    description: row.description,
    story: row.story,
    price: Number(row.base_price),
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : null,
    categoryId: row.category_id,
    categoryName: row.category?.name ?? "Uncategorized",
    collectionId: row.collection_id,
    collectionName: row.collection?.name ?? null,
    materials: row.materials ?? [],
    fabricNotes: row.fabric_notes ?? [],
    careNotes: row.care_notes ?? [],
    fitNotes: row.fit_notes ?? [],
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
  const supabase = await createServerSupabaseClient();
  const [{ data: categories, error: categoriesError }, { data: collections, error: collectionsError }] =
    await Promise.all([
      supabase
        .from("categories")
        .select("id, name, slug, is_active, sort_order")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true }),
      supabase
        .from("collections")
        .select("id, name, slug, is_active, sort_order")
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
    categories: ((categories ?? []) as CategoryOptionRow[]).map(mapCatalogOption),
    collections: ((collections ?? []) as CollectionOptionRow[]).map(mapCatalogOption),
  };
}

export async function getAdminProducts() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(adminProductListSelect)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Failed to load admin products.", error);
    return [];
  }

  return ((data ?? []) as AdminProductListRow[]).map(mapProductListItem);
}

export async function getAdminProductById(productId: string) {
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

  return data ? mapProductEditorData(data as AdminProductEditorRow) : null;
}
