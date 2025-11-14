import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles } from "lucide-react";
import { CodeBlock } from "../../(_components)/code-block";

/* ============================================
 * CODE SNIPPETS FOR SYNTAX HIGHLIGHTING
 * ============================================ */
const CODE_SNIPPETS = {
    rightDynamicLayout: `// From app/@rightDynamic/layout.tsx
export default async function RightDynamicLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Server-side authentication check runs on every request
  const authenticated = await isAuthenticated()
  
  // Pass auth state to client component for overlay control
  return (
    <RightDynamicLayoutClient initialAuth={authenticated}>
      {children}
    </RightDynamicLayoutClient>
  )
}`,

    rightDynamicClient: `// From app/@rightDynamic/(_client)/layout-client.tsx
"use client"

export function RightDynamicLayoutClient({
  children,
  initialAuth
}: RightDynamicLayoutClientProps) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    initAuthState(initialAuth)
  }, [initialAuth])
  
  // Hide overlay if user is not authenticated
  if (!isAuthenticated) {
    return null
  }
  
  return (
    <div
      className="absolute inset-0 z-50 bg-background overflow-y-auto hide-scrollbar"
      role="main"
      aria-label="Dynamic admin content"
    >
      {children}
    </div>
  )
}`,

    rootLayoutArchitecture: `// From app/layout.tsx
<div className="flex-1 min-h-0 w-full">
  <div className="h-full flex">
    {/* Left slot for auth & chat */}
    <div className="hidden md:flex md:w-0 lg:w-[50%] xl:w-[35%] border-r border-border">
      <OnlineStatusProvider>
        <div className="h-full w-full overflow-hidden">
          {left}
        </div>
      </OnlineStatusProvider>
    </div>
    
    {/* Right side with static and dynamic layers */}
    <div className="w-full md:w-full lg:w-[50%] xl:w-[65%] relative">
      <main className="absolute inset-0 overflow-y-auto hide-scrollbar">
        {rightStatic}
      </main>
      {rightDynamic}
    </div>
  </div>
</div>`,

    authHook: `// From app/@rightDynamic/(_client)/layout-client.tsx
const { isAuthenticated } = useAuth()

useEffect(() => {
  initAuthState(initialAuth)
}, [initialAuth])

if (!isAuthenticated) {
  return null // Static layer remains visible
}

return (
  <div className="absolute inset-0 z-50 bg-background">
    {children} {/* Dynamic dashboard content */}
  </div>
)`,
};

/* ============================================
 * ARTICLE CONTENT COMPONENT — 654 WORDS
 * ============================================ */
