import type { Locale } from "./config";
import type { Json } from "@/types/database";

type LocalizedCatalogRecord = Record<string, unknown>;

function getStringValue(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function getStringArrayValue(value: unknown) {
  if (!Array.isArray(value)) {
    return null;
  }

  const items = value.filter(
    (entry): entry is string =>
      typeof entry === "string" && entry.trim().length > 0,
  );

  return items.length > 0 ? items : null;
}

function getJsonValue(value: unknown): Json | null {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    Array.isArray(value) ||
    typeof value === "object"
  ) {
    return value as Json;
  }

  return null;
}

function getLocalizedValue(
  record: LocalizedCatalogRecord,
  field: string,
) {
  return {
    localized: (locale: Locale) => record[`${field}_${locale}`],
    base: record[field],
    english: record[`${field}_en`],
    arabic: record[`${field}_ar`],
  };
}

export function getLocalizedCatalogField(
  record: LocalizedCatalogRecord,
  field: string,
  locale: Locale,
) {
  const value = getLocalizedValue(record, field);

  return (
    getStringValue(value.localized(locale)) ??
    getStringValue(value.base) ??
    getStringValue(value.english) ??
    getStringValue(value.arabic) ??
    ""
  );
}

export function getLocalizedCatalogListField(
  record: LocalizedCatalogRecord,
  field: string,
  locale: Locale,
) {
  const value = getLocalizedValue(record, field);

  return (
    getStringArrayValue(value.localized(locale)) ??
    getStringArrayValue(value.base) ??
    getStringArrayValue(value.english) ??
    getStringArrayValue(value.arabic) ??
    []
  );
}

export function getLocalizedCatalogJsonField(
  record: LocalizedCatalogRecord,
  field: string,
  locale: Locale,
) {
  const value = getLocalizedValue(record, field);

  return (
    getJsonValue(value.localized(locale)) ??
    getJsonValue(value.base) ??
    getJsonValue(value.english) ??
    getJsonValue(value.arabic)
  );
}
