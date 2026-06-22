import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "awards",
  format: "portrait",
  caption: `Nouveauté 2027 : les Barbecue Expo Awards. Or, argent, bronze sur 5 catégories, jury international, évaluation à l'aveugle. Une médaille qui devient votre meilleur argument de vente pendant un an. 🥇
#BarbecueExpo #Awards #BBQ #Innovation`,
  slides: [
    { kind: "hook", eyebrow: "Nouveauté 2027", title: "Première édition :\nles Barbecue\nExpo Awards.", highlight: ["Barbecue\nExpo Awards."], photo: "bbq-expo-066.jpg" },
    { kind: "medals", title: "Or · Argent · Bronze", sub: "sur 5 catégories" },
    { kind: "text", title: "Un label\nqui pèse.", body: "Jury international · évaluation à l'aveugle · cérémonie au Parc Floral de Paris.", highlight: ["pèse."] },
    { kind: "cta", title: "Une médaille = un\nargument de vente\npour un an.", highlight: ["pour un an."], button: "Candidatez en exposant 2027", url: "barbecue-expo.fr/devenez-exposants", photo: "bbq-expo-105.jpg" },
  ],
};

export default campaign;
