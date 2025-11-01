'use client';

// Comments: Client-only UI kept purely client-side.
// It does not mutate html/body attributes, so no hydration mismatch with server.
// Links remain <Link>, safe for CSR/SSR.

import { useMemo, useState } from 'react';
import Link from 'next/link';

type TabKey = 'seo' | 'pwa' | 'dev';

export function ClientTabs() {
  const [tab, setTab] = useState<TabKey>('seo');

  const tabs = useMemo(
    () => ({
      seo: {
        title: 'SEO Core',
        bullets: [
          'Metadata API with env-driven branding',
          'robots.txt with AI crawlers allowlists',
          'sitemap.ts with i18n alternates and priority',
          'JSON-LD builders: Article, FAQ, Product, Breadcrumb',
        ],
        links: [
          { label: 'Robots', href: '/robots.txt' },
          { label: 'Sitemap', href: '/sitemap.xml' },
          { label: 'Docs', href: '/docs' },
        ],
        hint: [
          'Set NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_APP_NAME in .env.local',
          'Configure title template in pageDefaults.titleTemplate',
          'Add Search Console codes when ready',
        ],
      },
      pwa: {
        title: 'PWA & Performance',
        bullets: [
          'Manifest with maskable icons, shortcuts, screenshots',
          'next-pwa SW caching for fonts, images, API',
          'Install prompt assets via env screenshots',
          'Optimized images (AVIF/WebP), display=swap fonts',
        ],
        links: [
          { label: 'Manifest', href: '/manifest.webmanifest' },
          { label: 'Guides', href: '/guides' },
          { label: 'Starters', href: '/starters' },
        ],
        hint: [
          'Add NEXT_PUBLIC_PWA_SCREENSHOT_MOBILE/DESKTOP',
          'Icons live in /public/app-config-images/icons',
          'SW enabled in production, disabled in dev',
        ],
      },
      dev: {
        title: 'DX & Structure',
        bullets: [
          'Next.js 15 App Router, React 19, Turbopack',
          'Env-only brand config, pure technical app-config',
          'Error (500) and Not Found (404) pages ready',
          'Semantic routes: blog, news, items, docs, guides, tutorials, starters',
        ],
        links: [
          { label: 'Tutorials', href: '/tutorials' },
          { label: 'News', href: '/news' },
          { label: 'Blog', href: '/blog' },
        ],
        hint: [
          'Root layout uses constructMetadata',
          'Sitemap: force-static with hourly revalidate',
          'English-only code, zero inline comments',
        ],
      },
    }),
    []
  );

  const active = tabs[tab];

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        <button onClick={() => setTab('seo')} className={`rounded-md px-3 py-1.5 text-sm ${tab === 'seo' ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:bg-muted'}`}>SEO</button>
        <button onClick={() => setTab('pwa')} className={`rounded-md px-3 py-1.5 text-sm ${tab === 'pwa' ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:bg-muted'}`}>PWA</button>
        <button onClick={() => setTab('dev')} className={`rounded-md px-3 py-1.5 text-sm ${tab === 'dev' ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:bg-muted'}`}>Dev</button>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-foreground">{active.title}</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {active.bullets.map((b, i) => (
            <li key={i} className="text-sm text-muted-foreground">• {b}</li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-3">
          {active.links.map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted">
              {l.label}
            </Link>
          ))}
        </div>
        <details className="group mt-4 rounded-xl border border-border bg-muted/40 px-5 py-4">
          <summary className="cursor-pointer list-none text-sm font-medium text-foreground">Setup hints</summary>
          <ul className="mt-3 space-y-1">
            {active.hint.map((h, i) => (
              <li key={i} className="text-xs text-muted-foreground">{h}</li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
