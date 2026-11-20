"use client";

/**
 * /presentation-exposants : la page où arrivent les campagnes (Meta,
 * LinkedIn…), d'après la maquette de Pierre. Le plus important d'abord :
 *   1. l'accroche et le bouton « Composer mon stand » ;
 *   2. l'e-mail, puis le configurateur de stand qui se déplie sur place et le
 *      devis court (ConfigurateurStand.tsx) ;
 *   3. « Pourquoi exposer » et les marques déjà inscrites ;
 *   4. toute la présentation du salon, en lecture libre (PresentationSalon.tsx) ;
 *   5. le contact.
 * Pas de catalogue détaillé ici (options, communication, sponsoring) : il reste
 * sur la page des commerciaux (/pres-exposants, CatalogueClient.tsx), qui
 * rappellent chaque demande de devis.
 */

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { CHIFFRES, nombre } from "@/lib/chiffres";
import { pousser } from "@/lib/mesure";
import ConfigurateurStand, { FIN_DE_PAGE } from "./ConfigurateurStand";
import { EstimatorProvider } from "./Estimator";
import PresentationSalon from "./PresentationSalon";
import { LangToggle } from "./blocs";
import { LangContext, translate, isLang, useT, type Lang } from "./i18n";

const AFFICHE = { fontFamily: "SansPlomb-98, 'Arial Narrow', sans-serif" } as const;
/** Sélection proposée à l'ouverture du configurateur : le prix s'affiche tout de suite. */
const STAND_DE_DEPART = { sqm: 9, zone: "A", rangeKey: "argent" } as const;

export type LogoExposant = { nom: string; src: string };

