// app/sitemap.ts

import { MetadataRoute } from 'next';
import { contentData } from '@/config/content/content-data';
import { appConfig } from '@/config/app-config';

/**
 * Generate dynamic sitemap based on published pages in content-data.ts
 * 
 * This file is automatically discovered by Next.js and generates sitemap.xml
 * during build time. Includes both category pages and their published child pages.
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = appConfig.url;
  const currentDate = new Date();

  // Extract category pages (e.g., /features, /examples)
  const categoryPages: MetadataRoute.Sitemap = contentData.categories
    .filter((category) => category.href) // Only categories with href
    .map((category) => ({
      url: `${baseUrl}${category.href}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8, // Category pages get high priority
    }));

  // Extract all published child pages from categories
  const publishedPages: MetadataRoute.Sitemap = contentData.categories
    .flatMap((category) => category.pages || [])
    .filter((page) => page.isPublished && page.href)
    .map((page) => ({
      url: `${baseUrl}${page.href}`,
      lastModified: currentDate,
      changeFrequency: getChangeFrequency(page.type),
      priority: getPriority(page.type, page.href!),
    }));

  // Add static routes (homepage and other root pages)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/home`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Combine all routes: static + categories + pages
  const allRoutes = [...staticRoutes, ...categoryPages, ...publishedPages];
  
  // Deduplicate and return
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
  // Home page gets highest priority
  if (href === '/home' || href === '/') return 1.0;

  // Priority map by page type
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
    
    // Keep entry with higher priority or the new one if priorities are equal
    if (!existing || (route.priority && existing.priority && route.priority > existing.priority)) {
      urlMap.set(route.url, route);
    }
  });

  return Array.from(urlMap.values());
}
