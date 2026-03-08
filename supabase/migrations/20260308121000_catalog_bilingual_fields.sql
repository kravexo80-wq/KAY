alter table public.categories
  add column if not exists name_ar text,
  add column if not exists description_ar text;

alter table public.collections
  add column if not exists name_ar text,
  add column if not exists eyebrow_ar text,
  add column if not exists description_ar text,
  add column if not exists highlight_ar text;

alter table public.products
  add column if not exists name_ar text,
  add column if not exists short_description_ar text,
  add column if not exists description_ar text,
  add column if not exists story_ar text,
  add column if not exists tags_ar text[],
  add column if not exists materials_ar text[],
  add column if not exists fabric_notes_ar text[],
  add column if not exists care_notes_ar text[],
  add column if not exists fit_notes_ar text[],
  add column if not exists specs_ar jsonb,
  add column if not exists viewer_360_label_ar text,
  add column if not exists viewer_360_description_ar text,
  add column if not exists viewer_360_note_ar text,
  add column if not exists shipping_lead_time_ar text,
  add column if not exists shipping_delivery_ar text,
  add column if not exists shipping_returns_ar text,
  add column if not exists shipping_presentation_ar text;

alter table public.product_images
  add column if not exists alt_text_ar text,
  add column if not exists label_ar text,
  add column if not exists angle_ar text,
  add column if not exists note_ar text;
