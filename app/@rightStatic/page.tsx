// app/@rightStatic/page.tsx

import { constructMetadata } from '@/lib/construct-metadata';
import { appConfig } from '@/config/app-config';
import type { Metadata } from 'next';
import HomePageComponent from '@/app/@rightStatic/(_PUBLIC)/(_HOME)/home/(_components)/article-content';
import { PageWrapperConfig, SeoPageWrapper } from '@/components/seo-page-wrapper/seo-page-wrapper';
import { StructuredDataWrapper } from '@/components/seo-page-wrapper/structured-data-wrapper';
import { HOME_PAGE_CONFIG } from './(_PUBLIC)/(_HOME)/home/page';

// ============================================================================
// META CONFIGURATION
// ============================================================================

export const metadata: Metadata = constructMetadata({
  title: `AI SEO Next.js Starter with Advanced App Router — ${appConfig.short_name}`,
  description:
    'Production-ready template combining AI chat capabilities with comprehensive advanced routing tutorial. Built with focus on maximum SEO optimization, PWA functionality, and hybrid rendering (Static + Dynamic generation) with role-based access control.',
  image: '/images/aifai_white_frame_logo.png',
  pathname: '/',
  locale: 'en',
  contentType: 'website',
  noIndex: false,
  noFollow: false,
  author: {
    name: 'Roman Bolshiyanov (Armstrong)',
    email: 'bolshiyanov@gmail.com',
    url: 'https://t.me/bolshiyanov',
    image: '/images/aifai_white_frame_logo.png',
    bio: 'AI/Web3/Next Architect delivering business-ready solutions that orchestrate frontend, backend, and go-to-market.',
    jobTitle: 'AI/Web3/Next Architect',
    twitter: undefined,
    linkedin: 'roman-bolshiyanov',
    facebook: undefined,
  },
});

// ============================================================================
// JSON-LD HELPER FUNCTIONS
// ============================================================================

type BreadcrumbItem = {
  name: string;
  path: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

/**
 * Build BreadcrumbList JSON-LD schema
 */
function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path ? `${appConfig.url}${item.path}` : appConfig.url,
    })),
  };
}

/**
 * Build FAQPage JSON-LD schema
 */
function buildFaqJsonLd(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Build WebSite JSON-LD schema for homepage
 */
function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: appConfig.name,
    url: appConfig.url,
    description: appConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${appConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}



// ============================================================================
// PAGE COMPONENT (Server Component)
// ============================================================================

export default function Page() {
  // Generate JSON-LD schemas in page.tsx
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(HOME_PAGE_CONFIG.breadcrumbs);
  const faqJsonLd = buildFaqJsonLd(HOME_PAGE_CONFIG.faqs ?? []);
  const websiteJsonLd = buildWebSiteJsonLd();

  return (
    <>
      {/* Structured Data Schemas */}
      <StructuredDataWrapper data={breadcrumbJsonLd} />
      <StructuredDataWrapper data={faqJsonLd} />
      <StructuredDataWrapper data={websiteJsonLd} />

      {/* UI Wrapper Component */}
      <SeoPageWrapper config={HOME_PAGE_CONFIG}>
        <HomePageComponent />
      </SeoPageWrapper>
    </>
  );
}
