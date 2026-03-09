import Link from "next/link";

import { startCheckoutAction } from "@/lib/stripe/actions";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { formatPrice } from "@/lib/utils";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface CheckoutSummaryPanelProps {
  locale: Locale;
  copy: Dictionary["checkout"]["summary"];
  shippingCopy: Dictionary["checkout"]["shipping"];
  itemCount: number;
  subtotal: number;
  shippingAmount: number;
  total: number;
  shippingDetails: {
    fullName: string;
    phoneNumber: string;
    country: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    postcode: string;
  };
  isRtl?: boolean;
}

export function CheckoutSummaryPanel({
  locale,
  copy,
  shippingCopy,
  itemCount,
  subtotal,
  shippingAmount,
  total,
  shippingDetails,
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

      <form action={startCheckoutAction} className="mt-6 space-y-4">
        <div className="showroom-subpanel px-4 py-4">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
            {shippingCopy.eyebrow}
          </p>
          <h3 className="mt-3 text-lg leading-none text-white">{shippingCopy.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/58">{shippingCopy.description}</p>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {shippingCopy.fullName}
              </p>
              <Input
                name="shipping_full_name"
                defaultValue={shippingDetails.fullName}
                placeholder={shippingCopy.fullName}
                autoComplete="shipping name"
                className="text-start"
                required
              />
            </div>

            <div className="space-y-2">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {shippingCopy.phoneNumber}
              </p>
              <Input
                type="tel"
                name="shipping_phone"
                defaultValue={shippingDetails.phoneNumber}
                placeholder={shippingCopy.phoneNumber}
                autoComplete="tel"
                className="text-start"
                required
              />
            </div>

            <div className="space-y-2">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {shippingCopy.country}
              </p>
              <Input
                name="shipping_country"
                defaultValue={shippingDetails.country}
                placeholder={shippingCopy.country}
                autoComplete="shipping country"
                className="text-start"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {shippingCopy.addressLine1}
              </p>
              <Input
                name="shipping_address_line1"
                defaultValue={shippingDetails.addressLine1}
                placeholder={shippingCopy.addressLine1}
                autoComplete="shipping address-line1"
                className="text-start"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                  {shippingCopy.addressLine2}
                </p>
                <span className="text-[0.62rem] uppercase tracking-[0.24em] text-white/24">
                  {shippingCopy.optional}
                </span>
              </div>
              <Input
                name="shipping_address_line2"
                defaultValue={shippingDetails.addressLine2}
                placeholder={shippingCopy.addressLine2}
                autoComplete="shipping address-line2"
                className="text-start"
              />
            </div>

            <div className="space-y-2">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {shippingCopy.city}
              </p>
              <Input
                name="shipping_city"
                defaultValue={shippingDetails.city}
                placeholder={shippingCopy.city}
                autoComplete="shipping address-level2"
                className="text-start"
                required
              />
            </div>

            <div className="space-y-2">
              <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
                {shippingCopy.postcode}
              </p>
              <Input
                name="shipping_postcode"
                defaultValue={shippingDetails.postcode}
                placeholder={shippingCopy.postcode}
                autoComplete="shipping postal-code"
                className="text-start"
                required
              />
            </div>
          </div>
        </div>

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
