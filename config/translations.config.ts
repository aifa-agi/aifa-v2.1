//config/translations.config.ts

import { appConfig } from "./app-config";



export const SUPPORTED_LANGUAGES = [
  "en",
  "es",
  "de",
  "fr",
  "it",
  "ru",
] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export type TranslationEntry = {
  [K in SupportedLanguage]: string;
};

export type Translations = {
  [key: string]: TranslationEntry;
};
export const DEFAULT_LANGUAGE: SupportedLanguage = appConfig.lang;
