// app/global-not-found.tsx
import { SiteHeader } from "@/components/site-header/site-header-wrapper";
import { Button } from "@/components/ui/button";
import { appConfig, getErrorIllustration, META_THEME_COLORS } from "@/config/app-config";
import { LayoutProvider } from "@/hooks/use-layout";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ActiveThemeProvider } from "@/providers/active-theme";
import { ThemeProvider } from "@/providers/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script"; // ✅ ДОБАВЛЕНО: Импорт Script компонента
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import './styles/globals.css'
export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist.",
};


export default function GlobalNotFoundPage() {
  // Получение путей иллюстраций для ошибки 404
  const darkPath = getErrorIllustration("404", "dark");
  const lightPath = getErrorIllustration("404", "light");

  const darkSrc =
    darkPath && typeof darkPath === "string" && darkPath.length > 0
      ? darkPath
      : null;
  const lightSrc =
    lightPath && typeof lightPath === "string" && lightPath.length > 0
      ? lightPath
      : null;

  return (
    <html lang={appConfig.lang} suppressHydrationWarning>
      <head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        {/* PWA-related meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content={appConfig.short_name} />
        <meta name="application-name" content={appConfig.short_name} />
        <meta
          name="msapplication-TileColor"
          content={appConfig.pwa.themeColor}
        />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />

        {/* Скрипт для установки темы перед рендерингом */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
          }}
        />

        {/* ✅ ИСПРАВЛЕНО: Используется компонент Script вместо встроенного скрипта */}
        <Script
          src="/register-sw.js"
          strategy="beforeInteractive"
          async={false}
        />
      </head>
      <body
        className={cn(
          "text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
          fontVariables
        )}
      >
        <ThemeProvider>
          <LayoutProvider>
            <ActiveThemeProvider>
              <div className="bg-background fixed inset-0 flex flex-col overflow-hidden">
                <SiteHeader />

                <div className="flex flex-col min-h-screen items-center justify-center p-6">
                  {/* Error illustrations (theme-aware) */}
                  <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl">
                    {/* Dark theme illustration */}
                    {darkSrc && (
                      <Image
                        src={darkSrc}
                        alt="404 - Page not found"
                        width={400}
                        height={400}
                        priority
                        className="mb-8 dark:block hidden"
                      />
                    )}

                    {/* Light theme illustration */}
                    {lightSrc && (
                      <Image
                        src={lightSrc}
                        alt="404 - Page not found"
                        width={400}
                        height={400}
                        priority
                        className="mb-8 dark:hidden block"
                      />
                    )}

                    {/* Error heading */}
                    <h1 className="text-foreground text-6xl font-bold mb-4">
                      404
                    </h1>

                    {/* Error title */}
                    <h2 className="text-foreground text-3xl font-semibold mb-3 text-center">
                      Page Not Found
                    </h2>

                    {/* Error description */}
                    <p className="text-muted-foreground text-lg text-center mb-8 max-w-md">
                      Could not find the requested resource. The page you are
                      looking for might have been removed or is temporarily
                      unavailable.
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                      <Button asChild size="lg" className="w-full">
                        <Link href="/home" className="flex-1">
                          Go to Home
                        </Link>
                      </Button>Í
                    </div>
                  </div>
                </div>
              </div>

              <Analytics />
            </ActiveThemeProvider>
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
