import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "grill-arena",
  format: "portrait",
  caption: `GRILL ARENA — le seul battle BBQ live d'Europe. Des pitmasters internationaux s'affrontent en direct, un champion couronné chaque soir. 🔥🆚🔥 12-13-14 mars 2027.
#GrillArena #BarbecueExpo #BBQBattle #Pitmaster #Paris`,
  slides: [
    { kind: "vs",
      title: "GRILL ARENA",
      subtitle: "Le seul battle BBQ live d'Europe",
      hook1: "Ni Spoga Gafa ni BBQ Expo Italy ne l'ont.",
      hook2: "Un champion couronné chaque soir.",
      photo: "zone-grill-arena.jpg",
    },
  ],
  animated: { kind: "grillArena", fps: 24, photo: "zone-grill-arena.jpg", formats: ["story", "portrait"] },
};

export default campaign;
