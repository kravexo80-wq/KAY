alter table public.orders
  add column if not exists inventory_adjusted_at timestamptz;

create or replace function public.finalize_paid_order_inventory(order_uuid uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  locked_order public.orders%rowtype;
  line_item record;
begin
  select *
  into locked_order
  from public.orders
  where id = order_uuid
  for update;

  if not found then
    raise exception 'Order % was not found.', order_uuid;
  end if;

  if locked_order.inventory_adjusted_at is not null then
    return false;
  end if;

  if locked_order.payment_status <> 'paid' then
    raise exception 'Inventory can only be finalized for paid orders.';
  end if;

  if not exists (
    select 1
    from public.order_items
    where order_id = order_uuid
  ) then
    raise exception 'Order % has no order items to fulfill.', order_uuid;
  end if;

  if exists (
    select 1
    from public.order_items
    where order_id = order_uuid
      and product_variant_id is null
  ) then
    raise exception 'Order % contains an item without a product variant reference.', order_uuid;
  end if;

  if exists (
    select 1
    from public.order_items oi
    left join public.product_variants pv on pv.id = oi.product_variant_id
    where oi.order_id = order_uuid
      and pv.id is null
  ) then
    raise exception 'Order % references a product variant that no longer exists.', order_uuid;
  end if;

  for line_item in
    select
      oi.product_variant_id,
      oi.quantity,
      pv.stock_quantity
    from public.order_items oi
    join public.product_variants pv on pv.id = oi.product_variant_id
    where oi.order_id = order_uuid
    order by oi.product_variant_id
    for update of pv
  loop
    if line_item.stock_quantity < line_item.quantity then
      raise exception
        'Insufficient stock for variant % while finalizing order %.',
        line_item.product_variant_id,
        order_uuid;
    end if;
  end loop;

  update public.product_variants pv
  set
    stock_quantity = pv.stock_quantity - oi.quantity,
    updated_at = timezone('utc', now())
  from public.order_items oi
  where oi.order_id = order_uuid
    and oi.product_variant_id = pv.id;

  update public.orders
  set
    inventory_adjusted_at = timezone('utc', now()),
    status = 'confirmed',
    updated_at = timezone('utc', now())
  where id = order_uuid;

  return true;
end;
$$;

create index if not exists orders_inventory_adjusted_at_idx
  on public.orders (inventory_adjusted_at)
  where inventory_adjusted_at is not null;

grant execute on function public.finalize_paid_order_inventory(uuid) to service_role;
