"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { Database } from "@/types/database";
import { getLocaleFromPathname, localizeHref, type Locale } from "@/lib/i18n/config";

import { getSafeRedirectPath, requireAdmin } from "./auth";
import { deleteOrderById, updateOrderStatus } from "./orders";

type OrderStatus = Database["public"]["Enums"]["order_status"];

const ADMIN_MANAGEABLE_ORDER_STATUSES = new Set<OrderStatus>([
  "pending",
  "confirmed",
  "processing",
  "fulfilled",
  "shipped",
  "delivered",
  "cancelled",
]);

function buildRedirectPath(basePath: string, key: string, value: string) {
  const searchParams = new URLSearchParams();
  searchParams.set(key, value);

  return `${basePath}?${searchParams.toString()}`;
}

function getActionLocale(pathname: string): Locale {
  return getLocaleFromPathname(pathname) ?? "en";
}

function getOrderActionCopy(locale: Locale) {
  if (locale === "ar") {
    return {
      missingReference: "مرجع الطلب مفقود.",
      invalidStatus: "حالة الطلب غير صالحة.",
      missingDeleteReference: "مرجع الحذف مفقود.",
      notFound: "تعذر العثور على الطلب.",
      statusFailed: "تعذر تحديث حالة الطلب.",
      deleteFailed: "تعذر حذف الطلب.",
      deleted: "تم حذف الطلب بنجاح.",
    };
  }

  return {
    missingReference: "Order reference is missing.",
    invalidStatus: "Order status is invalid.",
    missingDeleteReference: "Delete reference is missing.",
    notFound: "Order could not be found.",
    statusFailed: "Order status update failed.",
    deleteFailed: "Order delete failed.",
    deleted: "Order deleted successfully.",
  };
}

export async function updateOrderStatusAction(formData: FormData) {
  await requireAdmin("/admin/orders");

  const orderId = formData.get("orderId");
  const status = formData.get("status");
  const returnTo = getSafeRedirectPath(formData.get("returnTo"), "/admin/orders");
  const copy = getOrderActionCopy(getActionLocale(returnTo));

  if (typeof orderId !== "string" || !orderId) {
    redirect(buildRedirectPath(returnTo, "error", copy.missingReference));
  }

  if (
    typeof status !== "string" ||
    !ADMIN_MANAGEABLE_ORDER_STATUSES.has(status as OrderStatus)
  ) {
    redirect(buildRedirectPath(returnTo, "error", copy.invalidStatus));
  }

  try {
    const updatedOrder = await updateOrderStatus(orderId, status as OrderStatus);

    if (!updatedOrder) {
      redirect(buildRedirectPath(returnTo, "error", copy.notFound));
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : copy.statusFailed;

    redirect(buildRedirectPath(returnTo, "error", message));
  }

  revalidatePath("/account");
  revalidatePath("/account/orders");
  revalidatePath(`/account/orders/${orderId}`);
  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);

  redirect(buildRedirectPath(returnTo, "updated", "status"));
}

export async function deleteOrderAction(formData: FormData) {
  await requireAdmin("/admin/orders");

  const orderId = formData.get("orderId");
  const returnTo = getSafeRedirectPath(formData.get("returnTo"), "/admin/orders");
  const locale = getActionLocale(returnTo);
  const copy = getOrderActionCopy(locale);
  const ordersPath = localizeHref(locale, "/admin/orders");

  if (typeof orderId !== "string" || !orderId) {
    redirect(buildRedirectPath(returnTo, "error", copy.missingDeleteReference));
  }

  try {
    const deleted = await deleteOrderById(orderId);

    if (!deleted) {
      redirect(buildRedirectPath(returnTo, "error", copy.notFound));
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : copy.deleteFailed;

    redirect(buildRedirectPath(returnTo, "error", message));
  }

  revalidatePath("/account");
  revalidatePath("/account/orders");
  revalidatePath(`/account/orders/${orderId}`);
  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);

  redirect(buildRedirectPath(ordersPath, "updated", "deleted"));
}
