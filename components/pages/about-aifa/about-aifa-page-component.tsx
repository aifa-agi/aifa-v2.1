// components/pages/about-aifa/about-aifa-page-component.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { AnimatedAIButton } from '../../animated-aI-button';
import { appConfig } from '@/config/app-config';
import React from 'react';

/**
 * Strong typing for FAQ items used both in UI and JSON-LD.
 */
type FAQItem = {
  question: string;
  answer: string[];
  bullets?: string[];
};

/**
 * Centralized FAQ content. UI and JSON-LD will stay in sync.
 * EXPORTED for use in page.tsx JSON-LD generation.
 */
export const FAQ_DATA: FAQItem[] = [
  {
    question: 'Is the chatbot in this starter fake?',
    answer: [
      'You are correct — this starter uses a visual placeholder instead of a real AI chatbot.',
      'This is the second AIFA starter, and its primary goal is to help you understand how parallel and intercepting routing works in Next.js 15.',
      'There is no authentication and no real chat functionality in this project. Everything you see is a visual mock designed to demonstrate the routing architecture. The purpose is to give you hands-on experience with parallel routes so you can confidently apply them in your own projects.',
    ],
  },
  {
    question: 'Why do I see unusual folder names like (_CHAT) and @slot in the code?',
    answer: [
      'Next.js App Router uses special naming conventions to enable advanced routing patterns.',
      'This naming structure is also preparation for AIFA\'s fractal architecture (coming Q4 2025). It reduces errors during AI-assisted code generation — we\'ve successfully generated features with 5,000+ lines and 50+ components without a single bug. The high level of stability and modularity is a core goal of AIFA architecture.',
      'Additionally, fractals are much easier to test because each one acts as an independent microservice that extends the app\'s functionality. The app can still run without any particular fractal — features may be limited, but there are no errors.',
    ],
    bullets: [
      '@folder — defines a parallel route slot (independent loading/error states, streaming).',
      '(folder) — creates a route group that does not affect the URL; used for organization.',
      '_folder — private folder, excluded from routing; ideal for internals and utilities.',
    ],
  },
  {
    question: 'Why is parallel routing central to AIFA architecture?',
    answer: [
      'Parallel routing in Next.js allows the app to remain functional even when one slot encounters an error. This is critical for AIFA\'s vision of AI-driven development in the left slot.',
      'Our goal is to enable live coding through the AI chatbot in the left pane. Obviously, the app will occasionally break during development. However, with parallel routing, the chatbot always remains operational. You can simply ask it to fix the error in the right slot, and it will restore stability.',
      'This out-of-the-box state isolation is made possible by Next.js App Router\'s advanced routing features. That\'s why AIFA architecture always has two panes: left (service/chat) and right (content/app). Each maintains independent error boundaries and loading states.',
    ],
  },
  {
    question: 'Will this starter get additional features in the future?',
    answer: [
      'No, this starter is complete as-is. Its sole purpose is to introduce you to parallel and intercepting routing patterns in Next.js.',
      'New capabilities — including authentication, real AI chat, fractal architecture, and visual app composition — will be showcased in upcoming AIFA starters. Stay tuned by following updates on Twitter and GitHub.',
    ],
  },
];

/**
 * Pill component for displaying technology tags
 */
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

/**
 * StatusPill component for service labels
 */
function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      {label}
    </span>
  );
}

/**
 * Main component for the About AIFA page.
 * Note: JSON-LD schemas are now in page.tsx for proper SSR rendering.
 */
