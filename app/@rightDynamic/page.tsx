// app/@rightDynamic/page.tsx


import { DynamicOverlay } from '@/components/dynamic-overlay'
import { isAuthenticated } from '../@left/(_AUTH)/login/(_server)/actions/auth'

/**
 * Main dynamic route for authenticated users
 * 
 * Server Component that checks authentication status and conditionally
 * renders the dynamic overlay. Returns null for unauthenticated users,
 * ensuring no client-side code is loaded unnecessarily.
 * 
 * This approach provides:
 * - Security: Dynamic content only loads for authenticated users
 * - Performance: No JS bundle for unauthenticated users
 * - SEO: Static content remains accessible for indexing
 */
export default async function RightDynamicRoute() {
  // Server-side authentication check
  const authenticated = await isAuthenticated()
  
  // Return null for unauthenticated users
  // No client component is mounted, no JS is loaded
  if (!authenticated) {
    return null
  }
  
  // Render dynamic overlay for authenticated users
  // Client component will overlay the static content
  return <DynamicOverlay initialAuth={authenticated} />
}
