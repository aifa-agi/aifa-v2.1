// aifa-v2/lib/construct-metadata.ts

import { appConfig, getOgImagePath } from '@/config/app-config';
import type { Metadata } from 'next';

export type AuthorInfo = {
  name: string;
  email?: string;
  twitter?: string;
  url?: string;
  jobTitle?: string;
  bio?: string;
  image?: string;
  sameAs?: string[];
};

type ConstructArgs = {
  title?: string;
  description?: string;
  image?: string;
  pathname?: string;
  locale?: string;
  noIndex?: boolean;
  noFollow?: boolean;
};

type IconConfig = {
  url: string;
  rel?: string;
  sizes?: string;
  type?: string;
};

type JsonLdSchema = Record<string, unknown>;

const MAX_DESCRIPTION_LENGTH = 160;

const buildIconUrl = (path?: string): string | null => {
  if (!path || typeof path !== 'string' || path.length === 0) {
    return null;
  }
  return path.startsWith('/') ? path : `/${path}`;
};

const buildIconConfig = (
  url: string,
  options: { rel?: string; sizes?: string; type?: string } = {}
): IconConfig => ({
  url,
  ...options,
});

const CACHED_ICONS = (() => {
  const icons: IconConfig[] = [];

  const faviconAny = buildIconUrl(appConfig.icons?.faviconAny);
  if (faviconAny) {
    icons.push(
      buildIconConfig(faviconAny, {
        rel: 'icon',
        sizes: 'any',
        type: 'image/x-icon',
      })
    );
  }

  const icon32 = buildIconUrl(appConfig.icons?.icon32);
  if (icon32) {
    icons.push(
      buildIconConfig(icon32, {
        type: 'image/png',
        sizes: '32x32',
        rel: 'icon',
      })
    );
  }

  const icon48 = buildIconUrl(appConfig.icons?.icon48);
  if (icon48) {
    icons.push(
      buildIconConfig(icon48, {
        type: 'image/png',
        sizes: '48x48',
        rel: 'icon',
      })
    );
  }

  const icon192 = buildIconUrl(appConfig.icons?.icon192);
  if (icon192) {
    icons.push(
      buildIconConfig(icon192, {
        type: 'image/png',
        sizes: '192x192',
        rel: 'icon',
      })
    );
  }

  const icon512 = buildIconUrl(appConfig.icons?.icon512);
  if (icon512) {
    icons.push(
      buildIconConfig(icon512, {
        type: 'image/png',
        sizes: '512x512',
        rel: 'icon',
      })
    );
  }

  const appleTouch = buildIconUrl(appConfig.icons?.appleTouch);
  if (appleTouch) {
    icons.push(
      buildIconConfig(appleTouch, {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        type: 'image/png',
      })
    );
  }

  return icons as NonNullable<Metadata['icons']>;
})();

const normalizePath = (p?: string): string => {
  if (!p) return '/';
  let s = String(p).trim();
  if (!s.startsWith('/')) s = `/${s}`;
  while (s.includes('//')) s = s.replace('//', '/');
  return s;
};

const truncateDescription = (
  desc: string,
  maxLength: number = MAX_DESCRIPTION_LENGTH
): string => {
  if (desc.length <= maxLength) return desc;
  return desc.substring(0, maxLength - 3) + '...';
};

const buildPersonSchema = (author: AuthorInfo): JsonLdSchema => {
  const person: JsonLdSchema = {
    '@type': 'Person',
    name: author.name,
  };

  if (author.url) person.url = author.url;
  if (author.email) person.email = author.email;
  if (author.image) person.image = author.image;
  if (author.bio) person.description = author.bio;
  if (author.jobTitle) person.jobTitle = author.jobTitle;

  const sameAsUrls: string[] = [];
  if (author.sameAs) sameAsUrls.push(...author.sameAs);
  if (author.twitter) {
    const handle = author.twitter.startsWith('@')
      ? author.twitter.slice(1)
      : author.twitter;
    if (!author.twitter.startsWith('http')) {
      sameAsUrls.push(`https://twitter.com/${handle}`);
    }
  }
  if (sameAsUrls.length > 0) person.sameAs = sameAsUrls;

  return person;
};

