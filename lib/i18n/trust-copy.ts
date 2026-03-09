import type { Locale } from "./config";
import { aboutCopy } from "./trust/about-copy";
import { contactCopy } from "./trust/contact-copy";
import { faqCopy } from "./trust/faq-copy";
import { legalCopy } from "./trust/legal-copy";
import { shippingReturnsCopy } from "./trust/shipping-returns-copy";

export type TrustLink = {
  label: string;
  href: string;
};

export type TrustCard = {
  title: string;
  description: string;
};

export type TrustPanel = {
  eyebrow?: string;
  title: string;
  description?: string;
  paragraphs?: string[];
  items?: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqGroup = {
  title: string;
  description: string;
  items: FaqItem[];
};

export type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

export type TrustCopy = {
  footer: {
    groupLabel: string;
    links: TrustLink[];
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    story: TrustPanel;
    values: TrustPanel & { cards: TrustCard[] };
    principles: TrustPanel & { cards: TrustCard[] };
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    form: {
      successTitle: string;
      successMessage: string;
      errorTitle: string;
      errorMessage: string;
      fullName: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
    };
    direct: TrustCard;
    response: TrustCard;
    social: TrustCard;
    guidance: TrustPanel;
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    groups: FaqGroup[];
  };
  shippingReturns: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    highlights: TrustCard[];
    sections: TrustPanel[];
  };
  privacyPolicy: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    lastUpdatedLabel: string;
    lastUpdatedValue: string;
    sections: LegalSection[];
  };
  terms: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    lastUpdatedLabel: string;
    lastUpdatedValue: string;
    sections: LegalSection[];
  };
};

const trustCopy: Record<Locale, TrustCopy> = {
  en: {
    footer: legalCopy.en.footer,
    about: aboutCopy.en,
    contact: contactCopy.en,
    faq: faqCopy.en,
    shippingReturns: shippingReturnsCopy.en,
    privacyPolicy: legalCopy.en.privacyPolicy,
    terms: legalCopy.en.terms,
  },
  ar: {
    footer: legalCopy.ar.footer,
    about: aboutCopy.ar,
    contact: contactCopy.ar,
    faq: faqCopy.ar,
    shippingReturns: shippingReturnsCopy.ar,
    privacyPolicy: legalCopy.ar.privacyPolicy,
    terms: legalCopy.ar.terms,
  },
};

export function getTrustCopy(locale: Locale) {
  return trustCopy[locale];
}
