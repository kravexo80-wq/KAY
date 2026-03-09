import "server-only";

import type Stripe from "stripe";

import type { Tables } from "@/types/database";

import { getLocalizedCatalogField } from "@/lib/i18n/catalog";
import { getRequestLocale } from "@/lib/i18n/request";
import { requireAuth } from "@/lib/supabase/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";

import { getAppUrl, hasStripeCheckoutEnv } from "./config";
import {
  attachStripeSessionToOrder,
  markOrderAsCheckoutStartFailed,
  prepareCheckoutOrder,
} from "./orders";
import type { PreparedCheckoutCart, PreparedCheckoutItem } from "./orders";
import { getStripeServerClient } from "./server";

type CheckoutCartRecord = Pick<
  Tables<"carts">,
  "id" | "user_id" | "status" | "currency_code" | "updated_at"
>;
type CheckoutProductImageRecord = Pick<
  Tables<"product_images">,
  | "id"
  | "image_url"
  | "storage_path"
  | "label"
  | "label_ar"
  | "angle"
  | "angle_ar"
  | "sort_order"
  | "is_primary"
>;
type CheckoutProductRecord = Pick<
  Tables<"products">,
  | "id"
  | "slug"
  | "name"
  | "name_ar"
  | "short_description"
  | "short_description_ar"
  | "base_price"
  | "is_active"
> & {
  category: Pick<Tables<"categories">, "name" | "name_ar"> | null;
  images: CheckoutProductImageRecord[] | null;
};
type CheckoutVariantRecord = Pick<
  Tables<"product_variants">,
  | "id"
  | "sku"
  | "size"
  | "color"
  | "price_override"
  | "stock_quantity"
  | "is_active"
> & {
  product: CheckoutProductRecord | null;
};
type CheckoutCartItemRecord = Pick<
  Tables<"cart_items">,
  "id" | "quantity" | "unit_price"
> & {
  product_variant: CheckoutVariantRecord | null;
};

export type CheckoutStateStatus =
  | "ready"
  | "empty"
  | "unconfigured"
  | "error";

export interface CheckoutPageItem {
  id: string;
  productName: string;
  productSlug: string;
  categoryName: string;
  shortDescription: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  size: string;
  color: string | null;
  sku: string;
  imageUrl: string | null;
  mediaLabel: string | null;
  mediaAngle: string | null;
}

export interface CheckoutPageData {
  cartId: string | null;
  itemCount: number;
  subtotal: number;
  shippingAmount: number;
  total: number;
  currencyCode: string;
  items: CheckoutPageItem[];
}

export interface CheckoutPageResult {
  data: CheckoutPageData;
  error: string | null;
  status: CheckoutStateStatus;
}

interface CreateCheckoutSessionResult {
  orderId: string;
  sessionId: string;
  url: string;
}

interface AuthenticatedCheckoutCart {
  cart: CheckoutCartRecord | null;
  customerEmail: string | null;
  items: CheckoutCartItemRecord[];
  userId: string;
}

const CHECKOUT_UNCONFIGURED_MESSAGE =
  "Secure checkout is not configured in this environment yet.";

const checkoutItemsSelect = `
  id,
  quantity,
  unit_price,
  product_variant:product_variants (
    id,
    sku,
    size,
    color,
    price_override,
    stock_quantity,
    is_active,
    product:products (
      id,
      slug,
      name,
      name_ar,
      short_description,
      short_description_ar,
      base_price,
      is_active,
      category:categories (
        name,
        name_ar
      ),
      images:product_images (
        id,
        image_url,
        storage_path,
        label,
        label_ar,
        angle,
        angle_ar,
        sort_order,
        is_primary
      )
    )
  )
`;

function createEmptyCheckoutData(): CheckoutPageData {
  return {
    cartId: null,
    itemCount: 0,
    subtotal: 0,
    shippingAmount: 0,
    total: 0,
    currencyCode: "USD",
    items: [],
  };
}

function toStripeAmount(value: number) {
  return Math.round(value * 100);
}

