// aifa-v2/app/layout.tsx

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { constructMetadata } from '@/lib/construct-metadata';
import { appConfig } from '@/config/app-config';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = constructMetadata({
  pathname: '/',
  /* CUSTOMIZATION EXAMPLES - uncomment and modify as needed */
  // title: 'Custom Homepage Title',
  // description: 'Custom homepage description for SEO',
  // image: '/custom-og-image.jpg',
  // locale: 'ru',
  // noIndex: false,
  // noFollow: false,
});

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
  /* OPTIONAL VIEWPORT CUSTOMIZATIONS */
  // interactiveWidget: 'resizes-content',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={appConfig.lang}
      suppressHydrationWarning
      //className='scroll-smooth'
      /* OPTIONAL HTML ATTRIBUTES */
      // dir="ltr"
    >
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <link rel='manifest' href={appConfig.manifest} />
        
        {/* PWA & Mobile Web App Configuration */}
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta
          name='apple-mobile-web-app-status-bar-style'
          content='black-translucent'
        />
        <meta
          name='apple-mobile-web-app-title'
          content={appConfig.short_name}
        />
        <meta
          name='application-name'
          content={appConfig.short_name}
        />
        <meta
          name='msapplication-TileColor'
          content={appConfig.pwa.themeColor}
        />
        <meta
          name='msapplication-config'
          content='/browserconfig.xml'
        />
        
        {/* OPTIONAL: Windows Tile Configuration */}
        {/* <meta name="msapplication-TileImage" content="/app-config-images/icons/icon-192.png" /> */}
        
        {/* OPTIONAL: Add custom fonts preload */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> */}
        
        {/* OPTIONAL: DNS Prefetch for external APIs */}
        {/* <link rel="dns-prefetch" href="https://api.example.com" /> */}
        
        {/* OPTIONAL: Preload critical resources */}
        {/* <link rel="preload" href="/app-config-images/og-image.jpg" as="image" /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        /* OPTIONAL: Add custom attributes */
        // data-custom-attr="value"
      >
        {children}
      </body>
    </html>
  );
}

/*
 * CUSTOMIZATION GUIDE FOR CHILD PAGES/LAYOUTS
 * 
 * Example for app/blog/page.tsx:
 * 
 * export const metadata: Metadata = constructMetadata({
 *   title: 'Latest Blog Posts',
 *   description: 'Read our latest articles about AI and web development',
 *   pathname: '/blog',
 *   // Optional: SEO customization
 *   noIndex: false,  // Allow indexing
 *   noFollow: false, // Allow following links
 * });
 * 
 * Example for dynamic routes app/blog/[slug]/page.tsx:
 * 
 * export async function generateMetadata(
 *   { params }: { params: { slug: string } }
 * ): Promise<Metadata> {
 *   const post = await getPost(params.slug);
 *   return constructMetadata({
 *     title: post.title,
 *     description: post.excerpt,
 *     image: post.coverImage,
 *     pathname: `/blog/${params.slug}`,
 *   });
 * }
 */
