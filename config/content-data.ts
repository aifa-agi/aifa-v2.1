//config/content-data.ts

import { MenuCategory } from "@/types/menu-types";

export const contentData = {
  categories: [
    {
      "title": "Home",
      "pages": [
        {
          "id": "ks7eqcf6z1fhes1lwiwz75zn2",
          "href": "/home",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "homePage",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 1,
          "title": "Home",
          "description": "Welcome to our AI-powered platform. Discover innovative solutions and cutting-edge technology.",
          "images": [],
          "keywords": [
            "Ai"
          ]
        },
        {
          "id": "ks7eqcf6z1fhes1ldiwz75zn",
          "href": "/hire-me",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "homePage",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 2,
          "title": "Hire me",
          "description": "Need custom setup or project? Let's discuss it.",
          "images": [],
          "keywords": [
            "Ai"
          ]
        },
        
        {
          "id": "ks7eqcf6z1fhes1eEr3575zn",
          "href": "/about-aifa",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "homePage",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 2,
          "title": "About AIFA",
          "description": "Innovative architecture combining AI, Web3, and perfect SEO for maximum business efficiency and developer productivity.",
          "images": [],
          "keywords": [
            "Ai"
          ]
        }
      ],
      "order": 1
    },

    {
      "title": "Examples",
      "href": "/examples",
      "pages": [
        {
          "id": "As126cf631fhes1lwiwz75q3",
          "href": "/examples/privacy-policy-example",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "homePage",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 5,
          "title": "Privacy policy",
          "description": "Privacy policy example",
          "images": [],
          "keywords": [
            "Privacy policy"
          ]
        },
        {
          "id": "ks7eq9f4z1fhes1lAAiwz745z2",
          "href": "/examples/error-example",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "homePage",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 4,
          "title": "Error page",
          "description": "Here you see an example page that handles errors if your application stops working due to unexpected reasons.",
          "images": [],
          "keywords": [
            "404 page"
          ]
        },
        {
          "id": "ks7eqcf6z1fhes123iwz75z2",
          "href": "/examples/404-example",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "homePage",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 3,
          "title": "404 page",
          "description": "Visit a non-existent route to see error handling.",
          "images": [],
          "keywords": [
            "404 page"
          ]
        },
        {
          "id": "y7eqcf6z3fhes123iwz7ff2",
          "href": "/examples/loading-example",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "homePage",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 4,
          "title": "Loading page",
          "description": "Check loading example page, which using for dynamic routes",
          "images": [],
          "keywords": [
            "Loading page"
          ]
        }
      ],
      "order": 2
    },
    {
      "title": "Features",
      "href": "/features",
      "pages": [
        {
          "id": "feature-001-static-generation",
          "href": "/features/static-generation",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 0,
          "title": "Static Generation",
          "description": "Pre-rendering pages at build time for maximum performance and SEO optimization with Next.js static site generation capabilities."
        },
        
        {
          "id": "feature-002-dynamic-generation",
          "href": "/features/dynamic-generation",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 1,
          "title": "Dynamic Generation",
          "description": "Server-side rendering on demand for personalized content and real-time data with Next.js dynamic rendering strategies."
        },
        {
          "id": "news-002-partnership",
          "href": "/features/strategic-partnership-ai-vs-seo",
          "roles": ["guest"],
          "hasBadge": false,
          "type": "news",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 2,
          "title": "Strategic Partnership AI || SEO",
          "description": "Announcing our strategic partnership with leading technology companies to advance AI research and innovation."
        },
        {
          "id": "feature-003-parallel-routing",
          "href": "/features/parallel-routing",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 3,
          "title": "Parallel Routing",
          "description": "Advanced routing pattern enabling simultaneous rendering of multiple pages in the same layout with independent error and loading states."
        },
        {
          "id": "feature-004-intercepting-lead-magnet",
          "href": "/features/intercepting-lead-magnet",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 4,
          "title": "Intercepting Routes: Lead Magnet",
          "description": "Modal-based lead capture using intercepting routes that open forms without page navigation while maintaining SEO-friendly URLs."
        },
        {
          "id": "feature-005-intercepting-auth",
          "href": "/features/intercepting-authentication",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 5,
          "title": "Intercepting Routes: Authentication",
          "description": "Seamless authentication flow using intercepting routes for login and signup modals that preserve user context and navigation state."
        },
         {
          "id": "feature-006-intercepting-chat",
          "href": "/features/intercepting-chat",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 5,
          "title": "Intercepting Routes: AI Chat",
          "description": "Seamless AI chat experience using intercepting routes for modal conversations that preserve user context and navigation state."

        },
        {
          "id": "feature-006-soft-navigation",
          "href": "/features/soft-navigation",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 6,
          "title": "Soft Navigation",
          "description": "Client-side navigation with instant transitions and prefetching that provides SPA-like experience without full page reloads."
        },
        {
          "id": "feature-007-hard-reload",
          "href": "/features/hard-reload",
          "roles": ["guest"],
          "hasBadge": false,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 7,
          "title": "Hard Reload",
          "description": "Full page refresh behavior and server-side data fetching strategies for ensuring fresh content delivery when necessary."
        },
        {
          "id": "feature-008-left-slot",
          "href": "/features/left-slot",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 8,
          "title": "Left Slot Architecture",
          "description": "Dedicated left panel slot for authentication UI and AI chat interface with independent loading states and error boundaries."
        },
        {
          "id": "feature-009-right-slot",
          "href": "/features/right-slot",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 9,
          "title": "Right Slot Architecture",
          "description": "Main content area slot supporting both static SEO pages and dynamic application features with hybrid rendering capabilities."
        },
        {
          "id": "feature-010-default-page",
          "href": "/features/default-page",
          "roles": ["guest"],
          "hasBadge": false,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 10,
          "title": "Default Page",
          "description": "Fallback page rendering mechanism for parallel routes ensuring graceful handling when specific slot content is unavailable."
        },
        {
          "id": "feature-011-error-page",
          "href": "/features/error-page",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 11,
          "title": "Error Page",
          "description": "Custom error boundaries and error page handling for graceful degradation with user-friendly error messages and recovery options."
        },
        {
          "id": "feature-012-404-error",
          "href": "/features/404-error",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 12,
          "title": "404 Error Page",
          "description": "Custom 404 not found page with helpful navigation options and search functionality to guide users back to relevant content."
        },
        {
          "id": "feature-013-global-not-found",
          "href": "/features/global-not-found",
          "roles": ["guest"],
          "hasBadge": false,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 13,
          "title": "Global Not Found Route",
          "description": "Application-wide not found handling with consistent error experience across all route segments and nested layouts."
        },
        {
          "id": "feature-014-loading-pages",
          "href": "/features/loading-pages",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 14,
          "title": "Loading Pages",
          "description": "Instant loading UI with React Suspense boundaries providing smooth user experience during data fetching and navigation."
        },
        {
          "id": "feature-015-cookie-banner",
          "href": "/features/cookie-banner",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 15,
          "title": "Cookie Banner",
          "description": "GDPR and CPRA compliant cookie consent management with granular category controls and user preference storage."
        },
        {
          "id": "feature-016-100-percent-seo",
          "href": "/features/100-percent-seo",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 16,
          "title": "100% SEO Optimized",
          "description": "Complete SEO implementation with semantic HTML, structured data, meta tags, and crawlability ensuring maximum search visibility."
        },
        {
          "id": "feature-017-no-javascript",
          "href": "/features/no-javascript",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 17,
          "title": "No JavaScript Required",
          "description": "Progressive enhancement architecture ensuring core content and functionality work without JavaScript execution for maximum accessibility."
        },
        {
          "id": "feature-018-metadata",
          "href": "/features/metadata",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
           "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 18,
          "title": "Metadata API",
          "description": "Next.js Metadata API implementation for dynamic meta tags, Open Graph, Twitter cards, and canonical URL management."
        },
        {
          "id": "feature-019-og-schema",
          "href": "/features/og-schema",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
           "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 19,
          "title": "Open Graph Schema",
          "description": "Rich social media previews with Open Graph protocol implementation for optimal content sharing on Facebook, LinkedIn, and platforms."
        },
        {
          "id": "feature-020-json-ld-organization",
          "href": "/features/json-ld-organization",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
           "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 20,
          "title": "JSON-LD Organization Data",
          "description": "Structured data markup for organization information enabling rich snippets and knowledge graph integration in search results."
        },
        {
          "id": "feature-021-json-ld-faq",
          "href": "/features/json-ld-faq",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 21,
          "title": "JSON-LD FAQ Schema",
          "description": "FAQ structured data implementation for enhanced search result appearance with expandable question-answer rich snippets."
        },
        {
          "id": "feature-022-breadcrumbs",
          "href": "/features/breadcrumbs",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 22,
          "title": "Breadcrumbs Navigation",
          "description": "Hierarchical breadcrumb navigation with JSON-LD BreadcrumbList schema for improved user experience and SEO structure."
        },
        {
          "id": "feature-023-illustrations",
          "href": "/features/illustrations",
          "roles": ["guest"],
          "hasBadge": false,
          "type": "feature",
     "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 23,
          "title": "Theme-Aware Illustrations",
          "description": "Dual PNG illustration system supporting both light and dark themes for service pages, error states, and loading placeholders."
        },
        {
          "id": "feature-024-robots-txt",
          "href": "/features/robots-txt",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
      "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 24,
          "title": "Robots.txt Configuration",
          "description": "Dynamic robots.txt generation controlling search engine crawler access and sitemap location for optimal indexing control."
        },
        {
          "id": "feature-025-sitemap-xml",
          "href": "/features/sitemap-xml",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
       "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 25,
          "title": "Sitemap XML",
          "description": "Automatic XML sitemap generation with priority settings and change frequency for efficient search engine discovery and indexing."
        },
        {
          "id": "feature-026-mobile-version",
          "href": "/features/mobile-version",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
        "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 26,
          "title": "Mobile Responsive",
          "description": "Fully responsive mobile-first design with touch-optimized interactions and adaptive layouts for all screen sizes and devices."
        },
        {
          "id": "feature-027-loading-speed",
          "href": "/features/loading-speed",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
 "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 27,
          "title": "Loading Speed Optimization",
          "description": "Performance optimization strategies including code splitting, lazy loading, image optimization, and edge caching for instant page loads."
        },
        {
          "id": "feature-028-pwa",
          "href": "/features/pwa",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
       "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 28,
          "title": "Progressive Web App",
          "description": "Full PWA capabilities with service worker caching, offline functionality, installability, and app-like experience on all platforms."
        },
        {
          "id": "feature-030-offline-detector",
          "href": "/features/offline-detector",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 30,
          "title": "Offline Mode Detector",
          "description": "Network-aware offline detector that shows a graceful placeholder on dynamic routes when the internet is unavailable, integrated with PWA service worker fallback and client-side online/offline events."
        },
        {
          "id": "feature-029-whats-next",
          "href": "/features/whats-next",
          "roles": ["guest"],
          "hasBadge": true,
          "type": "feature",
     "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 29,
          "title": "What's Next?",
          "description": "Roadmap and future development plans including upcoming features, authentication integration, AI chat implementation, and fractal architecture."
        }

      ],
      "order": 3
    }

  ]
} as { categories: MenuCategory[] };

export type contentData = typeof contentData;

export const lastUpdated = new Date().toISOString();
export const generatedBy = "menu-persist-api";
