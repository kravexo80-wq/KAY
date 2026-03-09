import type { Locale } from "@/lib/i18n/config";
import type { Json } from "@/types/database";

export interface CheckoutShippingDetails {
  fullName: string;
  phoneNumber: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postcode: string;
}

export const checkoutShippingQueryParamKeys = {
  fullName: "shipping_full_name",
  phoneNumber: "shipping_phone",
  country: "shipping_country",
  addressLine1: "shipping_address_line1",
  addressLine2: "shipping_address_line2",
  city: "shipping_city",
  postcode: "shipping_postcode",
} as const;

function getFieldValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function getSearchParamValue(
  value: string | string[] | undefined,
) {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return typeof value === "string" ? value.trim() : "";
}

function getRequiredFieldMessage(locale: Locale, field: keyof CheckoutShippingDetails) {
  const messages = {
    en: {
      fullName: "Enter the delivery full name.",
      phoneNumber: "Enter a phone number for delivery updates.",
      country: "Enter the delivery country.",
      addressLine1: "Enter the first delivery address line.",
      city: "Enter the delivery city.",
      postcode: "Enter the delivery postcode.",
    },
    ar: {
      fullName: "أدخل الاسم الكامل لعنوان التسليم.",
      phoneNumber: "أدخل رقم الهاتف لتحديثات التسليم.",
      country: "أدخل بلد التسليم.",
      addressLine1: "أدخل السطر الأول من عنوان التسليم.",
      city: "أدخل مدينة التسليم.",
      postcode: "أدخل الرمز البريدي للتسليم.",
    },
  } as const;

  return messages[locale][field as keyof typeof messages.en] ?? null;
}

function isJsonRecord(value: Json | null | undefined): value is Record<string, Json | undefined> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getRecordString(value: Json | null | undefined) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function getPreferredValue(primary: Json | null | undefined, fallback: Json | null | undefined) {
  return getRecordString(primary) ?? getRecordString(fallback) ?? null;
}

export function getCheckoutShippingDetailsFromFormData(
  formData: FormData,
): CheckoutShippingDetails {
  return {
    fullName: getFieldValue(formData, checkoutShippingQueryParamKeys.fullName),
    phoneNumber: getFieldValue(formData, checkoutShippingQueryParamKeys.phoneNumber),
    country: getFieldValue(formData, checkoutShippingQueryParamKeys.country),
    addressLine1: getFieldValue(formData, checkoutShippingQueryParamKeys.addressLine1),
    addressLine2: getFieldValue(formData, checkoutShippingQueryParamKeys.addressLine2),
    city: getFieldValue(formData, checkoutShippingQueryParamKeys.city),
    postcode: getFieldValue(formData, checkoutShippingQueryParamKeys.postcode),
  };
}

export function getCheckoutShippingDetailsFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): CheckoutShippingDetails {
  return {
    fullName: getSearchParamValue(searchParams[checkoutShippingQueryParamKeys.fullName]),
    phoneNumber: getSearchParamValue(
      searchParams[checkoutShippingQueryParamKeys.phoneNumber],
    ),
    country: getSearchParamValue(searchParams[checkoutShippingQueryParamKeys.country]),
    addressLine1: getSearchParamValue(
      searchParams[checkoutShippingQueryParamKeys.addressLine1],
    ),
    addressLine2: getSearchParamValue(
      searchParams[checkoutShippingQueryParamKeys.addressLine2],
    ),
    city: getSearchParamValue(searchParams[checkoutShippingQueryParamKeys.city]),
    postcode: getSearchParamValue(searchParams[checkoutShippingQueryParamKeys.postcode]),
  };
}

export function buildCheckoutShippingQueryParams(
  details: CheckoutShippingDetails,
) {
  return {
    [checkoutShippingQueryParamKeys.fullName]: details.fullName || undefined,
    [checkoutShippingQueryParamKeys.phoneNumber]: details.phoneNumber || undefined,
    [checkoutShippingQueryParamKeys.country]: details.country || undefined,
    [checkoutShippingQueryParamKeys.addressLine1]: details.addressLine1 || undefined,
    [checkoutShippingQueryParamKeys.addressLine2]: details.addressLine2 || undefined,
    [checkoutShippingQueryParamKeys.city]: details.city || undefined,
    [checkoutShippingQueryParamKeys.postcode]: details.postcode || undefined,
  };
}

