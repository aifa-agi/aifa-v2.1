// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { constructMetadata } from '@/lib/construct-metadata'
import { appConfig } from '@/config/app-config'
import { PWAInstallPrompt } from '@/components/pwa-install-prompt'
import './globals.css'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

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
    <html lang={appConfig.lang} suppressHydrationWarning className="scroll-smooth">
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

        {/* Service Worker Registration */}
        <Script src="/register-sw.js" strategy="beforeInteractive" async={false} />
      </head>
      <body 
      // className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
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
        
                    <div className="hidden md:block h-screen w-screen">
                      <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel defaultSize={40} minSize={35}>
                          <div className="overflow-hidden h-full">{left}</div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={60} minSize={35}>
                         
                             
                              <main className="flex-1 overflow-y-auto hide-scrollbar">
                                {right}
                              </main>
                           
                       
                        </ResizablePanel>
                      </ResizablePanelGroup>
                    </div>

        {/* Fallback for users with JavaScript disabled */}
         <noscript>
          <div className="mx-auto mt-5 max-w-prose rounded border border-amber-200 bg-amber-50 p-5 text-center text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
            <strong className="block text-lg font-semibold">JavaScript is disabled</strong>
            <p className="mt-2 text-sm">
              Core content is available, but some features may be limited.
            </p>
            <p className="mt-1 text-sm">
              We recommend enabling JavaScript for the best experience.
            </p>
          </div>
        </noscript> 
      </body>
    </html>
  )
}
