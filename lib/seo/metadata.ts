import type { Metadata } from "next";

import { getSiteUrl, siteConfig } from "@/lib/config/site";
import {
  localizeHref,
  locales,
  stripLocaleFromPathname,
  type Locale,
} from "@/lib/i18n/config";

const ogLocaleMap: Record<Locale, string> = {
  en: "en_GB",
  ar: "ar_SA",
};

function toAbsoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

function buildAlternates(locale: Locale, pathname: string) {
  const normalizedPathname = (pathname || "/").split(/[?#]/)[0] || "/";
  const strippedPathname = stripLocaleFromPathname(normalizedPathname);
  const canonicalPath = localizeHref(locale, strippedPathname);

  return {
    canonical: toAbsoluteUrl(canonicalPath),
    languages: {
      en: toAbsoluteUrl(localizeHref("en", strippedPathname)),
      ar: toAbsoluteUrl(localizeHref("ar", strippedPathname)),
      "x-default": toAbsoluteUrl(localizeHref("en", strippedPathname)),
    },
  } satisfies NonNullable<Metadata["alternates"]>;
}

function buildImageEntry(title: string, imagePath?: string) {
  const path = imagePath ?? "/opengraph-image";

  return [
    {
      url: toAbsoluteUrl(path),
      width: 1200,
      height: 630,
      alt: title,
    },
  ];
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  imagePath,
  noIndex = false,
}: {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  imagePath?: string;
  noIndex?: boolean;
}): Metadata {
  const alternates = buildAlternates(locale, pathname);
  const images = buildImageEntry(title, imagePath);

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    applicationName: siteConfig.name,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: siteConfig.name,
      type: "website",
      locale: ogLocaleMap[locale],
      alternateLocale: locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => ogLocaleMap[candidate]),
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((image) => image.url),
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
  };
}
