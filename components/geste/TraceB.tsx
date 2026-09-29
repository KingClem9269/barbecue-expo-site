import type { CSSProperties } from "react";
import { B_VIEWBOX, ECLATS_B, TRAITS_B } from "@/lib/marque/traits-b";
import Declencheur, { type ModeGeste } from "./Declencheur";

/**
 * Le monogramme « B » tracé coup de pinceau par coup de pinceau, avec les 14
 * vrais traits du logo (lib/marque/traits-b.ts). Couleur : currentColor.
 * Usages : ouverture de l'accueil, chargements, 404.
 */
export default function TraceB({
  mode = "vue",
  className = "",
  titre = "Barbecue Expo",
}: {
  mode?: ModeGeste;
  className?: string;
  titre?: string;
}) {
  return (
    <Declencheur mode={mode} className={`trace-b ${className}`}>
      <svg viewBox={B_VIEWBOX} role="img" aria-label={titre} fill="currentColor" className="block w-full h-auto">
        {TRAITS_B.map((t, i) => (
          <path key={i} className="trait" d={t.d} style={{ "--i": i } as CSSProperties} />
        ))}
        <path className="eclats" d={ECLATS_B} />
      </svg>
    </Declencheur>
  );
}
