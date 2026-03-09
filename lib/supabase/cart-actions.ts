"use server";

import { redirect } from "next/navigation";

import { getLocaleFromPathname, localizeHref } from "@/lib/i18n/config";
import { getRequestLocale } from "@/lib/i18n/request";

import { getSafeRedirectPath } from "./auth";
import {
  addCartItem,
  removeCartItem,
  updateCartItemQuantity,
} from "./cart";

function buildRedirect(
  pathname: string,
  params: Record<string, string | undefined>,
) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
}

function parsePositiveInteger(value: FormDataEntryValue | null, fallback = 1) {
  if (typeof value !== "string") {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

function getRequiredString(
  formData: FormData,
  key: string,
  fallback = "",
) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : fallback;
}

function resolveLocalizedPath(
  sourcePath: string,
  targetPath: string,
) {
  const locale = getLocaleFromPathname(sourcePath);

  return locale ? localizeHref(locale, targetPath) : targetPath;
}

export async function addToCartAction(formData: FormData) {
  const productSlug = getRequiredString(formData, "productSlug");
  const size = getRequiredString(formData, "size");
  const productPath = getSafeRedirectPath(
    formData.get("productPath"),
    productSlug ? `/products/${productSlug}` : "/shop",
  );
  const quantity = parsePositiveInteger(formData.get("quantity"), 1);
  const color = getRequiredString(formData, "color") || null;

  if (!productSlug) {
    redirect(
      buildRedirect(productPath, {
        cartError: "This product could not be added to the cart.",
      }),
    );
  }

  const result = await addCartItem({
    productSlug,
    size,
    quantity,
    color,
    nextPath: productPath,
  });

  redirect(
    buildRedirect(productPath, {
      cartMessage: result.ok ? result.message : undefined,
      cartError: result.ok ? undefined : result.error,
    }),
  );
}

export async function buyNowAction(formData: FormData) {
  const productSlug = getRequiredString(formData, "productSlug");
  const size = getRequiredString(formData, "size");
  const productPath = getSafeRedirectPath(
    formData.get("productPath"),
    productSlug ? `/products/${productSlug}` : "/shop",
  );
  const quantity = parsePositiveInteger(formData.get("quantity"), 1);
  const color = getRequiredString(formData, "color") || null;
  const checkoutPath = resolveLocalizedPath(productPath, "/checkout");

  if (!productSlug) {
    redirect(
      buildRedirect(productPath, {
        cartError: "This product could not be prepared for checkout.",
      }),
    );
  }

  const result = await addCartItem({
    productSlug,
    size,
    quantity,
    color,
    nextPath: productPath,
  });

  if (!result.ok) {
    redirect(
      buildRedirect(productPath, {
        cartError: result.error,
      }),
    );
  }

  redirect(checkoutPath);
}

export async function updateCartItemQuantityAction(formData: FormData) {
  const cartItemId = getRequiredString(formData, "cartItemId");
  const quantity = parsePositiveInteger(formData.get("quantity"), 1);
  const cartPath = localizeHref(await getRequestLocale(), "/cart");

  if (!cartItemId) {
    redirect(
      buildRedirect(cartPath, {
        cartError: "This cart item could not be updated.",
      }),
    );
  }

  const result = await updateCartItemQuantity({
    cartItemId,
    quantity,
    nextPath: cartPath,
  });

  redirect(
    buildRedirect(cartPath, {
      cartMessage: result.ok ? result.message : undefined,
      cartError: result.ok ? undefined : result.error,
    }),
  );
}

export async function removeCartItemAction(formData: FormData) {
  const cartItemId = getRequiredString(formData, "cartItemId");
  const cartPath = localizeHref(await getRequestLocale(), "/cart");

  if (!cartItemId) {
    redirect(
      buildRedirect(cartPath, {
        cartError: "This cart item could not be removed.",
      }),
    );
  }

  const result = await removeCartItem({
    cartItemId,
    nextPath: cartPath,
  });

  redirect(
    buildRedirect(cartPath, {
      cartMessage: result.ok ? result.message : undefined,
      cartError: result.ok ? undefined : result.error,
    }),
  );
}
