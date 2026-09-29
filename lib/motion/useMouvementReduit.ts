"use client";

import { useSyncExternalStore } from "react";
import { MOUVEMENT_REDUIT } from "./jetons";

function abonner(onChange: () => void) {
  const q = window.matchMedia(MOUVEMENT_REDUIT);
  q.addEventListener("change", onChange);
  return () => q.removeEventListener("change", onChange);
}

/**
 * Préférence « mouvement réduit », suivie en direct. Faux côté serveur et à
 * l'hydratation, pour que le premier rendu client corresponde au HTML.
 */
export function useMouvementReduit() {
  return useSyncExternalStore(
    abonner,
    () => window.matchMedia(MOUVEMENT_REDUIT).matches,
    () => false,
  );
}
