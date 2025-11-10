//lib/seo-generators.ts

import { appConfig, type AuthorConfig, type ContentType } from '@/config/app-config';

export type JsonLdType =
  | 'WebSite'
  | 'Organization'
  | 'Person'
  | 'Article'
  | 'BlogPosting'
  | 'NewsArticle'
  | 'Product'
  | 'FAQPage'
  | 'BreadcrumbList'
  | 'CollectionPage'
  | 'ImageObject'
  | 'VideoObject';

export interface JsonLdBase {
  '@context': 'https://schema.org';
  '@type': JsonLdType;
  [key: string]: unknown;
}

export interface WebSiteSchema extends JsonLdBase {
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
  inLanguage?: string | string[];
  potentialAction?: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

export interface OrganizationSchema extends JsonLdBase {
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    '@type': 'ContactPoint';
    contactType: string;
    email: string;
    availableLanguage?: string[];
  };
}

export interface PersonSchema extends JsonLdBase {
  '@type': 'Person';
  name: string;
  url?: string;
  email?: string;
  image?: string;
  description?: string;
  jobTitle?: string;
  sameAs?: string[];
}

export interface ArticleSchema extends JsonLdBase {
  '@type': 'Article' | 'BlogPosting' | 'NewsArticle';
  headline: string;
  datePublished: string;
  dateModified?: string;
  author: PersonSchema | PersonSchema[];
  publisher: OrganizationSchema;
  description?: string;
  image?: string | { '@type': 'ImageObject'; url: string };
  articleBody?: string;
  wordCount?: number;
  inLanguage?: string;
}

export interface ProductSchema extends JsonLdBase {
  '@type': 'Product';
  name: string;
  description?: string;
  image?: string;
  brand?: {
    '@type': 'Brand';
    name: string;
  };
  offers: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
    availability: string;
    url?: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
  };
}

export interface FAQSchema extends JsonLdBase {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface BreadcrumbSchema extends JsonLdBase {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface CollectionSchema extends JsonLdBase {
  '@type': 'CollectionPage';
  name: string;
  description?: string;
  image?: string;
  mainEntity: {
    '@type': 'ItemList';
    itemListElement: Array<{
      '@type': 'ListItem';
      position: number;
      name: string;
      url: string;
      image?: string;
    }>;
  };
}

const buildSocialUrls = (author: AuthorConfig): string[] => {
  const urls: string[] = [];

  if (author.twitter) {
    const handle = author.twitter.startsWith('@') ? author.twitter.slice(1) : author.twitter;
    urls.push(author.twitter.startsWith('http') ? author.twitter : `https://twitter.com/${handle}`);
  }

  if (author.linkedin) {
    urls.push(author.linkedin.startsWith('http') ? author.linkedin : `https://linkedin.com/in/${author.linkedin}`);
  }

  if (author.facebook) {
    urls.push(author.facebook.startsWith('http') ? author.facebook : `https://facebook.com/${author.facebook}`);
  }

  if (author.url && !urls.includes(author.url)) {
    urls.push(author.url);
  }

  return urls.filter((url, index, array) => array.indexOf(url) === index);
};

const buildOrganizationSameAs = (): string[] => {
  const urls: string[] = [];

  if (appConfig.seo?.social?.twitter) {
    const url = appConfig.seo.social.twitter.startsWith('http')
      ? appConfig.seo.social.twitter
      : `https://twitter.com/${appConfig.seo.social.twitter.replace('@', '')}`;
    urls.push(url);
  }

  if (appConfig.seo?.social?.github) {
    urls.push(appConfig.seo.social.github);
  }

  if (appConfig.seo?.social?.linkedin) {
    const url = appConfig.seo.social.linkedin.startsWith('http')
      ? appConfig.seo.social.linkedin
      : `https://linkedin.com/company/${appConfig.seo.social.linkedin}`;
    urls.push(url);
  }

  if (appConfig.seo?.social?.facebook) {
    const url = appConfig.seo.social.facebook.startsWith('http')
      ? appConfig.seo.social.facebook
      : `https://facebook.com/${appConfig.seo.social.facebook}`;
    urls.push(url);
  }

  return urls.filter((url, index, array) => array.indexOf(url) === index);
};

export function generateWebSiteSchema(
  searchEnabled: boolean = true
): WebSiteSchema {
  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: appConfig.name,
    url: appConfig.url,
    description: appConfig.description,
    inLanguage: appConfig.seo?.locales || [appConfig.lang],
  };

  if (searchEnabled) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${appConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    };
  }

  return schema;
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: appConfig.short_name,
    url: appConfig.url,
    logo: new URL(appConfig.logo, appConfig.url).toString(),
    description: appConfig.description,
    sameAs: buildOrganizationSameAs(),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: appConfig.mailSupport,
      availableLanguage: appConfig.seo?.locales,
    },
  };
}

