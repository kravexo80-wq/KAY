import type { TrustCopy } from "../trust-copy";

type ContactCopy = TrustCopy["contact"];

export const contactCopy: Record<"en" | "ar", ContactCopy> = {
  en: {
    eyebrow: "Contact",
    title: "Direct support for sizing, orders, and pre-purchase questions.",
    description:
      "Use this page for order support, sizing clarification, collection questions, or press and wholesale enquiries once those channels are ready.",
    note:
      "Reach us directly for customer care, order support, and pre-purchase guidance.",
    form: {
      successTitle: "Message received",
      successMessage:
        "Your message has been received successfully. We will review it and reply through the support channel as soon as possible.",
      errorTitle: "Message incomplete",
      errorMessage:
        "Please complete all required fields with a valid email address before sending.",
      fullName: "Full name",
      email: "Email address",
      subject: "Subject",
      message: "How can we help?",
      submit: "Send message",
    },
    direct: {
      title: "Direct contact",
      description:
        "Use the main support inbox for customer care, order questions, and general assistance.",
    },
    response: {
      title: "Response window",
      description:
        "We aim to reply within 24 hours for customer enquiries and order support.",
    },
    social: {
      title: "Social and messaging",
      description:
        "You can also reach Kravexo through Instagram and WhatsApp for quick brand and product enquiries.",
    },
    guidance: {
      eyebrow: "Customer guidance",
      title: "What to contact us about",
      items: [
        "Sizing or fit clarification before placing an order.",
        "Order-status questions once an order has been placed.",
        "Shipping or return guidance before purchase.",
        "Press, collaboration, or wholesale requests once those channels are available.",
      ],
    },
  },
  ar: {
    eyebrow: "تواصل معنا",
    title: "دعم مباشر لأسئلة المقاسات والطلبات والاستفسارات قبل الشراء.",
    description:
      "استخدم هذه الصفحة لدعم الطلبات، وتوضيح المقاسات، والاستفسار عن المجموعات، أو لطلبات الصحافة والجملة عندما تصبح هذه القنوات متاحة.",
    note: "راسلنا مباشرة لخدمة العملاء، ودعم الطلبات، والاستفسارات قبل الشراء.",
    form: {
      successTitle: "تم استلام الرسالة",
      successMessage:
        "تم استلام رسالتك بنجاح. سنراجعها ونرد عليك عبر قناة الدعم في أقرب وقت ممكن.",
      errorTitle: "الرسالة غير مكتملة",
      errorMessage:
        "يرجى تعبئة جميع الحقول المطلوبة باستخدام بريد إلكتروني صحيح قبل الإرسال.",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      subject: "الموضوع",
      message: "كيف يمكننا مساعدتك؟",
      submit: "إرسال الرسالة",
    },
    direct: {
      title: "التواصل المباشر",
      description:
        "استخدم بريد الدعم الرئيسي لخدمة العملاء، وأسئلة الطلبات، والمساعدة العامة.",
    },
    response: {
      title: "مدة الرد",
      description: "نهدف إلى الرد خلال 24 ساعة على استفسارات العملاء ودعم الطلبات.",
    },
    social: {
      title: "القنوات الاجتماعية والمراسلة",
      description:
        "يمكنك أيضًا التواصل مع كرافكسو عبر إنستغرام وواتساب للاستفسارات السريعة حول العلامة والمنتجات.",
    },
    guidance: {
      eyebrow: "إرشاد العميل",
      title: "ما الذي يمكن التواصل معنا بشأنه",
      items: [
        "الاستفسار عن المقاس أو شكل الوقفة قبل الشراء.",
        "أسئلة حالة الطلب بعد إتمامه.",
        "استيضاح الشحن أو الاسترجاع قبل الدفع.",
        "طلبات الصحافة أو التعاون أو الجملة عند تفعيل هذه القنوات.",
      ],
    },
  },
};
