import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import {
  TrustBulletList,
  TrustCardGrid,
  TrustParagraphStack,
  TrustSection,
} from "@/components/storefront/trust-page-sections";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { getTrustCopy } from "@/lib/i18n/trust-copy";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getRequestI18n();
  const copy = getTrustCopy(locale).shippingReturns;

  return buildPageMetadata({
    locale,
    pathname: "/shipping-returns",
    title: locale === "ar" ? "الشحن والاسترجاع" : "Shipping & Returns",
    description: copy.description,
  });
}

export default async function ShippingReturnsPage() {
  const { locale, direction } = await getRequestI18n();
  const copy = getTrustCopy(locale).shippingReturns;
  const isRtl = direction === "rtl";

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        note={copy.note}
        noteLabel={locale === "ar" ? "ملاحظة السياسة" : "Policy note"}
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/faq")}>
                {locale === "ar" ? "الأسئلة الشائعة" : "Read the FAQ"}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={localizeHref(locale, "/contact")}>
                {locale === "ar" ? "التواصل للدعم" : "Contact support"}
              </Link>
            </Button>
          </>
        }
      />

      <section className="section-frame">
        <TrustCardGrid cards={copy.highlights} isRtl={isRtl} />
      </section>

      <section className="section-frame grid gap-6 lg:grid-cols-2">
        {copy.sections.map((section) => (
          <TrustSection
            key={section.title}
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            isRtl={isRtl}
            className="showroom-panel"
          >
            {section.paragraphs ? (
              <TrustParagraphStack paragraphs={section.paragraphs} isRtl={isRtl} />
            ) : null}
            {section.items ? (
              <div className={section.paragraphs ? "mt-6" : ""}>
                <TrustBulletList items={section.items} isRtl={isRtl} />
              </div>
            ) : null}
          </TrustSection>
        ))}
      </section>
    </div>
  );
}
