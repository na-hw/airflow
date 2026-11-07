/**
 * A tiny external store for a user preference persisted in localStorage,
 * shaped for `useSyncExternalStore`. The server snapshot is always the
 * fallback, so hydration matches the server HTML and React re-renders with
 * the stored value right after — without a setState-in-effect round trip.
 * The inline scripts in the root layout apply the stored value to the DOM
 * before first paint; `apply` keeps the DOM in sync on later changes.
 */
export function createPreference<T extends string>({
  key,
  values,
  fallback,
  apply,
}: {
  key: string;
  values: readonly T[];
  fallback: T;
  apply: (value: T) => void;
}) {
  const listeners = new Set<() => void>();
  // Used when storage is unavailable (privacy mode, blocked site data) so the
  // preference still switches for the current page.
  let memory = fallback;

  const getSnapshot = (): T => {
    try {
      const stored = localStorage.getItem(key);
      return values.includes(stored as T) ? (stored as T) : fallback;
    } catch {
      return memory;
    }
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    // Keep other tabs in sync when the preference changes there.
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      apply(getSnapshot());
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  };

  const set = (value: T) => {
    memory = value;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Not persisted; `memory` keeps the current page in sync.
    }
    apply(value);
    listeners.forEach((listener) => listener());
  };

  return { subscribe, getSnapshot, getServerSnapshot: () => fallback, set };
}
