import type { Locale } from "./config";

type LocalizedCatalogRecord = Record<string, unknown>;

function getStringValue(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

export function getLocalizedCatalogField(
  record: LocalizedCatalogRecord,
  field: string,
  locale: Locale,
) {
  const localizedKey = `${field}_${locale}`;
  const englishKey = `${field}_en`;
  const arabicKey = `${field}_ar`;

  return (
    getStringValue(record[localizedKey]) ??
    getStringValue(record[field]) ??
    getStringValue(record[englishKey]) ??
    getStringValue(record[arabicKey]) ??
    ""
  );
}
