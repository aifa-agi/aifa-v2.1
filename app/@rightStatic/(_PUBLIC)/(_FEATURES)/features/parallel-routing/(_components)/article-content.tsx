// app/@rightStatic/(_PUBLIC)/features/parallel-routing/components/article-content.tsx

import { CodeBlock } from "../../(_components)/code-block";


export const CODE_SNIPPETS = {
  rootParallelLayout: `// app/layout.tsx — Root layout with parallel slots
import React from "react"

export default async function RootLayout({
  left,
  rightStatic,
  rightDynamic,
}: {
  left: React.ReactNode
  rightStatic: React.ReactNode
  rightDynamic: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen overflow-hidden">
        <div className="flex h-full w-full">
          {/* Left slot: AI chat / auth / assistance */}
          <div className="hidden md:flex md:w-0 lg:w-1/3 xl:w-[30%] border-r border-border">
            {left}
          </div>

          {/* Static, SEO-first content */}
          <main className="relative flex-1 overflow-y-auto">
            {rightStatic}
          </main>

          {/* Dynamic overlay for authenticated or advanced flows */}
          {rightDynamic}
        </div>
      </body>
    </html>
  )
}
`,

  leftSlotLayout: `// app/@left/layout.tsx — Left slot container
import type { ReactNode } from "react"

/**
 * LeftLayout hosts independent flows such as authentication and AI chat.
 * It does not handle 404 directly — catch-all routes do that.
 */
export default function LeftLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
`,

  rightStaticLayout: `// app/@rightStatic/layout.tsx — Static slot with no-JS requirement
import type { ReactNode } from "react"

/**
 * RightStaticLayout is designed for static site generation (SSG).
 * No 'use client' and no route-level loading.tsx here — to keep HTML
 * fully renderable without JavaScript and maximally crawlable for SEO.
 */
export default function RightStaticLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
`,

  rightDynamicLayout: `// app/@rightDynamic/layout.tsx — Auth-based overlay for parallel routes
import type { ReactNode } from "react"
import { isAuthenticated } from "app/@left/(_AUTH)/login/(_server)/actions/auth"
import { RightDynamicLayoutClient } from "./(_client)/layout-client"

/**
 * RightDynamicLayout activates a dynamic overlay only when the user is authenticated.
 * This keeps the static content visible to crawlers and no-JS users,
 * while enabling rich app-like UI for logged-in sessions.
 */
export default async function RightDynamicLayout({
  children,
}: {
  children: ReactNode
}) {
  const authenticated = await isAuthenticated()

  return (
    <RightDynamicLayoutClient initialAuth={authenticated}>
      {children}
    </RightDynamicLayoutClient>
  )
}
`,

  rightDynamicClient: `// app/@rightDynamic/(_client)/layout-client.tsx
"use client"

import { useEffect } from "react"
import { initAuthState, useAuth } from "app/@left/(_AUTH)/login/(_client)/(_hooks)/use-auth-state"

/**
 * RightDynamicLayoutClient mounts a full-screen overlay only
 * when the user is authenticated and JavaScript is available.
 */
export function RightDynamicLayoutClient({
  children,
  initialAuth,
}: {
  children: React.ReactNode
  initialAuth: boolean
}) {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    initAuthState(initialAuth)
  }, [initialAuth])

  if (!isAuthenticated) {
    // For guests, keep only the static slot visible
    return null
  }

  return (
    <div
      className="absolute inset-0 z-50 bg-background overflow-y-auto"
      role="main"
      aria-label="Dynamic content"
    >
      {children}
    </div>
  )
}
`,

  parallelFeaturePageMeta: `// app/@rightStatic/(_PUBLIC)/features/parallel-routing/page.tsx
import type { Metadata } from "next"
import { SeoPageWrapper } from "components/seo-page-wrapper/seo-page-wrapper"
import { ArticleContent } from "./components/article-content"

export const metadata: Metadata = {
  title: "Parallel Routing — Independent Flows in One Layout",
  description:
    "How Next.js parallel routes let you run independent UI flows — like an AI chat and a static SEO page — side by side without breaking state or reliability.",
  alternates: {
    canonical: "/features/parallel-routing",
  },
}

export default function ParallelRoutingPage() {
  return (
    <SeoPageWrapper
      config={{
        topSpacing: 80,
        variant: "feature",
        breadcrumbs: [
          { name: "Home", path: "/home" },
          { name: "Features", path: "/features" },
          { name: "Parallel Routing", path: "/features/parallel-routing" },
        ],
        badges: [
          { text: "Next.js 15" },
          { text: "Parallel Routes" },
          { text: "Resilience" },
          { text: "AI + SEO" },
        ],
        showBadges: true,
        showHero: true,
      }}
    >
      <ArticleContent />
    </SeoPageWrapper>
  )
}
`,

  interceptingExample: `// app/@rightStatic/@modal/(...)interception_chat/page.tsx — Intercepting route
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import ChatExample from "components/chat-example/chat-example"

export default function ChatDrawerModal() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => router.back(), 250)
  }

  return (
    <>
      <div
        className={\`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 \${isOpen ? "opacity-100" : "opacity-0"}\`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className={\`fixed inset-y-0 left-0 w-full max-w-md bg-background shadow-2xl transition-transform duration-200 \${isOpen ? "translate-x-0" : "-translate-x-full"}\`}
      >
        <ChatExample />
      </div>
    </>
  )
}
`,
}


