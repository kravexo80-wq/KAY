"use server";

import { redirect } from "next/navigation";

import { hasSupabaseEnv } from "./config";
import { getSafeRedirectPath } from "./auth";
import { createServerSupabaseClient } from "./server";

const AUTH_UNAVAILABLE_MESSAGE =
  "Authentication is not configured in this environment yet.";

function getFieldValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function buildRedirect(pathname: string, params: Record<string, string | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
}

export async function loginAction(formData: FormData) {
  const nextPath = getSafeRedirectPath(formData.get("next"), "/account");
  const email = getFieldValue(formData, "email");
  const password = getFieldValue(formData, "password");

  if (!hasSupabaseEnv()) {
    redirect(
      buildRedirect("/login", {
        error: AUTH_UNAVAILABLE_MESSAGE,
        next: nextPath !== "/account" ? nextPath : undefined,
      }),
    );
  }

  if (!email || !password) {
    redirect(
      buildRedirect("/login", {
        error: "Enter both your email and password.",
        next: nextPath !== "/account" ? nextPath : undefined,
      }),
    );
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(
      buildRedirect("/login", {
        error: error.message,
        next: nextPath !== "/account" ? nextPath : undefined,
      }),
    );
  }

  redirect(nextPath);
}

export async function signupAction(formData: FormData) {
  const nextPath = getSafeRedirectPath(formData.get("next"), "/account");
  const fullName = getFieldValue(formData, "fullName");
  const email = getFieldValue(formData, "email");
  const password = getFieldValue(formData, "password");
  const [firstName = "", ...remainingNames] = fullName.split(/\s+/).filter(Boolean);
  const lastName = remainingNames.join(" ");

  if (!hasSupabaseEnv()) {
    redirect(
      buildRedirect("/signup", {
        error: AUTH_UNAVAILABLE_MESSAGE,
        next: nextPath !== "/account" ? nextPath : undefined,
      }),
    );
  }

  if (!fullName || !email || !password) {
    redirect(
      buildRedirect("/signup", {
        error: "Complete all fields before creating your account.",
        next: nextPath !== "/account" ? nextPath : undefined,
      }),
    );
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: fullName,
        full_name: fullName,
        first_name: firstName || null,
        last_name: lastName || null,
      },
    },
  });

  if (error) {
    redirect(
      buildRedirect("/signup", {
        error: error.message,
        next: nextPath !== "/account" ? nextPath : undefined,
      }),
    );
  }

  if (!data.session) {
    redirect(
      buildRedirect("/login", {
        message:
          "Account created. Check your email to confirm the sign-in before continuing.",
        next: nextPath !== "/account" ? nextPath : undefined,
      }),
    );
  }

  redirect(nextPath);
}

export async function logoutAction() {
  if (!hasSupabaseEnv()) {
    redirect("/");
  }

  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();

  redirect("/");
}
