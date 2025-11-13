// app/sitemap.ts
// Comments: Exclude "/home" from sitemap to avoid duplicate with "/". Keep only canonical URLs.
// This preserves your category/page logic while ensuring no duplicate homepage URL.

import { MetadataRoute } from 'next';
import { contentData } from '@/config/content-data';
import { appConfig } from '@/config/app-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = appConfig.url;
  const currentDate = new Date();

  // Extract category pages (exclude "/home" defensively)
  const categoryPages: MetadataRoute.Sitemap = contentData.categories
    .filter((category) => category.href && category.href !== '/home') // exclude /home
    .map((category) => ({
      url: `${baseUrl}${category.href}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // Extract all published child pages from categories (exclude "/home" defensively)
  const publishedPages: MetadataRoute.Sitemap = contentData.categories
    .flatMap((category) => category.pages || [])
    .filter((page) => page.isPublished && page.href && page.href !== '/home') // exclude /home
    .map((page) => ({
      url: `${baseUrl}${page.href}`,
      lastModified: currentDate,
      changeFrequency: getChangeFrequency(page.type),
      priority: getPriority(page.type, page.href!),
    }));

  // Static routes: keep only canonical root, remove "/home"
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl, // canonical "/"
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Intentionally no "/home" to avoid duplicate homepage in sitemap.
  ];

  // Combine all routes
  const allRoutes = [...staticRoutes, ...categoryPages, ...publishedPages];

  // Additional defensive filter to ensure "/home" never slips through
  const filteredRoutes = allRoutes.filter((item) => !item.url.endsWith('/home'));

  // Deduplicate and return
  const uniqueRoutes = deduplicateRoutes(filteredRoutes);

  return uniqueRoutes;
}

/**
 * Determine change frequency based on page type
 */
function getChangeFrequency(
  pageType: string
): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  const frequencyMap: Record<string, MetadataRoute.Sitemap[number]['changeFrequency']> = {
    feature: 'monthly',
    blog: 'weekly',
    news: 'weekly',
    docs: 'monthly',
    staticPage: 'monthly',
  };

  return frequencyMap[pageType] || 'monthly';
}

/**
 * Calculate priority based on page type and path
 */
function getPriority(pageType: string, href: string): number {
  // Home page canonical rule: "/" is canonical; "/home" is excluded earlier
  if (href === '/') return 1.0;

  const priorityMap: Record<string, number> = {
    feature: 0.7,
    blog: 0.8,
    news: 0.6,
    docs: 0.7,
    staticPage: 0.6,
  };

  return priorityMap[pageType] || 0.5;
}

/**
 * Remove duplicate URLs keeping the highest priority entry
 */
function deduplicateRoutes(routes: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const urlMap = new Map<string, MetadataRoute.Sitemap[number]>();

  routes.forEach((route) => {
    const existing = urlMap.get(route.url);
    if (
      !existing ||
      (route.priority && existing.priority && route.priority > existing.priority)
    ) {
      urlMap.set(route.url, route);
    }
  });

  return Array.from(urlMap.values());
}
