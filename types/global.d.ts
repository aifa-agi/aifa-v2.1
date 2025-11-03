// types/global.d.ts
// Understanding:
// - This augments Window so we can access analytics globals without 'any'.
// - Ensure this file is included in tsconfig.json "include".

export {};

declare global {
  interface Window {
    gtag?: (
      command: "consent" | "config" | "event" | string,
      actionOrId: string,
      params?: Record<string, unknown>
    ) => void;

    fbq?: (
      command: "consent" | "track" | "trackCustom" | string,
      action?: "grant" | "revoke" | string,
      options?: Record<string, unknown>
    ) => void;

    dataLayer?: Array<Record<string, unknown>> & {
      push: (item: Record<string, unknown>) => number;
    };
  }
}
