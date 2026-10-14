import { getLocale } from "next-intl/server";
import PageBilletterie from "@/components/billetterie/pass/PageBilletterie";
import { buildMetadata } from "@/lib/seo";
import { SALON, libelleBilletterie } from "@/lib/salon";

/**
 * Billetterie grand public : un en-tête court, les trois pass en onglets
 * (Individuel, Groupes, + Food) et le contenu du pass choisi juste en
 * dessous, avec son module de vente (components/billetterie/pass). Les prix
 * suivent le palier en cours (lib/billets.ts) : page régénérée toutes les heures.
 */

export const revalidate = 3600;

const UI: Record<
  string,
  {
    ouverte: string;
    proQuestion: string;
    proLien: string;
    metaAttente: string;
  }
> = {
  fr: {
    ouverte:
      "Billetterie Barbecue Expo 2027 (12-14 mars, Parc Floral de Paris) : Pass Individuel, Pass Groupes (familles, groupes et CSE) et bientôt le Pass + Food. Early bird jusqu'au 31 décembre 2026.",
    proQuestion: "Vous êtes professionnel ?",
    proLien: "Billetterie pro",
    metaAttente:
      "Billetterie de Barbecue Expo 2027 (12-14 mars, Parc Floral de Paris) : ouverture prochaine. Inscrivez-vous pour être prévenu de l'ouverture.",
  },
  en: {
    ouverte:
      "Barbecue Expo 2027 tickets (March 12-14, Parc Floral de Paris): Individual Pass, Group Pass (families, groups and companies) and, coming soon, the Pass + Food. Early bird until December 31, 2026.",
    proQuestion: "Trade visitor?",
    proLien: "Pro tickets",
    metaAttente:
      "Barbecue Expo 2027 tickets (March 12-14, Parc Floral de Paris): on sale soon. Sign up to be notified when sales open.",
  },
  es: {
    ouverte:
      "Entradas de Barbecue Expo 2027 (12-14 de marzo, Parc Floral de París): Pase Individual, Pase Grupos (familias, grupos y empresas) y, próximamente, el Pase + Food. Early bird hasta el 31 de diciembre de 2026.",
    proQuestion: "¿Es profesional?",
    proLien: "Entradas Pro",
    metaAttente:
      "Entradas de Barbecue Expo 2027 (12-14 de marzo, Parc Floral de París): próxima apertura. Inscríbase para recibir el aviso.",
  },
  de: {
    ouverte:
      "Tickets für Barbecue Expo 2027 (12.–14. März, Parc Floral de Paris): Einzelpass, Gruppenpass (Familien, Gruppen und Firmen) und demnächst der Pass + Food. Early Bird bis 31. Dezember 2026.",
    proQuestion: "Fachbesucher?",
    proLien: "Pro-Tickets",
    metaAttente:
      "Tickets für Barbecue Expo 2027 (12.–14. März, Parc Floral de Paris): bald im Verkauf. Melden Sie sich an, um benachrichtigt zu werden.",
  },
  nl: {
    ouverte:
      "Tickets voor Barbecue Expo 2027 (12-14 maart, Parc Floral de Paris): Individuele Pass, Groepspass (gezinnen, groepen en bedrijven) en binnenkort de Pass + Food. Early bird t/m 31 december 2026.",
    proQuestion: "Professional?",
    proLien: "Pro-tickets",
    metaAttente:
      "Tickets voor Barbecue Expo 2027 (12-14 maart, Parc Floral de Paris): binnenkort te koop. Schrijf u in om op de hoogte te blijven.",
  },
  pt: {
    ouverte:
      "Bilhetes Barbecue Expo 2027 (12-14 de março, Parc Floral de Paris): Passe Individual, Passe Grupos (famílias, grupos e empresas) e, em breve, o Passe + Food. Early bird até 31 de dezembro de 2026.",
    proQuestion: "É profissional?",
    proLien: "Bilhetes Pro",
    metaAttente:
      "Bilhetes Barbecue Expo 2027 (12-14 de março, Parc Floral de Paris): abertura em breve. Inscreva-se para ser avisado.",
  },
  it: {
    ouverte:
      "Biglietti Barbecue Expo 2027 (12-14 marzo, Parc Floral de Paris): Pass Individuale, Pass Gruppi (famiglie, gruppi e aziende) e, presto, il Pass + Food. Early bird fino al 31 dicembre 2026.",
    proQuestion: "Sei un professionista?",
    proLien: "Biglietti Pro",
    metaAttente:
      "Biglietti Barbecue Expo 2027 (12-14 marzo, Parc Floral de Paris): apertura a breve. Iscriviti per essere avvisato.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = UI[locale] || UI.fr;
  return buildMetadata(locale, "/billetterie", {
    title: `${libelleBilletterie(locale)} — Barbecue Expo ${SALON.annee}`,
    description: SALON.billetterieOuverte ? ui.ouverte : ui.metaAttente,
  });
}

export default async function BilletteriePage() {
  const locale = await getLocale();
  return <PageBilletterie locale={locale} initial="individuel" />;
}
