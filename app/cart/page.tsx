import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/page-intro";
import { ProductMediaFrame } from "@/components/storefront/product-media-frame";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cart",
};

const cartItems = products.slice(0, 2);
const subtotal = cartItems.reduce((total, item) => total + item.price, 0);

export default function CartPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Cart"
        title="A clean basket view ready for checkout logic later."
        description="This placeholder cart emphasizes product imagery, premium spacing, and a strong order summary panel without wiring payments yet."
        note="Stripe checkout, quantity controls, shipping methods, and promo logic are intentionally deferred to the next phase."
      />

      <section className="section-frame grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.slug}
              className="luxury-panel flex flex-col gap-4 p-4 sm:flex-row"
            >
              <ProductMediaFrame
                media={item.gallery[0]}
                className="aspect-square w-full rounded-[1.4rem] sm:w-40"
              />
              <div className="flex flex-1 flex-col justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                    {item.category}
                  </p>
                  <h2 className="mt-2 text-3xl leading-none text-white">
                    {item.name}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/56">
                    {item.shortDescription}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/36">
                    Qty 1
                  </p>
                  <p className="text-sm uppercase tracking-[0.22em] text-white/74">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="luxury-muted-panel h-fit p-6">
          <p className="eyebrow">Order summary</p>
          <div className="mt-5 space-y-4 text-sm text-white/62">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>Calculated later</span>
            </div>
            <div className="hairline" />
            <div className="flex items-center justify-between text-white">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>
          <Button className="mt-6 w-full">Checkout in next phase</Button>
        </aside>
      </section>
    </div>
  );
}
