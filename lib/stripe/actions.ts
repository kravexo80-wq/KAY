"use server";

import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { localizeHref } from "@/lib/i18n/config";
import { getRequestLocale } from "@/lib/i18n/request";

import { createCheckoutSession } from "./checkout";

function buildRedirect(pathname: string, params: Record<string, string | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
}

export async function startCheckoutAction() {
  const locale = await getRequestLocale();

  try {
    const session = await createCheckoutSession();

    redirect(session.url);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    redirect(
      buildRedirect(localizeHref(locale, "/checkout"), {
        error:
          error instanceof Error
            ? error.message
            : "Checkout could not be started right now.",
      }),
    );
  }
}
