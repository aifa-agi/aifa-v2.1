//app/@rightStatic/(_PUBLIC)/home/page.tsx

import HomePageComponent from '@/components/seo-pages/pages/home/home-page-component';
import { constructMetadata } from '@/lib/construct-metadata';
import { Metadata } from 'next';


export const metadata: Metadata = constructMetadata();




export default function Page() {
    return (
      <HomePageComponent/>
    );
  }

