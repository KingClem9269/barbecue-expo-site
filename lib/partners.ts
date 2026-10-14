/**
 * Partenaires officiels de Barbecue Expo.
 * Pas de distinction de niveau (tous au même rang). Source unique pour la page
 * /nos-partenaires et les pages dédiées /nos-partenaires/[slug].
 */

export type PLocale = "fr" | "en" | "es" | "de" | "nl" | "pt" | "it";
/** fr et en obligatoires ; es, de, nl, pt, it optionnels (repli sur en puis fr). */
export type Bi = { fr: string; en: string; es?: string; de?: string; nl?: string; pt?: string; it?: string };

export interface Partner {
  slug: string;
  name: string;
  logo: string; // chemin servi depuis public/
  website: string;
  category: Bi;
  tagline: Bi;
  description: Bi;
  /** Lien interne complémentaire (article, page écosystème…) */
  internalHref?: string;
  internalLabel?: Bi;
  /** Badge mis en avant (ex. sponsor Grill Arena) */
  badge?: Bi;
}

export const PARTNERS: Partner[] = [
  {
    slug: "napoleon",
    name: "Napoleon",
    logo: "/content/images/7a5907deca_napoleoin.png",
    website: "https://www.napoleon.com/fr",
    category: { fr: "Barbecues & grills premium", en: "Premium grills", es: "Barbacoas y parrillas premium", de: "Premium-Grills", nl: "Premium barbecues & grills", pt: "Grelhadores premium", it: "Barbecue e griglie premium" },
    tagline: { fr: "L'excellence canadienne du grill", en: "Canadian grilling excellence", es: "La excelencia canadiense de la parrilla", de: "Kanadische Grill-Exzellenz", nl: "Canadese grill-excellentie", pt: "A excelência canadiana do grelhador", it: "L'eccellenza canadese del barbecue" },
    description: {
      fr: "Fabricant canadien fondé en 1976, Napoleon est l'un des plus grands noms du barbecue et du foyer en Amérique du Nord. La marque est reconnue pour ses grils gaz et charbon haut de gamme, ses grilles en fonte iconiques et ses innovations de cuisson — un symbole de robustesse et de précision.",
      en: "A Canadian manufacturer founded in 1976, Napoleon is one of North America's biggest names in grilling and fireplaces. The brand is known for its premium gas and charcoal grills, iconic cast-iron cooking grids and cooking innovations — a byword for durability and precision.",
      es: "Fabricante canadiense fundado en 1976, Napoleon es uno de los grandes nombres de la barbacoa y las chimeneas en Norteamérica. La marca es reconocida por sus parrillas de gas y carbón de alta gama, sus icónicas parrillas de hierro fundido y sus innovaciones de cocción: un símbolo de robustez y precisión.",
      de: "Der 1976 gegründete kanadische Hersteller Napoleon ist einer der größten Namen für Grills und Kamine in Nordamerika. Die Marke ist bekannt für ihre hochwertigen Gas- und Holzkohlegrills, ihre ikonischen Gussrost-Grillflächen und ihre Grill-Innovationen – ein Inbegriff von Robustheit und Präzision.",
      nl: "Napoleon, een Canadese fabrikant opgericht in 1976, is een van de grootste namen op het gebied van barbecues en haarden in Noord-Amerika. Het merk staat bekend om zijn hoogwaardige gas- en houtskoolbarbecues, iconische gietijzeren grillroosters en kookinnovaties — een symbool van robuustheid en precisie.",
      pt: "Fabricante canadiano fundado em 1976, a Napoleon é um dos maiores nomes dos grelhadores e lareiras na América do Norte. A marca é reconhecida pelos seus grelhadores a gás e a carvão de gama alta, pelas icónicas grelhas em ferro fundido e pelas suas inovações de cozinha — um símbolo de robustez e precisão.",
      it: "Produttore canadese fondato nel 1976, Napoleon è uno dei più grandi nomi del barbecue e dei caminetti in Nord America. Il marchio è noto per i suoi barbecue a gas e a carbone di alta gamma, le iconiche griglie in ghisa e le innovazioni di cottura: un simbolo di robustezza e precisione.",
    },
  },
  {
    slug: "weber",
    name: "Weber",
    logo: "/content/images/8dbe912df5_logo-weber-svg-1.png",
    website: "https://www.weber.com/FR/fr/home/",
    category: { fr: "Barbecues & fumoirs", en: "Grills & smokers", es: "Barbacoas y ahumadores", de: "Grills & Smoker", nl: "Barbecues & rookovens", pt: "Grelhadores e fumadores", it: "Barbecue e affumicatori" },
    tagline: { fr: "L'inventeur du barbecue boule", en: "Inventor of the kettle grill", es: "El inventor de la barbacoa de bola", de: "Der Erfinder des Kugelgrills", nl: "De uitvinder van de kogelbarbecue", pt: "O inventor do grelhador de bola", it: "L'inventore del barbecue a sfera" },
    description: {
      fr: "Fondée en 1952, Weber est le leader mondial du barbecue. Célèbre pour l'invention du barbecue boule « Kettle », la marque propose des barbecues charbon, gaz, électriques et à pellets, reconnus pour leur durabilité, leurs innovations et une garantie pouvant atteindre 15 ans.",
      en: "Founded in 1952, Weber is the world leader in barbecues. Famous for inventing the “Kettle” charcoal grill, the brand offers charcoal, gas, electric and pellet grills, praised for their durability, innovation and up-to-15-year warranty.",
      es: "Fundada en 1952, Weber es el líder mundial de la barbacoa. Célebre por haber inventado la barbacoa de bola «Kettle», la marca ofrece barbacoas de carbón, gas, eléctricas y de pellets, reconocidas por su durabilidad, sus innovaciones y una garantía de hasta 15 años.",
      de: "Weber wurde 1952 gegründet und ist Weltmarktführer im Bereich Grill. Berühmt für die Erfindung des Kugelgrills „Kettle“, bietet die Marke Holzkohle-, Gas-, Elektro- und Pelletgrills an, die für ihre Langlebigkeit, ihre Innovationen und eine Garantie von bis zu 15 Jahren geschätzt werden.",
      nl: "Weber, opgericht in 1952, is wereldleider in barbecues. Het merk, beroemd om de uitvinding van de kogelbarbecue „Kettle”, biedt houtskool-, gas-, elektrische en pelletbarbecues aan, geroemd om hun duurzaamheid, innovaties en een garantie tot 15 jaar.",
      pt: "Fundada em 1952, a Weber é líder mundial em grelhadores. Célebre por ter inventado o grelhador de bola «Kettle», a marca propõe grelhadores a carvão, a gás, elétricos e a pellets, reconhecidos pela sua durabilidade, inovação e uma garantia que pode chegar aos 15 anos.",
      it: "Fondata nel 1952, Weber è leader mondiale del barbecue. Celebre per aver inventato il barbecue a sfera «Kettle», il marchio propone barbecue a carbone, a gas, elettrici e a pellet, apprezzati per la loro durata, le innovazioni e una garanzia fino a 15 anni.",
    },
  },
  {
    slug: "campingaz",
    name: "Campingaz",
    logo: "/content/images/0710c00822_campingaz.png",
    website: "https://www.campingaz.fr/barbecues-et-planchas/",
    category: { fr: "Barbecues & planchas", en: "Grills & griddles", es: "Barbacoas y planchas", de: "Grills & Planchas", nl: "Barbecues & bakplaten", pt: "Grelhadores e planchas", it: "Barbecue e piastre" },
    tagline: { fr: "Le plein air à la française", en: "French outdoor living", es: "El aire libre a la francesa", de: "Outdoor-Leben auf Französisch", nl: "Buitenleven op z'n Frans", pt: "O ar livre à francesa", it: "L'outdoor alla francese" },
    description: {
      fr: "Marque française de référence du plein air, Campingaz est spécialiste des barbecues gaz, planchas et réchauds. Accessible et innovante, avec des technologies de cuisson modulables et un allumage instantané, elle accompagne depuis des décennies les grillades conviviales et la cuisine nomade.",
      en: "A leading French outdoor brand, Campingaz specialises in gas grills, planchas and stoves. Accessible and innovative, with modular cooking technologies and instant ignition, it has powered convivial grilling and outdoor cooking for decades.",
      es: "Marca francesa de referencia del aire libre, Campingaz está especializada en barbacoas de gas, planchas y hornillos. Accesible e innovadora, con tecnologías de cocción modulables y encendido instantáneo, acompaña desde hace décadas las parrilladas entre amigos y la cocina nómada.",
      de: "Campingaz, die französische Referenzmarke für Outdoor, ist auf Gasgrills, Planchas und Kocher spezialisiert. Zugänglich und innovativ, mit modularen Gartechnologien und Sofortzündung, begleitet sie seit Jahrzehnten gesellige Grillabende und die mobile Küche.",
      nl: "Campingaz, het toonaangevende Franse outdoormerk, is gespecialiseerd in gasbarbecues, plancha's en kooktoestellen. Toegankelijk en innovatief, met modulaire kooktechnologieën en directe ontsteking, is het al decennialang de vaste waarde voor gezellig grillen en koken onderweg.",
      pt: "Marca francesa de referência do ar livre, a Campingaz é especialista em grelhadores a gás, planchas e fogareiros. Acessível e inovadora, com tecnologias de cozinha modulares e ignição instantânea, acompanha há décadas as grelhadas em convívio e a cozinha nómada.",
      it: "Marchio francese di riferimento dell'outdoor, Campingaz è specializzato in barbecue a gas, plancha e fornelli. Accessibile e innovativo, con tecnologie di cottura modulari e accensione istantanea, accompagna da decenni le grigliate in compagnia e la cucina all'aperto.",
    },
  },
  {
    slug: "zip-feux",
    name: "Zip Feux",
    logo: "/partners/zip-feux/logo.png",
    website: "https://zipfeux.com/",
    category: { fr: "Allume-feux & combustibles", en: "Firelighters & fuels", es: "Pastillas de encendido y combustibles", de: "Anzünder & Brennstoffe", nl: "Aanmaakblokjes & brandstoffen", pt: "Acendedores e combustíveis", it: "Accendifuoco e combustibili" },
    tagline: { fr: "Dans le feu de l'action depuis 80 ans", en: "In the heat of the action for 80 years", es: "En el fuego de la acción desde hace 80 años", de: "Seit 80 Jahren mitten im Feuer des Geschehens", nl: "Al 80 jaar midden in het vuur", pt: "No calor da ação há 80 anos", it: "Nel vivo dell'azione da 80 anni" },
    description: {
      fr: "Marque à l'héritage irlandais du groupe SHS, Zip® (Zip Feux) a inventé l'allume-feu au kérosène et perpétue depuis près d'un siècle une tradition de fiabilité. Allume-feux, charbon et combustibles certifiés FSC®, portés par un engagement durable fort.",
      en: "An Irish-heritage brand of the SHS Group, Zip® (Zip Feux) invented the kerosene firelighter and has upheld a tradition of reliability for nearly a century. FSC®-certified firelighters, charcoal and fuels, driven by a strong sustainability commitment.",
      es: "Marca de herencia irlandesa del grupo SHS, Zip® (Zip Feux) inventó la pastilla de encendido de queroseno y mantiene desde hace casi un siglo una tradición de fiabilidad. Pastillas de encendido, carbón y combustibles con certificación FSC®, impulsados por un fuerte compromiso con la sostenibilidad.",
      de: "Zip® (Zip Feux), eine Marke mit irischen Wurzeln der SHS Group, hat den Kerosin-Anzünder erfunden und pflegt seit fast einem Jahrhundert eine Tradition der Zuverlässigkeit. FSC®-zertifizierte Anzünder, Holzkohle und Brennstoffe, getragen von einem starken Nachhaltigkeitsengagement.",
      nl: "Zip® (Zip Feux), een merk met Ierse roots van de SHS Group, vond het aanmaakblokje op kerosinebasis uit en zet al bijna een eeuw een traditie van betrouwbaarheid voort. FSC®-gecertificeerde aanmaakblokjes, houtskool en brandstoffen, gedragen door een sterk duurzaamheidsengagement.",
      pt: "Marca de herança irlandesa do grupo SHS, a Zip® (Zip Feux) inventou o acendedor a querosene e perpetua há quase um século uma tradição de fiabilidade. Acendedores, carvão e combustíveis com certificação FSC®, impulsionados por um forte compromisso com a sustentabilidade.",
      it: "Marchio di tradizione irlandese del gruppo SHS, Zip® (Zip Feux) ha inventato l'accendifuoco al cherosene e da quasi un secolo porta avanti una tradizione di affidabilità. Accendifuoco, carbone e combustibili certificati FSC®, sostenuti da un forte impegno per la sostenibilità.",
    },
    badge: { fr: "Sponsor officiel de la Grill Arena", en: "Official Grill Arena sponsor", es: "Patrocinador oficial de la Grill Arena", de: "Offizieller Sponsor der Grill Arena", nl: "Officiële sponsor van de Grill Arena", pt: "Patrocinador oficial da Grill Arena", it: "Sponsor ufficiale della Grill Arena" },
    internalHref: "/actualites/zip-feux-partenaire-officiel-2027",
    internalLabel: { fr: "Lire l'article", en: "Read the article", es: "Leer el artículo", de: "Artikel lesen", nl: "Lees het artikel", pt: "Ler o artigo", it: "Leggi l'articolo" },
  },
  {
    slug: "ma-bonne-viande",
    name: "Ma Bonne Viande",
    logo: "/content/images/be7506edc9_ma-bonne-viande-x-barbecue-expo.png",
    website: "https://www.mabonneviande.com/",
    category: { fr: "Viandes premium", en: "Premium meats", es: "Carnes premium", de: "Premium-Fleisch", nl: "Premium vlees", pt: "Carnes premium", it: "Carni premium" },
    tagline: { fr: "La viande d'exception, du pro au particulier", en: "Exceptional meat, from pro to home", es: "Carne de excepción, del profesional al particular", de: "Außergewöhnliches Fleisch, vom Profi bis nach Hause", nl: "Uitzonderlijk vlees, van professional tot particulier", pt: "Carne de exceção, do profissional ao particular", it: "Carne d'eccezione, dal professionista al privato" },
    description: {
      fr: "Grossiste en viande premium en ligne depuis 2004, Ma Bonne Viande sélectionne des viandes d'exception — bœuf Black Angus, Wagyu, porc ibérique, races à viande — auprès des meilleurs fournisseurs français et internationaux. Fournisseur de restaurants étoilés, la maison ouvre désormais sa sélection aux particuliers.",
      en: "An online premium-meat wholesaler since 2004, Ma Bonne Viande selects exceptional cuts — Black Angus, Wagyu, Iberian pork and specialist breeds — from the best French and international suppliers. A supplier to Michelin-starred restaurants, it now opens its selection to home cooks.",
      es: "Mayorista en línea de carne premium desde 2004, Ma Bonne Viande selecciona carnes de excepción —buey Black Angus, Wagyu, cerdo ibérico, razas cárnicas— de los mejores proveedores franceses e internacionales. Proveedor de restaurantes con estrellas Michelin, la casa abre ahora su selección a los particulares.",
      de: "Ma Bonne Viande ist seit 2004 ein Online-Großhändler für Premium-Fleisch und wählt außergewöhnliches Fleisch – Black-Angus-Rind, Wagyu, iberisches Schwein, Fleischrassen – bei den besten französischen und internationalen Lieferanten aus. Als Lieferant von Sternerestaurants öffnet das Haus seine Auswahl nun auch für Privatkunden.",
      nl: "Ma Bonne Viande is sinds 2004 een online groothandel in premium vlees en selecteert uitzonderlijk vlees — Black Angus-rund, Wagyu, Iberisch varkensvlees, vleesrassen — bij de beste Franse en internationale leveranciers. Als leverancier van sterrenrestaurants stelt het huis zijn selectie nu ook open voor particulieren.",
      pt: "Grossista online de carne premium desde 2004, a Ma Bonne Viande seleciona carnes de exceção — novilho Black Angus, Wagyu, porco ibérico, raças de carne — junto dos melhores fornecedores franceses e internacionais. Fornecedora de restaurantes com estrelas Michelin, a casa abre agora a sua seleção aos particulares.",
      it: "Grossista online di carne premium dal 2004, Ma Bonne Viande seleziona carni d'eccezione — manzo Black Angus, Wagyu, maiale iberico, razze da carne — presso i migliori fornitori francesi e internazionali. Fornitore di ristoranti stellati, la maison apre ora la sua selezione ai privati.",
    },
  },
  {
    slug: "barbecue-mag",
    name: "Barbecue Mag",
    logo: "/content/images/e4ba531c1d_logo-bbq-mag1.png",
    website: "https://www.barbecue-mag.fr",
    category: { fr: "Média barbecue", en: "BBQ media", es: "Medio barbacoa", de: "Grill-Medium", nl: "Barbecuemedium", pt: "Media de grelhados", it: "Media barbecue" },
    tagline: { fr: "Le magazine de la cuisson au feu", en: "The fire-cooking magazine", es: "La revista de la cocina al fuego", de: "Das Magazin für das Kochen mit Feuer", nl: "Het magazine over koken op vuur", pt: "A revista da cozinha no fogo", it: "La rivista della cucina sul fuoco" },
    description: {
      fr: "Média de référence de la cuisson au feu : magazine papier, articles, tests produits, recettes, interviews et Barbecue TV. Partenaire média et membre de l'écosystème Barbecue Expo, il prolonge l'expérience du salon toute l'année.",
      en: "The reference media for fire cooking: print magazine, articles, product tests, recipes, interviews and Barbecue TV. A media partner and member of the Barbecue Expo ecosystem, it extends the show experience all year round.",
      es: "Medio de referencia de la cocina al fuego: revista impresa, artículos, pruebas de productos, recetas, entrevistas y Barbecue TV. Socio mediático y miembro del ecosistema Barbecue Expo, prolonga la experiencia del salón durante todo el año.",
      de: "Das Referenzmedium für das Kochen mit Feuer: Printmagazin, Artikel, Produkttests, Rezepte, Interviews und Barbecue TV. Als Medienpartner und Mitglied des Barbecue-Expo-Ökosystems verlängert es das Messeerlebnis das ganze Jahr über.",
      nl: "Het referentiemedium voor koken op vuur: papieren magazine, artikelen, producttests, recepten, interviews en Barbecue TV. Als mediapartner en lid van het Barbecue Expo-ecosysteem verlengt het de beursbeleving het hele jaar door.",
      pt: "O meio de referência da cozinha no fogo: revista impressa, artigos, testes de produtos, receitas, entrevistas e Barbecue TV. Parceiro de media e membro do ecossistema Barbecue Expo, prolonga a experiência do salão durante todo o ano.",
      it: "Il media di riferimento della cucina sul fuoco: rivista cartacea, articoli, test di prodotti, ricette, interviste e Barbecue TV. Media partner e membro dell'ecosistema Barbecue Expo, prolunga l'esperienza del salone tutto l'anno.",
    },
    internalHref: "/agenda",
    internalLabel: { fr: "L'écosystème Barbecue", en: "The Barbecue ecosystem", es: "El ecosistema Barbecue", de: "Das Barbecue-Ökosystem", nl: "Het Barbecue-ecosysteem", pt: "O ecossistema Barbecue", it: "L'ecosistema Barbecue" },
  },
];

const LOCALES: readonly PLocale[] = ["fr", "en", "es", "de", "nl", "pt", "it"];

export function pLocale(locale: string): PLocale {
  return (LOCALES as readonly string[]).includes(locale) ? (locale as PLocale) : "fr";
}

/** Texte dans la langue demandée ; repli sur en puis fr si la traduction manque. */
export function pText(v: Bi, locale: string): string {
  return v[pLocale(locale)] || v.en || v.fr;
}

export function getPartner(slug: string): Partner | undefined {
  return PARTNERS.find((p) => p.slug === slug);
}