export function ArticleContent() {
    return (
        <article className="prose prose-slate dark:prose-invert max-w-none">
            <p>
                When we talk about web personalization, we&apos;re really talking about
                meeting user expectations—authenticated dashboards that remember
                preferences, real-time data that updates without refreshing, and
                interfaces that adapt to roles. Yet many developers face a brutal
                choice: <b>build dynamic experiences and sacrifice SEO</b>, or <b>optimize
                    for search and lose personalization</b>. The truth is sophisticated:
                <b>indexable static content and dynamic user interfaces can coexist</b>
                through architectural discipline.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">
                What Is Dynamic Generation?
            </h3>



            <Alert className="mb-2 border-primary">
                <Sparkles />
                <AlertTitle>Try It Now</AlertTitle>
                <AlertDescription>
                    Login using the Login button above to test this feature.
                </AlertDescription>
            </Alert>


            <p>
                Dynamic Generation generates HTML pages <b>on each incoming request</b>, not
                during build time. This approach enables server-side rendering (SSR)
                that fetches user-specific data, verifies authentication state, and
                injects personalized content directly into HTML before sending it to the
                browser.
            </p>

            <CodeBlock
                code={CODE_SNIPPETS.rightDynamicLayout}
                language="typescript"
                fileName="app/@rightDynamic/layout.tsx"
            />

            <p className="text-sm text-muted-foreground">
                Server-side authentication check determines whether to activate dynamic
                overlay, passing initial state to client component for progressive
                enhancement.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">
                Why Dynamic Pages Are Essential
            </h3>

            <h4 className="text-xl font-medium mt-6 mb-3">
                Personalization at Scale
            </h4>

            <p>
                Modern web applications demand user-specific experiences: e-commerce
                platforms need personalized product recommendations, SaaS dashboards
                display account-specific analytics, and admin panels show role-based
                editing interfaces. Pre-rendering millions of permutations for every
                possible user state is technically infeasible and economically wasteful.
                Dynamic Generation enables <b>infinite personalization</b>: the server
                fetches user data at request time and delivers fully-rendered,
                tailored HTML.
            </p>

            <h4 className="text-xl font-medium mt-6 mb-3">Real-Time Data Delivery</h4>

            <p>
                Financial dashboards displaying live stock prices, analytics platforms
                tracking real-time visitor behavior, and collaborative tools showing
                active user presence all require data that changes by the second. Static
                pages become stale instantly; client-side fetching causes layout shifts
                and delays content visibility. Server-Side Rendering on demand ensures
                users receive the latest data baked directly into initial HTML, often
                with TTFB under 2 seconds when properly optimized.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">
                AIFA Dual-Slot Architecture
            </h3>

            <h4 className="text-xl font-medium mt-6 mb-3">
                @rightDynamic Slot: Authenticated Overlays
            </h4>

            <p>
                AIFA&apos;s architecture introduces a groundbreaking solution: <b>parallel
                    route slots with absolute positioning overlays</b>. The{" "}
                <code className="bg-muted px-2 py-1 rounded">@rightDynamic</code> slot
                renders authenticated content—dashboards, admin panels, interactive
                tools—as a layer positioned absolutely above static content.
            </p>

            <CodeBlock
                code={CODE_SNIPPETS.rightDynamicClient}
                language="typescript"
                fileName="app/@rightDynamic/(_client)/layout-client.tsx"
            />

            <p className="text-sm text-muted-foreground">
                Client component conditionally renders overlay based on auth state,
                preserving static fallback for SEO and no-JS users.
            </p>

            <p>
                When a user logs in, the <code className="bg-muted px-2 py-1 rounded">RightDynamicLayoutClient</code>{" "}
                detects authentication state change and applies{" "}
                <code className="bg-muted px-2 py-1 rounded">absolute inset-0</code>{" "}
                positioning with <code className="bg-muted px-2 py-1 rounded">z-50</code>{" "}
                to overlay the entire viewport. This creates a new stacking context that
                completely covers static content without removing it from the DOM. The
                result: <b>SEO benefits of static pages combined with interactivity of
                    SPAs</b>.
            </p>

            <h4 className="text-xl font-medium mt-6 mb-3">
                Left Slot: Auth & Chat Interfaces
            </h4>

            <p>
                The <code className="bg-muted px-2 py-1 rounded">@left</code> parallel
                slot houses authentication flows (login, registration, password reset)
                and the AI chatbot interface. This architectural separation ensures
                auth-related loading states and errors don&apos;t interfere with main content
                rendering.
            </p>

            <CodeBlock
                code={CODE_SNIPPETS.rootLayoutArchitecture}
                language="typescript"
                fileName="app/layout.tsx — Root Parallel Routes"
            />

            <p className="text-sm text-muted-foreground">
                The root layout orchestrates three parallel slots:{" "}
                <code className="bg-muted px-2 py-1 rounded">@left</code> for auth and
                chat, <code className="bg-muted px-2 py-1 rounded">@rightStatic</code>{" "}
                for SEO-optimized pages, and{" "}
                <code className="bg-muted px-2 py-1 rounded">@rightDynamic</code> for
                authenticated interfaces.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">
                Client-Side Hydration and Interactivity
            </h3>

            <h4 className="text-xl font-medium mt-6 mb-3">
                Progressive Enhancement Strategy
            </h4>

            <p>
                AIFA&apos;s dynamic generation follows <b>progressive enhancement</b>: deliver
                core functionality as static HTML first, then layer interactivity via
                JavaScript hydration. When a user first requests a page, the server
                returns static HTML (instantly visible), minimal JavaScript bundle
                (downloads in parallel), hydration event (React attaches listeners), and
                auth check (if authenticated, overlay activates).
            </p>

            <CodeBlock
                code={CODE_SNIPPETS.authHook}
                language="typescript"
                fileName="app/@rightDynamic/(_client)/layout-client.tsx"
            />

            <p className="text-sm text-muted-foreground">
                Client component monitors auth state and conditionally renders overlay,
                preserving static fallback for search engines and no-JS users.
            </p>

            <h4 className="text-xl font-medium mt-6 mb-3">
                Role-Based Content Switching
            </h4>

            <p>
                The <code className="bg-muted px-2 py-1 rounded">useAuth()</code> hook
                provides real-time authentication state to client components. When a
                user logs in, the hook triggers re-render, causing{" "}
                <code className="bg-muted px-2 py-1 rounded">RightDynamicLayoutClient</code>{" "}
                to display the overlay. When they log out, the overlay disappears,
                revealing the static layer beneath.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">
                Dynamic vs Static: When to Choose
            </h3>

            <h4 className="text-xl font-medium mt-6 mb-3">
                Use Dynamic Generation For:
            </h4>

            <ul className="list-disc pl-6 space-y-2">
                <li>
                    <b>Authenticated user dashboards</b> — Profile pages, account settings,
                    subscription management
                </li>
                <li>
                    <b>Real-time analytics</b> — Live visitor tracking, server health
                    monitors, financial tickers
                </li>
                <li>
                    <b>Shopping cart and checkout flows</b> — Personalized bundles, saved
                    payment methods
                </li>
                <li>
                    <b>User-generated content streams</b> — Social feeds, real-time comment
                    threads
                </li>
                <li>
                    <b>Role-based admin panels</b> — CMS interfaces, database management,
                    system config
                </li>
            </ul>

            <h4 className="text-xl font-medium mt-6 mb-3">
                Avoid Dynamic Generation For:
            </h4>

            <ul className="list-disc pl-6 space-y-2">
                <li>
                    <b>Marketing landing pages</b> — High-traffic pages benefit from CDN edge
                    caching
                </li>
                <li>
                    <b>Blog posts and documentation</b> — Content changes infrequently;
                    static generation reduces load
                </li>
                <li>
                    <b>Product catalogs</b> — Unless filtering is dynamic, pre-render for
                    instant loads
                </li>
                <li>
                    <b>Legal pages</b> — Static content with no personalization needs
                </li>
            </ul>

            <p>
                The golden rule: <b>if content is identical for all unauthenticated
                    users, generate it statically</b>. Reserve dynamic rendering for truly
                personalized or real-time experiences.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">
                Performance Considerations
            </h3>

            <p>
                Dynamic Generation introduces server processing on every request, making
                performance optimization critical. Target metrics include <b>TTFB under 2
                    seconds</b> (sub-1-second ideal), database query optimization (connection
                pooling, Redis caching), Edge Functions deployment (millisecond response
                times), and Streaming SSR with React Suspense (send HTML chunks as they
                render).
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">
                Implementation with AIFA
            </h3>

            <p>To add a new dynamic route in AIFA architecture:</p>

            <ul className="list-disc pl-6 space-y-2">
                <li>
                    Create route file in{" "}
                    <code className="bg-muted px-2 py-1 rounded">@rightDynamic</code>{" "}
                    slot: <code>app/@rightDynamic/dashboard/page.tsx</code>
                </li>
                <li>
                    Configure authentication middleware in{" "}
                    <code className="bg-muted px-2 py-1 rounded">middleware.ts</code>
                </li>
                <li>
                    Update navigation in{" "}
                    <code className="bg-muted px-2 py-1 rounded">content-data.ts</code>
                </li>
                <li>
                    Deploy to Vercel — dynamic routes automatically become serverless
                    functions
                </li>
            </ul>

            <p className="text-lg font-medium mt-8">
                Dynamic Generation transforms web applications from static document
                servers into responsive, personalized platforms. AIFA&apos;s dual-slot
                architecture proves you don&apos;t have to choose between SEO visibility and
                dynamic functionality—<b>both coexist through intelligent layering and
                    progressive enhancement</b>.
            </p>
        </article>
    );
}