import type { Database } from "@/types/database";

import { Button } from "@/components/ui/button";
import { ADMIN_ORDER_STATUS_OPTIONS } from "@/lib/supabase/orders";
import { updateOrderStatusAction } from "@/lib/supabase/order-actions";

import { OrderStatusBadge, formatOrderValueLabel } from "./order-status-badge";

type OrderStatus = Database["public"]["Enums"]["order_status"];
type PaymentStatus = Database["public"]["Enums"]["payment_status"];

interface AdminOrderStatusFormProps {
  orderId: string;
  currentStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  inventoryAdjustedAt: string | null;
  returnTo: string;
}

export function AdminOrderStatusForm({
  orderId,
  currentStatus,
  paymentStatus,
  inventoryAdjustedAt,
  returnTo,
}: AdminOrderStatusFormProps) {
  return (
    <section className="showroom-panel p-6 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Admin control</p>
          <h2 className="mt-4 text-3xl leading-none text-white">
            Order status management
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <OrderStatusBadge kind="order" value={currentStatus} />
          <OrderStatusBadge kind="payment" value={paymentStatus} />
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-white/56">
        Update fulfillment state without touching payment records. Inventory is{" "}
        {inventoryAdjustedAt ? "already finalized for this paid order." : "still waiting for paid-order finalization."}
      </p>

      <form action={updateOrderStatusAction} className="mt-6 space-y-4">
        <input type="hidden" name="orderId" value={orderId} />
        <input type="hidden" name="returnTo" value={returnTo} />

        <label className="block space-y-3">
          <span className="text-[0.62rem] uppercase tracking-[0.24em] text-white/36">
            Order status
          </span>
          <select
            name="status"
            defaultValue={currentStatus}
            className="h-12 w-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-[#b79d67]/35"
          >
            {ADMIN_ORDER_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status} className="bg-[#090909] text-white">
                {formatOrderValueLabel(status)}
              </option>
            ))}
          </select>
        </label>

        <Button type="submit" size="lg" className="w-full">
          Save order status
        </Button>
      </form>
    </section>
  );
}
