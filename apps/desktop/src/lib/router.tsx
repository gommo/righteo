import { useCallback, useEffect, useState } from "react";

/**
 * A very small router. View state lives in the URL, never in component state,
 * so any screen or tab can be linked, bookmarked and reloaded into.
 *
 * Hand-rolled rather than a dependency because there are four routes and no
 * nesting. Swap for a real router the moment that stops being true.
 */
export function useLocation() {
  const [loc, setLoc] = useState(() => ({
    path: window.location.pathname,
    search: window.location.search,
  }));

  useEffect(() => {
    const sync = () =>
      setLoc({ path: window.location.pathname, search: window.location.search });
    window.addEventListener("popstate", sync);
    window.addEventListener("righteo:navigate", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("righteo:navigate", sync);
    };
  }, []);

  return loc;
}

export function navigate(to: string, { replace = false } = {}) {
  if (replace) window.history.replaceState({}, "", to);
  else window.history.pushState({}, "", to);
  window.dispatchEvent(new Event("righteo:navigate"));
}

export function useSearchParam(key: string, fallback: string) {
  const { search, path } = useLocation();
  const value = new URLSearchParams(search).get(key) ?? fallback;
  const set = useCallback(
    (next: string) => {
      const params = new URLSearchParams(window.location.search);
      params.set(key, next);
      navigate(`${path}?${params.toString()}`, { replace: true });
    },
    [key, path],
  );
  return [value, set] as const;
}
