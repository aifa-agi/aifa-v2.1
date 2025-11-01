// aifa-v2/app/robots.ts

import type { MetadataRoute } from 'next';
import { appConfig } from '@/config/app-config';

export const dynamic = 'force-static';
export const revalidate = 86400;

export default function robots(): MetadataRoute.Robots {
  const baseUrl = appConfig.seo?.canonicalBase ?? appConfig.url;
  const isDisallowAll = appConfig.seo?.indexing === 'disallow';

  if (isDisallowAll) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      sitemap: appConfig.seo?.sitemapUrl,
      host: baseUrl,
    };
  }

  const disallowPaths = appConfig.seo?.disallowPaths ?? [];

  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 1,
      },
      {
        userAgent: 'Yandexbot',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 1,
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
      {
        userAgent: 'MJ12bot',
        crawlDelay: 2,
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 1,
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 1,
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 1,
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 1,
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 1,
      },
      {
        userAgent: 'omgilibot',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 1,
      },
      {
        userAgent: 'omgili',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 1,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'Slurp',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 1,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 1,
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 1,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 1,
      },
    ],
    sitemap: appConfig.seo?.sitemapUrl,
    host: baseUrl,
  };
}

/*
 * SEARCH ENGINE & AI CRAWLERS CONFIGURATION
 * 
 * Current Bot Rules:
 * 
 * Googlebot: No crawl delay (maximum crawling speed)
 * Bingbot: 1 second delay
 * Yandexbot: 1 second delay (Russia, CIS markets)
 * AdsBot-Google: No restrictions (required for Google Ads)
 * MJ12bot: 2 second delay (SEO analysis tool)
 * 
 * AI TRAINING BOTS (All Allow by Default):
 * - GPTBot (OpenAI/ChatGPT)
 * - CCBot (Common Crawl)
 * - anthropic-ai (Anthropic/Claude)
 * - Claude-Web (Claude Web)
 * - PerplexityBot (Perplexity AI)
 * - omgilibot, omgili (Various AI training)
 * - Slurp (Yahoo)
 * - DuckDuckBot (DuckDuckGo)
 * - Baiduspider (Baidu/Chinese search)
 * 
 * TO BLOCK SPECIFIC AI BOTS:
 * Replace allow: '/' with disallow: '/'
 * 
 * Example to block ChatGPT:
 * {
 *   userAgent: 'GPTBot',
 *   disallow: '/',
 * }
 * 
 * TO BLOCK ALL AI BOTS:
 * {
 *   userAgent: ['GPTBot', 'CCBot', 'anthropic-ai', 'Claude-Web', 'PerplexityBot', 'omgilibot', 'omgili'],
 *   disallow: '/',
 * }
 * 
 * Note: crawlDelay is specified in seconds.
 * Some bots may not respect crawlDelay,
 * use rate limiting in next.config.mjs if needed.
 */
