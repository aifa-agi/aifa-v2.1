// aifa-v2/app/sitemap.ts

import type { MetadataRoute } from 'next';
import { appConfig } from '@/config/app-config';

export const dynamic = 'force-static';
export const revalidate = 3600;

const BASE_URL = appConfig.url;
const DEFAULT_LOCALE = appConfig.seo?.defaultLocale || 'en';
const LOCALES = appConfig.seo?.locales || ['en'];

interface SitemapEntry {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: {
    languages?: Record<string, string>;
  };
}

const normalizeUrl = (path: string): string => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized.replace(/\/+/g, '/');
};

const buildUrl = (path: string, locale?: string): string => {
  const normalized = normalizeUrl(path);
  const urlPath = locale && locale !== DEFAULT_LOCALE ? `/${locale}${normalized}` : normalized;
  return `${BASE_URL}${urlPath}`;
};

const buildAlternates = (path: string): Record<string, string> => {
  const normalized = normalizeUrl(path);
  const alternates: Record<string, string> = {};

  if (Array.isArray(LOCALES) && LOCALES.length > 0) {
    for (const locale of LOCALES) {
      alternates[locale] = buildUrl(normalized, locale);
    }
  }

  return Object.keys(alternates).length > 0 ? alternates : {};
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: SitemapEntry[] = [];

  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    lastModified?: Date;
  }> = [
    {
      path: '/',
      priority: 1.0,
      changeFrequency: 'daily',
      lastModified: new Date(),
    },
    {
      path: '/about',
      priority: 0.8,
      changeFrequency: 'monthly',
      lastModified: new Date('2025-10-16'),
    },
    {
      path: '/pricing',
      priority: 0.9,
      changeFrequency: 'weekly',
      lastModified: new Date('2025-10-16'),
    },

    {
      path: '/blog',
      priority: 0.9,
      changeFrequency: 'daily',
      lastModified: new Date(),
    },
    {
      path: '/news',
      priority: 0.9,
      changeFrequency: 'daily',
      lastModified: new Date(),
    },
    {
      path: '/items',
      priority: 0.8,
      changeFrequency: 'weekly',
      lastModified: new Date('2025-10-16'),
    },
    {
      path: '/docs',
      priority: 0.85,
      changeFrequency: 'weekly',
      lastModified: new Date('2025-10-16'),
    },
    {
      path: '/guides',
      priority: 0.85,
      changeFrequency: 'weekly',
      lastModified: new Date('2025-10-16'),
    },
    {
      path: '/tutorials',
      priority: 0.85,
      changeFrequency: 'weekly',
      lastModified: new Date('2025-10-16'),
    },
    {
      path: '/starters',
      priority: 0.8,
      changeFrequency: 'monthly',
      lastModified: new Date('2025-10-16'),
    },
  ];

  for (const route of staticRoutes) {
    const alternates = buildAlternates(route.path);

    entries.push({
      url: buildUrl(route.path),
      lastModified: route.lastModified || new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(Object.keys(alternates).length > 0 && {
        alternates: { languages: alternates },
      }),
    });
  }

  /* DYNAMIC CONTENT ROUTES (uncomment and implement)
  
  // Blog posts: /blog/[slug]
  // const blogPosts = await fetch(`${BASE_URL}/api/blog`).then(r => r.json());
  // entries.push(...blogPosts.map(post => ({
  //   url: buildUrl(`/blog/${post.slug}`),
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  //   alternates: { languages: buildAlternates(`/blog/${post.slug}`) },
  // })));
  
  // News articles: /news/[slug]
  // const newsArticles = await fetch(`${BASE_URL}/api/news`).then(r => r.json());
  // entries.push(...newsArticles.map(article => ({
  //   url: buildUrl(`/news/${article.slug}`),
  //   lastModified: new Date(article.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  //   alternates: { languages: buildAlternates(`/news/${article.slug}`) },
  // })));
  
  // Items: /items/[id]
  // const items = await fetch(`${BASE_URL}/api/items`).then(r => r.json());
  // entries.push(...items.map(item => ({
  //   url: buildUrl(`/items/${item.id}`),
  //   lastModified: new Date(item.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  //   alternates: { languages: buildAlternates(`/items/${item.id}`) },
  // })));
  
  // Documentation: /docs/[category]/[page]
  // const docPages = await fetch(`${BASE_URL}/api/docs`).then(r => r.json());
  // entries.push(...docPages.map(page => ({
  //   url: buildUrl(`/docs/${page.category}/${page.slug}`),
  //   lastModified: new Date(page.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.75,
  //   alternates: { languages: buildAlternates(`/docs/${page.category}/${page.slug}`) },
  // })));
  
  // Guides: /guides/[slug]
  // const guides = await fetch(`${BASE_URL}/api/guides`).then(r => r.json());
  // entries.push(...guides.map(guide => ({
  //   url: buildUrl(`/guides/${guide.slug}`),
  //   lastModified: new Date(guide.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  //   alternates: { languages: buildAlternates(`/guides/${guide.slug}`) },
  // })));
  
  // Tutorials: /tutorials/[slug]
  // const tutorials = await fetch(`${BASE_URL}/api/tutorials`).then(r => r.json());
  // entries.push(...tutorials.map(tutorial => ({
  //   url: buildUrl(`/tutorials/${tutorial.slug}`),
  //   lastModified: new Date(tutorial.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  //   alternates: { languages: buildAlternates(`/tutorials/${tutorial.slug}`) },
  // })));
  
  // Starters: /starters/[id]
  // const starters = await fetch(`${BASE_URL}/api/starters`).then(r => r.json());
  // entries.push(...starters.map(starter => ({
  //   url: buildUrl(`/starters/${starter.id}`),
  //   lastModified: new Date(starter.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  //   alternates: { languages: buildAlternates(`/starters/${starter.id}`) },
  // })));
  
  */

  return entries;
}

/*
 * ROUTES SITEMAP STRUCTURE
 * 
 * Static Routes (Indexed by default):
 * - / (Homepage)
 * - /about
 * - /pricing
 * - /blog (listing)
 * - /news (listing)
 * - /items (listing)
 * - /docs (listing)
 * - /guides (listing)
 * - /tutorials (listing)
 * - /starters (listing)
 * 
 * Dynamic Routes (uncomment to enable):
 * - /blog/[slug]
 * - /news/[slug]
 * - /items/[id]
 * - /docs/[category]/[page]
 * - /guides/[slug]
 * - /tutorials/[slug]
 * - /starters/[id]
 * 
 * PRIORITY LEVELS:
 * 1.0  = Homepage
 * 0.9  = Main content hubs (Blog, News - updated daily)
 * 0.85 = Knowledge bases (Docs, Guides, Tutorials - updated weekly)
 * 0.8  = Items listing, Starters
 * 0.75 = Individual doc pages
 * 0.7  = Blog/News/Tutorial articles
 * 0.6  = Individual items, Starter details
 * 
 * CHANGE FREQUENCY:
 * daily   = Blog, News (frequently updated)
 * weekly  = Docs, Guides, Tutorials (regular updates)
 * monthly = Starters, Items (occasional updates)
 * 
 * INTERNATIONALIZATION:
 * All routes support i18n alternates
 * Example: /blog → /en/blog, /ru/blog, /es/blog, etc.
 * 
 * TO IMPLEMENT DYNAMIC ROUTES:
 * 1. Uncomment the relevant section
 * 2. Implement the API endpoint
 * 3. Fetch data with filters (isPublished, isPublic)
 * 4. Map to sitemap entries
 * 5. Test with: https://www.xml-sitemaps.com/validate-xml-sitemap.html
 */