function resolveImage(
  record: CheckoutProductImageRecord[] | null,
  locale: Awaited<ReturnType<typeof getRequestLocale>>,
) {
  if (!record || record.length === 0) {
    return {
      imageUrl: null,
      mediaAngle: null,
      mediaLabel: null,
    };
  }

  const sortedImages = [...record].sort((left, right) => {
    if (left.is_primary === right.is_primary) {
      return left.sort_order - right.sort_order;
    }

    return left.is_primary ? -1 : 1;
  });
  const image = sortedImages[0];

  return {
    imageUrl: image.image_url,
    mediaAngle: getLocalizedCatalogField(
      image as Record<string, unknown>,
      "angle",
      locale,
    ),
    mediaLabel: getLocalizedCatalogField(
      image as Record<string, unknown>,
      "label",
      locale,
    ),
  };
}

async function getAuthenticatedCheckoutCart(): Promise<AuthenticatedCheckoutCart> {
  const { user } = await requireAuth("/checkout");
  const supabase = await createServerSupabaseClient();
  const { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id, user_id, status, currency_code, updated_at")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (cartError) {
    throw new Error(`Failed to load checkout cart: ${cartError.message}`);
  }

  if (!cart) {
    return {
      cart: null,
      customerEmail: user.email ?? null,
      items: [],
      userId: user.id,
    };
  }

  const { data: items, error: itemsError } = await supabase
    .from("cart_items")
    .select(checkoutItemsSelect)
    .eq("cart_id", cart.id)
    .order("created_at", { ascending: false });

  if (itemsError) {
    throw new Error(`Failed to load checkout items: ${itemsError.message}`);
  }

  return {
    cart: cart as CheckoutCartRecord,
    customerEmail: user.email ?? null,
    items: (items ?? []) as CheckoutCartItemRecord[],
    userId: user.id,
  };
}

async function buildPreparedCheckoutCart(): Promise<PreparedCheckoutCart | null> {
  if (!hasStripeCheckoutEnv()) {
    throw new Error(CHECKOUT_UNCONFIGURED_MESSAGE);
  }

  const locale = await getRequestLocale();
  const checkoutCart = await getAuthenticatedCheckoutCart();

  if (!checkoutCart.customerEmail) {
    throw new Error("Your account is missing an email address for checkout.");
  }

  if (!checkoutCart.cart) {
    return null;
  }

  const items: PreparedCheckoutItem[] = checkoutCart.items.flatMap((item) => {
    const variant = item.product_variant;
    const product = variant?.product;

    if (!variant || !product || !variant.is_active || !product.is_active) {
      return [];
    }

    if (item.quantity > variant.stock_quantity) {
      throw new Error(
        `Only ${variant.stock_quantity} piece${
          variant.stock_quantity === 1 ? "" : "s"
        } remain for ${product.name} in size ${variant.size}.`,
      );
    }

    if (variant.stock_quantity < 1) {
      throw new Error(`${product.name} in size ${variant.size} is unavailable.`);
    }

    const media = resolveImage(product.images, locale);

    return [
      {
        cartItemId: item.id,
        productId: product.id,
        variantId: variant.id,
        productSlug: product.slug,
        productName: getLocalizedCatalogField(
          product as Record<string, unknown>,
          "name",
          locale,
        ),
        categoryName: product.category
          ? getLocalizedCatalogField(
              product.category as Record<string, unknown>,
              "name",
              locale,
            )
          : locale === "ar"
            ? "غير مصنف"
            : "Uncategorized",
        shortDescription: getLocalizedCatalogField(
          product as Record<string, unknown>,
          "short_description",
          locale,
        ),
        sku: variant.sku,
        size: variant.size,
        color: variant.color,
        quantity: item.quantity,
        unitPrice: Number(item.unit_price),
        stockQuantity: variant.stock_quantity,
        imageUrl: media.imageUrl,
        mediaLabel: media.mediaLabel,
        mediaAngle: media.mediaAngle,
      },
    ];
  });

  const subtotal = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return {
    cartId: checkoutCart.cart.id,
    cartStatus: checkoutCart.cart.status,
    cartUpdatedAt: checkoutCart.cart.updated_at,
    currencyCode: checkoutCart.cart.currency_code,
    customerEmail: checkoutCart.customerEmail,
    itemCount,
    shippingAmount: 0,
    subtotal,
    total: subtotal,
    userId: checkoutCart.userId,
    items,
  };
}

