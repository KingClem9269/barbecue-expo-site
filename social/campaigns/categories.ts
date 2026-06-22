import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "categories",
  format: "portrait",
  caption: {
    fr: `Grill, combustibles, sauces, épicerie fine, spiritueux, mobilier outdoor… 8 univers réunis sur le plus grand salon BBQ d'Europe. Votre marque y a sa place. 🔥 Réservez votre stand 👉 barbecue-expo.fr/devenez-exposants
#BarbecueExpo #BBQ #SalonBBQ #OutdoorCooking #Exposant`,
    en: `Grills, fuels, sauces, fine food, spirits, outdoor furniture… 8 worlds gathered at Europe's biggest BBQ show. Your brand belongs here. 🔥 Book your booth 👉 barbecue-expo.fr/devenez-exposants
#BarbecueExpo #BBQ #BBQShow #OutdoorCooking #Exhibitor`,
  },
  slides: [
    { kind: "hook", eyebrow: { fr: "Catégories de produits", en: "Product categories" }, title: { fr: "Votre univers a\nsa place sous\nle feu.", en: "Your world has\nits place under\nthe fire." }, highlight: { fr: ["sous\nle feu."], en: ["under\nthe fire."] }, photo: "bbq-expo-403.jpg" },
    { kind: "categoryPair", photo: "bbq-expo-008.jpg", items: [
      { num: "01", title: { fr: "Barbecue", en: "Barbecue" }, sub: { fr: "Grills, smokers, kamados, braseros, fours, planchas", en: "Grills, smokers, kamados, fire pits, ovens, griddles" } },
      { num: "02", title: { fr: "Accessoires &\néquipements", en: "Accessories &\nequipment" } },
    ] },
    { kind: "categoryPair", photo: "bbq-expo-129.jpg", items: [
      { num: "03", title: { fr: "Combustibles", en: "Fuels" }, sub: { fr: "Charbon, pellets, bois de fumage", en: "Charcoal, pellets, smoking wood" } },
      { num: "04", title: { fr: "Cuisines &\naménagements d'extérieur", en: "Outdoor kitchens\n& living" } },
    ] },
    { kind: "categoryPair", photo: "bbq-expo-155.jpg", items: [
      { num: "05", title: { fr: "Sauces, rubs\n& épices", en: "Sauces, rubs\n& spices" } },
      { num: "06", title: { fr: "Épicerie fine\n& viandes premium", en: "Fine food\n& premium meats" } },
    ] },
    { kind: "categoryPair", photo: "bbq-expo-184.jpg", items: [
      { num: "07", title: { fr: "Alcool & spiritueux", en: "Beer, wine & spirits" }, sub: { fr: "Accords BBQ", en: "BBQ pairings" } },
      { num: "08", title: { fr: "Restauration\n& traiteurs", en: "Catering\n& food service" } },
    ] },
    { kind: "cta", title: { fr: "8 familles\nde produits,\nun seul salon.", en: "8 product\nfamilies,\none show." }, highlight: { fr: ["un seul salon."], en: ["one show."] }, sub: { fr: "Réservez le stand de votre univers.", en: "Book the booth for your world." }, button: { fr: "Réservez votre stand", en: "Book your booth" }, url: "barbecue-expo.fr/devenez-exposants", photo: "bbq-expo-740.jpg" },
  ],
};

export default campaign;
