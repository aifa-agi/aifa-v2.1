// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { constructMetadata } from '@/lib/construct-metadata'
import { META_THEME_COLORS, appConfig } from '@/config/app-config'
import { fontVariables } from "@/lib/fonts"
import { PWAInstallPrompt } from '@/components/pwa-install-prompt'
import './styles/globals.css'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Toaster } from "sonner";
import { CookieBanner } from '@/components/cookie-banner/cookie-banner'
import { GoogleAnalytics } from '@next/third-parties/google'
import { OnlineStatusProvider } from '@/providers/online-status-provider'
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { cn } from '@/lib/utils'
import { ActiveThemeProvider } from '@/providers/active-theme'
import { ThemeProvider } from '@/providers/theme-provider'
import { LayoutProvider } from '@/hooks/use-layout'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'



export const metadata: Metadata = constructMetadata({
  pathname: '/',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: appConfig.pwa.backgroundColor },
    { media: '(prefers-color-scheme: dark)', color: appConfig.pwa.themeColor },
  ],
}

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: appConfig.name,
  url: appConfig.url,
  description: appConfig.description,
  inLanguage: appConfig.lang,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${appConfig.url}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: appConfig.name,
  url: appConfig.url,
  logo: `${appConfig.url}${appConfig.logo}`,
  description: appConfig.description,
  email: appConfig.mailSupport,
  sameAs: [
    appConfig.seo?.social?.github,
    appConfig.seo?.social?.twitter
      ? `https://twitter.com/${appConfig.seo.social.twitter}`
      : null,
    appConfig.seo?.social?.linkedin,
    appConfig.seo?.social?.facebook,
  ].filter(Boolean),
  contactPoint: {
    '@type': 'ContactPoint',
    email: appConfig.mailSupport,
    contactType: 'Customer Support',
    availableLanguage: appConfig.seo?.locales || [appConfig.lang],
  },
}

export default async function RootLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <html lang={appConfig.lang} suppressHydrationWarning >
      <head>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        {/* PWA-related meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={appConfig.short_name} />
        <meta name="application-name" content={appConfig.short_name} />
        <meta name="msapplication-TileColor" content={appConfig.pwa.themeColor} />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="theme-color" content={META_THEME_COLORS.light} />

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
        <Script src="/register-sw.js" strategy="beforeInteractive" async={false} />


      </head>
      <body
        className={cn(
          "text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
          fontVariables
        )}
      >
        {/* JSON-LD schemas for SEO */}
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebSite),
          }}
          strategy="beforeInteractive"
        />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
          strategy="beforeInteractive"
        />

        {/* PWA Install Prompt - Client Component */}
        <PWAInstallPrompt />

        <ThemeProvider>
          <LayoutProvider>
            <ActiveThemeProvider>
              <div className="bg-background fixed inset-0 flex flex-col overflow-hidden">
                <SiteHeader />
                <div className="hidden md:block flex-1 min-h-0 ">
                  <ResizablePanelGroup direction="horizontal" className="h-full">
                    <ResizablePanel defaultSize={40} minSize={35} className="relative">
                      <OnlineStatusProvider>
                        <div className="absolute inset-0 overflow-hidden">
                          {left}
                          </div> </OnlineStatusProvider>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={60} minSize={35} className="relative">


                      <main className="absolute inset-0 overflow-y-auto hide-scrollbar">
                        {right}
                      </main>


                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div></div>

              <Analytics />
            </ActiveThemeProvider>
          </LayoutProvider>
        </ThemeProvider>
        <noscript>
          <div
            className="fixed inset-x-0 bottom-0 z-50 w-full bg-neutral-900 text-white border-t border-white/20 shadow-[0_-8px_24px_rgba(0,0,0,0.25)]"
            role="region"
            aria-label="JavaScript disabled notice"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-white/10 text-sm font-semibold"
                  >
                    !
                  </span>
                  <div>
                    <strong className="block text-[15px] leading-snug">
                      JavaScript is disabled
                    </strong>
                    <p className="mt-1 text-[13px] leading-relaxed text-neutral-200/90">
                      Core content is available, but some features may be limited. Enable JavaScript for the best experience.
                    </p>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </noscript>

        <CookieBanner />
        <TailwindIndicator />
        <Toaster position="top-center" />
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!}
          />
        )}
      </body>
    </html>
  )
}