export default function PageCampagnes({ logos }: { logos: LogoExposant[] }) {
  const locale = useLocale();
  // La langue de la page est celle de l'URL : les drapeaux changent d'URL
  // (/en/presentation-exposants…) pour que toute la page suive.
  const lang: Lang = isLang(locale) ? locale : "fr";
  const router = useRouter();
  const pathname = usePathname();
  const setLang = (l: Lang) => router.replace(pathname, { locale: l, scroll: false });
  const t = useMemo(() => (fr: string) => translate(lang, fr), [lang]);
  // Voir scriptHautDePage (haut-de-page.ts) : ne s'applique qu'à cette page.
  useEffect(() => {
    history.scrollRestoration = "manual";
    return () => { history.scrollRestoration = "auto"; };
  }, []);
  const surface = CHIFFRES.surfaceInterieure2027 + CHIFFRES.surfaceExterieure2027;

  return (
    <LangContext.Provider value={{ lang, t }}>
    <EstimatorProvider storageKey="bbq-stand-v1" initial={STAND_DE_DEPART}>
    <article className="bg-cream-50">
      <Menu lang={lang} setLang={setLang} />

      {/* ───────────── L'accroche ───────────── */}
      <section className="bg-black text-cream-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-9 pb-10 md:pt-12 md:pb-12">
          <p className="text-gold-500 text-xs md:text-sm uppercase tracking-widest font-extrabold">{t("Exposer · 12-13-14 mars 2027 · Parc Floral de Paris")}</p>
          <h1 className="mt-3 text-5xl sm:text-7xl lg:text-8xl leading-[0.9] uppercase max-w-5xl" style={AFFICHE}>{t("Exposez là où le barbecue se choisit.")}</h1>
          <p className="mt-5 text-lg md:text-xl leading-snug max-w-xl">
            {t("Choisissez votre zone, votre surface et votre aménagement : le prix s'affiche tout de suite et votre devis part par e-mail.")}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href="#stand"
              onClick={() => pousser({ event: "hero_cta_click", emplacement: "haut" })}
              className="group inline-flex items-center gap-2 min-h-13 rounded-md bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 font-extrabold text-lg transition-colors"
            >
              {t("Composer mon stand")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} aria-hidden="true" />
            </a>
            <ul className="flex flex-wrap gap-2 text-sm font-bold">
              {[
                `${nombre(CHIFFRES.marques2027, lang)} ${t("marques")}`,
                `${nombre(CHIFFRES.pays2027, lang)} ${t("pays")}`,
                `${nombre(surface, lang)} m²`,
              ].map((c) => <li key={c} className="px-3 py-1.5 rounded-full border border-gold-500">{c}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <ConfigurateurStand />

      {/* ───────────── Pourquoi exposer ───────────── */}
      <section id="pourquoi" className="scroll-mt-16 bg-cream-100 text-ink-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <h2 className="text-4xl sm:text-5xl leading-[0.95] uppercase" style={AFFICHE}>{t("Pourquoi exposer")}</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              ["1 visiteur sur 3", "achète son barbecue sur le salon."],
              ["Testé, goûté, vendu", "Démonstrations en conditions réelles et achat direct sur votre stand."],
              ["Début de saison", "Les 12, 13 et 14 mars 2027, à l'ouverture de la saison barbecue."],
            ].map(([titre, texte]) => (
              <div key={titre} className="bg-white rounded-lg p-5 md:p-6">
                <h3 className="text-3xl md:text-4xl leading-none uppercase" style={AFFICHE}>{t(titre)}</h3>
                <p className="mt-2 text-base leading-relaxed">{t(texte)}</p>
              </div>
            ))}
          </div>
          {logos.length > 0 && (
            <>
              <h3 className="[font-family:inherit] mt-9 text-lg font-extrabold">{t("Ils exposent en 2027")}</h3>
              <ul className="mt-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {logos.map((l) => (
                  <li key={l.nom} className="relative h-16 md:h-20 bg-white rounded-md border border-ink-900/10">
                    <Image src={l.src} alt={l.nom} fill sizes="(max-width: 640px) 30vw, (max-width: 1024px) 22vw, 190px" className="object-contain p-2.5 md:p-3" />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* ───────────── La présentation du salon, en lecture libre ───────────── */}
      <PresentationSalon />

      {/* ───────────── Contact ───────────── */}
      <section id="contact" className="scroll-mt-16 bg-black text-cream-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-14 flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <div>
            <h2 className="text-gold-500 text-4xl sm:text-5xl leading-[0.95] uppercase" style={AFFICHE}>{t("Une question avant de réserver ?")}</h2>
            <p className="mt-2 text-base md:text-lg">{t("Chaque demande de devis est rappelée par un conseiller sous 48 h.")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#stand"
              onClick={() => pousser({ event: "hero_cta_click", emplacement: "bas" })}
              className="inline-flex items-center gap-2 min-h-13 rounded-md bg-gold-500 hover:bg-gold-300 text-ink-950 px-5 font-extrabold transition-colors"
            >
              {t("Composer mon stand")} <ArrowRight className="w-5 h-5" strokeWidth={2.5} aria-hidden="true" />
            </a>
            <a href="tel:+33983901615" className="inline-flex items-center gap-2 min-h-13 rounded-md border-2 border-gold-500 px-5 font-extrabold hover:bg-gold-500 hover:text-ink-950 transition-colors">
              <Phone className="w-4 h-4" aria-hidden="true" /> 09 83 90 16 15
            </a>
            <a href="mailto:info@barbecue-expo.fr" className="inline-flex items-center gap-2 min-h-13 rounded-md border-2 border-gold-500 px-5 font-extrabold hover:bg-gold-500 hover:text-ink-950 transition-colors">
              <Mail className="w-4 h-4" aria-hidden="true" /> info@barbecue-expo.fr
            </a>
          </div>
        </div>
      </section>
      <div id={FIN_DE_PAGE} aria-hidden="true" />
    </article>
    </EstimatorProvider>
    </LangContext.Provider>
  );
}

/** Barre de la page : elle remplace le menu du site (voir DesktopNav). */
function Menu({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const { t } = useT();
  const liens = [
    { id: "stand", label: "Composer mon stand" },
    { id: "pourquoi", label: "Le salon" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <div className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-cream-50/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex items-center gap-3 sm:gap-4">
        <span className="hidden sm:block text-gold-500 text-lg leading-none uppercase shrink-0" style={AFFICHE}>Barbecue Expo</span>
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto" aria-label={t("Exposer")}>
          {liens.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="px-3 py-1.5 rounded-full text-cream-50/85 hover:text-gold-500 hover:bg-cream-50/5 text-xs uppercase tracking-widest font-semibold whitespace-nowrap transition-colors">
              {t(l.label)}
            </a>
          ))}
        </nav>
        <div className="ml-auto shrink-0"><LangToggle lang={lang} setLang={setLang} /></div>
      </div>
    </div>
  );
}
