import { CHIFFRES, nombre } from "@/lib/chiffres";

/**
 * Les textes de présentation du salon sur /billetterie (sous la mosaïque) :
 * accroche, description, chiffres, programme et questions, par langue. Le français fait
 * foi ; une langue absente reprend le français (voir `salon(locale)`). Les
 * textes des pass et du module de vente sont dans contenu.ts.
 */

export type IdProgramme = "arena" | "masterclasses" | "streetFood" | "libreService" | "degustations" | "marques";

export const ORDRE_PROGRAMME: IdProgramme[] = [
  "arena",
  "masterclasses",
  "streetFood",
  "libreService",
  "degustations",
  "marques",
];

export const PHOTOS_PROGRAMME: Record<IdProgramme, string> = {
  arena: "/photos-2026/william-plin-jpc-110426-533a4969.jpg",
  masterclasses: "/photos-2026/zone-masterclasses.jpg",
  streetFood: "/photos-editions/j7i1640.jpg",
  libreService: "/photos-2026/william-plin-jpc-110426-533a4660.jpg",
  degustations: "/photos-editions/img-7929.jpg",
  marques: "/photos-editions/j7i1328.jpg",
};

/** La mosaïque en tête de page : la grande photo, puis les quatre petites. */
export const PHOTOS_MOSAIQUE = [
  "/photos-2026/william-plin-jpc-110426-533a4426.jpg",
  "/photos-2026/bbq-expo-477.jpg",
  "/photos-2026/william-plin-jpc-120426-533a8137.jpg",
  "/photos-editions/j7i2225.jpg",
  "/photos-2026/bbq-expo-066.jpg",
];

export type TextesSalon = {
  accroche: string;
  /** description, paragraphe par paragraphe */
  texte: string[];
  chiffres: { interieur: string; exterieur: string; marques: string; visiteurs: string };
  programme: Record<IdProgramme, { titre: string; texte: string }>;
  /** « Bon à savoir » : questions pratiques et billets */
  questions: { q: string; r: string }[];
  ui: {
    galerie: string;
    photo: string;
    agrandir: string;
    fermer: string;
    precedente: string;
    suivante: string;
    video: string;
    film: string;
    lancer: string;
    /** bouton de l'en-tête, qui descend jusqu'au film */
    voirVideo: string;
    programme: string;
  };
};

function chiffres(locale: string) {
  return {
    interieur: nombre(CHIFFRES.surfaceInterieure2027, locale),
    exterieur: nombre(CHIFFRES.surfaceExterieure2027, locale),
    marques: nombre(CHIFFRES.marques2027, locale),
  };
}