const buildOrganizationSchema = (): JsonLdSchema => ({
  '@type': 'Organization',
  name: appConfig.short_name,
  url: appConfig.url,
  logo: new URL(appConfig.logo, appConfig.url).toString(),
  description: appConfig.description,
  ...(appConfig.seo?.social && {
    sameAs: [
      appConfig.seo.social.twitter
        ? appConfig.seo.social.twitter.startsWith('http')
          ? appConfig.seo.social.twitter
          : `https://twitter.com/${appConfig.seo.social.twitter.replace('@', '')}`
        : null,
      appConfig.seo.social.github,
      appConfig.seo.social.linkedin,
    ].filter(Boolean),
  }),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: appConfig.mailSupport,
  },
});

export function constructMetadata({
  title = appConfig.name,
  description = appConfig.description,
  image = getOgImagePath(),
  pathname,
  locale = (appConfig.seo?.defaultLocale as string) ?? appConfig.lang,
  noIndex = false,
  noFollow = false,
}: ConstructArgs = {}): Metadata {
  const base = appConfig.seo?.canonicalBase ?? appConfig.url;
  const path = normalizePath(pathname);
  const canonical = new URL(path, base).toString();
  const validDescription = truncateDescription(description);

  const verification: Record<string, string> = {};
  
  if (process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION?.trim()) {
    verification.google = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION;
  }
  if (process.env.NEXT_PUBLIC_YANDEX_VERIFICATION?.trim()) {
    verification.yandex = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;
  }

  const metadata: Metadata = {
    title: {
      default: title,
      template: appConfig.pageDefaults?.titleTemplate || '%s | AIFA',
    },
    description: validDescription,
    metadataBase: new URL(appConfig.url),
    alternates: { canonical },
    manifest: appConfig.manifest,
    icons: CACHED_ICONS,
    creator: appConfig.short_name,
    publisher: appConfig.short_name,
    openGraph: {
      type: (appConfig.og?.type as any) ?? 'website',
      title,
      description: validDescription,
      url: canonical,
      siteName: appConfig.og?.siteName ?? appConfig.name,
      images: [
        {
          url: image,
          width: appConfig.og?.imageWidth ?? 1200,
          height: appConfig.og?.imageHeight ?? 630,
          alt: validDescription,
        },
      ],
      locale: appConfig.og?.locale ?? locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: validDescription,
      images: [image],
      creator: appConfig.seo?.social?.twitter,
    },
    robots: {
      index: !noIndex && (appConfig.pageDefaults?.robotsIndex ?? true),
      follow: !noFollow && (appConfig.pageDefaults?.robotsFollow ?? true),
    },
    ...(Object.keys(verification).length > 0 && { verification }),
  };

  return metadata;
}

export function buildArticleSchema({
  headline,
  datePublished,
  dateModified,
  author,
  image,
  description,
}: {
  headline: string;
  datePublished: string;
  dateModified?: string;
  author: AuthorInfo | AuthorInfo[];
  image?: string;
  description?: string;
}): JsonLdSchema {
  const authorSchema = Array.isArray(author)
    ? author.map((a) => buildPersonSchema(a))
    : buildPersonSchema(author);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    datePublished,
    dateModified: dateModified || datePublished,
    author: authorSchema,
    publisher: buildOrganizationSchema(),
    ...(description && { description }),
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image,
      },
    }),
  };
}

export function buildFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildProductSchema({
  name,
  description,
  price,
  currency,
  rating,
  reviewCount,
  image,
  brand,
}: {
  name: string;
  description?: string;
  price: number;
  currency: string;
  rating?: number;
  reviewCount?: number;
  image?: string;
  brand?: string;
}): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    ...(description && { description }),
    ...(image && { image }),
    ...(brand && { brand: { '@type': 'Brand', name: brand } }),
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
    },
    ...(rating &&
      reviewCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: rating,
          reviewCount,
        },
      }),
  };
}

export function buildBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.url, appConfig.url).toString(),
    })),
  };
}

export function buildOrganizationSchemaWithDefaults(): JsonLdSchema {
  return buildOrganizationSchema();
}
