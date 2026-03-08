import Link from "next/link";

import { startCheckoutAction } from "@/lib/stripe/actions";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { formatPrice } from "@/lib/utils";

import { Button } from "../ui/button";

interface CheckoutSummaryPanelProps {
  locale: Locale;
  copy: Dictionary["checkout"]["summary"];
  itemCount: number;
  subtotal: number;
  shippingAmount: number;
  total: number;
  isRtl?: boolean;
}

export function CheckoutSummaryPanel({
  locale,
  copy,
  itemCount,
  subtotal,
  shippingAmount,
  total,
  isRtl = false,
}: CheckoutSummaryPanelProps) {
  return (
    <aside className={`showroom-panel h-fit p-6 md:p-7 ${isRtl ? "text-right" : "text-left"}`}>
      <p className="eyebrow">{copy.eyebrow}</p>
      <h2 className="mt-4 text-3xl leading-none text-white">{copy.title}</h2>
      <p className="mt-4 text-sm leading-7 text-white/58">{copy.description}</p>

      <div className="mt-6 space-y-4 text-sm text-white/62">
        <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
          <span>{copy.pieces}</span>
          <span className="text-white/76">{itemCount}</span>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
          <span>{copy.subtotal}</span>
          <span className="text-white/76">{formatPrice(subtotal, locale)}</span>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
          <span>{copy.shipping}</span>
          <span className="text-white/76">
            {shippingAmount > 0 ? formatPrice(shippingAmount, locale) : copy.shippingFree}
          </span>
        </div>
        <div className="hairline" />
        <div className="flex items-center justify-between gap-4 text-base text-white">
          <span>{copy.total}</span>
          <span>{formatPrice(total, locale)}</span>
        </div>
      </div>

      <form action={startCheckoutAction} className="mt-6">
        <Button size="lg" className="w-full" type="submit">
          {copy.cta}
        </Button>
      </form>
      <Button asChild variant="secondary" size="lg" className="mt-3 w-full">
        <Link href={localizeHref(locale, "/cart")}>{copy.backToCart}</Link>
      </Button>

      <div className="showroom-subpanel mt-6 px-4 py-4">
        <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
          {copy.pipelineTitle}
        </p>
        <p className="mt-2 text-sm leading-7 text-white/58">{copy.pipelineBody}</p>
      </div>
    </aside>
  );
}