function fr(): TextesSalon {
  const c = chiffres("fr");
  return {
    accroche: "Trois jours de feu, de fumée et de saveurs venues du monde entier, au cœur du Parc Floral de Paris.",
    texte: [
      `Du 12 au 14 mars 2027, le plus grand salon européen du barbecue s'installe au Parc Floral de Paris : ${c.interieur} m² en intérieur, ${c.exterieur} m² en extérieur, ${c.marques} marques venues du monde entier et des pitmasters de renom. Vous n'avez jamais allumé un barbecue ? Vous fumez votre brisket depuis des années ? Dans les deux cas, vous êtes au bon endroit.`,
      "Ici, tout se goûte. La restauration du salon fait le tour du monde des braises : BBQ fumé texan, barbecue coréen, asado argentin, churrasco brésilien… Les exposants vous font déguster leurs sauces, leurs épices et leurs viandes, et au BBQ libre-service, c'est vous qui tenez la pince.",
      "Ici, tout s'apprend. En masterclass, des pros vous transmettent leurs gestes, de l'allumage à la cuisson longue. Sur les stands, on touche, on compare et on pose toutes ses questions avant de choisir son prochain barbecue.",
      "Et quand l'ambiance monte, cap sur la Grill Arena, où des pitmasters du monde entier s'affrontent en battle sous vos yeux. En famille, entre amis ou entre collègues, venez le ventre vide : vous repartirez des saveurs plein la tête… et un peu de fumée dans les cheveux.",
    ],
    chiffres: {
      interieur: "en intérieur",
      exterieur: "en extérieur",
      marques: "marques du monde entier",
      visiteurs: "visiteurs attendus",
    },
    programme: {
      arena: {
        titre: "Grill Arena",
        texte: "Des pitmasters du monde entier s'affrontent en battle, en direct et devant le public : le grand spectacle du salon.",
      },
      masterclasses: {
        titre: "Masterclasses",
        texte: "Formez-vous au barbecue avec des pros : allumage, cuisson indirecte, fumage, découpe. De quoi progresser pour de bon.",
      },
      streetFood: {
        titre: "Street food du monde",
        texte: "BBQ fumé texan, coréen, argentin, brésilien… Une restauration internationale, cuite au feu, pour faire le tour du monde sans quitter Paris.",
      },
      libreService: {
        titre: "BBQ libre-service",
        texte: "Allumez votre propre feu : des postes de cuisson en libre accès pour griller vos produits et prendre le matériel en main.",
      },
      degustations: {
        titre: "Dégustations",
        texte: "Sauces, épices, rubs, viandes : les exposants vous font goûter leurs produits, stand après stand.",
      },
      marques: {
        titre: `${c.marques} marques`,
        texte: "Venues du monde entier : barbecues, kamados, fumoirs, planchas, couteaux, accessoires. Comparez, demandez conseil et repartez avec votre coup de cœur.",
      },
    },
    questions: [
      {
        q: "Quels sont les jours et horaires ?",
        r: "Le salon est ouvert le vendredi 12 et le samedi 13 mars de 9h30 à 19h, et le dimanche 14 mars de 9h30 à 18h, au Parc Floral de Paris.",
      },
      {
        q: "Comment venir ?",
        r: "En métro : ligne 1, station Château de Vincennes (terminus). En RER : ligne A, station Vincennes.",
      },
      {
        q: "Le salon est-il ouvert à tous, même le vendredi ?",
        r: "Oui, les trois jours sont ouverts à tous, débutants comme passionnés. Le billet Vendredi Pro & Passionnés est au même tarif pour les professionnels et les particuliers.",
      },
      {
        q: "Mes enfants paient-ils ?",
        r: "Les moins de 12 ans entrent gratuitement avec un adulte payant (4 enfants maximum par adulte), le samedi ou le dimanche : ajoutez leur billet gratuit à votre commande. De 12 à 17 ans, le billet Jeune est à 10 €.",
      },
      {
        q: "Peut-on manger sur place ?",
        r: "Oui : la restauration du salon fait le tour du monde des braises, du BBQ fumé texan au barbecue coréen, argentin ou brésilien. Et sur les stands, les exposants vous font déguster leurs produits.",
      },
      {
        q: "Peut-on acheter sur place ?",
        r: "Oui, la plupart des exposants vendent leur matériel directement sur le salon.",
      },
      {
        q: "Je viens en famille ou en groupe, comment faire ?",
        r: "Le Pass Famille fait entrer 2 adultes et 2 jeunes de 12 à 17 ans ; il est en vente en ligne jusqu'à 7 jours avant le salon, jamais sur place. Pour les CSE, associations et entreprises, le billet Groupe & CSE est proposé dès 20 places.",
      },
    ],
    ui: {
      galerie: "Galerie",
      photo: "Barbecue Expo en images",
      agrandir: "Agrandir",
      fermer: "Fermer",
      precedente: "Précédente",
      suivante: "Suivante",
      video: "Vidéo du salon",
      film: "Le film officiel",
      voirVideo: "Voir la vidéo de l'événement",
      lancer: "Lancer la vidéo",
      programme: "Au programme",
    },
  };
}

