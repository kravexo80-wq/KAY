export type ProductTone = "obsidian" | "stone" | "bronze" | "pearl";

export interface ProductMedia {
  id: string;
  label: string;
  angle: string;
  note: string;
  tone: ProductTone;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  collectionSlug: string;
  price: number;
  shortDescription: string;
  description: string;
  story: string;
  featured: boolean;
  tags: string[];
  materials: string[];
  sizes: string[];
  gallery: ProductMedia[];
  specs: ProductSpec[];
}
