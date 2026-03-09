import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import {
  defaultLocale,
  getLocaleFromPathname,
  localizeHref,
} from "@/lib/i18n/config";
import { getSafeRedirectPath } from "@/lib/supabase/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function getFallbackPath(type: EmailOtpType | null) {
  return type === "recovery" ? "/reset-password" : "/login";
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const tokenHash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
  const nextPath = getSafeRedirectPath(
    requestUrl.searchParams.get("next"),
    getFallbackPath(type),
  );
  const locale = getLocaleFromPathname(nextPath) ?? defaultLocale;
  const fallbackLoginPath = localizeHref(locale, "/login");

  if (!tokenHash || !type) {
    return NextResponse.redirect(
      new URL(
        `${fallbackLoginPath}?error=${encodeURIComponent(
          locale === "ar"
            ? "رابط التحقق غير صالح أو منتهي الصلاحية."
            : "The verification link is invalid or has expired.",
        )}`,
        request.url,
      ),
    );
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash: tokenHash,
  });

  if (error) {
    const targetPath =
      type === "recovery"
        ? localizeHref(locale, "/forgot-password")
        : fallbackLoginPath;

    return NextResponse.redirect(
      new URL(
        `${targetPath}?error=${encodeURIComponent(error.message)}`,
        request.url,
      ),
    );
  }

  return NextResponse.redirect(new URL(nextPath, request.url));
}
