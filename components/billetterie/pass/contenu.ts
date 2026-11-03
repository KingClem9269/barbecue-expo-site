import type { IdPalier, IdPass, IdTarif } from "@/lib/billets";

/**
 * Les textes des pass et du module de vente de /billetterie, par langue (la
 * présentation du salon est dans salon.ts). Le français fait foi ; une langue
 * absente reprend le français (voir `contenu(locale)`).
 */

export type TextesPass = {
  /** nom affiché dans le module de vente */
  nom: string;
  /** pour qui, en une ligne */
  pourQui: string;
  /** les billets du pass, listés dans le module tant que la vente n'est pas ouverte */
  liste: string[];
  /** accroche, pour la description du lien direct /billetterie/<pass> */
  accroche: string;
};

export type Textes = {
  pass: Record<IdPass, TextesPass>;
  tarifs: Record<IdTarif, { nom: string; detail: string }>;
  paliers: Record<IdPalier, string>;
  ui: {
    jusquau: (date: string) => string;
    des: string;
    gratuit: string;
    bientot: string;
    prendre: string;
    module: string;
    apercu: string;
    apercuNote: string;
    total: string;
    continuer: string;
    ouvertureProchaine: string;
    foodAlerte: string;
    questions: string;
    proQuestion: string;
    proLien: string;
    prixFinal: string;
    ajouter: string;
    retirer: string;
  };
};

const FR: Textes = {
  pass: {
    individuel: {
      nom: "Pass Individuel",
      pourQui: "Seul, à deux, entre amis : un billet par personne.",
      liste: ["Vendredi Pro & Passionnés", "Samedi ou dimanche", "Week-end", "Jeune 12-17 ans", "Moins de 12 ans"],
      accroche: "Trois jours au cœur du feu, au Parc Floral de Paris.",
    },
    groupes: {
      nom: "Pass Groupes",
      pourQui: "Familles, groupes et CSE : un tarif pensé pour venir nombreux.",
      liste: ["Pass Famille 2 adultes + 2 jeunes", "Groupe & CSE dès 20 places", "Moins de 12 ans"],
      accroche: "Le barbecue, ça se partage. Le salon aussi.",
    },
    food: {
      nom: "Pass + Food",
      pourQui: "L'entrée et la street food du salon, réunies dans un seul pass.",
      liste: ["Formule en préparation"],
      accroche: "Venez le ventre vide.",
    },
  },
  tarifs: {
    vendredi: {
      nom: "Vendredi Pro & Passionnés",
      detail: "Vendredi 12 mars : conférences, masterclasses et sessions pro Grill Arena. Tarif unique, pro comme particulier.",
    },
    journee: { nom: "Samedi ou dimanche — Adulte", detail: "Une journée au choix, samedi 13 ou dimanche 14 mars." },
    weekend: { nom: "Pass Week-end", detail: "Accès samedi 13 et dimanche 14 mars." },
    jeune: { nom: "Jeune 12 à 17 ans", detail: "Samedi ou dimanche, prix unique." },
    moins12: {
      nom: "Enfant moins de 12 ans",
      detail: "Gratuit, avec un adulte payant (4 enfants maximum par adulte). Samedi ou dimanche.",
    },
    famille: {
      nom: "Pass Famille — 2 adultes + 2 jeunes",
      detail: "Jeunes de 12 à 17 ans. Une journée au choix, samedi ou dimanche. En vente jusqu'à J-7, jamais sur place.",
    },
    groupe: {
      nom: "Groupe & CSE",
      detail: "Dès 20 places. Une journée au choix, samedi 13 ou dimanche 14 mars. Nom et prénom de chaque participant.",
    },
  },
  paliers: { earlyBird: "Early bird", prevente: "Prévente", dernierAppel: "Dernier appel" },
  ui: {
    jusquau: (date) => `jusqu'au ${date}`,
    des: "dès",
    gratuit: "Gratuit",
    bientot: "Bientôt",
    prendre: "Prendre mes billets",
    module: "Vos billets",
    apercu: "Aperçu",
    apercuNote: "Aperçu interne : le module de vente prendra cette place.",
    total: "Total",
    continuer: "Continuer",
    ouvertureProchaine: "Ouverture prochaine",
    foodAlerte: "Soyez prévenu en premier",
    questions: "Bon à savoir",
    proQuestion: "Exposant, acheteur, presse ?",
    proLien: "Billetterie pro",
    prixFinal: "Dernier appel",
    ajouter: "Ajouter un billet",
    retirer: "Retirer un billet",
  },
};

