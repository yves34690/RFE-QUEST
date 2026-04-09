"use client";

import { useEffect, useState } from "react";

interface HydrationGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Prevents hydration mismatch with Zustand persist (localStorage).
 * Renders children only after client-side hydration is complete.
 */
export default function HydrationGuard({
  children,
  fallback = null,
}: HydrationGuardProps) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return <>{fallback}</>;
  return <>{children}</>;
}
