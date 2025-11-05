// app/@right/(_PUBLIC)/[...slug]/page.tsx
import { notFound } from 'next/navigation';

/**
 * Comments in English:
 * Catch-all route for unknown paths in (_PUBLIC) slot
 * Intercepts all requests that don't match specific routes
 * Calls notFound() to trigger app/@right/not-found.tsx
 */
export default function NotFoundInPublic({
  params,
}: {
  params: { slug: string[] };
}) {
  // ✅ All unknown routes in (_PUBLIC) trigger 404
  notFound();
}
