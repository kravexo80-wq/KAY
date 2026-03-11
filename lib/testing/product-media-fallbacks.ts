import type { Locale } from "@/lib/i18n/config";
import type { ProductMedia, ProductTone } from "@/types/product";

const TEST_IMAGE_BASE_PATH =
  "/testing/products/noor-garden-abaya/noor-garden-abaya-main.jpeg";

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
      angle: getLocalizedTestingValue(locale, "Front view", "عرض أمامي"),
      note: getLocalizedTestingValue(
        locale,
        "Sample testing image while the live gallery is still being prepared.",
        "صورة تجريبية مؤقتة إلى حين تجهيز معرض المنتج النهائي.",
      ),
      tone,
      imageUrl: `${TEST_IMAGE_BASE_PATH}?frame=front`,
      altText: getLocalizedTestingValue(
        locale,
        "Sample product testing frame",
        "إطار تجريبي لصورة المنتج",
      ),
      objectPosition: "50% 38%",
    },
    {
      id: `${slug}-testing-detail`,
      label: getLocalizedTestingValue(locale, "Detail frame", "إطار تفصيلي"),
      angle: getLocalizedTestingValue(locale, "Close study", "لقطة قريبة"),
      note: getLocalizedTestingValue(
        locale,
        "Used to test gallery switching before dedicated product photography is uploaded.",
        "يستخدم لاختبار تبديل المعرض قبل رفع تصوير المنتج المخصص.",
      ),
      tone,
      imageUrl: `${TEST_IMAGE_BASE_PATH}?frame=detail`,
      altText: getLocalizedTestingValue(
        locale,
        "Sample close product frame",
        "إطار تجريبي قريب للمنتج",
      ),
      objectPosition: "46% 30%",
    },
    {
      id: `${slug}-testing-story`,
      label: getLocalizedTestingValue(locale, "Showroom frame", "إطار المعرض"),
      angle: getLocalizedTestingValue(
        locale,
        "Presentation view",
        "عرض تقديمي",
      ),
      note: getLocalizedTestingValue(
        locale,
        "Keeps the product page visual for testing while preserving the current gallery structure.",
        "يبقي صفحة المنتج مرئية أثناء الاختبار مع الحفاظ على بنية المعرض الحالية.",
      ),
      tone,
      imageUrl: `${TEST_IMAGE_BASE_PATH}?frame=showroom`,
      altText: getLocalizedTestingValue(
        locale,
        "Sample showroom product frame",
        "إطار تجريبي لعرض المنتج",
      ),
      objectPosition: "54% 42%",
    },
  ];
}

export function createTestingViewer360Frames(
  slug: string,
  locale: Locale,
  tone: ProductTone = "obsidian",
): ProductMedia[] {
  const positions = ["40% 38%", "44% 38%", "48% 38%", "52% 38%", "56% 38%", "60% 38%", "56% 38%", "48% 38%"];

  return positions.map((objectPosition, index) => ({
    id: `${slug}-viewer360-${index + 1}`,
    label: getLocalizedTestingValue(locale, "360 sequence", "تسلسل 360"),
    angle: getLocalizedTestingValue(
      locale,
      `Frame ${index + 1}`,
      `الإطار ${index + 1}`,
    ),
    note: getLocalizedTestingValue(
      locale,
      "Testing rotation frame generated from the sample studio image.",
      "إطار تدوير تجريبي مولد من صورة الاستوديو النموذجية.",
    ),
    tone,
    imageUrl: `${TEST_IMAGE_BASE_PATH}?viewer=${index + 1}`,
    altText: getLocalizedTestingValue(
      locale,
      `Testing 360 frame ${index + 1}`,
      `إطار 360 تجريبي ${index + 1}`,
    ),
    objectPosition,
  }));
}
