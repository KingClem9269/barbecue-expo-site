import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "compteur-2027",
  format: "story",
  caption: `2027 en chiffres. 🔥 Plus grand, plus international que jamais. Rendez-vous les 12-13-14 mars au Parc Floral de Paris.
#BarbecueExpo #BBQ #Paris #SaveTheDate`,
  animated: {
    kind: "counterSequence",
    fps: 24,
    segments: [
      { to: 30000, label: "visiteurs attendus", seconds: 1.1 },
      { to: 250, label: "marques internationales", seconds: 1.0 },
      { to: 20, label: "pays représentés", seconds: 0.9 },
      { to: 20000, unit: "m²", label: "indoor & outdoor", seconds: 1.1 },
    ],
    endCard: { lines: ["12 · 13 · 14 Mars 2027", "Parc Floral de Paris", "barbecue-expo.fr"] },
    formats: ["story", "portrait"],
  },
};

export default campaign;
