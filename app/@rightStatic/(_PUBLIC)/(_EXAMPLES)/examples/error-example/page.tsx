// app/@rightStatic/(_PUBLIC)/error-example/page.tsx
'use client';

/**
 * Understanding:
 * - This is a demo page without Next.js error boundary props.
 * - Must never assume `error` exists; show a fake message explicitly in English.
 * - Reuse the same image extraction pattern for consistency with 404/error pages.
 */

import Image from 'next/image';
import Link from 'next/link';
import { getErrorIllustration, appConfig } from '@/config/app-config';

export default function ErrorExamplePage() {
  const darkPath = getErrorIllustration('500', 'dark');
  const lightPath = getErrorIllustration('500', 'light');

  const darkSrc =
    darkPath && typeof darkPath === 'string' && darkPath.length > 0 ? darkPath : null;
  const lightSrc =
    lightPath && typeof lightPath === 'string' && lightPath.length > 0 ? lightPath : null;

  const fakeMessage =
    'This is a FAKE error message for demonstration. When a real error occurs on this page, you will see the actual error details here.';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-12 text-center">
      <section className="w-full max-w-sm" aria-label="Error illustration">
        {darkSrc && (
          <Image
            src={darkSrc}
            alt="500 - Internal Server Error"
            width={400}
            height={300}
            priority
            className="h-auto w-full mb-4 dark:block hidden"
          />
        )}
        {lightSrc && (
          <Image
            src={lightSrc}
            alt="500 - Internal Server Error"
            width={400}
            height={300}
            priority
            className="h-auto w-full mb-4 dark:hidden block"
          />
        )}
      </section>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Oops! Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          We encountered an unexpected error. Our team has been notified.
        </p>
      </div>

      <div className="max-w-sm space-y-2 rounded-lg bg-muted p-4" aria-live="polite" aria-atomic="true">
        <p className="text-xs font-mono text-muted-foreground">Error Details:</p>
        <p className="text-xs font-mono text-destructive">
          This is a FAKE error message for demonstration. When a real error occurs on this page, you will see the actual error details here.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Go Home
        </Link>
        <a
          href={`mailto:${appConfig.mailSupport}`}
          className="rounded-lg border border-border px-6 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Contact Support
        </a>
      </div>
    </main>
  );
}
