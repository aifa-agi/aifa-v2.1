// components/pages/hire-me/hire-me-page-component.tsx
// Understanding (EN):
// - Extend the existing English "Hire Me" page with a new FAQ section (3 Q&A).
// - Drive JSON-LD (FAQPage) directly from the same Q&A data source used in the UI.
// - Keep a single author photo usage policy elsewhere; FAQ itself is text-only.
// - All visible copy stays in English; code comments are in English.
// - This structure lets you later edit Q&A and automatically receive updated JSON-LD.
//
// References:
// - Schema.org FAQPage structure (Question -> acceptedAnswer) [web:62]
// - Adding JSON-LD in Next.js (script tag best practices) [web:67][web:70]
// - Google FAQ rich results are limited/eligibility-based since 2023; still fine to include [web:71]

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { AnimatedAIButton } from '../../animated-aI-button';
import { appConfig } from '@/config/app-config';
import React from 'react';

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

// Reusable FAQ types for stronger typing and JSON-LD generation
type FAQItem = {
  question: string;
  answer: string;
};

// Centralized FAQ data source (edit here; UI and JSON-LD will stay in sync)
const FAQ_DATA: FAQItem[] = [
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
];


// Helper to build FAQPage JSON-LD from the data above
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

export default function HireMePageComponent() {
  // Prefilled mailto link with URL-encoded subject and body. [web:12][web:49]
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
  const mailtoHref = `mailto:${email}?subject=${mailSubject}&body=${mailBody}`; // [web:12][web:49]

  // Telegram deep link using public username. [web:16]
  const telegramHref = 'https://t.me/bolshiyanov';

  // Hero copy
  const heroTitle = 'Have an idea? Let’s build something monumental together';
  const heroSubtitle =
    'Architecture that extracts maximum value from AI and Web3 with SEO and AI-search focus — minimizing costs while maximizing outcomes. A technical partner, not just a developer.';

  // Build JSON-LD once per render from FAQ data
  const faqJsonLd = buildFaqJsonLd(FAQ_DATA);

  return (
    <>
      {/* Inject FAQ JSON-LD. Safe replacement for < to avoid parser issues. [web:67][web:70] */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="h-20" />

      {/* Expertise pills */}
      <div className="flex justify-center flex-wrap gap-2 px-4 mb-4 max-h-[4.75rem] overflow-hidden">
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

          {/* Mobile image (horizontal) */}
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

        {/* Photo on desktop */}
        <div className="hidden xl:block">
          <div className="">
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

          <div className="2xl:hidden  block">
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

      {/* FAQ */}
      <section className="px-4 mt-10" aria-labelledby="faq">
        <h2 id="faq" className="text-xl font-semibold text-foreground mb-4">FAQ</h2>
        <div className="space-y-3">
          {FAQ_DATA.map((item) => (
            <Card key={item.question} className="p-4">
              <h3 className="text-base font-medium">{item.question}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.answer}</p>
            </Card>
          ))}
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
