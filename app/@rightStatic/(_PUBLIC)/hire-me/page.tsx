//app/@rightStatic/(_PUBLIC)/hire-me/page.tsx

import HireMePageComponent from '@/components/pages/hire-me/hire-me-page-component';
import { constructMetadata } from '@/lib/construct-metadata';
import { Metadata } from 'next';


export const metadata: Metadata = constructMetadata();


//public/images/author-bolshiyanov.png

export default function Page() {
    return (
      <HireMePageComponent/>
    );
  }

