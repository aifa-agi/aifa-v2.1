//components/seo-page-wrapper/(_components)/hero-section.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Type definitions for Hero Section
 */
export type HeroImages = {
  horizontal: string; // 16:9
  vertical: string;   // 9:16
  square: string;     // 1:1
  alt: string;
};

export type AuthorInfo = {
  name: string;
  role: string;
  avatar: string;
};

export type CTAButtons = {
  primary: {
    text: string;
    href: string;
  };
  secondary: {
    text: string;
    href: string;
  };
};

export type HeroConfig = {
  title: string;
  subtitle: string;
  images: HeroImages;
  author: AuthorInfo;
  cta: CTAButtons;

};

/**
 * Props for HeroSection component
 */
interface HeroSectionProps {
  config: HeroConfig;
  show?: boolean;
  variant: "landing" | "blog" | "feature"
}

/**
 * HeroSection Component - Server Component
 * 
 * Responsive hero section with explicit breakpoint handling:
 * 
 * Breakpoint Strategy:
 * - xs (0-640px):    Single column + Horizontal image (16:9)
 * - sm (640-768px):  Single column + Horizontal image (16:9)
 * - md (768-1024px): Two columns + Vertical image (9:16)
 * - lg (1024-1280px): Single column + Horizontal image (16:9)
 * - xl (1280-1536px): Two columns + Vertical image (9:16)
 * - 2xl (1536px+):   Two columns + Square image (1:1)
 * 
 * This component uses CSS media queries (Tailwind breakpoints) for responsive behavior,
 * making it fully compatible with React Server Components (no client-side JS needed).
 * 
 * @param config - Hero section configuration object
 * @param show - Optional visibility flag, defaults to true
 */