const EN: Textes = {
  pass: {
    individuel: {
      nom: "Individual Pass",
      pourQui: "Solo, as a couple or with friends: one ticket per person.",
      liste: ["Friday Pro & Enthusiasts", "Saturday or Sunday", "Weekend", "Youth 12-17", "Under 12"],
      accroche: "Three days by the fire, at the Parc Floral de Paris.",
    },
    groupes: {
      nom: "Group Pass",
      pourQui: "Families, groups and companies: pricing made for coming together.",
      liste: ["Family Pass 2 adults + 2 youths", "Group & Corporate from 20 tickets", "Under 12"],
      accroche: "Barbecue is made for sharing. So is the show.",
    },
    food: {
      nom: "Pass + Food",
      pourQui: "Entry and the show's street food, together in one pass.",
      liste: ["In the works"],
      accroche: "Come hungry.",
    },
  },
  tarifs: {
    vendredi: {
      nom: "Friday Pro & Enthusiasts",
      detail: "Friday 12 March: talks, masterclasses and Grill Arena pro sessions. One price for trade and public alike.",
    },
    journee: { nom: "Saturday or Sunday — Adult", detail: "One day of your choice, Saturday 13 or Sunday 14 March." },
    weekend: { nom: "Weekend Pass", detail: "Entry on Saturday 13 and Sunday 14 March." },
    jeune: { nom: "Youth 12 to 17", detail: "Saturday or Sunday, single price." },
    moins12: {
      nom: "Child under 12",
      detail: "Free with a paying adult (up to 4 children per adult). Saturday or Sunday.",
    },
    famille: {
      nom: "Family Pass — 2 adults + 2 youths",
      detail: "Youths aged 12 to 17. One day of your choice, Saturday or Sunday. On sale until 7 days before, never on site.",
    },
    groupe: {
      nom: "Group & Corporate",
      detail: "From 20 tickets. One day of your choice, Saturday 13 or Sunday 14 March. First and last name of each attendee required.",
    },
  },
  paliers: { earlyBird: "Early bird", prevente: "Pre-sale", dernierAppel: "Last call" },
  ui: {
    jusquau: (date) => `until ${date}`,
    des: "from",
    gratuit: "Free",
    bientot: "Coming soon",
    prendre: "Get my tickets",
    module: "Your tickets",
    apercu: "Preview",
    apercuNote: "Internal preview: the ticketing module will go here.",
    total: "Total",
    continuer: "Continue",
    ouvertureProchaine: "On sale soon",
    foodAlerte: "Be the first to know",
    questions: "Good to know",
    proQuestion: "Exhibitor, buyer, press?",
    proLien: "Pro tickets",
    prixFinal: "Last call",
    ajouter: "Add a ticket",
    retirer: "Remove a ticket",
  },
};

