alter table public.products
  add column if not exists compare_at_price numeric(10, 2);

alter table public.products
  drop constraint if exists products_compare_at_price_positive;

alter table public.products
  add constraint products_compare_at_price_positive
  check (compare_at_price is null or compare_at_price >= 0);
