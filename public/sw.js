// Service Worker for Progressive Web App (PWA)
// Handles offline functionality, caching strategies, and push notifications

const CACHE_NAME = 'aifa-v2-cache-v1';
const RUNTIME_CACHE = 'aifa-v2-runtime-v1';
const ASSETS_CACHE = 'aifa-v2-assets-v1';

const STATIC_ASSETS = [
  '/',
  '/app-images/app-config-images/logo.png',
  '/app-images/app-config-images/icons/icon-192.png',
  '/app-images/app-config-images/icons/icon-512.png',
  '/app-images/app-config-images/og-image.jpg',
  '/app-images/app-config-images/loading-light.svg',
  '/app-images/app-config-images/loading-dark.svg',
];

const API_ROUTES = ['/api/'];
const OFFLINE_FALLBACK = '/';

/**
 * INSTALL EVENT
 * Cache static assets and critical resources
 */
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');

  event.waitUntil(
    (async () => {
      try {
        // Cache static assets
        const cache = await caches.open(ASSETS_CACHE);
        await cache.addAll(STATIC_ASSETS);
        console.log('[Service Worker] Static assets cached');

        // Skip waiting to activate immediately
        self.skipWaiting();
      } catch (error) {
        console.error('[Service Worker] Install failed:', error);
      }
    })()
  );
});

/**
 * ACTIVATE EVENT
 * Clean up old caches and claim clients
 */
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');

  event.waitUntil(
    (async () => {
      try {
        // Get all cache names
        const cacheNames = await caches.keys();

        // Delete old caches
        await Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE && name !== ASSETS_CACHE)
            .map((name) => {
              console.log('[Service Worker] Deleting old cache:', name);
              return caches.delete(name);
            })
        );

        // Claim all clients
        await self.clients.claim();
        console.log('[Service Worker] Clients claimed');
      } catch (error) {
        console.error('[Service Worker] Activate failed:', error);
      }
    })()
  );
});

/**
 * FETCH EVENT
 * Implement different caching strategies based on request type
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (!url.origin.includes(self.location.origin)) {
    return;
  }

  // Strategy 1: Cache-First for static assets
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Strategy 2: Network-First for dynamic content
  if (isPageRequest(request)) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Strategy 3: Network-First for API routes with offline fallback
  if (isApiRequest(url.pathname)) {
    event.respondWith(networkFirstWithFallback(request));
    return;
  }

  // Default: Network-First
  event.respondWith(networkFirst(request));
});

/**
 * CACHE-FIRST STRATEGY
 * Serve from cache, fallback to network
 * Best for: Static assets (images, CSS, JS, fonts)
 */
async function cacheFirst(request) {
  const cache = await caches.open(ASSETS_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    console.log('[Service Worker] Cache hit:', request.url);
    return cached;
  }

  try {
    const response = await fetch(request);

    // Cache successful responses
    if (response && response.status === 200) {
      const clonedResponse = response.clone();
      cache.put(request, clonedResponse);
    }

    return response;
  } catch (error) {
    console.error('[Service Worker] Fetch failed:', request.url, error);

    // Return offline fallback if available
    const fallback = await cache.match(OFFLINE_FALLBACK);
    return fallback || new Response('Offline - Resource not available', { status: 503 });
  }
}

/**
 * NETWORK-FIRST STRATEGY
 * Fetch from network, fallback to cache
 * Best for: HTML pages, dynamic content
 */
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const response = await fetch(request);

    // Cache successful responses
    if (response && response.status === 200) {
      const clonedResponse = response.clone();
      cache.put(request, clonedResponse);
    }

    return response;
  } catch (error) {
    console.log('[Service Worker] Network failed, using cache:', request.url);

    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }

    // Return offline fallback
    if (isPageRequest(request)) {
      const fallback = await cache.match(OFFLINE_FALLBACK);
      return fallback || new Response('Offline - Page not available', { status: 503 });
    }

    return new Response('Offline - Resource not available', { status: 503 });
  }
}

/**
 * NETWORK-FIRST WITH FALLBACK
 * For API routes: try network, cache as backup, show offline message
 */
