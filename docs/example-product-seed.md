# Example Product Seed

Use the `noor-garden-abaya` example in [supabase/seed.sql](/c:/Users/saqer/OneDrive/Desktop/kravexo/supabase/seed.sql) as the pattern for adding products.

## 1. Add the image file

Place the image in `public/testing/products/<product-slug>/`.

Example:

```text
public/testing/products/noor-garden-abaya/noor-garden-abaya-main.jpeg
```

That gives you a stable public path you can use in `product_images.image_url`:

```text
/testing/products/noor-garden-abaya/noor-garden-abaya-main.jpeg
```

## 2. Add the product row

In the `insert into public.products (...) values (...)` block:

- set the `category_id` from a category slug
- set the `collection_id` from a collection slug
- choose a unique `slug`
- add English and Arabic copy
- set price, notes, specs, and publishing flags

Example product slug:

```text
noor-garden-abaya
```

## 3. Add product images

In the `public.product_images` seed block:

- connect the image to the product by slug
- set `image_url` to the public image path
- set `sort_order`
- mark one image as `is_primary = true`

Minimal example:

```sql
(
  (select id from public.products where slug = 'noor-garden-abaya'),
  '/testing/products/noor-garden-abaya/noor-garden-abaya-main.jpeg',
  null,
  'Noor Garden Abaya front view',
  'عباية نور جاردن من الأمام',
  'Hero frame',
  'اللقطة الرئيسية',
  'Front studio',
  'الواجهة الأمامية',
  'Editorial floral finish',
  'لمسة زهرية تحريرية',
  'pearl',
  0,
  true
)
```

## 4. Add variants

In the `public.product_variants` block add one row per size:

- unique `sku`
- `size`
- optional `color`
- `stock_quantity`
- `position`

Example sizes:

```text
S / M / L / XL
```

## 5. Apply the seed

After editing `supabase/seed.sql`, run your normal Supabase seed flow so the product appears in the storefront.

If you prefer the admin panel later, the same shape still applies:

- product record
- one or more product images
- one or more product variants

The difference is only whether you insert with SQL or through the admin UI.
