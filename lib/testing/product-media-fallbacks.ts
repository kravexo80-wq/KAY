import type { Locale } from "@/lib/i18n/config";
import type { ProductMedia, ProductTone } from "@/types/product";

const TEST_FRAME_PATHS = [
  "/testing/viewer360/modest-sequence/frame-01.jpg",
  "/testing/viewer360/modest-sequence/frame-02.jpg",
  "/testing/viewer360/modest-sequence/frame-03.jpg",
  "/testing/viewer360/modest-sequence/frame-04.jpg",
] as const;

function getLocalizedTestingValue(locale: Locale, en: string, ar: string) {
  return locale === "ar" ? ar : en;
}

export function createTestingMediaGallery(
  slug: string,
  locale: Locale,
  tone: ProductTone = "obsidian",
): ProductMedia[] {
  return [
    {
      id: `${slug}-testing-front`,
      label: getLocalizedTestingValue(locale, "Studio frame", "إطار الاستوديو"),
      angle: getLocalizedTestingValue(locale, "Front silhouette", "الواجهة الأمامية"),
      note: getLocalizedTestingValue(
        locale,
        "Testing gallery image supplied with the launch build.",
        "صورة تجريبية مرفقة مع نسخة الإطلاق للاختبار.",
      ),
      tone,
      imageUrl: TEST_FRAME_PATHS[0],
      altText: getLocalizedTestingValue(
        locale,
        "Testing gallery front frame",
        "إطار تجريبي أمامي للمعرض",
      ),
      objectPosition: "50% 30%",
    },
    {
      id: `${slug}-testing-second`,
      label: getLocalizedTestingValue(locale, "Secondary frame", "إطار ثانوي"),
      angle: getLocalizedTestingValue(locale, "Draped silhouette", "انسياب القماش"),
      note: getLocalizedTestingValue(
        locale,
        "A second testing still for gallery switching.",
        "صورة ثانية تجريبية لاختبار تبديل المعرض.",
      ),
      tone,
      imageUrl: TEST_FRAME_PATHS[1],
      altText: getLocalizedTestingValue(
        locale,
        "Testing gallery drape frame",
        "إطار تجريبي لانسياب القماش",
      ),
      objectPosition: "50% 24%",
    },
    {
      id: `${slug}-testing-third`,
      label: getLocalizedTestingValue(locale, "Editorial frame", "إطار تحريري"),
      angle: getLocalizedTestingValue(locale, "Showroom angle", "زاوية المعرض"),
      note: getLocalizedTestingValue(
        locale,
        "Keeps the product page visual until custom photography is ready.",
        "يبقي صفحة المنتج مرئية حتى تصبح الصور المخصصة جاهزة.",
      ),
      tone,
      imageUrl: TEST_FRAME_PATHS[2],
      altText: getLocalizedTestingValue(
        locale,
        "Testing showroom product frame",
        "إطار تجريبي لعرض المنتج",
      ),
      objectPosition: "50% 28%",
    },
  ];
}

export function createTestingViewer360Frames(
  slug: string,
  locale: Locale,
  tone: ProductTone = "obsidian",
): ProductMedia[] {
  return TEST_FRAME_PATHS.map((imageUrl, index) => ({
    id: `${slug}-viewer360-${index + 1}`,
    label: getLocalizedTestingValue(locale, "360 sequence", "تسلسل 360"),
    angle: getLocalizedTestingValue(
      locale,
      `Frame ${index + 1}`,
      `الإطار ${index + 1}`,
    ),
    note: getLocalizedTestingValue(
      locale,
      "Testing viewer frame from the bundled sample sequence.",
      "إطار تجريبي للعارض من تسلسل الصور المرفق.",
    ),
    tone,
    imageUrl,
    altText: getLocalizedTestingValue(
      locale,
      `Testing 360 frame ${index + 1}`,
      `إطار 360 تجريبي ${index + 1}`,
    ),
    objectPosition: "50% 28%",
  }));
}
