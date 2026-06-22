import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "chiffres",
  format: "portrait",
  caption: `5 ans de braises, et ce n'est que le début. 🔥 Rendez-vous les 12, 13 et 14 mars 2027 au Parc Floral de Paris pour la plus grande édition de Barbecue Expo. Stands ouverts à la réservation — lien en bio.
#BarbecueExpo #BBQ #SalonBBQ #Paris #OutdoorCooking #Pitmaster`,
  slides: [
    { kind: "hook", eyebrow: "Barbecue Expo en chiffres", title: "5 éditions.\nLe feu ne\ns'éteint jamais.", highlight: ["jamais."], photo: "bbq-expo-403.jpg" },
    { kind: "stat", value: "93 000", label: "visiteurs depuis 2020" },
    { kind: "stat", value: "650", label: "exposants accueillis" },
    { kind: "stat", value: "85", label: "pitmasters & chefs internationaux" },
    { kind: "stats", title: "Édition 2026", items: [
      { value: "25 800", label: "visiteurs" },
      { value: "16", label: "nationalités" },
    ] },
    { kind: "stats", title: "Cap 2027", items: [
      { value: "30 000", label: "visiteurs attendus" },
      { value: "250", label: "marques internationales" },
      { value: "20", label: "pays représentés" },
      { value: "20 000 m²", label: "indoor & outdoor" },
    ] },
    { kind: "cta", title: "En 2027, toutes\nles flammes\nmènent à Paris.", highlight: ["mènent à Paris."], button: "Réservez votre stand", url: "barbecue-expo.fr/devenez-exposants", photo: "bbq-expo-105.jpg" },
  ],
};

export default campaign;
