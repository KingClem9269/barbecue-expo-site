import type { IdPalier, IdPass, IdTarif } from "@/lib/billets";

/**
 * Les textes de la billetterie en trois pass, par langue. Le français fait
 * foi ; une langue absente reprend le français (voir `contenu(locale)`).
 */

export type Photo = { src: string; legende: string; portrait?: boolean };

export type TextesPass = {
  /** nom affiché sur la carte et en titre de page */
  nom: string;
  /** pour qui, en une ligne */
  pourQui: string;
  /** les billets du pass, listés sur la carte */
  liste: string[];
  /** photo de la carte */
  carte: Photo;
  /** accroche de la page */
  accroche: string;
  /** texte incitatif, paragraphe par paragraphe */
  texte: string[];
  /** les temps forts, titre + une phrase */
  tempsForts: { titre: string; texte: string }[];
  photos: Photo[];
  /** questions fréquentes propres au pass */
  questions: { q: string; r: string }[];
};

export type Textes = {
  pass: Record<IdPass, TextesPass>;
  tarifs: Record<IdTarif, { nom: string; detail: string }>;
  paliers: Record<IdPalier, string>;
  ui: {
    titre: string;
    chapeau: string;
    jusquau: (date: string) => string;
    des: string;
    gratuit: string;
    choisir: string;
    bientot: string;
    tousLesPass: string;
    prendre: string;
    module: string;
    apercu: string;
    apercuNote: string;
    total: string;
    continuer: string;
    ouvertureProchaine: string;
    alerteTitre: string;
    foodAlerte: string;
    tempsForts: string;
    enImages: string;
    questions: string;
    proQuestion: string;
    proLien: string;
    prixFinal: string;
    ajouter: string;
    retirer: string;
    video: string;
    chiffres: { visiteurs: string; marques: string; pays: string };
  };
};

