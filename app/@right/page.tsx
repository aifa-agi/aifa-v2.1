// @/app/@right/page.tsx

import { constructMetadata } from '@/lib/construct-metadata';
import HomePage from '@/components/home-page';
import { Metadata } from 'next';


export const metadata: Metadata = constructMetadata({
  title: 'Advanced Routing Patterns in Next.js 15',
  description: 'Production-ready Next.js 15 starter with parallel routes, intercepting routes, and complex UI patterns. Build modal dialogs, sidebars, and multi-panel layouts without route changes.',
  pathname: '/',
  contentType: 'website',
});



export default function RightPage() {
    return (
      <HomePage/>
    );
  }