export function ArticleContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">

      <p>
        Imagine you need to run two independent UI flows on the same URL: an AI chat assistant on the left and a static, SEO-optimized page on the right. The chat must keep its state, remember the conversation, and continue working while the right side freely navigates between documentation pages, product listings, or dashboards. At the same time, the right side must be resilient: it may fail, show errors, or reload entirely without ever killing the chat. Which technology would you choose to implement such a system?
      </p>

      <p>
        A naive solution would be to build everything as one big client-side application with global state. But this quickly becomes fragile: a single error on the right can break the whole tree, including the chat. Another option would be to use multiple iframes or microfrontends, but that adds heavy complexity in communication, SEO, and performance. In practice, what you really want is a single layout hosting multiple, independent &quot;streams&quot; of UI that can fail, load, and recover separately.
      </p>

      <p>
        This is exactly the problem that Next.js parallel routes are designed to solve. They let you render multiple, independent UI segments—called slots—inside one layout, each with its own navigation, loading, and error boundaries. For AIFA, this pattern became the natural foundation to combine a left-side AI chat flow with a right-side content flow, while preserving both resilience and SEO guarantees.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Why Two Independent Flows Require More Than Just Components
      </h3>

      <p>
        At first glance, you might think: &quot;I can just put a chat component on the left and a content component on the right, no special routing needed.&quot; Technically this is possible, but it ignores several hard constraints that appear in real-world systems:
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Error isolation</strong>: if the right side throws an error, the left chat must not be unmounted or reset.
        </li>
        <li>
          <strong>Navigation independence</strong>: navigating between pages on the right must not reload or re-initialize the chat.
        </li>
        <li>
          <strong>SEO requirements</strong>: the right slot must be statically rendered HTML, indexable and usable even without JavaScript.
        </li>
        <li>
          <strong>Resource control</strong>: dynamic features like dashboards or admin panels should not load for anonymous users.
        </li>
      </ul>

      <p>
        Basic component composition does not give you independent route lifecycles. Nor does it give you separate loading and error states per visual region. To get all of this, you need routing-level primitives that treat slots as first-class citizens. That is exactly what parallel routes bring to the App Router.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Parallel Routes in Next.js: Slots Instead of Single-Flow Pages
      </h3>

      <p>
        Parallel routing in Next.js is built on the concept of slots. Instead of rendering exactly one page per layout, you define multiple named slots using the <code className="bg-muted px-2 py-1 rounded">@folder</code> convention. Each slot represents an independent UI &quot;channel&quot; that the parent layout receives as a prop. You can then decide where and how to render each slot on the screen.
      </p>

      <CodeBlock
        code={CODE_SNIPPETS.rootParallelLayout}
        language="typescript"
        fileName="app/layout.tsx — Root Parallel Routes Architecture"
      />

      <p className="text-sm text-muted-foreground">
        In this layout, the <code className="bg-muted px-2 py-1 rounded">left</code>, <code className="bg-muted px-2 py-1 rounded">rightStatic</code>, and <code className="bg-muted px-2 py-1 rounded">rightDynamic</code> slots are passed from the routing layer as independent React nodes. The layout decides their spatial arrangement—but their navigation and error handling are managed separately by the App Router.
      </p>

      <p>
        This structure is particularly suitable for our scenario: the left slot can host an AI chat flow that persists across navigation, while the right slots can change content independently. When the user clicks on links, only the relevant slot updates. The chat remains mounted, keeping its conversation and internal state intact.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Static Right Slot: Serving the SEO-First Stream
      </h3>

      <p>
        In the first version of the AIFA architecture, the primary goal was not just to have two independent flows. The main challenge was to build a static site that can work even without JavaScript, while still providing dynamic AI-powered experiences. This means the right-hand content had to remain a true static, SEO-first stream, generated at build time and served via CDN, with no JavaScript dependency for core content.
      </p>

      <CodeBlock
        code={CODE_SNIPPETS.rightStaticLayout}
        language="typescript"
        fileName="app/@rightStatic/layout.tsx — Static Slot Layout"
      />

      <p className="text-sm text-muted-foreground">
        Notice that the static layout is a pure server component: no <code className="bg-muted px-2 py-1 rounded">&apos;use client&apos;</code>, no route-level <code className="bg-muted px-2 py-1 rounded">loading.tsx</code>. This ensures the HTML is fully rendered on the server and remains accessible to users and crawlers even if JavaScript is disabled.
      </p>

      <p>
        All documentation pages, marketing sections, and feature descriptions live inside this slot. They benefit from Static Site Generation, JSON-LD schemas, and well-structured metadata—exactly what you need to dominate search results. Yet, because they are part of a parallel routing setup, they do not own the entire screen; they share it harmoniously with the left AI stream.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Dynamic Right Slot: Progressive Enhancement for Authenticated Flows
      </h3>

      <p>
        One of the powerful aspects of parallel routes is that each slot can have its own logic for when and how it appears. AIFA leverages this by making the dynamic right slot conditional on authentication. Anonymous users see only the static content, while authenticated users get an overlay with dynamic tools: admin panels, dashboards, advanced controls.
      </p>

      <CodeBlock
        code={CODE_SNIPPETS.rightDynamicLayout}
        language="typescript"
        fileName="app/@rightDynamic/layout.tsx — Auth-Based Dynamic Slot"
      />

      <CodeBlock
        code={CODE_SNIPPETS.rightDynamicClient}
        language="typescript"
        fileName="app/@rightDynamic/(_client)/layout-client.tsx"
      />

      <p>
        This pattern ensures that your static content is always available and indexable, while dynamic flows are progressively layered on top. Crucially, if something goes wrong in the dynamic slot—an API error, a rendering bug, or a runtime exception—the static content remains unaffected. Each slot can have its own <code className="bg-muted px-2 py-1 rounded">error.tsx</code> and <code className="bg-muted px-2 py-1 rounded">loading.tsx</code>, giving you fine-grained control over resilience.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Left Slot: Building a Component Generation System from Chat
      </h3>

      <p>
        Now consider the specific goal mentioned in our architecture: building a system that can generate components for the right slot using a chat-bot located in the left slot. The chat interacts with a vector store, receives instructions from the user, and may even trigger creation of UI artifacts that appear on the right. For this to feel natural, the chat must never reset when the right-side content changes. It acts as the &quot;brain&quot; of the experience—constantly thinking, while the right side paints the results.
      </p>

      <CodeBlock
        code={CODE_SNIPPETS.leftSlotLayout}
        language="typescript"
        fileName="app/@left/layout.tsx — Left Slot Container"
      />

      <p>
        Parallel routes make this architecture intuitive. The chat occupies its own slot with its own routing subtree. The right slot is free to navigate, reload, and even crash without touching the chat&apos;s React tree. This separation is not a hack—it is a first-class concept in the routing layer, which is exactly what you want when designing for reliability.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Handling Mobile: Intercepting Routes Instead of Losing Parallelism
      </h3>

      <p>
        On desktop, the idea of two parallel streams is obvious: chat on the left, content on the right. On mobile, however, you cannot afford to permanently show both. Yet, abandoning the pattern entirely on small screens would mean losing the mental model and much of the UX advantages. AIFA solves this with intercepting routes.
      </p>

      <CodeBlock
        code={CODE_SNIPPETS.interceptingExample}
        language="typescript"
        fileName="app/@rightStatic/@modal/(...)interception_chat/page.tsx — Intercepting Chat Drawer"
      />

      <p>
        Here, opening the chat on mobile doesn&apos;t navigate away from the static page. Instead, the chat appears as a modal drawer managed by an intercepting route. The underlying static slot remains part of the parallel routing graph; it is simply temporarily covered. This keeps the architecture consistent across viewports while adapting the visual representation to constrained screen sizes.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-4">
        Why Next.js Parallel Routes Are the &quot;Out-of-the-Box&quot Solution
      </h3>

      <p>
        Could you build all of this without Next.js parallel routes? Yes—but at a significant cost. You would have to invent your own slot system, manually orchestrate independent React trees, implement custom error and loading boundaries per region, and somehow keep navigation state synchronized. Each of these problems is solvable, but together they become a framework-level concern.
      </p>

      <p>
        Next.js parallel routes give you a ready-made, battle-tested abstraction for these scenarios. They allow you to:
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>Render multiple, independent sections on the same URL.</li>
        <li>Assign separate error and loading UI to each slot.</li>
        <li>Conditionally render slots based on authentication or feature flags.</li>
        <li>Keep long-lived flows (like chat) alive while other sections navigate freely.</li>
      </ul>

      <CodeBlock
        code={CODE_SNIPPETS.parallelFeaturePageMeta}
        language="typescript"
        fileName="app/@rightStatic/(_PUBLIC)/features/parallel-routing/page.tsx"
      />

      <p className="text-sm text-muted-foreground">
        The page above is just one example of how you can document and expose this pattern in your own product. The real power comes from reusing the same architectural skeleton—left, rightStatic, rightDynamic—across different feature pages, dashboards, and flows.
      </p>

      <p className="text-lg font-medium mt-8">
        In other words, parallel routes are not just a routing trick; they are the backbone of a reliable, AI-centric, SEO-friendly architecture. They let you design web applications where independent streams—like an AI chat and a static content flow—coexist, fail, and evolve without dragging each other down.
      </p>
    </article>
  );
}
