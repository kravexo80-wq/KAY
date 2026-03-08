export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];
export type LocaleDirection = "ltr" | "rtl";

export const defaultLocale: Locale = "en";

export const localeCookieName = "kravexo-locale";
export const localeHeaderName = "x-kravexo-locale";
export const localePathnameHeaderName = "x-kravexo-pathname";
export const localeDirectionHeaderName = "x-kravexo-direction";

const localePattern = /^[a-z]{2}(?:-[a-z]{2})?$/i;

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "ar";
}

export function isLocaleLikeSegment(value: string | null | undefined) {
  if (!value) {
    return false;
  }

  return localePattern.test(value);
}

export function getLocaleDirection(locale: Locale): LocaleDirection {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const [, segment] = pathname.split("/");

  return isLocale(segment) ? segment : null;
}

function splitHref(href: string) {
  const match = href.match(/^([^?#]*)(.*)$/);

  return {
    pathname: match?.[1] ?? href,
    suffix: match?.[2] ?? "",
  };
}

function isExternalHref(href: string) {
  return /^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith("#");
}

export function stripLocaleFromPathname(pathname: string) {
  const locale = getLocaleFromPathname(pathname);

  if (!locale) {
    return pathname || "/";
  }

  const stripped = pathname.slice(`/${locale}`.length);

  return stripped.length > 0 ? stripped : "/";
}

export function localizeHref(locale: Locale, href: string) {
  if (!href || isExternalHref(href)) {
    return href;
  }

  const { pathname, suffix } = splitHref(href);
  const normalizedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const strippedPathname = stripLocaleFromPathname(normalizedPathname);
  const localizedPathname =
    strippedPathname === "/" ? `/${locale}` : `/${locale}${strippedPathname}`;

  return `${localizedPathname}${suffix}`;
}

export function switchHrefLocale(href: string, locale: Locale) {
  return localizeHref(locale, href);
}

export function detectPreferredLocale(
  acceptLanguageHeader: string | null | undefined,
): Locale {
  if (!acceptLanguageHeader) {
    return defaultLocale;
  }

  return /\bar\b/i.test(acceptLanguageHeader) ? "ar" : defaultLocale;
}
