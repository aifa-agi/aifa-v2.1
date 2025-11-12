// components/seo/seo-page-wrapper.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';

/**
 * Type definitions for SEO Page Wrapper
 */
export type FAQItem = {
  question: string;
  answer: string;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type BadgeItem = {
  text: string;
};

export type HeroImages = {
  mobile: string; // horizontal 16:9
  desktop: string; // vertical 9:16 (xl to 2xl)
  desktopLarge: string; // square 1:1 (2xl+)
  alt: string;
};

export type AuthorInfo = {
  name: string;
  role: string;
  avatar: string;
};

export type CTAButtons = {
  primary: {
    text: string;
    href: string;
  };
  secondary: {
    text: string;
    href: string;
  };
};

export type PageWrapperConfig = {
  // Spacing configuration
  topSpacing?: number; // in pixels, default: 80
  
  // Navigation
  breadcrumbs: BreadcrumbItem[];
  
  // Badges/Pills
  badges?: BadgeItem[];
  showBadges?: boolean; // default: true if badges exist
  
  // Hero section
  hero?: {
    title: string;
    subtitle: string;
    images: HeroImages;
    author: AuthorInfo;
    cta: CTAButtons;
  };
  showHero?: boolean; // default: true if hero exists
  
  // FAQ section
  faqs: FAQItem[];
  showFaq?: boolean; // default: true
};

/**
 * Badge/Pill component for technology tags
 */
interface BadgeProps {
  text: string;
}

function Badge({ text }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {text}
    </span>
  );
}

/**
 * Props for SeoPageWrapper component
 */
interface SeoPageWrapperProps {
  config: PageWrapperConfig;
  children: React.ReactNode;
}

export function SeoPageWrapper({ config, children }: SeoPageWrapperProps) {
  const {
    topSpacing = 80,
    breadcrumbs,
    badges = [],
    showBadges = true,
    hero,
    showHero = true,
    faqs,
    showFaq = true,
  } = config;

  return (
    <div className="min-h-screen">
      
      {/* Top Spacing */}
      <div style={{ height: `${topSpacing}px` }} />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={item.path || index}>
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 ? (
                      <BreadcrumbPage>{item.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.path || '/'}>{item.name}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        
        {/* Technology Badges/Pills */}
        {showBadges && badges.length > 0 && (
          <div className="flex justify-center flex-wrap gap-2 px-4 mb-8 max-h-[4.75rem] overflow-hidden">
            {badges.map((badge, index) => (
              <Badge key={index} text={badge.text} />
            ))}
          </div>
        )}

        {/* Hero Section */}
        {showHero && hero && (
          <section className="grid items-center gap-8 xl:grid-cols-2 px-4 mb-12" aria-labelledby="hero-title">
            <div className="space-y-5">
              <h1
                id="hero-title"
                className="text-2xl font-bold leading-tight tracking-[-0.02em] text-foreground sm:text-4xl"
              >
                {hero.title}
              </h1>

              <p className="text-base text-muted-foreground sm:text-lg">
                {hero.subtitle}
              </p>

              {/* Mobile image (horizontal) */}
              <div className="relative block xl:hidden">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
                  <div className="relative h-full w-full flex items-center justify-center">
                    <Image
                      src={hero.images.mobile}
                      alt={hero.images.alt}
                      width={800}
                      height={600}
                      className="h-full w-full object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border">
                  <Image
                    src={hero.author.avatar}
                    alt={hero.author.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {hero.author.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {hero.author.role}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 xl:flex-row">
                <Link
                  href={hero.cta.primary.href}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                >
                  {hero.cta.primary.text}
                </Link>
                <Link
                  href={hero.cta.secondary.href}
                  className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hero.cta.secondary.text}
                </Link>
              </div>
            </div>

            {/* Photo on desktop */}
            <div className="hidden xl:block">
              {/* 2xl+ screens: square aspect */}
              <div className="relative hidden 2xl:block">
                <div className="aspect-[1/1] w-full overflow-hidden rounded-lg">
                  <div className="relative h-full w-full flex items-center justify-center">
                    <Image
                      src={hero.images.desktopLarge}
                      alt={hero.images.alt}
                      width={800}
                      height={600}
                      className="h-full w-full object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* xl to 2xl screens: vertical aspect */}
              <div className="relative block 2xl:hidden">
                <div className="aspect-[9/16] w-full overflow-hidden rounded-lg">
                  <div className="relative h-full w-full flex items-center justify-center">
                    <Image
                      src={hero.images.desktop}
                      alt={hero.images.alt}
                      width={800}
                      height={600}
                      className="h-full w-full object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Page Content (children) */}
        <section className="mb-12">
          {children}
        </section>

        {/* FAQ Section */}
        {showFaq && faqs.length > 0 && (
          <section className="mb-12" aria-labelledby="faq-section">
            <h2 id="faq-section" className="text-3xl font-bold tracking-tight mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
