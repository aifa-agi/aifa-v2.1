//components/seo-page-wrapper/(_components)/top-features-section.tsx
import React from 'react';
import { Card } from '@/components/ui/card';


export type TopFeatureItem = {
  title: string;
  description: string;
};


export type TopFeaturesConfig = {
  items: TopFeatureItem[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  compact?: boolean;
  forceFixedWidth?: boolean;
};


interface TopFeaturesSectionProps {
  config: TopFeaturesConfig | TopFeatureItem[];
  show?: boolean;
}


function FeaturePill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
      {label}
    </span>
  );
}

/**
 * Нормализация входа: поддержка TopFeaturesConfig и массива элементов
 */
function normalizeConfig(input: TopFeaturesConfig | TopFeatureItem[]) {
  if (Array.isArray(input)) {
    return {
      items: input,
      title: 'Top Features',
      subtitle: undefined,
      columns: 4 as 2 | 3 | 4,
      compact: true,
      forceFixedWidth: false,
    };
  }
  return {
    items: input.items ?? [],
    title: input.title ?? 'Top Features',
    subtitle: input.subtitle,
    columns: input.columns ?? (input.compact ? 4 : 4),
    compact: input.compact ?? true,
    forceFixedWidth: input.forceFixedWidth ?? false,
  };
}

export function TopFeaturesSection({ config, show = true }: TopFeaturesSectionProps) {
  const { items, title, subtitle, columns, compact, forceFixedWidth } = normalizeConfig(config);

  if (!show || !Array.isArray(items) || items.length === 0) {
    return null;
  }

 
  const fixedCardSize = 'w-28 h-28';
  const cardPadding = compact ? 'p-1' : 'p-3';

  return (
    <section className="mb-12" aria-labelledby="top-features-section">
      <h2 id="top-features-section" className="text-2xl font-bold tracking-tight mb-2">
        {title}
      </h2>
      {subtitle ? <p className="text-muted-foreground mb-4">{subtitle}</p> : null}

      
      <div
        className="
          relative
          overflow-x-auto
          overflow-y-hidden
          whitespace-nowrap
          [scrollbar-width:thin]
          [-webkit-overflow-scrolling:touch]
        "
        role="list"
        aria-label="Top features list"
      >
        <div className="inline-flex flex-nowrap gap-3 pr-2">
          {items.map((feature, index) => (
            <Card
              key={index}
              role="listitem"
              className={[
                'rounded-lg border border-primary bg-card hover:shadow-sm transition-shadow',
                'snap-start',
                'shrink-0',
                fixedCardSize,
                cardPadding,
                'whitespace-normal',
                compact ? 'text-center' : '',
              ].join(' ')}
            >
              <div className="flex flex-col items-center justify-start gap-1 mb-1 whitespace-normal">
                <h3 className="text-base text-[40px] font-semibold line-clamp-1 w-full text-primary
            ">
                  {feature.title}
                </h3>

                <p className="text-[12px] text-muted-foreground leading-snug overflow-hidden line-clamp-2 break-words">
                  {feature.description}
                </p>
              </div>
            </Card>

          ))}
        </div>
      </div>
    </section>
  );
}