import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { CartFeedbackPanel } from "@/components/storefront/cart-feedback-panel";
import { CartLineItem } from "@/components/storefront/cart-line-item";
import { CartSummaryPanel } from "@/components/storefront/cart-summary-panel";
import { Button } from "@/components/ui/button";
import { getCartDetails } from "@/lib/supabase/cart";

export const metadata: Metadata = {
  title: "Cart",
};

export const dynamic = "force-dynamic";

interface CartPageProps {
  searchParams: Promise<{
    cartMessage?: string;
    cartError?: string;
  }>;
}

export default async function CartPage({ searchParams }: CartPageProps) {
  const { cartMessage, cartError } = await searchParams;
  const cartResult = await getCartDetails();
  const cart = cartResult.data;
  const isAuthenticated = cartResult.status !== "unauthenticated";
  const hasItems = cart.items.length > 0;

  const title = !isAuthenticated
    ? "Sign in to access your saved showroom selections."
    : hasItems
      ? "Your selected pieces are held in the Kravexo cart."
      : "Your cart is ready for its first showroom piece.";
  const description = !isAuthenticated
    ? "Cart persistence is live for authenticated customers. Sign in to review saved pieces, adjust quantities, and carry your selections forward to checkout."
    : hasItems
      ? "Review your chosen variants, confirm available stock, and move the current selection into secure Stripe Checkout when the basket feels right."
      : "Your authenticated cart is active and ready. Once you add a product variant from a product page, it will appear here with live stock-aware quantity controls.";
  const note = !isAuthenticated
    ? "Guest cart support is intentionally reserved for a later phase. This first implementation keeps cart persistence clean and account-scoped."
    : hasItems
      ? "Quantities update against live variant stock, and successful Stripe checkout now creates a real order record in Supabase."
      : "The cart table and item persistence are now live in Supabase, even when the current basket is empty.";

  const introActions = !isAuthenticated ? (
    <>
      <Button asChild>
        <Link href="/login?next=/cart">Login</Link>
      </Button>
      <Button asChild variant="secondary">
        <Link href="/shop">Continue shopping</Link>
      </Button>
    </>
  ) : (
    <Button asChild variant="secondary">
      <Link href="/shop">Continue shopping</Link>
    </Button>
  );

  return (
    <div className="space-y-8 pb-16 md:space-y-10 md:pb-24">
      <PageIntro
        eyebrow="Cart"
        title={title}
        description={description}
        note={note}
        actions={introActions}
      />

      {(cartMessage || cartError) && (
        <section className="section-frame grid gap-4">
          {cartError ? (
            <CartFeedbackPanel
              title="Cart issue"
              description={cartError}
              tone="error"
            />
          ) : null}
          {cartMessage ? (
            <CartFeedbackPanel
              title="Cart update"
              description={cartMessage}
            />
          ) : null}
        </section>
      )}

      {cartResult.status === "unauthenticated" ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow="Cart access"
            title="Login to open your saved cart."
            description="Add-to-cart is already routed through authenticated Supabase carts. Sign in to review persisted selections and prepare for checkout in the next phase."
            action={
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/login?next=/cart">Login</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/signup?next=/cart">Create account</Link>
                </Button>
              </div>
            }
          />
        </section>
      ) : null}

      {cartResult.status === "unconfigured" ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow="Cart state"
            title="Cart persistence is not configured yet."
            description={
              cartResult.error ??
              "Provide the Supabase environment values for this deployment to enable live cart reads and mutations."
            }
          />
        </section>
      ) : null}

      {cartResult.status === "error" ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow="Cart state"
            title="The cart could not be loaded right now."
            description={
              cartResult.error ??
              "Please retry shortly. Existing cart data remains stored if the request failed transiently."
            }
          />
        </section>
      ) : null}

      {cartResult.status === "ready" && !hasItems ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow="Cart state"
            title="Your cart is currently empty."
            description="Browse the showroom, choose a size from any product page, and your authenticated cart will persist that selection here."
            action={
              <Button asChild>
                <Link href="/shop">Explore the collection</Link>
              </Button>
            }
          />
        </section>
      ) : null}

      {cartResult.status === "ready" && hasItems ? (
        <section className="section-frame grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <CartLineItem key={item.id} item={item} />
            ))}
          </div>

          <CartSummaryPanel
            itemCount={cart.itemCount}
            subtotal={cart.subtotal}
          />
        </section>
      ) : null}
    </div>
  );
}
