//app/@left/(_AUTH)/login/(_server)/actions/auth.ts
"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Server Action: Fake authentication login
 * 
 * Accepts any email/password combination and creates an authentication session.
 * This is a DEMO implementation - replace with real authentication logic.
 * 
 * Features:
 * - Works without JavaScript (progressive enhancement)
 * - Sets HttpOnly cookie for security
 * - Returns success/error state for client-side handling
 * 
 * @param prevState - Previous form state (unused, required by useActionState)
 * @param formData - Form data containing email and password
 * @returns Object with success status and message
 */
export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Simulate server processing delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Fake authentication - accepts any credentials
  // TODO: Replace with real authentication logic
  if (email && password) {
    // Set authentication cookie
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'auth_session',
      value: 'authenticated',
      httpOnly: true, // Not accessible via JavaScript (security)
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax', // CSRF protection
      path: '/', // Available across entire site
      maxAge: 60 * 60 * 24 * 7, // 7 days expiration
    })

    return { success: true, message: 'Login successful' }
  }

  return { success: false, message: 'Please provide email and password' }
}

/**
 * Server Action: Logout user
 * 
 * Deletes authentication cookie and redirects to home page.
 * Works without JavaScript through form submission.
 */
export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('auth_session')
  
  // Redirect to home page after logout
  redirect('/')
}

/**
 * Utility: Check if user is authenticated
 * 
 * Server-side function to verify authentication status.
 * Used in Server Components and Server Actions.
 * 
 * @returns Boolean indicating authentication status
 * 
 * @example
 * const authenticated = await isAuthenticated()
 * if (!authenticated) redirect('/login')
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('auth_session')
  return authCookie?.value === 'authenticated'
}

/**
 * Utility: Get user session data
 * 
 * Returns mock user data for authenticated users.
 * TODO: Replace with real user data from database
 * 
 * @returns User object or null if not authenticated
 */
export async function getUserSession() {
  const authenticated = await isAuthenticated()
  
  if (!authenticated) {
    return null
  }

  // Mock user data - replace with database query
  return {
    id: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    name: 'Admin User',
  }
}
