// components/seo-pages/pages/home/home-page-component.tsx

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import FeaturesPageComponent from '@/app/@rightStatic/(_PUBLIC)/(_FEATURES)/features/(_components)/features-page-component';

/**
 * StatusPill component for feature labels
 */
function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      {label}
    </span>
  );
}

/**
 * Home Page Component
 * 
 * Note: Hero, Breadcrumbs, Badges, and FAQ are handled by SeoPageWrapper
 * This component contains only the main content sections
 */
export default function ArticleContent() {
  return (
    <>
    

      <FeaturesPageComponent />

      {/* Features Section */}
      <section className="mb-12" aria-labelledby="features">
        <h2 id="features" className="text-2xl font-semibold text-foreground mb-6">
          Why this Starter
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 100% SEO */}
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">100% SEO-first</h3>
              <StatusPill label="SSR/SSG ready" />
            </div>
            <p className="text-sm text-muted-foreground">
              Semantic metadata, Open Graph, Twitter cards, structured data (JSON-LD) and canonical control baked-in. Works with app router parallel/intercept routes without sacrificing crawlability.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Metadata API + JSON-LD helpers</li>
              <li>Canonical, robots, and social previews</li>
              <li>Hybrid SSG/ISR for critical pages</li>
            </ul>
          </Card>

          {/* PWA + Offline */}
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">PWA + Offline</h3>
              <StatusPill label="Offline-ready" />
            </div>
            <p className="text-sm text-muted-foreground">
              Installable PWA with service worker caching. Right-slot pages keep working offline, using cached HTML + hydrated state for a seamless experience.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Precaching for shell and assets</li>
              <li>Runtime caching for dynamic content</li>
              <li>Fallback screens for offline</li>
            </ul>
          </Card>

          {/* Offline Detector */}
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Offline Detector</h3>
              <StatusPill label="UX signals" />
            </div>
            <p className="text-sm text-muted-foreground">
              Built-in online/offline detector triggers UI indicators similar to YouTube. Dynamic pages show clear badges when connection is lost.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Navigator.onLine + SW events</li>
              <li>Banner/Badge indicators</li>
              <li>Retry actions and queueing</li>
            </ul>
          </Card>

          {/* Dynamic SPA segment */}
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Dynamic SPA segment</h3>
              <StatusPill label="Client-first UX" />
            </div>
            <p className="text-sm text-muted-foreground">
              A dedicated dynamic route optimized for app-like navigation and zero reloads. Ideal for post-login experiences while SEO pages stay static.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Parallel slots for isolated UI</li>
              <li>Intercepted modals and previews</li>
              <li>Prefetch and optimistic UI</li>
            </ul>
          </Card>

          {/* Roles / RBAC */}
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Roles & RBAC</h3>
              <StatusPill label="Secure access" />
            </div>
            <p className="text-sm text-muted-foreground">
              Role-based access controls unlock the dynamic segment after sign-up. Protects admin flows while keeping public pages crawlable.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Server guards in layouts</li>
              <li>Middleware + session policies</li>
              <li>Edge-ready auth adapters</li>
            </ul>
          </Card>

          {/* AI Elements */}
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">AI Elements</h3>
              <StatusPill label="UI primitives" />
            </div>
            <p className="text-sm text-muted-foreground">
              Ready-to-use AI UI primitives compatible with modern chat patterns: message list, composer, tool-calls, function results, and more.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Tool-calling aware components</li>
              <li>Streaming tokens UI</li>
              <li>Drop-in for any slot</li>
            </ul>
          </Card>

          {/* AI SDK Ready */}
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">AI SDK Ready</h3>
              <StatusPill label="Integration-ready" />
            </div>
            <p className="text-sm text-muted-foreground">
              Starter demonstrates AI patterns in any slot. Current build ships with a mock AI layer; next iterations include real model integrations.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Server/edge handlers</li>
              <li>Tooling & observability</li>
              <li>Provider-agnostic adapters</li>
            </ul>
          </Card>

          {/* shadcn/ui */}
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">shadcn/ui</h3>
              <StatusPill label="Design system" />
            </div>
            <p className="text-sm text-muted-foreground">
              Clean, accessible, and composable UI components. Extend via tokens and tailwind utilities to keep your design consistent and fast.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Accessible primitives</li>
              <li>Dark mode friendly</li>
              <li>Theming with Tailwind</li>
            </ul>
          </Card>

          {/* No-JS Ready */}
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">No‑JS Accessible & SEO‑Solid</h3>
              <StatusPill label="Progressive enhancement" />
            </div>
            <p className="text-sm text-muted-foreground">
              Core content renders and stays usable without JavaScript execution. Your site not only loads instantly but remains crawlable and accessible even when aggressive blockers disable intrusive scripts.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Server-rendered HTML for critical content</li>
              <li>Graceful degradation with JS disabled</li>
              <li>Stable meta tags and markup for crawlers</li>
            </ul>
          </Card>

          {/* Cookie Banner */}
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Cookie Banner (Compliance)</h3>
              <StatusPill label="GDPR/CPRA‑aware" />
            </div>
            <p className="text-sm text-muted-foreground">
              The project includes a legally compliant cookie banner: clear notice, category‑based consent (strictly necessary, functional, analytics, etc.), opt‑in/opt‑out controls, and stored preferences.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Granular consent per category</li>
              <li>Deferred loading of non‑essential scripts</li>
              <li>Preference log and link to policy</li>
            </ul>
          </Card>

          {/* Lead Magnet */}
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Lead Magnet (Intercepted)</h3>
              <StatusPill label="Modal route optimized" />
            </div>
            <p className="text-sm text-muted-foreground">
              The lead magnet starter uses an intercepting route: the form opens as a modal without leaving the current page, improving conversion while keeping the main marketing page SEO‑friendly.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Intercepted route for modal CTAs</li>
              <li>Non‑intrusive subscription with staged data capture</li>
              <li>Notification‑ready follow‑up flows</li>
            </ul>
          </Card>

          {/* Vercel Hosting */}
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Vercel Hosting</h3>
              <StatusPill label="Global edge" />
            </div>
            <p className="text-sm text-muted-foreground">
              Deployment tuned for App Router: edge functions, image optimization, and ISR work out-of-the-box with zero-config previews.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Preview deployments</li>
              <li>Edge/runtime toggles</li>
              <li>Observability hooks</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="mb-12" aria-labelledby="cta-bottom">
        <h2 id="cta-bottom" className="text-2xl font-semibold text-foreground mb-6">
          Start building with AIFA
        </h2>
        <Card className="p-6 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Explore advanced routing, AI-ready chat, and PWA offline-first UX
              </h3>
              <p className="text-sm text-muted-foreground">
                Get started with a production-grade starter that combines the best practices for modern web development.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="https://github.com/aifa-agi/aifa-v2.1"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Starter
              </Link>
              <Link
                href="/interception_modal/lead-form"
                className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Check Modal
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