function en(): TextesSalon {
  const c = chiffres("en");
  return {
    accroche: "Three days of fire, smoke and flavours from all over the world, in the heart of the Parc Floral de Paris.",
    texte: [
      `From 12 to 14 March 2027, Europe's biggest barbecue show comes to the Parc Floral de Paris: ${c.interieur} m² indoors, ${c.exterieur} m² outdoors, ${c.marques} brands from all over the world and renowned pitmasters. Never lit a barbecue? Been smoking your own brisket for years? Either way, you're in the right place.`,
      "Here, everything is there to be tasted. The show's food takes you on a world tour of the grill: Texas smoked BBQ, Korean barbecue, Argentine asado, Brazilian churrasco… Exhibitors invite you to taste their sauces, spices and meats, and at the self-service BBQ, you're the one holding the tongs.",
      "Here, everything is there to be learned. In the masterclasses, pros share their techniques, from lighting the fire to low-and-slow cooking. On the stands, you can get hands-on, compare and ask all your questions before choosing your next barbecue.",
      "And when the excitement builds, head to the Grill Arena, where pitmasters from around the world go head to head in live battles. With family, friends or colleagues, come hungry: you'll leave with your head full of flavours… and a little smoke in your hair.",
    ],
    chiffres: {
      interieur: "indoors",
      exterieur: "outdoors",
      marques: "brands from around the world",
      visiteurs: "expected visitors",
    },
    programme: {
      arena: {
        titre: "Grill Arena",
        texte: "Pitmasters from around the world go head to head in live battles, in front of the crowd: the show's main event.",
      },
      masterclasses: {
        titre: "Masterclasses",
        texte: "Learn barbecue from the pros: lighting, indirect cooking, smoking, carving. Everything you need to really up your game.",
      },
      streetFood: {
        titre: "World street food",
        texte: "Texas smoked BBQ, Korean, Argentine, Brazilian… International food cooked over fire: a world tour without leaving Paris.",
      },
      libreService: {
        titre: "Self-service BBQ",
        texte: "Fire up your own grill: open-access cooking stations to grill your food and get to grips with the gear.",
      },
      degustations: {
        titre: "Tastings",
        texte: "Sauces, spices, rubs, meats: exhibitors let you taste their products, stand after stand.",
      },
      marques: {
        titre: `${c.marques} brands`,
        texte: "From all over the world: barbecues, kamados, smokers, planchas, knives, accessories. Compare, get advice and take home your favourite.",
      },
    },
    questions: [
      {
        q: "What are the dates and opening hours?",
        r: "The show is open on Friday 12 and Saturday 13 March from 9:30 AM to 7 PM, and on Sunday 14 March from 9:30 AM to 6 PM, at the Parc Floral de Paris.",
      },
      {
        q: "How do I get there?",
        r: "By metro: line 1, Château de Vincennes station (end of the line). By RER: line A, Vincennes station.",
      },
      {
        q: "Is the show open to everyone, even on Friday?",
        r: "Yes, all three days are open to everyone, beginners and enthusiasts alike. The Friday Pro & Enthusiasts ticket is the same price for professionals and the public.",
      },
      {
        q: "Do my children need to pay?",
        r: "Children under 12 get in free with a paying adult (up to 4 children per adult) on Saturday or Sunday: just add their free ticket to your order. Ages 12 to 17 need a Youth ticket, at €10.",
      },
      {
        q: "Can I eat on site?",
        r: "Yes: the show's food takes you on a world tour of the grill, from Texas smoked BBQ to Korean, Argentine and Brazilian barbecue. And on the stands, exhibitors let you taste their products.",
      },
      {
        q: "Can I buy on site?",
        r: "Yes, most exhibitors sell their gear directly at the show.",
      },
      {
        q: "Coming as a family or a group?",
        r: "The Family Pass admits 2 adults and 2 young people aged 12 to 17; it's on sale online until 7 days before the show, never at the door. For companies, associations and works councils, the Group & Corporate ticket is available from 20 tickets.",
      },
    ],
    ui: {
      galerie: "Gallery",
      photo: "Barbecue Expo in pictures",
      agrandir: "Enlarge",
      fermer: "Close",
      precedente: "Previous",
      suivante: "Next",
      video: "Show video",
      film: "The official film",
      voirVideo: "Watch the event video",
      lancer: "Play the video",
      programme: "What's on",
    },
  };
}

function es(): TextesSalon {
  const c = chiffres("es");
  return {
    accroche: "Tres días de fuego, humo y sabores de todo el mundo, en pleno Parc Floral de París.",
    texte: [
      `Del 12 al 14 de marzo de 2027, el mayor salón europeo de la barbacoa se instala en el Parc Floral de París: ${c.interieur} m² de interior, ${c.exterieur} m² de exterior, ${c.marques} marcas llegadas de todo el mundo y pitmasters de renombre. ¿Nunca ha encendido una barbacoa? ¿Lleva años ahumando su propio brisket? En ambos casos, está en el lugar adecuado.`,
      "Aquí todo se prueba. La restauración del salón da la vuelta al mundo de las brasas: BBQ ahumado texano, barbacoa coreana, asado argentino, churrasco brasileño… Los expositores le dan a probar sus salsas, especias y carnes, y en la barbacoa self-service es usted quien maneja las pinzas.",
      "Aquí todo se aprende. En las masterclasses, profesionales le transmiten sus técnicas, del encendido a la cocción lenta. En los stands puede tocar, comparar y hacer todas sus preguntas antes de elegir su próxima barbacoa.",
      "Y cuando sube la temperatura, rumbo a la Grill Arena, donde pitmasters de todo el mundo se enfrentan en batallas en directo. En familia, con amigos o con compañeros de trabajo, venga con hambre: se irá con la cabeza llena de sabores… y un poco de humo en el pelo.",
    ],
    chiffres: {
      interieur: "de interior",
      exterieur: "de exterior",
      marques: "marcas de todo el mundo",
      visiteurs: "visitantes esperados",
    },
    programme: {
      arena: {
        titre: "Grill Arena",
        texte: "Pitmasters de todo el mundo se enfrentan en batallas en directo, ante el público: el gran espectáculo del salón.",
      },
      masterclasses: {
        titre: "Masterclasses",
        texte: "Aprenda barbacoa con profesionales: encendido, cocción indirecta, ahumado, despiece. Para progresar de verdad.",
      },
      streetFood: {
        titre: "Street food del mundo",
        texte: "BBQ ahumado texano, coreano, argentino, brasileño… Una restauración internacional, cocinada al fuego, para dar la vuelta al mundo sin salir de París.",
      },
      libreService: {
        titre: "Barbacoa self-service",
        texte: "Encienda su propio fuego: puestos de cocción de libre acceso para asar sus productos y probar el material.",
      },
      degustations: {
        titre: "Degustaciones",
        texte: "Salsas, especias, rubs, carnes: los expositores le dan a probar sus productos, stand tras stand.",
      },
      marques: {
        titre: `${c.marques} marcas`,
        texte: "Llegadas de todo el mundo: barbacoas, kamados, ahumadores, planchas, cuchillos, accesorios. Compare, pida consejo y llévese su favorito.",
      },
    },
    questions: [
      {
        q: "¿Cuáles son los días y horarios?",
        r: "El salón abre el viernes 12 y el sábado 13 de marzo de 9:30 a 19:00, y el domingo 14 de marzo de 9:30 a 18:00, en el Parc Floral de París.",
      },
      {
        q: "¿Cómo llegar?",
        r: "En metro: línea 1, estación Château de Vincennes (final de línea). En RER: línea A, estación Vincennes.",
      },
      {
        q: "¿El salón está abierto a todos, incluso el viernes?",
        r: "Sí, los tres días están abiertos a todos, principiantes y apasionados. La entrada Viernes Pro & Apasionados tiene el mismo precio para profesionales y particulares.",
      },
      {
        q: "¿Pagan mis hijos?",
        r: "Los menores de 12 años entran gratis con un adulto que pague entrada (máximo 4 niños por adulto), el sábado o el domingo: añada su entrada gratuita a su pedido. De 12 a 17 años, la entrada Joven cuesta 10 €.",
      },
      {
        q: "¿Se puede comer en el salón?",
        r: "Sí: la restauración del salón da la vuelta al mundo de las brasas, del BBQ ahumado texano a la barbacoa coreana, argentina o brasileña. Y en los stands, los expositores le dan a probar sus productos.",
      },
      {
        q: "¿Se puede comprar en el salón?",
        r: "Sí, la mayoría de los expositores venden su material directamente en el salón.",
      },
      {
        q: "¿Viene en familia o en grupo?",
        r: "El Pase Familia da acceso a 2 adultos y 2 jóvenes de 12 a 17 años; se vende en línea hasta 7 días antes del salón, nunca en taquilla. Para empresas, asociaciones y comités de empresa, la entrada Grupo y empresa está disponible a partir de 20 entradas.",
      },
    ],
    ui: {
      galerie: "Galería",
      photo: "Barbecue Expo en imágenes",
      agrandir: "Ampliar",
      fermer: "Cerrar",
      precedente: "Anterior",
      suivante: "Siguiente",
      video: "Vídeo del salón",
      film: "El vídeo oficial",
      voirVideo: "Ver el vídeo del evento",
      lancer: "Reproducir el vídeo",
      programme: "Programa",
    },
  };
}

