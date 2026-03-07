import type { Database } from "@/types/database";

import { cn } from "@/lib/utils";

type OrderStatus = Database["public"]["Enums"]["order_status"];
type PaymentStatus = Database["public"]["Enums"]["payment_status"];

const orderStatusClasses: Record<OrderStatus, string> = {
  pending: "border-white/12 bg-white/[0.04] text-white/68",
  confirmed: "border-[#b79d67]/26 bg-[#b79d67]/10 text-[#f2e6c3]",
  processing: "border-[#8f9cbf]/28 bg-[#8f9cbf]/10 text-[#d6ddf0]",
  fulfilled: "border-[#8cb18c]/28 bg-[#8cb18c]/10 text-[#d9ecd6]",
  shipped: "border-[#7ca7b9]/28 bg-[#7ca7b9]/10 text-[#d8e8ee]",
  delivered: "border-[#7ba07b]/28 bg-[#7ba07b]/10 text-[#d7ead5]",
  cancelled: "border-[#9c6c6c]/28 bg-[#9c6c6c]/10 text-[#ead2d2]",
  refunded: "border-[#776f8d]/28 bg-[#776f8d]/10 text-[#ddd9ec]",
};

const paymentStatusClasses: Record<PaymentStatus, string> = {
  pending: "border-white/12 bg-white/[0.04] text-white/68",
  authorized: "border-[#b79d67]/26 bg-[#b79d67]/10 text-[#f2e6c3]",
  paid: "border-[#8cb18c]/28 bg-[#8cb18c]/10 text-[#d9ecd6]",
  partially_refunded: "border-[#8b7ea8]/28 bg-[#8b7ea8]/10 text-[#ddd7ea]",
  refunded: "border-[#776f8d]/28 bg-[#776f8d]/10 text-[#ddd9ec]",
  failed: "border-[#9c6c6c]/28 bg-[#9c6c6c]/10 text-[#ead2d2]",
  cancelled: "border-[#6f6a77]/28 bg-[#6f6a77]/10 text-[#dedbe2]",
};

interface OrderStatusBadgeProps {
  kind: "order" | "payment";
  value: OrderStatus | PaymentStatus;
  className?: string;
}

export function formatOrderValueLabel(value: string) {
  return value.replace(/_/g, " ");
}

export function OrderStatusBadge({
  kind,
  value,
  className,
}: OrderStatusBadgeProps) {
  const tone =
    kind === "order"
      ? orderStatusClasses[value as OrderStatus]
      : paymentStatusClasses[value as PaymentStatus];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.62rem] uppercase tracking-[0.24em]",
        tone,
        className,
      )}
    >
      {formatOrderValueLabel(value)}
    </span>
  );
}
