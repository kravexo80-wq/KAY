"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Languages } from "lucide-react";

import {
  getLocaleFromPathname,
  switchHrefLocale,
  type Locale,
} from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  locale: Locale;
  currentPath: string;
}

export function LanguageSwitcher({
  locale,
  currentPath,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const browserPath = pathname
    ? `${pathname}${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`
    : null;
  const resolvedCurrentPath =
    browserPath && getLocaleFromPathname(pathname)
      ? browserPath
      : currentPath;
  const options: Array<{
    locale: Locale;
    label: string;
  }> = [
    { locale: "en", label: "English" },
    { locale: "ar", label: "العربية" },
  ];

  return (
    <div
      className="inline-flex h-10 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
      aria-label="Language switcher"
      role="group"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full text-white/48">
        <Languages className="h-4 w-4" />
      </span>
      {options.map((option) => {
        const isActive = option.locale === locale;

        return (
          <Link
            key={option.locale}
            href={switchHrefLocale(resolvedCurrentPath, option.locale)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex h-8 items-center rounded-full px-3 text-[0.72rem] font-medium transition",
              option.locale === "en"
                ? "tracking-[0.16em] uppercase"
                : "tracking-normal",
              isActive
                ? "bg-white/[0.09] text-white shadow-[0_0_24px_rgba(190,169,124,0.12)]"
                : "text-white/58 hover:bg-white/[0.06] hover:text-white",
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
