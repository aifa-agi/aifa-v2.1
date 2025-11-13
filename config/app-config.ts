//config/app-config.ts
import { SupportedLanguage } from './translations.config';

const getSiteUrl = (): string => {
  if (typeof window === 'undefined') {
    return (
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://aifa.dev')
    );
  }
  return window.location.origin;
};

const SITE_URL = getSiteUrl();

export type OpenGraphTypeConfig =
  | 'website'
  | 'article'
  | 'blog'
  | 'product'
  | 'documentation'
  | 'profile'
  | 'video.other';

export type ContentType = 'website' | 'article' | 'blog' | 'product' | 'documentation';

export interface AuthorConfig {
  name: string;
  email?: string;
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  url?: string;
  jobTitle?: string;
  bio?: string;
  image?: string;
}

export interface SocialConfig {
  twitter?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
}

export interface ContentTypeDefaults {
  blog: ContentType;
  product: ContentType;
  documentation: ContentType;
}

const getDefaultAuthorConfig = (): AuthorConfig => {
  return {
    name: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_NAME || process.env.NEXT_PUBLIC_APP_NAME || 'AIFA',
    email: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_EMAIL || 'bolshiyanov@gmail.com',
    twitter: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_TWITTER || 'https://x.com/aifa_agi',
    linkedin: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_LINKEDIN,
    facebook: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_FACEBOOK,
    bio: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_BIO,
    image: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_IMAGE,
    url: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_URL,
    jobTitle: process.env.NEXT_PUBLIC_DEFAULT_AUTHOR_JOB_TITLE,
  };
};