const FR: Textes = {
  pass: {
    individuel: {
      nom: "Pass Individuel",
      pourQui: "Seul, à deux, entre amis : un billet par personne.",
      liste: ["Vendredi Pro & Passionnés", "Samedi ou dimanche", "Week-end", "Jeune 12-17 ans", "Moins de 12 ans"],
      carte: { src: "/photos-2026/william-plin-jpc-110426-533a4426.jpg", legende: "Barbecue Expo 2026" },
      accroche: "Trois jours au cœur du feu, au Parc Floral de Paris.",
      texte: [
        "Barbecue Expo, c'est le rendez-vous de tous ceux qui cuisinent au feu : les marques que vous ne voyez qu'en ligne, les pitmasters que vous suivez, et des milliers de passionnés qui parlent cuisson, bois et braise toute la journée.",
        "Venez le vendredi pour les conférences, les masterclasses et les sessions pro de la Grill Arena. Venez le samedi ou le dimanche pour goûter, tester, comparer et repartir avec le barbecue dont vous rêvez. Ou prenez le week-end entier : il y a de quoi.",
      ],
      tempsForts: [
        { titre: "Grill Arena", texte: "Les meilleures équipes s'affrontent en direct ; le champion est couronné le dimanche soir." },
        { titre: "Masterclasses", texte: "Des pitmasters reconnus partagent leurs techniques, en petit comité." },
        { titre: "Les marques", texte: "Les fabricants du monde entier présentent leurs nouveautés : touchez, posez vos questions, comparez." },
        { titre: "Street food", texte: "On ne vient pas au salon du barbecue pour rester sur sa faim." },
      ],
      photos: [
        { src: "/photos-2026/william-plin-jpc-120426-533a8137.jpg", legende: "Grill Arena, édition 2026" },
        { src: "/photos-2026/bbq-expo-014.jpg", legende: "Espace Masterclass, 2026" },
        { src: "/photos-2026/bbq-expo-688.jpg", legende: "Finale continentale US vs Europe, 2026" },
        { src: "/photos-2026/bbq-expo-737.jpg", legende: "Cuisson au feu de bois, 2026" },
        { src: "/photos-2026/william-plin-jpc-110426-533a4660.jpg", legende: "Le feu, 2026" },
        { src: "/photos-2026/bbq-expo-184.jpg", legende: "Sur les stands, 2026" },
      ],
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
      carte: { src: "/photos-2026/william-plin-jpc-110426-533a4353.jpg", legende: "Barbecue Expo 2026" },
      accroche: "Le barbecue, ça se partage. Le salon aussi.",
      texte: [
        "En famille, le Pass Famille fait entrer deux adultes et deux jeunes de 12 à 17 ans pour le prix d'une sortie. Les moins de 12 ans entrent gratuitement : ajoutez simplement leur billet.",
        "CSE, associations, entreprises, clubs : dès 20 places, le billet Groupe & CSE vous fait bénéficier d'un tarif dédié, commandé et payé en ligne. Une sortie d'équipe qui sent bon la braise, à organiser en quelques minutes.",
      ],
      tempsForts: [
        { titre: "Une journée au choix", texte: "Samedi 13 ou dimanche 14 mars, au Parc Floral de Paris." },
        { titre: "Pour tous les âges", texte: "Démonstrations, dégustations, Grill Arena : chacun trouve son feu." },
        { titre: "Simple à organiser", texte: "Commande et paiement en ligne ; pour un groupe, préparez la liste des participants." },
      ],
      photos: [
        { src: "/photos-2026/bbq-expo-404.jpg", legende: "Les allées du salon, 2026" },
        { src: "/photos-2026/william-plin-jpc-110426-533a4353.jpg", legende: "Devant la Grill Arena, 2026" },
        { src: "/photos-2026/bbq-expo-740.jpg", legende: "Démonstration, 2026" },
        { src: "/photos-2026/bbq-expo-403.jpg", legende: "Les stands en extérieur, 2026" },
        { src: "/photos-2026/william-plin-jpc-110426-533a4969.jpg", legende: "Scène de la Grill Arena, 2026" },
        { src: "/photos-2026/bbq-expo-129.jpg", legende: "Sur les stands, 2026" },
      ],
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
      carte: { src: "/photos-2026/bbq-expo-477.jpg", legende: "Barbecue Expo 2026" },
      accroche: "Venez le ventre vide.",
      texte: [
        "On prépare un pass qui réunit votre entrée et la street food du salon : les cuissons longues, les braises, les assiettes des pitmasters, sans sortir le portefeuille à chaque stand.",
        "La formule et les tarifs arrivent bientôt. Laissez votre adresse : vous serez prévenu en premier.",
      ],
      tempsForts: [],
      photos: [
        { src: "/photos-2026/bbq-expo-477.jpg", legende: "Travers fumés, 2026" },
        { src: "/photos-2026/bbq-expo-066.jpg", legende: "Poulpe à la braise, 2026" },
        { src: "/photos-2026/zone-street-food.jpg", legende: "Street food, 2026" },
        { src: "/photos-2026/bbq-expo-441.jpg", legende: "Cuisson longue, 2026" },
        { src: "/photos-2026/bbq-expo-720.jpg", legende: "Découpe, 2026" },
        { src: "/photos-2026/william-plin-jpc-110426-533a4134.jpg", legende: "Assiette du salon, 2026", portrait: true },
      ],
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
    titre: "Billetterie",
    chapeau: "Choisissez votre pass.",
    jusquau: (date) => `jusqu'au ${date}`,
    des: "dès",
    gratuit: "Gratuit",
    choisir: "Choisir ce pass",
    bientot: "Bientôt",
    tousLesPass: "Tous les pass",
    prendre: "Prendre mes billets",
    module: "Vos billets",
    apercu: "Aperçu",
    apercuNote: "Aperçu interne : le module de vente prendra cette place.",
    total: "Total",
    continuer: "Continuer",
    ouvertureProchaine: "Ouverture prochaine",
    alerteTitre: "Soyez prévenu de l'ouverture",
    foodAlerte: "Soyez prévenu en premier",
    tempsForts: "Au programme",
    enImages: "L'édition 2026 en images",
    questions: "Bon à savoir",
    proQuestion: "Exposant, acheteur, presse ?",
    proLien: "Billetterie pro",
    prixFinal: "Dernier appel",
    ajouter: "Ajouter un billet",
    retirer: "Retirer un billet",
    video: "Barbecue Expo en vidéo",
    chiffres: { visiteurs: "visiteurs attendus", marques: "marques", pays: "pays" },
  },
};

/** Les photos d'un pass (mêmes fichiers que le français), légendes traduites. */
function photos(id: IdPass, legendes: string[]): Photo[] {
  return FR.pass[id].photos.map((p, i) => ({ ...p, legende: legendes[i] ?? p.legende }));
}

const EN: Textes = {
  pass: {
    individuel: {
      nom: "Individual Pass",
      pourQui: "Solo, as a couple or with friends: one ticket per person.",
      liste: ["Friday Pro & Enthusiasts", "Saturday or Sunday", "Weekend", "Youth 12-17", "Under 12"],
      carte: FR.pass.individuel.carte,
      accroche: "Three days by the fire, at the Parc Floral de Paris.",
      texte: [
        "Barbecue Expo is where everyone who cooks with fire meets up: the brands you've only ever seen online, the pitmasters you follow, and thousands of enthusiasts talking cooking, wood and embers all day long.",
        "Come on Friday for the talks, masterclasses and pro sessions at the Grill Arena. Come on Saturday or Sunday to taste, test, compare and head home with the barbecue of your dreams. Or make a weekend of it: there's plenty to see.",
      ],
      tempsForts: [
        { titre: "Grill Arena", texte: "The best teams go head to head live; the champion is crowned on Sunday evening." },
        { titre: "Masterclasses", texte: "Renowned pitmasters share their techniques in small groups." },
        { titre: "The brands", texte: "Manufacturers from all over the world show off their latest products: get hands-on, ask questions, compare." },
        { titre: "Street food", texte: "Nobody comes to a barbecue show to leave hungry." },
      ],
      photos: photos("individuel", [
        "Grill Arena, 2026 edition",
        "Masterclass area, 2026",
        "Continental final, USA vs Europe, 2026",
        "Wood-fire cooking, 2026",
        "The fire, 2026",
        "On the stands, 2026",
      ]),
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
      carte: FR.pass.groupes.carte,
      accroche: "Barbecue is made for sharing. So is the show.",
      texte: [
        "For families, the Family Pass gets two adults and two young people aged 12 to 17 in for the price of a day out. Children under 12 go free: just add their ticket.",
        "Works councils, associations, companies, clubs: from 20 tickets, the Group & Corporate ticket gives you a dedicated rate, ordered and paid online. A team outing with the scent of embers, sorted in minutes.",
      ],
      tempsForts: [
        { titre: "One day of your choice", texte: "Saturday 13 or Sunday 14 March, at the Parc Floral de Paris." },
        { titre: "For all ages", texte: "Demos, tastings, the Grill Arena: everyone finds their fire." },
        { titre: "Easy to organise", texte: "Order and pay online; for a group, have your attendee list ready." },
      ],
      photos: photos("groupes", [
        "The show aisles, 2026",
        "In front of the Grill Arena, 2026",
        "Demonstration, 2026",
        "The outdoor stands, 2026",
        "Grill Arena stage, 2026",
        "On the stands, 2026",
      ]),
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
      carte: FR.pass.food.carte,
      accroche: "Come hungry.",
      texte: [
        "We're putting together a pass that combines your entry with the show's street food: low-and-slow cooks, glowing embers, pitmaster plates, without reaching for your wallet at every stand.",
        "Details and prices are coming soon. Leave your email and you'll be the first to know.",
      ],
      tempsForts: [],
      photos: photos("food", [
        "Smoked ribs, 2026",
        "Ember-grilled octopus, 2026",
        "Street food, 2026",
        "Low and slow, 2026",
        "Carving, 2026",
        "A plate at the show, 2026",
      ]),
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
    titre: "Tickets",
    chapeau: "Choose your pass.",
    jusquau: (date) => `until ${date}`,
    des: "from",
    gratuit: "Free",
    choisir: "Choose this pass",
    bientot: "Coming soon",
    tousLesPass: "All passes",
    prendre: "Get my tickets",
    module: "Your tickets",
    apercu: "Preview",
    apercuNote: "Internal preview: the ticketing module will go here.",
    total: "Total",
    continuer: "Continue",
    ouvertureProchaine: "On sale soon",
    alerteTitre: "Get notified when sales open",
    foodAlerte: "Be the first to know",
    tempsForts: "What's on",
    enImages: "The 2026 edition in pictures",
    questions: "Good to know",
    proQuestion: "Exhibitor, buyer, press?",
    proLien: "Pro tickets",
    prixFinal: "Last call",
    ajouter: "Add a ticket",
    retirer: "Remove a ticket",
    video: "Barbecue Expo on video",
    chiffres: { visiteurs: "expected visitors", marques: "brands", pays: "countries" },
  },
};

const ES: Textes = {
  pass: {
    individuel: {
      nom: "Pase Individual",
      pourQui: "Solo, en pareja o con amigos: una entrada por persona.",
      liste: ["Viernes Pro & Apasionados", "Sábado o domingo", "Fin de semana", "Joven 12-17 años", "Menores de 12 años"],
      carte: FR.pass.individuel.carte,
      accroche: "Tres días junto al fuego, en el Parc Floral de París.",
      texte: [
        "Barbecue Expo es la cita de todos los que cocinan con fuego: las marcas que solo ve en internet, los pitmasters a los que sigue y miles de apasionados que hablan de cocción, leña y brasas durante todo el día.",
        "Venga el viernes para las conferencias, las masterclasses y las sesiones pro de la Grill Arena. Venga el sábado o el domingo para probar, comparar y llevarse la barbacoa de sus sueños. O quédese todo el fin de semana: hay de sobra.",
      ],
      tempsForts: [
        { titre: "Grill Arena", texte: "Los mejores equipos compiten en directo; el campeón se corona el domingo por la noche." },
        { titre: "Masterclasses", texte: "Pitmasters reconocidos comparten sus técnicas en grupos reducidos." },
        { titre: "Las marcas", texte: "Fabricantes de todo el mundo presentan sus novedades: toque, pregunte, compare." },
        { titre: "Street food", texte: "Nadie viene a la feria de la barbacoa para quedarse con hambre." },
      ],
      photos: photos("individuel", [
        "Grill Arena, edición 2026",
        "Espacio Masterclass, 2026",
        "Final continental EE. UU. vs Europa, 2026",
        "Cocción a la leña, 2026",
        "El fuego, 2026",
        "En los stands, 2026",
      ]),
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
      carte: FR.pass.groupes.carte,
      accroche: "La barbacoa se comparte. La feria también.",
      texte: [
        "En familia, el Pase Familia permite la entrada a dos adultos y dos jóvenes de 12 a 17 años por el precio de una salida. Los menores de 12 años entran gratis: solo tiene que añadir su entrada.",
        "Comités de empresa, asociaciones, empresas, clubes: desde 20 entradas, la entrada Grupo y empresa le ofrece una tarifa especial, que se compra y paga en línea. Una salida de equipo con aroma a brasa, organizada en pocos minutos.",
      ],
      tempsForts: [
        { titre: "Un día a elegir", texte: "Sábado 13 o domingo 14 de marzo, en el Parc Floral de París." },
        { titre: "Para todas las edades", texte: "Demostraciones, degustaciones, Grill Arena: cada uno encuentra su fuego." },
        { titre: "Fácil de organizar", texte: "Pedido y pago en línea; para un grupo, prepare la lista de participantes." },
      ],
      photos: photos("groupes", [
        "Los pasillos de la feria, 2026",
        "Frente a la Grill Arena, 2026",
        "Demostración, 2026",
        "Los stands al aire libre, 2026",
        "Escenario de la Grill Arena, 2026",
        "En los stands, 2026",
      ]),
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
      carte: FR.pass.food.carte,
      accroche: "Venga con hambre.",
      texte: [
        "Estamos preparando un pase que reúne su entrada y la street food de la feria: cocciones lentas, brasas, platos de pitmasters, sin sacar la cartera en cada stand.",
        "La fórmula y las tarifas llegan pronto. Deje su correo y será el primero en saberlo.",
      ],
      tempsForts: [],
      photos: photos("food", [
        "Costillas ahumadas, 2026",
        "Pulpo a la brasa, 2026",
        "Street food, 2026",
        "Cocción lenta, 2026",
        "Corte, 2026",
        "Un plato de la feria, 2026",
      ]),
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
    titre: "Entradas",
    chapeau: "Elija su pase.",
    jusquau: (date) => `hasta el ${date}`,
    des: "desde",
    gratuit: "Gratis",
    choisir: "Elegir este pase",
    bientot: "Próximamente",
    tousLesPass: "Todos los pases",
    prendre: "Comprar mis entradas",
    module: "Sus entradas",
    apercu: "Vista previa",
    apercuNote: "Vista previa interna: aquí irá el módulo de venta.",
    total: "Total",
    continuer: "Continuar",
    ouvertureProchaine: "Próxima apertura",
    alerteTitre: "Reciba el aviso de apertura",
    foodAlerte: "Sea el primero en saberlo",
    tempsForts: "En el programa",
    enImages: "La edición 2026 en imágenes",
    questions: "Conviene saber",
    proQuestion: "¿Expositor, comprador, prensa?",
    proLien: "Entradas Pro",
    prixFinal: "Última llamada",
    ajouter: "Añadir una entrada",
    retirer: "Quitar una entrada",
    video: "Barbecue Expo en vídeo",
    chiffres: { visiteurs: "visitantes esperados", marques: "marcas", pays: "países" },
  },
};

const DE: Textes = {
  pass: {
    individuel: {
      nom: "Einzelpass",
      pourQui: "Allein, zu zweit oder mit Freunden: ein Ticket pro Person.",
      liste: ["Freitag Pro & Fans", "Samstag oder Sonntag", "Wochenende", "Jugend 12–17 Jahre", "Unter 12 Jahren"],
      carte: FR.pass.individuel.carte,
      accroche: "Drei Tage mitten im Feuer, im Parc Floral de Paris.",
      texte: [
        "Barbecue Expo ist der Treffpunkt für alle, die mit Feuer kochen: die Marken, die Sie sonst nur online sehen, die Pitmaster, denen Sie folgen, und Tausende Fans, die den ganzen Tag über Garen, Holz und Glut fachsimpeln.",
        "Kommen Sie am Freitag für die Vorträge, Masterclasses und Pro-Sessions in der Grill Arena. Kommen Sie am Samstag oder Sonntag zum Probieren, Testen und Vergleichen – und nehmen Sie den Grill Ihrer Träume mit nach Hause. Oder bleiben Sie gleich das ganze Wochenende: Es gibt genug zu entdecken.",
      ],
      tempsForts: [
        { titre: "Grill Arena", texte: "Die besten Teams treten live gegeneinander an; der Champion wird am Sonntagabend gekürt." },
        { titre: "Masterclasses", texte: "Renommierte Pitmaster teilen ihre Techniken in kleiner Runde." },
        { titre: "Die Marken", texte: "Hersteller aus aller Welt zeigen ihre Neuheiten: anfassen, nachfragen, vergleichen." },
        { titre: "Street Food", texte: "Niemand kommt auf eine Grillmesse, um hungrig wieder zu gehen." },
      ],
      photos: photos("individuel", [
        "Grill Arena, Ausgabe 2026",
        "Masterclass-Bereich, 2026",
        "Kontinentalfinale USA vs. Europa, 2026",
        "Kochen über Holzfeuer, 2026",
        "Das Feuer, 2026",
        "An den Ständen, 2026",
      ]),
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
      carte: FR.pass.groupes.carte,
      accroche: "Grillen verbindet. Die Messe auch.",
      texte: [
        "Mit dem Familienpass kommen zwei Erwachsene und zwei Jugendliche von 12 bis 17 Jahren zum Preis eines Familienausflugs hinein. Kinder unter 12 Jahren haben freien Eintritt: Fügen Sie einfach ihr Ticket hinzu.",
        "Betriebsräte, Vereine, Unternehmen, Clubs: Ab 20 Tickets erhalten Sie mit dem Ticket Gruppen & Firmen einen eigenen Tarif, online bestellt und bezahlt. Ein Teamausflug mit Glutduft, in wenigen Minuten organisiert.",
      ],
      tempsForts: [
        { titre: "Ein Tag nach Wahl", texte: "Samstag, 13., oder Sonntag, 14. März, im Parc Floral de Paris." },
        { titre: "Für jedes Alter", texte: "Vorführungen, Verkostungen, Grill Arena: Jeder findet sein Feuer." },
        { titre: "Einfach zu organisieren", texte: "Bestellung und Bezahlung online; für eine Gruppe halten Sie die Teilnehmerliste bereit." },
      ],
      photos: photos("groupes", [
        "Die Messegänge, 2026",
        "Vor der Grill Arena, 2026",
        "Vorführung, 2026",
        "Die Außenstände, 2026",
        "Bühne der Grill Arena, 2026",
        "An den Ständen, 2026",
      ]),
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
      carte: FR.pass.food.carte,
      accroche: "Kommen Sie hungrig.",
      texte: [
        "Wir bereiten einen Pass vor, der Ihren Eintritt und das Street Food der Messe vereint: Low & Slow, Glut, Teller der Pitmaster – ohne an jedem Stand den Geldbeutel zu zücken.",
        "Angebot und Preise folgen in Kürze. Hinterlassen Sie Ihre E-Mail-Adresse: Sie erfahren es zuerst.",
      ],
      tempsForts: [],
      photos: photos("food", [
        "Geräucherte Rippchen, 2026",
        "Oktopus aus der Glut, 2026",
        "Street Food, 2026",
        "Low & Slow, 2026",
        "Tranchieren, 2026",
        "Ein Teller auf der Messe, 2026",
      ]),
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
    titre: "Tickets",
    chapeau: "Wählen Sie Ihren Pass.",
    jusquau: (date) => `bis ${date}`,
    des: "ab",
    gratuit: "Kostenlos",
    choisir: "Diesen Pass wählen",
    bientot: "Demnächst",
    tousLesPass: "Alle Pässe",
    prendre: "Tickets sichern",
    module: "Ihre Tickets",
    apercu: "Vorschau",
    apercuNote: "Interne Vorschau: Hier erscheint das Verkaufsmodul.",
    total: "Gesamt",
    continuer: "Weiter",
    ouvertureProchaine: "Bald im Verkauf",
    alerteTitre: "Zum Verkaufsstart benachrichtigt werden",
    foodAlerte: "Zuerst informiert werden",
    tempsForts: "Programm",
    enImages: "Die Ausgabe 2026 in Bildern",
    questions: "Gut zu wissen",
    proQuestion: "Aussteller, Einkäufer, Presse?",
    proLien: "Pro-Tickets",
    prixFinal: "Letzte Chance",
    ajouter: "Ticket hinzufügen",
    retirer: "Ticket entfernen",
    video: "Barbecue Expo im Video",
    chiffres: { visiteurs: "erwartete Besucher", marques: "Marken", pays: "Länder" },
  },
};

const NL: Textes = {
  pass: {
    individuel: {
      nom: "Individuele Pass",
      pourQui: "Alleen, met z'n tweeën of met vrienden: één ticket per persoon.",
      liste: ["Vrijdag Pro & Liefhebbers", "Zaterdag of zondag", "Weekend", "Jongeren 12-17 jaar", "Onder 12 jaar"],
      carte: FR.pass.individuel.carte,
      accroche: "Drie dagen in het hart van het vuur, in het Parc Floral de Paris.",
      texte: [
        "Barbecue Expo is dé ontmoetingsplek voor iedereen die op vuur kookt: de merken die u alleen online ziet, de pitmasters die u volgt en duizenden liefhebbers die de hele dag praten over garen, hout en gloeiende kolen.",
        "Kom op vrijdag voor de lezingen, masterclasses en pro-sessies in de Grill Arena. Kom op zaterdag of zondag om te proeven, te testen, te vergelijken en naar huis te gaan met de barbecue van uw dromen. Of neem het hele weekend: er is genoeg te beleven.",
      ],
      tempsForts: [
        { titre: "Grill Arena", texte: "De beste teams nemen het live tegen elkaar op; de kampioen wordt zondagavond gekroond." },
        { titre: "Masterclasses", texte: "Gerenommeerde pitmasters delen hun technieken in kleine groepen." },
        { titre: "De merken", texte: "Fabrikanten uit de hele wereld tonen hun nieuwigheden: aanraken, vragen stellen, vergelijken." },
        { titre: "Street food", texte: "Niemand komt naar een barbecuebeurs om met honger naar huis te gaan." },
      ],
      photos: photos("individuel", [
        "Grill Arena, editie 2026",
        "Masterclass-ruimte, 2026",
        "Continentale finale VS vs Europa, 2026",
        "Koken op houtvuur, 2026",
        "Het vuur, 2026",
        "Op de stands, 2026",
      ]),
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
      carte: FR.pass.groupes.carte,
      accroche: "Barbecue is om te delen. De beurs ook.",
      texte: [
        "Met de Gezinspass komen twee volwassenen en twee jongeren van 12 tot 17 jaar binnen voor de prijs van een dagje uit. Kinderen onder 12 jaar mogen gratis naar binnen: voeg gewoon hun ticket toe.",
        "Ondernemingsraden, verenigingen, bedrijven, clubs: vanaf 20 plaatsen krijgt u met het ticket Groep & bedrijf een apart tarief, online besteld en betaald. Een teamuitje met de geur van houtvuur, in een paar minuten geregeld.",
      ],
      tempsForts: [
        { titre: "Eén dag naar keuze", texte: "Zaterdag 13 of zondag 14 maart, in het Parc Floral de Paris." },
        { titre: "Voor alle leeftijden", texte: "Demonstraties, proeverijen, Grill Arena: iedereen vindt zijn vuur." },
        { titre: "Eenvoudig te regelen", texte: "Online bestellen en betalen; voor een groep houdt u de deelnemerslijst klaar." },
      ],
      photos: photos("groupes", [
        "De gangpaden van de beurs, 2026",
        "Voor de Grill Arena, 2026",
        "Demonstratie, 2026",
        "De buitenstands, 2026",
        "Podium van de Grill Arena, 2026",
        "Op de stands, 2026",
      ]),
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
      carte: FR.pass.food.carte,
      accroche: "Kom met een lege maag.",
      texte: [
        "We werken aan een pass die uw toegang en de street food van de beurs combineert: low & slow, gloeiende kolen, gerechten van pitmasters, zonder bij elke stand uw portemonnee te hoeven trekken.",
        "De formule en de prijzen volgen binnenkort. Laat uw e-mailadres achter: u hoort het als eerste.",
      ],
      tempsForts: [],
      photos: photos("food", [
        "Gerookte spareribs, 2026",
        "Octopus van de kolen, 2026",
        "Street food, 2026",
        "Low & slow, 2026",
        "Aansnijden, 2026",
        "Een bord op de beurs, 2026",
      ]),
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
    titre: "Tickets",
    chapeau: "Kies uw pass.",
    jusquau: (date) => `t/m ${date}`,
    des: "vanaf",
    gratuit: "Gratis",
    choisir: "Deze pass kiezen",
    bientot: "Binnenkort",
    tousLesPass: "Alle passen",
    prendre: "Mijn tickets kopen",
    module: "Uw tickets",
    apercu: "Voorbeeld",
    apercuNote: "Interne preview: hier komt de verkoopmodule.",
    total: "Totaal",
    continuer: "Doorgaan",
    ouvertureProchaine: "Binnenkort te koop",
    alerteTitre: "Ontvang een bericht bij de opening",
    foodAlerte: "Hoor het als eerste",
    tempsForts: "Op het programma",
    enImages: "De editie 2026 in beeld",
    questions: "Goed om te weten",
    proQuestion: "Exposant, inkoper, pers?",
    proLien: "Pro-tickets",
    prixFinal: "Laatste kans",
    ajouter: "Ticket toevoegen",
    retirer: "Ticket verwijderen",
    video: "Barbecue Expo in beeld",
    chiffres: { visiteurs: "verwachte bezoekers", marques: "merken", pays: "landen" },
  },
};

const PT: Textes = {
  pass: {
    individuel: {
      nom: "Passe Individual",
      pourQui: "Sozinho, a dois ou entre amigos: um bilhete por pessoa.",
      liste: ["Sexta Pro & Apaixonados", "Sábado ou domingo", "Fim de semana", "Jovem 12-17 anos", "Menores de 12 anos"],
      carte: FR.pass.individuel.carte,
      accroche: "Três dias no coração do fogo, no Parc Floral de Paris.",
      texte: [
        "A Barbecue Expo é o ponto de encontro de todos os que cozinham com fogo: as marcas que só vê online, os pitmasters que segue e milhares de apaixonados a falar de cozedura, lenha e brasas o dia inteiro.",
        "Venha na sexta-feira para as conferências, as masterclasses e as sessões pro da Grill Arena. Venha no sábado ou no domingo para provar, testar, comparar e levar para casa o barbecue dos seus sonhos. Ou fique o fim de semana inteiro: há muito para ver.",
      ],
      tempsForts: [
        { titre: "Grill Arena", texte: "As melhores equipas competem ao vivo; o campeão é coroado no domingo à noite." },
        { titre: "Masterclasses", texte: "Pitmasters reconhecidos partilham as suas técnicas em pequenos grupos." },
        { titre: "As marcas", texte: "Fabricantes de todo o mundo apresentam as suas novidades: toque, pergunte, compare." },
        { titre: "Street food", texte: "Ninguém vem ao salão do barbecue para ficar com fome." },
      ],
      photos: photos("individuel", [
        "Grill Arena, edição 2026",
        "Espaço Masterclass, 2026",
        "Final continental EUA vs Europa, 2026",
        "Cozinha em fogo de lenha, 2026",
        "O fogo, 2026",
        "Nos stands, 2026",
      ]),
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
      carte: FR.pass.groupes.carte,
      accroche: "O barbecue é para partilhar. O salão também.",
      texte: [
        "Em família, o Passe Família dá entrada a dois adultos e dois jovens dos 12 aos 17 anos pelo preço de um passeio. Os menores de 12 anos entram gratuitamente: basta adicionar o bilhete deles.",
        "Comissões de trabalhadores, associações, empresas, clubes: a partir de 20 lugares, o bilhete Grupo e empresa dá-lhe acesso a uma tarifa própria, encomendada e paga online. Um passeio de equipa com cheiro a brasa, organizado em poucos minutos.",
      ],
      tempsForts: [
        { titre: "Um dia à escolha", texte: "Sábado 13 ou domingo 14 de março, no Parc Floral de Paris." },
        { titre: "Para todas as idades", texte: "Demonstrações, provas, Grill Arena: cada um encontra o seu fogo." },
        { titre: "Simples de organizar", texte: "Encomenda e pagamento online; para um grupo, prepare a lista de participantes." },
      ],
      photos: photos("groupes", [
        "Os corredores do salão, 2026",
        "Em frente à Grill Arena, 2026",
        "Demonstração, 2026",
        "Os stands ao ar livre, 2026",
        "Palco da Grill Arena, 2026",
        "Nos stands, 2026",
      ]),
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
      carte: FR.pass.food.carte,
      accroche: "Venha de estômago vazio.",
      texte: [
        "Estamos a preparar um passe que junta a sua entrada e a street food do salão: cozeduras lentas, brasas, pratos dos pitmasters, sem ter de abrir a carteira em cada stand.",
        "A fórmula e os preços chegam em breve. Deixe o seu e-mail: será o primeiro a saber.",
      ],
      tempsForts: [],
      photos: photos("food", [
        "Entrecosto fumado, 2026",
        "Polvo na brasa, 2026",
        "Street food, 2026",
        "Cozedura lenta, 2026",
        "Corte, 2026",
        "Um prato do salão, 2026",
      ]),
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
    titre: "Bilhetes",
    chapeau: "Escolha o seu passe.",
    jusquau: (date) => `até ${date}`,
    des: "desde",
    gratuit: "Gratuito",
    choisir: "Escolher este passe",
    bientot: "Em breve",
    tousLesPass: "Todos os passes",
    prendre: "Comprar bilhetes",
    module: "Os seus bilhetes",
    apercu: "Pré-visualização",
    apercuNote: "Pré-visualização interna: o módulo de venda ficará aqui.",
    total: "Total",
    continuer: "Continuar",
    ouvertureProchaine: "Abertura em breve",
    alerteTitre: "Seja avisado da abertura",
    foodAlerte: "Seja o primeiro a saber",
    tempsForts: "No programa",
    enImages: "A edição 2026 em imagens",
    questions: "Bom saber",
    proQuestion: "Expositor, comprador, imprensa?",
    proLien: "Bilhetes Pro",
    prixFinal: "Última chamada",
    ajouter: "Adicionar um bilhete",
    retirer: "Retirar um bilhete",
    video: "Barbecue Expo em vídeo",
    chiffres: { visiteurs: "visitantes esperados", marques: "marcas", pays: "países" },
  },
};

const IT: Textes = {
  pass: {
    individuel: {
      nom: "Pass Individuale",
      pourQui: "Da solo, in coppia o con gli amici: un biglietto a persona.",
      liste: ["Venerdì Pro & Appassionati", "Sabato o domenica", "Weekend", "Giovani 12-17 anni", "Under 12"],
      carte: FR.pass.individuel.carte,
      accroche: "Tre giorni nel cuore del fuoco, al Parc Floral de Paris.",
      texte: [
        "Barbecue Expo è l'appuntamento di chi cucina con il fuoco: i marchi che vedi solo online, i pitmaster che segui e migliaia di appassionati che parlano di cottura, legna e brace tutto il giorno.",
        "Vieni venerdì per le conferenze, le masterclass e le sessioni pro della Grill Arena. Vieni sabato o domenica per assaggiare, provare, confrontare e tornare a casa con il barbecue dei tuoi sogni. Oppure goditi tutto il weekend: c'è tanto da vedere.",
      ],
      tempsForts: [
        { titre: "Grill Arena", texte: "Le migliori squadre si sfidano dal vivo; il campione viene incoronato domenica sera." },
        { titre: "Masterclass", texte: "Pitmaster affermati condividono le loro tecniche in piccoli gruppi." },
        { titre: "I marchi", texte: "Produttori da tutto il mondo presentano le loro novità: tocca, fai domande, confronta." },
        { titre: "Street food", texte: "Nessuno viene al salone del barbecue per restare a bocca asciutta." },
      ],
      photos: photos("individuel", [
        "Grill Arena, edizione 2026",
        "Area Masterclass, 2026",
        "Finale continentale USA vs Europa, 2026",
        "Cottura sul fuoco di legna, 2026",
        "Il fuoco, 2026",
        "Tra gli stand, 2026",
      ]),
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
      carte: FR.pass.groupes.carte,
      accroche: "Il barbecue si condivide. Anche il salone.",
      texte: [
        "In famiglia, il Pass Famiglia fa entrare due adulti e due ragazzi dai 12 ai 17 anni al prezzo di una gita. I bambini sotto i 12 anni entrano gratis: basta aggiungere il loro biglietto.",
        "CRAL, associazioni, aziende, club: da 20 posti, il biglietto Gruppi & CRAL ti dà una tariffa dedicata, ordinata e pagata online. Un'uscita di squadra che profuma di brace, organizzata in pochi minuti.",
      ],
      tempsForts: [
        { titre: "Un giorno a scelta", texte: "Sabato 13 o domenica 14 marzo, al Parc Floral de Paris." },
        { titre: "Per tutte le età", texte: "Dimostrazioni, degustazioni, Grill Arena: ognuno trova il suo fuoco." },
        { titre: "Facile da organizzare", texte: "Ordine e pagamento online; per un gruppo, prepara l'elenco dei partecipanti." },
      ],
      photos: photos("groupes", [
        "I corridoi del salone, 2026",
        "Davanti alla Grill Arena, 2026",
        "Dimostrazione, 2026",
        "Gli stand all'aperto, 2026",
        "Palco della Grill Arena, 2026",
        "Tra gli stand, 2026",
      ]),
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
      carte: FR.pass.food.carte,
      accroche: "Vieni a stomaco vuoto.",
      texte: [
        "Stiamo preparando un pass che unisce il tuo ingresso e lo street food del salone: cotture lente, brace, piatti dei pitmaster, senza tirare fuori il portafoglio a ogni stand.",
        "Formula e prezzi in arrivo. Lascia il tuo indirizzo email: sarai il primo a saperlo.",
      ],
      tempsForts: [],
      photos: photos("food", [
        "Costine affumicate, 2026",
        "Polpo alla brace, 2026",
        "Street food, 2026",
        "Cottura lenta, 2026",
        "Taglio, 2026",
        "Un piatto del salone, 2026",
      ]),
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
    titre: "Biglietti",
    chapeau: "Scegli il tuo pass.",
    jusquau: (date) => `fino al ${date}`,
    des: "da",
    gratuit: "Gratis",
    choisir: "Scegli questo pass",
    bientot: "Presto",
    tousLesPass: "Tutti i pass",
    prendre: "Prendi i biglietti",
    module: "I tuoi biglietti",
    apercu: "Anteprima",
    apercuNote: "Anteprima interna: qui comparirà il modulo di vendita.",
    total: "Totale",
    continuer: "Continua",
    ouvertureProchaine: "Apertura a breve",
    alerteTitre: "Ricevi un avviso all'apertura",
    foodAlerte: "Scoprilo per primo",
    tempsForts: "In programma",
    enImages: "L'edizione 2026 in immagini",
    questions: "Buono a sapersi",
    proQuestion: "Espositore, buyer, stampa?",
    proLien: "Biglietti Pro",
    prixFinal: "Ultima chiamata",
    ajouter: "Aggiungi un biglietto",
    retirer: "Rimuovi un biglietto",
    video: "Barbecue Expo in video",
    chiffres: { visiteurs: "visitatori attesi", marques: "marchi", pays: "paesi" },
  },
};

const TEXTES: Record<string, Textes> = { fr: FR, en: EN, es: ES, de: DE, nl: NL, pt: PT, it: IT };

export function contenu(locale: string): Textes {
  return TEXTES[locale] || FR;
}
