// app/@rightStatic/(_PUBLIC)/(_FEATURES)/features/static-generation/page.tsx
import { constructMetadata } from '@/lib/construct-metadata';
import type { Metadata } from 'next';
import { PageWrapperConfig, SeoPageWrapper } from '@/components/seo-page-wrapper/seo-page-wrapper';
import { StructuredDataWrapper } from '@/components/seo-page-wrapper/structured-data-wrapper';
import { appConfig } from '@/config/app-config';
import { CodeBlock } from '../(_components)/code-block';

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
            role: 'AI / Web3 / Next Architect',
            avatar: appConfig.logo,
        },
        cta: {
            primary: {
                text: 'Email Roman',
                href: `mailto:bolshiyanov@gmail.com?subject=${encodeURIComponent(
                    'AIFA Collaboration — AI/Web3/SEO Architecture',
                )}&body=${encodeURIComponent(
                    [
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
                    ].join('\n'),
                )}`,
            },
            secondary: {
                text: 'Message on Telegram',
                href: 'https://t.me/bolshiyanov',
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

const CODE_SNIPPETS = {
    rightStaticLayout: `// From: app/@rightStatic/layout.tsx
export default async function RightStaticLayout({ 
  children, 
  modal 
}: RightLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}`,

    staticSlotPurity: `// From: app/@rightStatic/layout.tsx
// ❌ NO 'use client' directive
// ❌ NO loading.tsx file in this directory
// ✅ Pure async server component`,

    rootLayoutArchitecture: `// From: app/layout.tsx
export default async function RootLayout({
  left,
  rightStatic,
  rightDynamic,
}: {
  left: React.ReactNode;
  rightStatic: React.ReactNode;
  rightDynamic: React.ReactNode;
}) {
  return (
    <html lang={appConfig.lang} suppressHydrationWarning>
      <body>
        <div className="flex h-full">
          {/* Auth & Chat Slot */}
          <div className="hidden md:flex md:w-0 lg:w-50 xl:w-35">
            {left}
          </div>
          
          {/* Static SEO Content */}
          <main className="absolute inset-0 overflow-y-auto">
            {rightStatic}
          </main>
          
          {/* Dynamic Overlay for Authenticated Users */}
          {rightDynamic}
        </div>
      </body>
    </html>
  );
}`,

    metadataExample: `// From: app/@rightStatic/PUBLIC/[slug]/page.tsx
export const metadata: Metadata = constructMetadata({
  title: "Static Generation",
  description: "Pre-rendering pages at build time...",
  pathname: "/features/static-generation",
  noIndex: false
});`,

    rightDynamicLayout: `// From: app/@rightDynamic/layout.tsx
export default async function RightDynamicLayout({ children }) {
  const authenticated = await isAuthenticated();
  
  return (
    <RightDynamicLayoutClient initialAuth={authenticated}>
      {children}
    </RightDynamicLayoutClient>
  );
}`,

    contentData: `// From: config/content/content-data.ts
{
  id: "feature-001-static-generation",
  href: "/features/static-generation",
  title: "Static Generation",
  description: "Pre-rendering pages at build time..."
}`,
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

// ============================================================================
// ARTICLE CONTENT COMPONENT (654 WORDS)
// ============================================================================

function ArticleContent() {
    return (
        <article className="prose prose-slate dark:prose-invert max-w-none">


            <p>
                When we talk about search engine optimization, we&apos;re really talking about free customers landing
                on your site through organic search. Yet many developers fall into the trap of believing Google&apos;s ability
                to &quot;index&quot; single-page applications means equal ranking potential. The truth is harsher:
                indexation ≠ search ranking. Static pages don&apos;t just get indexed—they dominate search
                results because crawlers receive instant, complete HTML without executing JavaScript.
            </p>


            <h3 className="text-2xl font-semibold mt-8 mb-4">What Is Static Generation?</h3>

            <p>
                Static Generation generates HTML pages during the <strong>build process</strong>, not on each user
                request. This approach transforms your content into ready-to-serve files distributed across global
                CDN networks, enabling sub-second load times regardless of geographic location.
            </p>

            <CodeBlock
                code={CODE_SNIPPETS.rightStaticLayout}
                language="typescript"
                fileName="app/@rightStatic/layout.tsx"
            />

            <p className="text-sm text-muted-foreground">
                This layout handles static content without loading states or client-side dependencies, ensuring
                content accessibility even when JavaScript fails or is disabled.
            </p>


            <h3 className="text-2xl font-semibold mt-8 mb-4">Why Static Generation Wins for SEO</h3>

            <h4 className="text-xl font-medium mt-6 mb-3">Indexation ≠ Ranking</h4>

            <p>
                Google can technically index JavaScript-heavy SPAs, but this doesn&apos;t guarantee high search rankings.
                Static pages offer immediate advantages:
            </p>

            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Instant HTML delivery</strong>: Crawlers see complete content without JavaScript execution</li>
                <li><strong>Superior Core Web Vitals</strong>: Faster LCP (Largest Contentful Paint), better FID (First Input Delay), and minimal CLS (Cumulative Layout Shift)</li>
                <li><strong>Zero hydration delays</strong>: Content appears immediately, improving both user experience and search rankings</li>
            </ul>

            <h4 className="text-xl font-medium mt-6 mb-3">Speed Equals Conversion</h4>

            <p>
                Performance directly impacts business metrics. Static pages typically load in <strong>under 1 second</strong> via
                CDN distribution, and every additional second of delay correlates with measurable conversion loss.
                This speed advantage comes from:
            </p>

            <ul className="list-disc pl-6 space-y-2">
                <li>Pre-rendered HTML requiring no server processing</li>
                <li>Aggressive CDN caching at edge locations worldwide</li>
                <li>Minimal JavaScript payloads for initial render</li>
                <li>Optimized asset delivery through build-time optimization</li>
            </ul>

            {/* The AIFA Hybrid Architecture - 118 words */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">The AIFA Hybrid Architecture</h3>

            <p>
                AIFA resolves the historic tension between static content for SEO and dynamic functionality for
                logged-in users through <strong>parallel routing</strong> with distinct slots:
            </p>

            <h4 className="text-xl font-medium mt-6 mb-3">@rightStatic Slot: SEO-First Content</h4>

            <CodeBlock
                code={CODE_SNIPPETS.metadataExample}
                language="typescript"
                fileName="app/@rightStatic/PUBLIC/[slug]/page.tsx"
            />

            <p>
                The <code className="bg-muted px-2 py-1 rounded">@rightStatic</code> slot contains pure static HTML
                with embedded SEO metadata, JSON-LD schemas, and Open Graph tags. Critically, this slot <strong>avoids</strong>
                {' '}<code className="bg-muted px-2 py-1 rounded">loading.tsx</code> files because loading states break
                no-JavaScript compatibility—a requirement for progressive enhancement.
            </p>

            <h4 className="text-xl font-medium mt-6 mb-3">@rightDynamic Slot: Progressive Enhancement</h4>

            <CodeBlock
                code={CODE_SNIPPETS.rightDynamicLayout}
                language="typescript"
                fileName="app/@rightDynamic/layout.tsx"
            />

            <p>
                For authenticated users, <code className="bg-muted px-2 py-1 rounded">@rightDynamic</code> overlays
                interactive features using absolute positioning. Search engine crawlers see only the static layer,
                while logged-in users access dynamic dashboards—<strong>solving the perpetual conflict between
                    application features and SEO requirements</strong>.
            </p>

            {/* Server Components: The Foundation of True Static Generation - 145 words */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">Server Components: The Foundation of True Static Generation</h3>

            <p>
                To ensure genuinely static pages that work without JavaScript, the <code className="bg-muted px-2 py-1 rounded">@rightStatic</code> slot
                must contain <strong>only server components</strong>—meaning no <code className="bg-muted px-2 py-1 rounded">&apos;use client&apos;</code> directive
                at the top of layout or page files. While client-side &quot;islands&quot; (isolated interactive components) are permitted within server
                components, the route itself must remain server-rendered.
            </p>

            <h4 className="text-xl font-medium mt-6 mb-3">The Critical Rule: No Client Pages in Static Slots</h4>

            <p>
                If a single page within <code className="bg-muted px-2 py-1 rounded">@rightStatic</code> is marked with <code className="bg-muted px-2 py-1 rounded">&apos;use client&apos;</code> or
                uses ISR (Incremental Static Regeneration) with client-side dependencies, <strong>the entire slot becomes client-rendered</strong>.
                This instantly breaks pure static generation, forcing JavaScript execution for all pages in that slot.
            </p>

            <CodeBlock
                code={CODE_SNIPPETS.rootLayoutArchitecture}
                language="typescript"
                fileName="app/layout.tsx — Root Parallel Routes Architecture"
            />

            <p className="text-sm text-muted-foreground">
                The root layout orchestrates three parallel slots: <code className="bg-muted px-2 py-1 rounded">@left</code> for auth and chat,
                <code className="bg-muted px-2 py-1 rounded">@rightStatic</code> for SEO-optimized public pages, and <code className="bg-muted px-2 py-1 rounded">@rightDynamic</code> for
                authenticated user interfaces. This separation ensures static pages remain 100% server-rendered.
            </p>

            <h4 className="text-xl font-medium mt-6 mb-3">How AIFA Adds Interactivity Without Breaking Static Generation</h4>

            <p>
                Dynamic features belong in the <code className="bg-muted px-2 py-1 rounded">@rightDynamic</code> slot, which overlays static content
                using absolute positioning. This architectural pattern enables:
            </p>

            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Client-side interactivity</strong>: Dashboards, real-time updates, and user-specific UI load only when authenticated</li>
                <li><strong>Pure static HTML for SEO</strong>: Search engines and no-JS users see complete content from <code className="bg-muted px-2 py-1 rounded">@rightStatic</code></li>
                <li><strong>Progressive enhancement</strong>: Core functionality works immediately, dynamic features enhance the experience</li>
                <li><strong>Independent deployment</strong>: Static and dynamic routes update separately without affecting each other</li>
            </ul>

            <CodeBlock
                code={CODE_SNIPPETS.staticSlotPurity}
                language="typescript"
                fileName="app/@rightStatic/layout.tsx — Pure Server Component"
            />

            <p className="text-sm text-muted-foreground">
                Notice the absence of <code className="bg-muted px-2 py-1 rounded">&apos;use client&apos;</code> and <code className="bg-muted px-2 py-1 rounded">loading.tsx</code> files.
                This layout remains a pure async server component, enabling Next.js to generate complete static HTML at build time.
                The <code className="bg-muted px-2 py-1 rounded">modal</code> slot handles intercepting routes (like lead magnets) while preserving static generation.
            </p>

            <p>
                This arßchitectural discipline—keeping <code className="bg-muted px-2 py-1 rounded">@rightStatic</code> purely server-rendered while isolating
                dynamic features in <code className="bg-muted px-2 py-1 rounded">@rightDynamic</code>—is what enables AIFA to achieve Lighthouse scores
                of 95-100 while delivering rich application experiences for authenticated users.
            </p>


            {/* Business Advantages - 70 words */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">Business Advantages Beyond Speed</h3>

            <p>Static Generation delivers measurable business impact:</p>

            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Free organic traffic</strong>: Superior search rankings drive continuous visitor acquisition without advertising spend</li>
                <li><strong>Reduced infrastructure costs</strong>: CDN serving eliminates per-request server processing, scaling to millions of requests economically</li>
                <li><strong>Resilient architecture</strong>: Static content remains accessible even when backend APIs experience downtime</li>
                <li><strong>Predictable performance</strong>: Sub-100ms TTFB (Time to First Byte) with proper CDN configuration</li>
            </ul>

            {/* When NOT to Use - 68 words */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">When NOT to Use Static Generation</h3>

            <p>Static Generation isn&apos;t universal. Avoid it for:</p>

            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personalized content</strong>: User-specific data requires Server-Side Rendering or Client-Side Rendering</li>
                <li><strong>Real-time data</strong>: Stock tickers, live chats, or frequently updating content need dynamic rendering</li>
                <li><strong>High-frequency updates</strong>: Content changing every minute becomes impractical to rebuild constantly</li>
            </ul>

            <p>
                <strong>Solution</strong>: Next.js Incremental Static Regeneration (ISR) offers a middle ground,
                regenerating static pages on schedules (e.g., every 60 seconds) without full rebuilds.
            </p>

            {/* Performance Metrics - 47 words */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">Performance Metrics That Matter</h3>

            <p>Real-world static generation improvements:</p>

            <ul className="list-disc pl-6 space-y-2">
                <li><strong>50-70% better FCP</strong> (First Contentful Paint) versus traditional React SPAs</li>
                <li><strong>40% reduction in TTI</strong> (Time to Interactive)</li>
                <li><strong>TTFB under 100ms</strong> with global CDN distribution</li>
                <li><strong>Lighthouse scores of 95-100</strong> for static pages out of the box</li>
            </ul>

            {/* Implementation - 71 words */}
            <h3 className="text-2xl font-semibold mt-8 mb-4">Implementation with AIFA</h3>

            <p>Getting started requires strategic content separation:</p>

            <CodeBlock
                code={CODE_SNIPPETS.contentData}
                language="typescript"
                fileName="config/content/content-data.ts"
            />

            <p>
                AIFA&apos;s architecture provides the blueprint: separate public pages (<code className="bg-muted px-2 py-1 rounded">@rightStatic</code>)
                from private features (<code className="bg-muted px-2 py-1 rounded">@rightDynamic</code>), configure
                proper metadata through <code className="bg-muted px-2 py-1 rounded">constructMetadata</code>, add
                JSON-LD schemas for rich snippets, and deploy to Vercel for automatic edge optimization.
            </p>

            {/* Conclusion - 40 words */}
            <p className="text-lg font-medium mt-8">
                Advanced routing in Next.js 15 finally enables us to solve both challenges simultaneously:
                <strong> delivering dynamic application experiences while maintaining the SEO power of static content</strong>.
                This architectural pattern transforms the traditional choice between performance and functionality into
                a complementary system where both thrive.
            </p>
        </article>
    );
}