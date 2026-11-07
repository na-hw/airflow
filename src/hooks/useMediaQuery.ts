"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tracks a CSS media query. The server snapshot is `false`, so the server
 * renders the desktop layout and the client adjusts right after hydration.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
