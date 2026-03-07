import type { Collection } from "@/types/collection";

export const collections: Collection[] = [
  {
    slug: "atelier-noir",
    name: "Atelier Noir",
    eyebrow: "Signature capsule",
    description:
      "The darkest expression of Kravexo: architectural silhouettes, satin restraint, and hard-lit elegance.",
    highlight: "Built for evening entrances and low-light product storytelling.",
    productSlugs: ["obsidian-thobe", "atlas-jubbah"],
    tone: "obsidian",
  },
  {
    slug: "ceremony-edit",
    name: "Ceremony Edit",
    eyebrow: "Occasion wardrobe",
    description:
      "Statement modest wear intended for Eid, formal evenings, and refined layered dressing.",
    highlight: "Richer trim, stronger reflection, and ceremonial proportion.",
    productSlugs: ["rimal-bisht", "safa-abaya"],
    tone: "bronze",
  },
  {
    slug: "signature-essentials",
    name: "Signature Essentials",
    eyebrow: "Daily luxury",
    description:
      "Year-round pieces with softer tonality and the same premium presentation language.",
    highlight: "Designed to scale into a broad catalog without losing the showroom feel.",
    productSlugs: ["dune-kandura", "qamar-set"],
    tone: "stone",
  },
];

export const featuredCollections = collections;

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}
