import type { CSSProperties, ReactNode } from "react";
import Declencheur, { type ModeGeste } from "./Declencheur";

/**
 * Geste 3 · Le Tampon — statuts et distinctions : early bird, complet,
 * nouveau, pastilles Awards, « reçu » après un formulaire. Impact, léger
 * rebond, encre irrégulière (filtre #encre de <FiltresMarque>). Varier
 * l'angle d'un tampon à l'autre : un vrai tampon n'est jamais posé pareil.
 */
export default function Tampon({
  children,
  angle = -8,
  mode = "vue",
  debut = 0,
  className = "",
}: {
  children: ReactNode;
  angle?: number;
  mode?: ModeGeste;
  /** retard en ms, pour poser le tampon après un autre geste */
  debut?: number;
  className?: string;
}) {
  return (
    <Declencheur
      as="span"
      mode={mode}
      className={`tampon ${className}`}
      style={{ "--tampon-angle": `${angle}deg`, "--tampon-debut": `${debut}ms` } as CSSProperties}
    >
      {children}
    </Declencheur>
  );
}
