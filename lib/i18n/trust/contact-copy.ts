import type { TrustCopy } from "../trust-copy";

type ContactCopy = TrustCopy["contact"];

export const contactCopy: Record<"en" | "ar", ContactCopy> = {
  en: {
    eyebrow: "Contact",
    title: "Direct support for sizing, orders, and pre-purchase questions.",
    description:
      "Use this page for order support, sizing clarification, collection questions, or press and wholesale enquiries once those channels are ready.",
    note:
      "Replace the remaining placeholders here with your final response window, contact details, and official channels before launch.",
    form: {
      successTitle: "Message received",
      successMessage:
        "Your message has been received successfully. Connect this form to your final support workflow before launch.",
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
        "Use your customer-care inbox here. If this address changes, update the site configuration and policy pages together.",
    },
    response: {
      title: "Response window",
      description:
        "Placeholder: reply within [insert target response window, for example 1-2 business days] for customer enquiries and order support.",
    },
    social: {
      title: "Social and editorial channels",
      description:
        "Placeholder: add your official Instagram, TikTok, or editorial contact channels here once they are ready.",
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
    eyebrow: "التواصل",
    title: "دعم مباشر لأسئلة المقاس والطلبات والاستفسارات قبل الشراء.",
    description:
      "استخدم هذه الصفحة لدعم الطلبات، وتوضيح المقاسات، والاستفسار عن المجموعات، أو لطلبات الصحافة والجملة عندما تصبح تلك القنوات جاهزة.",
    note:
      "استبدل العناصر المؤقتة هنا بمدة الرد النهائية وتفاصيل التواصل والقنوات الرسمية قبل الإطلاق.",
    form: {
      successTitle: "تم استلام الرسالة",
      successMessage:
        "تم استلام رسالتك بنجاح. اربط هذا النموذج بمسار الدعم النهائي قبل الإطلاق.",
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
        "ضع هنا بريد خدمة العملاء الفعلي. وإذا تغيّر لاحقًا، فحدّثه في إعدادات الموقع وصفحات السياسات معًا.",
    },
    response: {
      title: "مدة الرد",
      description:
        "عنصر نائب: الرد خلال [أدخل مدة الرد المستهدفة، مثل 1-2 يوم عمل] على استفسارات العملاء ودعم الطلبات.",
    },
    social: {
      title: "القنوات الاجتماعية والتحريرية",
      description:
        "عنصر نائب: أضف روابط إنستغرام أو تيك توك أو قنوات التواصل التحريرية الرسمية عندما تصبح جاهزة.",
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
