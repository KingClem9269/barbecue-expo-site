/**
 * SCAFFOLD DATA — Page "Présentation & Catalogue exposant" (FR).
 *
 * ⚠️ Structure de travail : prix connus du deck pré-remplis, le reste en
 * placeholder "[À compléter]". L'utilisateur fournira textes/photos/prix/détails
 * étape par étape. Tout est éditable ici (data-driven).
 */

export const TODO = "[À compléter]";
export const PHOTO = "[Photo à venir]";

/* ===================== PART A — PRÉSENTATION DU SALON ===================== */

export const PRESENTATION_NAV = [
  { id: "expo", label: "Barbecue Expo" },
  { id: "salon", label: "Le Salon" },
  { id: "visiteurs", label: "Visiteurs pros" },
  { id: "communication", label: "Plan de com'" },
];

export const CATALOGUE_NAV = [
  { id: "stand", label: "Choisir son stand" },
  { id: "exterieur", label: "Espace extérieur" },
  { id: "options-stand", label: "Options de stand" },
  { id: "partenaires", label: "Devenir partenaire" },
  { id: "comm-stand", label: "Com' sur stand" },
  { id: "comm-place", label: "Com' sur place" },
  { id: "branding", label: "Branding" },
  { id: "comm-digital", label: "Com' digitale" },
  { id: "sponsoring", label: "Sponsoring de zone" },
  { id: "barbecue-mag", label: "Barbecue Mag" },
];

/* Partie 2 — catégories de produits exposés */
export const PRODUCT_CATEGORIES = [
  { name: "Barbecue", detail: "Grills, smokers, kamados, braseros, fours, planchas…" },
  { name: "Accessoires & équipements", detail: "Ustensiles, thermomètres, housses, mobilier de cuisson…" },
  { name: "Combustibles", detail: "Charbon, briquettes, pellets, bois de fumage, allumage." },
  { name: "Cuisines & aménagements d'extérieur", detail: "Cuisines d'été, îlots, fours à pizza, mobilier outdoor." },
  { name: "Sauces, rubs & épices", detail: "Marinades, mélanges, condiments, hot sauces." },
  { name: "Épicerie fine & alimentaire", detail: "Viandes premium, produits gourmets, ingrédients." },
  { name: "Alcool & spiritueux", detail: "Bières, vins, spiritueux, accords BBQ." },
  { name: "Restauration & traiteurs", detail: "Street food, traiteurs, food trucks." },
];

/* Partie 3 — provenance des visiteurs (tableau + carte) */
export const VISITOR_PROVENANCE = [
  { name: "France", flag: "fr", pct: "77 %" },
  { name: "Benelux", flag: "be", pct: "9,6 %" },
  { name: "Allemagne", flag: "de", pct: "4,0 %" },
  { name: "Royaume-Uni", flag: "gb", pct: "3,2 %" },
  { name: "Italie", flag: "it", pct: "2,2 %" },
  { name: "Espagne", flag: "es", pct: "1,2 %" },
  { name: "Reste de l'Europe & monde", flag: null, pct: "2,8 %" },
];

// Légende carte
export const MAP_LEGEND = [
  { color: "#C97A14", label: "France (77 %)" },
  { color: "#E0901C", label: "Benelux (9,6 %)" },
  { color: "#EFAE4A", label: "Allemagne (4 %)" },
  { color: "#F7D492", label: "Autres pays % (UK, Italie, Espagne)" },
  { color: "#FBE7B5", label: "Pays également représentés" },
];

