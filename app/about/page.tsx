import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/page-intro";
import { getRequestI18n } from "@/lib/i18n/request";

export const metadata: Metadata = {
  title: "About",
};

const values = {
  en: [
    {
      title: "Product-first staging",
      description:
        "Layouts are built to isolate the garment and let proportion, surface, and tailoring dominate the frame.",
    },
    {
      title: "Modest, modern silhouettes",
      description:
        "The brand language stays culturally grounded while presenting modest fashion through a highly refined retail lens.",
    },
    {
      title: "Premium restraint",
      description:
        "Nothing is loud. Contrast, finish, and spacing carry the sense of luxury instead of decorative excess.",
    },
  ],
  ar: [
    {
      title: "عرض يضع المنتج أولاً",
      description:
        "تُبنى التكوينات لعزل القطعة وترك النسبة والسطح والتفصيل يهيمنون على الإطار.",
    },
    {
      title: "خطوط محتشمة وحديثة",
      description:
        "تبقى لغة العلامة متجذرة ثقافياً مع تقديم الأزياء المحتشمة من خلال عدسة بيع راقية للغاية.",
    },
    {
      title: "فخامة منضبطة",
      description:
        "لا شيء صاخب. فالتباين واللمسة النهائية والمسافات هي التي تحمل الإحساس بالفخامة بدل الزخرفة الزائدة.",
    },
  ],
} as const;

export default async function AboutPage() {
  const { locale, direction, dictionary } = await getRequestI18n();
  const isRtl = direction === "rtl";

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow={dictionary.about.eyebrow}
        title={dictionary.about.title}
        description={dictionary.about.description}
        note={dictionary.about.note}
        noteLabel={dictionary.common.showroomNote}
        isRtl={isRtl}
      />

      <section className="section-frame grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className={`luxury-panel p-6 md:p-8 ${isRtl ? "text-right" : "text-left"}`}>
          <p className="eyebrow">{dictionary.about.pointOfView}</p>
          <div className="mt-4 space-y-5 text-base leading-8 text-white/62">
            {locale === "ar" ? (
              <>
                <p>
                  تمزج كرافكسو بين التوجيه الفاخر المعاصر للبيع بالتجزئة وبين رموز
                  الأزياء المحتشمة المتجذرة في الأناقة والانضباط والحضور الاحتفالي.
                </p>
                <p>
                  صُممت الواجهة لتبقى داكنة وواسعة عمداً حتى يبدو المنتج مضاءً
                  ومحورياً وباهظ القيمة. الهدف هو أن تشعر حتى أبسط الخطوط بأنها
                  بيان بصري مصمم بعناية.
                </p>
              </>
            ) : (
              <>
                <p>
                  Kravexo blends contemporary luxury retail direction with modest
                  fashion codes rooted in elegance, restraint, and ceremonial
                  presence.
                </p>
                <p>
                  The storefront is intentionally dark and spacious so the product
                  appears illuminated, central, and expensive. The goal is to make
                  even a simple silhouette feel like a carefully staged statement.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-4">
          {values[locale].map((value) => (
            <div key={value.title} className={`luxury-muted-panel p-5 ${isRtl ? "text-right" : "text-left"}`}>
              <h2 className="text-2xl leading-none text-white">{value.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/56">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
