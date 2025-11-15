// app/@rightStatic/(_PUBLIC)/(_FEATURES)/features/dynamic-generation/page.tsx

import { constructMetadata } from "@/lib/construct-metadata";
import type { Metadata } from "next";
import {
    PageWrapperConfig,
    SeoPageWrapper,
} from "@/components/seo-page-wrapper/seo-page-wrapper";
import { StructuredDataWrapper } from "@/components/seo-page-wrapper/structured-data-wrapper";
import { appConfig } from "@/config/app-config";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, Sparkles } from "lucide-react";
import { CodeBlock } from "../(_components)/code-block";
import { ArticleContent } from "./(_components)/article-content";

/* ============================================
 * META CONFIGURATION
 * ============================================ */
export const metadata: Metadata = constructMetadata({
    title: "Dynamic Generation — On-Demand Rendering for Personalized Experiences",
    description:
        "Server-side rendering on each request powers authenticated dashboards, real-time analytics, and role-based interfaces while preserving SEO-optimized static content.",
    image: "/images/dynamic-generate-aifa.png",
    pathname: "/features/dynamic-generation",
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

/* ============================================
 * JSON-LD HELPER FUNCTIONS
 * ============================================ */
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
        { name: "Dynamic Generation", path: "/features/dynamic-generation" },
    ],

    badges: [
        { text: "Next.js 15" },
        { text: "SSR" },
        { text: "Dynamic Rendering" },
        { text: "Authentication" },
        { text: "Personalization" },
    ],
    showBadges: true,

    hero: {
        title:
            "Dynamic Generation — On-Demand Rendering for Personalized Web Experiences",
        subtitle:
            "Server-side rendering on each request powers authenticated dashboards, real-time analytics, and role-based interfaces while preserving SEO-optimized static content through AIFA innovative dual-slot architecture.",
        images: {
            horizontal: "/images/dynamic-generate-aifa.png",
            vertical: "/images/dynamic-generate-aifa.png",
            square: "/images/dynamic-generate-aifa.png",
            alt: "AIFA dynamic generation architecture",
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
            title: "SSR",
            description: "Real-time rendering",
        },
        {
            title: "∞",
            description: "Unlimited personalization",
        },
        {
            title: "<2s",
            description: "Server response time",
        },
        {
            title: "95%",
            description: "Auth user satisfaction",
        },
    ],
    showTopFeatures: true,

    blockquote: {
        text: "Dynamic Generation bridges the gap between static SEO content and personalized user experiences. AIFA architecture uses the @rightDynamic slot to overlay authenticated interfaces while keeping static pages visible to search engines—solving the eternal conflict between application functionality and search visibility.",
    },

    faqs: [
        {
            question:
                "Whats the difference between Dynamic Generation and Client-Side Rendering?",
            answer:
                "Dynamic Generation runs on the server on each request, delivering complete HTML to the browser. Client-Side Rendering happens in the browser after page load, requiring JavaScript execution to display content. Dynamic Generation provides better SEO and faster initial render.",
        },
        {
            question:
                "Can I mix static and dynamic pages in the same Next.js app?",
            answer:
                "Yes, AIFA architecture uses parallel routes to render static SEO pages in @rightStatic while overlaying dynamic content in @rightDynamic. This enables hybrid rendering where public content is static and authenticated content is dynamic.",
        },
        {
            question: "Does Dynamic Generation hurt SEO?",
            answer:
                "If you render personalized content server-side, search engines wont see it (which is expected). Thats why AIFA keeps SEO content in the static slot while dynamic features appear only for authenticated users.",
        },
        {
            question:
                "What happens if JavaScript is disabled on a dynamic page?",
            answer:
                "The static fallback from @rightStatic remains visible. Dynamic features wont work, but core content is accessible. This progressive enhancement approach ensures content availability regardless of JavaScript execution.",
        },
        {
            question: "How does AIFA handle role-based rendering?",
            answer:
                "The RightDynamicLayoutClient checks isAuthenticated state and conditionally shows the dynamic overlay with role-specific UI. Server-side auth verification determines initial state, client-side hooks handle transitions.",
        },
        {
            question: "How much does Dynamic Generation cost compared to Static Generation?",
            answer: "Static Generation is 50-100x cheaper than Dynamic Generation for high-traffic sites. A static site serving 1 million page views costs ~$5-10/month on Vercel (mostly bandwidth), while dynamic SSR for the same traffic costs $200-500/month due to serverless function invocations. CDN caching eliminates server costs entirely for static pages, while dynamic pages require server processing on every request. For example, serving 1,000 requests/second costs $0 for static (pure CDN) vs $0.20-0.40 per million invocations for dynamic. AIFA hybrid architecture maximizes static content (marketing pages, blogs, docs) to leverage CDN caching, using dynamic rendering only for authenticated user dashboards where personalization justifies the cost."
        }

    ],
    showFaq: true,
};





/* ============================================
 * PAGE COMPONENT
 * ============================================ */
export default function DynamicGenerationPage() {
    const breadcrumbJsonLd = buildBreadcrumbJsonLd(PAGE_CONFIG.breadcrumbs!);
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