/* Partie 3 — types de professionnels (logos enseignes = placeholders) */
export const PRO_TYPES: {
  key: string;
  title: string;
  desc: string;
  logos: number;
  brands?: { name: string; src: string; dark?: boolean; cover?: boolean }[]; // dark = logo clair → tuile foncée ; cover = vignette photo + nom (resto)
  blurredFill?: number; // nb de logos floutés ajoutés après les vrais (effet "roster confidentiel")
}[] = [
  {
    key: "retailers",
    title: "Retailers & magasins spécialisés",
    desc: "Distribution barbecue, équipement de cuisson outdoor, accessoires, magasins de poêles et inserts.",
    logos: 8, // nombre de placeholders logos — à remplacer par les vrais
    brands: [
      { name: "Breizh Barbecue", src: "/enseignes/retailers/breizh-barbecue.jpg" },
      { name: "Samo", src: "/enseignes/retailers/samo.webp" },
      { name: "DIM'S", src: "/enseignes/retailers/dims.png" },
      { name: "Motion Prestashio", src: "/enseignes/retailers/motion-prestashio.jpg" },
      { name: "Revendeur partenaire", src: "/enseignes/retailers/revendeur-01.jpg" },
      { name: "Revendeur partenaire", src: "/enseignes/retailers/revendeur-02.jpg" },
      { name: "Revendeur partenaire", src: "/enseignes/retailers/revendeur-03.png" },
      { name: "Kamado Compleet", src: "/enseignes/retailers/kamado-compleet.png" },
      { name: "BBQ 2ssad", src: "/enseignes/retailers/bbq-2ssad.png" },
      { name: "Revendeur partenaire", src: "/enseignes/retailers/revendeur-04.jpeg" },
      { name: "Revendeur partenaire", src: "/enseignes/retailers/revendeur-05.png" },
    ],
  },
  {
    key: "gsa-gsb",
    title: "Acheteurs GSA, GSB, GSS & jardinerie",
    desc: "Grandes surfaces alimentaires, de bricolage, spécialisées ou jardin.",
    logos: 8,
    brands: [
      { name: "Carrefour", src: "/enseignes/gsa-gsb/carrefour.webp" },
      { name: "Monoprix", src: "/enseignes/gsa-gsb/monoprix.webp" },
      { name: "Intermarché", src: "/enseignes/gsa-gsb/intermarche.png" },
      { name: "Veepee", src: "/enseignes/gsa-gsb/veepee.svg" },
      { name: "Leroy Merlin", src: "/enseignes/gsa-gsb/leroy-merlin.png" },
      { name: "Castorama", src: "/enseignes/gsa-gsb/castorama.jpg" },
      { name: "Brico Dépôt", src: "/enseignes/gsa-gsb/brico-depot.png" },
      { name: "Bricomarché", src: "/enseignes/gsa-gsb/bricomarche.jpg" },
      { name: "Bricorama", src: "/enseignes/gsa-gsb/bricorama.png" },
      { name: "Mr.Bricolage", src: "/enseignes/gsa-gsb/mr-bricolage.png" },
      { name: "Weldom", src: "/enseignes/gsa-gsb/weldom.png" },
      { name: "BigMat", src: "/enseignes/gsa-gsb/bigmat.jpg" },
      { name: "Kingfisher", src: "/enseignes/gsa-gsb/kingfisher.png" },
      { name: "Conforama", src: "/enseignes/gsa-gsb/conforama.webp" },
      { name: "Teract", src: "/enseignes/gsa-gsb/teract.png" },
      { name: "Villaverde", src: "/enseignes/gsa-gsb/villaverde.webp" },
      { name: "Jardiland", src: "/enseignes/gsa-gsb/jardiland.png" },
      { name: "Truffaut", src: "/enseignes/gsa-gsb/truffaut.png" },
      { name: "Gamm Vert", src: "/enseignes/gsa-gsb/gamm-vert.jpg" },
      { name: "Botanic", src: "/enseignes/gsa-gsb/botanic.jpg" },
      { name: "Point Vert", src: "/enseignes/gsa-gsb/point-vert.jpg" },
      { name: "Delbard", src: "/enseignes/gsa-gsb/delbard.jpg" },
      { name: "Enseigne partenaire", src: "/enseignes/gsa-gsb/enseigne-01.jpg" },
      { name: "Enseigne partenaire", src: "/enseignes/gsa-gsb/enseigne-02.png" },
      { name: "Enseigne partenaire", src: "/enseignes/gsa-gsb/enseigne-03.png" },
    ],
  },
  {
    key: "distributeurs",
    title: "Distributeurs · Importateurs · Exportateurs",
    desc: "Acteurs de la distribution et du commerce international du barbecue.",
    logos: 6,
    brands: [
      { name: "RAUW²¹", src: "/enseignes/distributeurs/rauw.webp" },
      { name: "Favex", src: "/enseignes/distributeurs/favex.png" },
      { name: "Barbecue & Co", src: "/enseignes/distributeurs/barbecue-and-co.png" },
      { name: "Planet Outdoor", src: "/enseignes/distributeurs/planet-outdoor.webp" },
      { name: "Plan B", src: "/enseignes/distributeurs/plan-b.png" },
    ],
    blurredFill: 7,
  },
  {
    key: "chr",
    title: "Responsables CHR & hôtellerie-restauration",
    desc: "Hôtels, restaurants, traiteurs, groupes de loisirs, campings.",
    logos: 6,
    brands: [
      { name: "Sodexo", src: "/enseignes/chr/sodexo.png" },
      { name: "Le Train Bleu", src: "/enseignes/chr/le-train-bleu.png" },
      { name: "Accor", src: "/enseignes/chr/accor.png" },
      { name: "Goody Grill", src: "/enseignes/chr/goody-grill.png" },
      // Restaurateurs présents sur la BBQ Street Food (vignettes photo)
      { name: "Chango", src: "/content/images/bb579017a3_tatianagregoire-3-141_edited.jpg", cover: true },
      { name: "melt", src: "/content/images/1b72183fdb_melt-salon-bbq38020.jpg", cover: true },
      { name: "Selva", src: "/content/images/8ad7180587_salome_rateau-85.jpg", cover: true },
      { name: "Soon Grill", src: "/content/images/605dc56a79_image-15.png", cover: true },
      { name: "PNY", src: "/content/images/cd7f51d556_quentintourbez-pny-juicylucy01-01971.webp", cover: true },
      { name: "Nicky's BBQ", src: "/content/images/cabba322fb_p1050471-1.jpg", cover: true },
      { name: "H.O.M. Steakhouse", src: "/content/images/82a793fc75_photo_1711378025992.jpg", cover: true },
      { name: "Le Boukané", src: "/content/images/3572fda09c_le-boukane.png", cover: true },
      { name: "Le Cochon Voyageur", src: "/content/images/21804e4f01_2-photo-machine-officiel.jpg", cover: true },
      { name: "Marché Noir", src: "/content/images/4fa262e993_img_5155.JPG", cover: true },
      { name: "A Feu Lent", src: "/content/images/e88b832c97_b22c72bd-bd4f-499f-bdaa-e86ca27d64e4.jpeg", cover: true },
      { name: "Au Feu le Saumon", src: "/content/images/7a9eebd7f0_4829a452-95a7-40b1-91af-0eedd7d8ddeb.jpeg", cover: true },
      { name: "Atelier du Braséro", src: "/content/images/3b340a019d_brasero.png", cover: true },
      { name: "Villa Marthe", src: "/content/images/2f6b64df76_img-20250429-wa0013.jpg", cover: true },
    ],
  },
  {
    key: "amenagement",
    title: "Professionnels de l'aménagement d'extérieur",
    desc: "Paysagistes, piscinistes, fabricants et installateurs de cuisines d'été, mobilier extérieur, équipements.",
    logos: 6,
    brands: [
      { name: "Agave Paysage", src: "/enseignes/amenagement/agave-paysage.png" },
      { name: "AMEX Piscines & Spa", src: "/enseignes/amenagement/amex-piscines.png", dark: true },
      { name: "Symbiose Extérieur Concept", src: "/enseignes/amenagement/symbiose.png" },
      { name: "La Cornue", src: "/enseignes/amenagement/la-cornue.webp" },
      { name: "Suzzoni Cuisines & Meubles", src: "/enseignes/amenagement/suzzoni.png" },
      { name: "Terrasses des Oliviers", src: "/enseignes/amenagement/terrasses-oliviers.png" },
      { name: "Urbanica", src: "/enseignes/amenagement/urbanica.png" },
      { name: "AEV Architectures", src: "/enseignes/amenagement/aev-architectures.jpeg" },
      { name: "ixina", src: "/enseignes/amenagement/logo-blue.svg" },
      { name: "perene", src: "/enseignes/amenagement/perene.jpg" },
    ],
    blurredFill: 2,
  },
];

