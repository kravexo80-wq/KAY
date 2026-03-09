import type { ReactNode } from "react";

import type { AdminCollectionEditorData } from "@/lib/supabase/admin-collections";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAdminTaxonomyCopy } from "@/lib/i18n/admin-taxonomy-copy";
import type { Locale } from "@/lib/i18n/config";

import { AdminProductStateBadge } from "./admin-product-state-badge";
import {
  adminSelectClassName,
  AdminEditorCheckboxField,
  AdminEditorField,
  AdminEditorSectionHeading,
} from "./admin-editor-primitives";

interface AdminCollectionFormProps {
  locale: Locale;
  mode: "create" | "edit";
  collection?: AdminCollectionEditorData | null;
  action: (formData: FormData) => void | Promise<void>;
  notice?: {
    tone: "success" | "error";
    message: string;
  } | null;
}

export function AdminCollectionForm({
  locale,
  mode,
  collection,
  action,
  notice,
}: AdminCollectionFormProps) {
  const copy = getAdminTaxonomyCopy(locale).collections;
  const isRtl = locale === "ar";
  const isCreateMode = mode === "create";

  return (
    <div className="space-y-6">
      {notice ? (
        <section className="section-frame">
          <div
            className={
              notice.tone === "error" ? "luxury-muted-panel p-5" : "showroom-panel p-5"
            }
          >
            <p className="eyebrow">
              {notice.tone === "error" ? copy.form.saveError : copy.form.saved}
            </p>
            <p className="mt-4 text-sm leading-7 text-white/58">{notice.message}</p>
          </div>
        </section>
      ) : null}

      <form action={action} className="section-frame grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {collection ? (
          <input type="hidden" name="collection_id" value={collection.id} />
        ) : null}

        <div className="space-y-6">
          <section className="luxury-panel p-6 md:p-8">
            <AdminEditorSectionHeading title={copy.form.identity} isRtl={isRtl} />
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <AdminEditorField label={copy.form.nameEn} isRtl={isRtl}>
                <Input
                  name="name"
                  defaultValue={collection?.name ?? ""}
                  placeholder={locale === "ar" ? "Ceremony Edit" : "Ceremony Edit"}
                  dir="ltr"
                />
              </AdminEditorField>
              <AdminEditorField label={copy.form.nameAr} isRtl={isRtl}>
                <Input
                  name="name_ar"
                  defaultValue={collection?.nameAr ?? ""}
                  placeholder={locale === "ar" ? "تحرير المناسبات" : "تحرير المناسبات"}
                  dir="rtl"
                />
              </AdminEditorField>
              <AdminEditorField label={copy.form.slug} hint={copy.form.slugHint} isRtl={isRtl}>
                <Input
                  name="slug"
                  defaultValue={collection?.slug ?? ""}
                  placeholder="ceremony-edit"
                  dir="ltr"
                />
              </AdminEditorField>
              <AdminEditorField
                label={copy.form.sortOrder}
                hint={copy.form.sortOrderHint}
                isRtl={isRtl}
              >
                <Input
                  type="number"
                  min="0"
                  step="1"
                  name="sort_order"
                  defaultValue={collection?.sortOrder ?? 0}
                />
              </AdminEditorField>
            </div>
          </section>

          <section className="showroom-panel p-6 md:p-8">
            <AdminEditorSectionHeading title={copy.form.bilingual} isRtl={isRtl} />
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <AdminEditorField label={copy.form.descriptionEn} isRtl={isRtl}>
                <Textarea
                  name="description"
                  defaultValue={collection?.description ?? ""}
                  placeholder={
                    locale === "ar"
                      ? "Narrative description for the collection."
                      : "Narrative description for the collection."
                  }
                  dir="ltr"
                />
              </AdminEditorField>
              <AdminEditorField label={copy.form.descriptionAr} isRtl={isRtl}>
                <Textarea
                  name="description_ar"
                  defaultValue={collection?.descriptionAr ?? ""}
                  placeholder={
                    locale === "ar"
                      ? "وصف سردي عربي للمجموعة."
                      : "وصف سردي عربي للمجموعة."
                  }
                  dir="rtl"
                />
              </AdminEditorField>
            </div>
          </section>

          <section className="luxury-panel p-6 md:p-8">
            <AdminEditorSectionHeading title={copy.form.visuals} isRtl={isRtl} />
            <div className="mt-6 showroom-subpanel p-5">
              <p className="eyebrow">{copy.form.visualsNoteTitle}</p>
              <p className="mt-3 text-sm leading-7 text-white/48">
                {copy.form.visualsNoteBody}
              </p>
            </div>

            <div className="mt-5 grid gap-5">
              <div className="grid gap-5 lg:grid-cols-2">
                <AdminEditorField label={copy.form.eyebrowEn} isRtl={isRtl}>
                  <Input
                    name="eyebrow"
                    defaultValue={collection?.eyebrow ?? ""}
                    placeholder={locale === "ar" ? "EDITORIAL CAPSULE" : "EDITORIAL CAPSULE"}
                    dir="ltr"
                  />
                </AdminEditorField>
                <AdminEditorField label={copy.form.eyebrowAr} isRtl={isRtl}>
                  <Input
                    name="eyebrow_ar"
                    defaultValue={collection?.eyebrowAr ?? ""}
                    placeholder={locale === "ar" ? "كبسولة تحريرية" : "كبسولة تحريرية"}
                    dir="rtl"
                  />
                </AdminEditorField>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <AdminEditorField label={copy.form.highlightEn} isRtl={isRtl}>
                  <Textarea
                    name="highlight"
                    defaultValue={collection?.highlight ?? ""}
                    className="min-h-28"
                    placeholder={
                      locale === "ar"
                        ? "Short editorial note for the collection."
                        : "Short editorial note for the collection."
                    }
                    dir="ltr"
                  />
                </AdminEditorField>
                <AdminEditorField label={copy.form.highlightAr} isRtl={isRtl}>
                  <Textarea
                    name="highlight_ar"
                    defaultValue={collection?.highlightAr ?? ""}
                    className="min-h-28"
                    placeholder={
                      locale === "ar"
                        ? "ملاحظة عربية قصيرة تبرز المجموعة."
                        : "ملاحظة عربية قصيرة تبرز المجموعة."
                    }
                    dir="rtl"
                  />
                </AdminEditorField>
              </div>

              <AdminEditorField label={copy.form.tone} isRtl={isRtl}>
                <select
                  name="tone"
                  defaultValue={collection?.tone ?? "obsidian"}
                  className={adminSelectClassName}
                >
                  {(["obsidian", "stone", "bronze", "pearl"] as const).map((tone) => (
                    <option key={tone} value={tone} className="bg-[#090909] text-white">
                      {copy.tones[tone]}
                    </option>
                  ))}
                </select>
              </AdminEditorField>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="showroom-panel p-6 md:p-7">
            <AdminEditorSectionHeading title={copy.form.publishingState} isRtl={isRtl} />
            <div className="mt-5 flex flex-wrap gap-2">
              <AdminProductStateBadge
                label={collection?.isActive ? copy.card.active : copy.card.inactive}
                active={collection?.isActive ?? false}
                tone="success"
              />
              <AdminProductStateBadge
                label={collection?.isFeatured ? copy.card.featured : copy.card.standard}
                active={collection?.isFeatured ?? false}
                tone="accent"
              />
            </div>

            <div className="mt-5 space-y-4">
              <AdminEditorCheckboxField
                name="is_active"
                label={copy.form.active}
                hint={copy.form.activeHint}
                defaultChecked={collection?.isActive ?? true}
                isRtl={isRtl}
              />
              <AdminEditorCheckboxField
                name="is_featured"
                label={copy.form.featured}
                hint={copy.form.featuredHint}
                defaultChecked={collection?.isFeatured ?? false}
                isRtl={isRtl}
              />
            </div>

            <Button type="submit" size="lg" className="mt-6 w-full">
              {isCreateMode ? copy.form.create : copy.form.save}
            </Button>
          </section>

          <section className="luxury-muted-panel p-5">
            <AdminEditorSectionHeading title={copy.form.editorNote} isRtl={isRtl} />
            <p className="mt-4 text-sm leading-7 text-white/56">{copy.form.editorBody}</p>
          </section>

          {collection ? (
            <section className="luxury-muted-panel p-5">
              <AdminEditorSectionHeading title={copy.form.record} isRtl={isRtl} />
              <div className="mt-5 space-y-3 text-sm text-white/58">
                <RecordRow
                  label={copy.card.products}
                  value={String(collection.productCount)}
                />
                <RecordRow label={copy.form.created} value={collection.createdAt} />
                <RecordRow label={copy.form.updated} value={collection.updatedAt} />
              </div>
            </section>
          ) : null}
        </aside>
      </form>
    </div>
  );
}

function RecordRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <span className="text-right text-white/74">{value}</span>
    </div>
  );
}