const getSocialConfig = (): SocialConfig => {
  return {
    twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@aifa_agi',
    github: process.env.NEXT_PUBLIC_GITHUB_URL ,  
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/bolshiyanov',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  };
};

const getContentTypeDefaults = (): ContentTypeDefaults => {
  return {
    blog: (process.env.NEXT_PUBLIC_BLOG_CONTENT_TYPE as ContentType) || 'blog',
    product: (process.env.NEXT_PUBLIC_PRODUCT_CONTENT_TYPE as ContentType) || 'product',
    documentation: (process.env.NEXT_PUBLIC_DOC_CONTENT_TYPE as ContentType) || 'documentation',
  };
};

export const appConfig: AppConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'AIFA',
  short_name: process.env.NEXT_PUBLIC_APP_SHORT_NAME || 'AIFA',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || '',
  url: SITE_URL,
  manifest: '/manifest.webmanifest',

  lang: (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as SupportedLanguage) || 'en',
  mailSupport: process.env.NEXT_PUBLIC_MAIL_SUPPORT || 'support@aifa.dev',
  chatBrand: process.env.NEXT_PUBLIC_CHAT_BRAND || 'ChatGPT',

  images: {
  ogImage: {
    path: '/app-config-images/og-image.jpg',
    format: 'jpeg',
    uploadedAt: '2025-10-16T18:48:01.446Z',
  },
  'loading-dark': {
    path: '/app-config-images/loading-dark.png',
    format: 'svg',
    uploadedAt: '2025-10-16T18:48:01.446Z',
  },
  'loading-light': {
    path: '/app-config-images/loading-light.png',
    format: 'svg',
    uploadedAt: '2025-10-16T18:48:01.446Z',
  },
  'notFound-dark': {
    path: '/app-config-images/not-found-dark.png',
    format: 'png',
    uploadedAt: '2025-10-16T18:48:01.446Z',
  },
  'notFound-light': {
    path: '/app-config-images/not-found-light.png',
    format: 'png',
    uploadedAt: '2025-10-16T18:48:01.446Z',
  },
  'error500-dark': {
    path: '/app-config-images/error500-dark.png',
    format: 'svg',
    uploadedAt: '2025-10-16T18:48:01.446Z',
  },
  'error500-light': {
    path: '/app-config-images/error500-light.png',
    format: 'svg',
    uploadedAt: '2025-10-16T18:48:01.446Z',
  },
  'homePage-dark': {
    path: '/app-config-images/homepage-dark.png',
    format: 'png',
    uploadedAt: '2025-10-16T18:48:01.446Z',
  },
  'homePage-light': {
    path: '/app-config-images/homepage-light.png',
    format: 'png',
    uploadedAt: '2025-10-16T18:48:01.446Z',
  },
  'chatbot-dark': {
    path: '/app-config-images/chatbot-dark.png',
    format: 'png',
    uploadedAt: '2025-10-16T18:48:01.446Z',
  },
  'chatbot-light': {
    path: '/app-config-images/chatbot-light.png',
    format: 'png',
    uploadedAt: '2025-10-16T18:48:01.446Z',
  },
},

logo: '/app-config-images/logo.png',

icons: {
  faviconAny: '/favicon.ico',
  icon32: '/app-config-images/icons/icon-32.png',
  icon48: '/app-config-images/icons/icon-48.png',
  icon192: '/app-config-images/icons/icon-192.png',
  icon512: '/app-config-images/icons/icon-512.png',
  icon512Maskable: '/app-config-images/icons/icon-512-maskable.png', // ← НОВОЕ
  appleTouch: '/app-config-images/icons/apple-touch-icon.png',
},


  pwa: {
    themeColor: process.env.NEXT_PUBLIC_PWA_THEME_COLOR || '#ffffff',
    backgroundColor: process.env.NEXT_PUBLIC_PWA_BACKGROUND_COLOR || '#ffffff',
    startUrl: '/',
    display: 'standalone',
    scope: '/',
    orientation: 'portrait-primary',
  },

  seo: {
    indexing: (process.env.NEXT_PUBLIC_SEO_INDEXING as 'allow' | 'disallow') || 'allow',
    sitemapUrl: `${SITE_URL}/sitemap.xml`,
    disallowPaths: [
      '/admin',
      '/admin/*',
      '/auth',
      '/auth/*',
      '/login',
      '/register',
      '/chat',
      '/chat/*',
      '/api',
      '/api/*',
      '/_next',
      '/_next/*',
    ],
    canonicalBase: SITE_URL,
    locales: ['en', 'es', 'de', 'fr', 'it', 'ru'],
    defaultLocale: (process.env.NEXT_PUBLIC_DEFAULT_LOCALE as SupportedLanguage) || 'en',
    social: getSocialConfig(),
  },

  og: {
    type: (process.env.NEXT_PUBLIC_OG_TYPE as OpenGraphTypeConfig) || 'website',
    locale: process.env.NEXT_PUBLIC_OG_LOCALE || 'en_US',
    siteName: process.env.NEXT_PUBLIC_APP_NAME || 'AIFA',
    imageWidth: parseInt(process.env.NEXT_PUBLIC_OG_IMAGE_WIDTH || '1200', 10),
    imageHeight: parseInt(process.env.NEXT_PUBLIC_OG_IMAGE_HEIGHT || '630', 10),
  },

  pageDefaults: {
    titleTemplate: `%s | ${process.env.NEXT_PUBLIC_APP_NAME || 'AIFA'}`,
    robotsIndex: process.env.NEXT_PUBLIC_ROBOTS_INDEX !== 'false',
    robotsFollow: process.env.NEXT_PUBLIC_ROBOTS_FOLLOW !== 'false',
  },

  author: getDefaultAuthorConfig(),

  contentTypeDefaults: getContentTypeDefaults(),

  messages: {
    loading: {
      title: 'Loading...',
      subtitle: 'Please wait',
    },
  },
};

export type ImageFormat = 'png' | 'jpg' | 'jpeg' | 'webp' | 'avif' | 'svg' | 'gif';

export type RegularImageType =
  | 'ogImage'
  | 'loading-dark'
  | 'loading-light'
  | 'notFound-dark'
  | 'notFound-light'
  | 'error500-dark'
  | 'error500-light'
  | 'homePage-dark'
  | 'homePage-light'
  | 'chatbot-dark'
  | 'chatbot-light';

  export const META_THEME_COLORS = {
  light: process.env.NEXT_PUBLICTHEME_COLORS_LIGHT || "#ffffff",
  dark: process.env.NEXT_PUBLIC_THEME_COLORS_DARK || "#09090b",
}
export type AllImageTypes = RegularImageType | 'logo';

