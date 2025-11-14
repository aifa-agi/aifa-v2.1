// components/seo-pages/pages/about-aifa/about-aifa-page-component.tsx

import { Card } from '@/components/ui/card';
import Link from 'next/link';

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
 * About AIFA Page Component
 * 
 * Note: Hero, Breadcrumbs, Badges, and FAQ are handled by SeoPageWrapper
 * This component contains only the main content sections
 */
export default function ArticleContent() {
  // Email and Telegram configuration for CTA section
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

  return (
    <>
      

      {/* Current Architecture v1.0 */}
      <section className="mb-12" aria-labelledby="current-architecture">
        <h2 id="current-architecture" className="text-2xl font-semibold text-foreground mb-6">
          AIFA v1.0: Available Now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Advanced Routing</h3>
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

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Role-Based Access</h3>
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

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Multi-language Support</h3>
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

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">AI Chat + External API</h3>
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
      <section className="mb-12" aria-labelledby="future-architecture">
        <h2 id="future-architecture" className="text-2xl font-semibold text-foreground mb-6">
          AIFA v2.0: Fractal Architecture (Q4 2025)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">AI-Driven Development</h3>
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

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Fractal Components</h3>
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

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Token Efficiency</h3>
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

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Visual Composer</h3>
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
      <section className="mb-12" aria-labelledby="use-cases">
        <h2 id="use-cases" className="text-2xl font-semibold text-foreground mb-6">
          When to use AIFA
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-6 space-y-3">
            <h3 className="text-lg font-medium">SaaS + AI Chat Support</h3>
            <p className="text-sm text-muted-foreground">
              Quickly deploy your own AI model for user support on the website and via external API for mobile apps.
              Roles, multi-language, and SEO out of the box.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="text-lg font-medium">Content Platforms with Admin Panel</h3>
            <p className="text-sm text-muted-foreground">
              Static content for instant loading and SEO + dynamic application with role-based access for editors,
              managers, and administrators.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <h3 className="text-lg font-medium">Complex Multi-role Applications (Future)</h3>
            <p className="text-sm text-muted-foreground">
              With fractal architecture (Q4 2025), architects will be able to visually design complex applications
              where AI generates components in real-time based on task descriptions.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-12" aria-labelledby="cta-bottom">
        <h2 id="cta-bottom" className="text-2xl font-semibold text-foreground mb-6">
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
