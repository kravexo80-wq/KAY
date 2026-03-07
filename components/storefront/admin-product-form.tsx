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

import { AdminProductStateBadge } from "./admin-product-state-badge";

interface AdminProductFormProps {
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
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-3">
      <div className="space-y-2">
        <span className="text-[0.62rem] uppercase tracking-[0.24em] text-white/36">
          {label}
        </span>
        {hint ? <p className="text-sm leading-6 text-white/44">{hint}</p> : null}
      </div>
      {children}
    </label>
  );
}

function CheckboxField({
  name,
  label,
  hint,
  defaultChecked,
}: {
  name: string;
  label: string;
  hint: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] p-4">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="mt-1 h-4 w-4 rounded border-white/12 bg-transparent accent-[#b79d67]"
        />
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-white/72">{label}</p>
          <p className="mt-2 text-sm leading-7 text-white/48">{hint}</p>
        </div>
      </div>
    </label>
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
    label: "",
    angle: "",
    note: "",
    tone: "obsidian",
    sortOrder,
    isPrimary: false,
  };
}

export function AdminProductForm({
  mode,
  options,
  product,
  action,
  notice,
}: AdminProductFormProps) {
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
              {notice.tone === "error" ? "Save error" : "Saved"}
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
            <p className="eyebrow">Basic info</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label="Product name">
                <Input
                  name="name"
                  defaultValue={product?.name ?? ""}
                  placeholder="Signature Abaya"
                />
              </Field>
              <Field
                label="Slug"
                hint="Leave blank to generate from the product name."
              >
                <Input
                  name="slug"
                  defaultValue={product?.slug ?? ""}
                  placeholder="signature-abaya"
                />
              </Field>
            </div>

            <div className="mt-5 space-y-5">
              <Field label="Short description">
                <Textarea
                  name="short_description"
                  defaultValue={product?.shortDescription ?? ""}
                  className="min-h-28"
                  placeholder="Tailored modestwear with a cinematic showroom finish."
                />
              </Field>
              <Field label="Full description">
                <Textarea
                  name="description"
                  defaultValue={product?.description ?? ""}
                  placeholder="Write the main storefront product description."
                />
              </Field>
              <Field
                label="Brand story"
                hint="Optional editorial story block for the product detail page."
              >
                <Textarea
                  name="story"
                  defaultValue={product?.story ?? ""}
                  placeholder="Optional narrative or craftsmanship note."
                />
              </Field>
            </div>
          </section>

          <section className="showroom-panel p-6 md:p-8">
            <p className="eyebrow">Merchandising</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <Field label="Base price">
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  defaultValue={product?.price ?? 0}
                />
              </Field>
              <Field
                label="Compare-at price"
                hint="Optional merchandising price shown above the live price."
              >
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  name="compare_at_price"
                  defaultValue={product?.compareAtPrice ?? ""}
                  placeholder="Optional"
                />
              </Field>
              <Field label="Category">
                <select
                  name="category_id"
                  defaultValue={product?.categoryId ?? categoryOptions[0]?.id ?? ""}
                  className={selectClassName}
                >
                  <option value="" className="bg-[#090909] text-white">
                    Select category
                  </option>
                  {categoryOptions.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      className="bg-[#090909] text-white"
                    >
                      {category.name}
                      {category.isActive ? "" : " (inactive)"}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="Collection"
                hint="Optional editorial grouping for collection pages."
              >
                <select
                  name="collection_id"
                  defaultValue={product?.collectionId ?? ""}
                  className={selectClassName}
                >
                  <option value="" className="bg-[#090909] text-white">
                    No collection
                  </option>
                  {collectionOptions.map((collection) => (
                    <option
                      key={collection.id}
                      value={collection.id}
                      className="bg-[#090909] text-white"
                    >
                      {collection.name}
                      {collection.isActive ? "" : " (inactive)"}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </section>

          <section className="luxury-panel p-6 md:p-8">
            <p className="eyebrow">Notes and details</p>
            <div className="mt-6 grid gap-5">
              <Field
                label="Materials"
                hint="One item per line."
              >
                <Textarea
                  name="materials"
                  defaultValue={toLines(product?.materials ?? [])}
                  className="min-h-28"
                  placeholder={"Premium crepe\nSilk lining"}
                />
              </Field>
              <Field label="Fabric notes" hint="One note per line.">
                <Textarea
                  name="fabric_notes"
                  defaultValue={toLines(product?.fabricNotes ?? [])}
                  className="min-h-28"
                  placeholder={"Soft structured drape\nLow-sheen finish"}
                />
              </Field>
              <Field label="Care notes" hint="One note per line.">
                <Textarea
                  name="care_notes"
                  defaultValue={toLines(product?.careNotes ?? [])}
                  className="min-h-28"
                  placeholder={"Dry clean recommended\nSteam lightly before wear"}
                />
              </Field>
              <Field label="Fit notes" hint="One note per line.">
                <Textarea
                  name="fit_notes"
                  defaultValue={toLines(product?.fitNotes ?? [])}
                  className="min-h-28"
                  placeholder={"Relaxed silhouette\nDesigned for layered modest styling"}
                />
              </Field>
            </div>
          </section>

          <section className="showroom-panel p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Variants</p>
                <h2 className="mt-4 text-3xl leading-none text-white">
                  Sizes, stock, and pricing.
                </h2>
              </div>
              <p className="text-sm leading-7 text-white/46">
                Deactivate existing variants instead of deleting them in this first pass.
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
                    <Field label={`Variant ${index + 1} size`}>
                      <Input
                        name={`variant_${index}_size`}
                        defaultValue={variant.size}
                        placeholder="S / M / L"
                      />
                    </Field>
                    <Field label="Color">
                      <Input
                        name={`variant_${index}_color`}
                        defaultValue={variant.color ?? ""}
                        placeholder="Optional"
                      />
                    </Field>
                    <Field label="SKU">
                      <Input
                        name={`variant_${index}_sku`}
                        defaultValue={variant.sku}
                        placeholder="KRV-ABY-BLK-M"
                      />
                    </Field>
                    <Field label="Stock quantity">
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        name={`variant_${index}_stock_quantity`}
                        defaultValue={variant.stockQuantity}
                      />
                    </Field>
                    <Field label="Price override">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        name={`variant_${index}_price_override`}
                        defaultValue={variant.priceOverride ?? ""}
                        placeholder="Optional"
                      />
                    </Field>
                  </div>
                  <div className="mt-4">
                    <CheckboxField
                      name={`variant_${index}_is_active`}
                      label="Variant active"
                      hint="Active variants are eligible for storefront purchase and stock calculations."
                      defaultChecked={variant.isActive}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="luxury-panel p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Images</p>
                <h2 className="mt-4 text-3xl leading-none text-white">
                  Uploads and URL-based gallery management.
                </h2>
              </div>
              <p className="text-sm leading-7 text-white/46">
                Uploading to Supabase Storage now works alongside manual image URLs, so the storefront gallery can keep using the same product_images records.
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
                        label="Stored upload"
                        active
                        tone="accent"
                      />
                    ) : null}
                    {image.imageUrl ? (
                      <AdminProductStateBadge
                        label="Gallery ready"
                        active
                        tone="success"
                      />
                    ) : null}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    <Field
                      label={`Image ${index + 1} upload`}
                      hint="Upload a new image file. If both are provided, the uploaded file overrides the manual URL."
                    >
                      <input
                        type="file"
                        name={`image_${index}_file`}
                        accept="image/jpeg,image/png,image/webp,image/avif"
                        className="block w-full rounded-[1.2rem] border border-dashed border-white/12 bg-white/[0.02] px-4 py-3 text-sm text-white/72 file:mr-4 file:rounded-full file:border file:border-white/10 file:bg-white/[0.06] file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.2em] file:text-white/72 file:transition hover:border-white/18"
                      />
                    </Field>
                    <Field label={`Image ${index + 1} URL`}>
                      <Input
                        name={`image_${index}_image_url`}
                        defaultValue={image.imageUrl}
                        placeholder="https://... or leave blank when uploading"
                      />
                    </Field>
                    <Field label="Label">
                      <Input
                        name={`image_${index}_label`}
                        defaultValue={image.label}
                        placeholder="Front angle"
                      />
                    </Field>
                    <Field label="Angle">
                      <Input
                        name={`image_${index}_angle`}
                        defaultValue={image.angle}
                        placeholder="Three-quarter"
                      />
                    </Field>
                    <Field label="Alt text">
                      <Input
                        name={`image_${index}_alt_text`}
                        defaultValue={image.altText}
                        placeholder="Descriptive alternative text"
                      />
                    </Field>
                    <Field label="Display order">
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        name={`image_${index}_sort_order`}
                        defaultValue={image.sortOrder}
                      />
                    </Field>
                    <Field label="Tone">
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
                            {tone}
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
                    <Field label="Image note">
                      <Textarea
                        name={`image_${index}_note`}
                        defaultValue={image.note}
                        className="min-h-24"
                        placeholder="Optional showroom note for this angle."
                      />
                    </Field>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <CheckboxField
                      name={`image_${index}_is_primary`}
                      label="Primary image"
                      hint="This image becomes the lead frame for storefront cards and galleries."
                      defaultChecked={image.isPrimary}
                    />
                    {image.id ? (
                      <CheckboxField
                        name={`image_${index}_remove`}
                        label="Remove image"
                        hint="Existing image rows can be removed directly from this editor."
                      />
                    ) : (
                      <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] p-4">
                        <p className="text-sm uppercase tracking-[0.22em] text-white/72">
                          New image row
                        </p>
                        <p className="mt-2 text-sm leading-7 text-white/48">
                          Leave every field blank to ignore this row.
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
            <p className="eyebrow">Publishing state</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <AdminProductStateBadge
                label={product?.isActive ? "Active" : "Inactive"}
                active={product?.isActive ?? false}
                tone="success"
              />
              <AdminProductStateBadge
                label={product?.isFeatured ? "Featured" : "Standard"}
                active={product?.isFeatured ?? false}
                tone="accent"
              />
              {product?.limitedEdition ? (
                <AdminProductStateBadge label="Limited" active tone="accent" />
              ) : null}
            </div>

            <div className="mt-5 space-y-4">
              <CheckboxField
                name="is_active"
                label="Product active"
                hint="Inactive products remain editable but disappear from the public storefront."
                defaultChecked={product?.isActive ?? true}
              />
              <CheckboxField
                name="is_featured"
                label="Featured product"
                hint="Featured products can appear on the homepage and priority product lists."
                defaultChecked={product?.isFeatured ?? false}
              />
              <CheckboxField
                name="limited_edition"
                label="Limited edition"
                hint="Adds limited-edition merchandising state without changing checkout behavior."
                defaultChecked={product?.limitedEdition ?? false}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full"
              disabled={!hasCategoryOptions}
            >
              {isCreateMode ? "Create product" : "Save product"}
            </Button>
          </section>

          <section className="luxury-muted-panel p-5">
            <p className="eyebrow">Editor note</p>
            <p className="mt-4 text-sm leading-7 text-white/56">
              Slugs stay unique, variants are validated before save, and storefront/admin routes are revalidated after each product change.
            </p>
          </section>

          {!hasCategoryOptions ? (
            <section className="luxury-muted-panel p-5">
              <p className="eyebrow">Category required</p>
              <p className="mt-4 text-sm leading-7 text-white/56">
                Add at least one category in Supabase before creating products. This first admin pass prioritizes product editing and assignment over dedicated category CRUD pages.
              </p>
            </section>
          ) : null}

          {showTimestamps ? (
            <section className="luxury-muted-panel p-5">
              <p className="eyebrow">Product record</p>
              <div className="mt-5 space-y-3 text-sm text-white/58">
                <div className="flex items-center justify-between gap-4">
                  <span>Created</span>
                  <span className="text-white/74">{product?.createdAt}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Updated</span>
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
