//app/@left/(_AUTH)/login/(_client)/(_ui_components)/auth-login-form.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "./(_client)/(_ui_components)/auth-login-form"


/**
 * Desktop login page for left panel
 * 
 * Displayed in the left ResizablePanel on desktop screens when user
 * navigates to /login route. Uses the shared LoginForm component.
 * 
 * Features:
 * - Server Component (no client-side JS needed for rendering)
 * - Progressive enhancement (works without JS)
 * - Automatic redirect to /chat after successful login
 * - Consistent styling with Card components
 * - Centered layout with responsive padding
 * 
 * Route: /login (rendered in @left slot)
 */
export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* 
              LoginForm handles:
              - Server Action submission
              - Loading states
              - Error/success messages
              - Auto redirect to /chat after login
            */}
            <LoginForm/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