const ES: Textes = {
  pass: {
    individuel: {
      nom: "Pase Individual",
      pourQui: "Solo, en pareja o con amigos: una entrada por persona.",
      liste: ["Viernes Pro & Apasionados", "Sábado o domingo", "Fin de semana", "Joven 12-17 años", "Menores de 12 años"],
      accroche: "Tres días junto al fuego, en el Parc Floral de París.",
    },
    groupes: {
      nom: "Pase Grupos",
      pourQui: "Familias, grupos y empresas: una tarifa pensada para venir en grupo.",
      liste: ["Pase Familia 2 adultos + 2 jóvenes", "Grupo y empresa desde 20 entradas", "Menores de 12 años"],
      accroche: "La barbacoa se comparte. La feria también.",
    },
    food: {
      nom: "Pase + Food",
      pourQui: "La entrada y la street food de la feria, reunidas en un solo pase.",
      liste: ["Fórmula en preparación"],
      accroche: "Venga con hambre.",
    },
  },
  tarifs: {
    vendredi: {
      nom: "Viernes Pro & Apasionados",
      detail: "Viernes 12 de marzo: conferencias, masterclasses y sesiones pro de la Grill Arena. Tarifa única, para profesionales y particulares.",
    },
    journee: { nom: "Sábado o domingo — Adulto", detail: "Un día a elegir, sábado 13 o domingo 14 de marzo." },
    weekend: { nom: "Pase Fin de semana", detail: "Acceso el sábado 13 y el domingo 14 de marzo." },
    jeune: { nom: "Joven de 12 a 17 años", detail: "Sábado o domingo, precio único." },
    moins12: {
      nom: "Niño menor de 12 años",
      detail: "Gratis, con un adulto que pague entrada (máximo 4 niños por adulto). Sábado o domingo.",
    },
    famille: {
      nom: "Pase Familia — 2 adultos + 2 jóvenes",
      detail: "Jóvenes de 12 a 17 años. Un día a elegir, sábado o domingo. A la venta hasta 7 días antes, nunca en taquilla.",
    },
    groupe: {
      nom: "Grupo y empresa",
      detail: "Desde 20 entradas. Un día a elegir, sábado 13 o domingo 14 de marzo. Nombre y apellido de cada participante.",
    },
  },
  paliers: { earlyBird: "Early bird", prevente: "Preventa", dernierAppel: "Última llamada" },
  ui: {
    jusquau: (date) => `hasta el ${date}`,
    des: "desde",
    gratuit: "Gratis",
    bientot: "Próximamente",
    prendre: "Comprar mis entradas",
    module: "Sus entradas",
    apercu: "Vista previa",
    apercuNote: "Vista previa interna: aquí irá el módulo de venta.",
    total: "Total",
    continuer: "Continuar",
    ouvertureProchaine: "Próxima apertura",
    foodAlerte: "Sea el primero en saberlo",
    questions: "Conviene saber",
    proQuestion: "¿Expositor, comprador, prensa?",
    proLien: "Entradas Pro",
    prixFinal: "Última llamada",
    ajouter: "Añadir una entrada",
    retirer: "Quitar una entrada",
  },
};

