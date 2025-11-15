//app/@rightStatic/(_PUBLIC)/(_FEATURES)/(_components)/features-page-component.tsx

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { contentData } from '@/config/content-data';
import type { PageData } from '@/types/page-types';
import type { MenuCategory } from '@/types/menu-types';

// ============================================================================
// DATA EXTRACTION FROM CONFIG
// ============================================================================

/**
 * Extract features data from content config
 * Finds the "Features" section and filters published pages
 */
function getFeaturesData() {
  // Check if contentData has categories property or is array directly
  const categories: MenuCategory[] = Array.isArray(contentData)
    ? contentData
    : contentData.categories || [];

  // Find Features section in content data
  const featuresSection = categories.find(
    (section: MenuCategory) => section.title === 'Features' || section.href === '/features'
  );

  if (!featuresSection || !featuresSection.pages) {
    return [];
  }

  // Filter only published pages and sort by order
  const publishedPages = featuresSection.pages
    .filter((page: PageData) => page.isPublished === true)
    .sort((a: PageData, b: PageData) => (a.order || 0) - (b.order || 0));

  // Map to simplified structure for component
  return publishedPages.map((page: PageData) => ({
    id: page.id,
    href: page.href || '#',
    title: page.title || 'Untitled',
    description: page.description || '',
    hasBadge: page.hasBadge || false,
    order: page.order || 0,
  }));
}

// ============================================================================
// TYPE FOR COMPONENT
// ============================================================================

type FeatureCard = {
  id: string;
  href: string;
  title: string;
  description: string;
  hasBadge: boolean;
  order: number;
};

// ============================================================================
// BADGE COMPONENT
// ============================================================================

function NewBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
      Featured
    </span>
  );
}

// ============================================================================
// FEATURES PAGE COMPONENT
// ============================================================================

/**
 * Features Page Component
 * 
 * Note: Hero, Breadcrumbs, and Badges are handled by SeoPageWrapper
 * This component displays a grid of feature cards dynamically loaded from config
 */
export default function FeaturesPageComponent() {
  // Get features data from central config
  const featuresData: FeatureCard[] = getFeaturesData();

  // Handle empty state
  if (featuresData.length === 0) {
    return (
      <section className="mb-12" aria-labelledby="no-features">
        <Card className="p-6 text-center">
          <h2 id="no-features" className="text-lg font-semibold text-foreground mb-2">
            No features available
          </h2>
          <p className="text-sm text-muted-foreground">
            Features content will appear here once configured in content-data.ts
          </p>
        </Card>
      </section>
    );
  }

  return (
    <>
      {/* Features Grid Section */}
      <section id="features-list" className="mb-12" aria-labelledby="features-heading">
        <div className="mb-6">
          <h2 id="features-heading" className="text-2xl font-semibold text-foreground mb-2">
            All Features
          </h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive collection of {featuresData.length} advanced features covering routing, SEO, performance, and modern web development patterns.
          </p>
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {featuresData.map((feature: FeatureCard, index: number) => (
            <Card key={feature.id} className="flex flex-col">
              <CardHeader className="flex-1">
                {/* Первая строка с кругом и порядковым номером */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Круг с номером */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center">
                    <span className="text-xl font-semibold text-foreground">
                      {index + 1}
                    </span>
                  </div>

                  {/* Заголовок и бейдж */}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-lg font-medium leading-tight">
                        {feature.title}
                      </CardTitle>
                      {feature.hasBadge && <NewBadge />}
                    </div>
                  </div>
                </div>

                <CardDescription className="text-sm text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button asChild variant="ghost" size="sm" className="group">
                  <Link href={feature.href}>
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

      </section>

      {/* CTA Section */}
      <section className="mb-12" aria-labelledby="cta-section">
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Ready to start building?
              </h3>
              <p className="text-sm text-muted-foreground">
                Get the AIFA starter template and explore all these features in action with production-ready code.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <Link href="https://github.com/aifa-agi/aifa-v2.1" target="_blank" rel="noopener noreferrer">
                  Get Starter
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
