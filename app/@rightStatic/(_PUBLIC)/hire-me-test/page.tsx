// app/@rightStatic/(_PUBLIC)/hire-me/page.tsx

import { constructMetadata } from '@/lib/construct-metadata';
import { appConfig } from '@/config/app-config';
import type { Metadata } from 'next';
import HireMePageComponent from '@/components/pages/hire-me/hire-me-page-component';
import { PageWrapperConfig, SeoPageWrapper } from '@/components/pages/seo-page-wrapper/seo-page-wrapper';

// ============================================================================
// META CONFIGURATION
// ============================================================================

// Route-specific metadata
export const metadata: Metadata = constructMetadata({
  title: 'Hire Roman Bolshiyanov — AI/Web3/Next Architect',
  description:
    'Architecture that extracts maximum value from AI and Web3 with SEO and AI-search focus — minimizing costs while maximizing outcomes. A technical partner, not just a developer.',
  image: '/images/author-bolshiyanov.png', // single author photo for OG/Twitter
  pathname: '/hire-me',
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
    twitter: undefined, // add if you want X/Twitter card to show creator
    linkedin: 'roman-bolshiyanov', // full URL also acceptable: https://www.linkedin.com/in/roman-bolshiyanov
    facebook: undefined,
  },
});

// ============================================================================
// JSON-LD HELPER FUNCTIONS (inside page.tsx)
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
  // Top spacing in pixels
  topSpacing: 80,
  
  // Breadcrumb navigation
  //
  breadcrumbs: [
    { name: 'Home', path: '/home' },
    { name: 'Hire Me', path: '/hire-me' },
  ],
  
  // Technology badges
  badges: [
    { text: 'AI SDK' },
    { text: 'Web3' },
    { text: 'Next.js 15' },
    { text: 'React 19' },
    { text: 'Vercel' },
    { text: 'OpenAI' },
    { text: 'Prisma' },
    { text: 'Neon' },
    { text: 'Stripe' },
    { text: 'SEO + AI-Search' },
    { text: 'AIFA Architecture' },
  ],
  showBadges: true,
  
  // Hero section
  hero: {
    title: 'Have an idea? Let\'s build something monumental together',
    subtitle: 'Architecture that extracts maximum value from AI and Web3 with SEO and AI-search focus — minimizing costs while maximizing outcomes. A technical partner, not just a developer.',
    images: {
      mobile: '/images/author-bolshiyanov-horizontal.png',
      desktop: '/images/author-bolshiyanov-vertical.png',
      desktopLarge: '/images/author-bolshiyanov.png',
      alt: 'Roman Bolshiyanov portrait',
    },
    author: {
      name: 'Roman Bolshiyanov (Armstrong)',
      role: 'AI / Web3 / Next Architect',
      avatar: appConfig.logo,
    },
    cta: {
      primary: {
        text: 'Email Roman',
        href: `mailto:bolshiyanov@gmail.com?subject=${encodeURIComponent('AIFA Collaboration — AI/Web3/SEO Architecture')}&body=${encodeURIComponent([
          'Hi Roman,',
          '',
          'I have a project/idea and would like to discuss:',
          '- AI integration into existing processes',
          '- Web3 tokenization',
          '- Next.js + React architecture',
          '- SEO & AI-search optimization',
          '',
          'Please share a couple of time slots for a quick call.',
          '',
          'Thank you!',
        ].join('\n'))}`,
      },
      secondary: {
        text: 'Message on Telegram',
        href: 'https://t.me/bolshiyanov',
      },
    },
  },
  showHero: true,
  
  // FAQ data
  faqs: [
     {
    question: 'Can you integrate AI into our existing website or mobile application?',
    answer:
      'Yes, this is feasible for most modern tech stacks. I audit your architecture (frontend/backend), prepare technical documentation covering AI SDK integration points, including RAG mechanisms, agents, and knowledge base connectivity. The documentation enables your team to test, stage, and deploy to production with minimal risk. If you lack internal resources, I can implement the integration myself or collaborate closely with your developers.',
  },
  {
    question: 'What types of AI chat systems do you develop?',
    answer:
      'Built on the latest AI SDK with flexible architecture tailored to your business. I implement various patterns: from embedded prompts with context to hybrid solutions orchestrating vector knowledge bases (Pinecone, Weaviate), Redis caching, and PostgreSQL. Integration with any model (OpenAI GPT-4, Anthropic Claude, Gemini, open-source LLaMA) and tuning for your KPIs: response time, accuracy, cost per query. Analytics dashboards and continuous learning loops based on user feedback are also available.',
  },
  {
    question: 'Do you develop asset tokenization systems, blockchain, and Web3 solutions?',
    answer:
      'Yes, this is a priority area. In partnership with an experienced business analyst and B2B product manager, I offer end-to-end delivery: from concept to Security Token Offering (STO) launch with legal compliance and regulatory alignment. Platform built on Node.js, smart contract integration (Solidity/EVM, standards ERC-20, ERC-1404, ERC-3643 for compliance), supporting both private and public blockchains. We tokenize real estate, intellectual property, and fractional assets with KYC/AML processes and secondary market infrastructure.',
  },
  {
    question: 'Do you consider full-time employment opportunities?',
    answer:
      'Yes, open to discussing full-time roles at companies working at the intersection of Next.js, Web3, and AI. Particularly interested in Technical Lead, Solution Architect, or Product Engineer positions where I can apply 25 years of experience in architecture, team leadership, and product launches. I prefer projects with clear business strategy where technology enables growth, not just tech for techs sake.',
  },
  {
    question: 'What is your minimum rate, and do you accept freelance projects?',
    answer:
      'Rates start at 40 EUR/hour. Key advantage: extensive library of ready-made solutions (AIFA starters, AI/Web3 modules, Next.js 15 components) that dramatically reduce timelines—projects estimated at months often complete in days of focused work. I accept freelance projects if theyre technically interesting and require architectural thinking, not just basic implementation. Minimum engagement: 2-hour consultation (80 EUR) with roadmap and estimate.',
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
  const faqJsonLd = buildFaqJsonLd(PAGE_CONFIG.faqs);

  return (
    <>
      {/* JSON-LD Structured Data - MUST BE HERE in page.tsx! */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      {/* UI Wrapper Component */}
      <SeoPageWrapper config={PAGE_CONFIG}>
        <HireMePageComponent />
      </SeoPageWrapper>
    </>
  );
}