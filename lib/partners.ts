/**
 * Partenaires officiels de Barbecue Expo.
 * Pas de distinction de niveau (tous au même rang). Source unique pour la page
 * /nos-partenaires et les pages dédiées /nos-partenaires/[slug].
 */

export type Bi = { fr: string; en: string };

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
    category: { fr: "Barbecues & grills premium", en: "Premium grills" },
    tagline: { fr: "L'excellence canadienne du grill", en: "Canadian grilling excellence" },
    description: {
      fr: "Fabricant canadien fondé en 1976, Napoleon est l'un des plus grands noms du barbecue et du foyer en Amérique du Nord. La marque est reconnue pour ses grils gaz et charbon haut de gamme, ses grilles en fonte iconiques et ses innovations de cuisson — un symbole de robustesse et de précision.",
      en: "A Canadian manufacturer founded in 1976, Napoleon is one of North America's biggest names in grilling and fireplaces. The brand is known for its premium gas and charcoal grills, iconic cast-iron cooking grids and cooking innovations — a byword for durability and precision.",
    },
  },
  {
    slug: "weber",
    name: "Weber",
    logo: "/content/images/8dbe912df5_logo-weber-svg-1.png",
    website: "https://www.weber.com/FR/fr/home/",
    category: { fr: "Barbecues & fumoirs", en: "Grills & smokers" },
    tagline: { fr: "L'inventeur du barbecue boule", en: "Inventor of the kettle grill" },
    description: {
      fr: "Fondée en 1952, Weber est le leader mondial du barbecue. Célèbre pour l'invention du barbecue boule « Kettle », la marque propose des barbecues charbon, gaz, électriques et à pellets, reconnus pour leur durabilité, leurs innovations et une garantie pouvant atteindre 15 ans.",
      en: "Founded in 1952, Weber is the world leader in barbecues. Famous for inventing the “Kettle” charcoal grill, the brand offers charcoal, gas, electric and pellet grills, praised for their durability, innovation and up-to-15-year warranty.",
    },
  },
  {
    slug: "campingaz",
    name: "Campingaz",
    logo: "/content/images/0710c00822_campingaz.png",
    website: "https://www.campingaz.fr/barbecues-et-planchas/",
    category: { fr: "Barbecues & planchas", en: "Grills & griddles" },
    tagline: { fr: "Le plein air à la française", en: "French outdoor living" },
    description: {
      fr: "Marque française de référence du plein air, Campingaz est spécialiste des barbecues gaz, planchas et réchauds. Accessible et innovante, avec des technologies de cuisson modulables et un allumage instantané, elle accompagne depuis des décennies les grillades conviviales et la cuisine nomade.",
      en: "A leading French outdoor brand, Campingaz specialises in gas grills, planchas and stoves. Accessible and innovative, with modular cooking technologies and instant ignition, it has powered convivial grilling and outdoor cooking for decades.",
    },
  },
  {
    slug: "zip-feux",
    name: "Zip Feux",
    logo: "/partners/zip-feux/logo.png",
    website: "https://zipfeux.com/",
    category: { fr: "Allume-feux & combustibles", en: "Firelighters & fuels" },
    tagline: { fr: "Dans le feu de l'action depuis 80 ans", en: "In the heat of the action for 80 years" },
    description: {
      fr: "Marque à l'héritage irlandais du groupe SHS, Zip® (Zip Feux) a inventé l'allume-feu au kérosène et perpétue depuis près d'un siècle une tradition de fiabilité. Allume-feux, charbon et combustibles certifiés FSC®, portés par un engagement durable fort.",
      en: "An Irish-heritage brand of the SHS Group, Zip® (Zip Feux) invented the kerosene firelighter and has upheld a tradition of reliability for nearly a century. FSC®-certified firelighters, charcoal and fuels, driven by a strong sustainability commitment.",
    },
    badge: { fr: "Sponsor officiel de la Grill Arena", en: "Official Grill Arena sponsor" },
    internalHref: "/actualites/zip-feux-partenaire-officiel-2027",
    internalLabel: { fr: "Lire l'article", en: "Read the article" },
  },
  {
    slug: "ma-bonne-viande",
    name: "Ma Bonne Viande",
    logo: "/content/images/be7506edc9_ma-bonne-viande-x-barbecue-expo.png",
    website: "https://www.mabonneviande.com/",
    category: { fr: "Viandes premium", en: "Premium meats" },
    tagline: { fr: "La viande d'exception, du pro au particulier", en: "Exceptional meat, from pro to home" },
    description: {
      fr: "Grossiste en viande premium en ligne depuis 2004, Ma Bonne Viande sélectionne des viandes d'exception — bœuf Black Angus, Wagyu, porc ibérique, races à viande — auprès des meilleurs fournisseurs français et internationaux. Fournisseur de restaurants étoilés, la maison ouvre désormais sa sélection aux particuliers.",
      en: "An online premium-meat wholesaler since 2004, Ma Bonne Viande selects exceptional cuts — Black Angus, Wagyu, Iberian pork and specialist breeds — from the best French and international suppliers. A supplier to Michelin-starred restaurants, it now opens its selection to home cooks.",
    },
  },
  {
    slug: "barbecue-mag",
    name: "Barbecue Mag",
    logo: "/content/images/e4ba531c1d_logo-bbq-mag1.png",
    website: "https://www.barbecue-mag.fr",
    category: { fr: "Média barbecue", en: "BBQ media" },
    tagline: { fr: "Le magazine de la cuisson au feu", en: "The fire-cooking magazine" },
    description: {
      fr: "Média de référence de la cuisson au feu : magazine papier, articles, tests produits, recettes, interviews et Barbecue TV. Partenaire média et membre de l'écosystème Barbecue Expo, il prolonge l'expérience du salon toute l'année.",
      en: "The reference media for fire cooking: print magazine, articles, product tests, recipes, interviews and Barbecue TV. A media partner and member of the Barbecue Expo ecosystem, it extends the show experience all year round.",
    },
    internalHref: "/agenda",
    internalLabel: { fr: "L'écosystème Barbecue", en: "The Barbecue ecosystem" },
  },
];

const ALIASES: Record<string, "fr" | "en"> = { es: "fr", de: "fr", nl: "fr", pt: "fr", it: "fr" };

export function pLocale(locale: string): "fr" | "en" {
  return locale === "fr" || locale === "en" ? locale : ALIASES[locale] || "fr";
}

export function pText(v: Bi, locale: string): string {
  return v[pLocale(locale)];
}

export function getPartner(slug: string): Partner | undefined {
  return PARTNERS.find((p) => p.slug === slug);
}