function de(): TextesSalon {
  const c = chiffres("de");
  return {
    accroche: "Drei Tage Feuer, Rauch und Aromen aus aller Welt, mitten im Parc Floral de Paris.",
    texte: [
      `Vom 12. bis 14. März 2027 kommt Europas größte Grillmesse in den Parc Floral de Paris: ${c.interieur} m² drinnen, ${c.exterieur} m² draußen, ${c.marques} Marken aus aller Welt und renommierte Pitmaster. Noch nie einen Grill angezündet? Oder räuchern Sie Ihr Brisket schon seit Jahren selbst? So oder so: Hier sind Sie richtig.`,
      "Hier wird alles probiert. Die Gastronomie der Messe ist eine Weltreise der Glut: Texas Smoked BBQ, koreanisches Barbecue, argentinisches Asado, brasilianisches Churrasco … Die Aussteller lassen Sie ihre Saucen, Gewürze und Fleischsorten kosten, und beim Self-Service-BBQ halten Sie selbst die Grillzange.",
      "Hier wird alles gelernt. In den Masterclasses geben Profis ihre Handgriffe weiter, vom Anzünden bis zum langen Garen. An den Ständen können Sie anfassen, vergleichen und alle Fragen stellen, bevor Sie Ihren nächsten Grill aussuchen.",
      "Und wenn die Stimmung steigt, geht es in die Grill Arena, wo Pitmaster aus aller Welt live gegeneinander antreten. Mit der Familie, mit Freunden oder Kollegen: Kommen Sie hungrig – Sie fahren mit einem Kopf voller Aromen nach Hause … und ein wenig Rauch im Haar.",
    ],
    chiffres: {
      interieur: "drinnen",
      exterieur: "draußen",
      marques: "Marken aus aller Welt",
      visiteurs: "erwartete Besucher",
    },
    programme: {
      arena: {
        titre: "Grill Arena",
        texte: "Pitmaster aus aller Welt treten live gegeneinander an, vor Publikum: das große Spektakel der Messe.",
      },
      masterclasses: {
        titre: "Masterclasses",
        texte: "Lernen Sie Grillen von Profis: Anzünden, indirektes Garen, Räuchern, Zerlegen. Damit Sie wirklich besser werden.",
      },
      streetFood: {
        titre: "Street Food der Welt",
        texte: "Texas Smoked BBQ, koreanisch, argentinisch, brasilianisch … Internationale Küche vom Feuer: eine Weltreise, ohne Paris zu verlassen.",
      },
      libreService: {
        titre: "Self-Service-BBQ",
        texte: "Entfachen Sie Ihr eigenes Feuer: frei zugängliche Grillstationen, um Ihre Produkte zu grillen und die Ausrüstung auszuprobieren.",
      },
      degustations: {
        titre: "Verkostungen",
        texte: "Saucen, Gewürze, Rubs, Fleisch: Die Aussteller lassen Sie ihre Produkte probieren, Stand für Stand.",
      },
      marques: {
        titre: `${c.marques} Marken`,
        texte: "Aus aller Welt: Grills, Kamados, Smoker, Planchas, Messer, Zubehör. Vergleichen Sie, lassen Sie sich beraten und nehmen Sie Ihr Lieblingsstück mit.",
      },
    },
    questions: [
      {
        q: "Wann ist die Messe geöffnet?",
        r: "Die Messe ist am Freitag, 12., und Samstag, 13. März, von 9:30 bis 19:00 Uhr geöffnet und am Sonntag, 14. März, von 9:30 bis 18:00 Uhr – im Parc Floral de Paris.",
      },
      {
        q: "Wie komme ich hin?",
        r: "Mit der Metro: Linie 1, Station Château de Vincennes (Endstation). Mit dem RER: Linie A, Station Vincennes.",
      },
      {
        q: "Ist die Messe für alle offen, auch am Freitag?",
        r: "Ja, alle drei Tage sind für alle offen, für Einsteiger wie für Fans. Das Ticket Freitag Pro & Fans kostet für Fachbesucher und Privatpersonen gleich viel.",
      },
      {
        q: "Zahlen meine Kinder Eintritt?",
        r: "Kinder unter 12 Jahren haben am Samstag oder Sonntag in Begleitung eines zahlenden Erwachsenen freien Eintritt (maximal 4 Kinder pro Erwachsenem): Fügen Sie ihr kostenloses Ticket Ihrer Bestellung hinzu. Für 12- bis 17-Jährige kostet das Jugendticket 10 €.",
      },
      {
        q: "Kann man vor Ort essen?",
        r: "Ja: Die Gastronomie der Messe ist eine Weltreise der Glut, vom Texas Smoked BBQ bis zum koreanischen, argentinischen oder brasilianischen Barbecue. Und an den Ständen lassen Sie die Aussteller ihre Produkte probieren.",
      },
      {
        q: "Kann man vor Ort kaufen?",
        r: "Ja, die meisten Aussteller verkaufen ihre Ausrüstung direkt auf der Messe.",
      },
      {
        q: "Mit der Familie oder als Gruppe?",
        r: "Der Familienpass gilt für 2 Erwachsene und 2 Jugendliche von 12 bis 17 Jahren; er ist bis 7 Tage vor der Messe online erhältlich, nie vor Ort. Für Firmen, Vereine und Betriebsräte gibt es das Ticket Gruppen & Firmen ab 20 Tickets.",
      },
    ],
    ui: {
      galerie: "Galerie",
      photo: "Barbecue Expo in Bildern",
      agrandir: "Vergrößern",
      fermer: "Schließen",
      precedente: "Zurück",
      suivante: "Weiter",
      video: "Messevideo",
      film: "Der offizielle Film",
      voirVideo: "Video der Messe ansehen",
      lancer: "Video abspielen",
      programme: "Programm",
    },
  };
}

