//aapp/@rightStatic/(_PUBLIC)/about-aifa/page.tsx

import AboutAifaPageComponent from '@/components/pages/about-aifa/about-aifa-page-component';
import { constructMetadata } from '@/lib/construct-metadata';
import { Metadata } from 'next';


export const metadata: Metadata = constructMetadata();


export default function Page() {
    return (
      <AboutAifaPageComponent/>
    );
  }

