// components/pages/hire-me/hire-me-page-component.tsx
// Understanding (EN):
// - Convert the page into an English "Hire Me" landing oriented to international clients.
// - Use a single author photo (/images/author-bolshiyanov.png) for all themes (no light/dark swap).
// - Keep App Router + React 19 patterns, shadcn/ui Card, and Tailwind styles.
// - Replace tech badges with expertise stack relevant to positioning (AI SDK, Web3, Next.js, React, Vercel, OpenAI, Prisma, Neon, Stripe, SEO + AI-Search).
// - Add CTA buttons: mailto with encoded subject/body; Telegram deep link t.me/bolshiyanov.
// - Replace stats with credibility (25+ years, 10+ businesses, 10 years leading teams, 5 patents, FRII alumnus).
// - All UI copy is English-only.

// References for link formats (encode and deep links):
// - mailto subject/body parameters should be URL-encoded. [web:15][web:31][web:33]
// - Telegram public username links use https://t.me/<username>. [web:16]

// Notes: keep imports and local utilities minimal and typed.

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { AnimatedAIButton } from '../../animated-aI-button';
import { appConfig } from '@/config/app-config';

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

function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      {label}
    </span>
  );
}

export default function HireMePageComponent() {
  // Prefilled mailto link with URL-encoded subject and body. [web:15][web:31][web:33]
  const email = 'bolshiyanov@gmail.com';
  const mailSubject = encodeURIComponent('AIFA Collaboration — AI/Web3/SEO Architecture');
  const mailBody = encodeURIComponent(
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
    ].join('\n')
  );
  const mailtoHref = `mailto:${email}?subject=${mailSubject}&body=${mailBody}`; // [web:15][web:31][web:33]

  // Telegram deep link using public username. [web:16]
  const telegramHref = 'https://t.me/bolshiyanov';

  // Hero copy
  const heroTitle = 'Have an idea? Let’s build something monumental together';
  const heroSubtitle =
    'Architecture that extracts maximum value from AI and Web3 with SEO and AI-search focus — minimizing costs while maximizing outcomes. A technical partner, not just a developer.';

  return (
    <>
      <div className="h-20" />

      {/* Expertise pills */}
      <div className="flex flex-wrap gap-2  mr-16 ml-4">
        <Pill text="AI SDK" />
        <Pill text="Web3" />
        <Pill text="Next.js 15" />
        <Pill text="React 19" />
        <Pill text="Vercel" />
        <Pill text="OpenAI" />
        <Pill text="Prisma" />
        <Pill text="Neon" />
        <Pill text="Stripe" />
        <Pill text="SEO + AI-Search" />
        <Pill text="AIFA Architecture" />
      </div>

      {/* Hero */}
      <section className="grid items-center gap-8 xl:grid-cols-2 px-4" aria-labelledby="hero-title">
        <div className="space-y-5">
          <h1
            id="hero-title"
            className="text-2xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl"
          >
            {heroTitle}
          </h1>

          <p className="text-base text-muted-foreground sm:text-lg">
            {heroSubtitle}
          </p>




          <div className="relative block xl:hidden ">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
              <div className="relative h-full w-full flex items-center justify-center ">
                <Image
                  src="/images/author-bolshiyanov-horizontal.png"
                  alt="Roman Bolshiyanov portrait"
                  width={800}
                  height={600}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border">
              <Image
                src={appConfig.logo}
                alt="AIFA LOGO"
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                Roman Bolshiyanov (Armstrong)
              </span>
              <span className="text-xs text-muted-foreground">
                AI / Web3 / Next Architect
              </span>
            </div>
          </div>
          {/* CTA */}
          <div className="flex flex-col gap-3 xl:flex-row">
            <Link
              href={mailtoHref}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              Email Roman
            </Link>
            <Link
              href={telegramHref}
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on Telegram
            </Link>
          </div>
        </div>

        {/* Photo on desktop (kept for layout balance) */}
        <div className='hidden xl:block'>

          <div className=''>
            <div className="relative hidden 2xl:block">
              <div className="aspect-[1/1] w-full overflow-hidden rounded-lg">
                <div className="relative h-full w-full flex items-center justify-center ">
                  <Image
                    src="/images/author-bolshiyanov.png"
                    alt="Roman Bolshiyanov portrait"
                    width={800}
                    height={600}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>


          <div className='2xl:hidden  block'>
            <div className="relative hidden xl:block">
              <div className="aspect-[9/16] w-full overflow-hidden rounded-lg">
                <div className="relative h-full w-full flex items-center justify-center ">
                  <Image
                    src="/images/author-bolshiyanov-vertical.png"
                    alt="Roman Bolshiyanov portrait"
                    width={800}
                    height={600}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Credibility Stats */}
      <section className="w-full px-4 mt-8" aria-labelledby="credibility-stats">
        <h2 id="credibility-stats" className="sr-only">Credibility Stats</h2>
        <div className="flex flex-row flex-wrap justify-start gap-4 my-4">
          <div className="rounded-lg border border-border bg-card p-4 text-center w-28">
            <div className="text-2xl font-bold text-foreground">25+</div>
            <div className="text-xs text-muted-foreground">Years in web</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center w-28">
            <div className="text-2xl font-bold text-foreground">10+</div>
            <div className="text-xs text-muted-foreground">Businesses launched</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center w-28">
            <div className="text-2xl font-bold text-foreground">10</div>
            <div className="text-xs text-muted-foreground">Years leading teams</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center w-28">
            <div className="text-2xl font-bold text-foreground">5</div>
            <div className="text-xs text-muted-foreground">Patents</div>
          </div>

        </div>
        <div className="flex md:hidden">
          <AnimatedAIButton />
        </div>
      </section>

      {/* Services */}
      <section className="px-4 mt-8" aria-labelledby="services">
        <h2 id="services" className="text-xl font-semibold text-foreground mb-4">What I deliver</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">AI Advisory</h3>
              <StatusPill label="Strategy" />
            </div>
            <p className="text-sm text-muted-foreground">
              Practical AI integration into existing processes with measurable impact and cost control.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Assessment, roadmap, KPIs</li>
              <li>RAG, agents, chat ops</li>
              <li>Data & prompt operations</li>
            </ul>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">Technical Delivery</h3>
              <StatusPill label="Delivery" />
            </div>
            <p className="text-sm text-muted-foreground">
              Next.js + React systems, Web3 and asset tokenization, AIFA architecture for scale.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Next 15 + React 19</li>
              <li>Web3 tokenization</li>
              <li>Server Actions, Edge</li>
            </ul>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">SEO & AI Search</h3>
              <StatusPill label="Growth" />
            </div>
            <p className="text-sm text-muted-foreground">
              Hybrid visibility: classic SEO plus optimization for AI search engines.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Static + dynamic strategy</li>
              <li>Schemas and rich snippets</li>
              <li>AI-FAQ, AI-SERP</li>
            </ul>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">AIFA Starters</h3>
              <StatusPill label="Fast-track" />
            </div>
            <p className="text-sm text-muted-foreground">
              Fast adaptation of AIFA starters to your business with small custom enhancements.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Process-aligned customization</li>
              <li>Traction & metrics</li>
              <li>Vercel hosting</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="px-4 mt-10 mb-16" aria-labelledby="cta-bottom">
        <h2 id="cta-bottom" className="text-xl font-semibold text-foreground mb-2">
          Have an idea? Don’t hesitate to reach out
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Looking for a long-term partner to orchestrate tech and business outcomes together.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={telegramHref}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on Telegram
          </Link>
          <Link
            href={mailtoHref}
            className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Email Roman
          </Link>
        </div>
      </section>
    </>
  );
}
