import "server-only";

import type { Database, Json, Tables } from "@/types/database";

import { createServerSupabaseClient } from "./server";

type OrderStatus = Database["public"]["Enums"]["order_status"];
type PaymentStatus = Database["public"]["Enums"]["payment_status"];
type OrderRow = Tables<"orders">;
type OrderItemRow = Tables<"order_items">;

type OrderSummaryRow = Pick<
  OrderRow,
  | "id"
  | "order_number"
  | "created_at"
  | "updated_at"
  | "status"
  | "payment_status"
  | "subtotal_amount"
  | "shipping_amount"
  | "total_amount"
  | "currency_code"
  | "customer_email"
  | "paid_at"
  | "inventory_adjusted_at"
>;

type OrderItemSelectRow = Pick<
  OrderItemRow,
  | "id"
  | "product_id"
  | "product_variant_id"
  | "product_name"
  | "product_slug"
  | "sku"
  | "size"
  | "color"
  | "quantity"
  | "unit_price"
  | "line_total"
  | "product_snapshot"
  | "created_at"
>;

type OrderDetailRow = OrderSummaryRow &
  Pick<
    OrderRow,
    | "user_id"
    | "cart_id"
    | "shipping_address"
    | "billing_address"
    | "notes"
    | "stripe_checkout_session_id"
    | "stripe_payment_intent_id"
  > & {
    order_items: OrderItemSelectRow[] | null;
  };

type OrderCountRow = OrderSummaryRow & {
  order_items: Pick<OrderItemRow, "quantity">[] | null;
};

const ORDER_SUMMARY_SELECT = `
  id,
  order_number,
  created_at,
  updated_at,
  status,
  payment_status,
  subtotal_amount,
  shipping_amount,
  total_amount,
  currency_code,
  customer_email,
  paid_at,
  inventory_adjusted_at
`;

const ORDER_DETAIL_SELECT = `
  ${ORDER_SUMMARY_SELECT},
  user_id,
  cart_id,
  shipping_address,
  billing_address,
  notes,
  stripe_checkout_session_id,
  stripe_payment_intent_id,
  order_items (
    id,
    product_id,
    product_variant_id,
    product_name,
    product_slug,
    sku,
    size,
    color,
    quantity,
    unit_price,
    line_total,
    product_snapshot,
    created_at
  )
`;

export const ADMIN_ORDER_STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "processing",
  "fulfilled",
  "shipped",
  "delivered",
  "cancelled",
] satisfies OrderStatus[];

export interface OrderAddressSummary {
  name: string | null;
  email: string | null;
  phone: string | null;
  line1: string | null;
  line2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
}

export interface OrderLineItem {
  id: string;
  productId: string | null;
  variantId: string | null;
  productName: string;
  productSlug: string;
  sku: string | null;
  size: string | null;
  color: string | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  imageUrl: string | null;
  description: string | null;
  createdAt: string;
}

export interface AccountOrderSummary {
  id: string;
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotalAmount: number;
  shippingAmount: number;
  totalAmount: number;
  currencyCode: string;
  customerEmail: string;
  paidAt: string | null;
  inventoryAdjustedAt: string | null;
  itemCount: number;
}

export interface OrderDetail extends AccountOrderSummary {
  userId: string | null;
  cartId: string | null;
  notes: string;
  stripeCheckoutSessionId: string | null;
  stripePaymentIntentId: string | null;
  shippingAddress: OrderAddressSummary;
  billingAddress: OrderAddressSummary;
  lineItems: OrderLineItem[];
}

function isJsonObject(
  value: Json | null | undefined,
): value is { [key: string]: Json | undefined } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getStringValue(value: Json | null | undefined) {
  return typeof value === "string" ? value : null;
}

function getAddressSummary(value: Json): OrderAddressSummary {
  if (!isJsonObject(value)) {
    return {
      name: null,
      email: null,
      phone: null,
      line1: null,
      line2: null,
      city: null,
      state: null,
      postalCode: null,
      country: null,
    };
  }

  const address = isJsonObject(value.address) ? value.address : undefined;

  return {
    name: getStringValue(value.name),
    email: getStringValue(value.email),
    phone: getStringValue(value.phone),
    line1: getStringValue(address?.line1),
    line2: getStringValue(address?.line2),
    city: getStringValue(address?.city),
    state: getStringValue(address?.state),
    postalCode: getStringValue(address?.postal_code),
    country: getStringValue(address?.country),
  };
}

function getLineItemImage(value: Json) {
  if (!isJsonObject(value)) {
    return null;
  }

  return getStringValue(value.image_url);
}

function getLineItemDescription(value: Json) {
  if (!isJsonObject(value)) {
    return null;
  }

  return getStringValue(value.description) ?? getStringValue(value.short_description);
}

function getItemCount(items: OrderItemSelectRow[] | null | undefined) {
  return (items ?? []).reduce((total, item) => total + item.quantity, 0);
}