export default function AboutAifaPageComponent() {
  // Email contact configuration
  const email = 'bolshiyanov@gmail.com';
  const mailSubject = encodeURIComponent('AIFA Architecture — Collaboration Request');
  const mailBody = encodeURIComponent(
    [
      'Hi Roman!',
      '',
      'I would like to discuss AIFA architecture for my project:',
      '- Using Next.js parallel routing',
      '- AI chat integration',
      '- Fractal architecture for scaling',
      '',
      'Please suggest a couple of convenient time slots for a call.',
      '',
      'Thank you!',
    ].join('\n')
  );
  const mailtoHref = `mailto:${email}?subject=${mailSubject}&body=${mailBody}`;
  const telegramHref = 'https://t.me/bolshiyanov';

  // Hero section content
  const heroTitle = 'AIFA Architecture: AI-first Next.js starter with advanced routing';
  const heroSubtitle =
    'Production-ready architecture leveraging parallel and intercepting routes, AI chat integration, and multi-role access. Currently available with fractal AI-driven development coming Q4 2025.';

  return (
    <>
      <div className="h-20" />

      {/* Technology stack pills */}
      <div className="flex flex-wrap gap-2 mr-16 ml-4">
        <Pill text="Next.js 15" />
        <Pill text="React 19" />
        <Pill text="App Router" />
        <Pill text="Parallel Routes" />
        <Pill text="AI Chat" />
        <Pill text="Multi-language" />
        <Pill text="Prisma" />
        <Pill text="Neon" />
        <Pill text="Vercel" />
        <Pill text="SEO-first" />
        <Pill text="Fractal (Q4 2025)" />
      </div>

      {/* Hero section */}
      <section className="grid items-center gap-8 xl:grid-cols-2 px-4" aria-labelledby="hero-title">
        <div className="space-y-5">
          <h1
            id="hero-title"
            className="text-2xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl"
          >
            {heroTitle}
          </h1>

          <p className="text-base text-muted-foreground sm:text-lg">{heroSubtitle}</p>

          {/* Mobile image */}
          <div className="relative block xl:hidden">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src="/images/pic2.png"
                  alt="AIFA Architecture diagram"
                  width={800}
                  height={600}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Author info */}
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
              <span className="text-sm font-medium text-foreground">Roman Bolshiyanov (Armstrong)</span>
              <span className="text-xs text-muted-foreground">AI / Web3 / Next Architect</span>
            </div>
          </div>

          {/* CTA buttons */}
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
              Telegram
            </Link>
          </div>
        </div>

        {/* Desktop images - responsive layout */}
        <div className="hidden xl:block">
          {/* 2xl+ screens: square aspect */}
          <div className="hidden 2xl:block">
            <div className="aspect-[1/1] w-full overflow-hidden rounded-lg">
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src="/images/pic2.png"
                  alt="AIFA Architecture diagram"
                  width={800}
                  height={600}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* xl to 2xl screens: portrait aspect */}
          <div className="block 2xl:hidden">
            <div className="aspect-[9/16] w-full overflow-hidden rounded-lg">
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src="/images/pic2.png"
                  alt="AIFA Architecture diagram"
                  width={800}
                  height={600}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="w-full px-4 mt-8" aria-labelledby="architecture-stats">
        <h2 id="architecture-stats" className="sr-only">
          Architecture Stats
        </h2>
        <div className="flex flex-row flex-wrap justify-start gap-4 my-4">
          <div className="rounded-lg border border-border bg-card p-4 text-center w-28">
            <div className="text-2xl font-bold text-foreground">v1.0</div>
            <div className="text-xs text-muted-foreground">Available now</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center w-28">
            <div className="text-2xl font-bold text-foreground">7</div>
            <div className="text-xs text-muted-foreground">User roles</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center w-28">
            <div className="text-2xl font-bold text-foreground">2x</div>
            <div className="text-xs text-muted-foreground">i18n levels</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-center w-28">
            <div className="text-2xl font-bold text-foreground">Q4</div>
            <div className="text-xs text-muted-foreground">Fractal release</div>
          </div>
        </div>
        <div className="flex md:hidden">
          <AnimatedAIButton />
        </div>
      </section>

      {/* Current Architecture v1.0 */}
      <section className="px-4 mt-8" aria-labelledby="current-architecture">
        <h2 id="current-architecture" className="text-xl font-semibold text-foreground mb-4">
          AIFA v1.0: Available Now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">Advanced Routing</h3>
              <StatusPill label="Core" />
            </div>
            <p className="text-sm text-muted-foreground">
              Next.js 15 parallel and intercepting routes for optimal performance and user experience.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Left slot: authentication + AI chat (dynamic)</li>
              <li>Right slot: static (SEO, no-JS) + dynamic (app)</li>
              <li>Instant loading of static pages</li>
            </ul>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">Role-Based Access</h3>
              <StatusPill label="Security" />
            </div>
            <p className="text-sm text-muted-foreground">
              Seven access levels with flexible permission configuration for each role.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>User, Buyer, Subscriber, Manager</li>
              <li>Editor, Admin, Architect</li>
              <li>Authorization through left slot</li>
            </ul>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">Multi-language Support</h3>
              <StatusPill label="i18n" />
            </div>
            <p className="text-sm text-muted-foreground">
              Two-level multilingual support for static and dynamic content.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Static content: pre-render for SEO</li>
              <li>Dynamic content: runtime translations</li>
              <li>Flexible interface localization</li>
            </ul>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">AI Chat + External API</h3>
              <StatusPill label="Integration" />
            </div>
            <p className="text-sm text-muted-foreground">
              Built-in AI chat for user support + external API for mobile and third-party applications.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>On-site support via AI</li>
              <li>REST API endpoints out of the box</li>
              <li>Integration with mobile apps</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Future Architecture - Fractal v2.0 */}
      <section className="px-4 mt-8" aria-labelledby="future-architecture">
        <h2 id="future-architecture" className="text-xl font-semibold text-foreground mb-4">
          AIFA v2.0: Fractal Architecture (Q4 2025)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">AI-Driven Development</h3>
              <StatusPill label="Future" />
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time application creation via AI chat in the left slot — for advanced architects.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Chatbot trained in fractal architecture</li>
              <li>Visualization via React Flow</li>
              <li>Recursive fractal composition</li>
            </ul>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">Fractal Components</h3>
              <StatusPill label="Modular" />
            </div>
            <p className="text-sm text-muted-foreground">
              Each fractal is an independent entity with its own API endpoint, recursively including other fractals.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Complete module autonomy</li>
              <li>API-first design</li>
              <li>Unlimited nesting</li>
            </ul>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">Token Efficiency</h3>
              <StatusPill label="Cost" />
            </div>
            <p className="text-sm text-muted-foreground">
              Minimizing token consumption for subscription models (Perplexity, Claude, ChatGPT).
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Prompt optimization</li>
              <li>Context compression</li>
              <li>Smart request caching</li>
            </ul>
          </Card>

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">Visual Composer</h3>
              <StatusPill label="UX" />
            </div>
            <p className="text-sm text-muted-foreground">
              Architect visually builds app schema on canvas, adds fractals — AI generates code.
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Drag-and-drop interface</li>
              <li>Fractal task description</li>
              <li>Automatic code generation</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-4 mt-8" aria-labelledby="use-cases">
        <h2 id="use-cases" className="text-xl font-semibold text-foreground mb-4">
          When to use AIFA
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4 space-y-2">
            <h3 className="text-base font-medium">SaaS + AI Chat Support</h3>
            <p className="text-sm text-muted-foreground">
              Quickly deploy your own AI model for user support on the website and via external API for mobile apps.
              Roles, multi-language, and SEO out of the box.
            </p>
          </Card>

          <Card className="p-4 space-y-2">
            <h3 className="text-base font-medium">Content Platforms with Admin Panel</h3>
            <p className="text-sm text-muted-foreground">
              Static content for instant loading and SEO + dynamic application with role-based access for editors,
              managers, and administrators.
            </p>
          </Card>

          <Card className="p-4 space-y-2">
            <h3 className="text-base font-medium">Complex Multi-role Applications (Future)</h3>
            <p className="text-sm text-muted-foreground">
              With fractal architecture (Q4 2025), architects will be able to visually design complex applications
              where AI generates components in real-time based on task descriptions.
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ Section using Cards */}
      <section className="px-4 mt-8" aria-labelledby="faq-section">
        <h2 id="faq-section" className="text-xl font-semibold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {FAQ_DATA.map((item, idx) => (
            <Card key={idx} className="p-4 space-y-2">
              <h3 className="text-base font-medium">{item.question}</h3>
              {item.answer.map((paragraph, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {item.bullets && item.bullets.length > 0 && (
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {item.bullets.map((b, bi) => (
                    <li key={bi}>{b}</li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 mt-10 mb-16" aria-labelledby="cta-bottom">
        <h2 id="cta-bottom" className="text-xl font-semibold text-foreground mb-4">
          Want to use AIFA in your project?
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Current version v1.0 with parallel routing is available now. Fractal architecture coming Q4 2025.
          Let&apos;s discuss adaptation to your needs.
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
