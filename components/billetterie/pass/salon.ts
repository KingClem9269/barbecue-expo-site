import { CHIFFRES, nombre } from "@/lib/chiffres";

/**
 * Les textes de présentation du salon sur /billetterie (sous la mosaïque) :
 * accroche, description, chiffres et programme, par langue. Le français fait
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
  "/photos-editions/j7i1281.jpg",
];

export type TextesSalon = {
  accroche: string;
  /** description, paragraphe par paragraphe */
  texte: string[];
  chiffres: { interieur: string; exterieur: string; marques: string; visiteurs: string };
  programme: Record<IdProgramme, { titre: string; texte: string }>;
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
    ui: {
      galerie: "Galerie",
      photo: "Barbecue Expo en images",
      agrandir: "Agrandir",
      fermer: "Fermer",
      precedente: "Précédente",
      suivante: "Suivante",
      video: "Vidéo du salon",
      film: "Le film officiel",
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
    ui: {
      galerie: "Gallery",
      photo: "Barbecue Expo in pictures",
      agrandir: "Enlarge",
      fermer: "Close",
      precedente: "Previous",
      suivante: "Next",
      video: "Show video",
      film: "The official film",
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
    ui: {
      galerie: "Galería",
      photo: "Barbecue Expo en imágenes",
      agrandir: "Ampliar",
      fermer: "Cerrar",
      precedente: "Anterior",
      suivante: "Siguiente",
      video: "Vídeo del salón",
      film: "El vídeo oficial",
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
    ui: {
      galerie: "Galerie",
      photo: "Barbecue Expo in Bildern",
      agrandir: "Vergrößern",
      fermer: "Schließen",
      precedente: "Zurück",
      suivante: "Weiter",
      video: "Messevideo",
      film: "Der offizielle Film",
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
    ui: {
      galerie: "Galerij",
      photo: "Barbecue Expo in beeld",
      agrandir: "Vergroten",
      fermer: "Sluiten",
      precedente: "Vorige",
      suivante: "Volgende",
      video: "Video van de beurs",
      film: "De officiële film",
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
    ui: {
      galerie: "Galeria",
      photo: "Barbecue Expo em imagens",
      agrandir: "Ampliar",
      fermer: "Fechar",
      precedente: "Anterior",
      suivante: "Seguinte",
      video: "Vídeo do salão",
      film: "O filme oficial",
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
    ui: {
      galerie: "Galleria",
      photo: "Barbecue Expo in immagini",
      agrandir: "Ingrandisci",
      fermer: "Chiudi",
      precedente: "Precedente",
      suivante: "Successiva",
      video: "Video del salone",
      film: "Il film ufficiale",
      lancer: "Guarda il video",
      programme: "In programma",
    },
  };
}

const TEXTES: Record<string, () => TextesSalon> = { fr, en, es, de, nl, pt, it };

export function salon(locale: string): TextesSalon {
  return (TEXTES[locale] || fr)();
}
