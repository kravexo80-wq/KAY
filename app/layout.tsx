import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  IBM_Plex_Sans_Arabic,
  Manrope,
  Noto_Kufi_Arabic,
} from "next/font/google";

import { SiteShell } from "@/components/layout/site-shell";
import { siteConfig } from "@/lib/config/site";
import { getRequestDirection, getRequestLocale } from "@/lib/i18n/request";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Kravexo | Luxury Modest Wear",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Kravexo",
    "luxury fashion",
    "modest wear",
    "abaya",
    "thobe",
    "Islamic clothing",
  ],
  openGraph: {
    title: "Kravexo | Luxury Modest Wear",
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Kravexo | Luxury Modest Wear",
    description: siteConfig.description,
  },
};

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
