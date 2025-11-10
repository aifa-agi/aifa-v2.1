// app/@right/(_INTERCEPTION_MODAL)/(_shared)/(_translations)/modal-translation.ts
import { appConfig } from "@/config/app-config";
import translations from "./modal-translation.json";
import {
  DEFAULT_LANGUAGE,
  SupportedLanguage,
} from "@/config/translations.config";

type TranslationEntry = {
  [K in SupportedLanguage]?: string;
};

type Translations = {
  [key: string]: TranslationEntry;
};

const typedTranslations: Translations = translations;

export function getModalTranslation() {
  const language = appConfig.lang as SupportedLanguage || "en"

  function t(key: string): string {
    const entry = typedTranslations[key];
    if (!entry) return key;
    return entry[language] || entry[DEFAULT_LANGUAGE] || key;
  }

  return { t };
}
