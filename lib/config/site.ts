export const siteConfig = {
  name: "Kravexo",
  url: "https://kravexo.com",
  description:
    "Luxury modest wear presented like a cinematic showroom: dark, precise, and product-led.",
  tagline: "Modest silhouettes, lit like centerpieces.",
  supportEmail: "concierge@kravexo.com",
  supportPhone: "+44 (0)20 5555 0147",
  location: "London, United Kingdom",
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
