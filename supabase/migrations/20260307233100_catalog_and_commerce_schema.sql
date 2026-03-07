create sequence if not exists public.order_number_seq
  increment by 1
  minvalue 1000
  start with 1000;

create or replace function public.generate_order_number()
returns text
language plpgsql
set search_path = public
as $$
declare
  next_value bigint;
begin
  next_value := nextval('public.order_number_seq');

  return 'KRV-' || to_char(timezone('utc', now()), 'YYYY') || '-' || lpad(next_value::text, 6, '0');
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email extensions.citext unique,
  first_name text,
  last_name text,
  display_name text,
  avatar_url text,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint categories_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  eyebrow text not null default '',
  description text not null default '',
  highlight text not null default '',
  tone public.product_image_tone not null default 'obsidian',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint collections_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete restrict,
  collection_id uuid references public.collections (id) on delete set null,
  name text not null,
  slug text not null unique,
  short_description text not null default '',
  description text not null default '',
  story text not null default '',
  base_price numeric(10, 2) not null,
  currency_code char(3) not null default 'USD',
  tags text[] not null default '{}'::text[],
  materials text[] not null default '{}'::text[],
  fabric_notes text[] not null default '{}'::text[],
  care_notes text[] not null default '{}'::text[],
  fit_notes text[] not null default '{}'::text[],
  specs jsonb not null default '[]'::jsonb,
  limited_edition boolean not null default false,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  viewer_360_enabled boolean not null default false,
  viewer_360_label text not null default '360 showroom view',
  viewer_360_description text not null default '',
  viewer_360_note text not null default '',
  shipping_lead_time text not null default '',
  shipping_delivery text not null default '',
  shipping_returns text not null default '',
  shipping_presentation text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint products_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint products_base_price_positive check (base_price >= 0),
  constraint products_specs_array check (jsonb_typeof(specs) = 'array')
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  image_url text,
  storage_path text,
  alt_text text not null default '',
  label text not null,
  angle text not null default '',
  note text not null default '',
  tone public.product_image_tone not null default 'obsidian',
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  constraint product_images_product_id_sort_order_key unique (product_id, sort_order)
);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  sku text not null unique,
  size text not null,
  color text,
  price_override numeric(10, 2),
  stock_quantity integer not null default 0,
  is_active boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint product_variants_price_override_positive check (
    price_override is null or price_override >= 0
  ),
  constraint product_variants_stock_non_negative check (stock_quantity >= 0),
  constraint product_variants_size_not_blank check (btrim(size) <> '')
);

create table public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  guest_token uuid,
  status public.cart_status not null default 'active',
  currency_code char(3) not null default 'USD',
  expires_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint carts_identity_present check (user_id is not null or guest_token is not null)
);

create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts (id) on delete cascade,
  product_variant_id uuid not null references public.product_variants (id) on delete restrict,
  quantity integer not null default 1,
  unit_price numeric(10, 2) not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint cart_items_quantity_positive check (quantity > 0),
  constraint cart_items_unit_price_positive check (unit_price >= 0),
  constraint cart_items_cart_variant_key unique (cart_id, product_variant_id)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  cart_id uuid references public.carts (id) on delete set null,
  order_number text not null unique default public.generate_order_number(),
  status public.order_status not null default 'pending',
  payment_status public.payment_status not null default 'pending',
  currency_code char(3) not null default 'USD',
  customer_email extensions.citext not null,
  subtotal_amount numeric(10, 2) not null,
  shipping_amount numeric(10, 2) not null default 0,
  total_amount numeric(10, 2) not null,
  shipping_address jsonb not null default '{}'::jsonb,
  billing_address jsonb not null default '{}'::jsonb,
  notes text not null default '',
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  paid_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint orders_subtotal_non_negative check (subtotal_amount >= 0),
  constraint orders_shipping_non_negative check (shipping_amount >= 0),
  constraint orders_total_non_negative check (total_amount >= 0),
  constraint orders_shipping_address_object check (jsonb_typeof(shipping_address) = 'object'),
  constraint orders_billing_address_object check (jsonb_typeof(billing_address) = 'object')
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  product_variant_id uuid references public.product_variants (id) on delete set null,
  product_name text not null,
  product_slug text not null,
  sku text,
  size text,
  color text,
  quantity integer not null,
  unit_price numeric(10, 2) not null,
  line_total numeric(12, 2) generated always as ((quantity::numeric * unit_price)) stored,
  product_snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  constraint order_items_quantity_positive check (quantity > 0),
  constraint order_items_unit_price_positive check (unit_price >= 0),
  constraint order_items_snapshot_object check (jsonb_typeof(product_snapshot) = 'object')
);

