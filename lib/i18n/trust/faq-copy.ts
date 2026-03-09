import type { TrustCopy } from "../trust-copy";

type FaqCopy = TrustCopy["faq"];

export const faqCopy: Record<"en" | "ar", FaqCopy> = {
  en: {
    eyebrow: "FAQ",
    title: "Helpful answers for sizing, delivery, payment, and order support.",
    description:
      "This page should answer the questions customers ask most before ordering, in language that stays clear, calm, and easy to trust.",
    note:
      "Keep these answers aligned with your live shipping, returns, and support policies. Avoid promising timelines or conditions you cannot consistently honor.",
    groups: [
      {
        title: "Orders and payments",
        description: "Questions customers usually ask before or right after checkout.",
        items: [
          {
            question: "When is my order confirmed?",
            answer:
              "Orders are confirmed after checkout is completed successfully. You should then receive an order confirmation email and see the order inside your account area.",
          },
          {
            question: "What payment methods do you accept?",
            answer:
              "List the payment methods enabled in your checkout here. Keep this section aligned with your live payment configuration before launch.",
          },
          {
            question: "Can I change or cancel an order after placing it?",
            answer:
              "Add your real policy here. A careful starter approach is to allow changes only before fulfilment begins, subject to support review.",
          },
        ],
      },
      {
        title: "Sizing and fit",
        description: "Use these answers to reduce uncertainty before purchase.",
        items: [
          {
            question: "How should I choose my size?",
            answer:
              "Each product page should be read together with the fit notes, fabric notes, and silhouette description. Add a dedicated size guide later if your range expands.",
          },
          {
            question: "Will colors or fabric appearance vary slightly in person?",
            answer:
              "Yes. Lighting, screen calibration, and fabric finish can create slight visual differences. Keep product photography and written fabric notes as accurate as possible.",
          },
        ],
      },
      {
        title: "Shipping and returns",
        description: "These should remain consistent with the policy page.",
        items: [
          {
            question: "How long does processing take?",
            answer:
              "Placeholder: insert your true processing window here, for example [1-3 business days], before launch.",
          },
          {
            question: "Do you ship internationally?",
            answer:
              "Add the markets you support here. If availability varies by destination, say so clearly and link to the shipping policy page.",
          },
          {
            question: "What is your return window?",
            answer:
              "Placeholder: insert your real return window and conditions here, then keep it identical across the policy and checkout experience.",
          },
        ],
      },
    ],
  },
  ar: {
    eyebrow: "الأسئلة الشائعة",
    title: "إجابات واضحة حول المقاسات والتوصيل والدفع ودعم الطلبات.",
    description:
      "يُفترض أن تجيب هذه الصفحة عن أكثر الأسئلة التي يطرحها العميل قبل الطلب، بلغة واضحة وهادئة ويسهل الوثوق بها.",
    note:
      "أبقِ هذه الإجابات متطابقة مع سياسات الشحن والاسترجاع والدعم الفعلية. ولا تعد بمدد أو شروط لا يمكنك الالتزام بها باستمرار.",
    groups: [
      {
        title: "الطلبات والدفع",
        description: "أسئلة يطرحها العميل غالبًا قبل الدفع أو بعده مباشرة.",
        items: [
          {
            question: "متى يصبح طلبي مؤكداً؟",
            answer:
              "يُؤكَّد الطلب بعد إتمام الدفع بنجاح. بعدها يفترض أن تتلقى رسالة تأكيد، وأن يظهر الطلب داخل صفحة الحساب.",
          },
          {
            question: "ما وسائل الدفع المقبولة؟",
            answer:
              "اذكر هنا وسائل الدفع المفعّلة فعليًا داخل صفحة الدفع. احرص على أن يظل هذا القسم مطابقًا لإعداداتك الحية قبل الإطلاق.",
          },
          {
            question: "هل يمكن تعديل الطلب أو إلغاؤه بعد إنشائه؟",
            answer:
              "أضف السياسة الفعلية هنا. والصياغة الحذرة عادة هي السماح بالتعديل فقط قبل بدء التجهيز، وفق مراجعة فريق الدعم.",
          },
        ],
      },
      {
        title: "المقاس والوقفة",
        description: "هذه الإجابات تقلل التردد قبل الشراء.",
        items: [
          {
            question: "كيف أختار المقاس المناسب؟",
            answer:
              "ينبغي قراءة صفحة المنتج مع ملاحظات المقاس والخامة ووصف القصة العامة للقطعة. ويمكن إضافة دليل مقاسات مستقل لاحقًا إذا توسعت المجموعة.",
          },
          {
            question: "هل قد يختلف اللون أو مظهر الخامة قليلًا في الواقع؟",
            answer:
              "نعم، قد تظهر فروقات طفيفة بحسب الإضاءة وإعدادات الشاشة ولمسة الخامة نفسها. لذلك يجب أن تبقى الصور وملاحظات الخامة دقيقة قدر الإمكان.",
          },
        ],
      },
      {
        title: "الشحن والاسترجاع",
        description: "يجب أن تتطابق هذه الإجابات مع صفحة السياسة.",
        items: [
          {
            question: "كم يستغرق تجهيز الطلب؟",
            answer:
              "عنصر نائب: أدخل مدة التجهيز الفعلية هنا، مثل [1-3 أيام عمل]، قبل الإطلاق.",
          },
          {
            question: "هل يوجد شحن دولي؟",
            answer:
              "اذكر الأسواق التي تدعمها فعليًا. وإذا كانت الإتاحة تختلف بحسب الدولة، فوضح ذلك بصراحة واربط هذه الإجابة بصفحة الشحن.",
          },
          {
            question: "ما مدة الاسترجاع؟",
            answer:
              "عنصر نائب: أدخل مدة الاسترجاع وشروطه الفعلية هنا، ثم أبقها مطابقة تمامًا لما يظهر في السياسة وعند الدفع.",
          },
        ],
      },
    ],
  },
};
