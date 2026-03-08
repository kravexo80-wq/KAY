"use server";

import { redirect } from "next/navigation";

import { localizeHref } from "@/lib/i18n/config";
import { getRequestLocale } from "@/lib/i18n/request";

function toTrimmedString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildPath(
  pathname: string,
  params: Record<string, string | null | undefined>,
) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      searchParams.set(key, value);
    }
  }

  const query = searchParams.toString();

  return query ? `${pathname}?${query}` : pathname;
}

export async function submitNewsletterAction(formData: FormData) {
  const locale = await getRequestLocale();
  const homePath = localizeHref(locale, "/");
  const email = toTrimmedString(formData.get("email"));

  if (!isValidEmail(email)) {
    redirect(buildPath(homePath, { newsletter: "error" }));
  }

  redirect(buildPath(homePath, { newsletter: "success" }));
}

export async function submitContactAction(formData: FormData) {
  const locale = await getRequestLocale();
  const contactPath = localizeHref(locale, "/contact");
  const fullName = toTrimmedString(formData.get("full_name"));
  const email = toTrimmedString(formData.get("email"));
  const subject = toTrimmedString(formData.get("subject"));
  const message = toTrimmedString(formData.get("message"));

  if (!fullName || !isValidEmail(email) || !subject || !message) {
    redirect(buildPath(contactPath, { contact: "error" }));
  }

  redirect(buildPath(contactPath, { contact: "success" }));
}
