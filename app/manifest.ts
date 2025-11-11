//app/manifest.ts

import { appConfig } from '@/config/app-config';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const icons: MetadataRoute.Manifest['icons'] = [];

  // Icon 32x32
  if (appConfig.icons?.icon32) {
    icons.push({
      src: appConfig.icons.icon32,
      sizes: '32x32',
      type: 'image/png',
      purpose: 'any',
    });
  }

  // Icon 48x48
  if (appConfig.icons?.icon48) {
    icons.push({
      src: appConfig.icons.icon48,
      sizes: '48x48',
      type: 'image/png',
      purpose: 'any',
    });
  }

  // Icon 192x192
  if (appConfig.icons?.icon192) {
    icons.push({
      src: appConfig.icons.icon192,
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    });
  }

  // Icon 512x512 (Regular)
  if (appConfig.icons?.icon512) {
    icons.push({
      src: appConfig.icons.icon512,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    });
  }

  // Icon 512x512 (Maskable - for adaptive icons on Android)
  if (appConfig.icons?.icon512Maskable) {
    icons.push({
      src: appConfig.icons.icon512Maskable,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    });
  }

  return {
    name: appConfig.name,
    short_name: appConfig.short_name,
    description: appConfig.description,
    start_url: appConfig.pwa.startUrl,
    scope: appConfig.pwa.scope,
    display: appConfig.pwa.display,
    orientation: appConfig.pwa.orientation,
    theme_color: appConfig.pwa.themeColor,
    background_color: appConfig.pwa.backgroundColor,
    icons,
    categories: ['productivity', 'utilities'],
    screenshots: [
      {
        src: '/app-config-images/og-image.jpg',
        sizes: '1200x630',
        type: 'image/jpeg',
        form_factor: 'wide',
      },
      {
        src: '/app-config-images/og-image.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
        form_factor: 'narrow',
      },
    ],
    shortcuts: [
      {
        name: 'Chat',
        short_name: 'Chat',
        description: 'Start a new chat session',
        url: '/chat',
        icons: [
          {
            src: appConfig.icons?.icon192,
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
      {
        name: 'Documentation',
        short_name: 'Docs',
        description: 'View documentation',
        url: '/docs',
        icons: [
          {
            src: appConfig.icons?.icon192,
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
    ],
  };
}
