export const siteConfig = {
  name: "Kravexo",
  url: "https://kravexo.co.uk",
  description:
    "Luxury modest wear presented like a cinematic showroom: dark, precise, and product-led.",
  tagline: "Modest silhouettes, lit like centerpieces.",
  supportEmail: "support@kravexo.co.uk",
  supportPhone: "+447471985196",
  location: "Manchester, United Kingdom",
} as const;

export function getSiteUrl() {
  const value =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.APP_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    siteConfig.url;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value.replace(/\/$/, "");
  }

  return `https://${value.replace(/\/$/, "")}`;
}
