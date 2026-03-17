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
        "Reply within 1-8 days for customer enquiries and order support.",
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
    eyebrow: "Ø§Ù„ØªÙˆØ§ØµÙ„",
    title: "Ø¯Ø¹Ù… Ù…Ø¨Ø§Ø´Ø± Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ù…Ù‚Ø§Ø³ ÙˆØ§Ù„Ø·Ù„Ø¨Ø§Øª ÙˆØ§Ù„Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ù‚Ø¨Ù„ Ø§Ù„Ø´Ø±Ø§Ø¡.",
    description:
      "Ø§Ø³ØªØ®Ø¯Ù… Ù‡Ø°Ù‡ Ø§Ù„ØµÙØ­Ø© Ù„Ø¯Ø¹Ù… Ø§Ù„Ø·Ù„Ø¨Ø§ØªØŒ ÙˆØªÙˆØ¶ÙŠØ­ Ø§Ù„Ù…Ù‚Ø§Ø³Ø§ØªØŒ ÙˆØ§Ù„Ø§Ø³ØªÙØ³Ø§Ø± Ø¹Ù† Ø§Ù„Ù…Ø¬Ù…ÙˆØ¹Ø§ØªØŒ Ø£Ùˆ Ù„Ø·Ù„Ø¨Ø§Øª Ø§Ù„ØµØ­Ø§ÙØ© ÙˆØ§Ù„Ø¬Ù…Ù„Ø© Ø¹Ù†Ø¯Ù…Ø§ ØªØµØ¨Ø­ ØªÙ„Ùƒ Ø§Ù„Ù‚Ù†ÙˆØ§Øª Ø¬Ø§Ù‡Ø²Ø©.",
    note:
      "Ø§Ø³ØªØ¨Ø¯Ù„ Ø§Ù„Ø¹Ù†Ø§ØµØ± Ø§Ù„Ù…Ø¤Ù‚ØªØ© Ù‡Ù†Ø§ Ø¨Ù…Ø¯Ø© Ø§Ù„Ø±Ø¯ Ø§Ù„Ù†Ù‡Ø§Ø¦ÙŠØ© ÙˆØªÙØ§ØµÙŠÙ„ Ø§Ù„ØªÙˆØ§ØµÙ„ ÙˆØ§Ù„Ù‚Ù†ÙˆØ§Øª Ø§Ù„Ø±Ø³Ù…ÙŠØ© Ù‚Ø¨Ù„ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚.",
    form: {
      successTitle: "ØªÙ… Ø§Ø³ØªÙ„Ø§Ù… Ø§Ù„Ø±Ø³Ø§Ù„Ø©",
      successMessage:
        "ØªÙ… Ø§Ø³ØªÙ„Ø§Ù… Ø±Ø³Ø§Ù„ØªÙƒ Ø¨Ù†Ø¬Ø§Ø­. Ø§Ø±Ø¨Ø· Ù‡Ø°Ø§ Ø§Ù„Ù†Ù…ÙˆØ°Ø¬ Ø¨Ù…Ø³Ø§Ø± Ø§Ù„Ø¯Ø¹Ù… Ø§Ù„Ù†Ù‡Ø§Ø¦ÙŠ Ù‚Ø¨Ù„ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚.",
      errorTitle: "Ø§Ù„Ø±Ø³Ø§Ù„Ø© ØºÙŠØ± Ù…ÙƒØªÙ…Ù„Ø©",
      errorMessage:
        "ÙŠØ±Ø¬Ù‰ ØªØ¹Ø¨Ø¦Ø© Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ„ Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø© Ø¨Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø¨Ø±ÙŠØ¯ Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ ØµØ­ÙŠØ­ Ù‚Ø¨Ù„ Ø§Ù„Ø¥Ø±Ø³Ø§Ù„.",
      fullName: "Ø§Ù„Ø§Ø³Ù… Ø§Ù„ÙƒØ§Ù…Ù„",
      email: "Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ",
      subject: "Ø§Ù„Ù…ÙˆØ¶ÙˆØ¹",
      message: "ÙƒÙŠÙ ÙŠÙ…ÙƒÙ†Ù†Ø§ Ù…Ø³Ø§Ø¹Ø¯ØªÙƒØŸ",
      submit: "Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø±Ø³Ø§Ù„Ø©",
    },
    direct: {
      title: "Ø§Ù„ØªÙˆØ§ØµÙ„ Ø§Ù„Ù…Ø¨Ø§Ø´Ø±",
      description:
        "Ø¶Ø¹ Ù‡Ù†Ø§ Ø¨Ø±ÙŠØ¯ Ø®Ø¯Ù…Ø© Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡ Ø§Ù„ÙØ¹Ù„ÙŠ. ÙˆØ¥Ø°Ø§ ØªØºÙŠÙ‘Ø± Ù„Ø§Ø­Ù‚Ù‹Ø§ØŒ ÙØ­Ø¯Ù‘Ø«Ù‡ ÙÙŠ Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ù…ÙˆÙ‚Ø¹ ÙˆØµÙØ­Ø§Øª Ø§Ù„Ø³ÙŠØ§Ø³Ø§Øª Ù…Ø¹Ù‹Ø§.",
    },
    response: {
      title: "مدة الرد",
      description: "نرد خلال 1-8 أيام لاستفسارات العملاء ودعم الطلبات.",
    },
    social: {
      title: "Ø§Ù„Ù‚Ù†ÙˆØ§Øª Ø§Ù„Ø§Ø¬ØªÙ…Ø§Ø¹ÙŠØ© ÙˆØ§Ù„ØªØ­Ø±ÙŠØ±ÙŠØ©",
      description:
        "Ø¹Ù†ØµØ± Ù†Ø§Ø¦Ø¨: Ø£Ø¶Ù Ø±ÙˆØ§Ø¨Ø· Ø¥Ù†Ø³ØªØºØ±Ø§Ù… Ø£Ùˆ ØªÙŠÙƒ ØªÙˆÙƒ Ø£Ùˆ Ù‚Ù†ÙˆØ§Øª Ø§Ù„ØªÙˆØ§ØµÙ„ Ø§Ù„ØªØ­Ø±ÙŠØ±ÙŠØ© Ø§Ù„Ø±Ø³Ù…ÙŠØ© Ø¹Ù†Ø¯Ù…Ø§ ØªØµØ¨Ø­ Ø¬Ø§Ù‡Ø²Ø©.",
    },
    guidance: {
      eyebrow: "Ø¥Ø±Ø´Ø§Ø¯ Ø§Ù„Ø¹Ù…ÙŠÙ„",
      title: "Ù…Ø§ Ø§Ù„Ø°ÙŠ ÙŠÙ…ÙƒÙ† Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§ Ø¨Ø´Ø£Ù†Ù‡",
      items: [
        "Ø§Ù„Ø§Ø³ØªÙØ³Ø§Ø± Ø¹Ù† Ø§Ù„Ù…Ù‚Ø§Ø³ Ø£Ùˆ Ø´ÙƒÙ„ Ø§Ù„ÙˆÙ‚ÙØ© Ù‚Ø¨Ù„ Ø§Ù„Ø´Ø±Ø§Ø¡.",
        "Ø£Ø³Ø¦Ù„Ø© Ø­Ø§Ù„Ø© Ø§Ù„Ø·Ù„Ø¨ Ø¨Ø¹Ø¯ Ø¥ØªÙ…Ø§Ù…Ù‡.",
        "Ø§Ø³ØªÙŠØ¶Ø§Ø­ Ø§Ù„Ø´Ø­Ù† Ø£Ùˆ Ø§Ù„Ø§Ø³ØªØ±Ø¬Ø§Ø¹ Ù‚Ø¨Ù„ Ø§Ù„Ø¯ÙØ¹.",
        "Ø·Ù„Ø¨Ø§Øª Ø§Ù„ØµØ­Ø§ÙØ© Ø£Ùˆ Ø§Ù„ØªØ¹Ø§ÙˆÙ† Ø£Ùˆ Ø§Ù„Ø¬Ù…Ù„Ø© Ø¹Ù†Ø¯ ØªÙØ¹ÙŠÙ„ Ù‡Ø°Ù‡ Ø§Ù„Ù‚Ù†ÙˆØ§Øª.",
      ],
    },
  },
};


