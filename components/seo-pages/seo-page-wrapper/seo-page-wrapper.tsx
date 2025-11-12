//components/pages/seo-page-wrapper/components/breadcrumbs-navigation.tsx

import React from 'react';
import { BreadcrumbsNavigation, type BreadcrumbItemType } from './components/breadcrumbs-navigation';
import { TechBadges, type BadgeItemType } from './components/tech-badges';
import { HeroSection, type HeroConfig } from './components/hero-section';
import { FAQSection, type FAQItem } from './components/faq-section';

/**
 * Configuration type for SEO Page Wrapper
 */
export type PageWrapperConfig = {
  // Spacing configuration
  topSpacing?: number; // in pixels, default: 80
  
  // Navigation
  breadcrumbs: BreadcrumbItemType[];
  
  // Badges/Pills
  badges?: BadgeItemType[];
  showBadges?: boolean; // default: true if badges exist
  
  // Hero section
  hero?: HeroConfig;
  showHero?: boolean; // default: true if hero exists
  
  // FAQ section
  faqs?: FAQItem[];
  showFaq?: boolean; // default: true if FAQs exist
  faqTitle?: string; // optional custom FAQ title
};

/**
 * Props for SeoPageWrapper component
 */
interface SeoPageWrapperProps {
  config: PageWrapperConfig;
  children: React.ReactNode;
}

/**
 * SeoPageWrapper Component
 * 
 * Main wrapper component for SEO-optimized pages.
 * Orchestrates breadcrumbs, badges, hero section, content, and FAQ.
 * Provides consistent layout and spacing across all SEO pages.
 * 
 * Features:
 * - Configurable top spacing
 * - Breadcrumb navigation
 * - Technology badges
 * - Responsive hero section
 * - Main content area
 * - FAQ section
 * 
 * @param config - Page wrapper configuration object
 * @param children - Main page content to render
 */
export function SeoPageWrapper({ config, children }: SeoPageWrapperProps) {
  const {
    topSpacing = 80,
    breadcrumbs,
    badges = [],
    showBadges = true,
    hero,
    showHero = true,
    faqs = [],
    showFaq = true,
    faqTitle,
  } = config;

  return (
    <div className="min-h-screen">
      
      {/* Top Spacing */}
      <div style={{ height: `${topSpacing}px` }} />

      {/* Breadcrumb Navigation */}
      <BreadcrumbsNavigation items={breadcrumbs} />

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        
        {/* Technology Badges/Pills */}
        <TechBadges badges={badges} show={showBadges} />
        
        {/* Hero Section */}
        {hero && <HeroSection config={hero} show={showHero} />}

        {/* Page Content (children) */}
        <section className="mb-12">
          {children}
        </section>

        {/* FAQ Section */}
        <FAQSection faqs={faqs} show={showFaq} title={faqTitle} />

      </main>
    </div>
  );
}

// Re-export types for convenience
export type { BreadcrumbItemType, BadgeItemType, HeroConfig, FAQItem };
