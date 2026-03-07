import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/supabase/auth";
import { getCurrentUserOrderByStripeSessionId } from "@/lib/supabase/orders";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Checkout Success",
};

type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

function formatStatusLabel(value: string) {
  return value.replace(/_/g, " ");
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  await requireAuth("/checkout/success");
  const { session_id: sessionId } = await searchParams;
  const order = sessionId
    ? await getCurrentUserOrderByStripeSessionId(sessionId)
    : null;

  if (!order || order.paymentStatus !== "paid") {
    return (
      <div className="space-y-8 pb-16 md:pb-24">
        <PageIntro
          eyebrow="Checkout success"
          title={
            order
              ? `Order ${order.orderNumber} is waiting for payment sync.`
              : "Your payment has been received."
          }
          description="Stripe has returned successfully. Kravexo is finalizing the order record, payment confirmation, and inventory sync now."
          note="If the order details do not appear immediately, refresh shortly. The webhook confirmation can land a moment after the browser returns from Stripe."
          actions={
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/account">Open account</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/shop">Continue shopping</Link>
              </Button>
            </div>
          }
        />

        <section className="section-frame">
          <CatalogStatePanel
            eyebrow="Order sync"
            title="We are confirming your order details."
            description="The order record already exists, but Stripe webhook confirmation has not fully marked it as paid yet. This page will reflect the completed order as soon as that sync finishes."
          />
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow="Checkout success"
        title={`Order ${order.orderNumber} is now in the Kravexo system.`}
        description="Payment confirmation has returned from Stripe and the order is ready for account history, fulfillment tooling, and future delivery updates."
        note="This success view reads the live Supabase order record tied to the Stripe checkout session."
        actions={
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/account">View account</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/shop">Continue shopping</Link>
            </Button>
          </div>
        }
      />

      <section className="section-frame grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="showroom-panel p-6 md:p-8">
          <p className="eyebrow">Order confirmation</p>
          <div className="mt-5 space-y-4 text-sm text-white/60">
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>Order number</span>
              <span className="text-white/78">{order.orderNumber}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>Order status</span>
              <span className="text-white/78">{formatStatusLabel(order.status)}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>Payment status</span>
              <span className="text-white/78">
                {formatStatusLabel(order.paymentStatus)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>Total</span>
              <span className="text-white/78">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        <div className="luxury-muted-panel p-5">
          <p className="eyebrow">Showroom note</p>
          <p className="mt-4 text-sm leading-7 text-white/58">
            The cart will clear after the successful webhook sync and the order is
            already ready for future account history, admin fulfillment review,
            and delivery-status expansion.
          </p>
        </div>
      </section>
    </div>
  );
}
