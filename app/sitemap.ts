//app/sitemap.ts
import type { MetadataRoute } from 'next';
import { appConfig } from '@/config/app-config';

export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour

const BASE_URL = appConfig.url;
const DEFAULT_LOCALE = appConfig.seo?.defaultLocale || 'en';
const LOCALES = appConfig.seo?.locales || ['en'];

interface Route {
  path: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastModified?: Date;
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

const buildAlternates = (path: string): Record<string, string> | undefined => {
  if (!Array.isArray(LOCALES) || LOCALES.length === 0) {
    return undefined;
  }

  const normalized = normalizeUrl(path);
  const alternates: Record<string, string> = {};

  for (const locale of LOCALES) {
    alternates[locale] = buildUrl(normalized, locale);
  }

  return Object.keys(alternates).length > 0 ? alternates : undefined;
};

const staticRoutes: Route[] = [
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

async function getDynamicBlogPosts(): Promise<MetadataRoute.Sitemap> {
  // TODO: Implement blog posts fetching from your database/CMS
  // const blogPosts = await fetch(`${BASE_URL}/api/blog`).then(r => r.json());
  // return blogPosts.map(post => ({
  //   url: buildUrl(`/blog/${post.slug}`),
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  //   alternates: {
  //     languages: buildAlternates(`/blog/${post.slug}`),
  //   },
  // }));
  return [];
}

async function getDynamicNewsArticles(): Promise<MetadataRoute.Sitemap> {
  // TODO: Implement news articles fetching from your database/CMS
  // const newsArticles = await fetch(`${BASE_URL}/api/news`).then(r => r.json());
  // return newsArticles.map(article => ({
  //   url: buildUrl(`/news/${article.slug}`),
  //   lastModified: new Date(article.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  //   alternates: {
  //     languages: buildAlternates(`/news/${article.slug}`),
  //   },
  // }));
  return [];
}

async function getDynamicItems(): Promise<MetadataRoute.Sitemap> {
  // TODO: Implement items fetching from your database/CMS
  // const items = await fetch(`${BASE_URL}/api/items`).then(r => r.json());
  // return items.map(item => ({
  //   url: buildUrl(`/items/${item.id}`),
  //   lastModified: new Date(item.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  //   alternates: {
  //     languages: buildAlternates(`/items/${item.id}`),
  //   },
  // }));
  return [];
}

async function getDynamicDocPages(): Promise<MetadataRoute.Sitemap> {
  // TODO: Implement documentation pages fetching from your database/CMS
  // const docPages = await fetch(`${BASE_URL}/api/docs`).then(r => r.json());
  // return docPages.map(page => ({
  //   url: buildUrl(`/docs/${page.category}/${page.slug}`),
  //   lastModified: new Date(page.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.75,
  //   alternates: {
  //     languages: buildAlternates(`/docs/${page.category}/${page.slug}`),
  //   },
  // }));
  return [];
}

async function getDynamicGuides(): Promise<MetadataRoute.Sitemap> {
  // TODO: Implement guides fetching from your database/CMS
  // const guides = await fetch(`${BASE_URL}/api/guides`).then(r => r.json());
  // return guides.map(guide => ({
  //   url: buildUrl(`/guides/${guide.slug}`),
  //   lastModified: new Date(guide.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  //   alternates: {
  //     languages: buildAlternates(`/guides/${guide.slug}`),
  //   },
  // }));
  return [];
}

async function getDynamicTutorials(): Promise<MetadataRoute.Sitemap> {
  // TODO: Implement tutorials fetching from your database/CMS
  // const tutorials = await fetch(`${BASE_URL}/api/tutorials`).then(r => r.json());
  // return tutorials.map(tutorial => ({
  //   url: buildUrl(`/tutorials/${tutorial.slug}`),
  //   lastModified: new Date(tutorial.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  //   alternates: {
  //     languages: buildAlternates(`/tutorials/${tutorial.slug}`),
  //   },
  // }));
  return [];
}

async function getDynamicStarters(): Promise<MetadataRoute.Sitemap> {
  // TODO: Implement starters fetching from your database/CMS
  // const starters = await fetch(`${BASE_URL}/api/starters`).then(r => r.json());
  // return starters.map(starter => ({
  //   url: buildUrl(`/starters/${starter.id}`),
  //   lastModified: new Date(starter.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  //   alternates: {
  //     languages: buildAlternates(`/starters/${starter.id}`),
  //   },
  // }));
  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Add static routes
  for (const route of staticRoutes) {
    const alternates = buildAlternates(route.path);

    entries.push({
      url: buildUrl(route.path),
      lastModified: route.lastModified || new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(alternates && {
        alternates: { languages: alternates },
      }),
    });
  }

  // Add dynamic content routes (uncomment the fetchers you need)
  // const blogPosts = await getDynamicBlogPosts();
  // entries.push(...blogPosts);

  // const newsArticles = await getDynamicNewsArticles();
  // entries.push(...newsArticles);

  // const items = await getDynamicItems();
  // entries.push(...items);

  // const docPages = await getDynamicDocPages();
  // entries.push(...docPages);

  // const guides = await getDynamicGuides();
  // entries.push(...guides);

  // const tutorials = await getDynamicTutorials();
  // entries.push(...tutorials);

  // const starters = await getDynamicStarters();
  // entries.push(...starters);

  return entries;
}

/*
 * SITEMAP STRUCTURE & CONFIGURATION
 *
 * STATIC ROUTES (Always Indexed):
 * / (Homepage)          - priority: 1.0, daily
 * /about                - priority: 0.8, monthly
 * /pricing               - priority: 0.9, weekly
 * /blog (listing)       - priority: 0.9, daily
 * /news (listing)       - priority: 0.9, daily
 * /items (listing)      - priority: 0.8, weekly
 * /docs (listing)       - priority: 0.85, weekly
 * /guides (listing)     - priority: 0.85, weekly
 * /tutorials (listing)  - priority: 0.85, weekly
 * /starters (listing)   - priority: 0.8, monthly
 *
 * DYNAMIC ROUTES (Uncomment to Enable):
 * /blog/[slug]          - priority: 0.7, weekly
 * /news/[slug]          - priority: 0.7, weekly
 * /items/[id]           - priority: 0.6, monthly
 * /docs/[category]/[page] - priority: 0.75, weekly
 * /guides/[slug]        - priority: 0.7, weekly
 * /tutorials/[slug]     - priority: 0.7, weekly
 * /starters/[id]        - priority: 0.6, monthly
 *
 * HOW TO ENABLE DYNAMIC ROUTES:
 * 1. Uncomment the getDynamic*() function call in sitemap()
 * 2. Uncomment the fetch logic inside the getDynamic*() function
 * 3. Replace API endpoint with your actual data source
 * 4. Test with: https://www.xml-sitemaps.com/validate-xml-sitemap.html
 *
 * MULTILOCALE SUPPORT:
 * - All routes automatically support i18n alternates
 * - Example: /blog → /en/blog, /ru/blog, /es/blog, etc.
 * - Uses hreflang attributes for search engines
 *
 * IMPORTANT NOTES:
 * - Priority: Google ignores this, but Bing uses it[web:39][web:42]
 * - changeFrequency: Most search engines ignore it[web:39]
 * - lastModified: Helps search engines with recrawling frequency[web:39]
 * - Limit: Max 50,000 URLs or 50MB per sitemap[web:42]
 * - Include only URLs you want in search results[web:33][web:36]
 * - Exclude noindex, redirects, and duplicate URLs[web:39]
 *
 * DYNAMIC CONTENT FETCH PATTERN:
 * // Get all published, public items
 * const items = await db.items.findMany({
 *   where: { isPublished: true, isPublic: true }
 * });
 * return items.map(item => ({...}));
 */
