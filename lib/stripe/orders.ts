import "server-only";

import type Stripe from "stripe";

import type {
  Database,
  Json,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/types/database";

import { createServiceRoleSupabaseClient } from "@/lib/supabase/server";

import { getStripeServerClient } from "./server";

type CartStatus = Database["public"]["Enums"]["cart_status"];
type OrderStatus = Database["public"]["Enums"]["order_status"];
type PaymentStatus = Database["public"]["Enums"]["payment_status"];
type OrderRow = Tables<"orders">;
type OrderInsert = TablesInsert<"orders">;
type OrderUpdate = TablesUpdate<"orders">;
type OrderItemInsert = TablesInsert<"order_items">;

export interface PreparedCheckoutItem {
  cartItemId: string;
  productId: string;
  variantId: string;
  productSlug: string;
  productName: string;
  categoryName: string;
  shortDescription: string;
  sku: string;
  size: string;
  color: string | null;
  quantity: number;
  unitPrice: number;
  stockQuantity: number;
  imageUrl: string | null;
  mediaLabel: string | null;
  mediaAngle: string | null;
}

export interface PreparedCheckoutCart {
  cartId: string;
  cartStatus: CartStatus;
  cartUpdatedAt: string;
  currencyCode: string;
  itemCount: number;
  subtotal: number;
  shippingAmount: number;
  total: number;
  customerEmail: string;
  userId: string;
  items: PreparedCheckoutItem[];
}

interface PrepareOrderInput {
  cart: PreparedCheckoutCart;
}

interface UpsertOrderFromSessionInput {
  session: Stripe.Checkout.Session;
  orderStatusOverride?: OrderStatus;
  paymentStatusOverride?: PaymentStatus;
}

interface StripeLineItemSnapshot {
  productId: string | null;
  variantId: string | null;
  productSlug: string;
  productName: string;
  sku: string | null;
  size: string | null;
  color: string | null;
  quantity: number;
  unitPrice: number;
  imageUrl: string | null;
  description: string | null;
}

function isStripeProduct(
  product: Stripe.Product | Stripe.DeletedProduct | null | undefined,
): product is Stripe.Product {
  return Boolean(product && !("deleted" in product && product.deleted));
}

function toCurrencyAmount(value: number | null | undefined) {
  return Number(((value ?? 0) / 100).toFixed(2));
}

function parseStripeMetadataNumber(
  value: string | null | undefined,
  fallback: number,
) {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseFloat(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

function mapAddress(address: Stripe.Address | null | undefined) {
  if (!address) {
    return {} satisfies Json;
  }

  return {
    city: address.city ?? null,
    country: address.country ?? null,
    line1: address.line1 ?? null,
    line2: address.line2 ?? null,
    postal_code: address.postal_code ?? null,
    state: address.state ?? null,
  } satisfies Json;
}

function buildShippingAddress(session: Stripe.Checkout.Session) {
  const shipping = session.collected_information?.shipping_details;

  if (!shipping) {
    return {} satisfies Json;
  }

  return {
    name: shipping.name,
    address: mapAddress(shipping.address),
  } satisfies Json;
}

function buildBillingAddress(session: Stripe.Checkout.Session) {
  const customerDetails = session.customer_details;

  if (!customerDetails) {
    return {} satisfies Json;
  }

  return {
    name: customerDetails.name ?? null,
    email: customerDetails.email ?? null,
    phone: customerDetails.phone ?? null,
    address: mapAddress(customerDetails.address),
  } satisfies Json;
}

function buildOrderNote(cart: PreparedCheckoutCart) {
  return `Secure checkout initiated from cart ${cart.cartId}.`;
}

function createOrderItemSnapshot(item: PreparedCheckoutItem) {
  return {
    category: item.categoryName,
    image_url: item.imageUrl,
    media_angle: item.mediaAngle,
    media_label: item.mediaLabel,
    short_description: item.shortDescription,
    sku: item.sku,
    size: item.size,
    color: item.color,
    unit_price: item.unitPrice,
  } satisfies Json;
}

function createStripeLineItemSnapshot(
  lineItem: Stripe.ApiList<Stripe.LineItem>["data"][number],
) {
  const rawProduct =
    typeof lineItem.price?.product === "string" ? null : lineItem.price?.product;
  const product = isStripeProduct(rawProduct) ? rawProduct : null;
  const metadata = product?.metadata ?? {};

  return {
    productId: metadata.product_id || null,
    variantId: metadata.variant_id || null,
    productSlug: metadata.product_slug || lineItem.description || "product",
    productName: lineItem.description || product?.name || "Kravexo product",
    sku: metadata.sku || null,
    size: metadata.size || null,
    color: metadata.color || null,
    quantity: lineItem.quantity ?? 1,
    unitPrice: toCurrencyAmount(lineItem.price?.unit_amount),
    imageUrl: product?.images?.[0] ?? null,
    description: product?.description ?? lineItem.description ?? null,
  } satisfies StripeLineItemSnapshot;
}

function normalizeEmail(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? null;
}

function mapSessionStatusToOrderStatus(
  session: Stripe.Checkout.Session,
  existingStatus?: OrderStatus,
) {
  if (session.status === "expired") {
    return "cancelled" satisfies OrderStatus;
  }

  if (session.payment_status === "paid") {
    return existingStatus === "confirmed" ? "confirmed" : existingStatus ?? "pending";
  }

  return existingStatus ?? "pending";
}

function mapSessionStatusToPaymentStatus(session: Stripe.Checkout.Session) {
  if (session.status === "expired") {
    return "cancelled" satisfies PaymentStatus;
  }

  if (session.payment_status === "paid") {
    return "paid" satisfies PaymentStatus;
  }

  if (session.payment_status === "unpaid") {
    return "pending" satisfies PaymentStatus;
  }

  return "pending" satisfies PaymentStatus;
}

async function findOrderByStripeSessionId(
  stripeCheckoutSessionId: string,
) {
  const supabase = createServiceRoleSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("stripe_checkout_session_id", stripeCheckoutSessionId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load order by session: ${error.message}`);
  }

  return data;
}

async function findOrderById(orderId: string) {
  const supabase = createServiceRoleSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load order by id: ${error.message}`);
  }

  return data;
}

async function replaceOrderItems(
  orderId: string,
  items: OrderItemInsert[],
) {
  const supabase = createServiceRoleSupabaseClient();
  const { error: deleteError } = await supabase
    .from("order_items")
    .delete()
    .eq("order_id", orderId);

  if (deleteError) {
    throw new Error(`Failed to clear previous order items: ${deleteError.message}`);
  }

  if (items.length === 0) {
    return;
  }

  const { error: insertError } = await supabase.from("order_items").insert(items);

  if (insertError) {
    throw new Error(`Failed to insert order items: ${insertError.message}`);
  }
}

async function getOrderItemCount(orderId: string) {
  const supabase = createServiceRoleSupabaseClient();
  const { count, error } = await supabase
    .from("order_items")
    .select("id", { count: "exact", head: true })
    .eq("order_id", orderId);

  if (error) {
    throw new Error(`Failed to count order items: ${error.message}`);
  }

  return count ?? 0;
}

export async function prepareCheckoutOrder({ cart }: PrepareOrderInput) {
  const supabase = createServiceRoleSupabaseClient();
  const orderInsert = {
    user_id: cart.userId,
    cart_id: cart.cartId,
    customer_email: cart.customerEmail,
    currency_code: cart.currencyCode,
    subtotal_amount: cart.subtotal,
    shipping_amount: cart.shippingAmount,
    total_amount: cart.total,
    status: "pending",
    payment_status: "pending",
    shipping_address: {},
    billing_address: {},
    notes: buildOrderNote(cart),
  } satisfies OrderInsert;

  const { data: order, error } = await supabase
    .from("orders")
    .insert(orderInsert)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to create checkout order: ${error.message}`);
  }

  const orderItems = cart.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_variant_id: item.variantId,
    product_name: item.productName,
    product_slug: item.productSlug,
    sku: item.sku,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
    unit_price: item.unitPrice,
    product_snapshot: createOrderItemSnapshot(item),
  } satisfies OrderItemInsert));

  await replaceOrderItems(order.id, orderItems);

  return order;
}

export async function attachStripeSessionToOrder(
  orderId: string,
  stripeCheckoutSessionId: string,
) {
  const supabase = createServiceRoleSupabaseClient();
  const orderUpdate = {
    stripe_checkout_session_id: stripeCheckoutSessionId,
  } satisfies OrderUpdate;
  const { data, error } = await supabase
    .from("orders")
    .update(orderUpdate)
    .eq("id", orderId)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Failed to attach Stripe session to order: ${error.message}`);
  }

  return data;
}

