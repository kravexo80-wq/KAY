import Link from "next/link";

import type { OrderLineItem } from "@/lib/supabase/orders";

import { formatPrice } from "@/lib/utils";

interface OrderLineItemsPanelProps {
  items: OrderLineItem[];
}

function buildItemMeta(item: OrderLineItem) {
  return [
    item.size ? `Size ${item.size}` : null,
    item.color ? item.color : null,
    item.sku ? `SKU ${item.sku}` : null,
  ]
    .filter(Boolean)
    .join(" | ");
}

export function OrderLineItemsPanel({ items }: OrderLineItemsPanelProps) {
  return (
    <section className="showroom-panel p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Line items</p>
          <h2 className="mt-4 text-3xl leading-none text-white md:text-4xl">
            Captured at checkout.
          </h2>
        </div>
        <p className="text-sm text-white/46">
          {items.length} line item{items.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => {
          const itemMeta = buildItemMeta(item);
          const mediaStyle = item.imageUrl
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(8,8,9,0.05), rgba(8,8,9,0.72)), url(${item.imageUrl})`,
              }
            : undefined;

          return (
            <article
              key={item.id}
              className="grid gap-4 rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-4 md:grid-cols-[148px_minmax(0,1fr)] md:items-center"
            >
              <div
                className="relative min-h-36 overflow-hidden rounded-[1.4rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.4))] bg-cover bg-center"
                style={mediaStyle}
              >
                <div className="absolute inset-x-4 bottom-4 rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[0.62rem] uppercase tracking-[0.22em] text-white/62 backdrop-blur-sm">
                  Showroom frame
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl leading-none text-white">
                      {item.productName}
                    </h3>
                    {itemMeta ? (
                      <p className="mt-3 text-sm text-white/52">{itemMeta}</p>
                    ) : null}
                  </div>
                  <p className="text-lg text-white/84">
                    {formatPrice(item.lineTotal)}
                  </p>
                </div>
                {item.description ? (
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/56">
                    {item.description}
                  </p>
                ) : null}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/48">
                  <span>Qty {item.quantity}</span>
                  <span>Unit {formatPrice(item.unitPrice)}</span>
                  <Link
                    href={`/products/${item.productSlug}`}
                    className="text-white/64 transition hover:text-white"
                  >
                    View product
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