function sanitizeOrderNote(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return value
    .replace(/Stripe Checkout/gi, "secure checkout")
    .replace(/Stripe checkout/gi, "secure checkout")
    .replace(/Stripe session/gi, "payment session")
    .replace(/Stripe/gi, "payment")
    .replace(/Supabase/gi, "the system");
}

function mapOrderSummary(
  order: OrderSummaryRow & { order_items?: OrderItemSelectRow[] | null },
): AccountOrderSummary {
  return {
    id: order.id,
    orderNumber: order.order_number,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    status: order.status,
    paymentStatus: order.payment_status,
    subtotalAmount: Number(order.subtotal_amount),
    shippingAmount: Number(order.shipping_amount),
    totalAmount: Number(order.total_amount),
    currencyCode: order.currency_code,
    customerEmail: order.customer_email,
    paidAt: order.paid_at,
    inventoryAdjustedAt: order.inventory_adjusted_at,
    itemCount: getItemCount(order.order_items),
  };
}

function mapOrderSummaryFromCountRow(order: OrderCountRow): AccountOrderSummary {
  return {
    id: order.id,
    orderNumber: order.order_number,
    createdAt: order.created_at,
    updatedAt: order.updated_at,
    status: order.status,
    paymentStatus: order.payment_status,
    subtotalAmount: Number(order.subtotal_amount),
    shippingAmount: Number(order.shipping_amount),
    totalAmount: Number(order.total_amount),
    currencyCode: order.currency_code,
    customerEmail: order.customer_email,
    paidAt: order.paid_at,
    inventoryAdjustedAt: order.inventory_adjusted_at,
    itemCount: (order.order_items ?? []).reduce(
      (total, item) => total + item.quantity,
      0,
    ),
  };
}

function mapOrderLineItem(item: OrderItemSelectRow): OrderLineItem {
  return {
    id: item.id,
    productId: item.product_id,
    variantId: item.product_variant_id,
    productName: item.product_name,
    productSlug: item.product_slug,
    sku: item.sku,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
    unitPrice: Number(item.unit_price),
    lineTotal: Number(item.line_total),
    imageUrl: getLineItemImage(item.product_snapshot),
    description: getLineItemDescription(item.product_snapshot),
    createdAt: item.created_at,
  };
}

function mapOrderDetail(order: OrderDetailRow): OrderDetail {
  return {
    ...mapOrderSummary(order),
    userId: order.user_id,
    cartId: order.cart_id,
    notes: sanitizeOrderNote(order.notes),
    stripeCheckoutSessionId: order.stripe_checkout_session_id,
    stripePaymentIntentId: order.stripe_payment_intent_id,
    shippingAddress: getAddressSummary(order.shipping_address),
    billingAddress: getAddressSummary(order.billing_address),
    lineItems: (order.order_items ?? []).map(mapOrderLineItem),
  };
}

export async function getRecentOrdersForCurrentUser(limit = 4) {
  return getOrdersByUser(limit);
}

export async function getOrdersByUser(limit?: number) {
  const supabase = await createServerSupabaseClient();
  let query = supabase
    .from("orders")
    .select(`${ORDER_SUMMARY_SELECT}, order_items ( quantity )`)
    .order("created_at", { ascending: false });

  if (typeof limit === "number") {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to load orders for current user.", error);
    return [];
  }

  return ((data ?? []) as OrderCountRow[]).map(mapOrderSummaryFromCountRow);
}

export async function getOrderByIdForUser(orderId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select(ORDER_DETAIL_SELECT)
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    console.error("Failed to load user order detail.", error);
    return null;
  }

  return data ? mapOrderDetail(data as OrderDetailRow) : null;
}

export async function getAllOrdersForAdmin(limit?: number) {
  const supabase = await createServerSupabaseClient();
  let query = supabase
    .from("orders")
    .select(`${ORDER_SUMMARY_SELECT}, order_items ( quantity )`)
    .order("created_at", { ascending: false });

  if (typeof limit === "number") {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to load admin orders.", error);
    return [];
  }

  return ((data ?? []) as OrderCountRow[]).map(mapOrderSummaryFromCountRow);
}

export async function getOrderByIdForAdmin(orderId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select(ORDER_DETAIL_SELECT)
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    console.error("Failed to load admin order detail.", error);
    return null;
  }

  return data ? mapOrderDetail(data as OrderDetailRow) : null;
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select(ORDER_DETAIL_SELECT)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to update order status: ${error.message}`);
  }

  return data ? mapOrderDetail(data as OrderDetailRow) : null;
}

export async function deleteOrderById(orderId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to delete order: ${error.message}`);
  }

  return Boolean(data?.id);
}

export async function getCurrentUserOrderByStripeSessionId(sessionId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select(ORDER_SUMMARY_SELECT)
    .eq("stripe_checkout_session_id", sessionId)
    .maybeSingle();

  if (error) {
    console.error("Failed to load order by checkout session id.", error);
    return null;
  }

  return data
    ? mapOrderSummaryFromCountRow({
        ...(data as OrderSummaryRow),
        order_items: null,
      })
    : null;
}
