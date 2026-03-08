import "server-only";

import { cookies, headers } from "next/headers";

import { getDictionary, type Dictionary } from "./dictionaries";
import {
  defaultLocale,
  getLocaleDirection,
  getLocaleFromPathname,
  isLocale,
  localeCookieName,
  localeDirectionHeaderName,
  localeHeaderName,
  localePathnameHeaderName,
  localizeHref,
  type Locale,
  type LocaleDirection,
} from "./config";

export async function getRequestLocale(): Promise<Locale> {
  const headerStore = await headers();
  const headerLocale = headerStore.get(localeHeaderName);
  const headerPathname = headerStore.get(localePathnameHeaderName);

  if (isLocale(headerLocale)) {
    return headerLocale;
  }

  if (headerPathname) {
    const pathnameLocale = getLocaleFromPathname(
      headerPathname.split("?")[0] ?? headerPathname,
    );

    if (pathnameLocale) {
      return pathnameLocale;
    }
  }

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;

  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return defaultLocale;
}

export async function getRequestDirection(): Promise<LocaleDirection> {
  const headerStore = await headers();
  const headerDirection = headerStore.get(localeDirectionHeaderName);
  const locale = await getRequestLocale();

  if (headerDirection === "ltr" || headerDirection === "rtl") {
    return headerDirection;
  }

  return getLocaleDirection(locale);
}

export async function getRequestPathname() {
  const headerStore = await headers();

  return (
    headerStore.get(localePathnameHeaderName) ??
    localizeHref(await getRequestLocale(), "/")
  );
}

export async function getRequestDictionary(): Promise<Dictionary> {
  return getDictionary(await getRequestLocale());
}

export async function getRequestI18n() {
  const locale = await getRequestLocale();

  return {
    locale,
    direction: getLocaleDirection(locale),
    pathname: await getRequestPathname(),
    dictionary: await getDictionary(locale),
  };
}
