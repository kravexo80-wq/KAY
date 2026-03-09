import type { ReactNode } from "react";

import type { AdminCategoryEditorData } from "@/lib/supabase/admin-categories";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAdminTaxonomyCopy } from "@/lib/i18n/admin-taxonomy-copy";
import type { Locale } from "@/lib/i18n/config";

import { AdminProductStateBadge } from "./admin-product-state-badge";
import {
  AdminEditorCheckboxField,
  AdminEditorField,
  AdminEditorSectionHeading,
} from "./admin-editor-primitives";

interface AdminCategoryFormProps {
  locale: Locale;
  mode: "create" | "edit";
  category?: AdminCategoryEditorData | null;
  action: (formData: FormData) => void | Promise<void>;
  notice?: {
    tone: "success" | "error";
    message: string;
  } | null;
}

export function AdminCategoryForm({
  locale,
  mode,
  category,
  action,
  notice,
}: AdminCategoryFormProps) {
  const copy = getAdminTaxonomyCopy(locale).categories;
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
        {category ? <input type="hidden" name="category_id" value={category.id} /> : null}

        <div className="space-y-6">
          <section className="luxury-panel p-6 md:p-8">
            <AdminEditorSectionHeading title={copy.form.identity} isRtl={isRtl} />
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <AdminEditorField label={copy.form.nameEn} isRtl={isRtl}>
                <Input
                  name="name"
                  defaultValue={category?.name ?? ""}
                  placeholder={locale === "ar" ? "Evening Abayas" : "Evening Abayas"}
                  dir="ltr"
                />
              </AdminEditorField>
              <AdminEditorField label={copy.form.nameAr} isRtl={isRtl}>
                <Input
                  name="name_ar"
                  defaultValue={category?.nameAr ?? ""}
                  placeholder={locale === "ar" ? "عبايات السهرة" : "عبايات السهرة"}
                  dir="rtl"
                />
              </AdminEditorField>
              <AdminEditorField label={copy.form.slug} hint={copy.form.slugHint} isRtl={isRtl}>
                <Input
                  name="slug"
                  defaultValue={category?.slug ?? ""}
                  placeholder="evening-abayas"
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
                  defaultValue={category?.sortOrder ?? 0}
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
                  defaultValue={category?.description ?? ""}
                  placeholder={
                    locale === "ar"
                      ? "وصف واضح للفئة داخل المتجر."
                      : "Clear storefront description for this category."
                  }
                  dir="ltr"
                />
              </AdminEditorField>
              <AdminEditorField label={copy.form.descriptionAr} isRtl={isRtl}>
                <Textarea
                  name="description_ar"
                  defaultValue={category?.descriptionAr ?? ""}
                  placeholder={
                    locale === "ar"
                      ? "وصف عربي واضح لهذه الفئة داخل المتجر."
                      : "وصف عربي واضح لهذه الفئة داخل المتجر."
                  }
                  dir="rtl"
                />
              </AdminEditorField>
            </div>
          </section>

          <section className="luxury-panel p-6 md:p-8">
            <AdminEditorSectionHeading title={copy.form.presentation} isRtl={isRtl} />
            <div className="mt-6 showroom-subpanel p-5">
              <p className="eyebrow">{copy.form.presentationNoteTitle}</p>
              <p className="mt-3 text-sm leading-7 text-white/48">
                {copy.form.presentationNoteBody}
              </p>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="showroom-panel p-6 md:p-7">
            <AdminEditorSectionHeading title={copy.form.publishingState} isRtl={isRtl} />
            <div className="mt-5 flex flex-wrap gap-2">
              <AdminProductStateBadge
                label={category?.isActive ? copy.card.active : copy.card.inactive}
                active={category?.isActive ?? false}
                tone="success"
              />
            </div>

            <div className="mt-5 space-y-4">
              <AdminEditorCheckboxField
                name="is_active"
                label={copy.form.active}
                hint={copy.form.activeHint}
                defaultChecked={category?.isActive ?? true}
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

          {category ? (
            <section className="luxury-muted-panel p-5">
              <AdminEditorSectionHeading title={copy.form.record} isRtl={isRtl} />
              <div className="mt-5 space-y-3 text-sm text-white/58">
                <RecordRow
                  label={copy.card.products}
                  value={String(category.productCount)}
                />
                <RecordRow label={copy.form.created} value={category.createdAt} />
                <RecordRow label={copy.form.updated} value={category.updatedAt} />
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
