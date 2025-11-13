//components/seo-page-wrapper/structured-data-wrapper.tsx

'use client'

type Props = {
  data: Record<string, unknown>
}


export function StructuredDataWrapper({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}