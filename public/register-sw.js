// /public/register-sw.js

// Service Worker Registration - Static JavaScript
// Pure vanilla JS, no dependencies, works without other scripts
// Falls back gracefully when Service Workers are not supported

(function() {
  'use strict';

  // Check if Service Workers are supported
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
    console.info('[SW] Service Workers not supported');
    return;
  }

  // Main registration function
  function registerServiceWorker() {
    if (navigator.serviceWorker.controller) {
      console.info('[SW] Already registered');
      return;
    }

    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(function(registration) {
        console.log('[SW] ✓ Registered:', registration.scope);

        // Update check every hour
        const updateInterval = 3600000; // 1 hour
        setInterval(function() {
          registration.update();
        }, updateInterval);

        // Check for updates on page focus
        if (document.hidden === false) {
          registration.update();
        }
        document.addEventListener('visibilitychange', function() {
          if (!document.hidden) {
            registration.update();
          }
        });
      })
      .catch(function(error) {
        console.warn('[SW] ✗ Registration failed:', error.message);
      });
  }

  // Register when DOM is ready
  if (document.readyState === 'loading') {
    // Page is still loading
    document.addEventListener('DOMContentLoaded', registerServiceWorker);
  } else if (document.readyState === 'interactive') {
    // DOM is ready, but resources still loading
    registerServiceWorker();
  } else {
    // Page and all resources loaded
    window.addEventListener('load', registerServiceWorker);
  }
})();
