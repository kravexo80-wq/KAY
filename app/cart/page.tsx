import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { CartFeedbackPanel } from "@/components/storefront/cart-feedback-panel";
import { CartLineItem } from "@/components/storefront/cart-line-item";
import { CartSummaryPanel } from "@/components/storefront/cart-summary-panel";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
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
  const [{ locale, direction, dictionary }, cartResult] = await Promise.all([
    getRequestI18n(),
    getCartDetails(),
  ]);
  const isRtl = direction === "rtl";
  const cart = cartResult.data;
  const isAuthenticated = cartResult.status !== "unauthenticated";
  const hasItems = cart.items.length > 0;

  const title = !isAuthenticated
    ? dictionary.cart.unauthenticatedTitle
    : hasItems
      ? dictionary.cart.activeTitle
      : dictionary.cart.emptyTitle;
  const description = !isAuthenticated
    ? dictionary.cart.unauthenticatedDescription
    : hasItems
      ? dictionary.cart.activeDescription
      : dictionary.cart.emptyDescription;
  const note = !isAuthenticated
    ? dictionary.cart.unauthenticatedNote
    : hasItems
      ? dictionary.cart.activeNote
      : dictionary.cart.emptyNote;

  const introActions = !isAuthenticated ? (
    <>
      <Button asChild>
        <Link href={localizeHref(locale, `/login?next=${encodeURIComponent("/cart")}`)}>
          {dictionary.header.login}
        </Link>
      </Button>
      <Button asChild variant="secondary">
        <Link href={localizeHref(locale, "/shop")}>
          {dictionary.common.continueShopping}
        </Link>
      </Button>
    </>
  ) : (
    <Button asChild variant="secondary">
      <Link href={localizeHref(locale, "/shop")}>
        {dictionary.common.continueShopping}
      </Link>
    </Button>
  );

  return (
    <div className="space-y-8 pb-16 md:space-y-10 md:pb-24">
      <PageIntro
        eyebrow={dictionary.cart.eyebrow}
        title={title}
        description={description}
        note={note}
        noteLabel={dictionary.common.showroomNote}
        isRtl={isRtl}
        actions={introActions}
      />

      {(cartMessage || cartError) && (
        <section className="section-frame grid gap-4">
          {cartError ? (
            <CartFeedbackPanel
              title={dictionary.cart.feedbackError}
              description={cartError}
              tone="error"
            />
          ) : null}
          {cartMessage ? (
            <CartFeedbackPanel
              title={dictionary.cart.feedbackSuccess}
              description={cartMessage}
            />
          ) : null}
        </section>
      )}

      {cartResult.status === "unauthenticated" ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow={dictionary.cart.accessEyebrow}
            title={dictionary.cart.accessTitle}
            description={dictionary.cart.accessDescription}
            action={
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={localizeHref(locale, `/login?next=${encodeURIComponent("/cart")}`)}>
                    {dictionary.header.login}
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link
                    href={localizeHref(locale, `/signup?next=${encodeURIComponent("/cart")}`)}
                  >
                    {dictionary.common.createAccount}
                  </Link>
                </Button>
              </div>
            }
          />
        </section>
      ) : null}

      {cartResult.status === "unconfigured" ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow={dictionary.cart.stateEyebrow}
            title={dictionary.cart.unconfiguredTitle}
            description={cartResult.error ?? dictionary.cart.unconfiguredDescription}
          />
        </section>
      ) : null}

      {cartResult.status === "error" ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow={dictionary.cart.stateEyebrow}
            title={dictionary.cart.errorTitle}
            description={cartResult.error ?? dictionary.cart.errorDescription}
          />
        </section>
      ) : null}

      {cartResult.status === "ready" && !hasItems ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow={dictionary.cart.stateEyebrow}
            title={dictionary.cart.emptyStateTitle}
            description={dictionary.cart.emptyStateDescription}
            action={
              <Button asChild>
                <Link href={localizeHref(locale, "/shop")}>
                  {dictionary.common.exploreCollection}
                </Link>
              </Button>
            }
          />
        </section>
      ) : null}

      {cartResult.status === "ready" && hasItems ? (
        <section className="section-frame grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <CartLineItem key={item.id} item={item} locale={locale} />
            ))}
          </div>

          <CartSummaryPanel
            locale={locale}
            copy={dictionary.cart.summary}
            commonCopy={dictionary.common}
            itemCount={cart.itemCount}
            subtotal={cart.subtotal}
            isRtl={isRtl}
          />
        </section>
      ) : null}
    </div>
  );
}
