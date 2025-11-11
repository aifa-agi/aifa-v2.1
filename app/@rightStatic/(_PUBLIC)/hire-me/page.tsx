// app/@rightStatic/(_PUBLIC)/hire-me/page.tsx
// Understanding (EN):
// - Configure per-page Metadata via constructMetadata with explicit values for title, description, image, pathname, locale, and contentType.
// - Use a single author photo for OG/Twitter and Person JSON-LD (/images/author-bolshiyanov.png).
// - The UI content is in English only; CTA logic remains inside the component.
// - Keep type 'website' for a landing/offer page; ensure canonical is correct for the route.

// References and best practices:
// - Next.js Metadata fields (title, description, openGraph, twitter, images, alt/size) [web:44][web:47]
// - OG image width/height and alt guidelines [web:50]
// - JSON-LD Person/sameAs best practices [web:57][web:60][web:48]

import HireMePageComponent from '@/components/pages/hire-me/hire-me-page-component';
import { constructMetadata, buildArticleSchema, getDefaultAuthorInfo } from '@/lib/construct-metadata';
import type { Metadata } from 'next';

// Route-specific metadata
export const metadata: Metadata = constructMetadata({
  title: 'Hire Roman Bolshiyanov — AI/Web3/Next Architect',
  description:
    'Architecture that extracts maximum value from AI and Web3 with SEO and AI-search focus — minimizing costs while maximizing outcomes. A technical partner, not just a developer.',
  image: '/images/author-bolshiyanov.png', // single author photo for OG/Twitter
  pathname: '/hire-me',
  locale: 'en',
  contentType: 'website',
  noIndex: false,
  noFollow: false,
  author: {
    name: 'Roman Bolshiyanov (Armstrong)',
    email: 'bolshiyanov@gmail.com',
    url: 'https://t.me/bolshiyanov',
    image: '/images/author-bolshiyanov.png',
    bio: 'AI/Web3/Next Architect delivering business-ready solutions that orchestrate frontend, backend, and go-to-market.',
    jobTitle: 'AI/Web3/Next Architect',
    twitter: undefined, // add if you want X/Twitter card to show creator
    linkedin: 'roman-bolshiyanov', // full URL also acceptable: https://www.linkedin.com/in/roman-bolshiyanov
    facebook: undefined,
  },
});

export default function Page() {
  return <HireMePageComponent />;
}
