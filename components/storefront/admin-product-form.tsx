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

import { AdminProductStateBadge } from "./admin-product-state-badge";

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

function CheckboxField({
  isRtl = false,
  name,
  label,
  hint,
  defaultChecked,
}: {
  isRtl?: boolean;
  name: string;
  label: string;
  hint: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] p-4">
      <div className={`flex items-start gap-3 ${isRtl ? "flex-row-reverse text-right" : ""}`}>
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="mt-1 h-4 w-4 rounded border-white/12 bg-transparent accent-[#b79d67]"
        />
        <div>
          <p
            className={
              isRtl
                ? "text-base font-medium text-white/78"
                : "text-sm uppercase tracking-[0.22em] text-white/72"
            }
          >
            {label}
          </p>
          <p className="mt-2 text-sm leading-7 text-white/48">{hint}</p>
        </div>
      </div>
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
    productName: "عباية التوقيع",
    slug: "signature-abaya",
    shortDescription: "قطعة محتشمة مصقولة بحضور بصري فخم داخل المعرض الداكن.",
    description: "اكتب الوصف الرئيسي الذي سيظهر في واجهة المنتج.",
    story: "سرد اختياري عن الحرفة أو قصة القطعة.",
    optional: "اختياري",
    materials: "كريب فاخر\nبطانة حريرية",
    fabricNotes: "انسدال منظم وناعم\nلمعة هادئة منخفضة",
    careNotes: "يفضل التنظيف الجاف\nتبخير خفيف قبل الارتداء",
    fitNotes: "قصة مريحة\nمصممة للتنسيق المحتشم متعدد الطبقات",
    variantSize: "ص / م / ك",
    sku: "KRV-ABY-BLK-M",
    imageUrl: "https://... أو اتركه فارغاً عند الرفع",
    imageLabel: "الزاوية الأمامية",
    imageAngle: "ثلاثة أرباع",
    altText: "نص بديل وصفي للصورة",
    imageNote: "ملاحظة اختيارية لعرض هذه الزاوية داخل المعرض.",
    variantPrefix: "المتغير",
    imagePrefix: "الصورة",
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
    obsidian: "أسود لامع",
    stone: "حجري",
    bronze: "برونزي",
    pearl: "لؤلؤي",
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
  const placeholders = editorPlaceholders[locale];
  const englishPlaceholders = editorPlaceholders.en;
  const arabicPlaceholders = editorPlaceholders.ar;
  const localizedToneLabels = toneLabels[locale];
  const bilingualCopy =
    locale === "ar"
      ? {
          english: "الإنجليزية",
          arabic: "العربية",
          contentSection: "المحتوى الثنائي",
          contentNote:
            "حرر النص الإنجليزي والعربي معاً حتى يظهر المتجر بكامل محتواه عند تبديل اللغة.",
          englishName: "اسم المنتج بالإنجليزية",
          arabicName: "اسم المنتج بالعربية",
          englishShort: "الوصف المختصر بالإنجليزية",
          arabicShort: "الوصف المختصر بالعربية",
          englishDescription: "الوصف الكامل بالإنجليزية",
          arabicDescription: "الوصف الكامل بالعربية",
          englishStory: "قصة المنتج بالإنجليزية",
          arabicStory: "قصة المنتج بالعربية",
          englishMaterials: "الخامات بالإنجليزية",
          arabicMaterials: "الخامات بالعربية",
          englishFabricNotes: "ملاحظات القماش بالإنجليزية",
          arabicFabricNotes: "ملاحظات القماش بالعربية",
          englishCareNotes: "ملاحظات العناية بالإنجليزية",
          arabicCareNotes: "ملاحظات العناية بالعربية",
          englishFitNotes: "ملاحظات المقاس بالإنجليزية",
          arabicFitNotes: "ملاحظات المقاس بالعربية",
          englishImageMeta: "بيانات الصورة بالإنجليزية",
          arabicImageMeta: "بيانات الصورة بالعربية",
          englishAlt: "النص البديل بالإنجليزية",
          arabicAlt: "النص البديل بالعربية",
          englishLabel: "وسم الصورة بالإنجليزية",
          arabicLabel: "وسم الصورة بالعربية",
          englishAngle: "زاوية الصورة بالإنجليزية",
          arabicAngle: "زاوية الصورة بالعربية",
          englishNote: "ملاحظة الصورة بالإنجليزية",
          arabicNote: "ملاحظة الصورة بالعربية",
        }
      : {
          english: "English",
          arabic: "Arabic",
          contentSection: "Bilingual content",
          contentNote:
            "Edit the English and Arabic storefront copy together so the live site stays complete in both languages.",
          englishName: "Product name (English)",
          arabicName: "Product name (Arabic)",
          englishShort: "Short description (English)",
          arabicShort: "Short description (Arabic)",
          englishDescription: "Full description (English)",
          arabicDescription: "Full description (Arabic)",
          englishStory: "Brand story (English)",
          arabicStory: "Brand story (Arabic)",
          englishMaterials: "Materials (English)",
          arabicMaterials: "Materials (Arabic)",
          englishFabricNotes: "Fabric notes (English)",
          arabicFabricNotes: "Fabric notes (Arabic)",
          englishCareNotes: "Care notes (English)",
          arabicCareNotes: "Care notes (Arabic)",
          englishFitNotes: "Fit notes (English)",
          arabicFitNotes: "Fit notes (Arabic)",
          englishImageMeta: "Image metadata (English)",
          arabicImageMeta: "Image metadata (Arabic)",
          englishAlt: "Alt text (English)",
          arabicAlt: "Alt text (Arabic)",
          englishLabel: "Label (English)",
          arabicLabel: "Label (Arabic)",
          englishAngle: "Angle (English)",
          arabicAngle: "Angle (Arabic)",
          englishNote: "Image note (English)",
          arabicNote: "Image note (Arabic)",
        };
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

  return (
    <div className="space-y-6">
      {notice ? (
        <section className="section-frame">
          <div className={notice.tone === "error" ? "luxury-muted-panel p-5" : "showroom-panel p-5"}>
            <p className="eyebrow">
              {notice.tone === "error" ? copy.saveError : copy.saved}
            </p>
            <p className="mt-4 text-sm leading-7 text-white/58">{notice.message}</p>
          </div>
        </section>
      ) : null}

      <form
        action={action}
        encType="multipart/form-data"
        className="section-frame grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]"
      >
        {product ? <input type="hidden" name="product_id" value={product.id} /> : null}
        <input type="hidden" name="variant_count" value={variantRows.length} />
        <input type="hidden" name="image_count" value={imageRows.length} />

        <div className="space-y-6">
          <section className="luxury-panel p-6 md:p-8">
            <SectionHeading title={copy.basicInfo} isRtl={isRtl} />
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <Field label={bilingualCopy.englishName} isRtl={isRtl}>
                <Input
                  name="name"
                  defaultValue={product?.name ?? ""}
                  placeholder={englishPlaceholders.productName}
                  dir="ltr"
                />
              </Field>
              <Field label={bilingualCopy.arabicName} isRtl={isRtl}>
                <Input
                  name="name_ar"
                  defaultValue={product?.nameAr ?? ""}
                  placeholder={arabicPlaceholders.productName}
                  dir="rtl"
                />
              </Field>
              <Field
                label={copy.slug}
                hint={copy.slugHint}
                isRtl={isRtl}
              >
                <Input
                  name="slug"
                  defaultValue={product?.slug ?? ""}
                  placeholder={placeholders.slug}
                />
              </Field>
            </div>

            <div className="mt-6 showroom-subpanel p-5">
              <p className="eyebrow">{bilingualCopy.contentSection}</p>
              <p className="mt-3 text-sm leading-7 text-white/48">
                {bilingualCopy.contentNote}
              </p>
            </div>

            <div className="mt-5 grid gap-5">
              <div className="grid gap-5 lg:grid-cols-2">
                <Field label={bilingualCopy.englishShort} isRtl={isRtl}>
                  <Textarea
                    name="short_description"
                    defaultValue={product?.shortDescription ?? ""}
                    className="min-h-28"
                    placeholder={englishPlaceholders.shortDescription}
                    dir="ltr"
                  />
                </Field>
                <Field label={bilingualCopy.arabicShort} isRtl={isRtl}>
                  <Textarea
                    name="short_description_ar"
                    defaultValue={product?.shortDescriptionAr ?? ""}
                    className="min-h-28"
                    placeholder={arabicPlaceholders.shortDescription}
                    dir="rtl"
                  />
                </Field>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <Field label={bilingualCopy.englishDescription} isRtl={isRtl}>
                  <Textarea
                    name="description"
                    defaultValue={product?.description ?? ""}
                    placeholder={englishPlaceholders.description}
                    dir="ltr"
                  />
                </Field>
                <Field label={bilingualCopy.arabicDescription} isRtl={isRtl}>
                  <Textarea
                    name="description_ar"
                    defaultValue={product?.descriptionAr ?? ""}
                    placeholder={arabicPlaceholders.description}
                    dir="rtl"
                  />
                </Field>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <Field
                  label={bilingualCopy.englishStory}
                  hint={copy.brandStoryHint}
                  isRtl={isRtl}
                >
                  <Textarea
                    name="story"
                    defaultValue={product?.story ?? ""}
                    placeholder={englishPlaceholders.story}
                    dir="ltr"
                  />
                </Field>
                <Field
                  label={bilingualCopy.arabicStory}
                  hint={copy.brandStoryHint}
                  isRtl={isRtl}
                >
                  <Textarea
                    name="story_ar"
                    defaultValue={product?.storyAr ?? ""}
                    placeholder={arabicPlaceholders.story}
                    dir="rtl"
                  />
                </Field>
              </div>
            </div>
          </section>

          <section className="showroom-panel p-6 md:p-8">
            <SectionHeading title={copy.merchandising} isRtl={isRtl} />
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label={copy.basePrice} isRtl={isRtl}>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  defaultValue={product?.price ?? 0}
                />
              </Field>
              <Field
                label={copy.compareAtPrice}
                hint={copy.compareAtPriceHint}
                isRtl={isRtl}
              >
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  name="compare_at_price"
                  defaultValue={product?.compareAtPrice ?? ""}
                  placeholder={placeholders.optional}
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
              <Field
                label={copy.collection}
                hint={copy.collectionHint}
                isRtl={isRtl}
              >
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

          <section className="luxury-panel p-6 md:p-8">
            <SectionHeading title={copy.notesAndDetails} isRtl={isRtl} />
            <div className="mt-6 grid gap-5">
              <div className="grid gap-5 lg:grid-cols-2">
                <Field
                  label={bilingualCopy.englishMaterials}
                  hint={copy.onePerLine}
                  isRtl={isRtl}
                >
                  <Textarea
                    name="materials"
                    defaultValue={toLines(product?.materials ?? [])}
                    className="min-h-28"
                    placeholder={englishPlaceholders.materials}
                    dir="ltr"
                  />
                </Field>
                <Field
                  label={bilingualCopy.arabicMaterials}
                  hint={copy.onePerLine}
                  isRtl={isRtl}
                >
                  <Textarea
                    name="materials_ar"
                    defaultValue={toLines(product?.materialsAr ?? [])}
                    className="min-h-28"
                    placeholder={arabicPlaceholders.materials}
                    dir="rtl"
                  />
                </Field>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <Field label={bilingualCopy.englishFabricNotes} hint={copy.notePerLine} isRtl={isRtl}>
                  <Textarea
                    name="fabric_notes"
                    defaultValue={toLines(product?.fabricNotes ?? [])}
                    className="min-h-28"
                    placeholder={englishPlaceholders.fabricNotes}
                    dir="ltr"
                  />
                </Field>
                <Field label={bilingualCopy.arabicFabricNotes} hint={copy.notePerLine} isRtl={isRtl}>
                  <Textarea
                    name="fabric_notes_ar"
                    defaultValue={toLines(product?.fabricNotesAr ?? [])}
                    className="min-h-28"
                    placeholder={arabicPlaceholders.fabricNotes}
                    dir="rtl"
                  />
                </Field>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <Field label={bilingualCopy.englishCareNotes} hint={copy.notePerLine} isRtl={isRtl}>
                  <Textarea
                    name="care_notes"
                    defaultValue={toLines(product?.careNotes ?? [])}
                    className="min-h-28"
                    placeholder={englishPlaceholders.careNotes}
                    dir="ltr"
                  />
                </Field>
                <Field label={bilingualCopy.arabicCareNotes} hint={copy.notePerLine} isRtl={isRtl}>
                  <Textarea
                    name="care_notes_ar"
                    defaultValue={toLines(product?.careNotesAr ?? [])}
                    className="min-h-28"
                    placeholder={arabicPlaceholders.careNotes}
                    dir="rtl"
                  />
                </Field>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                <Field label={bilingualCopy.englishFitNotes} hint={copy.notePerLine} isRtl={isRtl}>
                  <Textarea
                    name="fit_notes"
                    defaultValue={toLines(product?.fitNotes ?? [])}
                    className="min-h-28"
                    placeholder={englishPlaceholders.fitNotes}
                    dir="ltr"
                  />
                </Field>
                <Field label={bilingualCopy.arabicFitNotes} hint={copy.notePerLine} isRtl={isRtl}>
                  <Textarea
                    name="fit_notes_ar"
                    defaultValue={toLines(product?.fitNotesAr ?? [])}
                    className="min-h-28"
                    placeholder={arabicPlaceholders.fitNotes}
                    dir="rtl"
                  />
                </Field>
              </div>
            </div>
          </section>

          <section className="showroom-panel p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{copy.variants}</p>
                <h2 className={`mt-4 text-white ${isRtl ? "text-[1.9rem] leading-tight md:text-[2.45rem]" : "text-3xl leading-none"}`}>
                  {copy.variantsTitle}
                </h2>
              </div>
              <p className="text-sm leading-7 text-white/46">
                {copy.variantsNote}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {variantRows.map((variant, index) => (
                <div
                  key={variant.id ?? `new-variant-${index}`}
                  className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4"
                >
                  <input
                    type="hidden"
                    name={`variant_${index}_id`}
                    value={variant.id ?? ""}
                  />
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    <Field
                      label={`${placeholders.variantPrefix} ${index + 1} ${copy.variantSize}`}
                      isRtl={isRtl}
                    >
                      <Input
                        name={`variant_${index}_size`}
                        defaultValue={variant.size}
                        placeholder={placeholders.variantSize}
                      />
                    </Field>
                    <Field label={copy.color} isRtl={isRtl}>
                      <Input
                        name={`variant_${index}_color`}
                        defaultValue={variant.color ?? ""}
                        placeholder={placeholders.optional}
                      />
                    </Field>
                    <Field label={copy.sku} isRtl={isRtl}>
                      <Input
                        name={`variant_${index}_sku`}
                        defaultValue={variant.sku}
                        placeholder={placeholders.sku}
                      />
                    </Field>
                    <Field label={copy.stockQuantity} isRtl={isRtl}>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        name={`variant_${index}_stock_quantity`}
                        defaultValue={variant.stockQuantity}
                      />
                    </Field>
                    <Field label={copy.priceOverride} isRtl={isRtl}>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        name={`variant_${index}_price_override`}
                        defaultValue={variant.priceOverride ?? ""}
                        placeholder={copy.optional}
                      />
                    </Field>
                  </div>
                  <div className="mt-4">
                    <CheckboxField
                      name={`variant_${index}_is_active`}
                      label={copy.variantActive}
                      hint={copy.variantActiveHint}
                      defaultChecked={variant.isActive}
                      isRtl={isRtl}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="luxury-panel p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{copy.images}</p>
                <h2 className={`mt-4 text-white ${isRtl ? "text-[1.9rem] leading-tight md:text-[2.45rem]" : "text-3xl leading-none"}`}>
                  {copy.imagesTitle}
                </h2>
              </div>
              <p className="text-sm leading-7 text-white/46">
                {copy.imagesNote}
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {imageRows.map((image, index) => (
                <div
                  key={image.id ?? `new-image-${index}`}
                  className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-4"
                >
                  <input
                    type="hidden"
                    name={`image_${index}_id`}
                    value={image.id ?? ""}
                  />
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    {image.storagePath ? (
                      <AdminProductStateBadge
                        label={copy.storedUpload}
                        active
                        tone="accent"
                      />
                    ) : null}
                    {image.imageUrl ? (
                      <AdminProductStateBadge
                        label={copy.galleryReady}
                        active
                        tone="success"
                      />
                    ) : null}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <Field
                      label={`${placeholders.imagePrefix} ${index + 1} ${copy.upload}`}
                      hint={copy.uploadHint}
                      isRtl={isRtl}
                    >
                      <input
                        type="file"
                        name={`image_${index}_file`}
                        accept="image/jpeg,image/png,image/webp,image/avif"
                        className="block w-full rounded-[1.2rem] border border-dashed border-white/12 bg-white/[0.02] px-4 py-3 text-sm text-white/72 file:mr-4 file:rounded-full file:border file:border-white/10 file:bg-white/[0.06] file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.2em] file:text-white/72 file:transition hover:border-white/18"
                      />
                    </Field>
                    <Field
                      label={`${placeholders.imagePrefix} ${index + 1} ${copy.imageUrl}`}
                      isRtl={isRtl}
                    >
                      <Input
                        name={`image_${index}_image_url`}
                        defaultValue={image.imageUrl}
                        placeholder={placeholders.imageUrl}
                      />
                    </Field>
                    <Field label={copy.label} isRtl={isRtl}>
                      <Input
                        name={`image_${index}_label`}
                        defaultValue={image.label}
                        placeholder={englishPlaceholders.imageLabel}
                        dir="ltr"
                      />
                    </Field>
                    <Field label={bilingualCopy.arabicLabel} isRtl={isRtl}>
                      <Input
                        name={`image_${index}_label_ar`}
                        defaultValue={image.labelAr}
                        placeholder={arabicPlaceholders.imageLabel}
                        dir="rtl"
                      />
                    </Field>
                    <Field label={copy.angle} isRtl={isRtl}>
                      <Input
                        name={`image_${index}_angle`}
                        defaultValue={image.angle}
                        placeholder={englishPlaceholders.imageAngle}
                        dir="ltr"
                      />
                    </Field>
                    <Field label={bilingualCopy.arabicAngle} isRtl={isRtl}>
                      <Input
                        name={`image_${index}_angle_ar`}
                        defaultValue={image.angleAr}
                        placeholder={arabicPlaceholders.imageAngle}
                        dir="rtl"
                      />
                    </Field>
                    <Field label={copy.altText} isRtl={isRtl}>
                      <Input
                        name={`image_${index}_alt_text`}
                        defaultValue={image.altText}
                        placeholder={englishPlaceholders.altText}
                        dir="ltr"
                      />
                    </Field>
                    <Field label={bilingualCopy.arabicAlt} isRtl={isRtl}>
                      <Input
                        name={`image_${index}_alt_text_ar`}
                        defaultValue={image.altTextAr}
                        placeholder={arabicPlaceholders.altText}
                        dir="rtl"
                      />
                    </Field>
                    <Field label={copy.displayOrder} isRtl={isRtl}>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        name={`image_${index}_sort_order`}
                        defaultValue={image.sortOrder}
                      />
                    </Field>
                    <Field label={copy.tone} isRtl={isRtl}>
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
                            {
                              localizedToneLabels[
                                tone as keyof typeof localizedToneLabels
                              ]
                            }
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {image.imageUrl ? (
                    <div className="mt-4 overflow-hidden rounded-[1.4rem] border border-white/8 bg-white/[0.03]">
                      <div
                        className="min-h-40 bg-cover bg-center"
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(8,8,9,0.12), rgba(8,8,9,0.72)), url(${image.imageUrl})`,
                        }}
                      />
                    </div>
                  ) : null}

                  <div className="mt-4">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label={bilingualCopy.englishNote} isRtl={isRtl}>
                        <Textarea
                          name={`image_${index}_note`}
                          defaultValue={image.note}
                          className="min-h-24"
                          placeholder={englishPlaceholders.imageNote}
                          dir="ltr"
                        />
                      </Field>
                      <Field label={bilingualCopy.arabicNote} isRtl={isRtl}>
                        <Textarea
                          name={`image_${index}_note_ar`}
                          defaultValue={image.noteAr}
                          className="min-h-24"
                          placeholder={arabicPlaceholders.imageNote}
                          dir="rtl"
                        />
                      </Field>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <CheckboxField
                      name={`image_${index}_is_primary`}
                      label={copy.primaryImage}
                      hint={copy.primaryImageHint}
                      defaultChecked={image.isPrimary}
                      isRtl={isRtl}
                    />
                    {image.id ? (
                      <CheckboxField
                        name={`image_${index}_remove`}
                        label={copy.removeImage}
                        hint={copy.removeImageHint}
                        isRtl={isRtl}
                      />
                    ) : (
                      <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] p-4">
                        <p className="text-sm uppercase tracking-[0.22em] text-white/72">
                          {copy.newImageRow}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-white/48">
                          {copy.newImageHint}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="showroom-panel p-6 md:p-7">
            <SectionHeading title={copy.publishingState} isRtl={isRtl} />
            <div className="mt-5 flex flex-wrap gap-2">
              <AdminProductStateBadge
                label={product?.isActive ? cardCopy.active : cardCopy.inactive}
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

            <div className="mt-5 space-y-4">
              <CheckboxField
                name="is_active"
                label={copy.productActive}
                hint={copy.productActiveHint}
                defaultChecked={product?.isActive ?? true}
                isRtl={isRtl}
              />
              <CheckboxField
                name="is_featured"
                label={copy.featuredProduct}
                hint={copy.featuredProductHint}
                defaultChecked={product?.isFeatured ?? false}
                isRtl={isRtl}
              />
              <CheckboxField
                name="limited_edition"
                label={copy.limitedEdition}
                hint={copy.limitedEditionHint}
                defaultChecked={product?.limitedEdition ?? false}
                isRtl={isRtl}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full"
              disabled={!hasCategoryOptions}
            >
              {isCreateMode ? copy.createProduct : copy.saveProduct}
            </Button>
          </section>

          <section className="luxury-muted-panel p-5">
            <SectionHeading title={copy.editorNote} isRtl={isRtl} />
            <p className="mt-4 text-sm leading-7 text-white/56">
              {copy.editorBody}
            </p>
          </section>

          {!hasCategoryOptions ? (
            <section className="luxury-muted-panel p-5">
              <SectionHeading title={copy.categoryRequired} isRtl={isRtl} />
              <p className="mt-4 text-sm leading-7 text-white/56">
                {copy.categoryRequiredBody}
              </p>
            </section>
          ) : null}

          {showTimestamps ? (
            <section className="luxury-muted-panel p-5">
              <SectionHeading title={copy.productRecord} isRtl={isRtl} />
              <div className="mt-5 space-y-3 text-sm text-white/58">
                <div className="flex items-center justify-between gap-4">
                  <span>{copy.created}</span>
                  <span className="text-white/74">{product?.createdAt}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>{copy.updated}</span>
                  <span className="text-right text-white/74">{product?.updatedAt}</span>
                </div>
              </div>
            </section>
          ) : null}
        </aside>
      </form>
    </div>
  );
}
