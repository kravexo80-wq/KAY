import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRequestI18n } from "@/lib/i18n/request";
import { submitContactAction } from "@/lib/site-actions";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Contact",
};

type ContactPageProps = {
  searchParams: Promise<{
    contact?: string;
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [{ direction, dictionary }, resolvedSearchParams] = await Promise.all([
    getRequestI18n(),
    searchParams,
  ]);
  const isRtl = direction === "rtl";
  const notice =
    resolvedSearchParams.contact === "success"
      ? {
          tone: "success" as const,
          title: dictionary.contact.successTitle,
          message: dictionary.contact.successMessage,
        }
      : resolvedSearchParams.contact === "error"
        ? {
            tone: "error" as const,
            title: dictionary.contact.errorTitle,
            message: dictionary.contact.errorMessage,
          }
        : null;

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
        <form
          action={submitContactAction}
          className={`luxury-panel space-y-4 p-6 md:p-8 ${isRtl ? "text-right" : "text-left"}`}
        >
          {notice ? (
            <div className={notice.tone === "error" ? "luxury-muted-panel p-4" : "showroom-subpanel p-4"}>
              <p className="eyebrow">{notice.title}</p>
              <p className="mt-3 text-sm leading-7 text-white/60">{notice.message}</p>
            </div>
          ) : null}
          <Input
            name="full_name"
            placeholder={dictionary.contact.fullName}
            className="text-start"
          />
          <Input
            type="email"
            name="email"
            placeholder={dictionary.contact.email}
            className="text-start"
          />
          <Input
            name="subject"
            placeholder={dictionary.contact.subject}
            className="text-start"
          />
          <textarea
            name="message"
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
