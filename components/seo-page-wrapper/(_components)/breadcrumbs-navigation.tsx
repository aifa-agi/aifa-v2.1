//components/seo-page-wrapper/(_components)/breadcrumbs-navigation.tsx
import React from 'react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

/**
 * Type definition for breadcrumb item
 */
export type BreadcrumbItemType = {
  name: string;
  path: string;
};

/**
 * Props for BreadcrumbsNavigation component
 */
interface BreadcrumbsNavigationProps {
  items: BreadcrumbItemType[];
}

/**
 * BreadcrumbsNavigation Component
 * 
 * Displays hierarchical navigation path with shadcn/ui breadcrumb component.
 * Supports dynamic items with proper accessibility and SEO markup.
 * 
 * @param items - Array of breadcrumb items with name and path
 */
export function BreadcrumbsNavigation({ items }: BreadcrumbsNavigationProps) {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => (
              <React.Fragment key={item.path || index}>
                <BreadcrumbItem>
                  {index === items.length - 1 ? (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={item.path || '/'}>{item.name}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < items.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}