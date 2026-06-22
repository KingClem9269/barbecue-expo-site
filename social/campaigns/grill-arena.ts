import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "grill-arena",
  format: "portrait",
  caption: {
    fr: `GRILL ARENA — le seul battle BBQ live d'Europe. Des pitmasters internationaux s'affrontent en direct, un champion couronné chaque soir. 🔥🆚🔥 12-13-14 mars 2027. Sponsorisez la zone 👉 barbecue-expo.fr/devenez-exposants
#GrillArena #BarbecueExpo #BBQBattle #Pitmaster #Paris`,
    en: `GRILL ARENA — Europe's only live BBQ battle. International pitmasters go head-to-head live, a champion crowned every night. 🔥🆚🔥 12-13-14 March 2027. Sponsor the zone 👉 barbecue-expo.fr/devenez-exposants
#GrillArena #BarbecueExpo #BBQBattle #Pitmaster #Paris`,
  },
  slides: [
    { kind: "vs",
      title: "GRILL ARENA",
      subtitle: { fr: "Le seul battle BBQ live d'Europe", en: "Europe's only live BBQ battle" },
      hook1: { fr: "Ni Spoga Gafa ni BBQ Expo Italy ne l'ont.", en: "Neither Spoga Gafa nor BBQ Expo Italy has it." },
      hook2: { fr: "Un champion couronné chaque soir.", en: "A champion crowned every night." },
      photo: "zone-grill-arena.jpg",
    },
  ],
  animated: {
    kind: "grillArena",
    fps: 24,
    photo: "zone-grill-arena.jpg",
    tagline: { fr: "3 jours · 1 champion", en: "3 days · 1 champion" },
    formats: ["story", "portrait"],
  },
};

export default campaign;
