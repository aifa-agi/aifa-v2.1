//components/pwa-install-prompt.tsx
'use client';

import { useEffect, useState } from 'react';
import { X, Download, Bell } from 'lucide-react';
import { appConfig } from '@/config/app-config';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallPromptProps {
  dismissDuration?: number; // milliseconds to hide after dismiss
}

export function PWAInstallPrompt({ dismissDuration = 86400000 }: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');

  useEffect(() => {
    // Set primary color from CSS variables
    const color = 'primary' 
    setPrimaryColor(color);

    // Detect platform
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroidDevice = /Android/.test(userAgent);

    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check localStorage for dismiss timestamp
    const lastDismissed = localStorage.getItem('pwa-install-dismissed');
    if (lastDismissed) {
      const dismissedTime = parseInt(lastDismissed, 10);
      const now = Date.now();

      if (now - dismissedTime < dismissDuration) {
        return;
      }
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBadge(true); // Show badge instead of full prompt
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('[PWA] App installed successfully');
      setIsInstalled(true);
      setShowPrompt(false);
      setShowBadge(false);
      localStorage.removeItem('pwa-install-dismissed');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Listen for display mode changes
    const mediaQueryList = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsInstalled(true);
        setShowPrompt(false);
        setShowBadge(false);
      }
    };

    mediaQueryList.addEventListener('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQueryList.removeEventListener('change', handleDisplayModeChange);
    };
  }, [dismissDuration]);

  const handleBadgeClick = () => {
    setShowPrompt(true);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('[PWA] Installation accepted');
        setShowPrompt(false);
        setShowBadge(false);
      } else {
        console.log('[PWA] Installation dismissed by user');
        handleDismiss();
      }

      setDeferredPrompt(null);
    } catch (error) {
      console.error('[PWA] Installation failed:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  const handleIOSInstall = () => {
    alert(
      `To install ${appConfig.name}:\n\n1. Tap the Share button\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add"`
    );
  };

  // Don't render if app is already installed
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* Badge - Non-intrusive trigger button */}
      {showBadge && !showPrompt && (
        <button
          onClick={handleBadgeClick}
          className={`
            fixed bottom-10 right-6 z-40
            w-14 h-14 rounded-full
            flex items-center justify-center
            shadow-lg cursor-pointer
            transition-all duration-300
            hover:scale-110 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-offset-2
            animate-pulse hover:animate-none
          `}
          style={{
            backgroundColor: primaryColor,
            color: 'white',
            boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15)`,
          }}
          role="button"
          aria-label="Install app"
          title="Install app"
        >
          <Download className="w-6 h-6" />
        </button>
      )}

      {/* Full Install Prompt - Shows on badge click */}
      {showPrompt && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40 animate-fade-in"
            onClick={handleDismiss}
            aria-hidden="true"
          />

          {/* Prompt Container */}
          <div
            className={`
              fixed bottom-6 right-6 z-50
              max-w-sm w-full
              animate-in slide-in-from-bottom-4
              sm:max-w-md
            `}
            role="dialog"
            aria-labelledby="pwa-install-title"
            aria-describedby="pwa-install-description"
          >
            <div
              className="bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              style={{
                borderTopColor: primaryColor,
                borderTopWidth: '3px',
              }}
            >
              {/* Header */}
              <div
                className="px-6 py-4 text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Download className="w-5 h-5" />
                  <h2 id="pwa-install-title" className="text-lg font-semibold">
                    {isIOS ? 'Add to Home Screen' : `Install ${appConfig.short_name}`}
                  </h2>
                </div>
                <p id="pwa-install-description" className="text-sm opacity-90">
                  {isIOS
                    ? 'Get quick access to the app from your home screen'
                    : `Get ${appConfig.short_name} on your device for offline access`}
                </p>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <Bell className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
                    Offline support
                  </li>
                  <li className="flex items-center gap-2">
                    <Bell className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
                    App-like experience
                  </li>
                  <li className="flex items-center gap-2">
                    <Bell className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
                    Push notifications
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 flex gap-3">
                <button
                  onClick={handleDismiss}
                  className={`
                    flex-1 px-4 py-2 rounded-md font-medium transition-colors
                    text-slate-700 dark:text-slate-300
                    hover:bg-slate-200 dark:hover:bg-slate-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                  `}
                  style={{ outlineColor: primaryColor }}
                  aria-label="Dismiss installation prompt"
                >
                  Not now
                </button>
                <button
                  onClick={isIOS ? handleIOSInstall : handleInstall}
                  className={`
                    flex-1 px-4 py-2 rounded-md font-medium transition-all
                    text-white
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    active:scale-95
                  `}
                  style={{
                    backgroundColor: primaryColor,
                    outlineColor: primaryColor,
                  }}
                  aria-label={isIOS ? 'Add to Home Screen' : 'Install app'}
                >
                  {isIOS ? 'Add' : 'Install'}
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className={`
                  absolute top-3 right-3
                  p-1 rounded-md text-slate-400 hover:text-slate-600
                  dark:hover:text-slate-300 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                `}
                style={{ outlineColor: primaryColor }}
                aria-label="Close installation prompt"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
