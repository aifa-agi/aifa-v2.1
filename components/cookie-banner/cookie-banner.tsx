"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Cookies from "js-cookie"; // client-only dependency
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, Settings, BarChart3, Target, Shield } from "lucide-react";
import { appConfig } from "@/config/app-config";
import { getCookieTranslation } from "./cookie-translation";

type CookieConsent = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: string;
};

const COOKIE_CONSENT_KEY = "cookie-consent";
const CONSENT_VERSION = "2025.2";
const CONSENT_EXPIRY_DAYS = 180;

function formatI18n(template: string, params: Record<string, string | number> = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const val = params[key];
    return val === undefined || val === null ? `{${key}}` : String(val);
  });
}

export function CookieBanner() {
  // Translation helper uses static JSON by appConfig.lang; no browser-only deps inside hook.
  const { t } = getCookieTranslation();

  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    essential: true,
    analytics: false,
    marketing: false,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  });

  const brandName = useMemo(() => appConfig.short_name?.trim() || "Our Service", []);
  const supportMail = useMemo(() => appConfig.mailSupport?.trim() || "support@example.com", []);
  const siteUrl = useMemo(() => appConfig.url?.trim() || "", []);
  const brandLogo = useMemo(() => appConfig.logo || "/logo.png", []);

  const consentExpiryText = formatI18n(
    t("Consent Expiry Template") || "Consent expires in {days} days",
    { days: CONSENT_EXPIRY_DAYS }
  );

  useEffect(() => {
    // Read existing consent from browser cookie
    const existingConsent = Cookies.get(COOKIE_CONSENT_KEY);
    if (!existingConsent) {
      const timer = setTimeout(() => setIsVisible(true), 200);
      return () => clearTimeout(timer);
    }
    try {
      const parsed = JSON.parse(existingConsent) as CookieConsent;
      setConsent(parsed);
      applyConsent(parsed);
    } catch {
      setIsVisible(true);
    }
  }, []);

  /**
   * Apply user consent preferences to Google Analytics and Facebook Pixel
   * This function uses the Google Consent Mode V2 API to dynamically update
   * the consent state for analytics and advertising based on user choice
   * 
   * @param consentData - The user's consent preferences object
   * 
   * Why this is needed:
   * - Google Consent Mode V2 requires explicit consent signals for GDPR compliance
   * - It allows Google tags to adjust behavior based on user consent
   * - Prevents third-party cookies from being set without user permission
   * - Supports conversion modeling even when cookies are denied
   */
  const applyConsent = (consentData: CookieConsent) => {
    // Extra guard; in client components window is available at runtime.
    if (typeof window === "undefined") return;

    /**
     * Analytics consent (Google Analytics via @next/third-parties)
     * 
     * How it works:
     * - If user grants analytics consent, we call gtag('consent', 'update', {...})
     * - This updates the consent state from 'denied' (default) to 'granted'
     * - Google Analytics then starts collecting full measurement data
     * - The 'analytics_storage' parameter controls cookie creation for analytics
     * 
     * Reference: https://developers.google.com/tag-platform/security/guides/consent
     */
    if (consentData.analytics) {
      if (window.gtag && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
        window.gtag("consent", "update", { 
          analytics_storage: "granted" 
        });
        window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
      }
    } else {
      if (window.gtag) {
        window.gtag("consent", "update", { 
          analytics_storage: "denied" 
        });
      }
    }

    /**
     * Marketing consent (Facebook Pixel)
     * 
     * How it works:
     * - Facebook Pixel respects the 'consent' API similar to Google
     * - 'grant' allows Facebook to set cookies and track conversions
     * - 'revoke' prevents Facebook from setting tracking cookies
     * 
     * Note: This requires Facebook Pixel to be initialized separately
     */
    if (consentData.marketing) {
      if (window.fbq && process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID) {
        window.fbq("consent", "grant");
      }
    } else {
      if (window.fbq) {
        window.fbq("consent", "revoke");
      }
    }
  };

  /**
   * Save user consent preferences to a first-party cookie
   * 
   * How it works:
   * - Uses js-cookie library to create a consent cookie on your domain
   * - This is a FIRST-PARTY cookie (not third-party) so it's not blocked by browsers
   * - The cookie stores user preferences and is read on subsequent visits
   * 
   * Cookie attributes explained:
   * - expires: Cookie lifetime in days (180 days = 6 months)
   * - secure: Cookie only sent over HTTPS in production (prevents man-in-the-middle attacks)
   * - sameSite: 'lax' allows cookie to be sent on top-level navigation (e.g., clicking links)
   *   - 'strict' would block the cookie even on legitimate navigation
   *   - 'lax' is the best balance between security and usability
   *   - 'none' would require 'secure: true' and is only needed for cross-site embeds
   * - path: '/' makes cookie available across entire site
   * 
   * Why 'lax' instead of 'strict':
   * - 'strict' would break user experience if they click a link from email or external site
   * - 'lax' still protects against CSRF attacks for state-changing requests (POST, PUT, DELETE)
   * - For a consent cookie (read-only data), 'lax' is the recommended setting
   * 
   * Reference: https://web.dev/samesite-cookies-explained/
   */
  const saveConsent = (consentData: CookieConsent) => {
    Cookies.set(COOKIE_CONSENT_KEY, JSON.stringify(consentData), {
      expires: CONSENT_EXPIRY_DAYS,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax', // CHANGED from 'strict' - allows top-level navigation
      path: '/' // Available across entire site
    });

    // Apply the consent to third-party services
    applyConsent(consentData);
    
    // Hide the banner
    setIsVisible(false);

    /**
     * Send consent event to Google Tag Manager dataLayer
     * This allows you to track consent changes in Google Analytics
     * and trigger specific tags based on consent state
     */
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "cookie_consent_updated",
        consent_analytics: consentData.analytics,
        consent_marketing: consentData.marketing,
        consent_version: consentData.version,
        consent_timestamp: consentData.timestamp,
      });
    }
  };

  const handleAcceptAll = () => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    saveConsent(newConsent);
  };

  const handleRejectAll = () => {
    const newConsent: CookieConsent = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    saveConsent(newConsent);
  };

  const handleSavePreferences = () => {
    const newConsent: CookieConsent = {
      ...consent,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    saveConsent(newConsent);
  };

  if (!isVisible) return null;

  const infoLead = t("Cookie Info Lead") || "We use cookies and similar technologies";
  const infoBody = formatI18n(
    t("Cookie Info Body") ||
    "We and selected partners use cookies on {site} to analyze usage, enhance features, personalize experiences, and tailor advertising. You can accept, reject, or manage categories.",
    { site: siteUrl }
  );
  const privacySubtitle = formatI18n(
    t("Customize Privacy Preferences") || "{brand} — customize your privacy preferences",
    { brand: brandName }
  );

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl"
        role="dialog"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-description"
      >
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          {!showDetails ? (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-shrink-0 mt-1">
                      <Image
                        src={brandLogo}
                        alt={brandName}
                        width={32}
                        height={32}
                        className="rounded"
                        priority
                      />
                    </div>
                    <h3
                      id="cookie-banner-title"
                      className="font-semibold text-gray-900 dark:text-white"
                    >
                      {infoLead} — {brandName}
                    </h3>
                  </div>
                  <p
                    id="cookie-banner-description"
                    className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    {infoBody}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>v{CONSENT_VERSION}</span>
                    <span>•</span>
                    <Link
                      href="/privacy-policy"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {t("Privacy Policy") || "Privacy Policy"}
                    </Link>
                    <span>•</span>
                    <Link
                      href={`mailto:${supportMail}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {t("Support") || "Support"}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 min-w-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(true)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {t("Manage Preferences") || "Manage Preferences"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRejectAll}
                >
                  {t("Reject All Cookies") || "Reject All"}
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {t("Accept All Cookies") || "Accept All"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Image
                    src={brandLogo}
                    alt={brandName}
                    width={40}
                    height={40}
                    className="rounded"
                    priority
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {t("Cookie Settings") || "Cookie Settings"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {privacySubtitle}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 h-8 w-8 p-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                  <div className="flex-shrink-0 mt-1">
                    <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {t("Essential Cookies") || "Essential Cookies"}
                      </h4>
                      <div className="flex items-center">
                        <span className="text-sm text-green-700 dark:text-green-400 font-medium mr-2">
                          {t("Always On") || "Always On"}
                        </span>
                        <div className="w-12 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t("Essential Cookies Description") ||
                        "Required for core site functionality such as security, network management, and accessibility."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {t("Analytics Cookies") || "Analytics Cookies"}
                      </h4>
                      <button
                        onClick={() =>
                          setConsent((prev) => ({ ...prev, analytics: !prev.analytics }))
                        }
                        className={`w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          consent.analytics
                            ? "bg-blue-600 justify-end"
                            : "bg-gray-300 dark:bg-gray-600 justify-start"
                        } flex items-center px-1`}
                        aria-pressed={consent.analytics}
                        aria-label="Toggle analytics cookies"
                      >
                        <div className="w-4 h-4 bg-white rounded-full shadow transition-transform duration-300" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t("Analytics Cookies Description") ||
                        "Help us understand usage to improve performance and product experience."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {t("Marketing Cookies") || "Marketing Cookies"}
                      </h4>
                      <button
                        onClick={() =>
                          setConsent((prev) => ({ ...prev, marketing: !prev.marketing }))
                        }
                        className={`w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                          consent.marketing
                            ? "bg-purple-600 justify-end"
                            : "bg-gray-300 dark:bg-gray-600 justify-start"
                        } flex items-center px-1`}
                        aria-pressed={consent.marketing}
                        aria-label="Toggle marketing cookies"
                      >
                        <div className="w-4 h-4 bg-white rounded-full shadow transition-transform duration-300" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t("Marketing Cookies Description") ||
                        "Used to deliver relevant advertising and measure campaign effectiveness."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>{consentExpiryText}</span>
                  <span>•</span>
                  <Link
                    href="/privacy-policy"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t("Privacy Policy") || "Privacy Policy"}
                  </Link>
                  <span>•</span>
                  <Link
                    href={`mailto:${supportMail}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t("Contact Support") || "Contact Support"}
                  </Link>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRejectAll}
                    className="font-medium"
                  >
                    {t("Reject All Cookies") || "Reject All"}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSavePreferences}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {t("Save Preferences") || "Save Preferences"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
