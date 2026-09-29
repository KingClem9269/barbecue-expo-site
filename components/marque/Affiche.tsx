import type { ReactNode } from "react";

/**
 * La composition « affiche », reprise des affiches du métro : un panneau
 * charbon et une bande jaune verticale (date, lieu, « B »). Empilés sur
 * mobile : le panneau d'abord, la bande ensuite.
 * Usages : ouverture de l'accueil, appels finaux, pages événement.
 */
export default function Affiche({
  children,
  bande,
  pied,
  className = "",
}: {
  /** contenu du panneau charbon */
  children: ReactNode;
  /** contenu de la bande jaune (voir <BandeDate>) */
  bande: ReactNode;
  /** bandeau blanc sous l'affiche, pour les partenaires (voir <Bandeau>) */
  pied?: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(15rem,30%)]">
        <div className="bg-charbon text-papier p-6 md:p-10 flex flex-col gap-6 min-w-0">{children}</div>
        <div className="bg-jaune text-charbon p-6 md:p-8 flex flex-col gap-4 min-w-0">{bande}</div>
      </div>
      {pied}
    </section>
  );
}
