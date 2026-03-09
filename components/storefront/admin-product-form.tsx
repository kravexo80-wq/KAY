import type { ReactNode } from "react";

import type {
  AdminCatalogOptions,
  AdminProductEditorData,
  AdminProductImageFormValue,
  AdminProductVariantFormValue,
} from "@/lib/supabase/admin-products";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import { cn } from "@/lib/utils";

import { AdminProductStateBadge } from "./admin-product-state-badge";
import {
  AdminEditorMetaRow,
  AdminEditorToggleTile,
} from "./admin-editor-primitives";

interface AdminProductFormProps {
  locale: Locale;
  mode: "create" | "edit";
  options: AdminCatalogOptions;
  product?: AdminProductEditorData | null;
  action: (formData: FormData) => void | Promise<void>;
  notice?: {
    tone: "success" | "error";
    message: string;
  } | null;
}

const selectClassName =
  "h-12 w-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-[#b79d67]/35";

function Field({
  isRtl = false,
  label,
  hint,
  children,
}: {
  isRtl?: boolean;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block space-y-3 ${isRtl ? "text-right" : "text-left"}`}>
      <div className="space-y-2">
        <span
          className={
            isRtl
              ? "text-sm font-medium tracking-[0.06em] text-white/58"
              : "text-[0.68rem] uppercase tracking-[0.24em] text-white/36"
          }
        >
          {label}
        </span>
        {hint ? <p className="text-sm leading-6 text-white/44">{hint}</p> : null}
      </div>
      {children}
    </label>
  );
}

function SectionHeading({
  title,
  description,
  isRtl = false,
}: {
  title: string;
  description?: string;
  isRtl?: boolean;
}) {
  return (
    <div className={`space-y-3 ${isRtl ? "text-right" : "text-left"}`}>
      <h2
        className={
          isRtl
            ? "text-[1.8rem] leading-tight text-white md:text-[2.35rem]"
            : "text-[1.55rem] leading-none text-white md:text-[2rem]"
        }
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-white/48">{description}</p>
      ) : null}
    </div>
  );
}

function CompactField({
  label,
  children,
  isRtl = false,
}: {
  label: string;
  children: ReactNode;
  isRtl?: boolean;
}) {
  return (
    <label className={cn("block space-y-2", isRtl ? "text-right" : "text-left")}>
      <span className="text-[0.66rem] uppercase tracking-[0.22em] text-white/34">
        {label}
      </span>
      {children}
    </label>
  );
}

function InlineToggle({
  name,
  label,
  defaultChecked,
  isRtl = false,
  accent = false,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
  isRtl?: boolean;
  accent?: boolean;
}) {
  return (
    <label
      className={cn(
        "rounded-[1.2rem] border px-4 py-3",
        accent
          ? "border-[#b79d67]/20 bg-[#b79d67]/8"
          : "border-white/8 bg-white/[0.03]",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3",
          isRtl && "flex-row-reverse text-right",
        )}
      >
        <span className="text-sm uppercase tracking-[0.2em] text-white/72">{label}</span>
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="h-4 w-4 shrink-0 rounded border-white/12 bg-transparent accent-[#b79d67]"
        />
      </div>
    </label>
  );
}

function DetailBlock({
  title,
  helper,
  englishLabel,
  arabicLabel,
  englishName,
  arabicName,
  englishValue,
  arabicValue,
  englishPlaceholder,
  arabicPlaceholder,
  isRtl,
}: {
  title: string;
  helper: string;
  englishLabel: string;
  arabicLabel: string;
  englishName: string;
  arabicName: string;
  englishValue: string;
  arabicValue: string;
  englishPlaceholder: string;
  arabicPlaceholder: string;
  isRtl: boolean;
}) {
  return (
    <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-5">
      <div className={cn("space-y-2", isRtl ? "text-right" : "text-left")}>
        <h3 className="text-lg text-white">{title}</h3>
        <p className="text-sm text-white/42">{helper}</p>
      </div>
      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/46">
            {englishLabel}
          </span>
          <Textarea
            name={englishName}
            defaultValue={englishValue}
            className="min-h-28"
            placeholder={englishPlaceholder}
            dir="ltr"
          />
        </div>
        <div className="space-y-4">
          <span
            className={cn(
              "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/46",
              "ml-auto",
              isRtl && "mr-auto ml-0",
            )}
          >
            {arabicLabel}
          </span>
          <Textarea
            name={arabicName}
            defaultValue={arabicValue}
            className="min-h-28"
            placeholder={arabicPlaceholder}
            dir="rtl"
          />
        </div>
      </div>
    </div>
  );
}

function toLines(values: string[]) {
  return values.join("\n");
}

function createBlankVariant(position: number): AdminProductVariantFormValue {
  return {
    id: null,
    sku: "",
    size: "",
    color: null,
    priceOverride: null,
    stockQuantity: 0,
    isActive: true,
    position,
  };
}

function createBlankImage(sortOrder: number): AdminProductImageFormValue {
  return {
    id: null,
    imageUrl: "",
    storagePath: null,
    altText: "",
    altTextAr: "",
    label: "",
    labelAr: "",
    angle: "",
    angleAr: "",
    note: "",
    noteAr: "",
    tone: "obsidian",
    sortOrder,
    isPrimary: false,
  };
}

const editorPlaceholders = {
  en: {
    productName: "Signature Abaya",
    slug: "signature-abaya",
    shortDescription: "Tailored modestwear with a cinematic showroom finish.",
    description: "Write the main storefront product description.",
    story: "Optional narrative or craftsmanship note.",
    optional: "Optional",
    materials: "Premium crepe\nSilk lining",
    fabricNotes: "Soft structured drape\nLow-sheen finish",
    careNotes: "Dry clean recommended\nSteam lightly before wear",
    fitNotes: "Relaxed silhouette\nDesigned for layered modest styling",
    variantSize: "S / M / L",
    sku: "KRV-ABY-BLK-M",
    imageUrl: "https://... or leave blank when uploading",
    imageLabel: "Front angle",
    imageAngle: "Three-quarter",
    altText: "Descriptive alternative text",
    imageNote: "Optional showroom note for this angle.",
    variantPrefix: "Variant",
    imagePrefix: "Image",
  },
  ar: {
    productName: "Ø¹Ø¨Ø§ÙŠØ© Ø§Ù„ØªÙˆÙ‚ÙŠØ¹",
    slug: "signature-abaya",
    shortDescription: "Ù‚Ø·Ø¹Ø© Ù…Ø­ØªØ´Ù…Ø© Ù…ØµÙ‚ÙˆÙ„Ø© Ø¨Ø­Ø¶ÙˆØ± Ø¨ØµØ±ÙŠ ÙØ®Ù… Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…Ø¹Ø±Ø¶ Ø§Ù„Ø¯Ø§ÙƒÙ†.",
    description: "Ø§ÙƒØªØ¨ Ø§Ù„ÙˆØµÙ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ Ø§Ù„Ø°ÙŠ Ø³ÙŠØ¸Ù‡Ø± ÙÙŠ ÙˆØ§Ø¬Ù‡Ø© Ø§Ù„Ù…Ù†ØªØ¬.",
    story: "Ø³Ø±Ø¯ Ø§Ø®ØªÙŠØ§Ø±ÙŠ Ø¹Ù† Ø§Ù„Ø­Ø±ÙØ© Ø£Ùˆ Ù‚ØµØ© Ø§Ù„Ù‚Ø·Ø¹Ø©.",
    optional: "Ø§Ø®ØªÙŠØ§Ø±ÙŠ",
    materials: "ÙƒØ±ÙŠØ¨ ÙØ§Ø®Ø±\nØ¨Ø·Ø§Ù†Ø© Ø­Ø±ÙŠØ±ÙŠØ©",
    fabricNotes: "Ø§Ù†Ø³Ø¯Ø§Ù„ Ù…Ù†Ø¸Ù… ÙˆÙ†Ø§Ø¹Ù…\nÙ„Ù…Ø¹Ø© Ù‡Ø§Ø¯Ø¦Ø© Ù…Ù†Ø®ÙØ¶Ø©",
    careNotes: "ÙŠÙØ¶Ù„ Ø§Ù„ØªÙ†Ø¸ÙŠÙ Ø§Ù„Ø¬Ø§Ù\nØªØ¨Ø®ÙŠØ± Ø®ÙÙŠÙ Ù‚Ø¨Ù„ Ø§Ù„Ø§Ø±ØªØ¯Ø§Ø¡",
    fitNotes: "Ù‚ØµØ© Ù…Ø±ÙŠØ­Ø©\nÙ…ØµÙ…Ù…Ø© Ù„Ù„ØªÙ†Ø³ÙŠÙ‚ Ø§Ù„Ù…Ø­ØªØ´Ù… Ù…ØªØ¹Ø¯Ø¯ Ø§Ù„Ø·Ø¨Ù‚Ø§Øª",
    variantSize: "Øµ / Ù… / Ùƒ",
    sku: "KRV-ABY-BLK-M",
    imageUrl: "https://... Ø£Ùˆ Ø§ØªØ±ÙƒÙ‡ ÙØ§Ø±ØºØ§Ù‹ Ø¹Ù†Ø¯ Ø§Ù„Ø±ÙØ¹",
    imageLabel: "Ø§Ù„Ø²Ø§ÙˆÙŠØ© Ø§Ù„Ø£Ù…Ø§Ù…ÙŠØ©",
    imageAngle: "Ø«Ù„Ø§Ø«Ø© Ø£Ø±Ø¨Ø§Ø¹",
    altText: "Ù†Øµ Ø¨Ø¯ÙŠÙ„ ÙˆØµÙÙŠ Ù„Ù„ØµÙˆØ±Ø©",
    imageNote: "Ù…Ù„Ø§Ø­Ø¸Ø© Ø§Ø®ØªÙŠØ§Ø±ÙŠØ© Ù„Ø¹Ø±Ø¶ Ù‡Ø°Ù‡ Ø§Ù„Ø²Ø§ÙˆÙŠØ© Ø¯Ø§Ø®Ù„ Ø§Ù„Ù…Ø¹Ø±Ø¶.",
    variantPrefix: "Ø§Ù„Ù…ØªØºÙŠØ±",
    imagePrefix: "Ø§Ù„ØµÙˆØ±Ø©",
  },
} as const;

const toneLabels = {
  en: {
    obsidian: "Obsidian",
    stone: "Stone",
    bronze: "Bronze",
    pearl: "Pearl",
  },
  ar: {
    obsidian: "Ø£Ø³ÙˆØ¯ Ù„Ø§Ù…Ø¹",
    stone: "Ø­Ø¬Ø±ÙŠ",
    bronze: "Ø¨Ø±ÙˆÙ†Ø²ÙŠ",
    pearl: "Ù„Ø¤Ù„Ø¤ÙŠ",
  },
} as const;

const workspaceCopy = {
  en: {
    title: "Product workspace",
    newProduct: "New product",
    draft: "Draft",
    slugPending: "Slug will be generated from the product name.",
    content: "Content",
    contentHint: "Storefront copy in two clean columns.",
    blankRows: "Blank rows are ignored on save.",
    variantsHint: "Sizes, colors, stock, and price overrides in one compact editor.",
    imagesHint: "Visual-first media cards with upload and URL support.",
    notesHint: "Lower-priority notes stay together here.",
    recordHint: "Internal timestamps only.",
    activeHint: "Visible on the live storefront.",
    featuredHint: "Eligible for homepage placement.",
    limitedHint: "Adds limited-edition merchandising.",
    categoryMissing: "Add a category before saving.",
    english: "English",
    arabic: "Arabic",
    imagePreview: "Preview",
    imagePlaceholder: "No image source yet",
    uploadOrUrl: "Use either a file or a URL. Uploaded files take priority.",
  },
  ar: {
    title: "Ù…Ø³Ø§Ø­Ø© ØªØ­Ø±ÙŠØ± Ø§Ù„Ù…Ù†ØªØ¬",
    newProduct: "Ù…Ù†ØªØ¬ Ø¬Ø¯ÙŠØ¯",
    draft: "Ù…Ø³ÙˆØ¯Ø©",
    slugPending: "Ø³ÙŠØªÙ… ØªÙˆÙ„ÙŠØ¯ Ø§Ù„Ù…Ø¹Ø±Ù‘Ù Ù…Ù† Ø§Ø³Ù… Ø§Ù„Ù…Ù†ØªØ¬.",
    content: "Ø§Ù„Ù…Ø­ØªÙˆÙ‰",
    contentHint: "Ù†Ø³Ø®Ø© Ø§Ù„ÙˆØ§Ø¬Ù‡Ø© ÙÙŠ Ø¹Ù…ÙˆØ¯ÙŠÙ† ÙˆØ§Ø¶Ø­ÙŠÙ†.",
    blankRows: "ÙŠØªÙ… ØªØ¬Ø§Ù‡Ù„ Ø§Ù„ØµÙÙˆÙ Ø§Ù„ÙØ§Ø±ØºØ© Ø¹Ù†Ø¯ Ø§Ù„Ø­ÙØ¸.",
    variantsHint: "Ø§Ù„Ù…Ù‚Ø§Ø³Ø§Øª ÙˆØ§Ù„Ø£Ù„ÙˆØ§Ù† ÙˆØ§Ù„Ù…Ø®Ø²ÙˆÙ† ÙˆØªØ¬Ø§ÙˆØ²Ø§Øª Ø§Ù„Ø³Ø¹Ø± ÙÙŠ Ù…Ø­Ø±Ø± Ù…Ø¯Ù…Ø¬.",
    imagesHint: "Ø¨Ø·Ø§Ù‚Ø§Øª Ù…Ø±Ø¦ÙŠØ© Ø£ÙˆÙ„Ø§Ù‹ Ù…Ø¹ Ø¯Ø¹Ù… Ø§Ù„Ø±ÙØ¹ ÙˆØ§Ù„Ø±Ø§Ø¨Ø· Ø§Ù„ÙŠØ¯ÙˆÙŠ.",
    notesHint: "Ø§Ù„Ù…Ù„Ø§Ø­Ø¸Ø§Øª Ø§Ù„Ø£Ù‚Ù„ Ø£ÙˆÙ„ÙˆÙŠØ© ØªØ¨Ù‚Ù‰ Ù‡Ù†Ø§ Ù…Ø¹Ø§Ù‹.",
    recordHint: "Ø·ÙˆØ§Ø¨Ø¹ Ø²Ù…Ù†ÙŠØ© Ø¯Ø§Ø®Ù„ÙŠØ© ÙÙ‚Ø·.",
    activeHint: "ÙŠØ¸Ù‡Ø± ÙÙŠ Ø§Ù„Ù…ØªØ¬Ø± Ø§Ù„Ø¹Ø§Ù….",
    featuredHint: "Ù…Ø¤Ù‡Ù„ Ù„Ù„Ø¸Ù‡ÙˆØ± ÙÙŠ Ø§Ù„ØµÙØ­Ø© Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©.",
    limitedHint: "ÙŠØ¶ÙŠÙ Ø­Ø§Ù„Ø© Ø¥ØµØ¯Ø§Ø± Ù…Ø­Ø¯ÙˆØ¯.",
    categoryMissing: "Ø£Ø¶Ù ÙØ¦Ø© Ù‚Ø¨Ù„ Ø§Ù„Ø­ÙØ¸.",
    english: "Ø§Ù„Ø¥Ù†Ø¬Ù„ÙŠØ²ÙŠØ©",
    arabic: "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©",
    imagePreview: "Ø§Ù„Ù…Ø¹Ø§ÙŠÙ†Ø©",
    imagePlaceholder: "Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…ØµØ¯Ø± ØµÙˆØ±Ø© Ø¨Ø¹Ø¯",
    uploadOrUrl: "Ø§Ø³ØªØ®Ø¯Ù… Ù…Ù„ÙØ§Ù‹ Ø£Ùˆ Ø±Ø§Ø¨Ø·Ø§Ù‹. Ø§Ù„Ù…Ù„Ù Ø§Ù„Ù…Ø±ÙÙˆØ¹ ÙŠØ£Ø®Ø° Ø§Ù„Ø£ÙˆÙ„ÙˆÙŠØ©.",
  },
} as const;

export function AdminProductForm({
  locale,
  mode,
  options,
  product,
  action,
  notice,
}: AdminProductFormProps) {
  const copy = getExtendedUiCopy(locale).adminProducts.form;
  const cardCopy = getExtendedUiCopy(locale).adminProducts.card;
  const isRtl = locale === "ar";
  const text = editorPlaceholders[locale];
  const englishText = editorPlaceholders.en;
  const arabicText = editorPlaceholders.ar;
  const ui = workspaceCopy[locale];
  const localizedToneLabels = toneLabels[locale];
  const categoryOptions = options.categories;
  const collectionOptions = options.collections;
  const isCreateMode = mode === "create";
  const variantRows = [
    ...(product?.variants ?? []),
    ...Array.from(
      { length: isCreateMode ? 4 : 3 },
      (_, index) => createBlankVariant((product?.variants.length ?? 0) + index),
    ),
  ];
  const imageRows = [
    ...(product?.images ?? []),
    ...Array.from(
      { length: isCreateMode ? 4 : 3 },
      (_, index) => createBlankImage((product?.images.length ?? 0) + index),
    ),
  ];
  const hasCategoryOptions = categoryOptions.length > 0;
  const showTimestamps = Boolean(product);
  const title = product?.displayName || product?.name || ui.newProduct;

  return (
    <div className="space-y-6">
      {notice ? (
        <section className="section-frame">
          <div className={notice.tone === "error" ? "luxury-muted-panel p-5" : "showroom-panel p-5"}>
            <div className={cn("space-y-3", isRtl ? "text-right" : "text-left")}>
              <p className="eyebrow">{notice.tone === "error" ? copy.saveError : copy.saved}</p>
              <p className="text-sm leading-7 text-white/58">{notice.message}</p>
            </div>
          </div>
        </section>
      ) : null}

      <form
        action={action}
        encType="multipart/form-data"
        className="section-frame space-y-6"
      >
        {product ? <input type="hidden" name="product_id" value={product.id} /> : null}
        <input type="hidden" name="variant_count" value={variantRows.length} />
        <input type="hidden" name="image_count" value={imageRows.length} />

        <div className="sticky top-24 z-20 rounded-[1.8rem] border border-white/10 bg-[#09090a]/86 px-5 py-4 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className={cn("space-y-3", isRtl ? "text-right" : "text-left")}>
              <p className="eyebrow">{ui.title}</p>
              <div className={cn("flex flex-wrap items-center gap-3", isRtl && "justify-end")}>
                <h1 className={cn("text-[2rem] leading-none text-white md:text-[2.6rem]", isRtl && "leading-tight")}>
                  {title}
                </h1>
                <AdminProductStateBadge
                  label={product?.isActive ? cardCopy.active : ui.draft}
                  active={product?.isActive ?? false}
                  tone="success"
                />
                <AdminProductStateBadge
                  label={product?.isFeatured ? cardCopy.featured : cardCopy.standard}
                  active={product?.isFeatured ?? false}
                  tone="accent"
                />
                {product?.limitedEdition ? (
                  <AdminProductStateBadge label={cardCopy.limited} active tone="accent" />
                ) : null}
              </div>
              <p className="text-sm text-white/46">
                {product?.slug ? `/products/${product.slug}` : ui.slugPending}
              </p>
            </div>

            <div className={cn("flex flex-wrap items-center gap-3", isRtl && "justify-start")}>
              {!hasCategoryOptions ? (
                <div className="rounded-full border border-[#b79d67]/20 bg-[#b79d67]/10 px-4 py-2 text-sm text-[#f0e2bd]">
                  {ui.categoryMissing}
                </div>
              ) : null}
              <Button type="submit" size="lg" className="min-w-[220px]" disabled={!hasCategoryOptions}>
                {isCreateMode ? copy.createProduct : copy.saveProduct}
              </Button>
            </div>
          </div>
        </div>

        <section className="luxury-panel p-6 md:p-8">
          <SectionHeading title={copy.basicInfo} isRtl={isRtl} />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Field label={`${copy.productName} (${ui.english})`} isRtl={isRtl}>
              <Input
                name="name"
                defaultValue={product?.name ?? ""}
                placeholder={englishText.productName}
                dir="ltr"
              />
            </Field>
            <Field label={`${copy.productName} (${ui.arabic})`} isRtl={isRtl}>
              <Input
                name="name_ar"
                defaultValue={product?.nameAr ?? ""}
                placeholder={arabicText.productName}
                dir="rtl"
              />
            </Field>
            <Field label={copy.slug} hint={copy.slugHint} isRtl={isRtl}>
              <Input
                name="slug"
                defaultValue={product?.slug ?? ""}
                placeholder={text.slug}
              />
            </Field>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <AdminEditorToggleTile
              name="is_active"
              label={copy.productActive}
              hint={ui.activeHint}
              defaultChecked={product?.isActive ?? true}
              isRtl={isRtl}
            />
            <AdminEditorToggleTile
              name="is_featured"
              label={copy.featuredProduct}
              hint={ui.featuredHint}
              defaultChecked={product?.isFeatured ?? false}
              isRtl={isRtl}
            />
            <AdminEditorToggleTile
              name="limited_edition"
              label={copy.limitedEdition}
              hint={ui.limitedHint}
              defaultChecked={product?.limitedEdition ?? false}
              isRtl={isRtl}
            />
          </div>
        </section>

        <section className="showroom-panel p-6 md:p-8">
          <SectionHeading title={copy.merchandising} isRtl={isRtl} />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Field label={copy.basePrice} isRtl={isRtl}>
              <Input
                type="number"
                step="0.01"
                min="0"
                name="price"
                defaultValue={product?.price ?? 0}
              />
            </Field>
            <Field label={copy.compareAtPrice} isRtl={isRtl}>
              <Input
                type="number"
                step="0.01"
                min="0"
                name="compare_at_price"
                defaultValue={product?.compareAtPrice ?? ""}
                placeholder={text.optional}
              />
            </Field>
            <Field label={copy.category} isRtl={isRtl}>
              <select
                name="category_id"
                defaultValue={product?.categoryId ?? categoryOptions[0]?.id ?? ""}
                className={selectClassName}
              >
                <option value="" className="bg-[#090909] text-white">
                  {copy.selectCategory}
                </option>
                {categoryOptions.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    className="bg-[#090909] text-white"
                  >
                    {category.name}
                    {category.isActive ? "" : copy.inactiveSuffix}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={copy.collection} isRtl={isRtl}>
              <select
                name="collection_id"
                defaultValue={product?.collectionId ?? ""}
                className={selectClassName}
              >
                <option value="" className="bg-[#090909] text-white">
                  {copy.noCollection}
                </option>
                {collectionOptions.map((collection) => (
                  <option
                    key={collection.id}
                    value={collection.id}
                    className="bg-[#090909] text-white"
                  >
                    {collection.name}
                    {collection.isActive ? "" : copy.inactiveSuffix}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </section>

        <section className="showroom-panel p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionHeading title={ui.content} description={ui.contentHint} isRtl={isRtl} />
            <div className="flex gap-2">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/46">
                {ui.english}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/46">
                {ui.arabic}
              </span>
            </div>
          </div>
          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            <div className="rounded-[1.7rem] border border-white/8 bg-white/[0.03] p-5">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/46">
                {ui.english}
              </span>
              <div className="mt-5 space-y-4">
                <Field label={copy.shortDescription}>
                  <Textarea
                    name="short_description"
                    defaultValue={product?.shortDescription ?? ""}
                    className="min-h-28"
                    placeholder={englishText.shortDescription}
                    dir="ltr"
                  />
                </Field>
                <Field label={copy.fullDescription}>
                  <Textarea
                    name="description"
                    defaultValue={product?.description ?? ""}
                    placeholder={englishText.description}
                    dir="ltr"
                  />
                </Field>
                <Field label={copy.brandStory}>
                  <Textarea
                    name="story"
                    defaultValue={product?.story ?? ""}
                    placeholder={englishText.story}
                    dir="ltr"
                  />
                </Field>
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-white/8 bg-white/[0.03] p-5">
              <span
                className={cn(
                  "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/46",
                  "ml-auto",
                  isRtl && "mr-auto ml-0",
                )}
              >
                {ui.arabic}
              </span>
              <div className="mt-5 space-y-4">
                <Field label={copy.shortDescription} isRtl>
                  <Textarea
                    name="short_description_ar"
                    defaultValue={product?.shortDescriptionAr ?? ""}
                    className="min-h-28"
                    placeholder={arabicText.shortDescription}
                    dir="rtl"
                  />
                </Field>
                <Field label={copy.fullDescription} isRtl>
                  <Textarea
                    name="description_ar"
                    defaultValue={product?.descriptionAr ?? ""}
                    placeholder={arabicText.description}
                    dir="rtl"
                  />
                </Field>
                <Field label={copy.brandStory} isRtl>
                  <Textarea
                    name="story_ar"
                    defaultValue={product?.storyAr ?? ""}
                    placeholder={arabicText.story}
                    dir="rtl"
                  />
                </Field>
              </div>
            </div>
          </div>
        </section>

          <section className="showroom-panel p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <SectionHeading title={copy.variants} description={ui.variantsHint} isRtl={isRtl} />
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/34">
                {ui.blankRows}
              </p>
            </div>

            <div className="mt-6 hidden xl:grid xl:grid-cols-[0.8fr_0.95fr_1.35fr_0.8fr_0.95fr_0.85fr] xl:gap-3 xl:px-4">
              {[copy.variantSize, copy.color, copy.sku, copy.stockQuantity, copy.priceOverride, copy.variantActive].map((label) => (
                <div
                  key={label}
                  className={cn("text-[0.62rem] uppercase tracking-[0.24em] text-white/28", isRtl && "text-right")}
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              {variantRows.map((variant, index) => (
                <div
                  key={variant.id ?? `new-variant-${index}`}
                  className="rounded-[1.55rem] border border-white/8 bg-white/[0.03] p-4"
                >
                  <input
                    type="hidden"
                    name={`variant_${index}_id`}
                    value={variant.id ?? ""}
                  />
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/46">
                      {text.variantPrefix} {index + 1}
                    </span>
                    {variant.id ? (
                      <AdminProductStateBadge
                        label={variant.isActive ? cardCopy.active : cardCopy.inactive}
                        active={variant.isActive}
                        tone="success"
                      />
                    ) : null}
                  </div>

                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[0.8fr_0.95fr_1.35fr_0.8fr_0.95fr_0.85fr]">
                    <CompactField label={copy.variantSize} isRtl={isRtl}>
                      <Input
                        name={`variant_${index}_size`}
                        defaultValue={variant.size}
                        placeholder={text.variantSize}
                      />
                    </CompactField>
                    <CompactField label={copy.color} isRtl={isRtl}>
                      <Input
                        name={`variant_${index}_color`}
                        defaultValue={variant.color ?? ""}
                        placeholder={text.optional}
                      />
                    </CompactField>
                    <CompactField label={copy.sku} isRtl={isRtl}>
                      <Input
                        name={`variant_${index}_sku`}
                        defaultValue={variant.sku}
                        placeholder={text.sku}
                      />
                    </CompactField>
                    <CompactField label={copy.stockQuantity} isRtl={isRtl}>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        name={`variant_${index}_stock_quantity`}
                        defaultValue={variant.stockQuantity}
                      />
                    </CompactField>
                    <CompactField label={copy.priceOverride} isRtl={isRtl}>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        name={`variant_${index}_price_override`}
                        defaultValue={variant.priceOverride ?? ""}
                        placeholder={copy.optional}
                      />
                    </CompactField>
                    <div className="self-end">
                      <InlineToggle
                        name={`variant_${index}_is_active`}
                        label={copy.variantActive}
                        defaultChecked={variant.isActive}
                        isRtl={isRtl}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="luxury-panel p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <SectionHeading title={copy.images} description={ui.imagesHint} isRtl={isRtl} />
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-white/34">
                {ui.blankRows}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {imageRows.map((image, index) => (
                <div
                  key={image.id ?? `new-image-${index}`}
                  className="overflow-hidden rounded-[1.7rem] border border-white/8 bg-white/[0.03]"
                >
                  <input
                    type="hidden"
                    name={`image_${index}_id`}
                    value={image.id ?? ""}
                  />

                  <div className="grid gap-0 xl:grid-cols-[260px_minmax(0,1fr)]">
                    <div className="relative min-h-[260px] border-b border-white/8 xl:border-r xl:border-b-0">
                      {image.imageUrl ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `linear-gradient(180deg, rgba(8,8,9,0.16), rgba(8,8,9,0.78)), url(${image.imageUrl})`,
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(183,157,103,0.18),_transparent_52%),linear-gradient(180deg,_rgba(255,255,255,0.03),_rgba(255,255,255,0.01))]" />
                      )}

                      <div className="relative z-10 flex h-full flex-col justify-between p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="inline-flex items-center rounded-full border border-white/12 bg-black/20 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/66">
                            {text.imagePrefix} {index + 1}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {image.storagePath ? (
                              <AdminProductStateBadge label={copy.storedUpload} active tone="accent" />
                            ) : null}
                            {image.imageUrl ? (
                              <AdminProductStateBadge label={copy.galleryReady} active tone="success" />
                            ) : null}
                            {image.isPrimary ? (
                              <AdminProductStateBadge label={copy.primaryImage} active tone="accent" />
                            ) : null}
                          </div>
                        </div>

                        <div className={cn("space-y-2", isRtl ? "text-right" : "text-left")}>
                          <p className="eyebrow">{ui.imagePreview}</p>
                          <p className="text-sm text-white/62">
                            {image.imageUrl ? image.label || copy.galleryReady : ui.imagePlaceholder}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5 p-5">
                      <div className="grid gap-3 lg:grid-cols-2">
                        <CompactField label={copy.upload} isRtl={isRtl}>
                          <input
                            type="file"
                            name={`image_${index}_file`}
                            accept="image/jpeg,image/png,image/webp,image/avif"
                            className="block w-full rounded-[1.2rem] border border-dashed border-white/12 bg-white/[0.02] px-4 py-3 text-sm text-white/72 file:mr-4 file:rounded-full file:border file:border-white/10 file:bg-white/[0.06] file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.2em] file:text-white/72"
                          />
                        </CompactField>
                        <CompactField label={copy.imageUrl} isRtl={isRtl}>
                          <Input
                            name={`image_${index}_image_url`}
                            defaultValue={image.imageUrl}
                            placeholder={text.imageUrl}
                          />
                        </CompactField>
                        <CompactField label={copy.displayOrder} isRtl={isRtl}>
                          <Input
                            type="number"
                            min="0"
                            step="1"
                            name={`image_${index}_sort_order`}
                            defaultValue={image.sortOrder}
                          />
                        </CompactField>
                        <CompactField label={copy.tone} isRtl={isRtl}>
                          <select
                            name={`image_${index}_tone`}
                            defaultValue={image.tone}
                            className={selectClassName}
                          >
                            {["obsidian", "stone", "bronze", "pearl"].map((tone) => (
                              <option
                                key={tone}
                                value={tone}
                                className="bg-[#090909] text-white"
                              >
                                {localizedToneLabels[tone as keyof typeof localizedToneLabels]}
                              </option>
                            ))}
                          </select>
                        </CompactField>
                      </div>

                      <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-white/44">
                        {ui.uploadOrUrl}
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <InlineToggle
                          name={`image_${index}_is_primary`}
                          label={copy.primaryImage}
                          defaultChecked={image.isPrimary}
                          isRtl={isRtl}
                          accent
                        />
                        {image.id ? (
                          <InlineToggle
                            name={`image_${index}_remove`}
                            label={copy.removeImage}
                            defaultChecked={false}
                            isRtl={isRtl}
                          />
                        ) : (
                          <div className="rounded-[1.2rem] border border-dashed border-white/10 px-4 py-3 text-sm text-white/42">
                            {copy.newImageHint}
                          </div>
                        )}
                      </div>

                      <div className="grid gap-4 xl:grid-cols-2">
                        <div className="rounded-[1.45rem] border border-white/8 bg-white/[0.02] p-4">
                          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/46">
                            {ui.english}
                          </span>
                          <div className="mt-4 space-y-3">
                            <CompactField label={copy.label}>
                              <Input
                                name={`image_${index}_label`}
                                defaultValue={image.label}
                                placeholder={englishText.imageLabel}
                                dir="ltr"
                              />
                            </CompactField>
                            <CompactField label={copy.angle}>
                              <Input
                                name={`image_${index}_angle`}
                                defaultValue={image.angle}
                                placeholder={englishText.imageAngle}
                                dir="ltr"
                              />
                            </CompactField>
                            <CompactField label={copy.altText}>
                              <Input
                                name={`image_${index}_alt_text`}
                                defaultValue={image.altText}
                                placeholder={englishText.altText}
                                dir="ltr"
                              />
                            </CompactField>
                            <CompactField label={copy.imageNote}>
                              <Textarea
                                name={`image_${index}_note`}
                                defaultValue={image.note}
                                className="min-h-24"
                                placeholder={englishText.imageNote}
                                dir="ltr"
                              />
                            </CompactField>
                          </div>
                        </div>

                        <div className="rounded-[1.45rem] border border-white/8 bg-white/[0.02] p-4">
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/46",
                              "ml-auto",
                              isRtl && "mr-auto ml-0",
                            )}
                          >
                            {ui.arabic}
                          </span>
                          <div className="mt-4 space-y-3">
                            <CompactField label={copy.label} isRtl>
                              <Input
                                name={`image_${index}_label_ar`}
                                defaultValue={image.labelAr}
                                placeholder={arabicText.imageLabel}
                                dir="rtl"
                              />
                            </CompactField>
                            <CompactField label={copy.angle} isRtl>
                              <Input
                                name={`image_${index}_angle_ar`}
                                defaultValue={image.angleAr}
                                placeholder={arabicText.imageAngle}
                                dir="rtl"
                              />
                            </CompactField>
                            <CompactField label={copy.altText} isRtl>
                              <Input
                                name={`image_${index}_alt_text_ar`}
                                defaultValue={image.altTextAr}
                                placeholder={arabicText.altText}
                                dir="rtl"
                              />
                            </CompactField>
                            <CompactField label={copy.imageNote} isRtl>
                              <Textarea
                                name={`image_${index}_note_ar`}
                                defaultValue={image.noteAr}
                                className="min-h-24"
                                placeholder={arabicText.imageNote}
                                dir="rtl"
                              />
                            </CompactField>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        <section className="showroom-panel p-6 md:p-8">
          <SectionHeading title={copy.notesAndDetails} description={ui.notesHint} isRtl={isRtl} />
          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            <DetailBlock
              title={copy.materials}
              helper={copy.onePerLine}
              englishLabel={ui.english}
              arabicLabel={ui.arabic}
              englishName="materials"
              arabicName="materials_ar"
              englishValue={toLines(product?.materials ?? [])}
              arabicValue={toLines(product?.materialsAr ?? [])}
              englishPlaceholder={englishText.materials}
              arabicPlaceholder={arabicText.materials}
              isRtl={isRtl}
            />
            <DetailBlock
              title={copy.fabricNotes}
              helper={copy.notePerLine}
              englishLabel={ui.english}
              arabicLabel={ui.arabic}
              englishName="fabric_notes"
              arabicName="fabric_notes_ar"
              englishValue={toLines(product?.fabricNotes ?? [])}
              arabicValue={toLines(product?.fabricNotesAr ?? [])}
              englishPlaceholder={englishText.fabricNotes}
              arabicPlaceholder={arabicText.fabricNotes}
              isRtl={isRtl}
            />
            <DetailBlock
              title={copy.careNotes}
              helper={copy.notePerLine}
              englishLabel={ui.english}
              arabicLabel={ui.arabic}
              englishName="care_notes"
              arabicName="care_notes_ar"
              englishValue={toLines(product?.careNotes ?? [])}
              arabicValue={toLines(product?.careNotesAr ?? [])}
              englishPlaceholder={englishText.careNotes}
              arabicPlaceholder={arabicText.careNotes}
              isRtl={isRtl}
            />
            <DetailBlock
              title={copy.fitNotes}
              helper={copy.notePerLine}
              englishLabel={ui.english}
              arabicLabel={ui.arabic}
              englishName="fit_notes"
              arabicName="fit_notes_ar"
              englishValue={toLines(product?.fitNotes ?? [])}
              arabicValue={toLines(product?.fitNotesAr ?? [])}
              englishPlaceholder={englishText.fitNotes}
              arabicPlaceholder={arabicText.fitNotes}
              isRtl={isRtl}
            />
          </div>
        </section>

        {showTimestamps ? (
          <section className="luxury-muted-panel p-5">
            <SectionHeading title={copy.productRecord} description={ui.recordHint} isRtl={isRtl} />
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <AdminEditorMetaRow label={copy.created} value={product?.createdAt} isRtl={isRtl} />
              <AdminEditorMetaRow label={copy.updated} value={product?.updatedAt} isRtl={isRtl} />
            </div>
          </section>
        ) : null}
      </form>
    </div>
  );
}

