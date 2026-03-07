"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { Database } from "@/types/database";

import { getSafeRedirectPath, requireAdmin } from "./auth";
import { updateOrderStatus } from "./orders";

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

export async function updateOrderStatusAction(formData: FormData) {
  await requireAdmin("/admin/orders");

  const orderId = formData.get("orderId");
  const status = formData.get("status");
  const returnTo = getSafeRedirectPath(formData.get("returnTo"), "/admin/orders");

  if (typeof orderId !== "string" || !orderId) {
    redirect(buildRedirectPath(returnTo, "error", "Order reference is missing."));
  }

  if (
    typeof status !== "string" ||
    !ADMIN_MANAGEABLE_ORDER_STATUSES.has(status as OrderStatus)
  ) {
    redirect(buildRedirectPath(returnTo, "error", "Order status is invalid."));
  }

  try {
    const updatedOrder = await updateOrderStatus(orderId, status as OrderStatus);

    if (!updatedOrder) {
      redirect(buildRedirectPath(returnTo, "error", "Order could not be found."));
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Order status update failed.";

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
