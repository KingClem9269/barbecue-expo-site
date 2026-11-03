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
  /** questions fréquentes propres au pass */
  questions: { q: string; r: string }[];
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
      questions: [
        {
          q: "Le vendredi est-il réservé aux professionnels ?",
          r: "Non : le billet Vendredi Pro & Passionnés est ouvert à tous, au même tarif pour les pros et les particuliers. C'est la journée des conférences, des masterclasses et des sessions pro de la Grill Arena.",
        },
        {
          q: "Mes enfants paient-ils ?",
          r: "Les moins de 12 ans entrent gratuitement avec un adulte payant (4 enfants maximum par adulte), le samedi ou le dimanche : ajoutez leur billet gratuit à votre commande. De 12 à 17 ans, le billet Jeune est à 10 €.",
        },
        {
          q: "Le billet Samedi ou dimanche est-il daté ?",
          r: "Vous choisissez votre journée, samedi 13 ou dimanche 14 mars. Pour les deux jours, le Pass Week-end revient moins cher.",
        },
      ],
    },
    groupes: {
      nom: "Pass Groupes",
      pourQui: "Familles, groupes et CSE : un tarif pensé pour venir nombreux.",
      liste: ["Pass Famille 2 adultes + 2 jeunes", "Groupe & CSE dès 20 places", "Moins de 12 ans"],
      accroche: "Le barbecue, ça se partage. Le salon aussi.",
      questions: [
        {
          q: "J'ai trois enfants, comment faire ?",
          r: "Prenez un Pass Famille et ajoutez le billet qui correspond au troisième : gratuit s'il a moins de 12 ans, billet Jeune s'il a entre 12 et 17 ans.",
        },
        {
          q: "Jusqu'à quand acheter le Pass Famille ?",
          r: "Le Pass Famille est en vente en ligne jusqu'à 7 jours avant le salon. Il n'est jamais vendu sur place.",
        },
        {
          q: "Comment fonctionne le billet Groupe & CSE ?",
          r: "Dès 20 billets par commande. Le nom et le prénom de chaque participant sont demandés à la commande : préparez votre liste. Une journée au choix, samedi ou dimanche.",
        },
      ],
    },
    food: {
      nom: "Pass + Food",
      pourQui: "L'entrée et la street food du salon, réunies dans un seul pass.",
      liste: ["Formule en préparation"],
      accroche: "Venez le ventre vide.",
      questions: [],
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
      questions: [
        {
          q: "Is Friday reserved for professionals?",
          r: "No: the Friday Pro & Enthusiasts ticket is open to everyone, at the same price for trade and public alike. It's the day for talks, masterclasses and pro sessions at the Grill Arena.",
        },
        {
          q: "Do my children need to pay?",
          r: "Children under 12 get in free with a paying adult (up to 4 children per adult) on Saturday or Sunday: just add their free ticket to your order. Ages 12 to 17 need a Youth ticket, at €10.",
        },
        {
          q: "Is the Saturday or Sunday ticket for a set date?",
          r: "You choose your day: Saturday 13 or Sunday 14 March. For both days, the Weekend Pass works out cheaper.",
        },
      ],
    },
    groupes: {
      nom: "Group Pass",
      pourQui: "Families, groups and companies: pricing made for coming together.",
      liste: ["Family Pass 2 adults + 2 youths", "Group & Corporate from 20 tickets", "Under 12"],
      accroche: "Barbecue is made for sharing. So is the show.",
      questions: [
        {
          q: "I have three children. What should I do?",
          r: "Get a Family Pass and add the right ticket for the third child: free if under 12, a Youth ticket if aged 12 to 17.",
        },
        {
          q: "How late can I buy the Family Pass?",
          r: "The Family Pass is on sale online until 7 days before the show. It is never sold on site.",
        },
        {
          q: "How does the Group & Corporate ticket work?",
          r: "From 20 tickets per order. The first and last name of each attendee is requested when ordering, so have your list ready. One day of your choice, Saturday or Sunday.",
        },
      ],
    },
    food: {
      nom: "Pass + Food",
      pourQui: "Entry and the show's street food, together in one pass.",
      liste: ["In the works"],
      accroche: "Come hungry.",
      questions: [],
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
      questions: [
        {
          q: "¿El viernes está reservado a los profesionales?",
          r: "No: la entrada Viernes Pro & Apasionados está abierta a todos, con la misma tarifa para profesionales y particulares. Es el día de las conferencias, las masterclasses y las sesiones pro de la Grill Arena.",
        },
        {
          q: "¿Pagan mis hijos?",
          r: "Los menores de 12 años entran gratis con un adulto que pague entrada (máximo 4 niños por adulto), el sábado o el domingo: añada su entrada gratuita a su pedido. De 12 a 17 años, la entrada Joven cuesta 10 €.",
        },
        {
          q: "¿La entrada Sábado o domingo tiene fecha fija?",
          r: "Usted elige el día: sábado 13 o domingo 14 de marzo. Para los dos días, el Pase Fin de semana sale más barato.",
        },
      ],
    },
    groupes: {
      nom: "Pase Grupos",
      pourQui: "Familias, grupos y empresas: una tarifa pensada para venir en grupo.",
      liste: ["Pase Familia 2 adultos + 2 jóvenes", "Grupo y empresa desde 20 entradas", "Menores de 12 años"],
      accroche: "La barbacoa se comparte. La feria también.",
      questions: [
        {
          q: "Tengo tres hijos, ¿cómo lo hago?",
          r: "Compre un Pase Familia y añada la entrada que corresponda al tercero: gratuita si tiene menos de 12 años, entrada Joven si tiene entre 12 y 17 años.",
        },
        {
          q: "¿Hasta cuándo se puede comprar el Pase Familia?",
          r: "El Pase Familia está a la venta en línea hasta 7 días antes de la feria. Nunca se vende en taquilla.",
        },
        {
          q: "¿Cómo funciona la entrada Grupo y empresa?",
          r: "A partir de 20 entradas por pedido. Al hacer el pedido se pide el nombre y apellido de cada participante: prepare su lista. Un día a elegir, sábado o domingo.",
        },
      ],
    },
    food: {
      nom: "Pase + Food",
      pourQui: "La entrada y la street food de la feria, reunidas en un solo pase.",
      liste: ["Fórmula en preparación"],
      accroche: "Venga con hambre.",
      questions: [],
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
      questions: [
        {
          q: "Ist der Freitag Fachbesuchern vorbehalten?",
          r: "Nein: Das Ticket Freitag Pro & Fans steht allen offen, zum gleichen Preis für Profis und Privatbesucher. Es ist der Tag der Vorträge, Masterclasses und Pro-Sessions in der Grill Arena.",
        },
        {
          q: "Zahlen meine Kinder Eintritt?",
          r: "Kinder unter 12 Jahren haben am Samstag oder Sonntag in Begleitung eines zahlenden Erwachsenen freien Eintritt (maximal 4 Kinder pro Erwachsenem): Fügen Sie ihr kostenloses Ticket Ihrer Bestellung hinzu. Für 12- bis 17-Jährige kostet das Jugendticket 10 €.",
        },
        {
          q: "Gilt das Ticket Samstag oder Sonntag für ein festes Datum?",
          r: "Sie wählen Ihren Tag: Samstag, 13., oder Sonntag, 14. März. Für beide Tage ist der Wochenendpass günstiger.",
        },
      ],
    },
    groupes: {
      nom: "Gruppenpass",
      pourQui: "Familien, Gruppen und Firmen: ein Tarif für alle, die gemeinsam kommen.",
      liste: ["Familienpass 2 Erwachsene + 2 Jugendliche", "Gruppen & Firmen ab 20 Tickets", "Unter 12 Jahren"],
      accroche: "Grillen verbindet. Die Messe auch.",
      questions: [
        {
          q: "Ich habe drei Kinder – wie gehe ich vor?",
          r: "Nehmen Sie einen Familienpass und fügen Sie das passende Ticket für das dritte Kind hinzu: kostenlos unter 12 Jahren, ein Jugendticket zwischen 12 und 17 Jahren.",
        },
        {
          q: "Bis wann kann ich den Familienpass kaufen?",
          r: "Der Familienpass ist bis 7 Tage vor der Messe online erhältlich. Vor Ort wird er nie verkauft.",
        },
        {
          q: "Wie funktioniert das Ticket Gruppen & Firmen?",
          r: "Ab 20 Tickets pro Bestellung. Bei der Bestellung werden Vor- und Nachname jedes Teilnehmers abgefragt: Halten Sie Ihre Liste bereit. Ein Tag nach Wahl, Samstag oder Sonntag.",
        },
      ],
    },
    food: {
      nom: "Pass + Food",
      pourQui: "Eintritt und Street Food der Messe in einem einzigen Pass.",
      liste: ["Angebot in Vorbereitung"],
      accroche: "Kommen Sie hungrig.",
      questions: [],
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
      questions: [
        {
          q: "Is de vrijdag alleen voor professionals?",
          r: "Nee: het ticket Vrijdag Pro & Liefhebbers is voor iedereen, tegen hetzelfde tarief voor professionals en particulieren. Het is de dag van de lezingen, masterclasses en pro-sessies in de Grill Arena.",
        },
        {
          q: "Betalen mijn kinderen?",
          r: "Kinderen onder 12 jaar mogen op zaterdag of zondag gratis naar binnen met een betalende volwassene (maximaal 4 kinderen per volwassene): voeg hun gratis ticket toe aan uw bestelling. Van 12 tot 17 jaar kost het Jongerenticket € 10.",
        },
        {
          q: "Geldt het ticket Zaterdag of zondag voor een vaste datum?",
          r: "U kiest zelf uw dag: zaterdag 13 of zondag 14 maart. Voor beide dagen is de Weekendpass voordeliger.",
        },
      ],
    },
    groupes: {
      nom: "Groepspass",
      pourQui: "Gezinnen, groepen en bedrijven: een tarief om met velen te komen.",
      liste: ["Gezinspass 2 volwassenen + 2 jongeren", "Groep & bedrijf vanaf 20 plaatsen", "Onder 12 jaar"],
      accroche: "Barbecue is om te delen. De beurs ook.",
      questions: [
        {
          q: "Ik heb drie kinderen, hoe doe ik dat?",
          r: "Neem een Gezinspass en voeg het juiste ticket toe voor het derde kind: gratis onder 12 jaar, een Jongerenticket tussen 12 en 17 jaar.",
        },
        {
          q: "Tot wanneer kan ik de Gezinspass kopen?",
          r: "De Gezinspass is online te koop tot 7 dagen voor de beurs. Hij wordt nooit ter plaatse verkocht.",
        },
        {
          q: "Hoe werkt het ticket Groep & bedrijf?",
          r: "Vanaf 20 tickets per bestelling. Bij de bestelling worden de voor- en achternaam van elke deelnemer gevraagd: houd uw lijst klaar. Eén dag naar keuze, zaterdag of zondag.",
        },
      ],
    },
    food: {
      nom: "Pass + Food",
      pourQui: "Toegang en de street food van de beurs, samen in één pass.",
      liste: ["Formule in voorbereiding"],
      accroche: "Kom met een lege maag.",
      questions: [],
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
      questions: [
        {
          q: "A sexta-feira é reservada aos profissionais?",
          r: "Não: o bilhete Sexta Pro & Apaixonados está aberto a todos, ao mesmo preço para profissionais e particulares. É o dia das conferências, das masterclasses e das sessões pro da Grill Arena.",
        },
        {
          q: "Os meus filhos pagam?",
          r: "Os menores de 12 anos entram gratuitamente com um adulto pagante (máximo 4 crianças por adulto), no sábado ou no domingo: adicione o bilhete gratuito deles à sua encomenda. Dos 12 aos 17 anos, o bilhete Jovem custa 10 €.",
        },
        {
          q: "O bilhete Sábado ou domingo tem data marcada?",
          r: "Escolhe o seu dia: sábado 13 ou domingo 14 de março. Para os dois dias, o Passe Fim de semana fica mais barato.",
        },
      ],
    },
    groupes: {
      nom: "Passe Grupos",
      pourQui: "Famílias, grupos e empresas: uma tarifa pensada para vir em grupo.",
      liste: ["Passe Família 2 adultos + 2 jovens", "Grupo e empresa a partir de 20 lugares", "Menores de 12 anos"],
      accroche: "O barbecue é para partilhar. O salão também.",
      questions: [
        {
          q: "Tenho três filhos, como faço?",
          r: "Compre um Passe Família e adicione o bilhete que corresponde ao terceiro: gratuito se tiver menos de 12 anos, bilhete Jovem se tiver entre 12 e 17 anos.",
        },
        {
          q: "Até quando posso comprar o Passe Família?",
          r: "O Passe Família está à venda online até 7 dias antes do salão. Nunca é vendido no local.",
        },
        {
          q: "Como funciona o bilhete Grupo e empresa?",
          r: "A partir de 20 bilhetes por encomenda. Na encomenda, são pedidos o nome e o apelido de cada participante: prepare a sua lista. Um dia à escolha, sábado ou domingo.",
        },
      ],
    },
    food: {
      nom: "Passe + Food",
      pourQui: "A entrada e a street food do salão, reunidas num só passe.",
      liste: ["Fórmula em preparação"],
      accroche: "Venha de estômago vazio.",
      questions: [],
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
      questions: [
        {
          q: "Il venerdì è riservato ai professionisti?",
          r: "No: il biglietto Venerdì Pro & Appassionati è aperto a tutti, alla stessa tariffa per professionisti e privati. È la giornata delle conferenze, delle masterclass e delle sessioni pro della Grill Arena.",
        },
        {
          q: "I miei figli pagano?",
          r: "I bambini sotto i 12 anni entrano gratis con un adulto pagante (massimo 4 bambini per adulto), il sabato o la domenica: aggiungi il loro biglietto gratuito all'ordine. Dai 12 ai 17 anni, il biglietto Giovani costa 10 €.",
        },
        {
          q: "Il biglietto Sabato o domenica ha una data fissa?",
          r: "Scegli tu il giorno: sabato 13 o domenica 14 marzo. Per entrambi i giorni, il Pass Weekend conviene di più.",
        },
      ],
    },
    groupes: {
      nom: "Pass Gruppi",
      pourQui: "Famiglie, gruppi e aziende: una tariffa pensata per venire in tanti.",
      liste: ["Pass Famiglia 2 adulti + 2 ragazzi", "Gruppi & CRAL da 20 posti", "Under 12"],
      accroche: "Il barbecue si condivide. Anche il salone.",
      questions: [
        {
          q: "Ho tre figli, come faccio?",
          r: "Prendi un Pass Famiglia e aggiungi il biglietto adatto al terzo: gratuito se ha meno di 12 anni, biglietto Giovani se ha tra 12 e 17 anni.",
        },
        {
          q: "Fino a quando posso acquistare il Pass Famiglia?",
          r: "Il Pass Famiglia è in vendita online fino a 7 giorni prima del salone. Non è mai venduto in loco.",
        },
        {
          q: "Come funziona il biglietto Gruppi & CRAL?",
          r: "Da 20 biglietti per ordine. Al momento dell'ordine vengono chiesti nome e cognome di ogni partecipante: prepara la tua lista. Un giorno a scelta, sabato o domenica.",
        },
      ],
    },
    food: {
      nom: "Pass + Food",
      pourQui: "L'ingresso e lo street food del salone, riuniti in un solo pass.",
      liste: ["Formula in arrivo"],
      accroche: "Vieni a stomaco vuoto.",
      questions: [],
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
