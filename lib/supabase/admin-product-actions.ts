"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { Tables, TablesInsert, TablesUpdate } from "@/types/database";
import type { ProductTone } from "@/types/product";

import { getSafeRedirectPath, requireAdmin } from "./auth";
import {
  isImageFileEntry,
  removeProductImageFiles,
  uploadProductImageFile,
} from "./admin-product-images";
import { createServerSupabaseClient } from "./server";

type ProductInsert = TablesInsert<"products">;
type ProductUpdate = TablesUpdate<"products">;
type ProductVariantInsert = TablesInsert<"product_variants">;
type ProductImageInsert = TablesInsert<"product_images">;

type ProductIdentityRow = Pick<
  Tables<"products">,
  "id" | "slug" | "collection_id"
> & {
  collection: Pick<Tables<"collections">, "slug"> | null;
  variants: Pick<Tables<"product_variants">, "id">[] | null;
  images: Pick<Tables<"product_images">, "id" | "storage_path" | "image_url">[] | null;
};

interface ParsedVariantRow {
  id: string | null;
  sku: string;
  size: string;
  color: string | null;
  stockQuantity: number;
  priceOverride: number | null;
  isActive: boolean;
  position: number;
}

interface ParsedImageRow {
  id: string | null;
  imageUrl: string;
  uploadFile: File | null;
  altText: string;
  label: string;
  angle: string;
  note: string;
  tone: ProductTone;
  sortOrder: number;
  isPrimary: boolean;
}

interface ParsedProductPayload {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  story: string;
  price: number;
  compareAtPrice: number | null;
  categoryId: string;
  collectionId: string | null;
  materials: string[];
  fabricNotes: string[];
  careNotes: string[];
  fitNotes: string[];
  limitedEdition: boolean;
  isActive: boolean;
  isFeatured: boolean;
  variants: ParsedVariantRow[];
  images: ParsedImageRow[];
  removedImageIds: string[];
}

const VALID_IMAGE_TONES = new Set<ProductTone>([
  "obsidian",
  "stone",
  "bronze",
  "pearl",
]);

function buildRedirectPath(
  basePath: string,
  entries: Record<string, string | null | undefined>,
) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(entries)) {
    if (value) {
      searchParams.set(key, value);
    }
  }

  const queryString = searchParams.toString();

  return queryString ? `${basePath}?${queryString}` : basePath;
}

function toNullableString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed ? trimmed : null;
}

function toRequiredString(value: FormDataEntryValue | null, label: string) {
  const resolved = toNullableString(value);

  if (!resolved) {
    throw new Error(`${label} is required.`);
  }

  return resolved;
}

function parseBoolean(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

function parseNonNegativeNumber(
  value: FormDataEntryValue | null,
  label: string,
  { allowNull = false }: { allowNull?: boolean } = {},
) {
  if (typeof value !== "string") {
    if (allowNull) {
      return null;
    }

    throw new Error(`${label} is required.`);
  }

  const trimmed = value.trim();

  if (!trimmed) {
    if (allowNull) {
      return null;
    }

    throw new Error(`${label} is required.`);
  }

  const parsed = Number.parseFloat(trimmed);

  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`${label} must be a non-negative number.`);
  }

  return Number(parsed.toFixed(2));
}

