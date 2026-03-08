import type { Database } from "@/types/database";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";
import { getExtendedUiCopy } from "@/lib/i18n/extended-copy";
import { ADMIN_ORDER_STATUS_OPTIONS } from "@/lib/supabase/orders";
import { updateOrderStatusAction } from "@/lib/supabase/order-actions";

import {
  OrderStatusBadge,
  getLocalizedOrderValueLabel,
} from "./order-status-badge";

type OrderStatus = Database["public"]["Enums"]["order_status"];
type PaymentStatus = Database["public"]["Enums"]["payment_status"];

interface AdminOrderStatusFormProps {
  orderId: string;
  currentStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  inventoryAdjustedAt: string | null;
  returnTo: string;
  locale: Locale;
}

export function AdminOrderStatusForm({
  orderId,
  currentStatus,
  paymentStatus,
  inventoryAdjustedAt,
  returnTo,
  locale,
}: AdminOrderStatusFormProps) {
  const copy = getExtendedUiCopy(locale).orders.adminDetail;

  return (
    <section className="showroom-panel p-6 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{copy.adminControlEyebrow}</p>
          <h2 className="mt-4 text-3xl leading-none text-white">
            {copy.adminControlTitle}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <OrderStatusBadge kind="order" value={currentStatus} locale={locale} />
          <OrderStatusBadge
            kind="payment"
            value={paymentStatus}
            locale={locale}
          />
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-white/56">
        {inventoryAdjustedAt
          ? copy.adminControlSettled
          : copy.adminControlPending}
      </p>

      <form action={updateOrderStatusAction} className="mt-6 space-y-4">
        <input type="hidden" name="orderId" value={orderId} />
        <input type="hidden" name="returnTo" value={returnTo} />

        <label className="block space-y-3">
          <span className="text-[0.62rem] uppercase tracking-[0.24em] text-white/36">
            {getExtendedUiCopy(locale).orders.orderStatus}
          </span>
          <select
            name="status"
            defaultValue={currentStatus}
            className="h-12 w-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-[#b79d67]/35"
          >
            {ADMIN_ORDER_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status} className="bg-[#090909] text-white">
                {getLocalizedOrderValueLabel(status, locale)}
              </option>
            ))}
          </select>
        </label>

        <Button type="submit" size="lg" className="w-full">
          {copy.saveOrderStatus}
        </Button>
      </form>
    </section>
  );
}
