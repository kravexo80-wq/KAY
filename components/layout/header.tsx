"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { mainNavigation } from "@/lib/config/navigation";
import { logoutAction } from "@/lib/supabase/auth-actions";
import { cn } from "@/lib/utils";

interface HeaderProps {
  accountLabel?: string;
  cartItemCount?: number;
  isAuthenticated?: boolean;
  isAdmin?: boolean;
}

export function Header({
  accountLabel = "Account",
  cartItemCount = 0,
  isAuthenticated = false,
  isAdmin = false,
}: HeaderProps) {
  const pathname = usePathname();
  const accountHref = isAuthenticated ? "/account" : "/login";
  const cartCountLabel = cartItemCount > 99 ? "99+" : `${cartItemCount}`;
  const cartAriaLabel =
    cartItemCount > 0
      ? `Open cart with ${cartItemCount} item${cartItemCount === 1 ? "" : "s"}`
      : "Open cart";

  return (
    <header className="sticky top-3 z-40 px-4">
      <div className="section-frame">
        <div className="luxury-panel overflow-hidden rounded-full px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="shrink-0 space-y-1 text-left"
              aria-label="Kravexo home"
            >
              <p className="text-xs uppercase tracking-[0.42em] text-white/45">
                Luxury modest wear
              </p>
              <p className="text-2xl uppercase tracking-[0.32em] text-white md:text-3xl">
                Kravexo
              </p>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {mainNavigation.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm uppercase tracking-[0.22em] text-white/56 transition-all duration-300 hover:bg-white/[0.05] hover:text-white",
                      isActive && "bg-white/[0.06] text-white",
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/shop"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition hover:bg-white/[0.08] hover:text-white"
                aria-label="Search collection"
              >
                <Search className="h-4 w-4" />
              </Link>
              <Link
                href="/cart"
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
                  <Link href="/admin">Admin</Link>
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
                    <Link href="/account">{accountLabel}</Link>
                  </Button>
                  <form action={logoutAction} className="hidden md:block">
                    <Button type="submit" variant="secondary" size="sm">
                      Logout
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
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild size="sm" className="hidden md:inline-flex">
                    <Link href="/signup">Signup</Link>
                  </Button>
                </>
              )}
              <Link
                href={accountHref}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition hover:bg-white/[0.08] hover:text-white"
                aria-label={isAuthenticated ? "Open account" : "Open login"}
              >
                <UserRound className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-3 space-y-2 md:hidden">
            <nav className="flex gap-2 overflow-x-auto pb-1">
              {mainNavigation.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "shrink-0 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/60 transition-all duration-300",
                      isActive && "bg-white/[0.06] text-white",
                    )}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {isAdmin ? (
                <Button asChild variant="secondary" size="sm">
                  <Link href="/admin">Admin</Link>
                </Button>
              ) : null}
              <Button asChild variant="secondary" size="sm">
                <Link href={accountHref}>{isAuthenticated ? "Account" : "Login"}</Link>
              </Button>
              {isAuthenticated ? (
                <form action={logoutAction}>
                  <Button type="submit" variant="secondary" size="sm">
                    Logout
                  </Button>
                </form>
              ) : (
                <Button asChild size="sm">
                  <Link href="/signup">Signup</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