const DE: Textes = {
  pass: {
    individuel: {
      nom: "Einzelpass",
      pourQui: "Allein, zu zweit oder mit Freunden: ein Ticket pro Person.",
      liste: ["Freitag Pro & Fans", "Samstag oder Sonntag", "Wochenende", "Jugend 12–17 Jahre", "Unter 12 Jahren"],
      accroche: "Drei Tage mitten im Feuer, im Parc Floral de Paris.",
    },
    groupes: {
      nom: "Gruppenpass",
      pourQui: "Familien, Gruppen und Firmen: ein Tarif für alle, die gemeinsam kommen.",
      liste: ["Familienpass 2 Erwachsene + 2 Jugendliche", "Gruppen & Firmen ab 20 Tickets", "Unter 12 Jahren"],
      accroche: "Grillen verbindet. Die Messe auch.",
    },
    food: {
      nom: "Pass + Food",
      pourQui: "Eintritt und Street Food der Messe in einem einzigen Pass.",
      liste: ["Angebot in Vorbereitung"],
      accroche: "Kommen Sie hungrig.",
    },
  },
  tarifs: {
    vendredi: {
      nom: "Freitag Pro & Fans",
      detail: "Freitag, 12. März: Vorträge, Masterclasses und Pro-Sessions in der Grill Arena. Einheitspreis für Profis und Privatbesucher.",
    },
    journee: { nom: "Samstag oder Sonntag — Erwachsene", detail: "Ein Tag nach Wahl, Samstag, 13., oder Sonntag, 14. März." },
    weekend: { nom: "Wochenendpass", detail: "Eintritt am Samstag, 13., und Sonntag, 14. März." },
    jeune: { nom: "Jugend 12 bis 17 Jahre", detail: "Samstag oder Sonntag, Einheitspreis." },
    moins12: {
      nom: "Kind unter 12 Jahren",
      detail: "Kostenlos, mit einem zahlenden Erwachsenen (maximal 4 Kinder pro Erwachsenem). Samstag oder Sonntag.",
    },
    famille: {
      nom: "Familienpass — 2 Erwachsene + 2 Jugendliche",
      detail: "Jugendliche von 12 bis 17 Jahren. Ein Tag nach Wahl, Samstag oder Sonntag. Erhältlich bis 7 Tage vorher, nie vor Ort.",
    },
    groupe: {
      nom: "Gruppen & Firmen",
      detail: "Ab 20 Tickets. Ein Tag nach Wahl, Samstag, 13., oder Sonntag, 14. März. Vor- und Nachname jedes Teilnehmers.",
    },
  },
  paliers: { earlyBird: "Early Bird", prevente: "Vorverkauf", dernierAppel: "Letzte Chance" },
  ui: {
    jusquau: (date) => `bis ${date}`,
    des: "ab",
    gratuit: "Kostenlos",
    bientot: "Demnächst",
    prendre: "Tickets sichern",
    module: "Ihre Tickets",
    apercu: "Vorschau",
    apercuNote: "Interne Vorschau: Hier erscheint das Verkaufsmodul.",
    total: "Gesamt",
    continuer: "Weiter",
    ouvertureProchaine: "Bald im Verkauf",
    foodAlerte: "Zuerst informiert werden",
    questions: "Gut zu wissen",
    proQuestion: "Aussteller, Einkäufer, Presse?",
    proLien: "Pro-Tickets",
    prixFinal: "Letzte Chance",
    ajouter: "Ticket hinzufügen",
    retirer: "Ticket entfernen",
  },
};

const NL: Textes = {
  pass: {
    individuel: {
      nom: "Individuele Pass",
      pourQui: "Alleen, met z'n tweeën of met vrienden: één ticket per persoon.",
      liste: ["Vrijdag Pro & Liefhebbers", "Zaterdag of zondag", "Weekend", "Jongeren 12-17 jaar", "Onder 12 jaar"],
      accroche: "Drie dagen in het hart van het vuur, in het Parc Floral de Paris.",
    },
    groupes: {
      nom: "Groepspass",
      pourQui: "Gezinnen, groepen en bedrijven: een tarief om met velen te komen.",
      liste: ["Gezinspass 2 volwassenen + 2 jongeren", "Groep & bedrijf vanaf 20 plaatsen", "Onder 12 jaar"],
      accroche: "Barbecue is om te delen. De beurs ook.",
    },
    food: {
      nom: "Pass + Food",
      pourQui: "Toegang en de street food van de beurs, samen in één pass.",
      liste: ["Formule in voorbereiding"],
      accroche: "Kom met een lege maag.",
    },
  },
  tarifs: {
    vendredi: {
      nom: "Vrijdag Pro & Liefhebbers",
      detail: "Vrijdag 12 maart: lezingen, masterclasses en pro-sessies in de Grill Arena. Eén tarief, voor professionals en particulieren.",
    },
    journee: { nom: "Zaterdag of zondag — Volwassene", detail: "Eén dag naar keuze, zaterdag 13 of zondag 14 maart." },
    weekend: { nom: "Weekendpass", detail: "Toegang op zaterdag 13 en zondag 14 maart." },
    jeune: { nom: "Jongeren 12 tot 17 jaar", detail: "Zaterdag of zondag, vaste prijs." },
    moins12: {
      nom: "Kind onder 12 jaar",
      detail: "Gratis, met een betalende volwassene (maximaal 4 kinderen per volwassene). Zaterdag of zondag.",
    },
    famille: {
      nom: "Gezinspass — 2 volwassenen + 2 jongeren",
      detail: "Jongeren van 12 tot 17 jaar. Eén dag naar keuze, zaterdag of zondag. Te koop tot 7 dagen vooraf, nooit ter plaatse.",
    },
    groupe: {
      nom: "Groep & bedrijf",
      detail: "Vanaf 20 plaatsen. Eén dag naar keuze, zaterdag 13 of zondag 14 maart. Voor- en achternaam van elke deelnemer.",
    },
  },
  paliers: { earlyBird: "Early bird", prevente: "Voorverkoop", dernierAppel: "Laatste kans" },
  ui: {
    jusquau: (date) => `t/m ${date}`,
    des: "vanaf",
    gratuit: "Gratis",
    bientot: "Binnenkort",
    prendre: "Mijn tickets kopen",
    module: "Uw tickets",
    apercu: "Voorbeeld",
    apercuNote: "Interne preview: hier komt de verkoopmodule.",
    total: "Totaal",
    continuer: "Doorgaan",
    ouvertureProchaine: "Binnenkort te koop",
    foodAlerte: "Hoor het als eerste",
    questions: "Goed om te weten",
    proQuestion: "Exposant, inkoper, pers?",
    proLien: "Pro-tickets",
    prixFinal: "Laatste kans",
    ajouter: "Ticket toevoegen",
    retirer: "Ticket verwijderen",
  },
};

