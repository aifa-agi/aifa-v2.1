// components/site-header/home-page.tsx

import Link from 'next/link';
import { appConfig, getHomePageIllustration } from '@/config/app-config';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { AnimatedAIButton } from './animated-aI-button';




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

export default function HomePage() {
 

function LoadingIllustrationSSR() {
  const darkPath = getHomePageIllustration("dark");
  const lightPath = getHomePageIllustration("light");

  const darkSrc =
    darkPath && typeof darkPath === "string" && darkPath.length > 0
      ? darkPath
      : null;
  const lightSrc =
    lightPath && typeof lightPath === "string" && lightPath.length > 0
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
          alt="SEO-First PWA Starter Kit with PWA — Next.js 15 + React 19"
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
          alt="SEO-First PWA Starter Kit with PWA — Next.js 15 + React 19"
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
      <div className='h-20' />
      <section className="grid items-center gap-8 sm:grid-cols-2 px-4" aria-labelledby="hero-title">

        <div className="space-y-5">
          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            <Pill text="Parallel Routes" />
            <Pill text="Intercepting Routes" />
            <Pill text="Next.js 15" />
            <Pill text="React 19" />
            <Pill text="Advanced Routing" />
          </div>

          {/* Hero heading */}
          <h1
            id="hero-title"
            className="text-4xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-5xl"
          >
            Advanced Routing Patterns — {appConfig.name}
          </h1>

          {/* Hero description */}
          <p className="text-base text-muted-foreground sm:text-lg">
            Production-ready Next.js 15 starter with parallel routes, intercepting routes, and complex UI patterns. Build modal dialogs, sidebars, and multi-panel layouts without route changes — fully SEO-optimized.
          </p>

          {/* Hero Image */}
        <div className="relative block sm:hidden">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
            <LoadingIllustrationSSR />
          </div>
        </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
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

        {/* Hero Image */}
        <div className="relative  hidden sm:block">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
            <LoadingIllustrationSSR />
          </div>
        </div>

      </section>
      {/* Stats Grid */}
      <section className='w-full px-4' aria-labelledby="Stats Grid">
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
        <div className='flex md:hidden'><AnimatedAIButton /></div>
        
      </section>
      {/* Features Section */}
      <section className="grid gap-8 sm:grid-cols-3 px-4" aria-labelledby="features-title">
        <h2 id="features-title" className="sr-only">Core Features</h2>

        <Card className="rounded-lg border border-border bg-card px-6 space-y-3">
          <h3 className="text-lg font-bold text-foreground">Parallel Routes</h3>
          <p className="text-sm text-muted-foreground">
            Render multiple segments independently within the same layout. Perfect for dashboards, sidebars, and multi-panel UIs.
          </p>
        </Card>

        <Card className="rounded-lg border border-border bg-card px-6 space-y-3">
          <h3 className="text-lg font-bold text-foreground">Intercepting Routes</h3>
          <p className="text-sm text-muted-foreground">
            Intercept and reuse routes in different contexts. Create modals, preview panels, and complex workflows seamlessly.
          </p>
        </Card>

        <Card className="rounded-lg border border-border bg-card px-6 space-y-3">
          <h3 className="text-lg font-bold text-foreground">Type-Safe Navigation</h3>
          <p className="text-sm text-muted-foreground">
            Full TypeScript support with type-safe routing. Catch errors at compile time, not runtime.
          </p>
        </Card>
      </section>
    </>
  );
}
