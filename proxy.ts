import { NextResponse, type NextRequest } from "next/server";

import {
  detectPreferredLocale,
  getLocaleDirection,
  getLocaleFromPathname,
  isLocale,
  isLocaleLikeSegment,
  localeCookieName,
  localeDirectionHeaderName,
  localeHeaderName,
  localePathnameHeaderName,
  localizeHref,
  stripLocaleFromPathname,
} from "@/lib/i18n/config";

import { proxy as supabaseProxy, updateSession } from "@/lib/supabase/middleware";

const localeCookieOptions = {
  path: "/",
  sameSite: "lax" as const,
  httpOnly: false,
  maxAge: 60 * 60 * 24 * 365,
};

function buildLocalizedRequestHeaders(
  request: NextRequest,
  locale: "en" | "ar",
  pathname: string,
) {
  const headers = new Headers(request.headers);

  headers.set(localeHeaderName, locale);
  headers.set(localePathnameHeaderName, pathname);
  headers.set(localeDirectionHeaderName, getLocaleDirection(locale));

  return headers;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api")) {
    return supabaseProxy(request);
  }

  const pathnameLocale = getLocaleFromPathname(pathname);

  if (!pathnameLocale) {
    const firstSegment = pathname.split("/")[1] ?? "";

    if (isLocaleLikeSegment(firstSegment)) {
      return supabaseProxy(request);
    }

    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const locale = isLocale(cookieLocale)
      ? cookieLocale
      : detectPreferredLocale(request.headers.get("accept-language"));
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = localizeHref(locale, pathname);
    request.cookies.set(localeCookieName, locale);

    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set(localeCookieName, locale, localeCookieOptions);

    return updateSession(request, response);
  }

  const requestPath = `${pathname}${request.nextUrl.search}`;
  const internalUrl = request.nextUrl.clone();

  internalUrl.pathname = stripLocaleFromPathname(pathname);
  request.cookies.set(localeCookieName, pathnameLocale);

  const response = NextResponse.rewrite(internalUrl, {
    request: {
      headers: buildLocalizedRequestHeaders(request, pathnameLocale, requestPath),
    },
  });

  response.cookies.set(localeCookieName, pathnameLocale, localeCookieOptions);

  return updateSession(request, response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)",
  ],
};
