import type { ReactNode } from "react";
import Declencheur, { type ModeGeste } from "./Declencheur";

/**
 * Geste 1 · La Saisie — le texte apparaît en marques de grill incandescentes
 * (inclinées comme les traits du « B »), puis refroidit en aplat.
 * Pour les titres d'affiche, jamais pour du texte courant.
 *
 *   <Saisie as="h1" mode="chargement" className="text-jaune ...">Barbecue Expo</Saisie>
 */
export default function Saisie({
  as = "h2",
  mode = "vue",
  className = "",
  children,
}: {
  /** élément HTML (chaîne uniquement : ce composant est rendu côté serveur) */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  mode?: ModeGeste;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Declencheur as={as} mode={mode} className={`saisie ${className}`}>
      {children}
    </Declencheur>
  );
}
