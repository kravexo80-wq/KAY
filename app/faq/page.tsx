import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { TrustFaqGroup } from "@/components/storefront/trust-page-sections";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { getTrustCopy } from "@/lib/i18n/trust-copy";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getRequestI18n();
  const copy = getTrustCopy(locale).faq;

  return buildPageMetadata({
    locale,
    pathname: "/faq",
    title: locale === "ar" ? "الأسئلة الشائعة" : "FAQ",
    description: copy.description,
  });
}

export default async function FaqPage() {
  const { locale, direction } = await getRequestI18n();
  const copy = getTrustCopy(locale).faq;
  const isRtl = direction === "rtl";

  return (
    <div className="space-y-8 pb-16 md:pb-24">
      <PageIntro
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        note={copy.note}
        noteLabel={locale === "ar" ? "ملاحظة مهمة" : "Helpful note"}
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/shipping-returns")}>
                {locale === "ar" ? "سياسة الشحن والاسترجاع" : "Shipping policy"}
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

      <section className="section-frame grid gap-6">
        {copy.groups.map((group) => (
          <TrustFaqGroup
            key={group.title}
            title={group.title}
            description={group.description}
            items={group.items}
            isRtl={isRtl}
          />
        ))}
      </section>
    </div>
  );
}
