// app/@rightStatic/(_PUBLIC)/(_FEATURES)/features/page.tsx

import { constructMetadata } from '@/lib/construct-metadata';
import { appConfig } from '@/config/app-config';
import type { Metadata } from 'next';
import { PageWrapperConfig, SeoPageWrapper } from '@/components/seo-page-wrapper/seo-page-wrapper';
import { StructuredDataWrapper } from '@/components/seo-page-wrapper/structured-data-wrapper';
import FeaturesPageComponent from '../../(_FEATURES)/features/page';

// ============================================================================
// META CONFIGURATION
// ============================================================================

export const metadata: Metadata = constructMetadata({
  title: 'Features — Advanced Next.js Routing & SEO Capabilities',
  description:
    'Comprehensive guide to AIFA starter features including parallel routing, intercepting routes, SEO optimization, PWA capabilities, and modern web development patterns with Next.js 15 and React 19.',
  image: '/og/features.png',
  pathname: '/features',
  locale: 'en',
  contentType: 'website',
  noIndex: false,
  noFollow: false,
  author: {
    name: 'Roman Bolshiyanov (Armstrong)',
    email: 'bolshiyanov@gmail.com',
    url: 'https://t.me/bolshiyanov',
    image: '/images/author-bolshiyanov.png',
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
 * Build CollectionPage JSON-LD schema
 */
function buildCollectionPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AIFA Features Overview',
    description: 'Comprehensive collection of advanced Next.js routing patterns, SEO optimization techniques, and modern web development features.',
    url: `${appConfig.url}/features`,
    isPartOf: {
      '@type': 'WebSite',
      name: appConfig.name,
      url: appConfig.url,
    },
  };
}

// ============================================================================
// PAGE CONFIGURATION
// ============================================================================

const PAGE_CONFIG: PageWrapperConfig = {
  topSpacing: 80,
  variant:"feature",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
  ],
  
  badges: [
    { text: 'Routing' },
    { text: 'SEO' },
    { text: 'PWA' },
    { text: 'Performance' },
    { text: 'Accessibility' },
    { text: 'Next.js 15' },
  ],
  showBadges: true,
  
  hero: {
    title: 'AIFA Starter Features',
    subtitle: 'Explore comprehensive documentation covering advanced routing patterns, SEO optimization, PWA capabilities, and modern web development best practices with Next.js 15 and React 19.',
    images: {
      horizontal: '/app-config-images/logo.png',
      vertical: '/app-config-images/logo.png',
      square: '/app-config-images/logo.png',
      alt: 'AIFA Features Overview',
    },
    author: {
      name: 'Roman Bolshiyanov (Armstrong)',
      role: 'AI / Web3 / Next Architect',
      avatar: appConfig.logo,
    },
    cta: {
      primary: {
        text: 'Get Starter',
        href: 'https://github.com/aifa-agi/aifa-v2.1',
      },
      secondary: {
        text: 'Aifa original',
         href: 'https://github.com/aifa-agi/aifa-v2.1',
      },
    },
  },
  showHero: true,
  
  faqs: [],
  showFaq: false,
};

// ============================================================================
// PAGE COMPONENT (Server Component)
// ============================================================================

export default function Page() {
  // Generate JSON-LD schemas in page.tsx
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(PAGE_CONFIG.breadcrumbs);
  const collectionPageJsonLd = buildCollectionPageJsonLd();

  return (
    <>
      {/* Structured Data Schemas */}
      <StructuredDataWrapper data={breadcrumbJsonLd} />
      <StructuredDataWrapper data={collectionPageJsonLd} />

      {/* UI Wrapper Component */}
      <SeoPageWrapper config={PAGE_CONFIG}>
        <FeaturesPageComponent />
      </SeoPageWrapper>
    </>
  );
}
