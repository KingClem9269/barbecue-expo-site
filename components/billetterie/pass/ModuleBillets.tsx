"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Minus, Plus } from "lucide-react";
import AlerteOuverture from "@/components/billetterie/AlerteOuverture";
import Etiquette from "@/components/marque/Etiquette";
import { PALIERS, PASS, TARIFS, prix, type IdPass, type IdTarif } from "@/lib/billets";
import { SALON } from "@/lib/salon";
import { cn } from "@/lib/utils";
import { contenu } from "./contenu";

/**
 * Le module de vente d'un pass, en colonne (à droite sur ordinateur, en bas
 * de page sur mobile). Il ne propose que les tarifs du pass, au prix du
 * palier en cours.
 *
 * - Pass pas encore en vente (+ Food) ou vente 2027 pas ouverte : pas de
 *   tarifs ni de module, seulement « Ouverture prochaine » et l'alerte.
 * - Aperçu interne (NEXT_PUBLIC_APERCU_BILLETTERIE=1) : un module factice,
 *   avec quantités et total, à la place du futur widget de vente.
 */

const APERCU = process.env.NEXT_PUBLIC_APERCU_BILLETTERIE === "1";

/** billets minimum par commande, par tarif */
const MINIMUM: Partial<Record<IdTarif, number>> = { groupe: 20 };
/** adultes payants que représente un billet, pour les moins de 12 ans */
const ADULTES: Partial<Record<IdTarif, number>> = { journee: 1, weekend: 1, famille: 2, groupe: 1 };
const ENFANTS_PAR_ADULTE = 4;

export default function ModuleBillets({ pass, palier }: { pass: IdPass; palier: number }) {
  const locale = useLocale();
  const t = contenu(locale);
  const tarifs = PASS[pass].tarifs;
  const enVente = PASS[pass].ouvert && (SALON.billetterieOuverte || APERCU);
  const [quantites, setQuantites] = useState<Partial<Record<IdTarif, number>>>({});

  const fin = PALIERS[palier].fin;
  const finPalier = fin
    ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", timeZone: "Europe/Paris" }).format(new Date(fin))
    : null;

  const adultes = tarifs.reduce((n, id) => n + (quantites[id] ?? 0) * (ADULTES[id] ?? 0), 0);
  const maxEnfants = adultes * ENFANTS_PAR_ADULTE;
  const total = tarifs.reduce((s, id) => s + (quantites[id] ?? 0) * TARIFS[id][palier], 0);
  const billets = tarifs.reduce((n, id) => n + (quantites[id] ?? 0), 0);

  function changer(id: IdTarif, sens: 1 | -1) {
    setQuantites((q) => {
      const actuel = q[id] ?? 0;
      const min = MINIMUM[id] ?? 1;
      let suivant = actuel + sens;
      if (sens === 1 && actuel === 0) suivant = min;
      if (sens === -1 && actuel <= min) suivant = 0;
      const nouveau = { ...q, [id]: suivant };
      // Retirer des adultes peut faire dépasser le plafond d'enfants : on le ramène.
      if (id !== "moins12" && nouveau.moins12) {
        const a = tarifs.reduce((n, t2) => n + (nouveau[t2] ?? 0) * (ADULTES[t2] ?? 0), 0);
        nouveau.moins12 = Math.min(nouveau.moins12, a * ENFANTS_PAR_ADULTE);
      }
      return nouveau;
    });
  }

  return (
    <div className="flex flex-col lg:max-h-[calc(100vh-7.5rem)] bg-[#fffdf8] text-charbon shadow-[0_1px_0_rgba(12,11,10,0.08),0_20px_40px_-24px_rgba(12,11,10,0.45)]">
      <div className="shrink-0 bg-charbon text-papier px-5 py-4 flex items-center justify-between gap-3">
        <p className="font-affiche uppercase text-3xl leading-none pt-1 whitespace-nowrap">{enVente ? t.ui.module : t.ui.bientot}</p>
        {enVente && (
          <Etiquette ton="jaune" className="text-sm md:text-base text-right">
            {t.paliers[PALIERS[palier].id]}
            {finPalier && <span className="block sm:inline font-sans normal-case text-xs sm:ml-1.5">{t.ui.jusquau(finPalier)}</span>}
          </Etiquette>
        )}
      </div>

      {enVente && tarifs.length > 0 && (
        <ul className="min-h-0 overflow-y-auto overscroll-contain divide-y divide-charbon/10">
          {tarifs.map((id) => {
            const montant = TARIFS[id][palier];
            const final = TARIFS[id][PALIERS.length - 1];
            const q = quantites[id] ?? 0;
            const bloque = id === "moins12" && q >= maxEnfants;
            return (
              <li key={id} className="px-5 py-3.5 flex gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-snug">{t.tarifs[id].nom}</p>
                  <p className="mt-1 text-xs leading-relaxed text-fumee">{t.tarifs[id].detail}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <p className="text-right leading-none">
                    {final > montant && (
                      <s className="mr-1.5 text-xs text-fumee" aria-label={`${t.ui.prixFinal} ${prix(final, locale)}`}>
                        {prix(final, locale)}
                      </s>
                    )}
                    <span className="font-affiche text-3xl">{montant === 0 ? t.ui.gratuit : prix(montant, locale)}</span>
                  </p>
                  {enVente && (
                    <div className="flex items-center border-2 border-charbon">
                      <button
                        type="button"
                        onClick={() => changer(id, -1)}
                        disabled={q === 0}
                        aria-label={`${t.ui.retirer} — ${t.tarifs[id].nom}`}
                        className="h-9 w-9 inline-flex items-center justify-center hover:bg-charbon hover:text-papier disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charbon"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <output className="w-9 text-center font-semibold tabular-nums" aria-live="polite">
                        {q}
                      </output>
                      <button
                        type="button"
                        onClick={() => changer(id, 1)}
                        disabled={bloque}
                        aria-label={`${t.ui.ajouter} — ${t.tarifs[id].nom}`}
                        className="h-9 w-9 inline-flex items-center justify-center hover:bg-charbon hover:text-papier disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charbon"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {enVente ? (
        <div className="shrink-0 border-t-2 border-dashed border-charbon px-5 py-5 flex flex-col gap-4">
          <p className="flex items-baseline justify-between">
            <span className="text-sm uppercase tracking-[0.08em] text-fumee">
              {t.ui.total}
              {billets > 0 && ` · ${billets}`}
            </span>
            <span className="font-affiche text-4xl leading-none">{prix(total, locale)}</span>
          </p>
          <button
            type="button"
            disabled={billets === 0}
            className={cn(
              "w-full font-affiche uppercase text-xl leading-none px-5 pt-4 pb-3.5 transition-colors duration-(--duree-ui)",
              "bg-jaune text-charbon hover:bg-gold-300 disabled:bg-charbon/10 disabled:text-charbon/40",
            )}
          >
            {t.ui.continuer}
          </button>
          {APERCU && !SALON.billetterieOuverte && (
            <p className="text-xs text-fumee flex items-center gap-2">
              <Etiquette ton="contour" className="text-xs md:text-xs text-braise">
                {t.ui.apercu}
              </Etiquette>
              {t.ui.apercuNote}
            </p>
          )}
        </div>
      ) : (
        <div className="shrink-0 bg-charbon text-papier px-5 py-6 flex flex-col gap-4">
          <p className="font-affiche uppercase text-3xl leading-none text-jaune">
            {PASS[pass].ouvert ? t.ui.ouvertureProchaine : t.ui.foodAlerte}
          </p>
          <AlerteOuverture />
        </div>
      )}
    </div>
  );
}
