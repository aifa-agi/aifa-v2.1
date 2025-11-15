// app/@rightStatic/(_PUBLIC)/(_FEATURES)/features/strategic-partnership-ai-vs-seo/page.tsx
import { Metadata } from "next";
import { SeoPageWrapper, type PageWrapperConfig } from "@/components/seo-page-wrapper/seo-page-wrapper";
import { ArticleContent } from "./(_components)/article-content";
import { constructMetadata } from "@/lib/construct-metadata";
import { appConfig } from "@/config/app-config";

/* ============================================
 * META CONFIGURATION
 * ============================================ */
export const metadata: Metadata = constructMetadata({
    title: "Strategic Partnership AI || SEO",
  description: "Announcing our strategic partnership with leading technology companies to advance AI research and innovation.",
 pathname:"/features/strategic-partnership-ai-vs-seo",
  image: '/images/strategic-partnership-ai-seo.png',
  locale: "en",
    contentType: "article",
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

/**
 * Page config for SeoPageWrapper
 */
const PAGE_CONFIG: PageWrapperConfig = {
  topSpacing: 80,
  variant: "feature",
  breadcrumbs: [
    { name: "Home", path: "/home" },
    { name: "Features", path: "/features" },
    { name: "Strategic Partnership AI || SEO", path: "/features/strategic-partnership-ai-vs-seo" },
  ],
  badges: [
    { text: "Next.js 15" }, { text: "AI-First" }, { text: "Advanced Routing" },
    { text: "Parallel Routes" }, { text: "SEO Excellence" }, { text: "UI/UX Revolution" },
  ],
  showBadges: true,
  hero: {
    title: "Strategic Partnership: AI Chat Experience Meets SEO Dominance — The Ideological Pattern Behind AIFA Architecture",
    subtitle: "How Next.js 15 parallel and intercepting routes unlock the revolutionary UI/UX concept where AI conversational interfaces coexist with traditional SEO-optimized web pages—without compromise.",
    images: {
      horizontal: "/images/strategic-partnership-ai-seo.png",
      vertical: "/images/strategic-partnership-ai-seo.png",
      square: "/images/strategic-partnership-ai-seo.png",
      alt: "Strategic partnership AI/SEO illustration",
    },
    author: {
      name: "Roman Bolshiyanov (Armstrong)",
      role: 'AI / Web3 / SEO / Next Architect',
      avatar: appConfig.logo
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
    { title: "100%", description: "SEO score without compromise" },
    { title: "AI+", description: "Chat-first user experience" },
    { title: "∞", description: "Scalability with parallel slots" },
    { title: "<1s", description: "Static page load time" },
  ],
  showTopFeatures: true,
  blockquote: {
    text: "The rise of AI tools like ChatGPT and Perplexity has fundamentally shifted user expectations: people prefer conversational interfaces over endless searches through static pages. Yet businesses still need SEO—because organic traffic is free, predictable, and dominates conversion funnels. AIFA's architectural pattern resolves this historic tension by using Next.js parallel routes to serve static SEO content in one slot and dynamic AI-driven interfaces in another—simultaneously, without compromise. This isn't just a technical trick; it's a new UI/UX paradigm for web applications of the future."
  },
  showBlockquote: true,
  faqs: [
    {
      question: "Can AI chat interfaces completely replace traditional websites?",
      answer: "Technically yes—you could order flowers or book tickets entirely within a chat interface. But brand identity, visual storytelling, and marketing campaigns still demand custom designs that break free from generic chat bubbles. AIFA lets businesses maintain both: AI chat for efficiency, custom pages for brand expression."
    },
    {
      question: "How does AIFA achieve SEO perfection while offering AI chat experiences?",
      answer: "AIFA uses parallel routes: the @rightStatic slot contains pure server-rendered HTML for search engines, while @rightDynamic overlays interactive AI chat for authenticated users. Search crawlers see only static content; logged-in users get dynamic experiences."
    },
    {
      question: "Do I need to rebuild my entire site to use this architecture?",
      answer: "No. Start by placing public pages in @rightStatic and gradually add dynamic features to @rightDynamic. The architecture scales incrementally—add pages to slots like folders in a file system."
    },
    {
      question: "What happens on mobile devices with narrow screens?",
      answer: "AIFA uses intercepting routes for mobile: instead of side-by-side parallel slots, modals overlay content (like chat drawers). The architecture adapts automatically based on viewport width."
    }
  ],
  showFaq: true,
  // FAQ will be rendered at the bottom by SeoPageWrapper
};

/**
 * Main page component for strategic partnership article.
 * Renders SeoPageWrapper with above config and main article content.
 */
export default function StrategicPartnershipPage() {
  return (
    <SeoPageWrapper config={PAGE_CONFIG}>
      <ArticleContent />
    </SeoPageWrapper>
  );
}
