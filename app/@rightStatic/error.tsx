//app/error.tsx

'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { appConfig, getErrorIllustration } from '@/config/app-config';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[Error Boundary]', error.message, error.digest);
  }, [error]);

  const isDark =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches;

  const errorImage = getErrorIllustration('500', isDark ? 'dark' : 'light');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-12 text-center">
      <div className="w-full max-w-sm">
        <Image
          src={errorImage}
          alt="Error 500"
          width={400}
          height={300}
          className="h-auto w-full"
        priority={false}
                
        />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Oops! Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          We encountered an unexpected error. Our team has been notified.
        </p>
      </div>

      <div className="max-w-sm space-y-2 rounded-lg bg-muted p-4">
        <p className="text-xs font-mono text-muted-foreground">Error Details:</p>
        <p className="text-xs font-mono text-destructive">{error.message}</p>
        {error.digest && (
          <p className="text-xs font-mono text-muted-foreground">ID: {error.digest}</p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Try Again
        </button>

       
        <Link
          href="/"
          className="rounded-lg border border-border px-6 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Go Home
        </Link>
      </div>

      <p className="text-xs text-muted-foreground">
        If this problem persists, please contact{' '}
        <a
          href={`mailto:${appConfig.mailSupport}`}
          className="font-medium text-primary hover:underline"
        >
          {appConfig.mailSupport}
        </a>
      </p>
    </div>
  );
}
