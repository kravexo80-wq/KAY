import type { TrustCopy } from "../trust-copy";

type FooterCopy = TrustCopy["footer"];
type PolicyCopy = TrustCopy["privacyPolicy"];
type TermsCopy = TrustCopy["terms"];

export const legalCopy: Record<
  "en" | "ar",
  {
    footer: FooterCopy;
    privacyPolicy: PolicyCopy;
    terms: TermsCopy;
  }
> = {
  en: {
    footer: {
      groupLabel: "Client care",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Shipping & Returns", href: "/shipping-returns" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms" },
      ],
    },
    privacyPolicy: {
      eyebrow: "Privacy Policy",
      title: "Privacy policy for the Kravexo storefront.",
      description:
        "This policy explains how we collect, use, and protect personal information when you browse, purchase, or contact support.",
      note: "We update this policy if our practices or legal requirements change.",
      lastUpdatedLabel: "Last updated",
      lastUpdatedValue: "17 March 2026",
      sections: [
        {
          title: "Who this policy applies to",
          paragraphs: [
            "This policy explains how Kravexo collects, uses, stores, and shares personal information when customers visit the Kravexo storefront, create an account, place an order, or contact support.",
          ],
        },
        {
          title: "Information collected",
          paragraphs: [
            "The storefront may collect information such as name, email address, delivery and billing details, order history, and customer-service correspondence.",
            "Technical information such as device data, browser information, and usage events may also be collected to operate and secure the site.",
          ],
          items: [
            "Account information",
            "Checkout and shipping information",
            "Customer support messages",
            "Basic analytics and security data",
          ],
        },
        {
          title: "How information is used",
          paragraphs: [
            "Personal information is used to operate the storefront, process orders, provide customer support, reduce fraud risk, and improve the customer experience.",
            "If marketing messages are used, we will provide a clear consent and unsubscribe method.",
          ],
        },
        {
          title: "Sharing and service providers",
          paragraphs: [
            "Information may be shared with service providers that help operate the storefront, process payments, support delivery, host infrastructure, or provide customer-service tools.",
            "We update this section if those providers change materially.",
          ],
        },
        {
          title: "Data retention and customer rights",
          paragraphs: [
            "We retain data for as long as needed to fulfill orders, meet legal obligations, and provide support.",
            "You may request access, correction, or deletion of your data where applicable.",
          ],
        },
        {
          title: "Contact for privacy matters",
          paragraphs: [
            "Privacy requests and policy questions should be directed to support@kravexo.co.uk and, if required, Kravexo, Manchester, United Kingdom.",
          ],
        },
      ],
    },
    terms: {
      eyebrow: "Terms & Conditions",
      title: "Terms and conditions for using the Kravexo website.",
      description:
        "These terms apply to browsing, purchasing, and using any services on this site.",
      note: "These terms are governed by the laws of England and Wales.",
      lastUpdatedLabel: "Last updated",
      lastUpdatedValue: "17 March 2026",
      sections: [
        {
          title: "About these terms",
          paragraphs: [
            "These terms apply to the use of the Kravexo website and any orders placed through it. Kravexo is a trading name of Kravexo, Manchester, United Kingdom.",
            "By using the storefront, you agree to these terms and to the policies referenced on this site.",
          ],
        },
        {
          title: "Product information",
          paragraphs: [
            "We present product descriptions, imagery, sizing guidance, and pricing as accurately as possible. Colors and finishes may vary slightly due to screens and material characteristics.",
          ],
        },
        {
          title: "Orders and payment",
          paragraphs: [
            "Prices, currency, and delivery charges are shown at checkout before you place an order.",
            "If an obvious pricing or availability error occurs, we may contact you or cancel the order and issue a refund.",
          ],
        },
        {
          title: "Delivery",
          paragraphs: [
            "Processing and delivery timelines are listed on the Shipping & Returns page. Please provide complete and accurate delivery details at checkout.",
          ],
        },
        {
          title: "Returns and cancellations",
          paragraphs: [
            "Returns are handled under the Shipping & Returns policy. Where applicable, you may have a right to cancel under the UK Consumer Contracts Regulations 2013.",
            "Your statutory rights under the Consumer Rights Act 2015 are not affected.",
          ],
        },
        {
          title: "Accounts and responsibility",
          paragraphs: [
            "If you create an account, you are responsible for keeping your login details secure and for all activity under your account.",
          ],
          items: [
            "Use a valid email address.",
            "Keep account credentials confidential.",
            "Update your delivery details when they change.",
          ],
        },
        {
          title: "Liability",
          paragraphs: [
            "We do not exclude or limit liability where it would be unlawful to do so. This includes liability for death or personal injury caused by negligence and for fraud.",
          ],
        },
        {
          title: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of England and Wales. The courts of England and Wales have jurisdiction over any dispute.",
          ],
        },
      ],
    },
  },
  ar: {
    footer: {
      groupLabel: "خدمة العملاء",
      links: [
        { label: "الأسئلة الشائعة", href: "/faq" },
        { label: "الشحن والاسترجاع", href: "/shipping-returns" },
        { label: "سياسة الخصوصية", href: "/privacy-policy" },
        { label: "الشروط والأحكام", href: "/terms" },
      ],
    },
    privacyPolicy: {
      eyebrow: "سياسة الخصوصية",
      title: "سياسة الخصوصية لمتجر كرافكسو.",
      description:
        "توضح هذه السياسة كيفية جمع معلوماتك واستخدامها وحمايتها عند استخدام متجر كرافكسو.",
      note:
        "إذا تغيرت ممارساتنا أو متطلبات الامتثال، سنحدّث هذه السياسة بما يناسب ذلك.",
      lastUpdatedLabel: "آخر تحديث",
      lastUpdatedValue: "17 مارس 2026",
      sections: [
        {
          title: "على من تنطبق هذه السياسة",
          paragraphs: [
            "توضح هذه السياسة كيف تجمع كرافكسو المعلومات الشخصية وتستخدمها وتخزنها عندما تزور المتجر أو تنشئ حسابًا أو تُجري طلبًا أو تتواصل مع الدعم.",
          ],
        },
        {
          title: "المعلومات التي نجمعها",
          paragraphs: [
            "قد نجمع معلومات مثل الاسم والبريد الإلكتروني وعناوين الشحن والفوترة وسجل الطلبات ومراسلات خدمة العملاء.",
            "وقد نجمع أيضًا بيانات تقنية مثل نوع الجهاز والمتصفح وسجلات الاستخدام لتشغيل الموقع وحمايته.",
          ],
          items: [
            "معلومات الحساب",
            "بيانات الدفع والشحن",
            "رسائل دعم العملاء",
            "بيانات تقنية وتحليلات أساسية",
          ],
        },
        {
          title: "كيف نستخدم المعلومات",
          paragraphs: [
            "نستخدم المعلومات لتشغيل المتجر ومعالجة الطلبات وتقديم الدعم وتقليل مخاطر الاحتيال وتحسين تجربة العميل.",
            "إذا قمنا بإرسال رسائل تسويقية، سنوفر وسيلة واضحة لإلغاء الاشتراك.",
          ],
        },
        {
          title: "المشاركة ومقدمو الخدمات",
          paragraphs: [
            "قد نشارك بعض المعلومات مع مزودي الخدمات الذين يساعدون في تشغيل المتجر ومعالجة المدفوعات وتوصيل الطلبات واستضافة البنية التحتية.",
            "نحدّث هذه الفقرة إذا تغيّر مزودو الخدمة أو نطاق مشاركتهم بشكل جوهري.",
          ],
        },
        {
          title: "الاحتفاظ بالبيانات وحقوق العميل",
          paragraphs: [
            "نحتفظ بالبيانات للمدة اللازمة لتشغيل الطلبات والامتثال للمتطلبات النظامية وتقديم الدعم.",
            "يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها عندما يكون ذلك مناسبًا.",
          ],
        },
        {
          title: "التواصل بخصوص الخصوصية",
          paragraphs: [
            "تُوجَّه طلبات الخصوصية والاستفسارات إلى support@kravexo.co.uk، وعند الحاجة: كرافكسو، مانشستر، المملكة المتحدة.",
          ],
        },
      ],
    },
    terms: {
      eyebrow: "الشروط والأحكام",
      title: "الشروط والأحكام لاستخدام موقع كرافكسو.",
      description:
        "تنطبق هذه الشروط على التصفح والشراء واستخدام أي خدمات على هذا الموقع.",
      note: "تخضع هذه الشروط لقوانين إنجلترا وويلز.",
      lastUpdatedLabel: "آخر تحديث",
      lastUpdatedValue: "17 مارس 2026",
      sections: [
        {
          title: "نبذة عن هذه الشروط",
          paragraphs: [
            "تنطبق هذه الشروط على استخدام موقع كرافكسو وأي طلبات يتم تقديمها عبره. كرافكسو هو الاسم التجاري لـ كرافكسو، مانشستر، المملكة المتحدة.",
            "باستخدام المتجر، أنت توافق على هذه الشروط والسياسات المشار إليها على الموقع.",
          ],
        },
        {
          title: "معلومات المنتج",
          paragraphs: [
            "نعرض أوصاف المنتجات والصور ودليل المقاسات والأسعار بأكبر قدر ممكن من الدقة. قد تختلف الألوان أو التشطيبات قليلًا بسبب الشاشات وطبيعة الخامات.",
          ],
        },
        {
          title: "الطلبات والدفع",
          paragraphs: [
            "تُعرض الأسعار والعملة وتكاليف التوصيل عند الدفع قبل إتمام الطلب.",
            "إذا حدث خطأ واضح في السعر أو التوفر، قد نتواصل معك أو نلغي الطلب ونعيد المبلغ.",
          ],
        },
        {
          title: "التوصيل",
          paragraphs: [
            "توجد مدد التجهيز والتوصيل في صفحة الشحن والاسترجاع. يرجى إدخال بيانات توصيل دقيقة وكاملة عند الدفع.",
          ],
        },
        {
          title: "الاسترجاع والإلغاء",
          paragraphs: [
            "تتم عمليات الاسترجاع وفق سياسة الشحن والاسترجاع. وعند انطباقها، قد يكون لك حق الإلغاء وفق لوائح عقود المستهلك في المملكة المتحدة لعام 2013.",
            "لا تؤثر هذه الشروط على حقوقك النظامية بموجب قانون حقوق المستهلك لعام 2015.",
          ],
        },
        {
          title: "الحسابات والمسؤولية",
          paragraphs: [
            "إذا أنشأت حسابًا، فأنت مسؤول عن حماية بيانات الدخول وعن أي نشاط يتم عبر حسابك.",
          ],
          items: [
            "استخدم بريدًا إلكترونيًا صالحًا.",
            "حافظ على سرية بيانات الدخول.",
            "حدّث بيانات التوصيل عند تغيّرها.",
          ],
        },
        {
          title: "المسؤولية",
          paragraphs: [
            "لا نستبعد أو نقيّد المسؤولية عندما يكون ذلك غير قانوني، بما في ذلك المسؤولية عن الوفاة أو الإصابة الشخصية الناتجة عن الإهمال والاحتيال.",
          ],
        },
        {
          title: "القانون الواجب التطبيق",
          paragraphs: [
            "تخضع هذه الشروط لقوانين إنجلترا وويلز، وتختص محاكم إنجلترا وويلز بنظر أي نزاع.",
          ],
        },
      ],
    },
  },
};