function createStripeLineItem(item: PreparedCheckoutItem) {
  const descriptor = item.color
    ? `${item.categoryName} - Size ${item.size} - ${item.color}`
    : `${item.categoryName} - Size ${item.size}`;
  const productData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData.ProductData =
    {
      name: item.productName,
      description: descriptor,
      metadata: {
        product_id: item.productId,
        variant_id: item.variantId,
        product_slug: item.productSlug,
        sku: item.sku,
        size: item.size,
        color: item.color ?? "",
      },
    };

  if (item.imageUrl && /^https?:\/\//.test(item.imageUrl)) {
    productData.images = [item.imageUrl];
  }

  return {
    quantity: item.quantity,
    price_data: {
      currency: "usd",
      unit_amount: toStripeAmount(item.unitPrice),
      product_data: productData,
    },
  } satisfies Stripe.Checkout.SessionCreateParams.LineItem;
}

export async function getCheckoutPageData(): Promise<CheckoutPageResult> {
  if (!hasStripeCheckoutEnv()) {
    return {
      data: createEmptyCheckoutData(),
      error: CHECKOUT_UNCONFIGURED_MESSAGE,
      status: "unconfigured",
    };
  }

  try {
    const cart = await buildPreparedCheckoutCart();

    if (!cart || cart.items.length === 0) {
      return {
        data: createEmptyCheckoutData(),
        error: null,
        status: "empty",
      };
    }

    return {
      data: {
        cartId: cart.cartId,
        itemCount: cart.itemCount,
        subtotal: cart.subtotal,
        shippingAmount: cart.shippingAmount,
        total: cart.total,
        currencyCode: cart.currencyCode,
        items: cart.items.map((item) => ({
          id: item.cartItemId,
          productName: item.productName,
          productSlug: item.productSlug,
          categoryName: item.categoryName,
          shortDescription: item.shortDescription,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal: item.unitPrice * item.quantity,
          size: item.size,
          color: item.color,
          sku: item.sku,
          imageUrl: item.imageUrl,
          mediaLabel: item.mediaLabel,
          mediaAngle: item.mediaAngle,
        })),
      },
      error: null,
      status: "ready",
    };
  } catch (error) {
    console.error("Failed to load checkout page data.", error);

    return {
      data: createEmptyCheckoutData(),
      error:
        error instanceof Error
          ? error.message
          : "Checkout could not be prepared right now.",
      status: "error",
    };
  }
}

export async function createCheckoutSession(): Promise<CreateCheckoutSessionResult> {
  const cart = await buildPreparedCheckoutCart();

  if (!cart || cart.items.length === 0) {
    throw new Error("Add at least one piece to your cart before checkout.");
  }

  const stripe = getStripeServerClient();
  const order = await prepareCheckoutOrder({ cart });
  const appUrl = getAppUrl();
  let session: Stripe.Checkout.Session;

  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      customer_email: cart.customerEmail,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AE", "SA", "QA", "KW", "BH", "OM"],
      },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel?order_id=${order.id}`,
      line_items: cart.items.map(createStripeLineItem),
      metadata: {
        cart_id: cart.cartId,
        order_id: order.id,
        shipping_amount: `${cart.shippingAmount}`,
        subtotal_amount: `${cart.subtotal}`,
        total_amount: `${cart.total}`,
        user_id: cart.userId,
      },
      payment_intent_data: {
        metadata: {
          cart_id: cart.cartId,
          order_id: order.id,
          user_id: cart.userId,
        },
      },
    });
  } catch (error) {
    await markOrderAsCheckoutStartFailed(
      order.id,
      error instanceof Error
        ? error.message
        : "The payment session could not be created right now.",
    );

    throw error;
  }

  if (!session.url) {
    throw new Error(
      "The payment session did not return a redirect URL for checkout.",
    );
  }

  await attachStripeSessionToOrder(order.id, session.id);

  return {
    orderId: order.id,
    sessionId: session.id,
    url: session.url,
  };
}
