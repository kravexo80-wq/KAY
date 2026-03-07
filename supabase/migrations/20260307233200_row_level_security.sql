alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.collections enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "profiles_admin_manage"
on public.profiles
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "categories_public_read_active"
on public.categories
for select
to public
using (is_active = true);

create policy "categories_admin_manage"
on public.categories
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "collections_public_read_active"
on public.collections
for select
to public
using (is_active = true);

create policy "collections_admin_manage"
on public.collections
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "products_public_read_active"
on public.products
for select
to public
using (is_active = true);

create policy "products_admin_manage"
on public.products
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "product_images_public_read_active"
on public.product_images
for select
to public
using (
  exists (
    select 1
    from public.products
    where products.id = product_images.product_id
      and products.is_active = true
  )
);

create policy "product_images_admin_manage"
on public.product_images
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "product_variants_public_read_active"
on public.product_variants
for select
to public
using (
  is_active = true
  and exists (
    select 1
    from public.products
    where products.id = product_variants.product_id
      and products.is_active = true
  )
);

create policy "product_variants_admin_manage"
on public.product_variants
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "carts_select_own"
on public.carts
for select
to authenticated
using (auth.uid() = user_id);

create policy "carts_insert_own"
on public.carts
for insert
to authenticated
with check (auth.uid() = user_id and guest_token is null);

create policy "carts_update_own"
on public.carts
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "carts_delete_own"
on public.carts
for delete
to authenticated
using (auth.uid() = user_id);

create policy "carts_admin_manage"
on public.carts
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "cart_items_select_own"
on public.cart_items
for select
to authenticated
using (public.owns_cart(cart_id));

create policy "cart_items_insert_own"
on public.cart_items
for insert
to authenticated
with check (
  public.owns_cart(cart_id)
  and exists (
    select 1
    from public.product_variants
    join public.products on products.id = product_variants.product_id
    where product_variants.id = cart_items.product_variant_id
      and product_variants.is_active = true
      and products.is_active = true
  )
);

create policy "cart_items_update_own"
on public.cart_items
for update
to authenticated
using (public.owns_cart(cart_id))
with check (public.owns_cart(cart_id));

create policy "cart_items_delete_own"
on public.cart_items
for delete
to authenticated
using (public.owns_cart(cart_id));

create policy "cart_items_admin_manage"
on public.cart_items
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "orders_select_own"
on public.orders
for select
to authenticated
using (auth.uid() = user_id);

create policy "orders_admin_manage"
on public.orders
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "order_items_select_own"
on public.order_items
for select
to authenticated
using (public.owns_order(order_id));

create policy "order_items_admin_manage"
on public.order_items
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());
