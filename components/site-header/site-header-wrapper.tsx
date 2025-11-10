//components/site-header/site-header.tsx

import { isAuthenticated } from "@/app/@left/(_AUTH)/login/(_server)/actions/auth"
import { SiteHeaderClient } from "./site-header-client"

/**
 * Site header - Server Component
 * 
 * Fetches authentication status from server (cookies) and passes
 * it to the client component for reactive UI updates.
 * 
 * This separation ensures:
 * - Server-side authentication check on initial render
 * - Client-side reactivity for auth state changes
 */
export async function SiteHeader() {
  const authenticated = await isAuthenticated()
  
  return <SiteHeaderClient initialAuth={authenticated} />
}
