"use server";

import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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
  try {
    const session = await createCheckoutSession();

    redirect(session.url);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    redirect(
      buildRedirect("/checkout", {
        error:
          error instanceof Error
            ? error.message
            : "Checkout could not be started right now.",
      }),
    );
  }
}
