import Link from "next/link";

import { startCheckoutAction } from "@/lib/stripe/actions";
import { formatPrice } from "@/lib/utils";

import { Button } from "../ui/button";

interface CheckoutSummaryPanelProps {
  itemCount: number;
  subtotal: number;
  shippingAmount: number;
  total: number;
}

export function CheckoutSummaryPanel({
  itemCount,
  subtotal,
  shippingAmount,
  total,
}: CheckoutSummaryPanelProps) {
  return (
    <aside className="showroom-panel h-fit p-6 md:p-7">
      <p className="eyebrow">Stripe checkout</p>
      <h2 className="mt-4 text-3xl leading-none text-white">
        Complete payment in a secure Stripe session.
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/58">
        Pricing is derived server-side from your authenticated cart. Stripe will
        collect shipping and billing details without exposing secret keys or
        trusting any client-submitted totals.
      </p>

      <div className="mt-6 space-y-4 text-sm text-white/62">
        <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
          <span>Pieces</span>
          <span className="text-white/76">{itemCount}</span>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
          <span>Subtotal</span>
          <span className="text-white/76">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-white/8 bg-white/[0.03] px-4 py-4">
          <span>Shipping</span>
          <span className="text-white/76">
            {shippingAmount > 0
              ? formatPrice(shippingAmount)
              : "Complimentary in this phase"}
          </span>
        </div>
        <div className="hairline" />
        <div className="flex items-center justify-between gap-4 text-base text-white">
          <span>Estimated total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <form action={startCheckoutAction} className="mt-6">
        <Button size="lg" className="w-full" type="submit">
          Open secure checkout
        </Button>
      </form>
      <Button
        asChild
        variant="secondary"
        size="lg"
        className="mt-3 w-full"
      >
        <Link href="/cart">Return to cart</Link>
      </Button>

      <div className="showroom-subpanel mt-6 px-4 py-4">
        <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
          Order pipeline
        </p>
        <p className="mt-2 text-sm leading-7 text-white/58">
          A pending order record is prepared before redirect. Stripe webhooks
          then confirm payment, sync address snapshots, and convert the cart once
          checkout succeeds.
        </p>
      </div>
    </aside>
  );
}