create or replace function public.sync_profile_from_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
begin
  insert into public.profiles (
    id,
    email,
    first_name,
    last_name,
    display_name,
    avatar_url
  )
  values (
    new.id,
    new.email,
    nullif(trim(coalesce(new.raw_user_meta_data ->> 'first_name', '')), ''),
    nullif(trim(coalesce(new.raw_user_meta_data ->> 'last_name', '')), ''),
    nullif(
      trim(
        coalesce(
          new.raw_user_meta_data ->> 'display_name',
          new.raw_user_meta_data ->> 'full_name',
          ''
        )
      ),
      ''
    ),
    nullif(trim(coalesce(new.raw_user_meta_data ->> 'avatar_url', '')), '')
  )
  on conflict (id) do update
  set
    email = excluded.email,
    first_name = excluded.first_name,
    last_name = excluded.last_name,
    display_name = excluded.display_name,
    avatar_url = excluded.avatar_url,
    updated_at = timezone('utc', now());

  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.owns_cart(cart_uuid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.carts
    where id = cart_uuid and user_id = auth.uid()
  );
$$;

create or replace function public.owns_order(order_uuid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.orders
    where id = order_uuid and user_id = auth.uid()
  );
$$;

create or replace function public.guard_profile_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.is_admin() then
    return new;
  end if;

  if new.role is distinct from old.role then
    raise exception 'Role changes are restricted to administrators.';
  end if;

  if new.email is distinct from old.email then
    raise exception 'Email changes must be handled through Supabase Auth.';
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_synced on auth.users;
create trigger on_auth_user_synced
after insert or update on auth.users
for each row
execute function public.sync_profile_from_auth_user();

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger categories_set_updated_at
before update on public.categories
for each row
execute function public.set_updated_at();

create trigger collections_set_updated_at
before update on public.collections
for each row
execute function public.set_updated_at();

create trigger products_set_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

create trigger product_variants_set_updated_at
before update on public.product_variants
for each row
execute function public.set_updated_at();

create trigger carts_set_updated_at
before update on public.carts
for each row
execute function public.set_updated_at();

create trigger cart_items_set_updated_at
before update on public.cart_items
for each row
execute function public.set_updated_at();

create trigger orders_set_updated_at
before update on public.orders
for each row
execute function public.set_updated_at();

create trigger profiles_guard_update
before update on public.profiles
for each row
execute function public.guard_profile_update();

create index categories_active_sort_idx
  on public.categories (is_active, sort_order, name);

create index categories_featured_idx
  on public.categories (is_featured)
  where is_featured = true;

create index collections_active_sort_idx
  on public.collections (is_active, sort_order, name);

create index collections_featured_idx
  on public.collections (is_featured)
  where is_featured = true;

create index products_active_featured_idx
  on public.products (is_active, is_featured, created_at desc);

create index products_category_id_idx
  on public.products (category_id);

create index products_collection_id_idx
  on public.products (collection_id);

create index products_slug_active_idx
  on public.products (slug, is_active);

create index product_images_product_id_sort_order_idx
  on public.product_images (product_id, sort_order);

create unique index product_images_primary_per_product_idx
  on public.product_images (product_id)
  where is_primary = true;

create index product_variants_product_id_active_position_idx
  on public.product_variants (product_id, is_active, position);

create unique index product_variants_product_size_color_key
  on public.product_variants (
    product_id,
    lower(size),
    lower(coalesce(color, ''))
  );

create unique index carts_active_user_key
  on public.carts (user_id)
  where status = 'active' and user_id is not null;

create unique index carts_active_guest_key
  on public.carts (guest_token)
  where status = 'active' and guest_token is not null;

create index carts_user_status_idx
  on public.carts (user_id, status, updated_at desc);

create index cart_items_cart_id_idx
  on public.cart_items (cart_id);

create index cart_items_variant_id_idx
  on public.cart_items (product_variant_id);

create index orders_user_created_at_idx
  on public.orders (user_id, created_at desc);

create index orders_status_payment_created_at_idx
  on public.orders (status, payment_status, created_at desc);

create index orders_customer_email_idx
  on public.orders (customer_email);

create index order_items_order_id_idx
  on public.order_items (order_id);

create index order_items_product_slug_idx
  on public.order_items (product_slug);

grant usage, select on sequence public.order_number_seq to authenticated, service_role;
grant execute on function public.generate_order_number() to authenticated, service_role;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.owns_cart(uuid) to authenticated;
grant execute on function public.owns_order(uuid) to authenticated;
