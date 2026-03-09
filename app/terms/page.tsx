import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { TrustLegalBlock } from "@/components/storefront/trust-page-sections";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { getTrustCopy } from "@/lib/i18n/trust-copy";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getRequestI18n();
  const copy = getTrustCopy(locale).terms;

  return buildPageMetadata({
    locale,
    pathname: "/terms",
    title: locale === "ar" ? "الشروط والأحكام" : "Terms & Conditions",
    description: copy.description,
  });
}

export default async function TermsPage() {
  const { locale, direction } = await getRequestI18n();
  const copy = getTrustCopy(locale).terms;
  const isRtl = direction === "rtl";

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        note={copy.note}
        noteLabel={locale === "ar" ? "تنبيه قانوني" : "Legal note"}
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/privacy-policy")}>
                {locale === "ar" ? "عرض سياسة الخصوصية" : "View privacy policy"}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={localizeHref(locale, "/contact")}>
                {locale === "ar" ? "التواصل معنا" : "Contact us"}
              </Link>
            </Button>
          </>
        }
      />

      <section className="section-frame">
        <div className={`luxury-muted-panel p-5 ${isRtl ? "text-right" : "text-left"}`}>
          <p className="eyebrow">{copy.lastUpdatedLabel}</p>
          <p className="mt-3 text-lg text-white">{copy.lastUpdatedValue}</p>
        </div>
      </section>

      <section className="section-frame grid gap-6">
        {copy.sections.map((section) => (
          <TrustLegalBlock
            key={section.title}
            title={section.title}
            paragraphs={section.paragraphs}
            items={section.items}
            isRtl={isRtl}
          />
        ))}
      </section>
    </div>
  );
}
