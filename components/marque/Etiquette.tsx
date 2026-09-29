import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Étiquette SansPlomb sur aplat : jour, heure, stand, statut. Remplace les
 * sur-titres en petites capitales espacées précédés d'un filet doré ; à
 * n'utiliser que si elle porte une information.
 */
const TONS = {
  jaune: "bg-jaune text-charbon",
  charbon: "bg-charbon text-papier",
  papier: "bg-papier text-charbon",
  contour: "border-2 border-current",
} as const;

export default function Etiquette({
  children,
  ton = "jaune",
  className = "",
}: {
  children: ReactNode;
  ton?: keyof typeof TONS;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block font-affiche uppercase leading-none tracking-[0.02em] text-base md:text-lg px-2.5 pt-1.5 pb-1",
        TONS[ton],
        className,
      )}
    >
      {children}
    </span>
  );
}