function nl(): TextesSalon {
  const c = chiffres("nl");
  return {
    accroche: "Drie dagen vuur, rook en smaken uit de hele wereld, midden in het Parc Floral de Paris.",
    texte: [
      `Van 12 tot 14 maart 2027 strijkt de grootste barbecuebeurs van Europa neer in het Parc Floral de Paris: ${c.interieur} m² binnen, ${c.exterieur} m² buiten, ${c.marques} merken uit de hele wereld en gerenommeerde pitmasters. Nog nooit een barbecue aangestoken? Rookt u al jaren uw eigen brisket? Hoe dan ook: u bent hier aan het juiste adres.`,
      "Hier wordt alles geproefd. De horeca van de beurs neemt u mee op wereldreis langs de gloeiende kolen: Texaanse smoked BBQ, Koreaanse barbecue, Argentijnse asado, Braziliaanse churrasco… De exposanten laten u hun sauzen, kruiden en vlees proeven, en bij de selfservice-BBQ hebt u zelf de grilltang in handen.",
      "Hier wordt alles geleerd. In de masterclasses delen professionals hun technieken, van het aansteken tot lang en langzaam garen. Op de stands kunt u alles vastpakken, vergelijken en al uw vragen stellen voordat u uw volgende barbecue kiest.",
      "En als de spanning stijgt, gaat u naar de Grill Arena, waar pitmasters uit de hele wereld het live tegen elkaar opnemen. Met het gezin, met vrienden of met collega's: kom met een lege maag. U gaat naar huis met een hoofd vol smaken… en een beetje rook in uw haar.",
    ],
    chiffres: {
      interieur: "binnen",
      exterieur: "buiten",
      marques: "merken uit de hele wereld",
      visiteurs: "verwachte bezoekers",
    },
    programme: {
      arena: {
        titre: "Grill Arena",
        texte: "Pitmasters uit de hele wereld nemen het live tegen elkaar op, voor publiek: het grote spektakel van de beurs.",
      },
      masterclasses: {
        titre: "Masterclasses",
        texte: "Leer barbecueën van professionals: aansteken, indirect garen, roken, uitsnijden. Om echt vooruit te gaan.",
      },
      streetFood: {
        titre: "Streetfood uit de wereld",
        texte: "Texaanse smoked BBQ, Koreaans, Argentijns, Braziliaans… Internationale gerechten van het vuur: een wereldreis zonder Parijs te verlaten.",
      },
      libreService: {
        titre: "Selfservice-BBQ",
        texte: "Steek uw eigen vuur aan: vrij toegankelijke grillplekken om uw producten te grillen en het materiaal uit te proberen.",
      },
      degustations: {
        titre: "Proeverijen",
        texte: "Sauzen, kruiden, rubs, vlees: de exposanten laten u hun producten proeven, stand na stand.",
      },
      marques: {
        titre: `${c.marques} merken`,
        texte: "Uit de hele wereld: barbecues, kamado's, smokers, plancha's, messen, accessoires. Vergelijk, vraag advies en neem uw favoriet mee naar huis.",
      },
    },
    questions: [
      {
        q: "Wat zijn de data en openingstijden?",
        r: "De beurs is open op vrijdag 12 en zaterdag 13 maart van 9.30 tot 19.00 uur, en op zondag 14 maart van 9.30 tot 18.00 uur, in het Parc Floral de Paris.",
      },
      {
        q: "Hoe kom ik er?",
        r: "Met de metro: lijn 1, station Château de Vincennes (eindpunt). Met de RER: lijn A, station Vincennes.",
      },
      {
        q: "Is de beurs voor iedereen open, ook op vrijdag?",
        r: "Ja, alle drie de dagen zijn voor iedereen open, voor beginners en liefhebbers. Het ticket Vrijdag Pro & Liefhebbers kost voor professionals en particulieren hetzelfde.",
      },
      {
        q: "Betalen mijn kinderen?",
        r: "Kinderen onder 12 jaar mogen op zaterdag of zondag gratis naar binnen met een betalende volwassene (maximaal 4 kinderen per volwassene): voeg hun gratis ticket toe aan uw bestelling. Van 12 tot 17 jaar kost het Jongerenticket € 10.",
      },
      {
        q: "Kan ik ter plaatse eten?",
        r: "Ja: de horeca van de beurs neemt u mee op wereldreis langs de gloeiende kolen, van Texaanse smoked BBQ tot Koreaanse, Argentijnse of Braziliaanse barbecue. En op de stands laten de exposanten u hun producten proeven.",
      },
      {
        q: "Kan ik ter plaatse kopen?",
        r: "Ja, de meeste exposanten verkopen hun materiaal rechtstreeks op de beurs.",
      },
      {
        q: "Komt u met het gezin of met een groep?",
        r: "De Gezinspass geeft toegang aan 2 volwassenen en 2 jongeren van 12 tot 17 jaar; hij is online te koop tot 7 dagen voor de beurs, nooit ter plaatse. Voor bedrijven, verenigingen en ondernemingsraden is het ticket Groep & bedrijf beschikbaar vanaf 20 tickets.",
      },
    ],
    ui: {
      galerie: "Galerij",
      photo: "Barbecue Expo in beeld",
      agrandir: "Vergroten",
      fermer: "Sluiten",
      precedente: "Vorige",
      suivante: "Volgende",
      video: "Video van de beurs",
      film: "De officiële film",
      voirVideo: "Bekijk de video van het evenement",
      lancer: "Video afspelen",
      programme: "Programma",
    },
  };
}