export async function clearCartAfterSuccessfulCheckout(
  cartId: string | null | undefined,
) {
  if (!cartId) {
    return;
  }

  const supabase = createServiceRoleSupabaseClient();
  const { error: deleteItemsError } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartId);

  if (deleteItemsError) {
    throw new Error(`Failed to clear cart items: ${deleteItemsError.message}`);
  }

  const { error: updateCartError } = await supabase
    .from("carts")
    .update({ status: "converted" satisfies CartStatus })
    .eq("id", cartId);

  if (updateCartError) {
    throw new Error(`Failed to convert cart: ${updateCartError.message}`);
  }
}

export async function syncCheckoutSessionForUser(
  sessionId: string,
  userId: string,
  userEmail?: string | null,
) {
  const stripe = getStripeServerClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const sessionUserId = session.metadata?.user_id ?? null;
  const normalizedUserEmail = normalizeEmail(userEmail);
  const sessionEmail = normalizeEmail(
    session.customer_details?.email ?? session.customer_email ?? null,
  );

  if (sessionUserId && sessionUserId !== userId) {
    throw new Error("This checkout session does not belong to the current account.");
  }

  if (!sessionUserId && normalizedUserEmail && sessionEmail) {
    if (normalizedUserEmail !== sessionEmail) {
      throw new Error("This checkout session does not belong to the current account.");
    }
  }

  const order = await upsertOrderFromCheckoutSession({ session });

  if (session.payment_status === "paid") {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    });

    await syncOrderItemsFromStripeSession(order.id, lineItems.data);
    await finalizePaidOrderInventory(order.id);
    await clearCartAfterSuccessfulCheckout(session.metadata?.cart_id);
  }

  return order;
}

