import type { CSSProperties } from "react";

/** Les coups de pinceau du « B », remis à l'horizontale (public/marque/). */
export type VarianteTrait =
  | "long-1"
  | "long-2"
  | "long-3"
  | "long-4"
  | "court-1"
  | "court-2"
  | "court-3";

/**
 * Geste 2 · La Marque — un vrai trait du logo, en aplat de currentColor.
 * Donner la taille par className (ex. « w-24 h-2.5 text-jaune »).
 * Soulignement de lien : classe .lien-marque (globals.css).
 */
export default function Trait({
  variante = "long-1",
  className = "",
}: {
  variante?: VarianteTrait;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`trait-marque ${className}`}
      style={{ "--trait": `url(/marque/trait-${variante}.svg)` } as CSSProperties}
    />
  );
}
