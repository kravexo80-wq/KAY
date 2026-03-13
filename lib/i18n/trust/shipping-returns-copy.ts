import type { TrustCopy } from "../trust-copy";

type ShippingReturnsCopy = TrustCopy["shippingReturns"];

export const shippingReturnsCopy: Record<"en" | "ar", ShippingReturnsCopy> = {
  en: {
    eyebrow: "Shipping & Returns",
    title: "Clear timing for processing, delivery, and eligible returns.",
    description:
      "Find the current order timeline, delivery expectations, and the basic return conditions that apply to Kravexo orders.",
    note:
      "Timelines begin after payment confirmation and may vary slightly during busy periods or carrier delays.",
    highlights: [
      {
        title: "Processing",
        description: "1–2 weeks",
      },
      {
        title: "Delivery",
        description: "1–2 weeks",
      },
      {
        title: "Returns",
        description:
          "Returns are accepted within 14 days of delivery if items are unused, in their original condition, and with all original packaging and tags where applicable.",
      },
    ],
    sections: [
      {
        eyebrow: "Order flow",
        title: "From checkout to dispatch",
        paragraphs: [
          "Once payment is confirmed, the order enters processing. Orders are typically prepared within 1–2 weeks before dispatch.",
          "After dispatch, delivery usually takes 1–2 weeks depending on destination and final carrier handling.",
        ],
      },
      {
        eyebrow: "Shipping guidance",
        title: "What customers should know before ordering",
        items: [
          "Processing begins after payment confirmation.",
          "Delivery timing may vary slightly depending on destination and carrier handling.",
          "Customs duties or local import charges, if applicable, remain the responsibility of the customer unless stated otherwise at checkout.",
        ],
      },
      {
        eyebrow: "Return conditions",
        title: "Return eligibility",
        items: [
          "Returns are accepted within 14 days of delivery if items are unused, in their original condition, and with all original packaging and tags where applicable.",
          "Returned items are reviewed after receipt before approval is confirmed.",
          "Items marked as final sale or otherwise excluded at checkout are not eligible for return.",
        ],
      },
      {
        eyebrow: "Return requests",
        title: "How customers request a return",
        paragraphs: [
          "To request a return, contact support through the contact page and include your order number.",
          "If the return is approved, the next return steps will be shared directly with you.",
        ],
      },
    ],
  },
  ar: {
    eyebrow: "الشحن والاسترجاع",
    title: "مواعيد واضحة للتجهيز والتوصيل وشروط الاسترجاع المؤهلة.",
    description:
      "تجد هنا مدة تجهيز الطلب، وتوقعات التوصيل، والشروط الأساسية المعتمدة لاسترجاع طلبات كرافكسو.",
    note:
      "تبدأ هذه المدد بعد تأكيد الدفع، وقد تتغير قليلًا خلال فترات الضغط أو بحسب شركة الشحن.",
    highlights: [
      {
        title: "التجهيز",
        description: "1–2 أسبوع",
      },
      {
        title: "التوصيل",
        description: "1–2 أسبوع",
      },
      {
        title: "الاسترجاع",
        description:
          "نقبل المرتجعات خلال 14 يومًا من تاريخ الاستلام بشرط أن تكون القطع غير مستخدمة، وفي حالتها الأصلية، مع التغليف والبطاقات الأصلية عند الحاجة.",
      },
    ],
    sections: [
      {
        eyebrow: "مسار الطلب",
        title: "من الدفع حتى الإرسال",
        paragraphs: [
          "بعد تأكيد الدفع يدخل الطلب مرحلة التجهيز، وعادةً تستغرق هذه المرحلة من أسبوع إلى أسبوعين قبل الإرسال.",
          "بعد الإرسال، يستغرق التوصيل عادةً من أسبوع إلى أسبوعين بحسب الوجهة والمعالجة النهائية لدى شركة الشحن.",
        ],
      },
      {
        eyebrow: "إرشادات الشحن",
        title: "ما الذي ينبغي معرفته قبل الطلب",
        items: [
          "يبدأ تجهيز الطلب بعد تأكيد الدفع.",
          "قد تختلف مدة التوصيل قليلًا بحسب الوجهة ومعالجة شركة الشحن.",
          "أي رسوم جمركية أو رسوم استيراد محلية، إن وجدت، تكون على مسؤولية العميل ما لم يُذكر خلاف ذلك عند الدفع.",
        ],
      },
      {
        eyebrow: "شروط الاسترجاع",
        title: "أهلية الاسترجاع",
        items: [
          "نقبل المرتجعات خلال 14 يومًا من تاريخ الاستلام بشرط أن تكون القطع غير مستخدمة، وفي حالتها الأصلية، مع التغليف والبطاقات الأصلية عند الحاجة.",
          "تتم مراجعة القطع المرتجعة بعد الاستلام قبل اعتماد الطلب.",
          "المنتجات المعلّمة كبيع نهائي أو المستثناة بوضوح عند الدفع لا تكون مؤهلة للاسترجاع.",
        ],
      },
      {
        eyebrow: "طلبات الاسترجاع",
        title: "كيفية طلب الاسترجاع",
        paragraphs: [
          "لطلب الاسترجاع، تواصل مع الدعم عبر صفحة التواصل مع إرفاق رقم الطلب.",
          "عند الموافقة على الاسترجاع، سيتم تزويدك بالخطوات التالية مباشرة.",
        ],
      },
    ],
  },
};