export async function finalizePaidOrderInventory(orderId: string) {
  const supabase = createServiceRoleSupabaseClient();
  const { data, error } = await supabase.rpc("finalize_paid_order_inventory", {
    order_uuid: orderId,
  });

  if (error) {
    throw new Error(`Failed to finalize paid order inventory: ${error.message}`);
  }

  return Boolean(data);
}

export async function markOrderAsCheckoutStartFailed(
  orderId: string,
  reason: string,
) {
  const supabase = createServiceRoleSupabaseClient();
  const { error } = await supabase
    .from("orders")
    .update({
      status: "cancelled",
      payment_status: "failed",
      notes: `Payment session creation failed: ${reason}`,
    } satisfies OrderUpdate)
    .eq("id", orderId);

  if (error) {
    throw new Error(`Failed to mark checkout start failure on order: ${error.message}`);
  }
}

export async function upsertOrderFromCheckoutSession({
  session,
  orderStatusOverride,
  paymentStatusOverride,
}: UpsertOrderFromSessionInput) {
  const supabase = createServiceRoleSupabaseClient();
  const orderId = session.metadata?.order_id ?? null;
  const cartId = session.metadata?.cart_id ?? null;
  const userId = session.metadata?.user_id ?? null;
  const customerEmail =
    session.customer_details?.email ?? session.customer_email ?? null;

  if (!customerEmail) {
    throw new Error("The checkout session does not include a customer email.");
  }

  const existingOrder =
    (await findOrderByStripeSessionId(session.id)) ??
    (orderId ? await findOrderById(orderId) : null);

  const orderUpdate = {
    user_id: existingOrder?.user_id ?? userId,
    cart_id: existingOrder?.cart_id ?? cartId,
    customer_email: customerEmail,
    currency_code:
      session.currency?.toUpperCase() ??
      existingOrder?.currency_code ??
      "USD",
    subtotal_amount:
      toCurrencyAmount(session.amount_subtotal) ??
      existingOrder?.subtotal_amount ??
      0,
    shipping_amount:
      toCurrencyAmount(session.total_details?.amount_shipping) ??
      existingOrder?.shipping_amount ??
      0,
    total_amount:
      toCurrencyAmount(session.amount_total) ??
      existingOrder?.total_amount ??
      0,
    shipping_address: buildShippingAddress(session),
    billing_address: buildBillingAddress(session),
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id ?? existingOrder?.stripe_payment_intent_id,
    payment_status:
      paymentStatusOverride ?? mapSessionStatusToPaymentStatus(session),
    status:
      orderStatusOverride ??
      mapSessionStatusToOrderStatus(session, existingOrder?.status),
    paid_at:
      session.payment_status === "paid"
        ? existingOrder?.paid_at ?? new Date().toISOString()
        : existingOrder?.paid_at ?? null,
    notes:
      existingOrder?.notes ||
      `Checkout session ${session.id} synchronized after payment confirmation.`,
  } satisfies OrderUpdate;

  let order: OrderRow;

  if (existingOrder) {
    const { data, error } = await supabase
      .from("orders")
      .update(orderUpdate)
      .eq("id", existingOrder.id)
      .select("*")
      .single();

    if (error) {
      throw new Error(`Failed to update order from checkout session: ${error.message}`);
    }

    order = data;
  } else {
    const orderInsert = {
      user_id: userId,
      cart_id: cartId,
      customer_email: customerEmail,
      currency_code: session.currency?.toUpperCase() ?? "USD",
      subtotal_amount: parseStripeMetadataNumber(
        session.metadata?.subtotal_amount,
        toCurrencyAmount(session.amount_subtotal),
      ),
      shipping_amount: parseStripeMetadataNumber(
        session.metadata?.shipping_amount,
        toCurrencyAmount(session.total_details?.amount_shipping),
      ),
      total_amount: parseStripeMetadataNumber(
        session.metadata?.total_amount,
        toCurrencyAmount(session.amount_total),
      ),
      shipping_address: buildShippingAddress(session),
      billing_address: buildBillingAddress(session),
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
      payment_status:
        paymentStatusOverride ?? mapSessionStatusToPaymentStatus(session),
      status: orderStatusOverride ?? mapSessionStatusToOrderStatus(session),
      paid_at: session.payment_status === "paid" ? new Date().toISOString() : null,
      notes: `Order created from checkout session ${session.id}.`,
    } satisfies OrderInsert;

    const { data, error } = await supabase
      .from("orders")
      .insert(orderInsert)
      .select("*")
      .single();

    if (error) {
      throw new Error(`Failed to create order from checkout session: ${error.message}`);
    }

    order = data;
  }

  return order;
}

export async function syncOrderItemsFromStripeSession(
  orderId: string,
  lineItems: Stripe.ApiList<Stripe.LineItem>["data"],
) {
  const existingCount = await getOrderItemCount(orderId);

  if (existingCount > 0) {
    return;
  }

  const orderItems = lineItems.map((lineItem) => {
    const snapshot = createStripeLineItemSnapshot(lineItem);

    return {
      order_id: orderId,
      product_id: snapshot.productId,
      product_variant_id: snapshot.variantId,
      product_name: snapshot.productName,
      product_slug: snapshot.productSlug,
      sku: snapshot.sku,
      size: snapshot.size,
      color: snapshot.color,
      quantity: snapshot.quantity,
      unit_price: snapshot.unitPrice,
      product_snapshot: {
        description: snapshot.description,
        image_url: snapshot.imageUrl,
        sku: snapshot.sku,
        size: snapshot.size,
        color: snapshot.color,
      } satisfies Json,
    } satisfies OrderItemInsert;
  });

  await replaceOrderItems(orderId, orderItems);
}
