import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "categories",
  format: "portrait",
  caption: `Grill, combustibles, sauces, épicerie fine, spiritueux, mobilier outdoor… 8 univers réunis sur le plus grand salon BBQ d'Europe. Votre marque y a sa place. 🔥
#BarbecueExpo #BBQ #SalonBBQ #OutdoorCooking #Exposant`,
  slides: [
    { kind: "hook", eyebrow: "Catégories de produits", title: "Votre univers a\nsa place sous\nle feu.", highlight: ["sous\nle feu."], photo: "bbq-expo-403.jpg" },
    { kind: "categoryPair", photo: "bbq-expo-066.jpg", items: [
      { num: "01", title: "Barbecue", sub: "Grills, smokers, kamados, braseros, fours, planchas" },
      { num: "02", title: "Accessoires &\néquipements" },
    ] },
    { kind: "categoryPair", photo: "bbq-expo-073.jpg", items: [
      { num: "03", title: "Combustibles", sub: "Charbon, pellets, bois de fumage" },
      { num: "04", title: "Cuisines &\naménagements d'extérieur" },
    ] },
    { kind: "categoryPair", photo: "bbq-expo-078.jpg", items: [
      { num: "05", title: "Sauces, rubs\n& épices" },
      { num: "06", title: "Épicerie fine\n& viandes premium" },
    ] },
    { kind: "categoryPair", photo: "bbq-expo-105.jpg", items: [
      { num: "07", title: "Alcool & spiritueux", sub: "Accords BBQ" },
      { num: "08", title: "Restauration\n& traiteurs" },
    ] },
    { kind: "cta", title: "8 familles\nde produits,\nun seul salon.", highlight: ["un seul salon."], button: "Réservez votre stand", url: "barbecue-expo.fr/devenez-exposants", photo: "bbq-expo-403.jpg" },
  ],
};

export default campaign;
