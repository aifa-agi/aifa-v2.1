// /components/site-header/home-page.tsx

import Link from 'next/link';
import { appConfig, getHomePageIllustration } from '@/config/app-config';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { AnimatedAIButton } from './animated-aI-button';

// Small utility to render compact label badges (pills)
interface PillProps {
  text: string;
}
function Pill({ text }: PillProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {text}
    </span>
  );
}

// Small status badge that can be reused across feature cards
function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      {label}
    </span>
  );
}

export default function HomePage() {
  // SSR-friendly illustration switcher for dark/light themes
  function LoadingIllustrationSSR() {
    const darkPath = getHomePageIllustration('dark');
    const lightPath = getHomePageIllustration('light');

    const darkSrc =
      darkPath && typeof darkPath === 'string' && darkPath.length > 0
        ? darkPath
        : null;
    const lightSrc =
      lightPath && typeof lightPath === 'string' && lightPath.length > 0
        ? lightPath
        : null;

    if (!darkSrc && !lightSrc) {
      return (
        <div className="relative h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <p className="text-gray-500 dark:text-gray-400">No illustration available</p>
        </div>
      );
    }

    return (
      <div className="relative h-full w-full">
        {darkSrc && (
          <Image
            src={darkSrc}
            alt="SAdvanced Routing Patterns — AIFA — Next.js 15 + React 19"
            width={800}
            height={600}
            className="h-full w-full object-contain dark:block hidden"
            priority
            unoptimized
          />
        )}

        {lightSrc && (
          <Image
            src={lightSrc}
            alt="Advanced Routing Patterns — AIFA— Next.js 15 + React 19"
            width={800}
            height={600}
            className="h-full w-full object-contain dark:hidden block"
            priority
            unoptimized
          />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="h-20" />

      {/* Top feature pills */}
      <div className="flex flex-wrap gap-2 mb-8 mr-16 ml-4">
        <Pill text="Advanced Routing" />
        <Pill text="AIFA AI || SEO" />
        <Pill text="Parallel Routes" />
        <Pill text="Intercepting Routes" />
        <Pill text="100% SEO" />
        <Pill text="PWA" />
        <Pill text="Next.js 15" />
        <Pill text="React 19" />
        <Pill text="AI SDK" />
        <Pill text="Shadcn UI" />
        <Pill text="AI-Elements" />
        <Pill text="Lead-magnet" />
        <Pill text="Cookie-banner" />
      </div>

      {/* Hero */}
      <section className="grid items-center gap-8 lg:grid-cols-2 px-4" aria-labelledby="hero-title">
        <div className="space-y-5">
          {/* Hero heading */}
          <h1
            id="hero-title"
            className="text-4xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-5xl"
          >
            AI SEO Next.js Starter with Advanced App Router — {appConfig.short_name}
          </h1>

          {/* Hero description */}
          <p className="text-base text-muted-foreground sm:text-lg">
            Production-ready template combining AI chat capabilities with comprehensive advanced routing tutorial. Built with focus on maximum SEO optimization, PWA functionality, and hybrid rendering (Static + Dynamic generation) with role-based access control.
          </p>

          {/* Hero Image (mobile) */}
          <div className="relative block lg:hidden">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
              <LoadingIllustrationSSR />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 lg:flex-row">
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
              Check modal
            </Link>
          </div>
        </div>

        {/* Hero Image (desktop) */}
        <div className="relative hidden lg:block">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
            <LoadingIllustrationSSR />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="w-full px-4" aria-labelledby="Stats Grid">
        <div className="flex flex-row flex-wrap justify-start gap-4 my-4">
          <div className="rounded-lg border border-border bg-card p-4 text-center w-24">
            <div className="text-2xl font-bold text-foreground">8+</div>
            <div className="text-xs text-muted-foreground">Route patterns</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center w-24">
            <div className="text-2xl font-bold text-foreground">Zero</div>
            <div className="text-xs text-muted-foreground">Route reloads</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center w-24">
            <div className="text-2xl font-bold text-foreground">A+</div>
            <div className="text-xs text-muted-foreground">SEO optimized</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center w-24">
            <div className="text-2xl font-bold text-foreground">Type</div>
            <div className="text-xs text-muted-foreground">Safe routing</div>
          </div>
        </div>
        <div className="flex md:hidden">
          <AnimatedAIButton />
        </div>
      </section>

      {/* Why this Starter (expanded feature cards) */}
      <section className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 px-4" aria-labelledby="why-title">
        <h2 id="why-title" className="sr-only">Why this Starter</h2>

        {/* 100% SEO */}
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">100% SEO-first</h3>
            <StatusPill label="SSR/SSG ready" />
          </div>
          <p className="text-sm text-muted-foreground">
            Semantic metadata, Open Graph, Twitter cards, structured data (JSON-LD) and canonical control baked-in. Works with app router parallel/intercept routes without sacrificing crawlability.
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Metadata API + JSON-LD helpers.</li>
            <li>Canonical, robots, and social previews.</li>
            <li>Hybrid SSG/ISR for critical pages.</li>
          </ul>
        </Card>

        {/* PWA + Offline */}
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">PWA + Offline</h3>
            <StatusPill label="Offline-ready" />
          </div>
          <p className="text-sm text-muted-foreground">
            Installable PWA with service worker caching. Right-slaty pages keep working offline, using cached HTML + hydrated state for a seamless experience.
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Precaching for shell and assets.</li>
            <li>Runtime caching for dynamic content.</li>
            <li>Fallback screens for offline.</li>
          </ul>
        </Card>

        {/* Offline Detector + Indicators */}
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Offline Detector</h3>
            <StatusPill label="UX signals" />
          </div>
          <p className="text-sm text-muted-foreground">
            Built-in online/offline detector triggers UI indicators similar to YouTube. Dynamic pages show clear badges when connection is lost.
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Navigator.onLine + SW events.</li>
            <li>Banner/Badge indicators.</li>
            <li>Retry actions and queueing.</li>
          </ul>
        </Card>

        {/* Dynamic SPA-like segment */}
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Dynamic SPA segment</h3>
            <StatusPill label="Client-first UX" />
          </div>
          <p className="text-sm text-muted-foreground">
            A dedicated dynamic route optimized for app-like navigation and zero reloads. Ideal for post-login experiences while SEO pages stay static.
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Parallel slots for isolated UI.</li>
            <li>Intercepted modals and previews.</li>
            <li>Prefetch and optimistic UI.</li>
          </ul>
        </Card>

        {/* Roles / RBAC */}
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Roles & RBAC</h3>
            <StatusPill label="Secure access" />
          </div>
          <p className="text-sm text-muted-foreground">
            Role-based access controls unlock the dynamic segment after sign-up. Protects admin flows while keeping public pages crawlable.
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Server guards in layouts.</li>
            <li>Middleware + session policies.</li>
            <li>Edge-ready auth adapters.</li>
          </ul>
        </Card>

        {/* AI Elements */}
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">AI Elements</h3>
            <StatusPill label="UI primitives" />
          </div>
          <p className="text-sm text-muted-foreground">
            Ready-to-use AI UI primitives compatible with modern chat patterns: message list, composer, tool-calls, function results, and more.
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Tool-calling aware components.</li>
            <li>Streaming tokens UI.</li>
            <li>Drop-in for any slot.</li>
          </ul>
        </Card>

        {/* AI SDK Ready */}
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">AI SDK Ready</h3>
            <StatusPill label="Integration-ready" />
          </div>
          <p className="text-sm text-muted-foreground">
            Starter demonstrates AI patterns in any slot. Current build ships with a mock AI layer; next iterations include real model integrations.
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Server/edge handlers.</li>
            <li>Tooling & observability.</li>
            <li>Provider-agnostic adapters.</li>
          </ul>
        </Card>

        {/* shadcn/ui */}
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">shadcn/ui</h3>
            <StatusPill label="Design system" />
          </div>
          <p className="text-sm text-muted-foreground">
            Clean, accessible, and composable UI components. Extend via tokens and tailwind utilities to keep your design consistent and fast.
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Accessible primitives.</li>
            <li>Dark mode friendly.</li>
            <li>Theming with Tailwind.</li>
          </ul>
        </Card>
        {/* No-JS Ready (Accessible + SEO) */}
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">No‑JS Accessible & SEO‑Solid</h3>
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              Progressive enhancement
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Core content renders and stays usable without JavaScript execution. Your site not only loads instantly but remains crawlable and accessible even when aggressive blockers disable intrusive scripts. This reflects a maximum level of technical readiness and robust implementation.
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Server-rendered HTML for critical content.</li>
            <li>Graceful degradation with JS disabled.</li>
            <li>Stable meta tags and markup for crawlers.</li>
          </ul>
        </Card>

        {/* Cookie Banner (Compliance) */}
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Cookie Banner (Compliance)</h3>
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              GDPR/CPRA‑aware
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            The project includes a legally compliant cookie banner: clear notice, category‑based consent (strictly necessary, functional, analytics, etc.), opt‑in/opt‑out controls, and stored preferences. Optional scripts are deferred until consent is granted.
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Granular consent per category.</li>
            <li>Deferred loading of non‑essential scripts.</li>
            <li>Preference log and link to policy.</li>
          </ul>
        </Card>

        {/* Lead Magnet via Intercepted Route */}
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Lead Magnet (Intercepted)</h3>
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              Modal route optimized
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            The lead magnet starter uses an intercepting route: the form opens as a modal without leaving the current page, improving conversion while keeping the main marketing page SEO‑friendly. It’s optimized for notification delivery; “recent” options will be available in the next version.
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Intercepted route for modal CTAs.</li>
            <li>Non‑intrusive subscription with staged data capture.</li>
            <li>Notification‑ready follow‑up flows.</li>
          </ul>
        </Card>


        {/* Vercel Hosting */}
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Vercel Hosting</h3>
            <StatusPill label="Global edge" />
          </div>
          <p className="text-sm text-muted-foreground">
            Deployment tuned for App Router: edge functions, image optimization, and ISR work out-of-the-box with zero-config previews.
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Preview deployments.</li>
            <li>Edge/runtime toggles.</li>
            <li>Observability hooks.</li>
          </ul>
        </Card>
      </section>

      {/* CTA bottom */}
      <section className="px-4 mt-10">
        <Card className="rounded-lg border border-border bg-card px-6 py-6 space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-foreground">Start building with AIFA</h3>
              <p className="text-sm text-muted-foreground">
                Explore advanced routing, AI-ready chat, and PWA offline-first UX in a single production-grade starter.
              </p>
            </div>
            <div className="flex gap-3">
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
                Check modal
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
