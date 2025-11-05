// app/@right/layout.tsx
import React from "react";

/**
 * Comments in English:
 * Right slot layout - acts as a container for public content
 * Does not handle 404 directly (handled by catch-all routes)
 */
export default function RightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
