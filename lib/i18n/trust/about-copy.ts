import type { TrustCopy } from "../trust-copy";

type AboutCopy = TrustCopy["about"];

export const aboutCopy: Record<"en" | "ar", AboutCopy> = {
  en: {
    eyebrow: "About Kravexo",
    title: "A modern modest fashion house presented with showroom discipline.",
    description:
      "Kravexo approaches Arabic and Islamic clothing through atmosphere, proportion, and refinement. Every piece is framed to feel deliberate, ceremonial, and quietly luxurious.",
    note:
      "Keep this page aligned with your final founder story, studio details, and brand milestones before launch.",
    story: {
      eyebrow: "Brand story",
      title: "Why the brand exists",
      paragraphs: [
        "Kravexo was built around a simple idea: modest fashion deserves the same level of visual prestige, editorial restraint, and product focus often reserved for luxury objects.",
        "The brand language draws from Arabic elegance, contemporary tailoring, and the calm confidence of garments that do not rely on noise to feel significant.",
        "Instead of a fast-retail tone, Kravexo presents each product as a centerpiece. Space, light, and composition are used to give modest silhouettes the gravity they deserve.",
      ],
    },
    values: {
      eyebrow: "Values",
      title: "What guides the collection direction",
      description:
        "These principles shape how pieces are designed, presented, and described across the storefront.",
      cards: [
        {
          title: "Modesty with clarity",
          description:
            "Coverage, proportion, and movement are treated as design strengths rather than compromises.",
        },
        {
          title: "Luxury without excess",
          description:
            "The visual identity stays dark, calm, and exact so materials and silhouette carry the impression of value.",
        },
        {
          title: "Cultural respect",
          description:
            "Arabic and Islamic references should feel rooted, dignified, and considered rather than decorative shorthand.",
        },
      ],
    },
    principles: {
      eyebrow: "Design point of view",
      title: "How the showroom experience is shaped",
      description:
        "The storefront is designed to support long-term trust, product credibility, and a premium sense of care.",
      cards: [
        {
          title: "Product-first staging",
          description:
            "Layouts isolate the garment so surface, tailoring, and fall remain central to the experience.",
        },
        {
          title: "Thoughtful storytelling",
          description:
            "Descriptions should explain fit, fabric, and use without sounding generic or overstated.",
        },
        {
          title: "Quiet confidence",
          description:
            "Every page should feel composed, polished, and respectful of the customer's attention.",
        },
      ],
    },
  },
  ar: {
    eyebrow: "عن كرافكسو",
    title: "دار أزياء محتشمة حديثة تُقدَّم بانضباط بصري يشبه صالات العرض الراقية.",
    description:
      "تتعامل كرافكسو مع الأزياء العربية والإسلامية من خلال الجو العام، والنِّسَب، والدقة في التقديم. كل قطعة تُعرض بوصفها محورًا بصريًا هادئًا وفاخرًا.",
    note:
      "احرص على أن تبقى هذه الصفحة منسجمة مع قصة المؤسس النهائية وتفاصيل الاستوديو ومحطات العلامة قبل الإطلاق.",
    story: {
      eyebrow: "قصة العلامة",
      title: "لماذا وُجدت كرافكسو",
      paragraphs: [
        "بُنيت كرافكسو على فكرة واضحة: الأزياء المحتشمة تستحق مستوى التقديم البصري والهيبة التحريرية نفسها التي تُمنح عادةً للمنتجات الفاخرة.",
        "لغة العلامة تستلهم الأناقة العربية، والخياطة المعاصرة، والثقة الهادئة للقطع التي لا تحتاج إلى ضجيج حتى تبدو ذات قيمة.",
        "بدلاً من نبرة البيع السريع، تُقدَّم كل قطعة هنا كأنها مركز المشهد. المساحة والضوء والترتيب البصري كلها موجودة لخدمة المنتج نفسه.",
      ],
    },
    values: {
      eyebrow: "القيم",
      title: "ما الذي يوجّه اتجاه المجموعة",
      description: "هذه المبادئ تؤثر في التصميم، والوصف، وطريقة العرض داخل المتجر بالكامل.",
      cards: [
        {
          title: "الاحتشام بوصفه وضوحًا",
          description: "التغطية، والنِّسَب، وحركة القطعة تُعامل كعناصر قوة تصميمية وليست تنازلات.",
        },
        {
          title: "فخامة بلا مبالغة",
          description: "الهوية البصرية تبقى داكنة وهادئة ودقيقة حتى تحمل الخامة والقصّة إحساس القيمة.",
        },
        {
          title: "احترام المرجعية الثقافية",
          description: "الإشارات العربية والإسلامية يجب أن تبدو متجذرة وكريمة ومدروسة، لا مجرد زخرفة سطحية.",
        },
      ],
    },
    principles: {
      eyebrow: "وجهة النظر التصميمية",
      title: "كيف تتشكل تجربة صالة العرض",
      description: "المتجر مصمم لدعم الثقة الطويلة المدى ومصداقية المنتج والإحساس الرفيع بالعناية.",
      cards: [
        {
          title: "عرض يضع المنتج أولاً",
          description: "يُعزل المنتج بصريًا حتى تبقى الخامة، والخياطة، وانسياب القطعة في مركز التجربة.",
        },
        {
          title: "سرد مدروس",
          description: "الوصف يجب أن يشرح المقاس والخامة والاستخدام دون مبالغة أو لغة عامة فارغة.",
        },
        {
          title: "ثقة هادئة",
          description: "كل صفحة يجب أن تبدو متزنة ومصقولة وتحترم انتباه العميل ووقته.",
        },
      ],
    },
  },
};
