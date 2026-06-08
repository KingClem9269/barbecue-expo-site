"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "@/i18n/navigation";

/**
 * Audience rail context — tracks whether the user is in the Grand Public (b2c)
 * or Pro (b2b) journey. Drives nav swap, header CTA swap, and any other
 * audience-aware UI.
 *
 * Resolution order:
 *   1. URL pathname (/pro/* → pro, /visiter/* → b2c, all known pro pages → pro)
 *   2. localStorage (last explicit choice persisted via setAudience)
 *   3. Default 'b2c'
 *
 * The pathname always wins so navigating around stays intuitive. localStorage
 * only kicks in on neutral pages (/, /infos-pratiques, etc.).
 */

export type Audience = "b2c" | "pro";

interface AudienceCtx {
  audience: Audience;
  setAudience: (a: Audience) => void; // persists to localStorage
}

const AudienceContext = createContext<AudienceCtx | null>(null);

const STORAGE_KEY = "bbq-expo-audience";

// Pro-leaning paths — when user is on these pages, treat the rail as pro
// even if no /pro prefix.
const PRO_PATHS = [
  "/pro",
  "/awards",
  "/devenez-exposants",
  "/espace-pro-b2b",
  "/pourquoi-exposer",
  "/billetterie/pro-b2b",
  "/billetterie/presse",
  // Note : /exposants (Liste/Nos exposants) et /gallery-press (Galerie & Presse)
  // ne forcent volontairement PLUS le passage en mode PRO — ils restent neutres
  // et conservent le mode courant (Grand Public par défaut).
];

// B2C-leaning paths
const B2C_PATHS = [
  "/visiter",
  "/pitmasters",
  "/grill-arena",
  "/programme",
  "/program",
  "/billetterie/particulier",
  "/pourquoi-visiter",
];

function deriveFromPath(pathname: string): Audience | null {
  // Strip trailing slash, normalize
  const p = pathname.replace(/\/$/, "") || "/";
  // Home is now the Grand Public (B2C) homepage.
  if (p === "/") return "b2c";
  if (PRO_PATHS.some((prefix) => p === prefix || p.startsWith(prefix + "/"))) {
    return "pro";
  }
  if (B2C_PATHS.some((prefix) => p === prefix || p.startsWith(prefix + "/"))) {
    return "b2c";
  }
  return null; // neutral
}

export function AudienceProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [stored, setStored] = useState<Audience | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === "b2c" || raw === "pro") setStored(raw);
    } catch {
      // localStorage may be unavailable (private mode); fall back gracefully
    }
  }, []);

  const audience: Audience = useMemo(() => {
    return deriveFromPath(pathname) ?? stored ?? "b2c";
  }, [pathname, stored]);

  const setAudience = (a: Audience) => {
    setStored(a);
    try {
      window.localStorage.setItem(STORAGE_KEY, a);
    } catch {
      // ignore
    }
  };

  return (
    <AudienceContext.Provider value={{ audience, setAudience }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience(): AudienceCtx {
  const ctx = useContext(AudienceContext);
  // Safe default if provider not mounted (SSR / standalone usage)
  if (!ctx) return { audience: "b2c", setAudience: () => {} };
  return ctx;
}
