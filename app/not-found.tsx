// aifa-v2/app/not-found.tsx

import { appConfig, getErrorIllustration } from '@/config/app-config';

export default function NotFound() {
  const isDark = false;
  const notFoundImage = getErrorIllustration('404', isDark ? 'dark' : 'light');

  const suggestedLinks = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Docs', href: '/docs' },
    { label: 'Guides', href: '/guides' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Starters', href: '/starters' },
  ];

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-12 text-center'>
      <div className='w-full max-w-sm'>
        <img
          src={notFoundImage}
          alt='Page Not Found 404'
          width={400}
          height={300}
          className='h-auto w-full'
        />
      </div>

      <div className='space-y-2'>
        <h1 className='text-4xl font-bold text-foreground sm:text-5xl'>
          404
        </h1>
        <p className='text-xl font-semibold text-foreground sm:text-2xl'>
          Page Not Found
        </p>
        <p className='text-sm text-muted-foreground sm:text-base'>
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <div className='space-y-4'>
        <p className='text-sm font-medium text-foreground'>
          Here are some helpful links:
        </p>
        <div className='flex flex-wrap justify-center gap-2'>
          {suggestedLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className='rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted'
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className='space-y-2'>
        <p className='text-xs text-muted-foreground'>
          Still can't find what you're looking for?
        </p>
        <a
          href={`mailto:${appConfig.mailSupport}`}
          className='inline-block text-sm font-medium text-primary hover:underline'
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