export function HeroSection({ config, show = true, variant }: HeroSectionProps) {
  if (!show) {
    return null;
  }
  const { title, subtitle, images, author, cta } = config;
  if (variant === "feature") {
    return (
      <section className="px-4 mb-12" aria-labelledby="hero-title">
        <div className="space-y-5">
          <h1
            id="hero-title"
            className="text-2xl font-bold leading-tight tracking-[-0.02em] text-foreground"
          >
            {title}
          </h1>

          <p className="text-base text-muted-foreground">
            {subtitle}
          </p>

          {/* Horizontal Image */}
          <div className="relative">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src={images.horizontal}
                  alt={images.alt}
                  width={800}
                  height={450}
                  className="h-full w-full object-contain"
                  priority={false}
                  
                />
              </div>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {author.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {author.role}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <Link
              href={cta.primary.href}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              {cta.primary.text}
            </Link>
            <Link
              href={cta.secondary.href}
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"

            >
              {cta.secondary.text}
            </Link>
          </div>
        </div>
      </section>)
  }



  return (
    <section className="px-4 mb-12" aria-labelledby="hero-title">

      {/* XS: Single column + Horizontal (0-640px) */}
      <div className="block sm:hidden">
        <div className="space-y-5">
          <h1
            id="hero-title"
            className="text-2xl font-bold leading-tight tracking-[-0.02em] text-foreground"
          >
            {title}
          </h1>

          <p className="text-base text-muted-foreground">
            {subtitle}
          </p>

          {/* Horizontal Image */}
          <div className="relative">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src={images.horizontal}
                  alt={images.alt}
                  width={400}
                  height={220}
                  className="h-full w-full object-contain"
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                sizes="56px"
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {author.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {author.role}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <Link
              href={cta.primary.href}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              {cta.primary.text}
            </Link>
            <Link
              href={cta.secondary.href}
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"

            >
              {cta.secondary.text}
            </Link>
          </div>
        </div>
      </div>

      {/* SM: Single column + Horizontal (640-768px) */}
      <div className="hidden sm:block md:hidden">
        <div className="space-y-5">
          <h1
            id="hero-title"
            className="text-3xl font-bold leading-tight tracking-[-0.02em] text-foreground"
          >
            {title}
          </h1>

          <p className="text-lg text-muted-foreground">
            {subtitle}
          </p>

          {/* Horizontal Image */}
          <div className="relative">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src={images.horizontal}
                  alt={images.alt}
                  width={800}
                  height={450}
                  className="h-full w-full object-contain"
                  priority={false}
                  
                />
              </div>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                sizes="56px"
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {author.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {author.role}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <Link
              href={cta.primary.href}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              {cta.primary.text}
            </Link>
            <Link
              href={cta.secondary.href}
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"

            >
              {cta.secondary.text}
            </Link>
          </div>
        </div>
      </div>

      {/* MD: Two columns + Vertical (768-1024px) */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-2 items-center gap-8">
          <div className="space-y-5">
            <h1
              id="hero-title"
              className="text-3xl font-bold leading-tight tracking-[-0.02em] text-foreground"
            >
              {title}
            </h1>

            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                  priority={false}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {author.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {author.role}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <Link
                href={cta.primary.href}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                {cta.primary.text}
              </Link>
              <Link
                href={cta.secondary.href}
                className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"

              >
                {cta.secondary.text}
              </Link>
            </div>
          </div>

          {/* Vertical Image */}
          <div className="relative">
            <div className="aspect-[9/16] w-full overflow-hidden rounded-lg">
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src={images.vertical}
                  alt={images.alt}
                  width={450}
                  height={800}
                  className="h-full w-full object-contain"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LG: Single column + Horizontal (1024-1280px) */}
      <div className="hidden lg:block xl:hidden">
        <div className="space-y-5">
          <h1
            id="hero-title"
            className="text-4xl font-bold leading-tight tracking-[-0.02em] text-foreground"
          >
            {title}
          </h1>

          <p className="text-lg text-muted-foreground">
            {subtitle}
          </p>

          {/* Horizontal Image */}
          <div className="relative">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src={images.horizontal}
                  alt={images.alt}
                  width={800}
                  height={450}
                  className="h-full w-full object-contain"
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                sizes="56px"
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {author.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {author.role}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-row gap-3">
            <Link
              href={cta.primary.href}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              {cta.primary.text}
            </Link>
            <Link
              href={cta.secondary.href}
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"

            >
              {cta.secondary.text}
            </Link>
          </div>
        </div>
      </div>

      {/* XL: Two columns + Vertical (1280-1536px) */}
      <div className="hidden xl:block 2xl:hidden">
        <div className="grid grid-cols-2 items-center gap-8">
          <div className="space-y-5">
            <h1
              id="hero-title"
              className="text-4xl font-bold leading-tight tracking-[-0.02em] text-foreground"
            >
              {title}
            </h1>

            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                  priority={false}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {author.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {author.role}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-row gap-3">
              <Link
                href={cta.primary.href}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                {cta.primary.text}
              </Link>
              <Link
                href={cta.secondary.href}
                className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"

              >
                {cta.secondary.text}
              </Link>
            </div>
          </div>

          {/* Vertical Image */}
          <div className="relative">
            <div className="aspect-[9/16] w-full overflow-hidden rounded-lg">
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src={images.vertical}
                  alt={images.alt}
                  width={450}
                  height={800}
                  className="h-full w-full object-contain"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2XL: Two columns + Square (1536px+) */}
      <div className="hidden 2xl:block">
        <div className="grid grid-cols-2 items-center gap-8">
          <div className="space-y-5">
            <h1
              id="hero-title"
              className="text-4xl font-bold leading-tight tracking-[-0.02em] text-foreground"
            >
              {title}
            </h1>

            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                  priority={false}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {author.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {author.role}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-row gap-3">
              <Link
                href={cta.primary.href}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                {cta.primary.text}
              </Link>
              <Link
                href={cta.secondary.href}
                className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"

              >
                {cta.secondary.text}
              </Link>
            </div>
          </div>

          {/* Square Image */}
          <div className="relative">
            <div className="aspect-[1/1] w-full overflow-hidden rounded-lg">
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src={images.square}
                  alt={images.alt}
                  width={800}
                  height={800}
                  className="h-full w-full object-contain"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}