export interface ImageMetadata {
  path: string;
  format: ImageFormat;
  uploadedAt: string;
  size?: number;
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface AppConfig {
  name: string;
  short_name: string;
  description: string;
  url: string;
  manifest: string;
  mailSupport: string;
  lang: SupportedLanguage;
  chatBrand: string;
  images: Record<RegularImageType, ImageMetadata>;
  logo: string;

  icons: {
    faviconAny?: string;
    icon32?: string;
    icon48?: string;
    icon192: string;
    icon512: string;
    icon512Maskable?: string; 
    appleTouch?: string;
  };

  pwa: {
    themeColor: string;
    backgroundColor: string;
    startUrl: string;
    display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
    scope?: string;
    orientation?: 'any' | 'portrait-primary' | 'landscape-primary';
  };

  seo: {
    indexing: 'allow' | 'disallow';
    sitemapUrl?: string;
    disallowPaths?: string[];
    canonicalBase?: string;
    locales?: string[];
    defaultLocale?: string;
    social?: SocialConfig;
  };

  og?: {
    type?: OpenGraphTypeConfig;
    locale?: string;
    siteName?: string;
    imageWidth?: number;
    imageHeight?: number;
  };

  pageDefaults?: {
    titleTemplate?: string;
    robotsIndex?: boolean;
    robotsFollow?: boolean;
  };

  author?: AuthorConfig;

  contentTypeDefaults?: ContentTypeDefaults;

  messages?: {
    loading?: {
      title?: string;
      subtitle?: string;
    };
  };
}

export function getImagePath(imageType: RegularImageType): string {
  const metadata = appConfig.images[imageType];
  if (!metadata?.path) {
    return `/app-config-images/${imageType}.svg`;
  }
  return metadata.path;
}

export function getImageFormat(imageType: RegularImageType): ImageFormat {
  const metadata = appConfig.images[imageType];
  return metadata?.format || 'svg';
}

export function getLogoPath(): string {
  return appConfig.logo;
}

export function getOgImagePath(): string {
  return getImagePath('ogImage');
}

export function getLoadingIllustration(theme: 'dark' | 'light'): string {
  const imageType: RegularImageType =
    theme === 'dark' ? 'loading-dark' : 'loading-light';
  return getImagePath(imageType);
}

export function getStartChatIllustration(): string {
  return appConfig.logo;
}

export function getErrorIllustration(
  errorType: '404' | '500',
  theme: 'dark' | 'light'
): string {
  let imageType: RegularImageType;

  if (errorType === '404') {
    imageType = theme === 'dark' ? 'notFound-dark' : 'notFound-light';
  } else {
    imageType = theme === 'dark' ? 'error500-dark' : 'error500-light';
  }

  return getImagePath(imageType);
}

export function getHomePageIllustration(theme: 'dark' | 'light'): string {
  const imageType: RegularImageType =
    theme === 'dark' ? 'homePage-dark' : 'homePage-light';
  return getImagePath(imageType);
}

export function getChatbotIllustration(theme: 'dark' | 'light'): string {
  const imageType: RegularImageType =
    theme === 'dark' ? 'chatbot-dark' : 'chatbot-light';
  return getImagePath(imageType);
}

export function getImageMetadata(imageType: RegularImageType): ImageMetadata | null {
  return appConfig.images[imageType] || null;
}

export function hasImageMetadata(imageType: RegularImageType): boolean {
  return !!appConfig.images[imageType]?.path;
}

export function getUploadedImageTypes(): RegularImageType[] {
  return (Object.keys(appConfig.images) as RegularImageType[]).filter(
    (key) => appConfig.images[key]?.path
  );
}

export function getImageUploadDate(imageType: RegularImageType): string | null {
  return appConfig.images[imageType]?.uploadedAt || null;
}

export function getAuthorConfig(): AuthorConfig {
  return appConfig.author || getDefaultAuthorConfig();
}

export function getContentTypeForSection(section: 'blog' | 'product' | 'documentation'): ContentType {
  return appConfig.contentTypeDefaults?.[section] || section;
}

export function getSocialUrls(): Record<string, string | undefined> {
  const social = appConfig.seo?.social;
  if (!social) return {};

  return {
    twitter: social.twitter
      ? social.twitter.startsWith('http')
        ? social.twitter
        : `https://twitter.com/${social.twitter.replace('@', '')}`
      : undefined,
    github: social.github,
    linkedin: social.linkedin
      ? social.linkedin.startsWith('http')
        ? social.linkedin
        : `https://linkedin.com/company/${social.linkedin}`
      : undefined,
    facebook: social.facebook
      ? social.facebook.startsWith('http')
        ? social.facebook
        : `https://facebook.com/${social.facebook}`
      : undefined,
  };
}
