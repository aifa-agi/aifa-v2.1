// aifa-v2/next.config.mjs
import withPWAInit from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';
const isVercel = process.env.VERCEL === '1';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aifa.dev';

// PWA Configuration with optimized Workbox settings
const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDev,
  sw: 'sw.js',
  scope: '/',
  mode: isDev ? 'development' : 'production',
  reloadOnOnline: true,
  buildExcludes: [
    /middleware-manifest.json$/,
    /\.map$/,
    /manifest$/,
    /\.htaccess$/,
  ],
  publicExcludes: [
    '!.htaccess',
    '!web.config',
  ],
  workboxOptions: {
    disableDevLogs: !isDev,
    clientsClaim: true,
    skipWaiting: true,
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB limit
    cleanupOutdatedCaches: true,
  },
  runtimeCaching: [
    // Google Fonts - cache forever (immutable)
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-stylesheets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
        plugins: [
          {
            handlerDidError: async () => {
              return new Response('Offline - Font unavailable', {
                status: 503,
              });
            },
          },
        ],
      },
    },

    // Google Font files - cache forever
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },

    // Static images - cache for 30 days
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-images-cache',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },

    // Next.js static assets - cache for 24 hours
    {
      urlPattern: /\/_next\/static\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'next-static',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },

    // API routes - network first with fallback
    {
      urlPattern: /\/api\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        cacheableResponse: {
          statuses: [0, 200, 201, 202, 204],
        },
      },
    },

    // Vercel Blob storage - cache for 7 days
    {
      urlPattern: /^https:\/\/.*\.vercel-storage\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'vercel-blob-cache',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },

    // GitHub raw content - cache for 24 hours
    {
      urlPattern: /^https:\/\/raw\.githubusercontent\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'github-raw-cache',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
});

/**
 * Enhanced Content Security Policy
 * Provides strict security while supporting:
 * - Next.js with WebAssembly
 * - Stripe payment processing
 * - Google Analytics
 * - External fonts
 * - AI chat functionality
 */
const cspHeader = [
  "default-src 'self'",
  "script-src 'self' 'wasm-unsafe-eval' www.google-analytics.com www.googletagmanager.com cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
  "font-src 'self' fonts.gstatic.com data:",
  "img-src 'self' data: https: blob:",
  "media-src 'self' https: blob:",
  "connect-src 'self' https: wss: www.google-analytics.com www.googletagmanager.com api.stripe.com",
  "frame-src 'self' www.stripe.com js.stripe.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join('; ');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: cspHeader,
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://js.stripe.com")',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Expect-CT',
    value: 'max-age=86400, enforce',
  },
];

const cacheHeaders = [
  {
    source: '/public/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  {
    source: '/app-images/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  {
    source: '/_next/static/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  {
    source: '/_next/image/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  {
    source: '/api/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'no-store, must-revalidate',
      },
    ],
  },
  {
    source: '/sw.js',
    headers: [
      {
        key: 'Cache-Control',
        value: 'no-cache, no-store, must-revalidate',
      },
      {
        key: 'Content-Type',
        value: 'application/javascript; charset=utf-8',
      },
    ],
  },
  {
    source: '/manifest.webmanifest',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=3600',
      },
      {
        key: 'Content-Type',
        value: 'application/manifest+json; charset=utf-8',
      },
    ],
  },
  {
    source: '/robots.txt',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=86400',
      },
      {
        key: 'Content-Type',
        value: 'text/plain; charset=utf-8',
      },
    ],
  },
  {
    source: '/sitemap.xml',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=3600',
      },
      {
        key: 'Content-Type',
        value: 'application/xml; charset=utf-8',
      },
    ],
  },
];

export default withPWA({
  // Core optimization settings
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'aifa.dev',
      },
      {
        protocol: 'https',
        hostname: 'www.aifa.dev',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'self'; sandbox;",
  },

  // Headers with security and caching
  headers: async () => [
    {
      source: '/:path*',
      headers: securityHeaders,
    },
    ...cacheHeaders,
    {
      source: '/sitemap.xml',
      headers: [
        {
          key: 'Content-Type',
          value: 'application/xml; charset=utf-8',
        },
      ],
    },
    {
      source: '/feed.xml',
      headers: [
        {
          key: 'Content-Type',
          value: 'application/rss+xml; charset=utf-8',
        },
      ],
    },
  ],

  // Redirects
  redirects: async () => [
    {
      source: '/manifest.json',
      destination: '/manifest.webmanifest',
      permanent: true,
    },
    // Add multilingual redirects if needed
    {
      source: '/en/:path*',
      destination: '/:path*',
      permanent: false,
    },
  ],

  // Rewrites for API and internationalization
  rewrites: async () => ({
    beforeFiles: [
      // API rewrites
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ],
  }),

  // Webpack optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.runtimeChunk = 'single';
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            filename: 'chunks/vendor-[hash].js',
            test: /node_modules/,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          // Common chunk for shared dependencies
          common: {
            filename: 'chunks/common-[hash].js',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }
    return config;
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'clsx',
      'tailwind-merge',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
    ],
    serverMinification: true,
    staticGenerationRetryCount: 3,
    turbotrace: {
      logLevel: 'error',
      logAll: false,
    },
  },

  // TypeScript strict mode
  typescript: {
    strict: true,
    tsconfigPath: './tsconfig.json',
  },

  // ESLint configuration
  eslint: {
    dirs: ['app', 'lib', 'components', 'utils', 'config'],
    ignoreDuringBuilds: false,
  },

  // On-demand entries for better development experience
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  // Internationalization support
  i18n: {
    locales: ['en', 'ru', 'es'], // Add your supported locales
    defaultLocale: 'en',
    localeDetection: true,
  },

  // Trailing slashes configuration
  trailingSlash: false,

  // ETag generation
  generateEtags: true,

  // Vercel-specific configuration
  ...(isVercel && {
    swcMinify: true,
    productionBrowserSourceMaps: false,
  }),

  // Build optimization
  staticPageGenerationTimeout: 120,
  outputFileTracing: true,
});
