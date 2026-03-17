import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import {
  TrustBulletList,
  TrustSection,
} from "@/components/storefront/trust-page-sections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/config/site";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { getTrustCopy } from "@/lib/i18n/trust-copy";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { submitContactAction } from "@/lib/site-actions";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getRequestI18n();
  const copy = getTrustCopy(locale).contact;

  return buildPageMetadata({
    locale,
    pathname: "/contact",
    title: locale === "ar" ? "???????" : "Contact",
    description: copy.description,
  });
}

type ContactPageProps = {
  searchParams: Promise<{
    contact?: string;
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [{ locale, direction }, resolvedSearchParams] = await Promise.all([
    getRequestI18n(),
    searchParams,
  ]);
  const copy = getTrustCopy(locale).contact;
  const isRtl = direction === "rtl";
  const notice =
    resolvedSearchParams.contact === "success"
      ? {
          tone: "success" as const,
          title: copy.form.successTitle,
          message: copy.form.successMessage,
        }
      : resolvedSearchParams.contact === "error"
        ? {
            tone: "error" as const,
            title: copy.form.errorTitle,
            message: copy.form.errorMessage,
          }
        : null;

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        note={copy.note}
        noteLabel={locale === "ar" ? "?????? ?????" : "Support note"}
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/faq")}>
                {locale === "ar" ? "??????? ???????" : "Read the FAQ"}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={localizeHref(locale, "/shipping-returns")}>
                {locale === "ar" ? "????? ??????????" : "Shipping & returns"}
              </Link>
            </Button>
          </>
        }
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
          <Input name="full_name" placeholder={copy.form.fullName} className="text-start" />
          <Input
            type="email"
            name="email"
            placeholder={copy.form.email}
            className="text-start"
          />
          <Input name="subject" placeholder={copy.form.subject} className="text-start" />
          <Textarea
            name="message"
            className="min-h-40 text-start"
            placeholder={copy.form.message}
          />
          <Button type="submit" className="w-full sm:w-auto">
            {copy.form.submit}
          </Button>
        </form>

        <div className="grid gap-4">
          <div className={`luxury-muted-panel p-5 ${isRtl ? "text-right" : "text-left"}`}>
            <p className="eyebrow">{copy.direct.title}</p>
            <p className="mt-3 text-lg text-white">{siteConfig.supportEmail}</p>
            <p className="mt-2 text-sm leading-7 text-white/56">{copy.direct.description}</p>
          </div>
          <div className={`luxury-muted-panel p-5 ${isRtl ? "text-right" : "text-left"}`}>
            <p className="eyebrow">{copy.response.title}</p>
            <p className="mt-3 text-lg text-white">
              {locale === "ar" ? "24 ساعة" : "24 hours"}
            </p>
            <p className="mt-2 text-sm leading-7 text-white/56">{copy.response.description}</p>
          </div>
          <div className={`luxury-muted-panel p-5 ${isRtl ? "text-right" : "text-left"}`}>
            <p className="eyebrow">{copy.social.title}</p>
            <p className="mt-3 text-lg text-white">{siteConfig.location}</p>
            <p className="mt-2 text-sm leading-7 text-white/56">{copy.social.description}</p>
          </div>
        </div>
      </section>

      <section className="section-frame">
        <TrustSection
          eyebrow={copy.guidance.eyebrow}
          title={copy.guidance.title}
          isRtl={isRtl}
          className="showroom-panel"
        >
          <TrustBulletList items={copy.guidance.items ?? []} isRtl={isRtl} />
        </TrustSection>
      </section>
    </div>
  );
}