async function networkFirstWithFallback(request) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const response = await fetch(request);

    // Cache successful responses
    if (response && response.status === 200) {
      const clonedResponse = response.clone();
      cache.put(request, clonedResponse);
    }

    return response;
  } catch (error) {
    console.log('[Service Worker] API offline:', request.url);

    // Try to return cached response
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }

    // Return offline JSON response
    return new Response(
      JSON.stringify({
        error: 'offline',
        message: 'You are currently offline. Some features may be limited.',
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

/**
 * STALE-WHILE-REVALIDATE STRATEGY
 * Serve from cache while fetching fresh data
 * Best for: Content that can be slightly outdated (search results, listings)
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request).then((response) => {
    // Cache successful responses
    if (response && response.status === 200) {
      const clonedResponse = response.clone();
      cache.put(request, clonedResponse);
    }
    return response;
  });

  return cached || fetchPromise;
}

/**
 * HELPER FUNCTIONS
 */

function isStaticAsset(pathname) {
  const staticExtensions = [
    '.js',
    '.css',
    '.woff2',
    '.woff',
    '.ttf',
    '.eot',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.svg',
    '.webp',
  ];

  return staticExtensions.some((ext) => pathname.endsWith(ext));
}

function isPageRequest(request) {
  return request.mode === 'navigate' && request.method === 'GET';
}

function isApiRequest(pathname) {
  return pathname.startsWith('/api/');
}

/**
 * MESSAGE EVENT
 * Handle messages from client pages
 */
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;

    case 'CLEAR_CACHE':
      clearAllCaches();
      break;

    case 'CACHE_URLS':
      cacheUrls(payload.urls);
      break;

    case 'GET_CACHE_SIZE':
      getCacheSize().then((size) => {
        event.ports[0].postMessage({ type: 'CACHE_SIZE', size });
      });
      break;

    default:
      console.warn('[Service Worker] Unknown message type:', type);
  }
});

/**
 * CACHE MANAGEMENT FUNCTIONS
 */

async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
    console.log('[Service Worker] All caches cleared');
  } catch (error) {
    console.error('[Service Worker] Error clearing caches:', error);
  }
}

async function cacheUrls(urls) {
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    await cache.addAll(urls);
    console.log('[Service Worker] URLs cached:', urls);
  } catch (error) {
    console.error('[Service Worker] Error caching URLs:', error);
  }
}

async function getCacheSize() {
  try {
    const cacheNames = await caches.keys();
    let totalSize = 0;

    for (const name of cacheNames) {
      const cache = await caches.open(name);
      const keys = await cache.keys();

      for (const request of keys) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          totalSize += blob.size;
        }
      }
    }

    return totalSize;
  } catch (error) {
    console.error('[Service Worker] Error getting cache size:', error);
    return 0;
  }
}

/**
 * PUSH NOTIFICATION HANDLER
 * Handle push notifications from server
 */
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const { title = 'AIFA', body = 'New notification', icon = '/app-images/app-config-images/icons/icon-192.png', badge = '/app-images/app-config-images/icons/icon-48.png' } = data;

  const options = {
    body,
    icon,
    badge,
    tag: 'aifa-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'open',
        title: 'Open',
      },
      {
        action: 'close',
        title: 'Close',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

/**
 * NOTIFICATION CLICK HANDLER
 * Handle user clicking on notifications
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Check if window already exists and focus it
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }

      // Otherwise, open new window
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

/**
 * BACKGROUND SYNC
 * Retry failed requests when connection is restored
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(retryFailedRequests());
  }
});

async function retryFailedRequests() {
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    const requests = await cache.keys();

    for (const request of requests) {
      try {
        const response = await fetch(request.clone());

        if (response && response.status === 200) {
          await cache.put(request, response);
          console.log('[Service Worker] Synced:', request.url);
        }
      } catch (error) {
        console.log('[Service Worker] Sync failed:', request.url);
      }
    }
  } catch (error) {
    console.error('[Service Worker] Background sync error:', error);
  }
}

/**
 * SERVICE WORKER LOGGING
 */
console.log('[Service Worker] Loaded successfully');
