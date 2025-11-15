// app/@rightStatic/(_PUBLIC)/(_FEATURES)/features/static-generation/page.tsx
import { constructMetadata } from '@/lib/construct-metadata';
import type { Metadata } from 'next';
import { PageWrapperConfig, SeoPageWrapper } from '@/components/seo-page-wrapper/seo-page-wrapper';
import { StructuredDataWrapper } from '@/components/seo-page-wrapper/structured-data-wrapper';
import { appConfig } from '@/config/app-config';
import { CodeBlock } from '../(_components)/code-block';
import { ArticleContent } from './(_components)/article-content';

// ============================================================================
// META CONFIGURATION
// ============================================================================

export const metadata: Metadata = constructMetadata({
    title: 'Static Generation — Lightning-Fast SEO-Optimized Pages',
    description:
        'Pre-rendering pages at build time for maximum performance and SEO optimization with Next.js static site generation capabilities.',
    image: '/images/AIFA_static_page.png',
    pathname: '/features/static-generation',
    locale: 'en',
    contentType: 'article',
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

type FAQItem = {
    question: string;
    answer: string;
};

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

// ============================================================================
// PAGE CONFIGURATION
// ============================================================================

const PAGE_CONFIG: PageWrapperConfig = {
    topSpacing: 80,
    variant: 'feature',
    breadcrumbs: [
        { name: 'Home', path: '/home' },
        { name: 'Features', path: '/features' },
        { name: 'Static Generation', path: '/features/static-generation' },
    ],

    badges: [
        { text: 'Next.js 15' },
        { text: 'SSG' },
        { text: 'SEO Optimization' },
        { text: 'Performance' },
        { text: 'CDN Ready' },
    ],
    showBadges: true,


    hero: {
        title: 'Static Generation: The Foundation of Lightning-Fast, SEO-Optimized Web Applications',
        subtitle:
            'Pre-render HTML at build time, deliver instant page loads, and dominate search rankings with complete crawlable content.',
        images: {
            horizontal: '/images/AIFA_static_page.png',
            vertical: '/images/AIFA_static_page.png',
            square: '/images/AIFA_static_page.png',
            alt: 'AIFA_static_page portrait',
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
            title: '95+',
            description: 'Lighthouse SEO score',
        },
        {
            title: '<1s',
            description: 'Page load time',
        },
        {
            title: '50%',
            description: 'Lower server costs',
        },
        {
            title: '∞',
            description: 'Scalability with CDN',
        },
    ],
    showTopFeatures: true,
    blockquote: {
        text:
            ' Modern web development demands a delicate balance: blazing-fast performance for users and maximum visibility for search engines. Static Generation (SSG) solves this challenge by pre-rendering HTML at build time, delivering instant page loads while ensuring search engines see complete, crawlable content.'
    },
    faqs: [
        {
            question: 'What is the difference between Static Generation and Server-Side Rendering?',
            answer:
                'Static Generation generates HTML at build time once, while Server-Side Rendering generates HTML on each user request. SSG is faster and cheaper but only suitable for content that does not change frequently.',
        },
        {
            question: 'Can I update static pages without rebuilding the entire site?',
            answer:
                'Yes, Next.js supports Incremental Static Regeneration (ISR), allowing you to update static pages on a schedule (e.g., every 60 seconds) without rebuilding the entire site.',
        },
        {
            question: 'Does Static Generation work without JavaScript?',
            answer:
                'Yes, static pages contain complete HTML and are fully functional without JavaScript. This is crucial for SEO and users with JavaScript disabled.',
        },
        {
            question: 'How does AIFA combine static and dynamic content on the same page?',
            answer:
                'AIFA uses parallel routes: the @rightStatic slot contains static content for SEO, while @rightDynamic overlays dynamic interfaces for authenticated users.',
        },
    ],
    showFaq: true,
};





// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function StaticGenerationPage() {
    const breadcrumbJsonLd = buildBreadcrumbJsonLd(PAGE_CONFIG.breadcrumbs);
    const faqJsonLd = buildFaqJsonLd(PAGE_CONFIG.faqs ?? []);

    return (
        <>
            <StructuredDataWrapper data={breadcrumbJsonLd} />
            <StructuredDataWrapper data={faqJsonLd} />

            <SeoPageWrapper config={PAGE_CONFIG}>
                <ArticleContent />
            </SeoPageWrapper>
        </>
    );
}

