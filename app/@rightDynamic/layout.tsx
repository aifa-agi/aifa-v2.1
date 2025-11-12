// app/@rightDynamic/layout.tsx

import { isAuthenticated } from "../@left/(_AUTH)/login/(_server)/actions/auth"
import { RightDynamicLayoutClient } from "./(_client)/layout-client"

/**
 * Right Dynamic Layout - Authenticated Overlay for Parallel Routes
 * 
 * ⚠️ CRITICAL: AUTHENTICATION-BASED OVERLAY PATTERN
 * 
 * This layout implements a progressive enhancement strategy where authenticated
 * content overlays static content without breaking no-JavaScript functionality.
 * 
 * 🎯 Architecture Overview:
 * 
 * 1. Authentication Check:
 *    - Server-side authentication check via isAuthenticated()
 *    - Determines whether to activate the dynamic overlay
 *    - Zero client-side dependency for auth verification
 * 
 * 2. Overlay Mechanism:
 *    - When user is NOT authenticated: @rightStatic slot remains visible (static HTML)
 *    - When user IS authenticated: @rightDynamic overlays @rightStatic using absolute positioning
 *    - This preserves static content for SEO, no-JS users, and initial page load
 * 
 * 3. No-JS Compatibility:
 *    - Static layout (@rightStatic) has NO logic to detect authentication state
 *    - This is intentional: static routes must work without JavaScript
 *    - Authentication state changes are handled purely client-side via RightDynamicLayoutClient
 * 
 * 4. Client-Side Overlay Control:
 *    - RightDynamicLayoutClient receives initialAuth prop from server
 *    - When authenticated: applies absolute positioning CSS to overlay static content
 *    - Overlay creates a new stacking context on top of static HTML
 * 
 * 📐 CSS Strategy (in RightDynamicLayoutClient):
 * 
 *    .dynamic-overlay {
 *      position: absolute;
 *      inset: 0;
 *      z-index: 10;
 *      background: var(--background);
 *    }
 * 
 *    This completely covers @rightStatic while keeping it in the DOM for:
 *    - Search engines to crawl static content
 *    - JavaScript-disabled users to see static content
 *    - Faster initial render (static HTML loads immediately)
 * 
 * 🔐 Role-Based Layer Distribution (Optional Enhancement):
 * 
 *    At nested route levels, you can extend this pattern with role-based rendering:
 * 
 *    // app/@rightDynamic/dashboard/layout.tsx
 *    export default async function DashboardLayout({ children }) {
 *      const user = await getCurrentUser();
 *      
 *      return (
 *        <RoleBasedLayoutClient role={user.role}>
 *          {children}
 *        </RoleBasedLayoutClient>
 *      );
 *    }
 * 
 *    // RoleBasedLayoutClient adjusts z-index, visibility, or routing based on role
 *    // Examples: admin-only panels, editor controls, viewer-only mode
 * 
 * 🌊 Progressive Enhancement Flow:
 * 
 *    Step 1: Browser loads page
 *    └─> Static HTML from @rightStatic renders immediately (no auth check)
 *    └─> SEO bots, no-JS users see static content
 *    └─> Page is interactive without JavaScript
 * 
 *    Step 2: JavaScript loads (if enabled)
 *    └─> Server sends initialAuth state to client
 *    └─> If authenticated: RightDynamicLayoutClient overlays static content
 *    └─> Dynamic features (dashboard, user panels) become available
 * 
 *    Step 3: User authentication state changes
 *    └─> Client-side navigation updates overlay visibility
 *    └─> Static content remains in DOM for instant fallback
 * 
 * 🚫 Why @rightStatic Cannot Listen to Auth:
 * 
 *    - @rightStatic is designed for static site generation (SSG)
 *    - Adding auth listeners would require client-side JavaScript
 *    - This violates progressive enhancement and no-JS requirements
 *    - SEO would suffer (content behind auth gates not indexed)
 *    - Solution: @rightDynamic handles all auth-dependent UI
 * 
 * ✅ Benefits of This Pattern:
 * 
 *    1. SEO Optimization:
 *       - Static content always present in HTML source
 *       - Search engines index complete page content
 *       - JSON-LD schemas remain in static HTML
 * 
 *    2. Performance:
 *       - Instant first paint with static content
 *       - No layout shift when dynamic content loads
 *       - Progressive enhancement for interactive features
 * 
 *    3. Accessibility:
 *       - Works without JavaScript (static fallback)
 *       - Screen readers access static content immediately
 *       - Keyboard navigation functional from first render
 * 
 *    4. Resilience:
 *       - Auth service downtime → static content still visible
 *       - JavaScript errors → users see static version
 *       - Network issues → cached static HTML works offline (PWA)
 * 
 * 🔧 Implementation Requirements:
 * 
 *    1. RightDynamicLayoutClient must:
 *       - Accept initialAuth prop from server
 *       - Apply overlay styles conditionally
 *       - Handle auth state changes via context/listeners
 * 
 *    2. Static content (@rightStatic) must:
 *       - Be complete standalone HTML
 *       - Include all SEO metadata and JSON-LD
 *       - Work without any JavaScript dependencies
 * 
 * 📚 Related Architecture:
 * 
 * @see app/@rightStatic/layout.tsx - Static content slot (no auth logic)
 * @see app/@left/(_AUTH) - Authentication routes and logic
 * @see app/layout.tsx - Root parallel routes configuration
 * @see docs/ARCHITECTURE.md - Full parallel routes strategy
 * 
 * 📖 Reference:
 * Next.js Parallel Routes: https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
 * Progressive Enhancement: https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement
 */
export default async function RightDynamicLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // Server-side authentication check
  // This runs on every request (no caching) to ensure fresh auth state
  const authenticated = await isAuthenticated()
  
  // Pass auth state to client component for overlay control
  return (
    <RightDynamicLayoutClient initialAuth={authenticated}>
      {children}
    </RightDynamicLayoutClient>
  )
}