function parseNonNegativeInteger(value: FormDataEntryValue | null, label: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} is required.`);
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`${label} must be a non-negative whole number.`);
  }

  return parsed;
}

function parseLineList(formData: FormData, name: string) {
  const value = formData.get(name);

  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(/\r?\n/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function slugifyValue(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function parseSlug(formData: FormData) {
  const explicitSlug = toNullableString(formData.get("slug"));
  const source = explicitSlug ?? toRequiredString(formData.get("name"), "Product name");
  const slug = slugifyValue(source);

  if (!slug) {
    throw new Error("Slug could not be generated from this product name.");
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Slug must contain only lowercase letters, numbers, and hyphens.");
  }

  return slug;
}

function parseVariantRows(formData: FormData) {
  const countValue = formData.get("variant_count");
  const count =
    typeof countValue === "string" ? Number.parseInt(countValue, 10) : 0;
  const variants: ParsedVariantRow[] = [];
  const seenKeys = new Set<string>();
  const seenSkus = new Set<string>();

  for (let index = 0; index < (Number.isFinite(count) ? count : 0); index += 1) {
    const id = toNullableString(formData.get(`variant_${index}_id`));
    const size = toNullableString(formData.get(`variant_${index}_size`));
    const sku = toNullableString(formData.get(`variant_${index}_sku`));
    const color = toNullableString(formData.get(`variant_${index}_color`));
    const stockRaw = formData.get(`variant_${index}_stock_quantity`);
    const priceOverrideRaw = formData.get(`variant_${index}_price_override`);
    const hasAnyValue = Boolean(
      id ||
        size ||
        sku ||
        color ||
        (typeof stockRaw === "string" && stockRaw.trim()) ||
        (typeof priceOverrideRaw === "string" && priceOverrideRaw.trim()),
    );

    if (!hasAnyValue) {
      continue;
    }

    if (!size) {
      throw new Error(`Variant row ${index + 1} requires a size.`);
    }

    if (!sku) {
      throw new Error(`Variant row ${index + 1} requires an SKU.`);
    }

    const stockQuantity = parseNonNegativeInteger(
      stockRaw,
      `Variant stock quantity on row ${index + 1}`,
    );
    const priceOverride = parseNonNegativeNumber(
      priceOverrideRaw,
      `Variant price override on row ${index + 1}`,
      { allowNull: true },
    );
    const normalizedKey = `${size.toLowerCase()}::${(color ?? "").toLowerCase()}`;
    const normalizedSku = sku.toLowerCase();

    if (seenKeys.has(normalizedKey)) {
      throw new Error(
        `Duplicate size/color combination found on variant row ${index + 1}.`,
      );
    }

    if (seenSkus.has(normalizedSku)) {
      throw new Error(`Duplicate SKU found on variant row ${index + 1}.`);
    }

    seenKeys.add(normalizedKey);
    seenSkus.add(normalizedSku);

    variants.push({
      id,
      sku,
      size,
      color,
      stockQuantity,
      priceOverride,
      isActive: parseBoolean(formData, `variant_${index}_is_active`),
      position: index,
    });
  }

  if (variants.length === 0) {
    throw new Error("Add at least one product variant before saving.");
  }

  return variants;
}

function parseImageRows(formData: FormData) {
  const countValue = formData.get("image_count");
  const count =
    typeof countValue === "string" ? Number.parseInt(countValue, 10) : 0;
  const images: ParsedImageRow[] = [];
  const removedImageIds: string[] = [];
  const seenSortOrders = new Set<number>();

  for (let index = 0; index < (Number.isFinite(count) ? count : 0); index += 1) {
    const id = toNullableString(formData.get(`image_${index}_id`));
    const imageUrl = toNullableString(formData.get(`image_${index}_image_url`));
    const uploadEntry = formData.get(`image_${index}_file`);
    const label = toNullableString(formData.get(`image_${index}_label`));
    const angle = toNullableString(formData.get(`image_${index}_angle`));
    const note = toNullableString(formData.get(`image_${index}_note`));
    const altText = toNullableString(formData.get(`image_${index}_alt_text`));
    const toneValue = toNullableString(formData.get(`image_${index}_tone`));
    const sortOrderRaw = formData.get(`image_${index}_sort_order`);
    const remove = parseBoolean(formData, `image_${index}_remove`);
    const uploadFile = isImageFileEntry(uploadEntry) ? uploadEntry : null;
    const hasAnyValue = Boolean(
      id ||
        imageUrl ||
        uploadFile ||
        label ||
        angle ||
        note ||
        altText ||
        (typeof sortOrderRaw === "string" && sortOrderRaw.trim()),
    );

    if (!hasAnyValue && !remove) {
      continue;
    }

    if (remove) {
      if (id) {
        removedImageIds.push(id);
      }

      continue;
    }

    if (!imageUrl && !uploadFile) {
      throw new Error(
        `Image row ${index + 1} requires either an uploaded file or an image URL.`,
      );
    }

    if (!label) {
      throw new Error(`Image row ${index + 1} requires a label.`);
    }

    const sortOrder = parseNonNegativeInteger(
      sortOrderRaw,
      `Image display order on row ${index + 1}`,
    );

    if (seenSortOrders.has(sortOrder)) {
      throw new Error(`Image display order ${sortOrder} is used more than once.`);
    }

    seenSortOrders.add(sortOrder);

    const tone = toneValue && VALID_IMAGE_TONES.has(toneValue as ProductTone)
      ? (toneValue as ProductTone)
      : "obsidian";

    images.push({
      id,
      imageUrl: imageUrl ?? "",
      uploadFile,
      altText: altText ?? label,
      label,
      angle: angle ?? "",
      note: note ?? "",
      tone,
      sortOrder,
      isPrimary: parseBoolean(formData, `image_${index}_is_primary`),
    });
  }

  if (images.length > 0 && !images.some((image) => image.isPrimary)) {
    images[0] = {
      ...images[0],
      isPrimary: true,
    };
  }

  if (images.filter((image) => image.isPrimary).length > 1) {
    throw new Error("Only one product image can be marked as primary.");
  }

  return {
    images,
    removedImageIds,
  };
}

function parseProductPayload(formData: FormData): ParsedProductPayload {
  const name = toRequiredString(formData.get("name"), "Product name");
  const parsedPrice = parseNonNegativeNumber(formData.get("price"), "Base price");
  const price = parsedPrice ?? 0;
  const compareAtPrice = parseNonNegativeNumber(
    formData.get("compare_at_price"),
    "Compare-at price",
    { allowNull: true },
  );

  if (compareAtPrice !== null && compareAtPrice < price) {
    throw new Error("Compare-at price should be greater than or equal to the base price.");
  }

  const { images, removedImageIds } = parseImageRows(formData);

  return {
    name,
    slug: parseSlug(formData),
    shortDescription: toRequiredString(
      formData.get("short_description"),
      "Short description",
    ),
    description: toRequiredString(formData.get("description"), "Description"),
    story: toNullableString(formData.get("story")) ?? "",
    price,
    compareAtPrice,
    categoryId: toRequiredString(formData.get("category_id"), "Category"),
    collectionId: toNullableString(formData.get("collection_id")),
    materials: parseLineList(formData, "materials"),
    fabricNotes: parseLineList(formData, "fabric_notes"),
    careNotes: parseLineList(formData, "care_notes"),
    fitNotes: parseLineList(formData, "fit_notes"),
    limitedEdition: parseBoolean(formData, "limited_edition"),
    isActive: parseBoolean(formData, "is_active"),
    isFeatured: parseBoolean(formData, "is_featured"),
    variants: parseVariantRows(formData),
    images,
    removedImageIds,
  };
}

async function ensureCategoryAndCollectionExist(
  categoryId: string,
  collectionId: string | null,
) {
  const supabase = await createServerSupabaseClient();
  const [{ count: categoryCount, error: categoryError }, collectionResult] =
    await Promise.all([
      supabase
        .from("categories")
        .select("id", { head: true, count: "exact" })
        .eq("id", categoryId),
      collectionId
        ? supabase
            .from("collections")
            .select("id", { head: true, count: "exact" })
            .eq("id", collectionId)
        : Promise.resolve({ count: 1, error: null }),
    ]);

  if (categoryError) {
    throw new Error(`Failed to validate category: ${categoryError.message}`);
  }

  if (collectionResult.error) {
    throw new Error(`Failed to validate collection: ${collectionResult.error.message}`);
  }

  if (!categoryCount) {
    throw new Error("Choose a valid category for this product.");
  }

  if (collectionId && !collectionResult.count) {
    throw new Error("Choose a valid collection or leave the collection empty.");
  }
}

async function ensureUniqueProductSlug(slug: string, currentProductId?: string) {
  const supabase = await createServerSupabaseClient();
  let query = supabase.from("products").select("id").eq("slug", slug);

  if (currentProductId) {
    query = query.neq("id", currentProductId);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    throw new Error(`Failed to validate product slug: ${error.message}`);
  }

  if (data) {
    throw new Error("This slug is already in use by another product.");
  }
}

async function getProductIdentity(productId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
        id,
        slug,
        collection_id,
        collection:collections (
          slug
        ),
        variants:product_variants (
          id
        ),
        images:product_images (
          id,
          storage_path,
          image_url
        )
      `,
    )
    .eq("id", productId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load product identity: ${error.message}`);
  }

  return (data as ProductIdentityRow | null) ?? null;
}

function assertOwnedChildIds(
  currentProduct: ProductIdentityRow,
  variants: ParsedVariantRow[],
  images: ParsedImageRow[],
  removedImageIds: string[],
) {
  const allowedVariantIds = new Set(
    (currentProduct.variants ?? []).map((variant) => variant.id),
  );
  const allowedImageIds = new Set((currentProduct.images ?? []).map((image) => image.id));

  for (const variant of variants) {
    if (variant.id && !allowedVariantIds.has(variant.id)) {
      throw new Error("A variant reference did not belong to this product.");
    }
  }

  for (const image of images) {
    if (image.id && !allowedImageIds.has(image.id)) {
      throw new Error("An image reference did not belong to this product.");
    }
  }

  for (const imageId of removedImageIds) {
    if (!allowedImageIds.has(imageId)) {
      throw new Error("An image removal reference did not belong to this product.");
    }
  }
}

function createProductInsertPayload(payload: ParsedProductPayload): ProductInsert {
  return {
    category_id: payload.categoryId,
    collection_id: payload.collectionId,
    name: payload.name,
    slug: payload.slug,
    short_description: payload.shortDescription,
    description: payload.description,
    story: payload.story,
    base_price: payload.price,
    compare_at_price: payload.compareAtPrice,
    materials: payload.materials,
    fabric_notes: payload.fabricNotes,
    care_notes: payload.careNotes,
    fit_notes: payload.fitNotes,
    limited_edition: payload.limitedEdition,
    is_active: payload.isActive,
    is_featured: payload.isFeatured,
  };
}

function createProductUpdatePayload(payload: ParsedProductPayload): ProductUpdate {
  return createProductInsertPayload(payload);
}

async function syncProductVariants(productId: string, variants: ParsedVariantRow[]) {
  const supabase = await createServerSupabaseClient();
  const rows = variants.map((variant) => ({
    id: variant.id ?? undefined,
    product_id: productId,
    sku: variant.sku,
    size: variant.size,
    color: variant.color,
    price_override: variant.priceOverride,
    stock_quantity: variant.stockQuantity,
    is_active: variant.isActive,
    position: variant.position,
  }) satisfies ProductVariantInsert);

  const { error } = await supabase.from("product_variants").upsert(rows);

  if (error) {
    throw new Error(`Failed to save product variants: ${error.message}`);
  }
}

async function syncProductImages(
  productId: string,
  images: ParsedImageRow[],
  removedImageIds: string[],
  currentImages: ProductIdentityRow["images"] = [],
) {
  const supabase = await createServerSupabaseClient();
  const currentImageMap = new Map(
    (currentImages ?? []).map((image) => [image.id, image]),
  );
  const uploadedPathsToCleanup = new Set<string>();
  const oldStoragePathsToRemove = new Set<string>();
  const removedStoragePaths = removedImageIds.flatMap((imageId) => {
    const image = currentImageMap.get(imageId);

    return image?.storage_path ? [image.storage_path] : [];
  });

  try {
    if (removedImageIds.length > 0) {
      const { error: deleteError } = await supabase
        .from("product_images")
        .delete()
        .in("id", removedImageIds);

      if (deleteError) {
        throw new Error(`Failed to remove product images: ${deleteError.message}`);
      }
    }

    if (images.length === 0) {
      if (removedStoragePaths.length > 0) {
        try {
          await removeProductImageFiles(removedStoragePaths);
        } catch (error) {
          console.error("Failed to remove storage objects after image deletion.", error);
        }
      }

      return;
    }

    const rows: ProductImageInsert[] = [];

    for (const image of images) {
      const currentImage = image.id ? currentImageMap.get(image.id) ?? null : null;
      let nextImageUrl = image.imageUrl;
      let nextStoragePath = currentImage?.storage_path ?? null;

      if (image.uploadFile) {
        const uploadedImage = await uploadProductImageFile(productId, image.uploadFile);

        uploadedPathsToCleanup.add(uploadedImage.storagePath);
        nextImageUrl = uploadedImage.publicUrl;
        nextStoragePath = uploadedImage.storagePath;

        if (
          currentImage?.storage_path &&
          currentImage.storage_path !== uploadedImage.storagePath
        ) {
          oldStoragePathsToRemove.add(currentImage.storage_path);
        }
      } else if (
        currentImage?.storage_path &&
        nextImageUrl &&
        nextImageUrl !== currentImage.image_url
      ) {
        nextStoragePath = null;
        oldStoragePathsToRemove.add(currentImage.storage_path);
      }

      rows.push({
        id: image.id ?? undefined,
        product_id: productId,
        image_url: nextImageUrl,
        storage_path: nextStoragePath,
        alt_text: image.altText,
        label: image.label,
        angle: image.angle,
        note: image.note,
        tone: image.tone,
        sort_order: image.sortOrder,
        is_primary: image.isPrimary,
      } satisfies ProductImageInsert);
    }

    const { error } = await supabase.from("product_images").upsert(rows);

    if (error) {
      throw new Error(`Failed to save product images: ${error.message}`);
    }
  } catch (error) {
    if (uploadedPathsToCleanup.size > 0) {
      try {
        await removeProductImageFiles(Array.from(uploadedPathsToCleanup));
      } catch (cleanupError) {
        console.error("Failed to clean up uploaded product images after save error.", cleanupError);
      }
    }

    throw error;
  }

  const storagePathsToRemove = [
    ...removedStoragePaths,
    ...Array.from(oldStoragePathsToRemove),
  ];

  if (storagePathsToRemove.length > 0) {
    try {
      await removeProductImageFiles(storagePathsToRemove);
    } catch (error) {
      console.error("Failed to remove stale product image storage objects.", error);
    }
  }
}

function revalidateCatalogPaths(paths: Array<string | null | undefined>) {
  const uniquePaths = new Set(
    paths.filter((path): path is string => typeof path === "string" && path.length > 0),
  );

  uniquePaths.forEach((path) => {
    revalidatePath(path);
  });
}

function revalidateProductMutationPaths(params: {
  productId: string;
  previousSlug?: string | null;
  nextSlug?: string | null;
  previousCollectionSlug?: string | null;
  nextCollectionSlug?: string | null;
}) {
  revalidateCatalogPaths([
    "/",
    "/shop",
    "/collections",
    "/admin",
    "/admin/products",
    "/admin/products/new",
    `/admin/products/${params.productId}`,
    params.previousSlug ? `/products/${params.previousSlug}` : null,
    params.nextSlug ? `/products/${params.nextSlug}` : null,
    params.previousCollectionSlug
      ? `/collections/${params.previousCollectionSlug}`
      : null,
    params.nextCollectionSlug ? `/collections/${params.nextCollectionSlug}` : null,
  ]);
}

export async function toggleProductActiveAction(formData: FormData) {
  await requireAdmin("/admin/products");

  const productId = toNullableString(formData.get("product_id"));
  const nextActive = toNullableString(formData.get("next_active"));
  const returnTo = getSafeRedirectPath(formData.get("return_to"), "/admin/products");

  if (!productId || (nextActive !== "true" && nextActive !== "false")) {
    redirect(buildRedirectPath(returnTo, { error: "Product state update was invalid." }));
  }

  const currentProduct = await getProductIdentity(productId);

  if (!currentProduct) {
    redirect(buildRedirectPath(returnTo, { error: "Product could not be found." }));
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("products")
    .update({ is_active: nextActive === "true" })
    .eq("id", productId);

  if (error) {
    redirect(buildRedirectPath(returnTo, { error: error.message }));
  }

  revalidateProductMutationPaths({
    productId,
    previousSlug: currentProduct.slug,
    nextSlug: currentProduct.slug,
    previousCollectionSlug: currentProduct.collection?.slug ?? null,
    nextCollectionSlug: currentProduct.collection?.slug ?? null,
  });

  redirect(buildRedirectPath(returnTo, { updated: "active" }));
}

export async function toggleProductFeaturedAction(formData: FormData) {
  await requireAdmin("/admin/products");

  const productId = toNullableString(formData.get("product_id"));
  const nextFeatured = toNullableString(formData.get("next_featured"));
  const returnTo = getSafeRedirectPath(formData.get("return_to"), "/admin/products");

  if (!productId || (nextFeatured !== "true" && nextFeatured !== "false")) {
    redirect(
      buildRedirectPath(returnTo, { error: "Featured state update was invalid." }),
    );
  }

  const currentProduct = await getProductIdentity(productId);

  if (!currentProduct) {
    redirect(buildRedirectPath(returnTo, { error: "Product could not be found." }));
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("products")
    .update({ is_featured: nextFeatured === "true" })
    .eq("id", productId);

  if (error) {
    redirect(buildRedirectPath(returnTo, { error: error.message }));
  }

  revalidateProductMutationPaths({
    productId,
    previousSlug: currentProduct.slug,
    nextSlug: currentProduct.slug,
    previousCollectionSlug: currentProduct.collection?.slug ?? null,
    nextCollectionSlug: currentProduct.collection?.slug ?? null,
  });

  redirect(buildRedirectPath(returnTo, { updated: "featured" }));
}

export async function createProductAction(formData: FormData) {
  await requireAdmin("/admin/products/new");

  let createdProductId: string | null = null;

  try {
    const payload = parseProductPayload(formData);

    await ensureCategoryAndCollectionExist(payload.categoryId, payload.collectionId);
    await ensureUniqueProductSlug(payload.slug);

    const supabase = await createServerSupabaseClient();
    const { data: product, error } = await supabase
      .from("products")
      .insert(createProductInsertPayload(payload))
      .select("id, slug, collection:collections ( slug )")
      .single();

    if (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }

    createdProductId = product.id;

    await syncProductVariants(product.id, payload.variants);
    await syncProductImages(
      product.id,
      payload.images,
      payload.removedImageIds,
      [],
    );

    revalidateProductMutationPaths({
      productId: product.id,
      nextSlug: product.slug,
      nextCollectionSlug: product.collection?.slug ?? null,
    });

    redirect(
      buildRedirectPath(`/admin/products/${product.id}`, {
        created: "product",
      }),
    );
  } catch (error) {
    if (createdProductId) {
      const supabase = await createServerSupabaseClient();
      await supabase.from("products").delete().eq("id", createdProductId);
    }

    const message =
      error instanceof Error ? error.message : "Product creation failed.";

    redirect(
      buildRedirectPath("/admin/products/new", {
        error: message,
      }),
    );
  }
}

export async function updateProductAction(formData: FormData) {
  await requireAdmin("/admin/products");

  const productId = toNullableString(formData.get("product_id"));

  if (!productId) {
    redirect(
      buildRedirectPath("/admin/products", {
        error: "Product reference is missing.",
      }),
    );
  }

  try {
    const currentProduct = await getProductIdentity(productId);

    if (!currentProduct) {
      throw new Error("Product could not be found.");
    }

    const payload = parseProductPayload(formData);

    await ensureCategoryAndCollectionExist(payload.categoryId, payload.collectionId);
    await ensureUniqueProductSlug(payload.slug, productId);
    assertOwnedChildIds(
      currentProduct,
      payload.variants,
      payload.images,
      payload.removedImageIds,
    );

    const supabase = await createServerSupabaseClient();
    const { data: updatedProduct, error } = await supabase
      .from("products")
      .update(createProductUpdatePayload(payload))
      .eq("id", productId)
      .select("id, slug, collection:collections ( slug )")
      .single();

    if (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }

    await syncProductVariants(productId, payload.variants);
    await syncProductImages(
      productId,
      payload.images,
      payload.removedImageIds,
      currentProduct.images,
    );

    revalidateProductMutationPaths({
      productId,
      previousSlug: currentProduct.slug,
      nextSlug: updatedProduct.slug,
      previousCollectionSlug: currentProduct.collection?.slug ?? null,
      nextCollectionSlug: updatedProduct.collection?.slug ?? null,
    });

    redirect(
      buildRedirectPath(`/admin/products/${productId}`, {
        updated: "product",
      }),
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Product update failed.";

    redirect(
      buildRedirectPath(`/admin/products/${productId}`, {
        error: message,
      }),
    );
  }
}