const PT: Textes = {
  pass: {
    individuel: {
      nom: "Passe Individual",
      pourQui: "Sozinho, a dois ou entre amigos: um bilhete por pessoa.",
      liste: ["Sexta Pro & Apaixonados", "Sábado ou domingo", "Fim de semana", "Jovem 12-17 anos", "Menores de 12 anos"],
      accroche: "Três dias no coração do fogo, no Parc Floral de Paris.",
    },
    groupes: {
      nom: "Passe Grupos",
      pourQui: "Famílias, grupos e empresas: uma tarifa pensada para vir em grupo.",
      liste: ["Passe Família 2 adultos + 2 jovens", "Grupo e empresa a partir de 20 lugares", "Menores de 12 anos"],
      accroche: "O barbecue é para partilhar. O salão também.",
    },
    food: {
      nom: "Passe + Food",
      pourQui: "A entrada e a street food do salão, reunidas num só passe.",
      liste: ["Fórmula em preparação"],
      accroche: "Venha de estômago vazio.",
    },
  },
  tarifs: {
    vendredi: {
      nom: "Sexta Pro & Apaixonados",
      detail: "Sexta-feira, 12 de março: conferências, masterclasses e sessões pro da Grill Arena. Tarifa única, para profissionais e particulares.",
    },
    journee: { nom: "Sábado ou domingo — Adulto", detail: "Um dia à escolha, sábado 13 ou domingo 14 de março." },
    weekend: { nom: "Passe Fim de semana", detail: "Acesso no sábado 13 e no domingo 14 de março." },
    jeune: { nom: "Jovem dos 12 aos 17 anos", detail: "Sábado ou domingo, preço único." },
    moins12: {
      nom: "Criança com menos de 12 anos",
      detail: "Gratuito, com um adulto pagante (máximo 4 crianças por adulto). Sábado ou domingo.",
    },
    famille: {
      nom: "Passe Família — 2 adultos + 2 jovens",
      detail: "Jovens dos 12 aos 17 anos. Um dia à escolha, sábado ou domingo. À venda até 7 dias antes, nunca no local.",
    },
    groupe: {
      nom: "Grupo e empresa",
      detail: "A partir de 20 lugares. Um dia à escolha, sábado 13 ou domingo 14 de março. Nome e apelido de cada participante.",
    },
  },
  paliers: { earlyBird: "Early bird", prevente: "Pré-venda", dernierAppel: "Última chamada" },
  ui: {
    jusquau: (date) => `até ${date}`,
    des: "desde",
    gratuit: "Gratuito",
    bientot: "Em breve",
    prendre: "Comprar bilhetes",
    module: "Os seus bilhetes",
    apercu: "Pré-visualização",
    apercuNote: "Pré-visualização interna: o módulo de venda ficará aqui.",
    total: "Total",
    continuer: "Continuar",
    ouvertureProchaine: "Abertura em breve",
    foodAlerte: "Seja o primeiro a saber",
    questions: "Bom saber",
    proQuestion: "Expositor, comprador, imprensa?",
    proLien: "Bilhetes Pro",
    prixFinal: "Última chamada",
    ajouter: "Adicionar um bilhete",
    retirer: "Retirar um bilhete",
  },
};

