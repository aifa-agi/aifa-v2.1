//app/@left/(_AUTH)/login/(_server)/actions/auth.ts
"use client"

import * as React from "react"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useAuth } from "@/app/@left/(_AUTH)/login/(_client)/(_hooks)/use-auth-state"
import { loginAction } from "../../(_server)/actions/auth"
interface LoginFormProps extends React.ComponentProps<"form"> {
  onSuccess?: () => void
}

/**
 * Reusable login form component
 * 
 * Works with Server Actions for progressive enhancement.
 * Can be used in both modal dialogs (mobile) and full pages (desktop).
 * 
 * Features:
 * - Progressive enhancement (works without JS)
 * - Server Actions for form handling
 * - Loading states and error messages
 * - Automatic redirect to /chat after login
 * - Global state synchronization
 * 
 * @param onSuccess - Optional callback after successful login (for modal close)
 */
export function LoginForm({ 
  className, 
  onSuccess,
  ...props 
}: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  const { login } = useAuth()
  const router = useRouter()

  // Handle successful authentication
  React.useEffect(() => {
    if (state?.success) {
      // Update global authentication state
      login()
      
      // Call success callback if provided (for modal)
      if (onSuccess) {
        onSuccess()
      } else {
        // If no callback (desktop page), redirect after 2 seconds
        setTimeout(() => {
          router.push('/chat')
        }, 2000)
      }
    }
  }, [state, login, onSuccess, router])

  return (
    <form 
      className={cn("flex flex-col gap-6", className)} 
      action={formAction}
      {...props}
    >
      <FieldGroup>
        {/* Email field */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            disabled={isPending}
            autoComplete="email"
          />
        </Field>
        
        {/* Password field */}
        <Field>
          <div className="flex items-center gap-2">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline truncate max-w-[150px]"
            >
              Forgot your password?
            </a>
          </div>
          <Input 
            id="password" 
            name="password"
            type="password" 
            required
            disabled={isPending}
            autoComplete="current-password"
          />
        </Field>
        
        {/* Error/Success message */}
        {state?.message && (
          <p className={cn(
            "text-sm",
            state.success ? "text-green-600" : "text-red-600"
          )}>
            {state.message}
          </p>
        )}
        
        {/* Action buttons */}
        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
          <Button variant="outline" type="button" className="w-full">
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
