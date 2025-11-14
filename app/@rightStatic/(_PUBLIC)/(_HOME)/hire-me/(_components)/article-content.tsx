//app/@rightStatic/(_PUBLIC)/(_HOME)/hire-me/(_components)/hire-me-page-component.tsx

import { Card } from '@/components/ui/card';

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
 * Hire Me Page Component
 * 
 * Note: Hero, Breadcrumbs, Badges, and FAQ are handled by SeoPageWrapper
 * This component contains only the main content sections
 */
export default function ArticleContent() {
  return (
    <>
      
      {/* Services */}
      <section className="mb-12" aria-labelledby="services">
        <h2 id="services" className="text-2xl font-semibold text-foreground mb-6">
          What I deliver
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">AI Advisory</h3>
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

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Technical Delivery</h3>
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

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">SEO & AI Search</h3>
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

          <Card className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">AIFA Starters</h3>
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
    </>
  );
}
