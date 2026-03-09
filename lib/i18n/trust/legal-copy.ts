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
      title: "A clear privacy policy foundation for the Kravexo storefront.",
      description:
        "This is a practical foundation for launch preparation. It should be reviewed and completed with your real business identity, legal basis, and regional compliance requirements before publishing as final.",
      note:
        "Replace each bracketed placeholder with your actual legal or operating detail. If you sell across multiple regions, have the final text reviewed for the jurisdictions that apply to your business.",
      lastUpdatedLabel: "Last updated",
      lastUpdatedValue: "[Insert launch date]",
      sections: [
        {
          title: "Who this policy applies to",
          paragraphs: [
            "This policy explains how [insert legal business name] collects, uses, stores, and shares personal information when customers visit the Kravexo storefront, create an account, place an order, or contact support.",
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
            "If marketing messages are used, explain the consent process and unsubscribe method here before launch.",
          ],
        },
        {
          title: "Sharing and service providers",
          paragraphs: [
            "Information may be shared with service providers that help operate the storefront, process payments, support delivery, host infrastructure, or provide customer-service tools.",
            "List or describe the categories of providers you actually use at launch, and update this section if that stack changes materially.",
          ],
        },
        {
          title: "Data retention and customer rights",
          paragraphs: [
            "Explain how long order, account, and support data are retained, and how customers can request access, correction, or deletion where applicable.",
            "If regional privacy rights apply, identify the correct contact route for those requests.",
          ],
        },
        {
          title: "Contact for privacy matters",
          paragraphs: [
            "Privacy requests and policy questions should be directed to [insert privacy contact email] and, if required, [insert registered address or responsible entity details].",
          ],
        },
      ],
    },
    terms: {
      eyebrow: "Terms & Conditions",
      title: "A clear terms page foundation for the Kravexo storefront.",
      description:
        "This page should set expectations around product information, orders, pricing, account use, and liability in a clear and readable way.",
      note:
        "Replace each placeholder with your real legal entity, governing law, and operating policy before launch. This content is a structured foundation, not finished legal advice.",
      lastUpdatedLabel: "Last updated",
      lastUpdatedValue: "[Insert launch date]",
      sections: [
        {
          title: "Use of the storefront",
          paragraphs: [
            "These terms apply to the use of the Kravexo website and any orders placed through it on behalf of [insert legal business name].",
            "By using the storefront, customers agree to these terms together with the related policy pages published on the site.",
          ],
        },
        {
          title: "Product presentation and availability",
          paragraphs: [
            "Product descriptions, imagery, sizing guidance, and pricing should be presented as accurately as possible. However, slight variations in color or finish may occur depending on display settings and material characteristics.",
            "Product availability remains subject to stock confirmation and order acceptance.",
          ],
        },
        {
          title: "Orders, pricing, and payment",
          paragraphs: [
            "Prices, currencies, and accepted payment methods should be shown clearly before checkout is completed.",
            "State whether taxes, duties, shipping fees, or regional surcharges are included in displayed prices or added during checkout.",
          ],
        },
        {
          title: "Accounts and customer responsibilities",
          paragraphs: [
            "Customers are responsible for providing accurate account and delivery information and for maintaining the confidentiality of their account credentials.",
          ],
          items: [
            "Use a valid email address.",
            "Provide correct shipping details.",
            "Keep login credentials private.",
          ],
        },
        {
          title: "Shipping, returns, and policy links",
          paragraphs: [
            "Shipping and returns are governed by the separate policy page published on this storefront. If those policies change, they should be updated in one coordinated release.",
          ],
        },
        {
          title: "Liability and governing law",
          paragraphs: [
            "Insert the limitations of liability appropriate for your business and jurisdiction here, together with your governing law and dispute-resolution language.",
            "Recommended placeholders: [insert governing law], [insert dispute venue], and [insert legal entity details].",
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
      title: "صياغة تأسيسية واضحة لسياسة خصوصية متجر كرافكسو.",
      description:
        "هذا أساس عملي للتحضير للإطلاق. يجب مراجعته واستكماله باسم الجهة القانونية الفعلي والأساس النظامي ومتطلبات الامتثال ذات الصلة قبل نشره بصيغته النهائية.",
      note:
        "استبدل كل عنصر بين أقواس مربعة بتفصيلك القانوني أو التشغيلي الحقيقي. وإذا كنت تبيع في أكثر من منطقة، فمن الأفضل مراجعة النص النهائي وفق الجهات النظامية المطبقة على نشاطك.",
      lastUpdatedLabel: "آخر تحديث",
      lastUpdatedValue: "[أدخل تاريخ الإطلاق]",
      sections: [
        {
          title: "على من تنطبق هذه السياسة",
          paragraphs: [
            "تشرح هذه السياسة كيف تقوم [أدخل الاسم القانوني للمنشأة] بجمع المعلومات الشخصية واستخدامها وتخزينها ومشاركتها عند زيارة متجر كرافكسو أو إنشاء حساب أو إتمام طلب أو التواصل مع الدعم.",
          ],
        },
        {
          title: "المعلومات التي قد تُجمع",
          paragraphs: [
            "قد يجمع المتجر معلومات مثل الاسم والبريد الإلكتروني وبيانات الشحن والفوترة وسجل الطلبات ومراسلات خدمة العملاء.",
            "وقد تُجمع أيضًا معلومات تقنية مثل بيانات الجهاز والمتصفح وأحداث الاستخدام لتشغيل الموقع وحمايته.",
          ],
          items: [
            "معلومات الحساب",
            "معلومات الدفع والشحن",
            "رسائل دعم العملاء",
            "بيانات أساسية للتحليلات والأمان",
          ],
        },
        {
          title: "كيفية استخدام المعلومات",
          paragraphs: [
            "تُستخدم المعلومات الشخصية لتشغيل المتجر، ومعالجة الطلبات، وتقديم الدعم، وتقليل مخاطر الاحتيال، وتحسين تجربة العميل.",
            "إذا استُخدمت الرسائل التسويقية، فيجب شرح آلية الموافقة وإلغاء الاشتراك هنا قبل الإطلاق.",
          ],
        },
        {
          title: "المشاركة ومقدمو الخدمة",
          paragraphs: [
            "قد تُشارك المعلومات مع مزودي خدمات يساعدون في تشغيل المتجر أو معالجة المدفوعات أو دعم الشحن أو استضافة البنية أو توفير أدوات خدمة العملاء.",
            "اذكر أو صف فئات الجهات التي تستخدمها فعليًا عند الإطلاق، وحدّث هذا القسم إذا تغيّرت البنية بشكل جوهري.",
          ],
        },
        {
          title: "الاحتفاظ بالبيانات وحقوق العملاء",
          paragraphs: [
            "اشرح المدة التي تحتفظ خلالها ببيانات الطلبات والحسابات والدعم، وكيف يمكن للعميل طلب الوصول أو التصحيح أو الحذف عندما يكون ذلك مطبقًا.",
            "إذا كانت هناك حقوق خصوصية مناطقية، فاذكر مسار التواصل الصحيح لهذه الطلبات.",
          ],
        },
        {
          title: "التواصل بشأن الخصوصية",
          paragraphs: [
            "يجب توجيه طلبات الخصوصية والاستفسارات المتعلقة بهذه السياسة إلى [أدخل بريد الخصوصية] و، إذا لزم، [أدخل العنوان المسجل أو تفاصيل الجهة المسؤولة].",
          ],
        },
      ],
    },
    terms: {
      eyebrow: "الشروط والأحكام",
      title: "صياغة تأسيسية واضحة لصفحة شروط متجر كرافكسو.",
      description:
        "ينبغي أن تضع هذه الصفحة توقعات واضحة بشأن عرض المنتجات والطلبات والأسعار واستخدام الحساب وحدود المسؤولية بطريقة مقروءة ومتزنة.",
      note:
        "استبدل كل عنصر نائب باسم الجهة القانونية الفعلية والقانون الحاكم وسياساتك التشغيلية قبل الإطلاق. هذا النص أساس منظم، وليس استشارة قانونية نهائية.",
      lastUpdatedLabel: "آخر تحديث",
      lastUpdatedValue: "[أدخل تاريخ الإطلاق]",
      sections: [
        {
          title: "استخدام المتجر",
          paragraphs: [
            "تنطبق هذه الشروط على استخدام موقع كرافكسو وعلى أي طلبات تُنشأ من خلاله نيابة عن [أدخل الاسم القانوني للمنشأة].",
            "وباستخدام المتجر، يوافق العميل على هذه الشروط مع صفحات السياسات المرتبطة والمنشورة على الموقع.",
          ],
        },
        {
          title: "عرض المنتجات والتوافر",
          paragraphs: [
            "ينبغي عرض أوصاف المنتجات وصورها وإرشادات المقاس وأسعارها بأكبر قدر ممكن من الدقة. ومع ذلك قد تظهر فروقات طفيفة في اللون أو اللمسة بحسب إعدادات الشاشة وطبيعة الخامة.",
            "يبقى توفر المنتجات خاضعًا لتأكيد المخزون وقبول الطلب.",
          ],
        },
        {
          title: "الطلبات والأسعار والدفع",
          paragraphs: [
            "يجب إظهار الأسعار والعملات ووسائل الدفع المقبولة بوضوح قبل إتمام الدفع.",
            "وضّح ما إذا كانت الضرائب أو الرسوم الجمركية أو الشحن أو الرسوم الإقليمية الأخرى مشمولة في الأسعار أو تُضاف أثناء الدفع.",
          ],
        },
        {
          title: "الحسابات ومسؤوليات العميل",
          paragraphs: [
            "يتحمل العميل مسؤولية تقديم بيانات حساب وشحن صحيحة، والحفاظ على سرية بيانات الدخول الخاصة به.",
          ],
          items: [
            "استخدام بريد إلكتروني صحيح.",
            "إدخال عنوان شحن دقيق.",
            "الحفاظ على سرية كلمة المرور.",
          ],
        },
        {
          title: "الشحن والاسترجاع والروابط المرتبطة",
          paragraphs: [
            "يخضع الشحن والاسترجاع لصفحة السياسة المنفصلة المنشورة على هذا المتجر. وإذا تغيّرت تلك السياسات، فينبغي تحديثها ضمن إصدار منسق واحد.",
          ],
        },
        {
          title: "المسؤولية والقانون الحاكم",
          paragraphs: [
            "أدخل هنا حدود المسؤولية المناسبة لنشاطك وولايتك القضائية، مع نص القانون الحاكم وآلية تسوية النزاعات.",
            "عناصر نائبة مقترحة: [أدخل القانون الحاكم] و[أدخل جهة الفصل] و[أدخل تفاصيل الكيان القانوني].",
          ],
        },
      ],
    },
  },
};
