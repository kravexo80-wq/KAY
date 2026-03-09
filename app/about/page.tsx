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
  const copy = getTrustCopy(locale).about;

  return buildPageMetadata({
    locale,
    pathname: "/about",
    title: locale === "ar" ? "عن كرافكسو" : "About Kravexo",
    description: copy.description,
  });
}

export default async function AboutPage() {
  const { locale, direction } = await getRequestI18n();
  const copy = getTrustCopy(locale).about;
  const isRtl = direction === "rtl";

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        note={copy.note}
        noteLabel={locale === "ar" ? "ملاحظة العلامة" : "Brand note"}
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/shop")}>
                {locale === "ar" ? "استكشاف المتجر" : "Explore the shop"}
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

      <section className="section-frame grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <TrustSection
          eyebrow={copy.story.eyebrow}
          title={copy.story.title}
          isRtl={isRtl}
        >
          <TrustParagraphStack paragraphs={copy.story.paragraphs ?? []} isRtl={isRtl} />
        </TrustSection>

        <TrustSection
          eyebrow={copy.values.eyebrow}
          title={copy.values.title}
          description={copy.values.description}
          isRtl={isRtl}
          className="showroom-panel"
        >
          <TrustBulletList
            items={copy.values.cards.map((card) => `${card.title}: ${card.description}`)}
            isRtl={isRtl}
          />
        </TrustSection>
      </section>

      <section className="section-frame">
        <TrustSection
          eyebrow={copy.principles.eyebrow}
          title={copy.principles.title}
          description={copy.principles.description}
          isRtl={isRtl}
          className="showroom-panel"
        >
          <TrustCardGrid cards={copy.principles.cards} isRtl={isRtl} />
        </TrustSection>
      </section>
    </div>
  );
}
