import Link from "next/link";

import { localizeHref, type Locale } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import { formatPrice } from "@/lib/utils";

import { ProductMediaFrame } from "./product-media-frame";

interface CheckoutLineItemProps {
  locale: Locale;
  item: {
    id: string;
    productName: string;
    productSlug: string;
    categoryName: string;
    shortDescription: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    size: string;
    color: string | null;
    sku: string;
    mediaLabel: string | null;
    mediaAngle: string | null;
  };
}

export function CheckoutLineItem({ item, locale }: CheckoutLineItemProps) {
  const copy = getExtendedUiCopy(locale).checkoutLineItem;

  return (
    <article className="luxury-panel overflow-hidden p-4 md:p-5">
      <div className="grid gap-5 lg:grid-cols-[170px_minmax(0,1fr)_170px] lg:items-start">
        <ProductMediaFrame
          media={{
            id: item.id,
            label: item.mediaLabel ?? item.productName,
            angle: item.mediaAngle ?? copy.studioAngle,
            note: copy.checkoutPresentation,
            tone: "obsidian",
          }}
          className="aspect-square w-full rounded-[1.6rem]"
          chrome="minimal"
          emphasis="card"
        />

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-white/42">
              {item.categoryName}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-white/42">
              {copy.size} {item.size}
            </span>
            {item.color ? (
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em] text-white/42">
                {item.color}
              </span>
            ) : null}
          </div>

          <div>
            <Link
              href={localizeHref(locale, `/products/${item.productSlug}`)}
              className="inline-block text-3xl leading-none text-white transition hover:text-[#f3e7c8] md:text-4xl"
            >
              {item.productName}
            </Link>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/56 md:text-base">
              {item.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[0.62rem] uppercase tracking-[0.24em] text-white/34">
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
              SKU {item.sku}
            </span>
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
              {formatPrice(item.unitPrice, locale)} {copy.each}
            </span>
          </div>
        </div>

        <div className="showroom-subpanel p-4">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
            {copy.quantity}
          </p>
          <p className="mt-3 text-3xl leading-none text-white">{item.quantity}</p>
          <p className="mt-5 text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
            {copy.lineTotal}
          </p>
          <p className="mt-3 text-xl leading-none text-[#f3e7c8]">
            {formatPrice(item.lineTotal, locale)}
          </p>
        </div>
      </div>
    </article>
  );
}
