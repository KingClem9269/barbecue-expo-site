import EcosystemLinks from "@/components/ecosystem/EcosystemLinks";
import Saisie from "@/components/geste/Saisie";
import Etiquette from "@/components/marque/Etiquette";
import { Link } from "@/i18n/navigation";
import { ORDRE_PASS, PALIERS, PASS, palierCourant, prix, prixMini, type IdPass } from "@/lib/billets";
import { SALON, libelleBilletterie, mois } from "@/lib/salon";
import DetailPass from "./DetailPass";
import SelecteurPass, { type CartePass } from "./SelecteurPass";
import { contenu } from "./contenu";

/** Vente 2027 ouverte, ou aperçu interne du module (variable d'environnement). */
const VENTE = SALON.billetterieOuverte || process.env.NEXT_PUBLIC_APERCU_BILLETTERIE === "1";

/**
 * La billetterie grand public, commune à /billetterie et /billetterie/<pass> :
 * un en-tête court, les trois pass en onglets, et le contenu du pass choisi
 * juste en dessous (sans changer de page).
 */
export default function PageBilletterie({ locale, initial }: { locale: string; initial: IdPass }) {
  const t = contenu(locale);
  const palier = palierCourant();
  const fin = PALIERS[palier].fin;
  const finPalier = fin
    ? new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", timeZone: "Europe/Paris" }).format(new Date(fin))
    : null;

  const cartes: CartePass[] = ORDRE_PASS.map((id) => {
    const mini = VENTE && PASS[id].ouvert ? prixMini(id, palier) : null;
    return {
      id,
      nom: t.pass[id].nom,
      pourQui: t.pass[id].pourQui,
      photo: t.pass[id].carte.src,
      prix: mini !== null ? prix(mini, locale) : t.ui.bientot,
      prixLibelle: mini !== null ? t.ui.des : undefined,
      ouvert: PASS[id].ouvert,
    };
  });

  const panneaux = Object.fromEntries(
    ORDRE_PASS.map((id) => [id, <DetailPass key={id} pass={id} locale={locale} palier={palier} />]),
  ) as Record<IdPass, React.ReactNode>;

  return (
    <div className="bg-papier text-charbon">
      {/* pt = hauteur de la navigation fixe */}
      <section className="bg-charbon text-papier pt-[76px] md:pt-[82px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-6 md:pt-10 pb-6 md:pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs md:text-sm uppercase tracking-[0.08em] text-papier/75">
              {SALON.jours} {mois(locale)} {SALON.annee} · {SALON.lieu.join(" ")}
            </p>
            <Saisie
              as="h1"
              mode="chargement"
              className="font-affiche font-normal uppercase leading-[0.82] text-jaune text-[clamp(3rem,7vw,5.5rem)]"
            >
              {libelleBilletterie(locale)}
            </Saisie>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:pb-1.5">
            {VENTE && finPalier && (
              <>
                <Etiquette ton="jaune">{t.paliers[PALIERS[palier].id]}</Etiquette>
                <span className="text-papier/85 text-sm md:text-base">{t.ui.jusquau(finPalier)}</span>
              </>
            )}
            <span className="hidden md:inline text-papier/30" aria-hidden>
              ·
            </span>
            <Link
              href="/billetterie/pro-b2b"
              className="lien-marque text-sm md:text-base font-semibold text-papier/85 hover:text-jaune"
            >
              {t.ui.proLien}
            </Link>
          </div>
        </div>
      </section>

      <SelecteurPass cartes={cartes} panneaux={panneaux} initial={initial} libelleBientot={t.ui.bientot} />

      <section className="pb-14 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <EcosystemLinks locale={locale} items={["fest", "piment"]} />
        </div>
      </section>
    </div>
  );
}
