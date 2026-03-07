import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Checkout Cancelled",
};

type CheckoutCancelPageProps = {
  searchParams: Promise<{
    order_id?: string;
  }>;
};

export default async function CheckoutCancelPage({
  searchParams,
}: CheckoutCancelPageProps) {
  await requireAuth("/checkout/cancel");
  const { order_id: orderId } = await searchParams;

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow="Checkout cancelled"
        title="Your checkout session was left before payment confirmation."
        description="The cart remains intact, so you can return to it, adjust your pieces, or restart Stripe Checkout when ready."
        note={
          orderId
            ? `A pending order reference exists for this attempt (${orderId}). If you restart checkout, a fresh Stripe session will be created from the current cart state.`
            : "No payment was captured. The current cart remains available in your account."
        }
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/cart">Return to cart</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/checkout">Try checkout again</Link>
            </Button>
          </div>
        }
      />

      <section className="section-frame">
        <CatalogStatePanel
          eyebrow="Checkout state"
          title="No payment was recorded."
          description="Kravexo only converts the cart and confirms the order after Stripe reports a successful payment event. Until then, your selections remain in the authenticated cart."
        />
      </section>
    </div>
  );
}
