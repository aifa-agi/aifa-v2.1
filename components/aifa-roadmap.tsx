//components/aifa-roadmap.tsx

'use client';

import { RoadmapItem } from '@/config/pages-config/aifa-roadmap-data';
import Link from 'next/link';

type AifaRoadmapProps = {
  items: RoadmapItem[];
};

const STATUS_LABEL: Record<RoadmapItem['status'], string> = {
  completed: 'Completed',
  inProgress: 'In Progress',
};

const STATUS_CLASSES: Record<RoadmapItem['status'], string> = {
  completed:
    'bg-primary/10 text-primary border border-primary/40',
  inProgress:
    ' border ',
};

export function AifaRoadmap({ items }: AifaRoadmapProps) {
  return (
    <section
      aria-labelledby="aifa-roadmap-heading"
      className="relative mb-12"
    >

      <div className="mb-8 text-center">
        <h2
          id="aifa-roadmap-heading"
          className="text-2xl font-bold tracking-tight"
        >
          AIFA Roadmap
        </h2>

      </div>
      <div className="pointer-events-none absolute left-4 top-12 h-full w-px bg-border sm:left-1/2 sm:-translate-x-1/2" />

      <ol className="space-y-10">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <li
              key={item.id}
              className="relative flex gap-4 sm:gap-8"
            >
              
              <div className="absolute left-4 top-2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-background ring-4 ring-background sm:left-1/2 sm:-translate-x-1/2">
                <span
                  className={`block h-2 w-2 rounded-full ${item.status === 'completed'
                    ? 'bg-primary'
                    : 'bg-muted'
                    }`}
                />
              </div>

              {/* Контентный блок: на мобиле всегда full-width, на десктопе чередование слева/справа */}
              <div
                className={`
                  mx-4 w-full sm:w-1/2 sm: ml-8
                  ${isLeft ? 'sm:pr-10 sm:text-right' : 'sm:ml-auto sm:pl-10 sm:text-left'}
                `}
              >
                <div className=" mr-2 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-muted-foreground">
                  <span className="text-[11px] text-muted-foreground/70">
                    {index + 1 < 100 ? `00${index + 1}` : index + 1}
                  </span>
                  <span>{item.version}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLASSES[item.status]}`}
                  >
                    {STATUS_LABEL[item.status]}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center ">
                  <h3 className="text-lg font-semibold  w-full">
                    {item.title}
                  </h3>

                  
                </div>

                <p className="mt-2 text-sm text-muted-foreground w-full">
                  {item.description}
                </p>

                {item.status === 'completed' &&
                  <div className="mt-3">
                    <Link
                      href={item.url}
                      target="_blank"
                      className="inline-flex items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Open demo
                      <span className="ml-1 text-xs">↗</span>
                    </Link>
                  </div>}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
