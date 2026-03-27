import Image from "next/image";
import Link from "next/link";

import { footerNavigation } from "@/lib/config/navigation";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { getTrustCopy } from "@/lib/i18n/trust-copy";
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
  const trustCopy = getTrustCopy(locale);
  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/kravexo",
      icon: (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/7347135266",
      icon: (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M12 4.2a7.8 7.8 0 0 0-6.7 11.8L4 20l4.1-1.2A7.8 7.8 0 1 0 12 4.2Z" />
          <path d="M9.2 9.3c.2-.5.5-.6.8-.6h.7c.2 0 .4 0 .5.2.2.2.6 1.4.6 1.6 0 .2 0 .4-.2.5l-.4.5c-.1.2-.3.4-.2.6.2.5.8 1.5 1.7 2.2.9.7 1.6 1 2.1 1.2.2.1.4 0 .6-.1l.7-.8c.2-.2.3-.2.5-.1.2.1 1.4.7 1.6.8.2.1.3.2.3.4 0 .2 0 1-.3 1.4-.3.4-.9.8-1.6.8-.7 0-2-.1-3.6-1.1-1.7-1-3-2.6-3.5-3.4-.6-.8-1.1-2-1.1-2.8 0-.8.2-1.4.5-1.8Z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="mt-24 border-t border-white/8 bg-black/40">
      <div className="section-frame section-space grid gap-12 md:grid-cols-2 xl:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
        <div className={`space-y-5 ${isRtl ? "text-right" : "text-left"}`}>
          <div
            className={`flex items-center gap-3 ${
              isRtl ? "flex-row-reverse justify-end" : "justify-start"
            }`}
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-[#e8dccd] shadow-[0_0_24px_rgba(232,220,205,0.12)]">
              <Image
                src="/brand/kravexo-lockup.jpeg"
                alt="Kravexo logo"
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <p className="eyebrow">Kravexo</p>
          </div>
          <div className="space-y-3">
            <h2 className="max-w-md text-2xl leading-[1.12] text-white md:text-4xl">
              {copy.description}
            </h2>
          </div>
          <div className="space-y-1 text-sm text-white/50 md:text-base">
            <p>{siteConfig.location}</p>
            <p>{siteConfig.supportEmail}</p>
            <p>{siteConfig.supportPhone}</p>
          </div>
          <div
            className={`flex items-center gap-3 pt-2 ${
              isRtl ? "justify-end" : "justify-start"
            }`}
          >
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        {footerNavigation.map((group) => (
          <div
            key={group.key}
            className={`space-y-4 ${isRtl ? "text-right" : "text-left"}`}
          >
            <p className="text-xs uppercase tracking-[0.32em] text-white/50">
              {copy.groups[group.key]}
            </p>
            <div className="space-y-3">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={localizeHref(locale, link.href)}
                  className="block text-base text-white/70 transition hover:text-white"
                >
                  {link.key in navigationCopy
                    ? navigationCopy[link.key as keyof typeof navigationCopy]
                    : commonCopy[link.key as keyof typeof commonCopy]}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className={`space-y-4 ${isRtl ? "text-right" : "text-left"}`}>
          <p className="text-xs uppercase tracking-[0.32em] text-white/50">
            {trustCopy.footer.groupLabel}
          </p>
          <div className="space-y-3">
            {trustCopy.footer.links.map((link) => (
              <Link
                key={link.href}
                href={localizeHref(locale, link.href)}
                className="block text-base text-white/70 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="section-frame flex flex-col gap-2 border-t border-white/8 py-6 text-xs uppercase tracking-[0.22em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>{copy.copyright}</p>
        <p>{siteConfig.name}</p>
      </div>
    </footer>
  );
}