function pt(): TextesSalon {
  const c = chiffres("pt");
  return {
    accroche: "Três dias de fogo, fumo e sabores de todo o mundo, no coração do Parc Floral de Paris.",
    texte: [
      `De 12 a 14 de março de 2027, o maior salão europeu do barbecue instala-se no Parc Floral de Paris: ${c.interieur} m² no interior, ${c.exterieur} m² no exterior, ${c.marques} marcas de todo o mundo e pitmasters de renome. Nunca acendeu um barbecue? Já fuma o seu próprio brisket há anos? Em qualquer dos casos, está no sítio certo.`,
      "Aqui, tudo se prova. A restauração do salão dá a volta ao mundo das brasas: BBQ fumado texano, barbecue coreano, asado argentino, churrasco brasileiro… Os expositores dão-lhe a provar os seus molhos, especiarias e carnes, e no BBQ self-service a pinça fica nas suas mãos.",
      "Aqui, tudo se aprende. Nas masterclasses, profissionais transmitem-lhe as suas técnicas, do acender do lume à cozedura lenta. Nos stands pode tocar, comparar e fazer todas as perguntas antes de escolher o seu próximo barbecue.",
      "E quando o ambiente aquece, rumo à Grill Arena, onde pitmasters de todo o mundo se enfrentam em batalhas ao vivo. Em família, com amigos ou com colegas, venha de estômago vazio: vai sair com a cabeça cheia de sabores… e um pouco de fumo no cabelo.",
    ],
    chiffres: {
      interieur: "no interior",
      exterieur: "no exterior",
      marques: "marcas de todo o mundo",
      visiteurs: "visitantes esperados",
    },
    programme: {
      arena: {
        titre: "Grill Arena",
        texte: "Pitmasters de todo o mundo enfrentam-se em batalhas ao vivo, perante o público: o grande espetáculo do salão.",
      },
      masterclasses: {
        titre: "Masterclasses",
        texte: "Aprenda barbecue com profissionais: acender, cozedura indireta, fumagem, corte. Para progredir a sério.",
      },
      streetFood: {
        titre: "Street food do mundo",
        texte: "BBQ fumado texano, coreano, argentino, brasileiro… Uma restauração internacional, cozinhada no fogo, para dar a volta ao mundo sem sair de Paris.",
      },
      libreService: {
        titre: "BBQ self-service",
        texte: "Acenda o seu próprio fogo: postos de cozedura de livre acesso para grelhar os seus produtos e experimentar o material.",
      },
      degustations: {
        titre: "Degustações",
        texte: "Molhos, especiarias, rubs, carnes: os expositores dão-lhe a provar os seus produtos, stand após stand.",
      },
      marques: {
        titre: `${c.marques} marcas`,
        texte: "De todo o mundo: barbecues, kamados, fumadores, planchas, facas, acessórios. Compare, peça conselho e leve para casa o seu favorito.",
      },
    },
    questions: [
      {
        q: "Quais são os dias e horários?",
        r: "O salão está aberto na sexta-feira 12 e no sábado 13 de março, das 9h30 às 19h, e no domingo 14 de março, das 9h30 às 18h, no Parc Floral de Paris.",
      },
      {
        q: "Como chegar?",
        r: "De metro: linha 1, estação Château de Vincennes (fim da linha). De RER: linha A, estação Vincennes.",
      },
      {
        q: "O salão está aberto a todos, mesmo na sexta-feira?",
        r: "Sim, os três dias estão abertos a todos, principiantes e apaixonados. O bilhete Sexta Pro & Apaixonados tem o mesmo preço para profissionais e particulares.",
      },
      {
        q: "Os meus filhos pagam?",
        r: "Os menores de 12 anos entram gratuitamente com um adulto pagante (máximo 4 crianças por adulto), no sábado ou no domingo: adicione o bilhete gratuito deles à sua encomenda. Dos 12 aos 17 anos, o bilhete Jovem custa 10 €.",
      },
      {
        q: "Pode-se comer no local?",
        r: "Sim: a restauração do salão dá a volta ao mundo das brasas, do BBQ fumado texano ao barbecue coreano, argentino ou brasileiro. E nos stands, os expositores dão-lhe a provar os seus produtos.",
      },
      {
        q: "Pode-se comprar no local?",
        r: "Sim, a maioria dos expositores vende o seu material diretamente no salão.",
      },
      {
        q: "Vem em família ou em grupo?",
        r: "O Passe Família dá entrada a 2 adultos e 2 jovens dos 12 aos 17 anos; está à venda online até 7 dias antes do salão, nunca no local. Para empresas, associações e comissões de trabalhadores, o bilhete Grupo e empresa está disponível a partir de 20 bilhetes.",
      },
    ],
    ui: {
      galerie: "Galeria",
      photo: "Barbecue Expo em imagens",
      agrandir: "Ampliar",
      fermer: "Fechar",
      precedente: "Anterior",
      suivante: "Seguinte",
      video: "Vídeo do salão",
      film: "O filme oficial",
      voirVideo: "Ver o vídeo do evento",
      lancer: "Ver o vídeo",
      programme: "Programa",
    },
  };
}

