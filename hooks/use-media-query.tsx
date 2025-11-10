//hooks/use-media-query.tsx
"use client"

import { useEffect, useState } from 'react'

/**
 * React hook for responsive media queries
 * 
 * Tracks whether a CSS media query matches the current viewport.
 * Updates automatically when viewport size changes.
 * 
 * Features:
 * - SSR-safe (returns false on server, updates on client)
 * - Automatic cleanup of event listeners
 * - TypeScript support
 * - Works with any valid CSS media query
 * 
 * @param query - CSS media query string (e.g., "(min-width: 768px)")
 * @returns Boolean indicating if media query matches
 * 
 * @example
 * const isDesktop = useMediaQuery("(min-width: 1024px)")
 * const isMobile = useMediaQuery("(max-width: 640px)")
 * const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with false to avoid hydration mismatch
  // Will update to correct value after client-side mount
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Create MediaQueryList object
    const mediaQuery = window.matchMedia(query)
    
    // Set initial value
    setMatches(mediaQuery.matches)

    // Handler for media query changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Modern browsers: addEventListener
    // Legacy browsers: addListener (deprecated but still supported)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
    }

    // Cleanup function
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [query])

  return matches
}