/* Partie 4 — Plan de communication */

// Vidéos principales (encadrées). thumb = placeholder à remplacer.
export const MEDIA_FEATURED = [
  { outlet: "TF1", show: "JT de 20h", url: "https://www.tf1info.fr/replay-tf1/videos/video-le-jt-de-20-heures-de-tf1-du-vendredi-10-avril-2026-2435356.html", thumb: "/media-thumbs/tf1-default.jpg" },
  { outlet: "M6", show: "Le 12:45", url: "https://www.m6.fr/le-1245-p_1056/le-1245-du-10-04-2026-c_13174185", thumb: "/photos-2026/bbq-expo-105.jpg" },
  { outlet: "TF1", show: "Bonjour ! La Matinale", url: "https://www.tf1info.fr/replay-tf1/videos/video-bonjour-avec-vous-du-10-avril-2026-2435260.html", thumb: "/photos-2026/bbq-expo-107.jpg" },
  { outlet: "France 2", show: "JT 13h", url: "https://www.france.tv/france-2/journal-13h00/8325045-edition-du-vendredi-10-avril-2026.html", thumb: "/media-thumbs/france2-jt.jpg" },
];

// Toutes les retombées (logo = placeholder, url quand dispo)
export const MEDIA_MENTIONS = [
  { name: "20 Minutes", domain: "20minutes.fr", logo: "/media-logos/20-minutes.webp", url: null },
  { name: "France 2 — JT", domain: "france.tv", logo: "/media-logos/france2-jt.jpg", url: "https://www.france.tv/france-2/journal-13h00/8325045-edition-du-vendredi-10-avril-2026.html" },
  { name: "LCI", domain: "lci.fr", logo: "/media-logos/lci.jpg", url: null },
  { name: "France Info", domain: "franceinfo.fr", logo: "/media-logos/france-info.avif", url: "https://www.franceinfo.fr/sante/alimentation/barbecue-la-passion-qui-enflamme-les-francais_7929506.html" },
  { name: "Radio Nova", domain: "nova.fr", logo: "/media-logos/radio-nova.jpg", url: "https://podcasts.nova.fr/radio-nova-mylene-temmene" },
  { name: "France 2 — Télématin", domain: "france.tv", logo: "/media-logos/france2-telematin.png", url: "https://www.france.tv/france-2/telematin/8334849-emission-du-mardi-14-avril-2026.html" },
  { name: "RMC — La Matinale", domain: "rmc.bfmtv.com", logo: "/media-logos/rmc-matinale.png", url: "https://rmc.bfmtv.com/replay-emissions/bonjour-c-est-fred/video-plancha-cuissons-burgers-la-barbecue-expo-de-retour-pour-une-5e-edition-a-paris_VN-202604110097.html" },
  { name: "ICI — Île-de-France", domain: "francebleu.fr", logo: "/media-logos/ici-idf.png", url: "https://www.radiofrance.fr/francebleu/podcasts/bienvenue-chez-vous-ici-paris-ile-de-france/barbecue-expo-2026-nos-conseils-pour-reussir-vos-grillades-comme-un-chef-7718777" },
  { name: "LCI — La Matinale", domain: "lci.fr", logo: "/media-logos/lci-matinale.jpeg", url: "https://www.tf1info.fr/replay-lci/videos/video-la-matinale-du-vendredi-10-avril-2026-2435351.html" },
  { name: "France 5 — C à vous", domain: "france.tv", logo: "/media-logos/france5-cavous.webp", url: "https://www.france.tv/france-5/c-a-vous/saison-17/8322855-emission-du-vendredi-10-avril-2026.html" },
  { name: "RTL — La Matinale", domain: "rtl.fr", logo: "/media-logos/rtl-matinale.avif", url: null },
  { name: "RTL — Le P'tit Phénomène", domain: "rtl.fr", logo: "/media-logos/rtl-ptit-phenomene.png", url: "https://www.rtl.fr/programmes/le-p-tit-phenomene/7900621955-le-barbecue-change-de-braise-la-plancha-prend-le-pouvoir" },
  { name: "Sortir à Paris", domain: "sortiraparis.com", logo: "/media-logos/sortir-a-paris.png", url: "https://www.sortiraparis.com/loisirs/salon/articles/209418-barbecue-expo-2026-le-salon-du-bbq-au-parc-floral-de-paris" },
  { name: "X — RTL France", domain: "x.com", logo: null, url: "https://x.com/RTLFrance/status/2042320671964086407" },
];

