import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRequestI18n } from "@/lib/i18n/request";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const { direction, dictionary } = await getRequestI18n();
  const isRtl = direction === "rtl";

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow={dictionary.contact.eyebrow}
        title={dictionary.contact.title}
        description={dictionary.contact.description}
        note={dictionary.contact.note}
        noteLabel={dictionary.common.showroomNote}
        isRtl={isRtl}
      />

      <section className="section-frame grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <form className={`luxury-panel space-y-4 p-6 md:p-8 ${isRtl ? "text-right" : "text-left"}`}>
          <Input placeholder={dictionary.contact.fullName} className="text-start" />
          <Input type="email" placeholder={dictionary.contact.email} className="text-start" />
          <Input placeholder={dictionary.contact.subject} className="text-start" />
          <textarea
            className="min-h-40 w-full rounded-[1.75rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder:text-white/35 outline-none transition-all duration-300 focus-visible:border-white/20 focus-visible:ring-2 focus-visible:ring-ring"
            placeholder={dictionary.contact.message}
          />
          <Button type="submit" className="w-full sm:w-auto">
            {dictionary.contact.submit}
          </Button>
        </form>

        <div className="grid gap-4">
          <div className={`luxury-muted-panel p-5 ${isRtl ? "text-right" : "text-left"}`}>
            <p className="eyebrow">{dictionary.contact.concierge}</p>
            <p className="mt-3 text-lg text-white">{siteConfig.supportEmail}</p>
            <p className="mt-2 text-sm leading-7 text-white/56">
              {dictionary.contact.conciergeDescription}
            </p>
          </div>
          <div className={`luxury-muted-panel p-5 ${isRtl ? "text-right" : "text-left"}`}>
            <p className="eyebrow">{dictionary.contact.studio}</p>
            <p className="mt-3 text-lg text-white">{siteConfig.location}</p>
            <p className="mt-2 text-sm leading-7 text-white/56">
              {dictionary.contact.studioDescription}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
