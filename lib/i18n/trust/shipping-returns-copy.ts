import type { TrustCopy } from "../trust-copy";

type ShippingReturnsCopy = TrustCopy["shippingReturns"];

export const shippingReturnsCopy: Record<"en" | "ar", ShippingReturnsCopy> = {
  en: {
    eyebrow: "Shipping & Returns",
    title: "A clear guide to processing, delivery, and return eligibility.",
    description:
      "This page should explain how an order moves from placement to delivery, and what conditions apply if a return is requested.",
    note:
      "Every timeline and condition below should be replaced with your real operating policy before launch. Do not leave placeholder numbers buried in the published copy.",
    highlights: [
      {
        title: "Processing",
        description:
          "Placeholder: orders are typically prepared within [insert processing window].",
      },
      {
        title: "Delivery",
        description:
          "Placeholder: delivery time depends on destination and courier service selected at checkout.",
      },
      {
        title: "Returns",
        description:
          "Placeholder: accepted within [insert return window] if items meet the eligibility conditions below.",
      },
    ],
    sections: [
      {
        eyebrow: "Order flow",
        title: "From checkout to dispatch",
        paragraphs: [
          "Once payment is confirmed, the order enters processing. During this stage, stock is verified, garments are prepared, and shipment details are finalized.",
          "When the parcel is handed to the selected carrier, the order status should move to shipped and the customer should receive the tracking details available for that order.",
        ],
      },
      {
        eyebrow: "Shipping guidance",
        title: "What customers should know before ordering",
        items: [
          "State the countries or regions you currently ship to.",
          "Clarify whether customs duties, taxes, or local import fees are included or collected separately.",
          "If signature delivery or delivery exceptions apply, explain them here before launch.",
        ],
      },
      {
        eyebrow: "Return conditions",
        title: "Starter return policy structure",
        items: [
          "Items should generally be unworn, unwashed, and returned in original condition.",
          "Any hygiene-sensitive, made-to-order, or clearly marked final-sale products should be excluded if that reflects your real policy.",
          "Returned items should be inspected before approval and refund processing.",
        ],
      },
      {
        eyebrow: "Return requests",
        title: "How customers request a return",
        paragraphs: [
          "Add the real return-request method here, such as account-based requests or a dedicated support email.",
          "If return shipping is customer-paid in some cases and brand-paid in others, explain the distinction clearly instead of leaving it implied.",
        ],
      },
    ],
  },
  ar: {
    eyebrow: "الشحن والاسترجاع",
    title: "دليل واضح لزمن التجهيز والتوصيل وشروط أهلية الاسترجاع.",
    description:
      "ينبغي أن تشرح هذه الصفحة مسار الطلب من لحظة إنشائه حتى التسليم، وما الشروط المطبقة عند طلب الاسترجاع.",
    note:
      "يجب استبدال كل مدة وكل شرط هنا بسياساتك التشغيلية الفعلية قبل الإطلاق. ولا تترك أرقاماً مؤقتة مدفونة داخل النص المنشور.",
    highlights: [
      {
        title: "التجهيز",
        description: "عنصر نائب: يتم تجهيز الطلبات عادة خلال [أدخل مدة التجهيز].",
      },
      {
        title: "التوصيل",
        description:
          "عنصر نائب: تعتمد مدة التوصيل على الوجهة وعلى شركة الشحن المختارة عند الدفع.",
      },
      {
        title: "الاسترجاع",
        description:
          "عنصر نائب: يُقبل خلال [أدخل مدة الاسترجاع] إذا استوفت القطع شروط الأهلية أدناه.",
      },
    ],
    sections: [
      {
        eyebrow: "مسار الطلب",
        title: "من الدفع حتى الإرسال",
        paragraphs: [
          "بعد تأكيد الدفع يدخل الطلب مرحلة التجهيز. وخلال هذه المرحلة يتم التحقق من المخزون وتجهيز القطعة وإنهاء تفاصيل الشحنة.",
          "عند تسليم الشحنة إلى الناقل ينبغي أن تتغير حالة الطلب إلى تم الشحن، وأن تصل للعميل معلومات التتبع المتاحة لذلك الطلب.",
        ],
      },
      {
        eyebrow: "إرشادات الشحن",
        title: "ما ينبغي أن يعرفه العميل قبل الطلب",
        items: [
          "اذكر الدول أو المناطق التي تشحن إليها حاليًا.",
          "وضّح ما إذا كانت الرسوم الجمركية أو الضرائب أو رسوم الاستيراد المحلية مشمولة أم تُحصّل بشكل منفصل.",
          "إذا كان هناك تسليم بتوقيع أو استثناءات في التسليم، فينبغي شرحها هنا بوضوح قبل الإطلاق.",
        ],
      },
      {
        eyebrow: "شروط الاسترجاع",
        title: "بنية أولية لسياسة الاسترجاع",
        items: [
          "يُفترض عادة أن تكون القطع غير مستخدمة وغير مغسولة وفي حالتها الأصلية.",
          "إذا كانت هناك منتجات حساسة أو مصنوعة حسب الطلب أو معروضة كبيع نهائي، فيجب استثناؤها فقط إذا كان ذلك يعكس سياستك الحقيقية.",
          "ينبغي فحص القطع المرتجعة قبل اعتماد الاسترجاع أو إعادة المبلغ.",
        ],
      },
      {
        eyebrow: "طلبات الاسترجاع",
        title: "كيف يطلب العميل الاسترجاع",
        paragraphs: [
          "أضف هنا الطريقة الفعلية لطلب الاسترجاع، سواء من خلال الحساب أو عبر بريد دعم مخصص.",
          "إذا كانت رسوم الإرجاع يتحملها العميل في بعض الحالات وتتحملها العلامة في حالات أخرى، فيجب شرح ذلك بوضوح لا تركه ضمنيًا.",
        ],
      },
    ],
  },
};
