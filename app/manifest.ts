// aifa-v2/app/manifest.ts

import type { MetadataRoute } from 'next';
import { appConfig } from '@/config/app-config';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default function manifest(): MetadataRoute.Manifest {
  const icons: MetadataRoute.Manifest['icons'] = [];

  if (appConfig.icons?.icon32) {
    icons.push({
      src: appConfig.icons.icon32,
      sizes: '32x32',
      type: 'image/png',
      purpose: 'any',
    });
  }

  if (appConfig.icons?.icon48) {
    icons.push({
      src: appConfig.icons.icon48,
      sizes: '48x48',
      type: 'image/png',
      purpose: 'any',
    });
  }

  if (appConfig.icons?.icon192) {
    icons.push({
      src: appConfig.icons.icon192,
      sizes: '192x192',
      type: 'image/png',
      purpose: 'maskable',
    });
  }

  if (appConfig.icons?.icon512) {
    icons.push({
      src: appConfig.icons.icon512,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    });
  }

  if (appConfig.icons?.appleTouch) {
    icons.push({
      src: appConfig.icons.appleTouch,
      sizes: '180x180',
      type: 'image/png',
      purpose: 'any',
    });
  }

  const screenshots: MetadataRoute.Manifest['screenshots'] = [];

  if (process.env.NEXT_PUBLIC_PWA_SCREENSHOT_MOBILE) {
    screenshots.push({
      src: process.env.NEXT_PUBLIC_PWA_SCREENSHOT_MOBILE,
      sizes: '540x720',
      type: 'image/png',
      form_factor: 'narrow',
    });
  }

  if (process.env.NEXT_PUBLIC_PWA_SCREENSHOT_DESKTOP) {
    screenshots.push({
      src: process.env.NEXT_PUBLIC_PWA_SCREENSHOT_DESKTOP,
      sizes: '1280x720',
      type: 'image/png',
      form_factor: 'wide',
    });
  }

  return {
    name: appConfig.name.trim(),
    short_name: appConfig.short_name.trim(),
    description: appConfig.description,
    start_url: appConfig.pwa.startUrl,
    scope: appConfig.pwa.scope,
    display: appConfig.pwa.display,
    orientation: appConfig.pwa.orientation,
    background_color: appConfig.pwa.backgroundColor,
    theme_color: appConfig.pwa.themeColor,
    icons,
    categories: [
      'productivity',
      'business',
      'utilities',
    ],
    screenshots: screenshots.length > 0 ? screenshots : undefined,
    prefer_related_applications: false,
    shortcuts: [
      {
        name: 'New Chat',
        short_name: 'Chat',
        description: 'Start a new chat session',
        url: '/chat?utm_source=pwa_shortcut',
        icons: [
          {
            src: appConfig.icons?.icon192,
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    ],
  };
}