// Affichage public massif
export const AFFICHAGE = {
  stats: [
    { value: "3 500", label: "affiches publiques" },
    { value: "500 M", label: "contacts visuels" },
    { value: "20 M", label: "de personnes touchées" },
  ],
  photos: [
    { src: "/affichage/affiche-01.jpg", pos: "center 82%" }, // bus : on remonte pour voir la pub en bas
    { src: "/affichage/affiche-02.jpg" },
    { src: "/affichage/affiche-03.jpg" },
    { src: "/affichage/affiche-04.jpg" },
    { src: "/affichage/affiche-05.jpg" },
  ] as { src: string; pos?: string }[], // campagnes métro / bus / entrée du salon
};

// Réseaux sociaux & newsletter
export const SOCIAL_REACH = {
  headline: "200 000",
  unit: "abonnés spécialisés",
  sub: "Professionnels et grand public spécialisés — réseaux sociaux + newsletter.",
};

export const SOCIAL_ACCOUNTS = [
  { brand: "Barbecue Expo", url: "https://www.instagram.com/barbecue_expo/" },
  { brand: "Barbecue Fest Paris", url: TODO },
  { brand: "Barbecue Fest Normandie", url: TODO },
  { brand: "Barbecue Mag", url: TODO },
  { brand: "Coupe de France de Barbecue", url: TODO },
];

// Exemples de posts (Instagram) par catégorie
export const SOCIAL_POSTS = [
  {
    category: "Vidéos du salon",
    urls: [
      "https://www.instagram.com/p/DXe-HIFjmFO/",
      "https://www.instagram.com/p/DXI89RjsiCU/",
      "https://www.instagram.com/p/DXG6I_qoMs5/",
      "https://www.instagram.com/p/DXCqeKtjnqx/",
      "https://www.instagram.com/p/DW-_JHhjbDP/",
    ],
  },
  {
    category: "Vidéos Food",
    urls: [
      "https://www.instagram.com/p/DUGdebsiD9F/",
      "https://www.instagram.com/p/DTf6i2BDpCO/",
      "https://www.instagram.com/p/DRzuOwtCIDj/",
    ],
  },
  {
    category: "Vidéos Marques",
    urls: [
      "https://www.instagram.com/p/DVoSHdLgbnC/",
      "https://www.instagram.com/p/DUivG4ciM1I/",
    ],
  },
];

/* ===================== PART B — CATALOGUE EXPOSANT ===================== */

// 1a. Surface nue — étape 1 « Je choisis la taille »
export const STAND_SURFACE = {
  includes: [
    "Traçage au sol uniquement",
    "Moquette non incluse",
    "Présentation du plan de construction du stand aux organisateurs (obligatoire)",
    "Nombre de badges exposants (selon la surface du stand)",
  ],
  zones: [
    { zone: "Zone A", price: "250 € HT / m²" },
    { zone: "Zone B", price: "200 € HT / m²" },
  ],
};

