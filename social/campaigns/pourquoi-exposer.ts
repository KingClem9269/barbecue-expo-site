import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "pourquoi-exposer",
  format: "portrait",
  caption: `Les visiteurs qui comptent pour votre marque sont déjà là : acheteurs GSA/GSB, jardineries, distributeurs, CHR. 3 jours pour vendre, recruter des revendeurs et exister sur le plus grand salon BBQ d'Europe. Dossier exposant en bio.
#BarbecueExpo #BBQ #B2B #Retail #SalonProfessionnel #OutdoorCooking`,
  slides: [
    { kind: "hook", eyebrow: "Espace exposant", title: "Pourquoi exposer\nà Barbecue Expo ?", highlight: ["exposer"], photo: "bbq-expo-066.jpg" },
    { kind: "stat", value: "30 000", label: "visiteurs attendus", sub: "Un public prescripteur ET grand public spécialisé qui vient pour acheter." },
    { kind: "logos", title: "Les acheteurs\nviennent.", highlight: ["viennent."], logos: [
      { src: "enseignes/gsa-gsb/carrefour.webp" },
      { src: "enseignes/gsa-gsb/leroy-merlin.png" },
      { src: "enseignes/gsa-gsb/castorama.jpg" },
      { src: "enseignes/gsa-gsb/truffaut.png" },
      { src: "enseignes/gsa-gsb/jardiland.png" },
      { src: "enseignes/gsa-gsb/intermarche.png" },
      { src: "enseignes/gsa-gsb/botanic.jpg" },
      { src: "enseignes/gsa-gsb/mr-bricolage.png" },
    ] },
    { kind: "logos", title: "Distributeurs &\nimportateurs", logos: [
      { src: "enseignes/distributeurs/rauw.webp" },
      { src: "enseignes/distributeurs/favex.png" },
      { src: "enseignes/distributeurs/barbecue-and-co.png" },
      { src: "enseignes/distributeurs/planet-outdoor.webp" },
      { src: "enseignes/distributeurs/plan-b.png" },
    ] },
    { kind: "logos", title: "CHR &\nrestauration", logos: [
      { src: "enseignes/chr/sodexo.png" },
      { src: "enseignes/chr/accor.png" },
      { src: "enseignes/chr/le-train-bleu.png" },
      { src: "enseignes/chr/pny.webp" },
      { src: "enseignes/chr/goody-grill.png" },
    ] },
    { kind: "stats", title: "Une visibilité\nmassive", items: [
      { value: "500 M+", label: "de contacts média" },
      { value: "200 000", label: "abonnés" },
      { value: "3 500", label: "affiches publiques" },
    ] },
    { kind: "cta", title: "Votre marque,\nau cœur du feu.", highlight: ["au cœur du feu."], button: "Réservez votre stand", url: "barbecue-expo.fr/devenez-exposants", photo: "bbq-expo-403.jpg" },
  ],
};

export default campaign;
