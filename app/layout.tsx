import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  IBM_Plex_Sans_Arabic,
  Manrope,
  Noto_Kufi_Arabic,
} from "next/font/google";

import { SiteShell } from "@/components/layout/site-shell";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";
import {
  getRequestDirection,
  getRequestLocale,
  getRequestPathname,
} from "@/lib/i18n/request";

import "./globals.css";

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const arabicSans = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

const arabicDisplay = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const [locale, pathname] = await Promise.all([
    getRequestLocale(),
    getRequestPathname(),
  ]);
  const defaultTitle =
    locale === "ar"
      ? "كرافكسو | أزياء محتشمة فاخرة"
      : `${siteConfig.name} | Luxury modest wear`;
  const defaultDescription =
    locale === "ar"
      ? "متجر أزياء محتشمة فاخرة بتقديم بصري داكن، أنيق، ومتمحور حول المنتج."
      : "Luxury modest wear presented through a dark cinematic showroom built for refined product focus.";

  return {
    ...buildPageMetadata({
      locale,
      pathname,
      title: defaultTitle,
      description: defaultDescription,
    }),
    title: {
      default: defaultTitle,
      template: locale === "ar" ? `%s | ${siteConfig.name}` : `%s | ${siteConfig.name}`,
    },
    keywords:
      locale === "ar"
        ? [
            "كرافكسو",
            "أزياء محتشمة",
            "عبايات",
            "ملابس إسلامية",
            "أزياء عربية فاخرة",
          ]
        : [
            "Kravexo",
            "luxury modest wear",
            "abaya",
            "Islamic clothing",
            "Arabic fashion",
            "premium modest fashion",
          ],
    formatDetection: {
      email: false,
      telephone: false,
      address: false,
    },
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon", type: "image/png", sizes: "32x32" },
      ],
      apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: siteConfig.name,
    },
    other: {
      "color-scheme": "dark",
    },
  };
}

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const direction = await getRequestDirection();

  return (
    <html lang={locale} dir={direction} className="dark">
      <body
        className={`${sans.variable} ${display.variable} ${arabicSans.variable} ${arabicDisplay.variable} bg-background font-sans text-foreground antialiased`}
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
