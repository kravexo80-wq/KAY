import Link from "next/link";

import { footerNavigation } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/8 bg-black/40">
      <div className="section-frame section-space grid gap-12 lg:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
        <div className="space-y-5">
          <p className="eyebrow">Kravexo</p>
          <div className="space-y-3">
            <h2 className="text-3xl leading-none text-white md:text-5xl">
              Modest fashion, lit like a gallery piece.
            </h2>
            <p className="max-w-md text-base leading-7 text-white/60">
              A premium storefront foundation prepared for product-first
              storytelling, future account flows, and rich commerce features.
            </p>
          </div>
          <div className="space-y-1 text-sm text-white/45">
            <p>{siteConfig.location}</p>
            <p>{siteConfig.supportEmail}</p>
            <p>{siteConfig.supportPhone}</p>
          </div>
        </div>

        {footerNavigation.map((group) => (
          <div key={group.title} className="space-y-4">
            <p className="text-sm uppercase tracking-[0.24em] text-white/46">
              {group.title}
            </p>
            <div className="space-y-3">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/66 transition hover:text-white"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="section-frame flex flex-col gap-2 border-t border-white/8 py-6 text-xs uppercase tracking-[0.22em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Kravexo. Premium modest wear.</p>
        <p>Supabase and Stripe integration prepared for next phase.</p>
      </div>
    </footer>
  );
}
