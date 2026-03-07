import type { ProductTone } from "@/types/product";

export interface Collection {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  highlight: string;
  productSlugs: string[];
  tone: ProductTone;
}
