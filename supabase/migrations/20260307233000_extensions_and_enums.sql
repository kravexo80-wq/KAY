create extension if not exists pgcrypto with schema extensions;
create extension if not exists citext with schema extensions;

create type public.app_role as enum ('customer', 'admin');
create type public.cart_status as enum (
  'active',
  'converted',
  'abandoned',
  'expired'
);
create type public.order_status as enum (
  'pending',
  'confirmed',
  'processing',
  'fulfilled',
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
);
create type public.payment_status as enum (
  'pending',
  'authorized',
  'paid',
  'partially_refunded',
  'refunded',
  'failed',
  'cancelled'
);
create type public.product_image_tone as enum (
  'obsidian',
  'stone',
  'bronze',
  'pearl'
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;