export function generatePersonSchema(author: AuthorConfig): PersonSchema {
  const schema: PersonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
  };

  if (author.url) schema.url = author.url;
  if (author.email) schema.email = author.email;
  if (author.image) schema.image = author.image;
  if (author.bio) schema.description = author.bio;
  if (author.jobTitle) schema.jobTitle = author.jobTitle;

  const sameAsUrls = buildSocialUrls(author);
  if (sameAsUrls.length > 0) {
    schema.sameAs = sameAsUrls;
  }

  return schema;
}

export function generateArticleSchema(
  options: {
    headline: string;
    datePublished: string;
    dateModified?: string;
    author: AuthorConfig | AuthorConfig[];
    description?: string;
    image?: string;
    articleBody?: string;
    wordCount?: number;
    type?: 'article' | 'blog' | 'news';
  },
  contentType?: ContentType
): ArticleSchema {
  const type = options.type || (contentType === 'blog' ? 'blog' : 'article');
  const articleType = type === 'blog' ? 'BlogPosting' : type === 'news' ? 'NewsArticle' : 'Article';

  const authorSchema = Array.isArray(options.author)
    ? options.author.map((a) => generatePersonSchema(a))
    : generatePersonSchema(options.author);

  const schema: ArticleSchema = {
    '@context': 'https://schema.org',
    '@type': articleType,
    headline: options.headline,
    datePublished: options.datePublished,
    dateModified: options.dateModified || options.datePublished,
    author: authorSchema,
    publisher: generateOrganizationSchema(),
    inLanguage: appConfig.lang,
  };

  if (options.description) schema.description = options.description;
  if (options.image) {
    schema.image = options.image.startsWith('http')
      ? options.image
      : `${appConfig.url}${options.image}`;
  }
  if (options.articleBody) schema.articleBody = options.articleBody;
  if (options.wordCount) schema.wordCount = options.wordCount;

  return schema;
}

export function generateProductSchema(
  options: {
    name: string;
    description?: string;
    price: number;
    currency: string;
    image?: string;
    brand?: string;
    url?: string;
    rating?: number;
    reviewCount?: number;
  }
): ProductSchema {
  // Build offers first (required field)
  const offers = {
    '@type': 'Offer' as const,
    price: options.price.toFixed(2),
    priceCurrency: options.currency,
    availability: 'https://schema.org/InStock',
    ...(options.url && {
      url: options.url.startsWith('http') ? options.url : `${appConfig.url}${options.url}`,
    }),
  };

  // Build aggregateRating if provided
  const aggregateRating = options.rating && options.reviewCount
    ? {
        '@type': 'AggregateRating' as const,
        ratingValue: options.rating,
        reviewCount: options.reviewCount,
      }
    : undefined;

  // Build brand if provided
  const brand = options.brand
    ? {
        '@type': 'Brand' as const,
        name: options.brand,
      }
    : undefined;

  // Build image if provided
  const image = options.image
    ? options.image.startsWith('http')
      ? options.image
      : `${appConfig.url}${options.image}`
    : undefined;

  // Now create schema with all required fields
  const schema: ProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: options.name,
    offers,
  };

  // Add optional fields
  if (options.description) schema.description = options.description;
  if (image) schema.image = image;
  if (brand) schema.brand = brand;
  if (aggregateRating) schema.aggregateRating = aggregateRating;

  return schema;
}


export function generateFAQSchema(
  faqs: Array<{
    question: string;
    answer: string;
  }>
): FAQSchema {
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

export function generateBreadcrumbSchema(
  breadcrumbs: Array<{
    name: string;
    url: string;
  }>
): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${appConfig.url}${item.url}`,
    })),
  };
}

export function generateCollectionSchema(
  options: {
    name: string;
    description?: string;
    image?: string;
    items: Array<{
      name: string;
      url: string;
      image?: string;
    }>;
  }
): CollectionSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: options.name,
    ...(options.description && { description: options.description }),
    ...(options.image && {
      image: options.image.startsWith('http') ? options.image : `${appConfig.url}${options.image}`,
    }),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: options.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url.startsWith('http') ? item.url : `${appConfig.url}${item.url}`,
        ...(item.image && {
          image: item.image.startsWith('http') ? item.image : `${appConfig.url}${item.image}`,
        }),
      })),
    },
  };
}

export function generateSEOScript(schema: JsonLdBase): string {
  return JSON.stringify(schema);
}

export function generateMultipleSEOScripts(schemas: JsonLdBase[]): string[] {
  return schemas.map((schema) => generateSEOScript(schema));
}

export function validateSchema(schema: JsonLdBase): boolean {
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    console.error('Invalid schema: missing or incorrect @context');
    return false;
  }

  if (!schema['@type']) {
    console.error('Invalid schema: missing @type');
    return false;
  }

  return true;
}

export function mergeSchemas(...schemas: JsonLdBase[]): JsonLdBase[] {
  return schemas.filter((schema) => validateSchema(schema));
}