const MOQUETTE = [
  { name: "Noir", hex: "#1a1a1a" },
  { name: "Gris clair", hex: "#c9c9c9" },
  { name: "Orange", hex: "#d2691e" },
  { name: "Bordeaux", hex: "#6e1423" },
];

// Couleurs de cloisons (tissu) pour la gamme Or — 4 choix
const CLOISON_OR = [
  { name: "Noir", hex: "#1a1a1a" },
  { name: "Orange", hex: "#d2691e" },
  { name: "Rouge", hex: "#b91c1c" },
  { name: "Vert foncé", hex: "#14532d" },
];

// 1b. Gamme de stand — étape 2 « Je choisis ma gamme »
export const STAND_RANGES = [
  {
    key: "sur-mesure",
    title: "Option 1 — Stand sur mesure",
    price: "Sur devis",
    desc: "Créez votre stand sur mesure en sélectionnant vos options (voir « Options de stand » et « Communication »).",
    features: [] as string[],
    moquette: null as typeof MOQUETTE | null,
    photo: PHOTO,
  },
  {
    key: "argent",
    title: "Option 2 — Gamme Argent",
    price: "+50 € HT / m²",
    desc: "",
    features: [
      "Cloisons mélaminées en bois de sapin",
      "Votre enseigne",
      "Nombre de badges exposants (selon la surface)",
    ],
    moquette: MOQUETTE,
    photo: "/stands/gamme-argent.png",
  },
  {
    key: "or",
    title: "Option 3 — Gamme Or",
    price: "+100 € HT / m²",
    desc: "",
    features: [
      "Cloisons bois recouvertes de tissu",
      "Votre enseigne",
      "Nombre de badges exposants (selon la surface)",
    ],
    moquette: MOQUETTE,
    cloisons: CLOISON_OR,
    photo: "/stands/gamme-or.png",
    popular: true,
  },
  {
    key: "perso",
    title: "Option 4 — Gamme Personnalisée",
    price: "+250 € HT / m²",
    desc: "",
    features: [
      "1 ou 2 angles inclus (selon surface)",
      "Impression personnalisée des cloisons",
      "Une arche de stand personnalisable",
      "Un comptoir d'accueil + un tabouret",
      "Éclairage spots haut de gamme (selon surface)",
      "Coffret électrique 3 kW 12/24h",
      "Badges inclus (nombre selon surface)",
    ],
    moquette: MOQUETTE,
    cloisons: true,
    photo: "/stands/gamme-perso.png",
  },
];

// 2. Espace extérieur
export const OUTDOOR = {
  title: "Choisir un espace extérieur",
  desc: "Un stand démo en plein air, idéal pour les cuissons live et les grosses installations.",
  price: "150 € HT / m²",
  photo: "/photos-2026/bbq-expo-403.jpg",
};

// 3. Options de stand (prix catalogue 2026)
export type StandOption = {
  name: string;
  desc?: string;
  type: "dropdown" | "table" | "list" | "simple";
  price?: string;
  options?: { label: string; price: string }[];
  head?: string[];
  rows?: string[][];
};

