// app/@rightStatic/(_PUBLIC)/(_FEATURES)/features/parallel-routing/page.tsx

import { constructMetadata } from "@/lib/construct-metadata";
import type { Metadata } from "next";
import {
  PageWrapperConfig,
  SeoPageWrapper,
} from "@/components/seo-page-wrapper/seo-page-wrapper";
import { StructuredDataWrapper } from "@/components/seo-page-wrapper/structured-data-wrapper";
import { appConfig } from "@/config/app-config";
import { ArticleContent } from "./(_components)/article-content";

/* ============================================
 * META CONFIGURATION
 * ============================================ */
export const metadata: Metadata = constructMetadata({
  title: "Parallel Routing — Independent UI Flows in a Single Layout",
  description:
    "Next.js parallel routes enable two or more independent UI streams—such as an AI chat and static SEO pages—to coexist within the same layout with isolated loading and error boundaries.",
  image: "/images/parallel-routing-aifa.png",
  pathname: "/features/parallel-routing",
  locale: "en",
  contentType: "article",
  noIndex: false,
  noFollow: false,
  author: {
    name: "Roman Bolshiyanov (Armstrong)",
    email: "bolshiyanov@gmail.com",
    url: "https://t.me/bolshiyanov",
    image: "/images/author-bolshiyanov.png",
    bio: "AI/Web3/Next Architect delivering business-ready solutions that orchestrate frontend, backend, and go-to-market.",
    jobTitle: "AI/Web3/Next Architect",
    twitter: undefined,
    linkedin: "roman-bolshiyanov",
    facebook: undefined,
  },
});

/* ============================================
 * JSON-LD HELPER TYPES
 * ============================================ */
type BreadcrumbItem = {
  name: string;
  path: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

/* ============================================
 * JSON-LD HELPERS
 * ============================================ */
function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? `${appConfig.url}${item.path}` : appConfig.url,
    })),
  };
}

function buildFaqJsonLd(items: FAQItem[]) {
  if (!items.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/* ============================================
 * PAGE CONFIGURATION
 * ============================================ */
const PAGE_CONFIG: PageWrapperConfig = {
  topSpacing: 80,
  variant: "feature",

  breadcrumbs: [
    { name: "Home", path: "/home" },
    { name: "Features", path: "/features" },
    { name: "Parallel Routing", path: "/features/parallel-routing" },
  ],

  badges: [
    { text: "Next.js 15" },
    { text: "Parallel Routes" },
    { text: "Resilience" },
    { text: "AI + SEO" },
    { text: "Multi-Stream UI" },
  ],
  showBadges: true,

  hero: {
    title:
      "Parallel Routing — Running Independent UI Flows in a Single AIFA Layout",
    subtitle:
      "AIFA uses Next.js parallel routes to host an AI chat in the left slot and static SEO pages in the right slot, ensuring independent navigation, error isolation, and resilient UX on every device.",
    images: {
      horizontal: "/images/parallel-routing-aifa.png",
      vertical: "/images/parallel-routing-aifa.png",
      square: "/images/parallel-routing-aifa.png",
      alt: "AIFA parallel routing architecture",
    },
    author: {
      name: "Roman Bolshiyanov (Armstrong)",
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
      title: "2+",
      description: "Independent UI streams",
    },
    {
      title: "ISO",
      description: "Isolated errors",
    },
    {
      title: "UX",
      description: "Persistent AI chat",
    },
    {
      title: "SEO",
      description: "Static right slot",
    },
  ],
  showTopFeatures: true,

  blockquote: {
    text: "Parallel routing allows AIFA to treat an AI chat and a static SEO page as two independent UI streams sharing the same URL. Each slot has its own navigation, loading, and error boundaries—so a failure in the right slot never resets the chat on the left.",
  },

  faqs: [
    {
      question: "What problem does parallel routing solve in AIFA?",
      answer:
        "Parallel routing lets AIFA run an AI chat in the left slot and static or dynamic content in the right slot without sharing navigation or error state. The chat keeps its conversation even when the right slot reloads, navigates, or fails.",
    },
    {
      question: "Why not just use a single-page app with global state?",
      answer:
        "A single-page app tightly couples all UI into one React tree. A single error or reload can reset the entire app, including the chat. Parallel routes provide first-class isolation: each slot has independent lifecycle and error boundaries while still sharing the same layout.",
    },
    {
      question: "How does parallel routing help with SEO?",
      answer:
        "AIFA keeps SEO content in the @rightStatic slot, which is statically generated and fully renderable without JavaScript. The AI chat and authenticated features live in separate slots, so they never force the static content into client-side rendering.",
    },
    {
      question: "What happens on mobile devices?",
      answer:
        "On desktop, parallel slots can be shown side by side. On mobile, AIFA uses intercepting routes to open the chat as a drawer or modal over the static page. The underlying routing graph remains parallel; only the visual representation changes.",
    },
    {
      question: "Is parallel routing overkill for simple projects?",
      answer:
        "If you only have static marketing pages, you probably don't need parallel routes. But as soon as you combine AI chat, authenticated dashboards, and SEO pages in one product, parallel routing becomes a clean, scalable way to manage complexity.",
    },
  ],
  showFaq: true,
};

/* ============================================
 * PAGE COMPONENT
 * ============================================ */
export default function ParallelRoutingPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(PAGE_CONFIG.breadcrumbs!);
  const faqJsonLd = buildFaqJsonLd(PAGE_CONFIG.faqs ?? []);

  return (
    <>
      <StructuredDataWrapper data={breadcrumbJsonLd} />
      {faqJsonLd && <StructuredDataWrapper data={faqJsonLd} />}

      <SeoPageWrapper config={PAGE_CONFIG}>
        <ArticleContent />
      </SeoPageWrapper>
    </>
  );
}
