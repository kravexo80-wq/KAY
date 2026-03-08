"use client";

import Link from "next/link";
import { Languages } from "lucide-react";

import { switchHrefLocale, type Locale } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  locale: Locale;
  currentPath: string;
  label: string;
}

export function LanguageSwitcher({
  locale,
  currentPath,
  label,
}: LanguageSwitcherProps) {
  const targetLocale = locale === "en" ? "ar" : "en";

  return (
    <Link
      href={switchHrefLocale(currentPath, targetLocale)}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-[0.68rem] uppercase tracking-[0.24em] text-white/68 transition hover:bg-white/[0.08] hover:text-white"
      aria-label={label}
    >
      <Languages className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
}