export const STAND_OPTIONS: StandOption[] = [
  {
    name: "Angle de stand",
    desc: "Maximisez votre visibilité en ouvrant votre stand sur plusieurs allées, voire à 360°.",
    type: "table",
    head: ["Configuration", "Tarif"],
    rows: [
      ["1 angle", "350 € HT"],
      ["2 angles", "600 € HT"],
      ["Stand en îlot", "1 000 € HT"],
    ],
  },
  {
    name: "Réserve de stand (stands équipés)",
    desc: "Stockez votre matériel et votre stock pendant toute la durée du salon.",
    type: "table",
    head: ["Surface", "Argent", "Or"],
    rows: [
      ["1 m²", "300 € HT", "350 € HT"],
      ["2 m²", "350 € HT", "400 € HT"],
      ["3 m²", "400 € HT", "450 € HT"],
      ["4 m²", "Sur devis", "Sur devis"],
    ],
  },
  {
    name: "Réserve centrale (stand îlot)",
    desc: "Réserve personnalisée au centre de votre stand.",
    type: "table",
    head: ["Surface", "2,50 m haut", "3,50 m haut"],
    rows: [
      ["2 m²", "1 000 € HT", "1 400 € HT"],
      ["4 m²", "1 350 € HT", "1 950 € HT"],
    ],
  },
  {
    name: "Électricité sur stand",
    desc: "Éclairage inclus pour toute réservation de coffret. Aucune réservation possible sur place.",
    type: "table",
    head: ["Coffret", "12/24h", "24/24h"],
    rows: [
      ["1 kW", "300 € HT", "350 € HT"],
      ["3 kW", "400 € HT", "450 € HT"],
      ["6 kW", "550 € HT", "600 € HT"],
      ["10 kW", "700 € HT", "750 € HT"],
      ["15 kW", "850 € HT", "900 € HT"],
      ["kW supplémentaire", "Sur demande", "—"],
    ],
  },
  {
    name: "Électricité en extérieur",
    desc: "Alimentation des stands démo en plein air. Coffret dédié, raccordement extérieur.",
    type: "table",
    head: ["Coffret", "12/24h", "24/24h"],
    rows: [
      ["3 kW", "450 € HT", "500 € HT"],
      ["6 kW", "600 € HT", "650 € HT"],
      ["10 kW", "750 € HT", "800 € HT"],
      ["15 kW", "900 € HT", "950 € HT"],
      ["kW supplémentaire", "Sur demande", "—"],
    ],
  },
  {
    name: "Électricité sur parking",
    desc: "Alimentation pour véhicules et installations sur le parking exposant.",
    type: "table",
    head: ["Coffret", "12/24h", "24/24h"],
    rows: [
      ["3 kW", "450 € HT", "500 € HT"],
      ["6 kW", "600 € HT", "650 € HT"],
      ["10 kW", "750 € HT", "800 € HT"],
      ["kW supplémentaire", "Sur demande", "—"],
    ],
  },
  {
    name: "Aménagement sur-mesure",
    desc: "Cloisons, éclairage, enseigne, moquette… créez votre environnement.",
    type: "list",
    options: [
      { label: "Cloison Argent supplémentaire", price: "40 € HT / ml" },
      { label: "Cloison Or supplémentaire", price: "120 € HT / ml" },
      { label: "Barre de LED", price: "70 € HT" },
      { label: "Spot haut de gamme", price: "120 € HT" },
      { label: "Enseigne (50 × 40 cm)", price: "60 € HT" },
      { label: "Moquette", price: "12,50 € HT / m²" },
    ],
  },
  {
    name: "Parking exposant",
    desc: "Réservé pour toute la durée de l'événement.",
    type: "list",
    options: [
      { label: "Voiture & Van", price: "90 € HT" },
      { label: "Camion", price: "150 € HT" },
    ],
  },
  {
    name: "Co-exposition",
    desc: "Mettez en avant une ou plusieurs marques sur votre stand.",
    type: "list",
    options: [
      { label: "1 co-exposant (dès 12 m²)", price: "700 € HT" },
      { label: "2 co-exposants (dès 24 m²)", price: "1 400 € HT" },
    ],
  },
  { name: "Chariot élévateur (fenwick)", type: "simple", price: "120 € HT / heure", desc: "Pour le montage/démontage et le déplacement de vos marchandises." },
  { name: "Badges exposants supplémentaires", type: "simple", price: "20 € HT", desc: "Au-delà du quota inclus selon la surface." },
  { name: "Mobilier", type: "simple", price: "Voir le catalogue mobilier", desc: "Tables, chaises, comptoirs, vitrines…" },
  { name: "Pack 50 invitations", type: "simple", price: "Sur demande", desc: "Invitations à offrir à vos clients et prospects." },
];

// 4. Devenir partenaire — tableau comparatif Platinium / Gold / Silver
export const PARTNER_TIERS = [
  { key: "platinium", name: "Platinium", price: "20 000 € HT", highlight: true },
  { key: "gold", name: "Gold (Or)", price: "12 000 € HT" },
  { key: "silver", name: "Silver (Argent)", price: "8 000 € HT" },
];

