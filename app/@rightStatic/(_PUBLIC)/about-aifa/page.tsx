// app/@rightStatic/(_PUBLIC)/about-aifa/page.tsx

import AboutAifaPageComponent, { FAQ_DATA } from '@/components/pages/about-aifa/about-aifa-page-component';
import { constructMetadata } from '@/lib/construct-metadata';
import { appConfig } from '@/config/app-config';
import type { Metadata } from 'next';

/**
 * Page-level static metadata constructed via shared helper.
 * Important: use only ConstructArgs fields: title, description, image, pathname, locale, contentType, noIndex, noFollow, author.
 * Canonical and OG/Twitter are derived inside constructMetadata from pathname, image, etc.
 */
export const metadata: Metadata = constructMetadata({
  // Title and description used both for SEO and OG/Twitter inside the helper
  title: 'About AIFA — AI-first Next.js Architecture',
  description:
    'AIFA is an AI-first, enterprise-grade Next.js starter built on parallel and intercepting routes with a two-pane layout (left: auth/AI chat, right: static+dynamic). Multi-language, role-based access, external API. Fractal architecture coming Q4 2025.',
  // OG/Twitter image. Helper maps it to openGraph.images and twitter.images
  image: '/og/aifa-about.png',
  // Critical: this drives canonical and openGraph.url inside helper
  pathname: '/about-aifa',
  // Optional: locale and content type influence openGraph.type/locale
  locale: 'en',
  contentType: 'website', // or 'article' if you want og:type=article
});

/**
 * Build FAQPage JSON-LD from FAQ_DATA.
 * Joins multiline answers and optional bullets into a single plain-text string per question.
 */
function buildFaqJsonLd(items: typeof FAQ_DATA) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => {
      let answerText = item.answer.join(' ');
      
      // Include bullets in the answer text for better SEO context
      if (item.bullets && item.bullets.length > 0) {
        answerText += ' Key points: ' + item.bullets.join('; ') + '.';
      }
      
      return {
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answerText,
        },
      };
    }),
  };
}

/**
 * Build BreadcrumbList JSON-LD for navigation hierarchy.
 */
function buildBreadcrumbJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: appConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About AIFA',
        item: `${appConfig.url}/about-aifa`,
      },
    ],
  };
}

/**
 * Server Component - renders static HTML with JSON-LD schemas
 */
export default function Page() {
  // Generate JSON-LD schemas on server side
  const faqJsonLd = buildFaqJsonLd(FAQ_DATA);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd();

  return (
    <>
      {/* Inject BreadcrumbList JSON-LD for navigation hierarchy */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      {/* Inject FAQPage JSON-LD with FAQ data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      {/* Render page component with UI */}
      <AboutAifaPageComponent />
    </>
  );
}
