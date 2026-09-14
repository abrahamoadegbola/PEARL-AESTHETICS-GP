import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// Lets a page tell the header "I open with a full-bleed dark hero that runs
// under you". The header uses that to sit transparent over the hero while the
// visitor is at the top of the page, and to become solid as soon as they
// scroll - which is only safe to do when the thing behind it is actually dark.
//
// It's a counter rather than a boolean because during a route change React
// can briefly have both the outgoing and incoming page mounted; counting
// means the header never flickers to solid mid-transition.
const DarkHeroContext = createContext({ hasDarkHero: false, register: () => () => {} });

export function DarkHeroProvider({ children }) {
  const [count, setCount] = useState(0);

  const register = useCallback(() => {
    setCount((c) => c + 1);
    return () => setCount((c) => Math.max(0, c - 1));
  }, []);

  const value = useMemo(() => ({ hasDarkHero: count > 0, register }), [count, register]);

  return <DarkHeroContext.Provider value={value}>{children}</DarkHeroContext.Provider>;
}

export function useHasDarkHero() {
  return useContext(DarkHeroContext).hasDarkHero;
}

// Call from any hero that runs full-bleed under the header.
export function useDeclareDarkHero(active = true) {
  const { register } = useContext(DarkHeroContext);
  useEffect(() => {
    if (!active) return undefined;
    return register();
  }, [active, register]);
}
