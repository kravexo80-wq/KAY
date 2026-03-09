"use server";

import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { localizeHref } from "@/lib/i18n/config";
import { getRequestLocale } from "@/lib/i18n/request";

import { createCheckoutSession } from "./checkout";
import {
  buildCheckoutShippingQueryParams,
  getCheckoutShippingDetailsFromFormData,
  validateCheckoutShippingDetails,
} from "./shipping";

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

export async function startCheckoutAction(formData: FormData) {
  const locale = await getRequestLocale();
  const shippingDetails = getCheckoutShippingDetailsFromFormData(formData);
  const shippingError = validateCheckoutShippingDetails(shippingDetails, locale);

  if (shippingError) {
    redirect(
      buildRedirect(localizeHref(locale, "/checkout"), {
        error: shippingError,
        ...buildCheckoutShippingQueryParams(shippingDetails),
      }),
    );
  }

  try {
    const session = await createCheckoutSession({ shippingDetails });

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
        ...buildCheckoutShippingQueryParams(shippingDetails),
      }),
    );
  }
}
