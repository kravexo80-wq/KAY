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
            "These terms apply to the use of the Kravexo website and any orders placed through it. Kravexo is a trading name of [insert legal business name and registered address].",
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
      groupLabel: "Ø®Ø¯Ù…Ø© Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡",
      links: [
        { label: "Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø´Ø§Ø¦Ø¹Ø©", href: "/faq" },
        { label: "Ø§Ù„Ø´Ø­Ù† ÙˆØ§Ù„Ø§Ø³ØªØ±Ø¬Ø§Ø¹", href: "/shipping-returns" },
        { label: "Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø®ØµÙˆØµÙŠØ©", href: "/privacy-policy" },
        { label: "Ø§Ù„Ø´Ø±ÙˆØ· ÙˆØ§Ù„Ø£Ø­ÙƒØ§Ù…", href: "/terms" },
      ],
    },
    privacyPolicy: {
      eyebrow: "Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø®ØµÙˆØµÙŠØ©",
      title: "ØµÙŠØ§ØºØ© ØªØ£Ø³ÙŠØ³ÙŠØ© ÙˆØ§Ø¶Ø­Ø© Ù„Ø³ÙŠØ§Ø³Ø© Ø®ØµÙˆØµÙŠØ© Ù…ØªØ¬Ø± ÙƒØ±Ø§ÙÙƒØ³Ùˆ.",
      description:
        "Ù‡Ø°Ø§ Ø£Ø³Ø§Ø³ Ø¹Ù…Ù„ÙŠ Ù„Ù„ØªØ­Ø¶ÙŠØ± Ù„Ù„Ø¥Ø·Ù„Ø§Ù‚. ÙŠØ¬Ø¨ Ù…Ø±Ø§Ø¬Ø¹ØªÙ‡ ÙˆØ§Ø³ØªÙƒÙ…Ø§Ù„Ù‡ Ø¨Ø§Ø³Ù… Ø§Ù„Ø¬Ù‡Ø© Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© Ø§Ù„ÙØ¹Ù„ÙŠ ÙˆØ§Ù„Ø£Ø³Ø§Ø³ Ø§Ù„Ù†Ø¸Ø§Ù…ÙŠ ÙˆÙ…ØªØ·Ù„Ø¨Ø§Øª Ø§Ù„Ø§Ù…ØªØ«Ø§Ù„ Ø°Ø§Øª Ø§Ù„ØµÙ„Ø© Ù‚Ø¨Ù„ Ù†Ø´Ø±Ù‡ Ø¨ØµÙŠØºØªÙ‡ Ø§Ù„Ù†Ù‡Ø§Ø¦ÙŠØ©.",
      note:
        "Ø§Ø³ØªØ¨Ø¯Ù„ ÙƒÙ„ Ø¹Ù†ØµØ± Ø¨ÙŠÙ† Ø£Ù‚ÙˆØ§Ø³ Ù…Ø±Ø¨Ø¹Ø© Ø¨ØªÙØµÙŠÙ„Ùƒ Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠ Ø£Ùˆ Ø§Ù„ØªØ´ØºÙŠÙ„ÙŠ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠ. ÙˆØ¥Ø°Ø§ ÙƒÙ†Øª ØªØ¨ÙŠØ¹ ÙÙŠ Ø£ÙƒØ«Ø± Ù…Ù† Ù…Ù†Ø·Ù‚Ø©ØŒ ÙÙ…Ù† Ø§Ù„Ø£ÙØ¶Ù„ Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù†Øµ Ø§Ù„Ù†Ù‡Ø§Ø¦ÙŠ ÙˆÙÙ‚ Ø§Ù„Ø¬Ù‡Ø§Øª Ø§Ù„Ù†Ø¸Ø§Ù…ÙŠØ© Ø§Ù„Ù…Ø·Ø¨Ù‚Ø© Ø¹Ù„Ù‰ Ù†Ø´Ø§Ø·Ùƒ.",
      lastUpdatedLabel: "Ø¢Ø®Ø± ØªØ­Ø¯ÙŠØ«",
      lastUpdatedValue: "[Ø£Ø¯Ø®Ù„ ØªØ§Ø±ÙŠØ® Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚]",
      sections: [
        {
          title: "Ø¹Ù„Ù‰ Ù…Ù† ØªÙ†Ø·Ø¨Ù‚ Ù‡Ø°Ù‡ Ø§Ù„Ø³ÙŠØ§Ø³Ø©",
          paragraphs: [
            "ØªØ´Ø±Ø­ Ù‡Ø°Ù‡ Ø§Ù„Ø³ÙŠØ§Ø³Ø© ÙƒÙŠÙ ØªÙ‚ÙˆÙ… [Ø£Ø¯Ø®Ù„ Ø§Ù„Ø§Ø³Ù… Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠ Ù„Ù„Ù…Ù†Ø´Ø£Ø©] Ø¨Ø¬Ù…Ø¹ Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ø´Ø®ØµÙŠØ© ÙˆØ§Ø³ØªØ®Ø¯Ø§Ù…Ù‡Ø§ ÙˆØªØ®Ø²ÙŠÙ†Ù‡Ø§ ÙˆÙ…Ø´Ø§Ø±ÙƒØªÙ‡Ø§ Ø¹Ù†Ø¯ Ø²ÙŠØ§Ø±Ø© Ù…ØªØ¬Ø± ÙƒØ±Ø§ÙÙƒØ³Ùˆ Ø£Ùˆ Ø¥Ù†Ø´Ø§Ø¡ Ø­Ø³Ø§Ø¨ Ø£Ùˆ Ø¥ØªÙ…Ø§Ù… Ø·Ù„Ø¨ Ø£Ùˆ Ø§Ù„ØªÙˆØ§ØµÙ„ Ù…Ø¹ Ø§Ù„Ø¯Ø¹Ù….",
          ],
        },
        {
          title: "Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„ØªÙŠ Ù‚Ø¯ ØªÙØ¬Ù…Ø¹",
          paragraphs: [
            "Ù‚Ø¯ ÙŠØ¬Ù…Ø¹ Ø§Ù„Ù…ØªØ¬Ø± Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ù…Ø«Ù„ Ø§Ù„Ø§Ø³Ù… ÙˆØ§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ ÙˆØ¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø´Ø­Ù† ÙˆØ§Ù„ÙÙˆØªØ±Ø© ÙˆØ³Ø¬Ù„ Ø§Ù„Ø·Ù„Ø¨Ø§Øª ÙˆÙ…Ø±Ø§Ø³Ù„Ø§Øª Ø®Ø¯Ù…Ø© Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡.",
            "ÙˆÙ‚Ø¯ ØªÙØ¬Ù…Ø¹ Ø£ÙŠØ¶Ù‹Ø§ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª ØªÙ‚Ù†ÙŠØ© Ù…Ø«Ù„ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø¬Ù‡Ø§Ø² ÙˆØ§Ù„Ù…ØªØµÙØ­ ÙˆØ£Ø­Ø¯Ø§Ø« Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù… Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„Ù…ÙˆÙ‚Ø¹ ÙˆØ­Ù…Ø§ÙŠØªÙ‡.",
          ],
          items: [
            "Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ø­Ø³Ø§Ø¨",
            "Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ø¯ÙØ¹ ÙˆØ§Ù„Ø´Ø­Ù†",
            "Ø±Ø³Ø§Ø¦Ù„ Ø¯Ø¹Ù… Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡",
            "Ø¨ÙŠØ§Ù†Ø§Øª Ø£Ø³Ø§Ø³ÙŠØ© Ù„Ù„ØªØ­Ù„ÙŠÙ„Ø§Øª ÙˆØ§Ù„Ø£Ù…Ø§Ù†",
          ],
        },
        {
          title: "ÙƒÙŠÙÙŠØ© Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª",
          paragraphs: [
            "ØªÙØ³ØªØ®Ø¯Ù… Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ø´Ø®ØµÙŠØ© Ù„ØªØ´ØºÙŠÙ„ Ø§Ù„Ù…ØªØ¬Ø±ØŒ ÙˆÙ…Ø¹Ø§Ù„Ø¬Ø© Ø§Ù„Ø·Ù„Ø¨Ø§ØªØŒ ÙˆØªÙ‚Ø¯ÙŠÙ… Ø§Ù„Ø¯Ø¹Ù…ØŒ ÙˆØªÙ‚Ù„ÙŠÙ„ Ù…Ø®Ø§Ø·Ø± Ø§Ù„Ø§Ø­ØªÙŠØ§Ù„ØŒ ÙˆØªØ­Ø³ÙŠÙ† ØªØ¬Ø±Ø¨Ø© Ø§Ù„Ø¹Ù…ÙŠÙ„.",
            "Ø¥Ø°Ø§ Ø§Ø³ØªÙØ®Ø¯Ù…Øª Ø§Ù„Ø±Ø³Ø§Ø¦Ù„ Ø§Ù„ØªØ³ÙˆÙŠÙ‚ÙŠØ©ØŒ ÙÙŠØ¬Ø¨ Ø´Ø±Ø­ Ø¢Ù„ÙŠØ© Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø© ÙˆØ¥Ù„ØºØ§Ø¡ Ø§Ù„Ø§Ø´ØªØ±Ø§Ùƒ Ù‡Ù†Ø§ Ù‚Ø¨Ù„ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚.",
          ],
        },
        {
          title: "Ø§Ù„Ù…Ø´Ø§Ø±ÙƒØ© ÙˆÙ…Ù‚Ø¯Ù…Ùˆ Ø§Ù„Ø®Ø¯Ù…Ø©",
          paragraphs: [
            "Ù‚Ø¯ ØªÙØ´Ø§Ø±Ùƒ Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ù…Ø¹ Ù…Ø²ÙˆØ¯ÙŠ Ø®Ø¯Ù…Ø§Øª ÙŠØ³Ø§Ø¹Ø¯ÙˆÙ† ÙÙŠ ØªØ´ØºÙŠÙ„ Ø§Ù„Ù…ØªØ¬Ø± Ø£Ùˆ Ù…Ø¹Ø§Ù„Ø¬Ø© Ø§Ù„Ù…Ø¯ÙÙˆØ¹Ø§Øª Ø£Ùˆ Ø¯Ø¹Ù… Ø§Ù„Ø´Ø­Ù† Ø£Ùˆ Ø§Ø³ØªØ¶Ø§ÙØ© Ø§Ù„Ø¨Ù†ÙŠØ© Ø£Ùˆ ØªÙˆÙÙŠØ± Ø£Ø¯ÙˆØ§Øª Ø®Ø¯Ù…Ø© Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡.",
            "Ø§Ø°ÙƒØ± Ø£Ùˆ ØµÙ ÙØ¦Ø§Øª Ø§Ù„Ø¬Ù‡Ø§Øª Ø§Ù„ØªÙŠ ØªØ³ØªØ®Ø¯Ù…Ù‡Ø§ ÙØ¹Ù„ÙŠÙ‹Ø§ Ø¹Ù†Ø¯ Ø§Ù„Ø¥Ø·Ù„Ø§Ù‚ØŒ ÙˆØ­Ø¯Ù‘Ø« Ù‡Ø°Ø§ Ø§Ù„Ù‚Ø³Ù… Ø¥Ø°Ø§ ØªØºÙŠÙ‘Ø±Øª Ø§Ù„Ø¨Ù†ÙŠØ© Ø¨Ø´ÙƒÙ„ Ø¬ÙˆÙ‡Ø±ÙŠ.",
          ],
        },
        {
          title: "Ø§Ù„Ø§Ø­ØªÙØ§Ø¸ Ø¨Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª ÙˆØ­Ù‚ÙˆÙ‚ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡",
          paragraphs: [
            "Ø§Ø´Ø±Ø­ Ø§Ù„Ù…Ø¯Ø© Ø§Ù„ØªÙŠ ØªØ­ØªÙØ¸ Ø®Ù„Ø§Ù„Ù‡Ø§ Ø¨Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø·Ù„Ø¨Ø§Øª ÙˆØ§Ù„Ø­Ø³Ø§Ø¨Ø§Øª ÙˆØ§Ù„Ø¯Ø¹Ù…ØŒ ÙˆÙƒÙŠÙ ÙŠÙ…ÙƒÙ† Ù„Ù„Ø¹Ù…ÙŠÙ„ Ø·Ù„Ø¨ Ø§Ù„ÙˆØµÙˆÙ„ Ø£Ùˆ Ø§Ù„ØªØµØ­ÙŠØ­ Ø£Ùˆ Ø§Ù„Ø­Ø°Ù Ø¹Ù†Ø¯Ù…Ø§ ÙŠÙƒÙˆÙ† Ø°Ù„Ùƒ Ù…Ø·Ø¨Ù‚Ù‹Ø§.",
            "Ø¥Ø°Ø§ ÙƒØ§Ù†Øª Ù‡Ù†Ø§Ùƒ Ø­Ù‚ÙˆÙ‚ Ø®ØµÙˆØµÙŠØ© Ù…Ù†Ø§Ø·Ù‚ÙŠØ©ØŒ ÙØ§Ø°ÙƒØ± Ù…Ø³Ø§Ø± Ø§Ù„ØªÙˆØ§ØµÙ„ Ø§Ù„ØµØ­ÙŠØ­ Ù„Ù‡Ø°Ù‡ Ø§Ù„Ø·Ù„Ø¨Ø§Øª.",
          ],
        },
        {
          title: "Ø§Ù„ØªÙˆØ§ØµÙ„ Ø¨Ø´Ø£Ù† Ø§Ù„Ø®ØµÙˆØµÙŠØ©",
          paragraphs: [
            "ÙŠØ¬Ø¨ ØªÙˆØ¬ÙŠÙ‡ Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø®ØµÙˆØµÙŠØ© ÙˆØ§Ù„Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø§Ù„Ù…ØªØ¹Ù„Ù‚Ø© Ø¨Ù‡Ø°Ù‡ Ø§Ù„Ø³ÙŠØ§Ø³Ø© Ø¥Ù„Ù‰ [Ø£Ø¯Ø®Ù„ Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø®ØµÙˆØµÙŠØ©] ÙˆØŒ Ø¥Ø°Ø§ Ù„Ø²Ù…ØŒ [Ø£Ø¯Ø®Ù„ Ø§Ù„Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ù…Ø³Ø¬Ù„ Ø£Ùˆ ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø¬Ù‡Ø© Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„Ø©].",
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
            "تنطبق هذه الشروط على استخدام موقع كرافكسو وأي طلبات يتم تقديمها عبره. كرافكسو هو الاسم التجاري لـ [أدخل الاسم القانوني والعنوان المسجل].",
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

