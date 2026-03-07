import "server-only";

import { createServiceRoleSupabaseClient } from "./server";

export const PRODUCT_IMAGE_BUCKET = "product-images";
export const MAX_PRODUCT_IMAGE_BYTES = 10 * 1024 * 1024;

const ALLOWED_PRODUCT_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

function sanitizeFileStem(value: string) {
  return value
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function getFileExtension(file: File) {
  const extensionFromName = file.name.split(".").pop()?.toLowerCase();

  if (extensionFromName && extensionFromName.length <= 8) {
    return extensionFromName;
  }

  switch (file.type) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/avif":
      return "avif";
    default:
      return "bin";
  }
}

function buildProductImageStoragePath(productId: string, file: File) {
  const safeStem = sanitizeFileStem(file.name) || "product-image";
  const extension = getFileExtension(file);

  return `products/${productId}/${Date.now()}-${crypto.randomUUID()}-${safeStem}.${extension}`;
}

export function isImageFileEntry(entry: FormDataEntryValue | null): entry is File {
  return typeof File !== "undefined" && entry instanceof File && entry.size > 0;
}

export function validateProductImageFile(file: File) {
  if (!ALLOWED_PRODUCT_IMAGE_MIME_TYPES.has(file.type)) {
    throw new Error("Only JPG, PNG, WebP, and AVIF product images are supported.");
  }

  if (file.size > MAX_PRODUCT_IMAGE_BYTES) {
    throw new Error("Product image uploads must be 10 MB or smaller.");
  }
}

export function getProductImagePublicUrl(storagePath: string) {
  const supabase = createServiceRoleSupabaseClient();
  const { data } = supabase.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .getPublicUrl(storagePath);

  return data.publicUrl;
}

export async function uploadProductImageFile(productId: string, file: File) {
  validateProductImageFile(file);

  const supabase = createServiceRoleSupabaseClient();
  const storagePath = buildProductImageStoragePath(productId, file);
  const { error } = await supabase.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .upload(storagePath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload product image: ${error.message}`);
  }

  return {
    storagePath,
    publicUrl: getProductImagePublicUrl(storagePath),
  };
}

export async function removeProductImageFile(storagePath: string) {
  const supabase = createServiceRoleSupabaseClient();
  const { error } = await supabase.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .remove([storagePath]);

  if (error) {
    throw new Error(`Failed to remove product image from storage: ${error.message}`);
  }
}

export async function removeProductImageFiles(storagePaths: string[]) {
  const uniquePaths = Array.from(new Set(storagePaths.filter(Boolean)));

  if (uniquePaths.length === 0) {
    return;
  }

  const supabase = createServiceRoleSupabaseClient();
  const { error } = await supabase.storage
    .from(PRODUCT_IMAGE_BUCKET)
    .remove(uniquePaths);

  if (error) {
    throw new Error(`Failed to remove product images from storage: ${error.message}`);
  }
}
