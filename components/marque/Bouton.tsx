import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Le bouton du système « Marqué au feu » : deux familles seulement (aplat et
 * contour), en SansPlomb capitales, angles vifs. Remplace les 11 styles de
 * bouton actuels.
 */
export type VarianteBouton = "jaune" | "charbon" | "contour" | "contour-clair";

const VARIANTES: Record<VarianteBouton, string> = {
  jaune: "bg-jaune text-charbon hover:bg-gold-300",
  charbon: "bg-charbon text-jaune hover:bg-ink-900",
  contour: "border-2 border-charbon text-charbon hover:bg-charbon hover:text-papier",
  "contour-clair": "border-2 border-papier/70 text-papier hover:bg-papier hover:text-charbon",
};

const BASE =
  "inline-flex items-center justify-center gap-2 font-affiche uppercase leading-none tracking-[0.02em] text-lg md:text-xl px-5 pt-3 pb-2.5 transition-colors duration-(--duree-ui) ease-sortie active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-jaune focus-visible:ring-offset-2";

export default function Bouton({
  children,
  href,
  externe = false,
  variante = "jaune",
  className = "",
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  /** lien interne (localisé), ancre de la page (#…) ou externe avec `externe` */
  href?: string;
  externe?: boolean;
  variante?: VarianteBouton;
  className?: string;
  type?: "button" | "submit";
  /** boutons seulement (formulaire en cours d'envoi) */
  disabled?: boolean;
}) {
  const classes = cn(BASE, VARIANTES[variante], className);
  if (href?.startsWith("#")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  if (href && externe) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} className={cn(classes, "disabled:opacity-60 disabled:cursor-wait")}>
      {children}
    </button>
  );
}
