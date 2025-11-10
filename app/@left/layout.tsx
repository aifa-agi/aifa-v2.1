//app/@left/layout.tsx
import React from "react";

/**
 * Comments in English:
 * Left slot layout - acts as a container for auth and chat slots
 * Does not handle 404 directly (handled by catch-all routes)
 */
export default function LeftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
