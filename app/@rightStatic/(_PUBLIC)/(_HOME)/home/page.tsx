// app/@rightStatic/page.tsx

import { constructMetadata } from '@/lib/construct-metadata';
import { appConfig } from '@/config/app-config';
import type { Metadata } from 'next';
import ArticleContent from '@/app/@rightStatic/(_PUBLIC)/(_HOME)/home/(_components)/article-content';
import { PageWrapperConfig, SeoPageWrapper } from '@/components/seo-page-wrapper/seo-page-wrapper';
import { StructuredDataWrapper } from '@/components/seo-page-wrapper/structured-data-wrapper';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { AIFA_ROADMAP_ITEMS } from '@/config/pages-config/aifa-roadmap-data';
import { AifaRoadmap } from '@/components/aifa-roadmap';

// ============================================================================
// META CONFIGURATION
// ============================================================================

export const metadata: Metadata = constructMetadata({
  pathname: '/',
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

export const HOME_PAGE_CONFIG: PageWrapperConfig = {
  topSpacing: 80,
  variant: "landing",
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
      role: 'AI / Web3 / SEO / Next Architect',
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

  topFeatures: [
    {
      title: '30+',
      description: 'Route features',
    },
    {
      title: 'Zero',
      description: 'Route reloads',
    },
    {
      title: '100%',
      description: 'SEO optimized',
    },
    {
      title: 'PWA',
      description: 'Include',
    },

  ],

  blockquote: {
    text:
      'This starter allows you to dive deep into the advanced routing capabilities of the Next.js App Router. With built-in support for parallel routes, you can now create what once seemed impossible: dynamic SPA interfaces can coexist alongside highly optimized SEO-friendly content that works even with JavaScript disabled. All core routing features are already configured and fine-tuned — all that’s left is to plug in your own components. In just a few minutes, you can build a unique application where artificial intelligence and search optimization work in perfect synergy, delivering maximum efficiency and a cutting-edge user experience.',
  },

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
         <section className="mb-12" aria-labelledby="top-features-section">
          <h2 id="top-features-section" className="text-2xl font-bold tracking-tight mb-2">
            Lighthouse Performance Highlights
          </h2>
          <Card className='p-4'>
          <Image src={"/images/parallel-routing-aifa.png"} alt="images/seo-research-aifa" width={800} height={450} priority={false} className='w-full' />
        </Card></section>
        <ArticleContent />
       <AifaRoadmap items={AIFA_ROADMAP_ITEMS} />
      </SeoPageWrapper>
    </>
  );
}
