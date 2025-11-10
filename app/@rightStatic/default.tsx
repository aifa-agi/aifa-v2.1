//app/@rightStatic/default.tsx
import { Metadata } from 'next'
import { constructMetadata } from '@/lib/construct-metadata'

export const metadata: Metadata = constructMetadata({
  title: 'Default Page — Placeholder',
  description: 'This is the default placeholder page for the @right slot.',
  pathname: '/',
  contentType: 'website',
})



/**
 * Default Page for @right slot
 * This is a placeholder page that displays when there is no real content
 */
export default function RightDefaultPage() {
  return (
    <main className="flex items-center justify-center min-h-svh">
      <div className="text-center space-y-6 p-6">
        {/* Visual indicator that this is default */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border">
          <span className="text-xs font-mono text-muted-foreground">
            @right/default.tsx
          </span>
        </div>

        {/* Main text */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Default Page
          </h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            This is a placeholder page for the <code className="bg-muted px-2 py-1 rounded text-xs">@right</code> slot
          </p>
        </div>

        {/* Description */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            You are seeing this page because:
          </p>
          <ul className="text-left inline-block space-y-1">
            <li>✓ This is the file <code className="bg-muted px-1.5 py-0.5 rounded text-xs">app/@right/default.tsx</code></li>
            <li>✓ It is completely static (SSG)</li>
            <li>✓ Works without JavaScript</li>
            <li>✓ This is just a placeholder</li>
          </ul>
        </div>

        {/* Notification */}
        <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm text-foreground font-medium">
            Replace this file with real content for the @right slot
          </p>
        </div>
      </div>
    </main>
  )
}
