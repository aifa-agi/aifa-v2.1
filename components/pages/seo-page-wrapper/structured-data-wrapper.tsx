// components/seo/structured-data-client.tsx
'use client'

import { useEffect } from 'react'

type Props = {
  data: Record<string, unknown>
  id: string 
}

export function StructuredDataClient({ data, id }: Props) {
  useEffect(() => {

    const existingScript = document.getElementById(`jsonld-${id}`)
    if (existingScript) return
    
    
    const script = document.createElement('script')
    script.id = `jsonld-${id}`
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    document.head.appendChild(script)
    
    return () => {
      // Cleanup при unmount
      const scriptToRemove = document.getElementById(`jsonld-${id}`)
      scriptToRemove?.remove()
    }
  }, [data, id])
  
  return null
}
