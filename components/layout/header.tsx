"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, UserRound } from "lucide-react";

import { mainNavigation } from "@/lib/config/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition hover:bg-white/[0.08] hover:text-white"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-4 w-4" />
              </Link>
              <Link
                href="/account"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/75 transition hover:bg-white/[0.08] hover:text-white"
                aria-label="Open account"
              >
                <UserRound className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
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
        </div>
      </div>
    </header>
  );
}
