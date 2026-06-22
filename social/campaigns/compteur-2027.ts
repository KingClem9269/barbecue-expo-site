import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "compteur-2027",
  format: "story",
  caption: {
    fr: `2027 en chiffres. 🔥 Plus grand, plus international que jamais. Rendez-vous les 12-13-14 mars au Parc Floral de Paris. Stands ouverts 👉 barbecue-expo.fr/devenez-exposants
#BarbecueExpo #BBQ #Paris #SaveTheDate`,
    en: `2027 in numbers. 🔥 Bigger, more international than ever. See you on 12-13-14 March at Parc Floral de Paris. Booths open 👉 barbecue-expo.fr/devenez-exposants
#BarbecueExpo #BBQ #Paris #SaveTheDate`,
  },
  animated: {
    kind: "counterSequence",
    fps: 24,
    segments: [
      { to: 30000, label: { fr: "visiteurs attendus", en: "expected visitors" }, seconds: 1.1 },
      { to: 250, label: { fr: "marques internationales", en: "international brands" }, seconds: 1.0 },
      { to: 20, label: { fr: "pays représentés", en: "countries represented" }, seconds: 0.9 },
      { to: 20000, unit: "m²", label: { fr: "indoor & outdoor", en: "indoor & outdoor" }, seconds: 1.1 },
    ],
    endCard: { lines: [
      { fr: "12 · 13 · 14 Mars 2027", en: "12 · 13 · 14 March 2027" },
      "Parc Floral de Paris",
      "barbecue-expo.fr",
    ] },
    formats: ["story", "portrait"],
  },
};

export default campaign;
