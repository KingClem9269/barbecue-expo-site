"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { MOUVEMENT_REDUIT } from "@/lib/motion/jetons";

/**
 * Déclenche un geste CSS en posant data-geste sur son élément :
 *   repos → état final (rendu serveur, sans JS, mouvement réduit)
 *   pret  → état de départ, posé seulement si l'élément est hors écran
 *   joue  → le geste se joue (règles de globals.css)
 *   fin   → retour à l'état final une fois l'animation terminée
 *
 * mode « vue »       : se joue à l'entrée dans l'écran. Un élément déjà
 *                      visible au chargement n'est jamais caché puis révélé.
 * mode « chargement » : se joue dès le premier affichage, en CSS pur (le
 *                      HTML serveur porte déjà data-geste="joue").
 */
export type ModeGeste = "vue" | "chargement";
type Etat = "repos" | "pret" | "joue" | "fin";

/** Incrémenté par <Rejouer> : ses gestes se rejouent à leur remontage. */
export const RejouerContexte = createContext(0);

export default function Declencheur({
  as: Comp = "div",
  mode = "vue",
  seuil = 0.35,
  children,
  ...rest
}: {
  as?: ElementType;
  mode?: ModeGeste;
  seuil?: number;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  const rejoue = useContext(RejouerContexte) > 0;
  const effectif: ModeGeste = rejoue ? "chargement" : mode;
  const ref = useRef<HTMLElement>(null);
  const [etat, setEtat] = useState<Etat>(effectif === "chargement" ? "joue" : "repos");

  useEffect(() => {
    if (effectif !== "vue") return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia(MOUVEMENT_REDUIT).matches) return;

    let premier = true;
    const io = new IntersectionObserver(
      ([entree]) => {
        if (premier) {
          premier = false;
          if (entree.isIntersecting) {
            io.disconnect(); // déjà visible : on ne cache rien
            return;
          }
          setEtat("pret"); // hors écran : changement invisible
          return;
        }
        if (entree.isIntersecting) {
          setEtat("joue");
          io.disconnect();
        }
      },
      { threshold: seuil },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [effectif, seuil]);

  const finir = (e: AnimationEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) setEtat((s) => (s === "joue" ? "fin" : s));
  };

  return (
    <Comp ref={ref} data-geste={etat} onAnimationEnd={finir} {...rest}>
      {children}
    </Comp>
  );
}

/** Banc d'essai : rejoue les gestes qu'il contient (page /lab). */
export function Rejouer({
  children,
  libelle = "Rejouer",
  className = "",
}: {
  children: ReactNode;
  libelle?: string;
  className?: string;
}) {
  const [n, setN] = useState(0);
  return (
    <div className={className}>
      <RejouerContexte.Provider value={n}>
        <div key={n}>{children}</div>
      </RejouerContexte.Provider>
      <button
        type="button"
        onClick={() => setN((v) => v + 1)}
        className="mt-4 bg-jaune text-charbon font-affiche uppercase text-lg px-4 pt-2 pb-1.5 hover:bg-gold-300 transition-colors duration-(--duree-ui) focus:outline-none focus-visible:ring-2 focus-visible:ring-charbon focus-visible:ring-offset-2"
      >
        {libelle}
      </button>
    </div>
  );
}
