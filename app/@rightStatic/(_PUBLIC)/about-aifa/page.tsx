// aapp/@rightStatic/(_PUBLIC)/about-aifa/page.tsx

import AboutAifaPageComponent from '@/components/pages/about-aifa/about-aifa-page-component';
import { constructMetadata } from '@/lib/construct-metadata';
import type { Metadata } from 'next';

/**
 * Page-level static metadata constructed via shared helper.
 * Important: use only ConstructArgs fields: title, description, image, pathname, locale, contentType, noIndex, noFollow, author.
 * Canonical and OG/Twitter are derived inside constructMetadata from pathname, image, etc.
 */
export const metadata: Metadata = constructMetadata({
  // Title and description used both for SEO and OG/Twitter inside the helper
  title: 'About AIFA — AI-first Next.js Architecture',
  description:
    'AIFA is an AI-first, enterprise-grade Next.js starter built on parallel and intercepting routes with a two-pane layout (left: auth/AI chat, right: static+dynamic). Multi-language, role-based access, external API. Fractal architecture coming Q4 2025.',
  // OG/Twitter image. Helper maps it to openGraph.images and twitter.images
  image: '/og/aifa-about.png',
  // Critical: this drives canonical and openGraph.url inside helper
  pathname: '/about-aifa',
  // Optional: locale and content type influence openGraph.type/locale
  locale: 'en',
  contentType: 'website', // or 'article' if you want og:type=article

});

export default function Page() {
  return <AboutAifaPageComponent />;
}
