import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "chiffres",
  format: "portrait",
  caption: {
    fr: `5 ans de braises, et ce n'est que le début. 🔥 Rendez-vous les 12, 13 et 14 mars 2027 au Parc Floral de Paris pour la plus grande édition de Barbecue Expo. Stands ouverts à la réservation 👉 barbecue-expo.fr/devenez-exposants (lien en bio).
#BarbecueExpo #BBQ #SalonBBQ #Paris #OutdoorCooking #Pitmaster`,
    en: `5 years of embers, and we're just getting started. 🔥 Join us on 12, 13 & 14 March 2027 at Parc Floral de Paris for the biggest Barbecue Expo yet. Booths now open 👉 barbecue-expo.fr/devenez-exposants (link in bio).
#BarbecueExpo #BBQ #BBQShow #Paris #OutdoorCooking #Pitmaster`,
  },
  slides: [
    { kind: "hook", eyebrow: { fr: "Barbecue Expo en chiffres", en: "Barbecue Expo in numbers" }, title: { fr: "5 éditions.\nLe feu ne\ns'éteint jamais.", en: "5 editions.\nThe fire never\ngoes out." }, highlight: { fr: ["jamais."], en: ["never"] }, photo: "bbq-expo-403.jpg" },
    { kind: "stat", value: "93 000", label: { fr: "visiteurs depuis 2020", en: "visitors since 2020" } },
    { kind: "stat", value: "650", label: { fr: "exposants accueillis", en: "exhibitors hosted" } },
    { kind: "stat", value: "85", label: { fr: "pitmasters & chefs internationaux", en: "international pitmasters & chefs" } },
    { kind: "stats", title: { fr: "Édition 2026", en: "2026 edition" }, items: [
      { value: "25 800", label: { fr: "visiteurs", en: "visitors" } },
      { value: "16", label: { fr: "nationalités", en: "nationalities" } },
    ] },
    { kind: "stats", title: { fr: "Cap 2027", en: "Towards 2027" }, items: [
      { value: "30 000", label: { fr: "visiteurs attendus", en: "expected visitors" } },
      { value: "250", label: { fr: "marques internationales", en: "international brands" } },
      { value: "20", label: { fr: "pays représentés", en: "countries represented" } },
      { value: "20 000 m²", label: { fr: "indoor & outdoor", en: "indoor & outdoor" } },
    ] },
    { kind: "cta", title: { fr: "En 2027, toutes\nles flammes\nmènent à Paris.", en: "In 2027, all\nflames lead\nto Paris." }, highlight: { fr: ["mènent à Paris."], en: ["lead\nto Paris."] }, sub: { fr: "Réservez votre stand dès maintenant.", en: "Book your booth now." }, button: { fr: "Réservez votre stand", en: "Book your booth" }, url: "barbecue-expo.fr/devenez-exposants", photo: "bbq-expo-737.jpg" },
  ],
};

export default campaign;
