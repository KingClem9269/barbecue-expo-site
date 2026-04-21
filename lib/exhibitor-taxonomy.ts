/**
 * Exhibitor taxonomy — 8 top-level categories with sub-categories.
 * Used for filtering in /exposants page. Client-safe (pure data).
 *
 * Keys are stable identifiers. Labels localized per locale.
 */

export type SubCategoryKey = string;
export type CategoryKey =
  | "barbecue"
  | "accessories"
  | "fuels"
  | "sauces"
  | "outdoor-kitchen"
  | "gourmet"
  | "alcohol"
  | "restaurants";

export type SubCategory = {
  key: SubCategoryKey;
  labels: Record<string, string>;
};

export type Category = {
  key: CategoryKey;
  labels: Record<string, string>;
  sub: SubCategory[];
};

export const TAXONOMY: Category[] = [
  {
    key: "barbecue",
    labels: {
      fr: "Marques de barbecues",
      en: "Barbecue brands",
      es: "Marcas de barbacoa",
      de: "Grillmarken",
      nl: "Barbecuemerken",
      pt: "Marcas de BBQ",
      it: "Marchi di barbecue",
    },
    sub: [
      { key: "gas", labels: { fr: "Gaz", en: "Gas", es: "Gas", de: "Gas", nl: "Gas", pt: "Gás", it: "Gas" } },
      { key: "charcoal", labels: { fr: "Charbon", en: "Charcoal", es: "Carbón", de: "Holzkohle", nl: "Houtskool", pt: "Carvão", it: "Carbone" } },
      { key: "pellet", labels: { fr: "Pellets", en: "Pellets", es: "Pellets", de: "Pellets", nl: "Pellets", pt: "Pellets", it: "Pellet" } },
      { key: "electric", labels: { fr: "Électrique", en: "Electric", es: "Eléctrico", de: "Elektrisch", nl: "Elektrisch", pt: "Elétrico", it: "Elettrico" } },
      { key: "hybrid", labels: { fr: "Hybride", en: "Hybrid", es: "Híbrido", de: "Hybrid", nl: "Hybride", pt: "Híbrido", it: "Ibrido" } },
      { key: "plancha", labels: { fr: "Plancha", en: "Plancha", es: "Plancha", de: "Plancha", nl: "Plancha", pt: "Plancha", it: "Plancha" } },
      { key: "kamado", labels: { fr: "Kamado", en: "Kamado", es: "Kamado", de: "Kamado", nl: "Kamado", pt: "Kamado", it: "Kamado" } },
      { key: "smoker", labels: { fr: "Smoker", en: "Smoker", es: "Ahumador", de: "Smoker", nl: "Smoker", pt: "Fumador", it: "Smoker" } },
      { key: "wood-oven", labels: { fr: "Four à bois", en: "Wood-fired oven", es: "Horno de leña", de: "Holzbackofen", nl: "Houtoven", pt: "Forno a lenha", it: "Forno a legna" } },
      { key: "pizza", labels: { fr: "Pizza", en: "Pizza", es: "Pizza", de: "Pizza", nl: "Pizza", pt: "Pizza", it: "Pizza" } },
      { key: "brasero", labels: { fr: "Brasero", en: "Brasero", es: "Brasero", de: "Brasero", nl: "Vuurschaal", pt: "Brasero", it: "Brasero" } },
      { key: "pro", labels: { fr: "BBQ professionnel", en: "Professional BBQ", es: "BBQ profesional", de: "Profi-BBQ", nl: "Professionele BBQ", pt: "BBQ profissional", it: "BBQ professionale" } },
    ],
  },
  {
    key: "accessories",
    labels: {
      fr: "Accessoires & équipements",
      en: "Accessories & equipment",
      es: "Accesorios & equipamiento",
      de: "Zubehör & Ausrüstung",
      nl: "Accessoires & uitrusting",
      pt: "Acessórios & equipamento",
      it: "Accessori & attrezzatura",
    },
    sub: [
      { key: "utensils", labels: { fr: "Ustensiles", en: "Utensils", es: "Utensilios", de: "Utensilien", nl: "Keukengerei", pt: "Utensílios", it: "Utensili" } },
      { key: "grates", labels: { fr: "Grilles", en: "Grates", es: "Rejillas", de: "Roste", nl: "Roosters", pt: "Grelhas", it: "Griglie" } },
      { key: "thermometers", labels: { fr: "Thermomètres", en: "Thermometers", es: "Termómetros", de: "Thermometer", nl: "Thermometers", pt: "Termómetros", it: "Termometri" } },
      { key: "covers", labels: { fr: "Housses", en: "Covers", es: "Fundas", de: "Abdeckungen", nl: "Hoezen", pt: "Capas", it: "Coperture" } },
      { key: "care", labels: { fr: "Entretien", en: "Care & maintenance", es: "Mantenimiento", de: "Pflege", nl: "Onderhoud", pt: "Manutenção", it: "Manutenzione" } },
      { key: "furniture", labels: { fr: "Mobilier", en: "Furniture", es: "Mobiliario", de: "Möbel", nl: "Meubilair", pt: "Mobiliário", it: "Mobili" } },
      { key: "lighting", labels: { fr: "Éclairage", en: "Lighting", es: "Iluminación", de: "Beleuchtung", nl: "Verlichting", pt: "Iluminação", it: "Illuminazione" } },
    ],
  },
  {
    key: "fuels",
    labels: {
      fr: "Combustibles",
      en: "Fuels",
      es: "Combustibles",
      de: "Brennstoffe",
      nl: "Brandstoffen",
      pt: "Combustíveis",
      it: "Combustibili",
    },
    sub: [
      { key: "charcoal", labels: { fr: "Charbon", en: "Charcoal", es: "Carbón", de: "Holzkohle", nl: "Houtskool", pt: "Carvão", it: "Carbone" } },
      { key: "briquettes", labels: { fr: "Briquettes", en: "Briquettes", es: "Briquetas", de: "Briketts", nl: "Briketten", pt: "Briquetes", it: "Bricchette" } },
      { key: "pellets", labels: { fr: "Pellets", en: "Pellets", es: "Pellets", de: "Pellets", nl: "Pellets", pt: "Pellets", it: "Pellet" } },
      { key: "smoking-wood", labels: { fr: "Bois de fumage", en: "Smoking wood", es: "Madera de ahumar", de: "Räucherholz", nl: "Rookhout", pt: "Madeira de fumo", it: "Legno da affumicatura" } },
      { key: "gas", labels: { fr: "Gaz", en: "Gas", es: "Gas", de: "Gas", nl: "Gas", pt: "Gás", it: "Gas" } },
      { key: "firelighters", labels: { fr: "Allume-feu", en: "Firelighters", es: "Pastillas de encendido", de: "Anzünder", nl: "Aanmaak", pt: "Acendedores", it: "Accendifuoco" } },
      { key: "eco", labels: { fr: "Produits écologiques", en: "Eco products", es: "Productos ecológicos", de: "Öko-Produkte", nl: "Eco-producten", pt: "Produtos eco", it: "Prodotti eco" } },
    ],
  },
  {
    key: "sauces",
    labels: {
      fr: "Sauces & épices",
      en: "Sauces & seasonings",
      es: "Salsas & especias",
      de: "Saucen & Gewürze",
      nl: "Sauzen & kruiden",
      pt: "Molhos & especiarias",
      it: "Salse & spezie",
    },
    sub: [
      { key: "bbq-sauces", labels: { fr: "Sauces BBQ", en: "BBQ sauces", es: "Salsas BBQ", de: "BBQ-Saucen", nl: "BBQ-sauzen", pt: "Molhos BBQ", it: "Salse BBQ" } },
      { key: "rubs", labels: { fr: "Rubs", en: "Rubs", es: "Rubs", de: "Rubs", nl: "Rubs", pt: "Rubs", it: "Rubs" } },
      { key: "spices", labels: { fr: "Épices", en: "Spices", es: "Especias", de: "Gewürze", nl: "Specerijen", pt: "Especiarias", it: "Spezie" } },
      { key: "oils", labels: { fr: "Huiles", en: "Oils", es: "Aceites", de: "Öle", nl: "Oliën", pt: "Óleos", it: "Oli" } },
      { key: "condiments", labels: { fr: "Condiments", en: "Condiments", es: "Condimentos", de: "Condimente", nl: "Condimenten", pt: "Condimentos", it: "Condimenti" } },
      { key: "food", labels: { fr: "Produits alimentaires", en: "Food products", es: "Productos alimentarios", de: "Lebensmittel", nl: "Voedingsproducten", pt: "Produtos alimentares", it: "Prodotti alimentari" } },
    ],
  },
  {
    key: "outdoor-kitchen",
    labels: {
      fr: "Cuisine & aménagement d'extérieur",
      en: "Outdoor kitchen & design",
      es: "Cocina & diseño exterior",
      de: "Außenküche & Design",
      nl: "Buitenkeuken & design",
      pt: "Cozinha & design exterior",
      it: "Cucina & design outdoor",
    },
    sub: [
      { key: "outdoor-kitchens", labels: { fr: "Cuisines outdoor", en: "Outdoor kitchens", es: "Cocinas exteriores", de: "Außenküchen", nl: "Buitenkeukens", pt: "Cozinhas exteriores", it: "Cucine outdoor" } },
      { key: "modules", labels: { fr: "Modules", en: "Modules", es: "Módulos", de: "Module", nl: "Modules", pt: "Módulos", it: "Moduli" } },
      { key: "furniture", labels: { fr: "Mobilier", en: "Furniture", es: "Mobiliario", de: "Möbel", nl: "Meubilair", pt: "Mobiliário", it: "Mobili" } },
      { key: "sinks", labels: { fr: "Éviers", en: "Sinks", es: "Fregaderos", de: "Spülen", nl: "Spoelbakken", pt: "Lavatórios", it: "Lavelli" } },
      { key: "pergolas", labels: { fr: "Pergolas", en: "Pergolas", es: "Pérgolas", de: "Pergolen", nl: "Pergola's", pt: "Pérgolas", it: "Pergolati" } },
      { key: "lighting", labels: { fr: "Éclairage", en: "Lighting", es: "Iluminación", de: "Beleuchtung", nl: "Verlichting", pt: "Iluminação", it: "Illuminazione" } },
      { key: "design", labels: { fr: "Design", en: "Design", es: "Diseño", de: "Design", nl: "Design", pt: "Design", it: "Design" } },
    ],
  },
  {
    key: "gourmet",
    labels: {
      fr: "Épicerie fine & alimentaire",
      en: "Gourmet & food products",
      es: "Gourmet & alimentación",
      de: "Feinkost & Lebensmittel",
      nl: "Delicatessen & voeding",
      pt: "Gourmet & alimentação",
      it: "Gastronomia & alimentare",
    },
    sub: [],
  },
  {
    key: "alcohol",
    labels: {
      fr: "Alcools & spiritueux",
      en: "Alcohol & spirits",
      es: "Alcohol & licores",
      de: "Alkohol & Spirituosen",
      nl: "Alcohol & gedistilleerd",
      pt: "Álcool & destilados",
      it: "Alcolici & distillati",
    },
    sub: [],
  },
  {
    key: "restaurants",
    labels: {
      fr: "Restaurateurs & traiteurs",
      en: "Restaurants & caterers",
      es: "Restaurantes & caterings",
      de: "Restaurants & Caterer",
      nl: "Restaurants & caterers",
      pt: "Restaurantes & catering",
      it: "Ristoranti & catering",
    },
    sub: [],
  },
];

export function getCategoryLabel(key: CategoryKey, locale: string): string {
  const cat = TAXONOMY.find((c) => c.key === key);
  return cat?.labels[locale] || cat?.labels.fr || key;
}

export function getSubCategoryLabel(
  catKey: CategoryKey,
  subKey: SubCategoryKey,
  locale: string,
): string {
  const cat = TAXONOMY.find((c) => c.key === catKey);
  const sub = cat?.sub.find((s) => s.key === subKey);
  return sub?.labels[locale] || sub?.labels.fr || subKey;
}
