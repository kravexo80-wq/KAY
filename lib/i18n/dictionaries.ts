import "server-only";

import { cache } from "react";

import enDictionary from "@/messages/en.json";

import type { Locale } from "./config";

const dictionaries = {
  en: () => import("@/messages/en.json").then((module) => module.default),
  ar: () => import("@/messages/ar.json").then((module) => module.default),
} as const;

export type Dictionary = typeof enDictionary;

export const getDictionary = cache(async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]();
});
