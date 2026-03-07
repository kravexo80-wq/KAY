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
    limitedEdition: false,
    tags: ["Launch Piece", "Evening Tailoring"],
    materials: ["Italian matte crepe", "Satin piping", "Soft shoulder structure"],
    fabricNotes: [
      "Dense matte crepe keeps the silhouette controlled under directional light.",
      "Satin edging adds a restrained line of reflection along the placket and cuff.",
    ],
    careNotes: [
      "Dry clean only to protect the finish and preserve the structure.",
      "Steam from the interior to restore drape after storage or travel.",
    ],
    fitNotes: [
      "Relaxed through the body with a clean shoulder line.",
      "Take your regular size for the intended ceremonial proportion.",
    ],
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
    viewer360: {
      enabled: true,
      label: "360 showroom view",
      description:
        "Reserved for a future interactive spin built from controlled studio frames.",
      note: "Still angles are active for now while the layout remains ready for frame-sequence integration.",
    },
    shipping: {
      leadTime: "Dispatches in 2-4 business days.",
      delivery: "Complimentary insured delivery on launch orders.",
      returns: "Returns accepted within 14 days on unworn pieces.",
      presentation: "Delivered in a matte black presentation box with garment wrap.",
    },
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
    limitedEdition: true,
    tags: ["Ceremony Edit", "Layered"],
    materials: ["Structured satin blend", "Metallic edge braid", "Silk-touch lining"],
    fabricNotes: [
      "A structured satin blend gives the outer layer ceremony-level presence without excess stiffness.",
      "Reflective braid finishing is used sparingly so the edge catches light without becoming ornate.",
    ],
    careNotes: [
      "Professional dry clean only due to metallic trim and layered construction.",
      "Store on a broad hanger to keep the shoulder line crisp.",
    ],
    fitNotes: [
      "Designed as an open ceremonial layer with generous movement.",
      "Size according to shoulder preference and intended underlayer.",
    ],
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
    viewer360: {
      enabled: true,
      label: "360 drape study",
      description:
        "Prepared for a future 360 layer view showing trim, volume, and movement in a single module.",
      note: "The current build uses stills but reserves the same footprint for richer drape presentation later.",
    },
    shipping: {
      leadTime: "Dispatches in 3-5 business days.",
      delivery: "Insured global delivery with signature confirmation.",
      returns: "Returns accepted within 14 days on unworn ceremonial pieces.",
      presentation: "Presented in a structured black box with protective garment sleeve.",
    },
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
    limitedEdition: false,
    tags: ["Women's Capsule", "Fluid Cut"],
    materials: ["Japanese nida", "Silk-touch facing", "Fine cuff structure"],
    fabricNotes: [
      "Japanese nida provides fluid movement with a softly polished surface.",
      "Silk-touch facings keep interior finish elevated without adding visual noise.",
    ],
    careNotes: [
      "Dry clean only to maintain the finish and cuff structure.",
      "Store buttoned lightly to preserve the front line.",
    ],
    fitNotes: [
      "Fluid relaxed cut with full modest coverage and quiet volume.",
      "Choose your usual size for intended ease or size down for a closer shoulder line.",
    ],
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
    viewer360: {
      enabled: true,
      label: "360 silhouette view",
      description:
        "Planned for a full silhouette rotation focused on movement, fall, and cuff finishing.",
      note: "The gallery already reserves a dedicated module for future frame-based viewing.",
    },
    shipping: {
      leadTime: "Dispatches in 2-4 business days.",
      delivery: "Complimentary insured shipping for launch-region orders.",
      returns: "Returns accepted within 14 days on unworn pieces with original presentation.",
      presentation: "Wrapped in soft black tissue with matte branded outer packaging.",
    },
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
    limitedEdition: true,
    tags: ["Limited Capsule", "Architectural"],
    materials: ["Compact wool blend", "Matte satin inset", "Reinforced collar"],
    fabricNotes: [
      "Compact wool blend holds the column silhouette and reads sharply in low light.",
      "Matte satin insets add tonal depth without breaking the restrained composition.",
    ],
    careNotes: [
      "Dry clean only for collar structure and panel integrity.",
      "Use a garment brush between wears to preserve the matte finish.",
    ],
    fitNotes: [
      "Structured straight fit designed to read as a clean vertical line.",
      "Take your standard size for the intended architectural shape.",
    ],
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
    viewer360: {
      enabled: true,
      label: "360 structure view",
      description:
        "Designed for a future viewer focused on collar architecture, sleeve line, and panel transitions.",
      note: "This product is already staged for richer 360 storytelling once real imagery is added.",
    },
    shipping: {
      leadTime: "Dispatches in 3-5 business days.",
      delivery: "Global insured delivery with signature confirmation.",
      returns: "Returns accepted within 14 days on unworn pieces.",
      presentation: "Boxed in a signature rigid case with interior garment support.",
    },
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
    limitedEdition: false,
    tags: ["Essential Edit", "Warm Neutral"],
    materials: ["Premium cotton blend", "Soft matte trim", "Breathable lining"],
    fabricNotes: [
      "Premium cotton blend gives daily ease while preserving a refined matte surface.",
      "Soft trim detailing keeps the garment elevated without shifting into formalwear.",
    ],
    careNotes: [
      "Machine wash cold on a gentle cycle or dry clean for best finish retention.",
      "Hang dry and light steam to restore the line.",
    ],
    fitNotes: [
      "Relaxed regular fit designed for daily movement and modest comfort.",
      "Choose your normal size for intended ease through the body.",
    ],
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
    viewer360: {
      enabled: true,
      label: "360 daily edit view",
      description:
        "Prepared for an everyday fit rotation that highlights movement and fabric texture.",
      note: "The placeholder module keeps the media rail future-ready for richer catalog tools.",
    },
    shipping: {
      leadTime: "Dispatches in 2-3 business days.",
      delivery: "Tracked delivery with launch-period complimentary shipping.",
      returns: "Returns accepted within 14 days on unworn pieces.",
      presentation: "Delivered in branded fold packaging with matte presentation sleeve.",
    },
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
    limitedEdition: false,
    tags: ["Occasion Set", "Layered Pairing"],
    materials: ["Silk-touch crepe", "Satin facing", "Featherweight lining"],
    fabricNotes: [
      "Silk-touch crepe allows the set to move as one silhouette with subtle reflection.",
      "Featherweight lining keeps the layered build comfortable for occasion wear.",
    ],
    careNotes: [
      "Dry clean only to preserve the layered pairing and satin facings.",
      "Store the pieces together to maintain the intended set styling.",
    ],
    fitNotes: [
      "Relaxed layered fit with an elongated overlayer and modest coverage.",
      "Take your usual size for balanced drape across both pieces.",
    ],
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
    viewer360: {
      enabled: true,
      label: "360 layered view",
      description:
        "Reserved for a future module that shows how the overlayer and underdress move together.",
      note: "Still photography is active now while preserving the same premium viewer slot.",
    },
    shipping: {
      leadTime: "Dispatches in 2-4 business days.",
      delivery: "Tracked insured delivery with signature confirmation available.",
      returns: "Returns accepted within 14 days on unworn pieces with all components included.",
      presentation: "Presented in matte packaging with layered garment wrap for both pieces.",
    },
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
