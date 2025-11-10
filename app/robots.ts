//app/robots.ts

import type { MetadataRoute } from 'next';
import { appConfig } from '@/config/app-config';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

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
        userAgent: 'AdsBot-Google-Mobile',
        allow: '/',
      },
      {
        userAgent: 'MJ12bot',
        crawlDelay: 2,
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: disallowPaths,
        crawlDelay: 1,
      },
      {
        userAgent: 'Slurp',
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
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
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
 * ROBOTS.TXT CONFIGURATION GUIDE
 *
 * SEARCH ENGINES:
 * - Googlebot: No crawl delay (uses crawl budget optimization)
 * - Bingbot: 1 second delay
 * - Yandexbot: 1 second delay (Russia, CIS markets)
 * - DuckDuckBot: 1 second delay
 * - Slurp (Yahoo): 1 second delay
 * - Baiduspider: 1 second delay (Baidu, Chinese search)
 *
 * ADVERTISING & SOCIAL:
 * - AdsBot-Google: No restrictions (required for Google Ads)
 * - facebookexternalhit: Allowed (for URL preview scraping)
 * - Twitterbot: Allowed (for tweet preview cards)
 * - LinkedInBot: Allowed (for LinkedIn preview cards)
 *
 * SEO & ANALYSIS:
 * - MJ12bot: 2 second delay (SEO analysis bot)
 *
 * AI TRAINING BOTS (Allowed by default):
 * - GPTBot (OpenAI/ChatGPT)
 * - CCBot (Common Crawl)
 * - anthropic-ai (Anthropic/Claude)
 * - Claude-Web (Claude Web)
 * - PerplexityBot (Perplexity AI)
 * - omgilibot, omgili (Various AI training)
 *
 * ALL OTHER BOTS:
 * - Catch-all rule (*): 1 second delay
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
 * NOTE:
 * - crawlDelay is in seconds (supported by Bing, Yandex, Yahoo, Baidu)
 * - Google doesn't support crawlDelay; manage crawl rate in Google Search Console
 * - disallowPaths come from appConfig.seo.disallowPaths
 * - More specific rules take precedence over general ones
 * - Query parameters can be added to disallowPaths (e.g., '/?s=*')
 */
