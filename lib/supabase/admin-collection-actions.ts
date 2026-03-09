"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { Tables, TablesInsert, TablesUpdate } from "@/types/database";
import type { ProductTone } from "@/types/product";

import { getAdminTaxonomyCopy } from "@/lib/i18n/admin-taxonomy-copy";
import {
  getLocaleFromPathname,
  localizeHref,
  type Locale,
} from "@/lib/i18n/config";
import { getRequestLocale } from "@/lib/i18n/request";

import { getSafeRedirectPath, requireAdmin } from "./auth";
import { createServerSupabaseClient } from "./server";

type CollectionInsert = TablesInsert<"collections">;
type CollectionUpdate = TablesUpdate<"collections">;
type CollectionIdentityRow = Pick<Tables<"collections">, "id" | "slug">;

const VALID_COLLECTION_TONES = new Set<ProductTone>([
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

function resolveActionLocale(pathname?: string | null): Locale {
  return pathname ? getLocaleFromPathname(pathname) ?? "en" : "en";
}

function toLocalizedAdminPath(locale: Locale, path: string) {
  return localizeHref(locale, path);
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

function parseNonNegativeInteger(
  value: FormDataEntryValue | null,
  label: string,
  { allowNull = false }: { allowNull?: boolean } = {},
) {
  if (typeof value !== "string" || !value.trim()) {
    if (allowNull) {
      return 0;
    }

    throw new Error(`${label} is required.`);
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`${label} must be a non-negative whole number.`);
  }

  return parsed;
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
  const source =
    explicitSlug ?? toRequiredString(formData.get("name"), "Collection name");
  const slug = slugifyValue(source);

  if (!slug) {
    throw new Error("Slug could not be generated from this collection name.");
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Slug must contain only lowercase letters, numbers, and hyphens.");
  }

  return slug;
}

function parseTone(value: FormDataEntryValue | null) {
  const tone = toNullableString(value);

  if (!tone || !VALID_COLLECTION_TONES.has(tone as ProductTone)) {
    return "obsidian" satisfies ProductTone;
  }

  return tone as ProductTone;
}

function parseCollectionPayload(formData: FormData) {
  return {
    name: toRequiredString(formData.get("name"), "Collection name"),
    nameAr: toNullableString(formData.get("name_ar")),
    slug: parseSlug(formData),
    eyebrow: toRequiredString(formData.get("eyebrow"), "Collection eyebrow"),
    eyebrowAr: toNullableString(formData.get("eyebrow_ar")),
    description: toRequiredString(
      formData.get("description"),
      "Collection description",
    ),
    descriptionAr: toNullableString(formData.get("description_ar")),
    highlight: toRequiredString(
      formData.get("highlight"),
      "Collection highlight note",
    ),
    highlightAr: toNullableString(formData.get("highlight_ar")),
    tone: parseTone(formData.get("tone")),
    sortOrder: parseNonNegativeInteger(formData.get("sort_order"), "Sort order", {
      allowNull: true,
    }),
    isActive: parseBoolean(formData, "is_active"),
    isFeatured: parseBoolean(formData, "is_featured"),
  };
}

async function ensureUniqueCollectionSlug(slug: string, currentCollectionId?: string) {
  const supabase = await createServerSupabaseClient();
  let query = supabase.from("collections").select("id").eq("slug", slug);

  if (currentCollectionId) {
    query = query.neq("id", currentCollectionId);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    throw new Error(`Failed to validate collection slug: ${error.message}`);
  }

  if (data) {
    throw new Error("This collection slug is already in use.");
  }
}

async function getCollectionIdentity(collectionId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("collections")
    .select("id, slug")
    .eq("id", collectionId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load collection identity: ${error.message}`);
  }

  return (data as CollectionIdentityRow | null) ?? null;
}

function createCollectionInsertPayload(
  payload: ReturnType<typeof parseCollectionPayload>,
): CollectionInsert {
  return {
    name: payload.name,
    name_ar: payload.nameAr,
    slug: payload.slug,
    eyebrow: payload.eyebrow,
    eyebrow_ar: payload.eyebrowAr,
    description: payload.description,
    description_ar: payload.descriptionAr,
    highlight: payload.highlight,
    highlight_ar: payload.highlightAr,
    tone: payload.tone,
    sort_order: payload.sortOrder,
    is_active: payload.isActive,
    is_featured: payload.isFeatured,
  };
}

function createCollectionUpdatePayload(
  payload: ReturnType<typeof parseCollectionPayload>,
): CollectionUpdate {
  return createCollectionInsertPayload(payload);
}

function revalidateCollectionPaths(params: {
  collectionId: string;
  previousSlug?: string | null;
  nextSlug?: string | null;
}) {
  const paths = [
    "/",
    "/shop",
    "/collections",
    "/admin",
    "/admin/products",
    "/admin/products/new",
    "/admin/collections",
    "/admin/collections/new",
    `/admin/collections/${params.collectionId}`,
    params.previousSlug ? `/collections/${params.previousSlug}` : null,
    params.nextSlug ? `/collections/${params.nextSlug}` : null,
  ];

  Array.from(new Set(paths.filter(Boolean) as string[])).forEach((path) => {
    revalidatePath(path);
  });
}

export async function toggleCollectionActiveAction(formData: FormData) {
  await requireAdmin("/admin/collections");

  const collectionId = toNullableString(formData.get("collection_id"));
  const nextActive = toNullableString(formData.get("next_active"));
  const returnTo = getSafeRedirectPath(
    formData.get("return_to"),
    "/admin/collections",
  );
  const locale = resolveActionLocale(returnTo);
  const copy = getAdminTaxonomyCopy(locale).collections;

  if (!collectionId || (nextActive !== "true" && nextActive !== "false")) {
    redirect(
      buildRedirectPath(returnTo, {
        error: copy.actions.invalidState,
      }),
    );
  }

  const currentCollection = await getCollectionIdentity(collectionId);

  if (!currentCollection) {
    redirect(
      buildRedirectPath(returnTo, {
        error: copy.actions.notFound,
      }),
    );
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("collections")
    .update({ is_active: nextActive === "true" })
    .eq("id", collectionId);

  if (error) {
    redirect(buildRedirectPath(returnTo, { error: error.message }));
  }

  revalidateCollectionPaths({
    collectionId,
    previousSlug: currentCollection.slug,
    nextSlug: currentCollection.slug,
  });

  redirect(buildRedirectPath(returnTo, { updated: "active" }));
}

export async function createCollectionAction(formData: FormData) {
  await requireAdmin("/admin/collections/new");
  const locale = await getRequestLocale();
  const copy = getAdminTaxonomyCopy(locale).collections;
  const newCollectionPath = toLocalizedAdminPath(locale, "/admin/collections/new");

  try {
    const payload = parseCollectionPayload(formData);

    await ensureUniqueCollectionSlug(payload.slug);

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("collections")
      .insert(createCollectionInsertPayload(payload))
      .select("id, slug")
      .single();

    if (error) {
      throw new Error(`Failed to create collection: ${error.message}`);
    }

    revalidateCollectionPaths({
      collectionId: data.id,
      nextSlug: data.slug,
    });

    redirect(
      buildRedirectPath(toLocalizedAdminPath(locale, `/admin/collections/${data.id}`), {
        created: "collection",
      }),
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : copy.actions.createFailed;

    redirect(
      buildRedirectPath(newCollectionPath, {
        error:
          message === "This collection slug is already in use."
            ? copy.actions.slugInUse
            : message,
      }),
    );
  }
}

export async function updateCollectionAction(formData: FormData) {
  await requireAdmin("/admin/collections");
  const locale = await getRequestLocale();
  const copy = getAdminTaxonomyCopy(locale).collections;
  const collectionId = toNullableString(formData.get("collection_id"));

  if (!collectionId) {
    redirect(
      buildRedirectPath(toLocalizedAdminPath(locale, "/admin/collections"), {
        error: copy.actions.referenceMissing,
      }),
    );
  }

  try {
    const currentCollection = await getCollectionIdentity(collectionId);

    if (!currentCollection) {
      throw new Error(copy.actions.notFound);
    }

    const payload = parseCollectionPayload(formData);
    await ensureUniqueCollectionSlug(payload.slug, collectionId);

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from("collections")
      .update(createCollectionUpdatePayload(payload))
      .eq("id", collectionId);

    if (error) {
      throw new Error(`Failed to update collection: ${error.message}`);
    }

    revalidateCollectionPaths({
      collectionId,
      previousSlug: currentCollection.slug,
      nextSlug: payload.slug,
    });

    redirect(
      buildRedirectPath(
        toLocalizedAdminPath(locale, `/admin/collections/${collectionId}`),
        {
          updated: "collection",
        },
      ),
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : copy.actions.updateFailed;

    redirect(
      buildRedirectPath(
        toLocalizedAdminPath(locale, `/admin/collections/${collectionId}`),
        {
          error:
            message === "This collection slug is already in use."
              ? copy.actions.slugInUse
              : message,
        },
      ),
    );
  }
}
