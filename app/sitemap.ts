// app/sitemap.ts

import { MetadataRoute } from 'next';
import { contentData } from '@/config/content/content-data';
import { appConfig } from '@/config/app-config';

/**
 * Generate dynamic sitemap based on published pages in content-data.ts
 * 
 * This file is automatically discovered by Next.js and generates sitemap.xml
 * during build time. Only pages with isPublished: true are included.
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = appConfig.url;
  const currentDate = new Date();

  // Extract all published pages from content data
  const publishedPages = contentData.categories
    .flatMap((category) => category.pages)
    .filter((page) => page.isPublished)
    .map((page) => ({
      url: `${baseUrl}${page.href}`,
      lastModified: currentDate,
      changeFrequency: getChangeFrequency(page.type),
      priority: getPriority(page.type, page.href ?? "https://aifa.dev"),
    }));

  // Add static routes (if not already in content-data)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Combine and deduplicate routes
  const allRoutes = [...staticRoutes, ...publishedPages];
  const uniqueRoutes = deduplicateRoutes(allRoutes);

  return uniqueRoutes;
}

/**
 * Determine change frequency based on page type
 */
function getChangeFrequency(
  pageType: string
): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  const frequencyMap: Record<string, MetadataRoute.Sitemap[number]['changeFrequency']> = {
    homePage: 'daily',
    blogPost: 'weekly',
    product: 'weekly',
    documentation: 'monthly',
    staticPage: 'monthly',
  };

  return frequencyMap[pageType] || 'monthly';
}

/**
 * Calculate priority based on page type and path
 */
function getPriority(pageType: string, href: string): number {
  // Home page gets highest priority
  if (href === '/home' || href === '/') return 1.0;

  // Priority map by page type
  const priorityMap: Record<string, number> = {
    homePage: 1.0,
    blogPost: 0.8,
    product: 0.9,
    documentation: 0.7,
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
    
    if (!existing || (route.priority && existing.priority && route.priority > existing.priority)) {
      urlMap.set(route.url, route);
    }
  });

  return Array.from(urlMap.values());
}
