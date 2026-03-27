import type { MetadataRoute } from "next";

import { getSiteUrl, siteConfig } from "@/lib/config/site";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = getSiteUrl();

  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/en",
    scope: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: `${siteUrl}/brand/favicon-32x32.png`,
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: `${siteUrl}/brand/apple-touch-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
