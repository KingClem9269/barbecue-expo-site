import Image from "next/image";
import { useLocale } from "next-intl";
import Tampon from "@/components/geste/Tampon";
import Bouton from "@/components/marque/Bouton";
import Etiquette from "@/components/marque/Etiquette";
import Ticket from "@/components/marque/Ticket";
import { BILLET_GROUPE, prix, type PhaseTarif } from "@/lib/billets";
import { SALON } from "@/lib/salon";

/**
 * Le billet Groupe & CSE sur /billetterie : ses trois tarifs sur un vrai
 * billet, tamponné « nominatif ». Achat en ligne par carte dans le module
 * Weezevent, qui impose le minimum de billets et demande le nom de chaque
 * participant. Tant que la vente n'est pas ouverte, le bouton mène à
 * l'alerte d'ouverture.
 */

const N = BILLET_GROUPE.minimum;

const UI: Record<
  string,
  {
    titre: string;
    minimum: string;
    texte: string;
    nomBillet: string;
    unite: string;
    nominatif: string;
    phases: Record<PhaseTarif, string>;
    alerte: string;
    commander: string;
  }
> = {
  fr: {
    titre: "Groupes & CSE",
    minimum: `Dès ${N} billets`,
    texte: `CSE, entreprises, associations, clubs, bandes d'amis : dès ${N} billets, un tarif dédié, à commander et payer en ligne par carte bancaire. Le nom et le prénom de chaque participant sont demandés à la commande : préparez votre liste.`,
    nomBillet: "Billet Groupe & CSE",
    unite: "le billet",
    nominatif: "Nominatif",
    phases: { earlyBird: "Early bird", prevente: "Prévente", final: "Tarif final" },
    alerte: "M'alerter à l'ouverture",
    commander: "Commander en ligne",
  },
  en: {
    titre: "Group tickets",
    minimum: `From ${N} tickets`,
    texte: `Works councils, companies, associations, clubs, groups of friends: from ${N} tickets, a dedicated rate, ordered and paid online by card. The first and last name of each attendee is requested when ordering, so have your list ready.`,
    nomBillet: "Group ticket",
    unite: "per ticket",
    nominatif: "Named",
    phases: { earlyBird: "Early bird", prevente: "Pre-sale", final: "Final price" },
    alerte: "Get notified",
    commander: "Order online",
  },
  es: {
    titre: "Entradas de grupo",
    minimum: `Desde ${N} entradas`,
    texte: `Comités de empresa, empresas, asociaciones, clubes, grupos de amigos: desde ${N} entradas, una tarifa especial que se compra y paga en línea con tarjeta. Al hacer el pedido se pide el nombre y apellido de cada participante: tenga su lista a mano.`,
    nomBillet: "Entrada de grupo",
    unite: "la entrada",
    nominatif: "Nominativa",
    phases: { earlyBird: "Early bird", prevente: "Preventa", final: "Tarifa final" },
    alerte: "Avisarme de la apertura",
    commander: "Comprar en línea",
  },
  de: {
    titre: "Gruppentickets",
    minimum: `Ab ${N} Tickets`,
    texte: `Betriebsräte, Unternehmen, Vereine, Clubs, Freundeskreise: Ab ${N} Tickets gilt ein eigener Tarif, online bestellt und per Karte bezahlt. Bei der Bestellung werden Vor- und Nachname jedes Teilnehmers abgefragt – halten Sie Ihre Liste bereit.`,
    nomBillet: "Gruppenticket",
    unite: "pro Ticket",
    nominatif: "Personalisiert",
    phases: { earlyBird: "Early Bird", prevente: "Vorverkauf", final: "Endpreis" },
    alerte: "Benachrichtigt werden",
    commander: "Online bestellen",
  },
  nl: {
    titre: "Groepstickets",
    minimum: `Vanaf ${N} tickets`,
    texte: `Ondernemingsraden, bedrijven, verenigingen, clubs, vriendengroepen: vanaf ${N} tickets geldt een apart tarief, online besteld en betaald met een bankkaart. Bij de bestelling worden de voor- en achternaam van elke deelnemer gevraagd: houd uw lijst bij de hand.`,
    nomBillet: "Groepsticket",
    unite: "per ticket",
    nominatif: "Op naam",
    phases: { earlyBird: "Early bird", prevente: "Voorverkoop", final: "Eindprijs" },
    alerte: "Houd me op de hoogte",
    commander: "Online bestellen",
  },
  pt: {
    titre: "Bilhetes de grupo",
    minimum: `A partir de ${N} bilhetes`,
    texte: `Comissões de trabalhadores, empresas, associações, clubes, grupos de amigos: a partir de ${N} bilhetes, uma tarifa própria, encomendada e paga online com cartão. Na encomenda, são pedidos o nome e o apelido de cada participante: tenha a sua lista à mão.`,
    nomBillet: "Bilhete de grupo",
    unite: "por bilhete",
    nominatif: "Nominativo",
    phases: { earlyBird: "Early bird", prevente: "Pré-venda", final: "Tarifa final" },
    alerte: "Avisar-me da abertura",
    commander: "Comprar online",
  },
  it: {
    titre: "Biglietti di gruppo",
    minimum: `Da ${N} biglietti`,
    texte: `CRAL, aziende, associazioni, club, gruppi di amici: da ${N} biglietti, una tariffa dedicata, da ordinare e pagare online con carta. Al momento dell'ordine vengono chiesti nome e cognome di ogni partecipante: tieni pronta la lista.`,
    nomBillet: "Biglietto di gruppo",
    unite: "a biglietto",
    nominatif: "Nominativo",
    phases: { earlyBird: "Early bird", prevente: "Prevendita", final: "Tariffa finale" },
    alerte: "Avvisami all'apertura",
    commander: "Acquista online",
  },
};

