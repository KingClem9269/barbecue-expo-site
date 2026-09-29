"use client";

import { useState, type ReactNode } from "react";

/**
 * Geste 6 · Le Retournement — une fiche qu'on retourne comme une pièce sur la
 * grille. Recto : portrait. Verso : ce qui fait venir un visiteur (spécialité,
 * horaires, stand). Les deux faces restent dans le DOM, dans l'ordre de
 * lecture. Donner le format par className (ex. « aspect-[2/3] w-64 »).
 */
export default function Fiche({
  recto,
  verso,
  libelle,
  className = "",
}: {
  recto: ReactNode;
  verso: ReactNode;
  /** ex. « Retourner la fiche de David W. Olson » */
  libelle: string;
  className?: string;
}) {
  const [retournee, setRetournee] = useState(false);
  return (
    <div className={`fiche ${className}`} data-retournee={retournee}>
      <div className="fiche-face fiche-recto">{recto}</div>
      <div className="fiche-face fiche-verso">{verso}</div>
      <button
        type="button"
        aria-pressed={retournee}
        aria-label={libelle}
        onClick={() => setRetournee((r) => !r)}
        className="absolute inset-0 z-10 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-jaune focus-visible:ring-offset-2"
      />
    </div>
  );
}