// Lignes du tableau comparatif — regroupées par type de communication.
// Valeur par tier: true (inclus) / false (non inclus) / texte (quantité/détail).
type TierVal = boolean | string;
export const PARTNER_FEATURE_GROUPS: {
  category: string;
  rows: { label: string; platinium: TierVal; gold: TierVal; silver: TierVal; preview?: string }[];
}[] = [
  {
    category: "Communication print",
    rows: [
      { label: "Logo sur l'affiche officielle", platinium: true, gold: true, silver: true },
      { label: "Présentation dans le dossier presse", platinium: true, gold: true, silver: true },
      { label: "Pub dans Barbecue Mag (20k tirages)", platinium: "1 double-page pub + 1 double-page rédactionnel", gold: "1 pleine page", silver: "1 pleine page" },
      { label: "Flyers / goodies à l'entrée (5000 ex)", platinium: "Goodies distribués", gold: "Libre-service", silver: "Libre-service" },
      { label: "Logo sur le plan visiteur", platinium: true, gold: true, silver: true },
      { label: "Oriflammes à l'entrée du salon", platinium: "4", gold: "2", silver: "1" },
    ],
  },
  {
    category: "Communication digitale",
    rows: [
      { label: "Posts Instagram / Facebook", platinium: "6", gold: "4", silver: "2" },
      { label: "Jeux concours Instagram", platinium: "2", gold: "1", silver: "1" },
      { label: "Stories avant le salon", platinium: "10", gold: "6", silver: "3" },
      { label: "Stories pendant le salon", platinium: "15", gold: "10", silver: "6" },
      { label: "Newsletters", platinium: "1 avant + 1 après (retargeting)", gold: "1 (avant)", silver: "1 collective" },
      { label: "Présence bandeau + page partenaires officiels (site)", platinium: true, gold: true, silver: true },
      { label: "Apparition vidéo officielle — page d'accueil + réseaux (IG/FB/LinkedIn)", platinium: true, gold: true, silver: false },
      { label: "Apparition vidéo officielle — YouTube", platinium: true, gold: false, silver: false },
    ],
  },
  {
    category: "Communication sur place",
    rows: [
      { label: "Priorité reportage presse et TV", platinium: "Absolue", gold: "Haute", silver: "Normal" },
      { label: "Mise en avant de vos produits lors des démonstrations culinaires", platinium: true, gold: true, silver: true },
      { label: "Logo sur les T-shirts des hôtes·ses d'accueil", platinium: true, gold: false, silver: false },
      { label: "Enseigne + pont lumineux de stand 360°", platinium: true, gold: false, silver: false },
      { label: "Sponsoring Cooking Show", platinium: true, gold: false, silver: false },
      { label: "Sponsoring Masterclass", platinium: true, gold: false, silver: false },
    ],
  },
  {
    category: "Affichage public",
    rows: [
      { label: "Campagne métro — Rampes (1 250 affiches, 14 j avant le salon)", platinium: true, gold: true, silver: true },
      { label: "Campagne métro — Cmassif (5 emplacements consécutifs, 14 j)", platinium: true, gold: false, silver: false, preview: "/affichage/dispositif-metro-cmassif.jpg" },
      { label: "Campagne bus — Cmassif (2 103 affiches dans Paris, 7 j avant)", platinium: true, gold: true, silver: true },
      { label: "Affiche à l'entrée du salon (2 affiches au Parc Floral)", platinium: true, gold: true, silver: true },
    ],
  },
];

// 5. Communication sur stand — signalétique
export const COMM_STAND = {
  photo: "/stands/weber-stand-3d.jpg",
  items: [
    { name: "Structure élinguée en hauteur", price: "À partir de 1 500 € HT", desc: "Panneaux suspendus 3 × 1,5 m avec impression, visibles de loin." },
    { name: "Panneau surélevé au-dessus des cloisons", price: "Sur devis", desc: "Forex 3 × 1,5 m (selon les stands)." },
    { name: "Personnalisation des cloisons", price: "Or : 275 € HT/ml · Argent : 200 € HT/ml", desc: "Habillage complet de vos cloisons selon la gamme choisie." },
  ],
};

// 6. Communication sur place — Packs PLV + vitrophanie
export const COMM_PLACE_PACKS = [
  {
    name: "Pack PLV",
    price: "1 800 € HT",
    includes: [
      "2 oriflammes à l'entrée",
      "2 barrières police floquées",
      "Logo sur le plan du salon",
      "Flyer à l'entrée (à fournir)",
    ],
  },
  {
    name: "Pack PLV +",
    price: "3 500 € HT",
    popular: true,
    includes: [
      "6 oriflammes",
      "4 barrières police floquées",
      "Logo sur le plan du salon",
      "Flyer à l'entrée (à fournir)",
      "Flocage au sol (3 spots)",
      "1 totem 4 faces",
    ],
  },
  {
    name: "Pack PLV Max",
    price: "6 000 € HT",
    includes: [
      "6 oriflammes",
      "8 barrières police floquées",
      "Logo sur le plan du salon",
      "Flyer à l'entrée (à fournir)",
      "Flocage au sol (6 spots)",
      "2 totems 4 faces",
      "Vitrophanie sur baie vitrée du hall (meilleure zone esplanade extérieure exposant)",
    ],
  },
];
export const VITROPHANIE = {
  title: "Vitrophanie des baies vitrées du hall",
  desc: "Sur les portes vitrées du hall donnant sur les esplanades extérieures. Touchez les visiteurs dès leur arrivée.",
  price: "Sur devis",
  photo: PHOTO,
};

// 7. Options de branding
export const BRANDING = [
  { name: "Tote-bag officiel du salon", price: "1,50 € HT / pièce", desc: "Votre logo sur les sacs officiels distribués aux visiteurs.", photo: "/stands/tote-bag-1.jpg" },
  { name: "Briquet co-floqué du salon", price: "1,50 € HT / pièce", desc: "Co-brandez le briquet officiel (min. à définir).", photo: "/stands/briquet.png" },
  { name: "Votre pub sur les tickets visiteurs", price: "1 500 € HT", desc: "Votre logo/visuel sur chaque ticket d'entrée.", photo: PHOTO },
  { name: "Logo sur le plan visiteurs", price: "850 € HT", desc: "Votre logo positionné sur le plan officiel distribué à tous les visiteurs.", photo: "/stands/plan-visiteurs.jpg" },
];

