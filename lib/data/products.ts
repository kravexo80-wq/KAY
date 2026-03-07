import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    slug: "obsidian-thobe",
    name: "Obsidian Thobe",
    category: "Men / Signature",
    collectionSlug: "atelier-noir",
    price: 420,
    shortDescription: "A sharply tailored black thobe with satin-edged restraint.",
    description:
      "Built with a dense fluid drape and precise line control, the Obsidian Thobe is designed to feel ceremonial without excess.",
    story:
      "The silhouette stays clean under strong light, allowing the cloth, fall, and finishing to do the work.",
    featured: true,
    tags: ["Launch Piece", "Evening Tailoring"],
    materials: ["Italian matte crepe", "Satin piping", "Soft shoulder structure"],
    sizes: ["S", "M", "L", "XL"],
    gallery: [
      {
        id: "obsidian-front",
        label: "Hero frame",
        angle: "Front studio",
        note: "Hard key light",
        tone: "obsidian",
      },
      {
        id: "obsidian-profile",
        label: "Second angle",
        angle: "Profile view",
        note: "Shadow-led contour",
        tone: "obsidian",
      },
      {
        id: "obsidian-detail",
        label: "Detail crop",
        angle: "Finish detail",
        note: "Trim focus",
        tone: "bronze",
      },
    ],
    specs: [
      { label: "Fit", value: "Relaxed tailored" },
      { label: "Length", value: "Full length" },
      { label: "Closure", value: "Hidden placket" },
      { label: "Care", value: "Dry clean only" },
    ],
  },
  {
    slug: "rimal-bisht",
    name: "Rimal Bisht",
    category: "Outerwear / Ceremony",
    collectionSlug: "ceremony-edit",
    price: 560,
    shortDescription: "A structured bisht with polished trim and controlled volume.",
    description:
      "The Rimal Bisht introduces ceremonial presence through a wider drape, soft sheen, and sculpted front edge.",
    story:
      "Designed as a spotlight layer, it frames the silhouette instead of overpowering it.",
    featured: true,
    tags: ["Ceremony Edit", "Layered"],
    materials: ["Structured satin blend", "Metallic edge braid", "Silk-touch lining"],
    sizes: ["M", "L", "XL"],
    gallery: [
      {
        id: "rimal-front",
        label: "Hero frame",
        angle: "Front drape",
        note: "Reflective trim",
        tone: "bronze",
      },
      {
        id: "rimal-side",
        label: "Second angle",
        angle: "Side volume",
        note: "Layer structure",
        tone: "stone",
      },
      {
        id: "rimal-detail",
        label: "Detail crop",
        angle: "Braid finish",
        note: "Hand edge work",
        tone: "bronze",
      },
    ],
    specs: [
      { label: "Fit", value: "Open ceremonial drape" },
      { label: "Length", value: "Longline" },
      { label: "Finish", value: "Metallic edge binding" },
      { label: "Care", value: "Dry clean only" },
    ],
  },
  {
    slug: "safa-abaya",
    name: "Safa Abaya",
    category: "Women / Signature",
    collectionSlug: "ceremony-edit",
    price: 480,
    shortDescription: "A quiet black abaya cut for movement, gloss, and clean proportion.",
    description:
      "The Safa Abaya balances modest volume with an elevated shoulder line and a minimal closure system.",
    story:
      "Each panel is intended to read as a soft reflection surface under low light.",
    featured: true,
    tags: ["Women's Capsule", "Fluid Cut"],
    materials: ["Japanese nida", "Silk-touch facing", "Fine cuff structure"],
    sizes: ["XS", "S", "M", "L"],
    gallery: [
      {
        id: "safa-front",
        label: "Hero frame",
        angle: "Front silhouette",
        note: "Soft spotlight",
        tone: "obsidian",
      },
      {
        id: "safa-back",
        label: "Second angle",
        angle: "Back fall",
        note: "Drape emphasis",
        tone: "stone",
      },
      {
        id: "safa-detail",
        label: "Detail crop",
        angle: "Cuff finish",
        note: "Subtle sheen",
        tone: "pearl",
      },
    ],
    specs: [
      { label: "Fit", value: "Fluid relaxed" },
      { label: "Length", value: "Full length" },
      { label: "Closure", value: "Hidden hook closure" },
      { label: "Care", value: "Dry clean only" },
    ],
  },
  {
    slug: "atlas-jubbah",
    name: "Atlas Jubbah",
    category: "Men / Limited",
    collectionSlug: "atelier-noir",
    price: 510,
    shortDescription: "An architectural jubbah with sharp verticals and low-sheen depth.",
    description:
      "The Atlas Jubbah is cut to create a column effect, with measured structure through the chest and sleeves.",
    story:
      "It is built for premium product photography: shape-first, minimal, and sharply outlined.",
    featured: true,
    tags: ["Limited Capsule", "Architectural"],
    materials: ["Compact wool blend", "Matte satin inset", "Reinforced collar"],
    sizes: ["S", "M", "L", "XL"],
    gallery: [
      {
        id: "atlas-front",
        label: "Hero frame",
        angle: "Front architecture",
        note: "Structured light",
        tone: "obsidian",
      },
      {
        id: "atlas-side",
        label: "Second angle",
        angle: "Sleeve profile",
        note: "Vertical cut",
        tone: "stone",
      },
      {
        id: "atlas-detail",
        label: "Detail crop",
        angle: "Collar finish",
        note: "Panel contrast",
        tone: "bronze",
      },
    ],
    specs: [
      { label: "Fit", value: "Structured straight fit" },
      { label: "Length", value: "Ankle length" },
      { label: "Collar", value: "Stand collar" },
      { label: "Care", value: "Dry clean only" },
    ],
  },
  {
    slug: "dune-kandura",
    name: "Dune Kandura",
    category: "Men / Essential",
    collectionSlug: "signature-essentials",
    price: 360,
    shortDescription: "A warm stone kandura built for daily luxury and clean movement.",
    description:
      "The Dune Kandura softens the showroom palette while maintaining the same premium surface treatment.",
    story:
      "Its lighter tone broadens the catalog without sacrificing the controlled, cinematic brand language.",
    featured: false,
    tags: ["Essential Edit", "Warm Neutral"],
    materials: ["Premium cotton blend", "Soft matte trim", "Breathable lining"],
    sizes: ["S", "M", "L", "XL"],
    gallery: [
      {
        id: "dune-front",
        label: "Hero frame",
        angle: "Front balance",
        note: "Warm key light",
        tone: "stone",
      },
      {
        id: "dune-side",
        label: "Second angle",
        angle: "Side movement",
        note: "Relaxed drape",
        tone: "pearl",
      },
      {
        id: "dune-detail",
        label: "Detail crop",
        angle: "Fabric grain",
        note: "Texture focus",
        tone: "stone",
      },
    ],
    specs: [
      { label: "Fit", value: "Relaxed regular fit" },
      { label: "Length", value: "Full length" },
      { label: "Weight", value: "Midweight" },
      { label: "Care", value: "Machine wash cold" },
    ],
  },
  {
    slug: "qamar-set",
    name: "Qamar Set",
    category: "Women / Occasion",
    collectionSlug: "signature-essentials",
    price: 460,
    shortDescription: "A coordinated modest set with luminous contrast and quiet tailoring.",
    description:
      "The Qamar Set combines an elongated overlayer and matching underdress for elegant, modular dressing.",
    story:
      "It is intended to photograph as a single reflective silhouette while remaining practical for repeat wear.",
    featured: false,
    tags: ["Occasion Set", "Layered Pairing"],
    materials: ["Silk-touch crepe", "Satin facing", "Featherweight lining"],
    sizes: ["XS", "S", "M", "L"],
    gallery: [
      {
        id: "qamar-front",
        label: "Hero frame",
        angle: "Full set",
        note: "Front composition",
        tone: "pearl",
      },
      {
        id: "qamar-profile",
        label: "Second angle",
        angle: "Layer profile",
        note: "Tone-on-tone finish",
        tone: "stone",
      },
      {
        id: "qamar-detail",
        label: "Detail crop",
        angle: "Trim close-up",
        note: "Low-sheen edge",
        tone: "bronze",
      },
    ],
    specs: [
      { label: "Fit", value: "Relaxed layered fit" },
      { label: "Pieces", value: "Two-piece set" },
      { label: "Coverage", value: "Full modest drape" },
      { label: "Care", value: "Dry clean only" },
    ],
  },
];

export const featuredProducts = products.filter((product) => product.featured);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCollection(collectionSlug: string) {
  return products.filter((product) => product.collectionSlug === collectionSlug);
}

export function getRelatedProducts(product: Product) {
  return products
    .filter(
      (candidate) =>
        candidate.slug !== product.slug &&
        candidate.collectionSlug === product.collectionSlug,
    )
    .slice(0, 3);
}
