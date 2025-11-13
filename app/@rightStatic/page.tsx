// app/@rightStatic/page.tsx

import { constructMetadata } from '@/lib/construct-metadata';
import { appConfig } from '@/config/app-config';
import type { Metadata } from 'next';
import HomePageComponent from '@/app/@rightStatic/(_PUBLIC)/(_HOME)/home/(_components)/home-page-component';
import { PageWrapperConfig, SeoPageWrapper } from '@/components/seo-page-wrapper/seo-page-wrapper';
import { StructuredDataWrapper } from '@/components/seo-page-wrapper/structured-data-wrapper';

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
// PAGE CONFIGURATION
// ============================================================================

const PAGE_CONFIG: PageWrapperConfig = {
  topSpacing: 80,
  
  breadcrumbs: [
    { name: 'Home', path: '/' },
  ],
  
  badges: [
    { text: 'Advanced Routing' },
    { text: 'AIFA AI || SEO' },
    { text: 'Parallel Routes' },
    { text: 'Intercepting Routes' },
    { text: '100% SEO' },
    { text: 'PWA' },
    { text: 'Next.js 15' },
    { text: 'React 19' },
    { text: 'AI SDK' },
    { text: 'Shadcn UI' },
    { text: 'AI-Elements' },
    { text: 'Lead-magnet' },
    { text: 'Cookie-banner' },
  ],
  showBadges: true,
  
  hero: {
    title: `AI SEO Next.js Starter with Advanced App Router — ${appConfig.short_name}`,
    subtitle: 'Production-ready template combining AI chat capabilities with comprehensive advanced routing tutorial. Built with focus on maximum SEO optimization, PWA functionality, and hybrid rendering (Static + Dynamic generation) with role-based access control.',
    images: {
      horizontal: '/images/aifai_white_frame_logo.png',
      vertical: '/images/aifai_white_frame_logo.png',
      square: '/images/aifai_white_frame_logo.png',
      alt: 'AIFA Advanced Routing Architecture',
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
        text: 'Check Modal',
        href: '/interception_modal/lead-form',
      },
    },
  },
  showHero: true,
  
  faqs: [
    {
      question: 'Is this AIFA project the only AIFA template available?',
      answer:
        'No, this starter template is one component of the main AIFA project at https://aifa.dev, which will include multiple templates. Each template focuses on different aspects of modern web development — from SEO optimization to AI integration, authentication systems, and content generation. Follow updates to discover new starters as they are released.',
    },
    {
      question: 'Do I need to use Vercel to deploy this application?',
      answer:
        'While Vercel is recommended for the initial setup due to its seamless Next.js integration, it is not mandatory. This Next.js application can be deployed on any Node.js server. You have full flexibility to choose your hosting provider based on your infrastructure requirements and preferences.',
    },
    {
      question: 'Why doesn\'t this starter include real chat, authentication, or page generation?',
      answer:
        'This starter is the second in a sequential series of templates and continues from https://aifa-v2.vercel.app, which was created to introduce SEO optimization concepts. Future templates will unveil many other capabilities including AI integration, authentication systems, content generators, and more. Subscribe and follow updates to stay informed about new releases.',
    },
    {
      question: 'What makes this starter different from other Next.js templates?',
      answer:
        'This starter focuses specifically on advanced App Router patterns — parallel routes, intercepting routes, and hybrid rendering strategies. It demonstrates how to build SEO-optimized applications with PWA capabilities while maintaining excellent user experience. The architecture is designed to be extended with AI chat, authentication, and dynamic content generation in subsequent templates.',
    },
  ],
  showFaq: true,
};

// ============================================================================
// PAGE COMPONENT (Server Component)
// ============================================================================

export default function Page() {
  // Generate JSON-LD schemas in page.tsx
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(PAGE_CONFIG.breadcrumbs);
  const faqJsonLd = buildFaqJsonLd(PAGE_CONFIG.faqs ?? []);
  const websiteJsonLd = buildWebSiteJsonLd();

  return (
    <>
      {/* Structured Data Schemas */}
      <StructuredDataWrapper data={breadcrumbJsonLd} />
      <StructuredDataWrapper data={faqJsonLd} />
      <StructuredDataWrapper data={websiteJsonLd} />

      {/* UI Wrapper Component */}
      <SeoPageWrapper config={PAGE_CONFIG}>
        <HomePageComponent />
      </SeoPageWrapper>
    </>
  );
}
