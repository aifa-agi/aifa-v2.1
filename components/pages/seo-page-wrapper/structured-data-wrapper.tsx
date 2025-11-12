//components/pages/seo-page-wrapper/structured-data-wrapper.tsx
'use client'

type Props = {
  data: Record<string, unknown>
}

/**
 * Client-side wrapper for JSON-LD structured data
 * 
 * This prevents duplication in RSC payload while maintaining SSR.
 * See: https://github.com/vercel/next.js/discussions/66896
 */
export function StructuredDataWrapper({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
