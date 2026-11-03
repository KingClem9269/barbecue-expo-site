"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { ChevronDown, Minus, Plus } from "lucide-react";
import AlerteOuverture from "@/components/billetterie/AlerteOuverture";
import Etiquette from "@/components/marque/Etiquette";
import { ORDRE_PASS, PALIERS, PASS, TARIFS, prix, prixMini, type IdPass, type IdTarif } from "@/lib/billets";
import { SALON } from "@/lib/salon";
import { cn } from "@/lib/utils";
import { contenu } from "./contenu";

/**
 * Le module de vente de /billetterie, en colonne (à droite sur ordinateur,
 * sous la description sur mobile) : les trois pass en accordéon, le pass
 * ouvert déplie ses tarifs au prix du palier en cours. L'adresse suit le pass
 * ouvert (/billetterie/<pass>) pour qu'on puisse en partager le lien.
 *
 * - Pass pas encore en vente (+ Food) ou vente 2027 pas ouverte : le pass
 *   déplie seulement la liste de ses billets, et le pied du module annonce
 *   « Ouverture prochaine » avec l'alerte.
 * - Aperçu interne (NEXT_PUBLIC_APERCU_BILLETTERIE=1) : un module factice,
 *   avec quantités et total, à la place du futur widget de vente.
 */

const APERCU = process.env.NEXT_PUBLIC_APERCU_BILLETTERIE === "1";
const VENTE = SALON.billetterieOuverte || APERCU;

/** billets minimum par commande, par tarif */
const MINIMUM: Partial<Record<IdTarif, number>> = { groupe: 20 };
/** adultes payants que représente un billet, pour les moins de 12 ans */
const ADULTES: Partial<Record<IdTarif, number>> = { journee: 1, weekend: 1, famille: 2, groupe: 1 };
const ENFANTS_PAR_ADULTE = 4;

export default function ModuleBillets({ initial, palier }: { initial: IdPass; palier: number }) {
  const locale = useLocale();
  const t = contenu(locale);
  const [choisi, setChoisi] = useState<IdPass>(initial);
  const [quantites, setQuantites] = useState<Partial<Record<IdTarif, number>>>({});
  const tarifs = PASS[choisi].tarifs;
  const enVente = PASS[choisi].ouvert && VENTE;

  const fin = PALIERS[palier].fin;
  const finPalier = fin
    ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", timeZone: "Europe/Paris" }).format(new Date(fin))
    : null;

  const adultes = tarifs.reduce((n, id) => n + (quantites[id] ?? 0) * (ADULTES[id] ?? 0), 0);
  const maxEnfants = adultes * ENFANTS_PAR_ADULTE;
  const total = tarifs.reduce((s, id) => s + (quantites[id] ?? 0) * TARIFS[id][palier], 0);
  const billets = tarifs.reduce((n, id) => n + (quantites[id] ?? 0), 0);

  function choisir(id: IdPass) {
    if (id === choisi) return;
    setChoisi(id);
    setQuantites({});
    // /billetterie, /en/billetterie… → …/billetterie/<pass>, sans recharger.
    const base = window.location.pathname.replace(/\/billetterie(\/[^/]*)?\/?$/, "/billetterie");
    window.history.replaceState(null, "", `${base}/${id}`);
  }

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
        <p className="font-affiche uppercase text-3xl leading-none pt-1 whitespace-nowrap">{t.ui.module}</p>
        {VENTE && (
          <Etiquette ton="jaune" className="text-sm md:text-base text-right">
            {t.paliers[PALIERS[palier].id]}
            {finPalier && <span className="block sm:inline font-sans normal-case text-xs sm:ml-1.5">{t.ui.jusquau(finPalier)}</span>}
          </Etiquette>
        )}
      </div>

      <div className="min-h-0 overflow-y-auto overscroll-contain divide-y divide-charbon/10">
        {ORDRE_PASS.map((id) => {
          const ouvert = id === choisi;
          const mini = VENTE && PASS[id].ouvert ? prixMini(id, palier) : null;
          return (
            <div key={id} className={cn("transition-colors duration-(--duree-ui)", ouvert && "bg-jaune/15")}>
              <button
                type="button"
                onClick={() => choisir(id)}
                aria-expanded={ouvert}
                aria-controls={`pass-${id}`}
                className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-jaune/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-charbon"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-affiche uppercase text-2xl leading-none pt-0.5">{t.pass[id].nom}</span>
                  <span className="mt-1.5 block text-xs leading-relaxed text-fumee">{t.pass[id].pourQui}</span>
                </span>
                {mini !== null ? (
                  <span className="shrink-0 text-right leading-none">
                    <span className="block text-[0.65rem] uppercase tracking-[0.08em] text-fumee">{t.ui.des}</span>
                    <span className="font-affiche text-2xl">{prix(mini, locale)}</span>
                  </span>
                ) : (
                  !PASS[id].ouvert && (
                    <Etiquette ton="charbon" className="shrink-0 text-xs md:text-sm">
                      {t.ui.bientot}
                    </Etiquette>
                  )
                )}
                <ChevronDown
                  aria-hidden
                  className={cn("h-5 w-5 shrink-0 transition-transform duration-(--duree-ui)", ouvert && "rotate-180")}
                  strokeWidth={2.5}
                />
              </button>

              {ouvert && (
                <div id={`pass-${id}`}>
                  {enVente && tarifs.length > 0 ? (
                    <ul className="divide-y divide-charbon/10 border-t border-charbon/10 bg-[#fffdf8]">
                      {tarifs.map((tarif) => {
                        const montant = TARIFS[tarif][palier];
                        const final = TARIFS[tarif][PALIERS.length - 1];
                        const q = quantites[tarif] ?? 0;
                        const bloque = tarif === "moins12" && q >= maxEnfants;
                        return (
                          <li key={tarif} className="px-5 py-3.5 flex gap-4">
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold leading-snug">{t.tarifs[tarif].nom}</p>
                              <p className="mt-1 text-xs leading-relaxed text-fumee">{t.tarifs[tarif].detail}</p>
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
                              <div className="flex items-center border-2 border-charbon">
                                <button
                                  type="button"
                                  onClick={() => changer(tarif, -1)}
                                  disabled={q === 0}
                                  aria-label={`${t.ui.retirer} — ${t.tarifs[tarif].nom}`}
                                  className="h-9 w-9 inline-flex items-center justify-center hover:bg-charbon hover:text-papier disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charbon"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <output className="w-9 text-center font-semibold tabular-nums" aria-live="polite">
                                  {q}
                                </output>
                                <button
                                  type="button"
                                  onClick={() => changer(tarif, 1)}
                                  disabled={bloque}
                                  aria-label={`${t.ui.ajouter} — ${t.tarifs[tarif].nom}`}
                                  className="h-9 w-9 inline-flex items-center justify-center hover:bg-charbon hover:text-papier disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-charbon"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <ul className="px-5 pb-4 -mt-1 flex flex-col gap-1.5 text-sm">
                      {t.pass[id].liste.map((billet) => (
                        <li key={billet} className="flex items-baseline gap-2">
                          <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-[-0.15em] bg-braise" />
                          {billet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

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
            {PASS[choisi].ouvert ? t.ui.ouvertureProchaine : t.ui.foodAlerte}
          </p>
          <AlerteOuverture />
        </div>
      )}
    </div>
  );
}
