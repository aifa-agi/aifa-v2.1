// /lib/construct-metadata.ts

import { appConfig, getOgImagePath } from '@/config/app-config';
import type { Metadata } from 'next';
import type { ContentType, AuthorConfig } from '@/config/app-config';

export type { AuthorConfig } from '@/config/app-config';

type ConstructArgs = {
  title?: string;
  description?: string;
  image?: string;
  pathname?: string;
  locale?: string;
  contentType?: ContentType;
  noIndex?: boolean;
  noFollow?: boolean;
  author?: AuthorConfig;
};

type IconConfig = {
  url: string;
  rel?: string;
  sizes?: string;
  type?: string;
};

type JsonLdSchema = Record<string, unknown>;

type OpenGraphType = 'website' | 'article' | undefined;

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

const getDefaultAuthor = (): AuthorConfig => {
  return {
    name: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_NAME || appConfig.short_name,
    email: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_EMAIL,
    twitter: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_TWITTER,
    linkedin: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_LINKEDIN,
    facebook: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_FACEBOOK,
    bio: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_BIO,
    image: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_IMAGE,
    url: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_URL,
    jobTitle: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_JOB_TITLE,
  };
};

const CACHED_ICONS = (() => {
  const icons: IconConfig[] = [];

  const iconConfigs = [
    {
      path: appConfig.icons?.faviconAny,
      rel: 'icon',
      sizes: 'any',
      type: 'image/x-icon',
    },
    {
      path: appConfig.icons?.icon32,
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      path: appConfig.icons?.icon48,
      rel: 'icon',
      sizes: '48x48',
      type: 'image/png',
    },
    {
      path: appConfig.icons?.icon192,
      rel: 'icon',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      path: appConfig.icons?.icon512,
      rel: 'icon',
      sizes: '512x512',
      type: 'image/png',
    },
    {
      path: appConfig.icons?.appleTouch,
      rel: 'apple-touch-icon',
      sizes: '180x180',
      type: 'image/png',
    },
  ];

  iconConfigs.forEach(({ path, rel, sizes, type }) => {
    const url = buildIconUrl(path);
    if (url) {
      icons.push(buildIconConfig(url, { rel, sizes, type }));
    }
  });

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

const normalizeOpenGraphType = (contentType: ContentType): OpenGraphType => {
  if (contentType === 'article' || contentType === 'blog') {
    return 'article';
  }
  return 'website';
};

const resolveContentType = (explicitType?: ContentType): ContentType => {
  if (explicitType) {
    return explicitType;
  }

  const configType = appConfig.og?.type;
  if (configType && ['website', 'article', 'blog', 'product', 'documentation'].includes(configType)) {
    return configType as ContentType;
  }

  return 'website';
};

const buildSocialUrls = (author: AuthorConfig): string[] => {
  const urls: string[] = [];

  if (author.twitter) {
    const handle = author.twitter.startsWith('@')
      ? author.twitter.slice(1)
      : author.twitter;
    if (!author.twitter.startsWith('http')) {
      urls.push(`https://twitter.com/${handle}`);
    } else {
      urls.push(author.twitter);
    }
  }

  if (author.linkedin) {
    if (author.linkedin.startsWith('http')) {
      urls.push(author.linkedin);
    } else {
      urls.push(`https://linkedin.com/in/${author.linkedin}`);
    }
  }

  if (author.facebook) {
    if (author.facebook.startsWith('http')) {
      urls.push(author.facebook);
    } else {
      urls.push(`https://facebook.com/${author.facebook}`);
    }
  }

  if (author.url && !urls.includes(author.url)) {
    urls.push(author.url);
  }

  return urls.filter((url, index, array) => array.indexOf(url) === index);
};

const buildPersonSchema = (author: AuthorConfig): JsonLdSchema => {
  const person: JsonLdSchema = {
    '@type': 'Person',
    name: author.name,
  };

  if (author.url) person.url = author.url;
  if (author.email) person.email = author.email;
  if (author.image) person.image = author.image;
  if (author.bio) person.description = author.bio;
  if (author.jobTitle) person.jobTitle = author.jobTitle;

  const sameAsUrls = buildSocialUrls(author);
  if (sameAsUrls.length > 0) {
    person.sameAs = sameAsUrls;
  }

  return person;
};

const buildOrganizationSchema = (): JsonLdSchema => {
  const socialUrls: string[] = [];

  if (appConfig.seo?.social?.twitter) {
    const twitterUrl = appConfig.seo.social.twitter.startsWith('http')
      ? appConfig.seo.social.twitter
      : `https://twitter.com/${appConfig.seo.social.twitter.replace('@', '')}`;
    socialUrls.push(twitterUrl);
  }

  if (appConfig.seo?.social?.github) {
    socialUrls.push(appConfig.seo.social.github);
  }

  if (appConfig.seo?.social?.linkedin) {
    const linkedinUrl = appConfig.seo.social.linkedin.startsWith('http')
      ? appConfig.seo.social.linkedin
      : `https://linkedin.com/company/${appConfig.seo.social.linkedin}`;
    socialUrls.push(linkedinUrl);
  }

  if (appConfig.seo?.social?.facebook) {
    const facebookUrl = appConfig.seo.social.facebook.startsWith('http')
      ? appConfig.seo.social.facebook
      : `https://facebook.com/${appConfig.seo.social.facebook}`;
    socialUrls.push(facebookUrl);
  }

  const schema: JsonLdSchema = {
    '@type': 'Organization',
    name: appConfig.short_name,
    url: appConfig.url,
    logo: new URL(appConfig.logo, appConfig.url).toString(),
    description: appConfig.description,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: appConfig.mailSupport,
    },
  };

  if (socialUrls.length > 0) {
    schema.sameAs = socialUrls;
  }

  return schema;
};

export function constructMetadata({
  title = appConfig.name,
  description = appConfig.description,
  image = getOgImagePath(),
  pathname,
  locale = (appConfig.seo?.defaultLocale as string) ?? appConfig.lang,
  contentType,
  noIndex = false,
  noFollow = false,
  author,
}: ConstructArgs = {}): Metadata {
  const base = appConfig.seo?.canonicalBase ?? appConfig.url;
  const path = normalizePath(pathname);
  const canonical = new URL(path, base).toString();
  const validDescription = truncateDescription(description);

  const verification: Record<string, string> = {};
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION?.trim();
  const yandexVerification = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION?.trim();

  if (googleVerification && googleVerification.length > 0) {
    verification.google = googleVerification;
  }
  if (yandexVerification && yandexVerification.length > 0) {
    verification.yandex = yandexVerification;
  }

  const titleTemplate =
    appConfig.pageDefaults?.titleTemplate || '%s | AIFA';

  const resolvedContentType = resolveContentType(contentType);
  const openGraphType = normalizeOpenGraphType(resolvedContentType);

  const otherMeta: Record<string, string> = {
    'content-type': resolvedContentType,
  };

  const metadata: Metadata = {
    title: {
      default: title,
      template: titleTemplate,
    },
    description: validDescription,
    metadataBase: new URL(appConfig.url),
    alternates: { canonical },
    manifest: appConfig.manifest,
    icons: CACHED_ICONS,
    creator: appConfig.short_name,
    publisher: appConfig.short_name,
    authors: author
      ? [
          {
            name: author.name,
            url: author.url,
          },
        ]
      : [
          {
            name: getDefaultAuthor().name,
            url: getDefaultAuthor().url,
          },
        ],
    openGraph: {
      type: openGraphType,
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
      site: appConfig.seo?.social?.twitter,
    },
    robots: {
      index: !noIndex && (appConfig.pageDefaults?.robotsIndex ?? true),
      follow: !noFollow && (appConfig.pageDefaults?.robotsFollow ?? true),
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    other: otherMeta,
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
  author: AuthorConfig | AuthorConfig[];
  image?: string;
  description?: string;
}): JsonLdSchema {
  const authorSchema = Array.isArray(author)
    ? author.map((a) => buildPersonSchema(a))
    : buildPersonSchema(author);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
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
  url,
}: {
  name: string;
  description?: string;
  price: number;
  currency: string;
  rating?: number;
  reviewCount?: number;
  image?: string;
  brand?: string;
  url?: string;
}): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    ...(description && { description }),
    ...(url && { url }),
    ...(image && { image }),
    ...(brand && { brand: { '@type': 'Brand', name: brand } }),
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      url: url,
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

export function buildCollectionSchema({
  name,
  description,
  image,
  itemListElement,
}: {
  name: string;
  description?: string;
  image?: string;
  itemListElement: Array<{ name: string; url: string; image?: string }>;
}): JsonLdSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    ...(description && { description }),
    ...(image && { image }),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: itemListElement.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: new URL(item.url, appConfig.url).toString(),
        ...(item.image && { image: item.image }),
      })),
    },
  };
}

export function buildOrganizationSchemaWithDefaults(): JsonLdSchema {
  return buildOrganizationSchema();
}

export function getDefaultAuthorInfo(): AuthorConfig {
  return getDefaultAuthor();
}
