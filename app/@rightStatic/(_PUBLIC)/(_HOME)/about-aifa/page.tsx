// app/@rightStatic/(_PUBLIC)/about-aifa/page.tsx

import { constructMetadata } from '@/lib/construct-metadata';
import { appConfig } from '@/config/app-config';
import type { Metadata } from 'next';
import ArticleContent from '@/app/@rightStatic/(_PUBLIC)/(_HOME)/about-aifa/(_components)/article-content';
import { PageWrapperConfig, SeoPageWrapper } from '@/components/seo-page-wrapper/seo-page-wrapper';
import { StructuredDataWrapper } from '@/components/seo-page-wrapper/structured-data-wrapper';

// ============================================================================
// META CONFIGURATION
// ============================================================================

export const metadata: Metadata = constructMetadata({
  title: 'About AIFA — AI-first Next.js Architecture',
  description:
    'AIFA is an AI-first, enterprise-grade Next.js starter built on parallel and intercepting routes with a two-pane layout (left: auth/AI chat, right: static+dynamic). Multi-language, role-based access, external API. Fractal architecture coming Q4 2025.',
  image: '/images/pic2.png',
  pathname: '/about-aifa',
  locale: 'en',
  contentType: 'website',
  noIndex: false,
  noFollow: false,
  author: {
    name: 'Roman Bolshiyanov (Armstrong)',
    email: 'bolshiyanov@gmail.com',
    url: 'https://t.me/bolshiyanov',
    image: '/images/pic2.png',
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

// ============================================================================
// PAGE CONFIGURATION
// ============================================================================

const PAGE_CONFIG: PageWrapperConfig = {
  topSpacing: 80,
   variant:"landing",
  breadcrumbs: [
    { name: 'Home', path: '/home' },
    { name: 'About AIFA', path: '/about-aifa' },
  ],
  
  badges: [
    { text: 'Next.js 15' },
    { text: 'React 19' },
    { text: 'App Router' },
    { text: 'Parallel Routes' },
    { text: 'AI Chat' },
    { text: 'Multi-language' },
    { text: 'Prisma' },
    { text: 'Neon' },
    { text: 'Vercel' },
    { text: 'SEO-first' },
    { text: 'Fractal (Q4 2025)' },
  ],
  showBadges: true,
  
  hero: {
    title: 'AIFA Architecture: AI-first Next.js starter with advanced routing',
    subtitle: 'Production-ready architecture leveraging parallel and intercepting routes, AI chat integration, and multi-role access. Currently available with fractal AI-driven development coming Q4 2025.',
    images: {
      horizontal: '/images/pic2.png',
      vertical: '/images/pic2.png',
      square: '/images/pic2.png',
      alt: 'AIFA Architecture diagram',
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

   topFeatures: [
    {
      title: 'v1.0',
      description: 'v1.0',
    },
    {
      title: '0.4s',
      description: ' Loading time of your website',
    },
    {
      title: '3',
      description: 'Parallel routes',
    },
    {
      title: 'Q4',
      description: 'Fractal release',
    },
    
  ],

   blockquote: {
    text:
  'The AIFA architecture combines stability with innovation, offering a pre‑configured boilerplate featuring resilient parallel routing and maximum SEO optimization. Even with JavaScript disabled, your content remains accessible and lightning fast. The system dynamically switches to intercepting routes on mobile devices, ensuring seamless adaptation across formats. At the same time, an integrated AI layer interacts with static content in real time, bridging dynamic intelligence with stable delivery. The first version is already available with numerous built‑in extensions, and the upcoming AIFA 2.0 release will enable the generation of large‑scale, complex web applications directly within this architecture.'},
  
  faqs: [
  {
    question: 'Is the chatbot in this starter fake?',
    answer:
      'You are correct — this starter uses a visual placeholder instead of a real AI chatbot. This is the second AIFA starter, and its primary goal is to help you understand how parallel and intercepting routing works in Next.js 15. There is no authentication and no real chat functionality in this project. Everything you see is a visual mock designed to demonstrate the routing architecture. The purpose is to give you hands-on experience with parallel routes so you can confidently apply them in your own projects.',
  },
  {
    question: 'Why do I see unusual folder names like (_CHAT) and @slot in the code?',
    answer:
      'Next.js App Router uses special naming conventions to enable advanced routing patterns. This naming structure is also preparation for AIFA\'s fractal architecture (coming Q4 2025). It reduces errors during AI-assisted code generation — we\'ve successfully generated features with 5,000+ lines and 50+ components without a single bug. The high level of stability and modularity is a core goal of AIFA architecture. Additionally, fractals are much easier to test because each one acts as an independent microservice that extends the app\'s functionality. The app can still run without any particular fractal — features may be limited, but there are no errors. Key conventions: @folder defines a parallel route slot (independent loading/error states, streaming); (folder) creates a route group that does not affect the URL, used for organization; _folder is a private folder, excluded from routing, ideal for internals and utilities.',
  },
  {
    question: 'Why is parallel routing central to AIFA architecture?',
    answer:
      'Parallel routing in Next.js allows the app to remain functional even when one slot encounters an error. This is critical for AIFA\'s vision of AI-driven development in the left slot. Our goal is to enable live coding through the AI chatbot in the left pane. Obviously, the app will occasionally break during development. However, with parallel routing, the chatbot always remains operational. You can simply ask it to fix the error in the right slot, and it will restore stability. This out-of-the-box state isolation is made possible by Next.js App Router\'s advanced routing features. That\'s why AIFA architecture always has two panes: left (service/chat) and right (content/app). Each maintains independent error boundaries and loading states.',
  },
  {
    question: 'Will this starter get additional features in the future?',
    answer:
      'No, this starter is complete as-is. Its sole purpose is to introduce you to parallel and intercepting routing patterns in Next.js. New capabilities — including authentication, real AI chat, fractal architecture, and visual app composition — will be showcased in upcoming AIFA starters. Stay tuned by following updates on Twitter and GitHub.',
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

  return (
    <>
      {/* Structured Data Schemas */}
      <StructuredDataWrapper data={breadcrumbJsonLd} />
      <StructuredDataWrapper data={faqJsonLd} />

      {/* UI Wrapper Component */}
      <SeoPageWrapper config={PAGE_CONFIG}>
        <ArticleContent />
      </SeoPageWrapper>
    </>
  );
}