const IT: Textes = {
  pass: {
    individuel: {
      nom: "Pass Individuale",
      pourQui: "Da solo, in coppia o con gli amici: un biglietto a persona.",
      liste: ["Venerdì Pro & Appassionati", "Sabato o domenica", "Weekend", "Giovani 12-17 anni", "Under 12"],
      accroche: "Tre giorni nel cuore del fuoco, al Parc Floral de Paris.",
    },
    groupes: {
      nom: "Pass Gruppi",
      pourQui: "Famiglie, gruppi e aziende: una tariffa pensata per venire in tanti.",
      liste: ["Pass Famiglia 2 adulti + 2 ragazzi", "Gruppi & CRAL da 20 posti", "Under 12"],
      accroche: "Il barbecue si condivide. Anche il salone.",
    },
    food: {
      nom: "Pass + Food",
      pourQui: "L'ingresso e lo street food del salone, riuniti in un solo pass.",
      liste: ["Formula in arrivo"],
      accroche: "Vieni a stomaco vuoto.",
    },
  },
  tarifs: {
    vendredi: {
      nom: "Venerdì Pro & Appassionati",
      detail: "Venerdì 12 marzo: conferenze, masterclass e sessioni pro della Grill Arena. Tariffa unica, per professionisti e privati.",
    },
    journee: { nom: "Sabato o domenica — Adulto", detail: "Un giorno a scelta, sabato 13 o domenica 14 marzo." },
    weekend: { nom: "Pass Weekend", detail: "Ingresso sabato 13 e domenica 14 marzo." },
    jeune: { nom: "Giovani dai 12 ai 17 anni", detail: "Sabato o domenica, prezzo unico." },
    moins12: {
      nom: "Bambino sotto i 12 anni",
      detail: "Gratuito, con un adulto pagante (massimo 4 bambini per adulto). Sabato o domenica.",
    },
    famille: {
      nom: "Pass Famiglia — 2 adulti + 2 ragazzi",
      detail: "Ragazzi dai 12 ai 17 anni. Un giorno a scelta, sabato o domenica. In vendita fino a 7 giorni prima, mai in loco.",
    },
    groupe: {
      nom: "Gruppi & CRAL",
      detail: "Da 20 posti. Un giorno a scelta, sabato 13 o domenica 14 marzo. Nome e cognome di ogni partecipante.",
    },
  },
  paliers: { earlyBird: "Early bird", prevente: "Prevendita", dernierAppel: "Ultima chiamata" },
  ui: {
    jusquau: (date) => `fino al ${date}`,
    des: "da",
    gratuit: "Gratis",
    bientot: "Presto",
    prendre: "Prendi i biglietti",
    module: "I tuoi biglietti",
    apercu: "Anteprima",
    apercuNote: "Anteprima interna: qui comparirà il modulo di vendita.",
    total: "Totale",
    continuer: "Continua",
    ouvertureProchaine: "Apertura a breve",
    foodAlerte: "Scoprilo per primo",
    questions: "Buono a sapersi",
    proQuestion: "Espositore, buyer, stampa?",
    proLien: "Biglietti Pro",
    prixFinal: "Ultima chiamata",
    ajouter: "Aggiungi un biglietto",
    retirer: "Rimuovi un biglietto",
  },
};

const TEXTES: Record<string, Textes> = { fr: FR, en: EN, es: ES, de: DE, nl: NL, pt: PT, it: IT };

export function contenu(locale: string): Textes {
  return TEXTES[locale] || FR;
}