export function validateCheckoutShippingDetails(
  details: CheckoutShippingDetails,
  locale: Locale,
) {
  const requiredFields: Array<keyof CheckoutShippingDetails> = [
    "fullName",
    "phoneNumber",
    "country",
    "addressLine1",
    "city",
    "postcode",
  ];

  for (const field of requiredFields) {
    if (!details[field]) {
      return getRequiredFieldMessage(locale, field);
    }
  }

  if (!/^[\d\s()+\-]{7,20}$/.test(details.phoneNumber)) {
    return locale === "ar"
      ? "أدخل رقم هاتف صالحاً للتسليم."
      : "Enter a valid phone number for delivery.";
  }

  if (details.fullName.length < 3) {
    return locale === "ar"
      ? "أدخل الاسم الكامل كما سيظهر على عنوان التسليم."
      : "Enter the full name exactly as it should appear on the delivery address.";
  }

  return null;
}

export function buildCheckoutShippingAddressSnapshot(
  details: CheckoutShippingDetails,
  customerEmail?: string | null,
): Json {
  return {
    name: details.fullName,
    email: customerEmail ?? null,
    phone: details.phoneNumber,
    address: {
      line1: details.addressLine1,
      line2: details.addressLine2 || null,
      city: details.city,
      country: details.country,
      postal_code: details.postcode,
      state: null,
    },
  } satisfies Json;
}

export function buildCheckoutShippingMetadata(details: CheckoutShippingDetails) {
  return {
    shipping_full_name: details.fullName,
    shipping_phone: details.phoneNumber,
    shipping_country: details.country,
    shipping_line1: details.addressLine1,
    shipping_line2: details.addressLine2,
    shipping_city: details.city,
    shipping_postcode: details.postcode,
  };
}

export function buildCheckoutShippingAddressFromMetadata(
  metadata: Record<string, string> | null | undefined,
  customerEmail?: string | null,
): Json {
  const fullName = metadata?.shipping_full_name?.trim() ?? "";
  const phoneNumber = metadata?.shipping_phone?.trim() ?? "";
  const country = metadata?.shipping_country?.trim() ?? "";
  const addressLine1 = metadata?.shipping_line1?.trim() ?? "";
  const addressLine2 = metadata?.shipping_line2?.trim() ?? "";
  const city = metadata?.shipping_city?.trim() ?? "";
  const postcode = metadata?.shipping_postcode?.trim() ?? "";

  if (!fullName || !phoneNumber || !country || !addressLine1 || !city || !postcode) {
    return {};
  }

  return buildCheckoutShippingAddressSnapshot(
    {
      fullName,
      phoneNumber,
      country,
      addressLine1,
      addressLine2,
      city,
      postcode,
    },
    customerEmail,
  );
}

export function mergeOrderAddressSnapshots(
  existing: Json | null | undefined,
  next: Json | null | undefined,
): Json {
  if (!isJsonRecord(existing)) {
    return next ?? {};
  }

  if (!isJsonRecord(next)) {
    return existing;
  }

  const existingAddress = isJsonRecord(existing.address) ? existing.address : {};
  const nextAddress = isJsonRecord(next.address) ? next.address : {};

  return {
    name: getPreferredValue(next.name, existing.name),
    email: getPreferredValue(next.email, existing.email),
    phone: getPreferredValue(next.phone, existing.phone),
    address: {
      line1: getPreferredValue(nextAddress.line1, existingAddress.line1),
      line2: getPreferredValue(nextAddress.line2, existingAddress.line2),
      city: getPreferredValue(nextAddress.city, existingAddress.city),
      state: getPreferredValue(nextAddress.state, existingAddress.state),
      postal_code: getPreferredValue(
        nextAddress.postal_code,
        existingAddress.postal_code,
      ),
      country: getPreferredValue(nextAddress.country, existingAddress.country),
    },
  } satisfies Json;
}