// 8. Communication digitale
export const COMM_DIGITAL = [
  {
    name: "Pack Avant",
    price: "2 000 € HT",
    desc: "Attirer, teaser et préparer les visiteurs.",
    includes: [
      "Bannière 2 mois sur le site web (pages annexes)",
      "Encart newsletter",
      "2 posts réseaux sociaux",
      "4 stories",
      "1 jeu concours",
    ],
  },
  {
    name: "Pack Pendant",
    price: "3 000 € HT",
    desc: "Affirmer votre présence et capter l'attention.",
    popular: true,
    includes: [
      "Bannière (3 jours) au-dessus du module de billetterie du site",
      "Encart newsletter",
      "2 posts réseaux sociaux",
      "8 stories",
      "1 jeu concours",
    ],
  },
  {
    name: "Pack Après",
    price: "1 500 € HT",
    desc: "Retargeter et relancer : messages, codes, ventes additionnelles.",
    includes: [
      "Bannière sur le site pendant 2 mois",
      "Encart newsletter",
      "2 posts réseaux sociaux",
      "4 stories",
      "1 jeu concours",
    ],
  },
];

// Pack global réunissant les 3 packs digitaux (Avant + Pendant + Après)
export const COMM_DIGITAL_GLOBAL = {
  name: "Pack Plan de communication Global",
  price: "5 500 € HT",
  saving: "soit 1 000 € HT d'économie vs les 3 packs à l'unité (6 500 € HT)",
  desc: "Le dispositif complet : avant, pendant et après le salon, réunis pour une présence sans interruption.",
  phases: [
    { title: "Avant", items: ["Bannière 2 mois (pages annexes)", "Encart newsletter", "2 posts RS", "4 stories", "1 jeu concours"] },
    { title: "Pendant", items: ["Bannière 3 jours au-dessus de la billetterie", "Encart newsletter", "2 posts RS", "8 stories", "1 jeu concours"] },
    { title: "Après", items: ["Bannière 2 mois sur le site", "Encart newsletter", "2 posts RS", "4 stories", "1 jeu concours"] },
  ],
};

// 9. Sponsoring de zone
export const SPONSORING = [
  {
    zone: "Grill Arena",
    photo: "/photos-2026/sponsoring-grill-arena.jpg",
    options: [
      { name: "Co-sponsoring de la zone", price: "2 500 € HT", desc: TODO },
      { name: "Utilisation de vos produits alimentaires", price: "350 € HT", desc: TODO },
    ],
  },
  {
    zone: "Masterclasses",
    photo: "/photos-2026/zone-masterclasses.jpg",
    options: [
      { name: "Co-sponsor", price: "1 500 € HT", desc: TODO },
      { name: "Utilisation de vos produits alimentaires", price: "150 € HT", desc: TODO },
    ],
  },
  {
    zone: "Zone BBQ Libre-Service",
    photo: PHOTO,
    options: [
      { name: "Co-sponsor de zone (limité à 4 sponsors)", price: "3 000 € HT", desc: TODO },
    ],
  },
];

// 10. Communication print — Barbecue Mag
export const BARBECUE_MAG = {
  title: "Communication print — Barbecue Mag",
  desc: "Barbecue Mag, c'est l'unique magazine en France qui parle de braises. Interviews de pitmasters, découvertes de marques, sélections produits et bien sûr des recettes pour vous inspirer et développer vos compétences en Barbecuelogie. Fait par des passionnés, pour les passionnés !",
  stats: [
    { value: "20 000", label: "tirages" },
    { value: "120", label: "pages" },
    { value: "Gratuit", label: "sur nos événements" },
  ],
  formats: [
    { name: "Demi-page (20 × 13,5 cm)", priceExpo: "750 € HT", pricePubliredac: "+ 700 € HT", preview: null as string | null },
    { name: "Pleine page (20 × 27 cm)", priceExpo: "1 300 € HT", pricePubliredac: "+ 700 € HT", preview: "/mag/pub-pleine-page.jpg" },
    { name: "Double page (40 × 27 cm)", priceExpo: "2 500 € HT", pricePubliredac: "+ 700 € HT", preview: "/mag/pub-double-page.jpg" },
    { name: "2ᵉ de couverture (20 × 27 cm)", priceExpo: "2 000 € HT", pricePubliredac: "+ 700 € HT", preview: "/mag/pub-2eme-couv.jpg" },
    { name: "3ᵉ de couverture (20 × 27 cm)", priceExpo: "2 000 € HT", pricePubliredac: "+ 700 € HT", preview: null as string | null },
    { name: "4ᵉ de couverture (20 × 27 cm)", priceExpo: "3 000 € HT", pricePubliredac: "+ 700 € HT", preview: "/mag/pub-4eme-couv.jpg" },
  ],
  photos: ["/stands/barbecue-mag-1.jpg", "/stands/barbecue-mag-2.jpg"],
};