export default function OffreGroupe({ ouverte }: { ouverte: boolean }) {
  const locale = useLocale();
  const ui = UI[locale] || UI.fr;

  return (
    <section
      id="groupes"
      className="scroll-mt-24 bg-papier text-charbon py-16 md:py-24 border-t-2 border-charbon"
      aria-labelledby="groupes-titre"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <Etiquette ton="charbon">{ui.minimum}</Etiquette>
          <h2 id="groupes-titre" className="mt-6 font-affiche font-normal uppercase leading-[0.88] text-5xl md:text-7xl">
            {ui.titre}
          </h2>
          <p className="mt-6 max-w-xl text-fumee text-base md:text-lg leading-relaxed">{ui.texte}</p>
          <div className="mt-8">
            <Bouton href={ouverte ? "#module" : "#alerte"} variante="charbon">
              {ouverte ? ui.commander : ui.alerte}
            </Bouton>
          </div>
        </div>

        <div className="lg:col-span-6 relative max-w-xl w-full lg:justify-self-end">
          <Ticket
            talon={
              <>
                <span className="text-[11px] font-semibold tracking-[0.05em] [writing-mode:vertical-rl] rotate-180">
                  N° {SALON.annee}
                </span>
                <Image src="/b-mark-noir.png" alt="" width={96} height={120} className="w-10 h-auto" />
              </>
            }
          >
            <p className="text-[11px] uppercase tracking-[0.08em]">
              Barbecue Expo {SALON.annee} · {ui.nomBillet}
            </p>
            <dl className="mt-3">
              {BILLET_GROUPE.tarifs.map((t) => (
                <div
                  key={t.phase}
                  className="flex items-baseline justify-between gap-4 border-t-2 border-dashed border-charbon/30 first:border-t-0 py-2.5"
                >
                  <dt className="font-affiche uppercase leading-none text-2xl md:text-3xl">{ui.phases[t.phase]}</dt>
                  <dd className="m-0 flex items-baseline gap-2">
                    <span className="font-affiche leading-none text-4xl md:text-5xl">{prix(t.prix, locale)}</span>
                    <span className="text-[11px] uppercase tracking-[0.04em] text-fumee">{ui.unite}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Ticket>
          <span className="pointer-events-none absolute -bottom-6 left-[6%] mix-blend-multiply" aria-hidden="true">
            <Tampon angle={-7} className="text-braise text-2xl md:text-3xl">
              {ui.nominatif}
            </Tampon>
          </span>
        </div>
      </div>
    </section>
  );
}
