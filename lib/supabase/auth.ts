import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import type { Tables } from "@/types/database";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestLocale } from "@/lib/i18n/request";

import { hasSupabaseEnv } from "./config";
import { createServerSupabaseClient } from "./server";

export type AppProfile = Tables<"profiles">;

const AUTH_UNAVAILABLE_MESSAGE =
  "Authentication is not configured in this environment yet.";

export function getSafeRedirectPath(
  value: FormDataEntryValue | string | null | undefined,
  fallback = "/account",
) {
  if (typeof value !== "string") {
    return fallback;
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return fallback;
  }

  return value;
}

export function getProfileDisplayName(
  profile: AppProfile | null,
  fallbackEmail?: string | null,
) {
  if (profile?.display_name) {
    return profile.display_name;
  }

  if (profile?.first_name || profile?.last_name) {
    return [profile.first_name, profile.last_name].filter(Boolean).join(" ");
  }

  if (fallbackEmail) {
    return fallbackEmail.split("@")[0] ?? "Account";
  }

  return "Account";
}

function buildLoginRedirect(
  locale: Awaited<ReturnType<typeof getRequestLocale>>,
  nextPath = "/account",
  error?: string,
) {
  const searchParams = new URLSearchParams();
  const safeNextPath = getSafeRedirectPath(nextPath, "/account");

  if (safeNextPath !== "/account") {
    searchParams.set("next", safeNextPath);
  }

  if (error) {
    searchParams.set("error", error);
  }

  const queryString = searchParams.toString();

  const loginPath = localizeHref(locale, "/login");

  return queryString ? `${loginPath}?${queryString}` : loginPath;
}

export const getCurrentUser = cache(async (): Promise<User | null> => {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    if (!error.message.toLowerCase().includes("auth session missing")) {
      console.error("Failed to load current Supabase user.", error);
    }

    return null;
  }

  return user;
});

export const getCurrentProfile = cache(async (): Promise<AppProfile | null> => {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load current profile.", error);
    return null;
  }

  return data;
});

export async function requireAuth(nextPath = "/account") {
  const locale = await getRequestLocale();

  if (!hasSupabaseEnv()) {
    redirect(buildLoginRedirect(locale, nextPath, AUTH_UNAVAILABLE_MESSAGE));
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect(buildLoginRedirect(locale, nextPath));
  }

  const profile = await getCurrentProfile();

  return {
    user,
    profile,
  };
}

export async function requireAdmin(nextPath = "/admin") {
  const auth = await requireAuth(nextPath);

  if (auth.profile?.role !== "admin") {
    redirect(localizeHref(await getRequestLocale(), "/account?denied=admin"));
  }

  return auth;
}
