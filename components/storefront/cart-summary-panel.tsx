import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface CartSummaryPanelProps {
  itemCount: number;
  subtotal: number;
}

export function CartSummaryPanel({
  itemCount,
  subtotal,
}: CartSummaryPanelProps) {
  return (
    <aside className="showroom-panel h-fit p-6 md:p-7">
      <p className="eyebrow">Order summary</p>
      <h2 className="mt-4 text-3xl leading-none text-white">
        Held in the showroom.
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/58">
        Your selections are saved to your authenticated account and can now move
        into a secure Stripe Checkout session without changing the cart
        structure.
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
          <span className="text-white/58">Calculated at checkout</span>
        </div>
        <div className="hairline" />
        <div className="flex items-center justify-between gap-4 text-base text-white">
          <span>Estimated total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>

      <Button asChild size="lg" className="mt-6 w-full">
        <Link href="/checkout">Proceed to checkout</Link>
      </Button>
      <Button
        asChild
        variant="secondary"
        size="lg"
        className="mt-3 w-full"
      >
        <Link href="/shop">Continue shopping</Link>
      </Button>

      <div className="showroom-subpanel mt-6 px-4 py-4">
        <p className="text-[0.62rem] uppercase tracking-[0.24em] text-white/32">
          Shipping note
        </p>
        <p className="mt-2 text-sm leading-7 text-white/58">
          Address collection and payment confirmation now continue inside
          Stripe Checkout, while the resulting order syncs back into Supabase.
        </p>
      </div>
    </aside>
  );
}
