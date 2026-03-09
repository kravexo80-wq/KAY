"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { Tables, TablesInsert, TablesUpdate } from "@/types/database";

import { getAdminTaxonomyCopy } from "@/lib/i18n/admin-taxonomy-copy";
import {
  getLocaleFromPathname,
  localizeHref,
  type Locale,
} from "@/lib/i18n/config";
import { getRequestLocale } from "@/lib/i18n/request";

import { getSafeRedirectPath, requireAdmin } from "./auth";
import { createServerSupabaseClient } from "./server";

type CategoryInsert = TablesInsert<"categories">;
type CategoryUpdate = TablesUpdate<"categories">;
type CategoryIdentityRow = Pick<Tables<"categories">, "id" | "slug">;

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
  const source = explicitSlug ?? toRequiredString(formData.get("name"), "Category name");
  const slug = slugifyValue(source);

  if (!slug) {
    throw new Error("Slug could not be generated from this category name.");
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Slug must contain only lowercase letters, numbers, and hyphens.");
  }

  return slug;
}

function parseCategoryPayload(formData: FormData) {
  return {
    name: toRequiredString(formData.get("name"), "Category name"),
    nameAr: toNullableString(formData.get("name_ar")),
    slug: parseSlug(formData),
    description: toRequiredString(formData.get("description"), "Category description"),
    descriptionAr: toNullableString(formData.get("description_ar")),
    sortOrder: parseNonNegativeInteger(formData.get("sort_order"), "Sort order", {
      allowNull: true,
    }),
    isActive: parseBoolean(formData, "is_active"),
  };
}

async function ensureUniqueCategorySlug(slug: string, currentCategoryId?: string) {
  const supabase = await createServerSupabaseClient();
  let query = supabase.from("categories").select("id").eq("slug", slug);

  if (currentCategoryId) {
    query = query.neq("id", currentCategoryId);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    throw new Error(`Failed to validate category slug: ${error.message}`);
  }

  if (data) {
    throw new Error("This category slug is already in use.");
  }
}

async function getCategoryIdentity(categoryId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug")
    .eq("id", categoryId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load category identity: ${error.message}`);
  }

  return (data as CategoryIdentityRow | null) ?? null;
}

function createCategoryInsertPayload(payload: ReturnType<typeof parseCategoryPayload>): CategoryInsert {
  return {
    name: payload.name,
    name_ar: payload.nameAr,
    slug: payload.slug,
    description: payload.description,
    description_ar: payload.descriptionAr,
    sort_order: payload.sortOrder,
    is_active: payload.isActive,
  };
}

function createCategoryUpdatePayload(payload: ReturnType<typeof parseCategoryPayload>): CategoryUpdate {
  return createCategoryInsertPayload(payload);
}

function revalidateCategoryPaths(params: {
  categoryId: string;
}) {
  const paths = [
    "/",
    "/shop",
    "/collections",
    "/admin",
    "/admin/products",
    "/admin/products/new",
    "/admin/categories",
    "/admin/categories/new",
    `/admin/categories/${params.categoryId}`,
  ];

  Array.from(new Set(paths)).forEach((path) => {
    revalidatePath(path);
  });
}

export async function toggleCategoryActiveAction(formData: FormData) {
  await requireAdmin("/admin/categories");

  const categoryId = toNullableString(formData.get("category_id"));
  const nextActive = toNullableString(formData.get("next_active"));
  const returnTo = getSafeRedirectPath(formData.get("return_to"), "/admin/categories");
  const locale = resolveActionLocale(returnTo);
  const copy = getAdminTaxonomyCopy(locale).categories;

  if (!categoryId || (nextActive !== "true" && nextActive !== "false")) {
    redirect(
      buildRedirectPath(returnTo, {
        error: copy.actions.invalidState,
      }),
    );
  }

  const currentCategory = await getCategoryIdentity(categoryId);

  if (!currentCategory) {
    redirect(
      buildRedirectPath(returnTo, {
        error: copy.actions.notFound,
      }),
    );
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("categories")
    .update({ is_active: nextActive === "true" })
    .eq("id", categoryId);

  if (error) {
    redirect(buildRedirectPath(returnTo, { error: error.message }));
  }

  revalidateCategoryPaths({
    categoryId,
  });

  redirect(buildRedirectPath(returnTo, { updated: "active" }));
}

export async function createCategoryAction(formData: FormData) {
  await requireAdmin("/admin/categories/new");
  const locale = await getRequestLocale();
  const copy = getAdminTaxonomyCopy(locale).categories;
  const newCategoryPath = toLocalizedAdminPath(locale, "/admin/categories/new");

  try {
    const payload = parseCategoryPayload(formData);

    await ensureUniqueCategorySlug(payload.slug);

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("categories")
      .insert(createCategoryInsertPayload(payload))
      .select("id")
      .single();

    if (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }

    revalidateCategoryPaths({
      categoryId: data.id,
    });

    redirect(
      buildRedirectPath(toLocalizedAdminPath(locale, `/admin/categories/${data.id}`), {
        created: "category",
      }),
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : copy.actions.createFailed;

    redirect(
      buildRedirectPath(newCategoryPath, {
        error:
          message === "This category slug is already in use."
            ? copy.actions.slugInUse
            : message,
      }),
    );
  }
}

export async function updateCategoryAction(formData: FormData) {
  await requireAdmin("/admin/categories");
  const locale = await getRequestLocale();
  const copy = getAdminTaxonomyCopy(locale).categories;
  const categoryId = toNullableString(formData.get("category_id"));

  if (!categoryId) {
    redirect(
      buildRedirectPath(toLocalizedAdminPath(locale, "/admin/categories"), {
        error: copy.actions.referenceMissing,
      }),
    );
  }

  try {
    const currentCategory = await getCategoryIdentity(categoryId);

    if (!currentCategory) {
      throw new Error(copy.actions.notFound);
    }

    const payload = parseCategoryPayload(formData);
    await ensureUniqueCategorySlug(payload.slug, categoryId);

    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from("categories")
      .update(createCategoryUpdatePayload(payload))
      .eq("id", categoryId);

    if (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }

    revalidateCategoryPaths({
      categoryId,
    });

    redirect(
      buildRedirectPath(toLocalizedAdminPath(locale, `/admin/categories/${categoryId}`), {
        updated: "category",
      }),
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : copy.actions.updateFailed;

    redirect(
      buildRedirectPath(toLocalizedAdminPath(locale, `/admin/categories/${categoryId}`), {
        error:
          message === "This category slug is already in use."
            ? copy.actions.slugInUse
            : message,
      }),
    );
  }
}
