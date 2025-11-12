// app/@rightStatic/layout.tsx

import React from "react";

interface RightLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

/**
 * Right Static Layout - Parallel Route Slot for Static Content
 * 
 * ⚠️ CRITICAL: NO-JS COMPATIBILITY REQUIREMENT
 * 
 * This layout is part of a parallel routes architecture designed for static site generation (SSG).
 * 
 * 🚫 DO NOT USE loading.tsx IN THIS SLOT
 * 
 * Why? Loading states break progressive enhancement and no-JavaScript functionality:
 * 
 * 1. Static Generation Conflict:
 *    - Parallel routes with @rightStatic are meant for static HTML generation
 *    - loading.tsx introduces client-side rendering dependencies
 *    - This prevents proper static HTML export during build time
 * 
 * 2. No-JS Requirement:
 *    - Users with JavaScript disabled must see content immediately
 *    - loading.tsx requires JavaScript to display content after hydration
 *    - Static pages should render complete HTML without client-side dependencies
 * 
 * 3. SEO Impact:
 *    - Search engine crawlers may not execute JavaScript
 *    - Content behind loading states might not be indexed
 *    - Static HTML ensures all content is crawlable
 * 
 * ✅ Best Practices:
 *    - Use Suspense boundaries in dynamic slots (@rightDynamic) instead
 *    - Keep this slot purely static with complete HTML at build time
 *    - Place loading states in client components, not route-level loading.tsx
 *    - Use skeleton screens directly in page components if needed
 * 
 * 📚 Reference: Next.js Parallel Routes + Static Generation
 *    https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
 * 
 * @see app/@rightDynamic for dynamic content with loading states
 * @see app/layout.tsx for parallel routes configuration
 */
export default async function RightStaticLayout({
  children,
  modal,
}: RightLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

