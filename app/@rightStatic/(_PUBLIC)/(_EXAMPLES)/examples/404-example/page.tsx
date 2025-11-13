//app/@rightStatic/(_PUBLIC)/404-example/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

// SEO: use your existing constructMetadata helper
import { constructMetadata } from '@/lib/construct-metadata';
import {  getErrorIllustration } from '@/config/app-config';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Generates Metadata for this page using your shared helper
export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy',
  description:
    'Learn how we collect, use, and protect your personal data. This is an example Privacy Policy page for demonstration purposes.',
  // image omitted intentionally -> your constructMetadata uses default OG image fallback
  pathname: '/privacy-policy',
  contentType: 'documentation',
  // Optionally block indexing in example mode, remove when ready:
  // noIndex: true,
});

export default function PrivacyPolicyPage() {

  const darkPath = getErrorIllustration("404", "dark");
  const lightPath = getErrorIllustration("404", "light");

  const darkSrc =
    darkPath && typeof darkPath === "string" && darkPath.length > 0
      ? darkPath
      : null;
  const lightSrc =
    lightPath && typeof lightPath === "string" && lightPath.length > 0
      ? lightPath
      : null;
  return (
    <main className="container mx-auto px-4 py-10">
      <div className='h-20' />
      <div className="flex flex-col min-h-screen items-center justify-center p-6">
        {/* Error illustrations (theme-aware) */}
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl">
          {/* Dark theme illustration */}
          {darkSrc && (
            <Image
              src={darkSrc}
              alt="404 - Page not found"
              width={400}
              height={400}
              priority
              className="mb-8 dark:block hidden"
            />
          )}

          {/* Light theme illustration */}
          {lightSrc && (
            <Image
              src={lightSrc}
              alt="404 - Page not found"
              width={400}
              height={400}
              priority
              className="mb-8 dark:hidden block"
            />
          )}

          {/* Error heading */}
          <h1 className="text-foreground text-6xl font-bold mb-4">
            404
          </h1>

          {/* Error title */}
          <h2 className="text-foreground text-3xl font-semibold mb-3 text-center">
            Page Not Found
          </h2>

          {/* Error description */}
          <p className="text-muted-foreground text-lg text-center mb-8 max-w-md">
            Could not find the requested resource. The page you are
            looking for might have been removed or is temporarily
            unavailable.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button asChild size="lg" className="w-full">
              <Link href="/home" className="flex-1">
                Go to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>




    </main>
  );
}
