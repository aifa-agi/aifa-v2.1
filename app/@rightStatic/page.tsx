//app/@rightStatic/page.tsx

import { constructMetadata } from '@/lib/construct-metadata';

import { Metadata } from 'next';
import HomePageComponent from '@/components/pages/home/home-page-component';

export const metadata: Metadata = constructMetadata();

export default function RightPage() {
    return (
      <HomePageComponent/>
    );
  }

