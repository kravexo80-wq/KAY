import Link from "next/link";

import { footerNavigation } from "@/lib/config/navigation";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/config/site";

interface FooterProps {
  locale: Locale;
  copy: Dictionary["footer"];
  navigationCopy: Dictionary["header"]["navigation"];
  commonCopy: Dictionary["common"];
  isRtl?: boolean;
}

export function Footer({
  locale,
  copy,
  navigationCopy,
  commonCopy,
  isRtl = false,
}: FooterProps) {
  return (
    <footer className="mt-24 border-t border-white/8 bg-black/40">
      <div className="section-frame section-space grid gap-12 lg:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
        <div className={`space-y-5 ${isRtl ? "text-right" : "text-left"}`}>
          <p className="eyebrow">Kravexo</p>
          <div className="space-y-3">
            <h2 className="max-w-md text-3xl leading-[1.08] text-white md:text-5xl">
              {copy.description}
            </h2>
          </div>
          <div className="space-y-1 text-sm text-white/45">
            <p>{siteConfig.location}</p>
            <p>{siteConfig.supportEmail}</p>
            <p>{siteConfig.supportPhone}</p>
          </div>
        </div>

        {footerNavigation.map((group) => (
          <div
            key={group.key}
            className={`space-y-4 ${isRtl ? "text-right" : "text-left"}`}
          >
            <p className="text-sm uppercase tracking-[0.24em] text-white/46">
              {copy.groups[group.key]}
            </p>
            <div className="space-y-3">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={localizeHref(locale, link.href)}
                  className="block text-sm text-white/66 transition hover:text-white"
                >
                  {link.key in navigationCopy
                    ? navigationCopy[link.key as keyof typeof navigationCopy]
                    : commonCopy[link.key as keyof typeof commonCopy]}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="section-frame flex flex-col gap-2 border-t border-white/8 py-6 text-xs uppercase tracking-[0.22em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>{copy.copyright}</p>
        <p>{siteConfig.name}</p>
      </div>
    </footer>
  );
}
