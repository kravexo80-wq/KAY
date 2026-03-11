export type ProductTone = "obsidian" | "stone" | "bronze" | "pearl";

export interface ProductMedia {
  id: string;
  label: string;
  angle: string;
  note: string;
  tone: ProductTone;
  imageUrl?: string | null;
  storagePath?: string | null;
  altText?: string | null;
  objectPosition?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductViewer360 {
  enabled: boolean;
  label: string;
  description: string;
  note: string;
  frames?: ProductMedia[];
}

export interface ProductShippingInfo {
  leadTime: string;
  delivery: string;
  returns: string;
  presentation: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  collectionSlug: string;
  price: number;
  compareAtPrice?: number | null;
  shortDescription: string;
  description: string;
  story: string;
  featured: boolean;
  limitedEdition: boolean;
  tags: string[];
  materials: string[];
  fabricNotes: string[];
  careNotes: string[];
  fitNotes: string[];
  sizes: string[];
  gallery: ProductMedia[];
  viewer360: ProductViewer360;
  shipping: ProductShippingInfo;
  specs: ProductSpec[];
}
