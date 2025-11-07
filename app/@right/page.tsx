// @/app/@right/page.tsx

import { constructMetadata } from '@/lib/construct-metadata';
import HomePage from '@/components/home-page';
import { Metadata } from 'next';


export const metadata: Metadata = constructMetadata();




export default function RightPage() {
    return (
      <HomePage/>
    );
  }

