"use client";

import Link from "next/link";
import { ShoppingBag, UserRound } from "lucide-react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Button } from "@/components/ui/button";
import { mainNavigation } from "@/lib/config/navigation";
import {
  localizeHref,
  type Locale,
  type LocaleDirection,
} from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { logoutAction } from "@/lib/supabase/auth-actions";
import { cn } from "@/lib/utils";

interface HeaderProps {
  locale: Locale;
  direction: LocaleDirection;
  currentPath: string;
  copy: Dictionary["header"];
  accountLabel?: string;
  cartItemCount?: number;
  isAuthenticated?: boolean;
  isAdmin?: boolean;
}

export function Header({
  locale,
  direction,
  currentPath,
  copy,
  accountLabel = "Account",
  cartItemCount = 0,
  isAuthenticated = false,
  isAdmin = false,
}: HeaderProps) {
  const isRtl = direction === "rtl";
  const accountHref = localizeHref(locale, isAuthenticated ? "/account" : "/login");
  const cartCountLabel = cartItemCount > 99 ? "99+" : `${cartItemCount}`;
  const cartAriaLabel =
    cartItemCount > 0 ? `${copy.cartLabel} (${cartItemCount})` : copy.cartLabel;

  return (
    <header className="sticky top-3 z-40 px-4">
      <div className="section-frame">
        <div className="luxury-panel overflow-hidden rounded-full px-4 py-3 md:px-6">
          <div
            className={cn(
              "flex items-center justify-between gap-4",
              isRtl && "flex-row-reverse",
            )}
          >
            <Link
              href={localizeHref(locale, "/")}
              className={cn("shrink-0 space-y-1", isRtl ? "text-right" : "text-left")}
              aria-label="Kravexo home"
            >
              <p className="text-xs uppercase tracking-[0.42em] text-white/45">
                {copy.tagline}
              </p>
              <p className="text-2xl uppercase tracking-[0.32em] text-white md:text-3xl">
                Kravexo
              </p>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {mainNavigation.map((item) => {
                const href = localizeHref(locale, item.href);
                const isActive =
                  currentPath === href || currentPath.startsWith(`${href}/`);

                return (
                  <Link
                    key={item.href}
                    href={href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm uppercase tracking-[0.22em] text-white/56 transition-all duration-300 hover:bg-white/[0.05] hover:text-white",
                      isActive && "bg-white/[0.06] text-white",
                    )}
                  >
                    {copy.navigation[item.key]}
                  </Link>
                );
              })}
            </nav>

            <div
              className={cn(
                "flex items-center gap-2",
                isRtl && "flex-row-reverse",
              )}
            >
              <LanguageSwitcher
                locale={locale}
                currentPath={currentPath}
              />
              <Link
                href={localizeHref(locale, "/cart")}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition hover:bg-white/[0.08] hover:text-white"
                aria-label={cartAriaLabel}
              >
                <ShoppingBag className="h-4 w-4" />
                {cartItemCount > 0 ? (
                  <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full border border-[#b79d67]/35 bg-[#0f0d0a] px-1 text-[0.6rem] font-medium leading-none text-[#f3e7c8] shadow-[0_0_18px_rgba(183,157,103,0.2)]">
                    {cartCountLabel}
                  </span>
                ) : null}
              </Link>
              {isAdmin ? (
                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="hidden lg:inline-flex"
                >
                  <Link href={localizeHref(locale, "/admin")}>{copy.admin}</Link>
                </Button>
              ) : null}
              {isAuthenticated ? (
                <>
                  <Button
                    asChild
                    variant="secondary"
                    size="sm"
                    className="hidden md:inline-flex"
                  >
                    <Link href={localizeHref(locale, "/account")}>{accountLabel}</Link>
                  </Button>
                  <form action={logoutAction} className="hidden md:block">
                    <Button type="submit" variant="secondary" size="sm">
                      {copy.logout}
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="secondary"
                    size="sm"
                    className="hidden md:inline-flex"
                  >
                    <Link href={localizeHref(locale, "/login")}>{copy.login}</Link>
                  </Button>
                  <Button asChild size="sm" className="hidden md:inline-flex">
                    <Link href={localizeHref(locale, "/signup")}>{copy.signup}</Link>
                  </Button>
                </>
              )}
              <Link
                href={accountHref}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition hover:bg-white/[0.08] hover:text-white"
                aria-label={isAuthenticated ? copy.account : copy.login}
              >
                <UserRound className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-3 space-y-2 md:hidden">
            <nav
              className={cn(
                "flex gap-2 overflow-x-auto pb-1",
                isRtl && "flex-row-reverse",
              )}
            >
              {mainNavigation.map((item) => {
                const href = localizeHref(locale, item.href);
                const isActive =
                  currentPath === href || currentPath.startsWith(`${href}/`);

                return (
                  <Link
                    key={item.href}
                    href={href}
                    className={cn(
                      "shrink-0 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/60 transition-all duration-300",
                      isActive && "bg-white/[0.06] text-white",
                    )}
                  >
                    {copy.navigation[item.key]}
                  </Link>
                );
              })}
            </nav>

            <div
              className={cn(
                "flex gap-2 overflow-x-auto pb-1",
                isRtl && "flex-row-reverse",
              )}
            >
              {isAdmin ? (
                <Button asChild variant="secondary" size="sm">
                  <Link href={localizeHref(locale, "/admin")}>{copy.admin}</Link>
                </Button>
              ) : null}
              <Button asChild variant="secondary" size="sm">
                <Link href={accountHref}>
                  {isAuthenticated ? copy.account : copy.login}
                </Link>
              </Button>
              {isAuthenticated ? (
                <form action={logoutAction}>
                  <Button type="submit" variant="secondary" size="sm">
                    {copy.logout}
                  </Button>
                </form>
              ) : (
                <Button asChild size="sm">
                  <Link href={localizeHref(locale, "/signup")}>{copy.signup}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
