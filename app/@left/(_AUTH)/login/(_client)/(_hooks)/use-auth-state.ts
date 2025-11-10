//app/@left/(_AUTH)/login/(_client)/(_hooks)/use-auth-state.ts
"use client"

import { useEffect, useState } from 'react'

/**
 * Type definition for state change subscribers
 */
type Subscriber = (value: boolean) => void

/**
 * Global authentication state storage
 * 
 * This pattern avoids Context Provider to maintain static rendering
 * for unauthenticated users. State is managed through a subscription
 * model where components can subscribe to auth changes.
 */
let isAuthenticatedState = false
const subscribers = new Set<Subscriber>()

/**
 * Updates authentication state and notifies all subscribers
 * 
 * @param newValue - New authentication status
 */
const setIsAuthenticated = (newValue: boolean) => {
  isAuthenticatedState = newValue
  
  // Notify all subscribed components of state change
  subscribers.forEach((callback) => callback(isAuthenticatedState))
}

/**
 * React hook for authentication state management
 * 
 * Components using this hook will automatically re-render when
 * authentication state changes. Implements subscription pattern
 * to avoid Context Provider overhead.
 * 
 * @returns Object with authentication state and control methods
 * 
 * @example
 * const { isAuthenticated, login, logout } = useAuth()
 */
export const useAuth = () => {
  const [isAuthenticated, setLocalState] = useState(isAuthenticatedState)

  useEffect(() => {
    // Subscribe to global state changes
    const callback = (newValue: boolean) => setLocalState(newValue)
    subscribers.add(callback)
    
    // Cleanup: unsubscribe on component unmount
    return () => {
      subscribers.delete(callback)
    }
  }, [])

  return {
    isAuthenticated,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false),
  }
}

/**
 * Initializes authentication state from server component
 * 
 * Should be called once when the app mounts with the initial
 * authentication status from the server (via cookies).
 * 
 * @param isAuthenticated - Initial auth status from server
 * 
 * @example
 * useEffect(() => {
 *   initAuthState(initialAuth)
 * }, [initialAuth])
 */
export const initAuthState = (isAuthenticated: boolean) => {
  setIsAuthenticated(isAuthenticated)
}

/**
 * Gets current authentication state without subscribing
 * 
 * @returns Current authentication status
 */
export const getAuthState = () => isAuthenticatedState