function it(): TextesSalon {
  const c = chiffres("it");
  return {
    accroche: "Tre giorni di fuoco, fumo e sapori da tutto il mondo, nel cuore del Parc Floral de Paris.",
    texte: [
      `Dal 12 al 14 marzo 2027 il più grande salone europeo del barbecue arriva al Parc Floral de Paris: ${c.interieur} m² al coperto, ${c.exterieur} m² all'aperto, ${c.marques} marchi da tutto il mondo e pitmaster di fama. Non hai mai acceso un barbecue? Affumichi il tuo brisket da anni? In entrambi i casi, sei nel posto giusto.`,
      "Qui si assaggia tutto. La ristorazione del salone fa il giro del mondo delle braci: BBQ affumicato texano, barbecue coreano, asado argentino, churrasco brasiliano… Gli espositori ti fanno assaggiare salse, spezie e carni, e al BBQ self-service sei tu a tenere la pinza.",
      "Qui si impara tutto. Nelle masterclass i professionisti ti trasmettono i loro gesti, dall'accensione alla cottura lenta. Sugli stand puoi toccare, confrontare e fare tutte le domande prima di scegliere il tuo prossimo barbecue.",
      "E quando l'atmosfera si scalda, tutti alla Grill Arena, dove pitmaster da tutto il mondo si sfidano in battle dal vivo. In famiglia, con gli amici o con i colleghi, vieni a stomaco vuoto: tornerai a casa con la testa piena di sapori… e un po' di fumo tra i capelli.",
    ],
    chiffres: {
      interieur: "al coperto",
      exterieur: "all'aperto",
      marques: "marchi da tutto il mondo",
      visiteurs: "visitatori attesi",
    },
    programme: {
      arena: {
        titre: "Grill Arena",
        texte: "Pitmaster da tutto il mondo si sfidano in battle dal vivo, davanti al pubblico: il grande spettacolo del salone.",
      },
      masterclasses: {
        titre: "Masterclass",
        texte: "Impara il barbecue dai professionisti: accensione, cottura indiretta, affumicatura, taglio. Per migliorare davvero.",
      },
      streetFood: {
        titre: "Street food dal mondo",
        texte: "BBQ affumicato texano, coreano, argentino, brasiliano… Una ristorazione internazionale, cotta sul fuoco, per fare il giro del mondo senza lasciare Parigi.",
      },
      libreService: {
        titre: "BBQ self-service",
        texte: "Accendi il tuo fuoco: postazioni di cottura ad accesso libero per grigliare i tuoi prodotti e provare l'attrezzatura.",
      },
      degustations: {
        titre: "Degustazioni",
        texte: "Salse, spezie, rub, carni: gli espositori ti fanno assaggiare i loro prodotti, stand dopo stand.",
      },
      marques: {
        titre: `${c.marques} marchi`,
        texte: "Da tutto il mondo: barbecue, kamado, affumicatori, plancha, coltelli, accessori. Confronta, chiedi consiglio e porta a casa il tuo preferito.",
      },
    },
    questions: [
      {
        q: "Quali sono i giorni e gli orari?",
        r: "Il salone è aperto venerdì 12 e sabato 13 marzo dalle 9:30 alle 19:00, e domenica 14 marzo dalle 9:30 alle 18:00, al Parc Floral de Paris.",
      },
      {
        q: "Come arrivare?",
        r: "In metro: linea 1, stazione Château de Vincennes (capolinea). In RER: linea A, stazione Vincennes.",
      },
      {
        q: "Il salone è aperto a tutti, anche il venerdì?",
        r: "Sì, tutti e tre i giorni sono aperti a tutti, principianti e appassionati. Il biglietto Venerdì Pro & Appassionati ha lo stesso prezzo per professionisti e privati.",
      },
      {
        q: "I miei figli pagano?",
        r: "I bambini sotto i 12 anni entrano gratis con un adulto pagante (massimo 4 bambini per adulto), il sabato o la domenica: aggiungi il loro biglietto gratuito all'ordine. Dai 12 ai 17 anni, il biglietto Giovani costa 10 €.",
      },
      {
        q: "Si può mangiare sul posto?",
        r: "Sì: la ristorazione del salone fa il giro del mondo delle braci, dal BBQ affumicato texano al barbecue coreano, argentino o brasiliano. E sugli stand gli espositori ti fanno assaggiare i loro prodotti.",
      },
      {
        q: "Si può acquistare sul posto?",
        r: "Sì, la maggior parte degli espositori vende la propria attrezzatura direttamente al salone.",
      },
      {
        q: "Vieni in famiglia o in gruppo?",
        r: "Il Pass Famiglia fa entrare 2 adulti e 2 ragazzi dai 12 ai 17 anni; è in vendita online fino a 7 giorni prima del salone, mai sul posto. Per aziende, associazioni e CRAL, il biglietto Gruppi & CRAL è disponibile a partire da 20 biglietti.",
      },
    ],
    ui: {
      galerie: "Galleria",
      photo: "Barbecue Expo in immagini",
      agrandir: "Ingrandisci",
      fermer: "Chiudi",
      precedente: "Precedente",
      suivante: "Successiva",
      video: "Video del salone",
      film: "Il film ufficiale",
      voirVideo: "Guarda il video dell'evento",
      lancer: "Guarda il video",
      programme: "In programma",
    },
  };
}

const TEXTES: Record<string, () => TextesSalon> = { fr, en, es, de, nl, pt, it };

export function salon(locale: string): TextesSalon {
  return (TEXTES[locale] || fr)();
}
