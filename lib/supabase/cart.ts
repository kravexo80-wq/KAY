import "server-only";

import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import type {
  Database,
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/types/database";
import type { ProductMedia } from "@/types/product";

import { getLocalizedCatalogField } from "@/lib/i18n/catalog";
import { getRequestLocale } from "@/lib/i18n/request";

import { getCurrentUser, requireAuth } from "./auth";
import { hasSupabaseEnv } from "./config";
import { createServerSupabaseClient } from "./server";

type CartRow = Tables<"carts">;
type CartItemRow = Tables<"cart_items">;
type ProductRow = Tables<"products">;
type VariantRow = Tables<"product_variants">;
type CartInsert = TablesInsert<"carts">;
type CartItemInsert = TablesInsert<"cart_items">;
type CartItemUpdate = TablesUpdate<"cart_items">;

type CartProductCategorySummary = Pick<Tables<"categories">, "name" | "name_ar">;
type CartProductImageSummary = Pick<
  Tables<"product_images">,
  | "id"
  | "label"
  | "label_ar"
  | "angle"
  | "angle_ar"
  | "note"
  | "note_ar"
  | "tone"
  | "sort_order"
  | "is_primary"
>;

type CartProductSummary = Pick<
  Tables<"products">,
  | "id"
  | "slug"
  | "name"
  | "name_ar"
  | "short_description"
  | "short_description_ar"
  | "limited_edition"
> & {
  category: CartProductCategorySummary | null;
  images: CartProductImageSummary[] | null;
};

type CartVariantSummary = Pick<
  Tables<"product_variants">,
  "id" | "sku" | "size" | "color" | "stock_quantity" | "is_active"
> & {
  product: CartProductSummary | null;
};

type ProductSelectionSummary = Pick<
  ProductRow,
  "id" | "slug" | "name" | "base_price"
>;

type VariantSelectionSummary = Pick<
  VariantRow,
  "id" | "sku" | "size" | "color" | "price_override" | "stock_quantity"
>;

type CartItemDetailRecord = Pick<
  Tables<"cart_items">,
  "id" | "cart_id" | "quantity" | "unit_price"
> & {
  product_variant: CartVariantSummary | null;
};

export type CartQueryStatus =
  | "ready"
  | "unconfigured"
  | "unauthenticated"
  | "error";

export interface CartQueryResult<T> {
  data: T;
  error: string | null;
  status: CartQueryStatus;
}

export interface CartDetailItem {
  id: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  variantId: string;
  sku: string;
  size: string;
  color: string | null;
  stockQuantity: number;
  product: {
    slug: string;
    name: string;
    category: string;
    shortDescription: string;
    limitedEdition: boolean;
    media: ProductMedia;
  };
}

export interface CartDetails {
  cartId: string | null;
  currencyCode: string;
  itemCount: number;
  subtotal: number;
  items: CartDetailItem[];
}

export interface CartMutationResult {
  ok: boolean;
  message?: string;
  error?: string;
}

interface AddCartItemInput {
  productSlug: string;
  size: string;
  quantity: number;
  color?: string | null;
  nextPath: string;
}

interface UpdateCartItemQuantityInput {
  cartItemId: string;
  quantity: number;
  nextPath: string;
}

interface RemoveCartItemInput {
  cartItemId: string;
  nextPath: string;
}

interface ResolvedVariantSelection {
  product: ProductSelectionSummary;
  variant: VariantSelectionSummary;
}

const CART_UNCONFIGURED_MESSAGE =
  "Cart features are not configured in this environment yet.";
const CART_ERROR_MESSAGE =
  "The cart could not be updated right now. Please try again shortly.";

const cartItemDetailsSelect = `
  id,
  cart_id,
  quantity,
  unit_price,
  product_variant:product_variants (
    id,
    sku,
    size,
    color,
    stock_quantity,
    is_active,
    product:products (
      id,
      slug,
      name,
      name_ar,
      short_description,
      short_description_ar,
      limited_edition,
      category:categories (
        name,
        name_ar
      ),
      images:product_images (
        id,
        label,
        label_ar,
        angle,
        angle_ar,
        note,
        note_ar,
        tone,
        sort_order,
        is_primary
      )
    )
  )
`;

function createCartResult<T>(
  data: T,
  status: CartQueryStatus,
  error: string | null = null,
): CartQueryResult<T> {
  return {
    data,
    error,
    status,
  };
}

function createEmptyCartDetails(): CartDetails {
  return {
    cartId: null,
    currencyCode: "USD",
    itemCount: 0,
    subtotal: 0,
    items: [],
  };
}

function throwOnError(error: PostgrestError | null, label: string) {
  if (error) {
    throw new Error(`${label}: ${error.message}`);
  }
}

function createFallbackCartMedia(
  product: CartProductSummary,
  locale: Awaited<ReturnType<typeof getRequestLocale>>,
): ProductMedia {
  return {
    id: `${product.slug}-cart-placeholder`,
    label: locale === "ar" ? "إطار المعرض" : "Showroom frame",
    angle: locale === "ar" ? "العرض الرئيسي" : "Primary display",
    note: locale === "ar" ? "بانتظار صور الاستوديو" : "Awaiting studio imagery",
    tone: "obsidian",
  };
}

function mapCartItemRecord(
  record: CartItemDetailRecord,
  locale: Awaited<ReturnType<typeof getRequestLocale>>,
): CartDetailItem | null {
  if (!record.product_variant?.product) {
    return null;
  }

  const product = record.product_variant.product;
  const gallery = [...(product.images ?? [])].sort(
    (left, right) => left.sort_order - right.sort_order,
  );
  const media: ProductMedia =
    gallery[0]
      ? {
          id: gallery[0].id,
          label: getLocalizedCatalogField(
            gallery[0] as Record<string, unknown>,
            "label",
            locale,
          ),
          angle: getLocalizedCatalogField(
            gallery[0] as Record<string, unknown>,
            "angle",
            locale,
          ),
          note: getLocalizedCatalogField(
            gallery[0] as Record<string, unknown>,
            "note",
            locale,
          ),
          tone: gallery[0].tone,
        }
      : createFallbackCartMedia(product, locale);

  return {
    id: record.id,
    quantity: record.quantity,
    unitPrice: Number(record.unit_price),
    lineTotal: Number(record.unit_price) * record.quantity,
    variantId: record.product_variant.id,
    sku: record.product_variant.sku,
    size: record.product_variant.size,
    color: record.product_variant.color,
    stockQuantity: record.product_variant.stock_quantity,
    product: {
      slug: product.slug,
      name: getLocalizedCatalogField(
        product as Record<string, unknown>,
        "name",
        locale,
      ),
      category: product.category
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
      limitedEdition: product.limited_edition,
      media,
    },
  };
}

async function getAuthenticatedCartContext(nextPath: string) {
  const { user } = await requireAuth(nextPath);
  const supabase = await createServerSupabaseClient();

  return {
    supabase,
    user,
  };
}

async function getActiveCartForUser(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<CartRow | null> {
  const { data, error } = await supabase
    .from("carts")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();

  throwOnError(error, "Failed to load active cart");

  return data;
}

async function resolveVariantSelection(
  supabase: SupabaseClient<Database>,
  productSlug: string,
  size: string,
  color?: string | null,
): Promise<ResolvedVariantSelection | null> {
  const { data: productData, error: productError } = await supabase
    .from("products")
    .select("id, slug, name, base_price")
    .eq("slug", productSlug)
    .eq("is_active", true)
    .maybeSingle();
  const product = productData as ProductSelectionSummary | null;

  throwOnError(productError, "Failed to load product selection");

  if (!product) {
    return null;
  }

  let variantQuery = supabase
    .from("product_variants")
    .select("id, sku, size, color, price_override, stock_quantity")
    .eq("product_id", product.id)
    .eq("size", size)
    .eq("is_active", true)
    .order("position", { ascending: true })
    .limit(1);

  if (color) {
    variantQuery = variantQuery.eq("color", color);
  }

  const { data: variantData, error: variantError } = await variantQuery.maybeSingle();
  const variant = variantData as VariantSelectionSummary | null;

  throwOnError(variantError, "Failed to load product variant selection");

  if (!variant) {
    return null;
  }

  return {
    product,
    variant,
  };
}

async function getOwnedCartItemForMutation(
  supabase: SupabaseClient<Database>,
  userId: string,
  cartItemId: string,
) {
  const activeCart = await getActiveCartForUser(supabase, userId);

  if (!activeCart) {
    return null;
  }

  const { data, error } = await supabase
    .from("cart_items")
    .select(
      "id, quantity, cart_id, product_variant:product_variants(id, stock_quantity)",
    )
    .eq("id", cartItemId)
    .eq("cart_id", activeCart.id)
    .maybeSingle();

  throwOnError(error, "Failed to load cart item");

  return data as
    | (Pick<CartItemRow, "id" | "quantity" | "cart_id"> & {
        product_variant:
          | Pick<VariantRow, "id" | "stock_quantity">
          | null;
      })
    | null;
}

export async function getCartByUser(userId?: string) {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const resolvedUserId = userId ?? (await getCurrentUser())?.id;

  if (!resolvedUserId) {
    return null;
  }

  const supabase = await createServerSupabaseClient();

  try {
    return await getActiveCartForUser(supabase, resolvedUserId);
  } catch (error) {
    console.error("Failed to load cart by user.", error);
    return null;
  }
}

export async function getOrCreateCart(nextPath = "/cart") {
  if (!hasSupabaseEnv()) {
    throw new Error(CART_UNCONFIGURED_MESSAGE);
  }

  const { supabase, user } = await getAuthenticatedCartContext(nextPath);
  const existingCart = await getActiveCartForUser(supabase, user.id);

  if (existingCart) {
    return existingCart;
  }

  const { data, error } = await supabase
    .from("carts")
    .insert({
      user_id: user.id,
      status: "active",
      currency_code: "USD",
    } satisfies CartInsert)
    .select("*")
    .single();

  if (error) {
    if (error.message.toLowerCase().includes("duplicate key")) {
      const cart = await getActiveCartForUser(supabase, user.id);

      if (cart) {
        return cart;
      }
    }

    throw new Error(`Failed to create cart: ${error.message}`);
  }

  return data;
}

export async function getCartItemCount() {
  if (!hasSupabaseEnv()) {
    return 0;
  }

  const user = await getCurrentUser();

  if (!user) {
    return 0;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const cart = await getActiveCartForUser(supabase, user.id);

    if (!cart) {
      return 0;
    }

    const { data, error } = await supabase
      .from("cart_items")
      .select("quantity")
      .eq("cart_id", cart.id);

    throwOnError(error, "Failed to load cart item count");

    return (data ?? []).reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error("Failed to load cart item count.", error);
    return 0;
  }
}

export async function getCartDetails(): Promise<CartQueryResult<CartDetails>> {
  if (!hasSupabaseEnv()) {
    return createCartResult(
      createEmptyCartDetails(),
      "unconfigured",
      CART_UNCONFIGURED_MESSAGE,
    );
  }

  const user = await getCurrentUser();

  if (!user) {
    return createCartResult(createEmptyCartDetails(), "unauthenticated");
  }

  try {
    const locale = await getRequestLocale();
    const supabase = await createServerSupabaseClient();
    const cart = await getActiveCartForUser(supabase, user.id);

    if (!cart) {
      return createCartResult(createEmptyCartDetails(), "ready");
    }

    const { data, error } = await supabase
      .from("cart_items")
      .select(cartItemDetailsSelect)
      .eq("cart_id", cart.id)
      .order("created_at", { ascending: false });

    throwOnError(error, "Failed to load cart details");

    const items = ((data ?? []) as CartItemDetailRecord[])
      .map((item) => mapCartItemRecord(item, locale))
      .filter((item): item is CartDetailItem => Boolean(item));
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);

    return createCartResult(
      {
        cartId: cart.id,
        currencyCode: cart.currency_code,
        itemCount,
        subtotal,
        items,
      },
      "ready",
    );
  } catch (error) {
    console.error("Failed to load cart details.", error);
    return createCartResult(createEmptyCartDetails(), "error", CART_ERROR_MESSAGE);
  }
}

export async function addCartItem({
  productSlug,
  size,
  quantity,
  color = null,
  nextPath,
}: AddCartItemInput): Promise<CartMutationResult> {
  if (!hasSupabaseEnv()) {
    return {
      ok: false,
      error: CART_UNCONFIGURED_MESSAGE,
    };
  }

  if (!size) {
    return {
      ok: false,
      error: "Select a size before adding this piece to your cart.",
    };
  }

  if (quantity < 1) {
    return {
      ok: false,
      error: "Choose a valid quantity before adding this piece.",
    };
  }

  try {
    const { supabase } = await getAuthenticatedCartContext(nextPath);
    const cart = await getOrCreateCart(nextPath);
    const selection = await resolveVariantSelection(
      supabase,
      productSlug,
      size,
      color,
    );

    if (!selection) {
      return {
        ok: false,
        error: "This size is not currently available.",
      };
    }

    if (selection.variant.stock_quantity < 1) {
      return {
        ok: false,
        error: "This variant is currently unavailable.",
      };
    }

    const unitPrice = Number(
      selection.variant.price_override ?? selection.product.base_price,
    );
    const { data: existingItem, error: existingItemError } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("cart_id", cart.id)
      .eq("product_variant_id", selection.variant.id)
      .maybeSingle();

    throwOnError(existingItemError, "Failed to load existing cart item");

    const nextQuantity = (existingItem?.quantity ?? 0) + quantity;

    if (nextQuantity > selection.variant.stock_quantity) {
      return {
        ok: false,
        error: `Only ${selection.variant.stock_quantity} piece${
          selection.variant.stock_quantity === 1 ? "" : "s"
        } remain for this size.`,
      };
    }

    if (existingItem) {
      const { error } = await supabase
        .from("cart_items")
        .update({
          quantity: nextQuantity,
          unit_price: unitPrice,
        } satisfies CartItemUpdate)
        .eq("id", existingItem.id);

      throwOnError(error, "Failed to update existing cart item");

      return {
        ok: true,
        message: "Your cart was updated with this selection.",
      };
    }

    const { error } = await supabase.from("cart_items").insert({
      cart_id: cart.id,
      product_variant_id: selection.variant.id,
      quantity,
      unit_price: unitPrice,
    } satisfies CartItemInsert);

    throwOnError(error, "Failed to add cart item");

    return {
      ok: true,
      message: "Added to your cart.",
    };
  } catch (error) {
    console.error("Failed to add cart item.", error);
    return {
      ok: false,
      error: CART_ERROR_MESSAGE,
    };
  }
}

export async function updateCartItemQuantity({
  cartItemId,
  quantity,
  nextPath,
}: UpdateCartItemQuantityInput): Promise<CartMutationResult> {
  if (!hasSupabaseEnv()) {
    return {
      ok: false,
      error: CART_UNCONFIGURED_MESSAGE,
    };
  }

  if (quantity < 1) {
    return {
      ok: false,
      error: "Quantity must be at least one.",
    };
  }

  try {
    const { supabase, user } = await getAuthenticatedCartContext(nextPath);
    const cartItem = await getOwnedCartItemForMutation(
      supabase,
      user.id,
      cartItemId,
    );

    if (!cartItem || !cartItem.product_variant) {
      return {
        ok: false,
        error: "This cart item could not be found.",
      };
    }

    if (quantity > cartItem.product_variant.stock_quantity) {
      return {
        ok: false,
        error: `Only ${cartItem.product_variant.stock_quantity} piece${
          cartItem.product_variant.stock_quantity === 1 ? "" : "s"
        } remain for this selection.`,
      };
    }

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity } satisfies CartItemUpdate)
      .eq("id", cartItem.id);

    throwOnError(error, "Failed to update cart quantity");

    return {
      ok: true,
      message: "Cart quantity updated.",
    };
  } catch (error) {
    console.error("Failed to update cart item quantity.", error);
    return {
      ok: false,
      error: CART_ERROR_MESSAGE,
    };
  }
}

export async function removeCartItem({
  cartItemId,
  nextPath,
}: RemoveCartItemInput): Promise<CartMutationResult> {
  if (!hasSupabaseEnv()) {
    return {
      ok: false,
      error: CART_UNCONFIGURED_MESSAGE,
    };
  }

  try {
    const { supabase, user } = await getAuthenticatedCartContext(nextPath);
    const cartItem = await getOwnedCartItemForMutation(
      supabase,
      user.id,
      cartItemId,
    );

    if (!cartItem) {
      return {
        ok: false,
        error: "This cart item could not be found.",
      };
    }

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", cartItem.id)
      .eq("cart_id", cartItem.cart_id);

    throwOnError(error, "Failed to remove cart item");

    return {
      ok: true,
      message: "Item removed from your cart.",
    };
  } catch (error) {
    console.error("Failed to remove cart item.", error);
    return {
      ok: false,
      error: CART_ERROR_MESSAGE,
    };
  }
}
