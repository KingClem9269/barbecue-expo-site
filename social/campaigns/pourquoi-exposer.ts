import type { Campaign } from "../types";

const campaign: Campaign = {
  slug: "pourquoi-exposer",
  format: "portrait",
  caption: {
    fr: `Les visiteurs qui comptent pour votre marque sont déjà là : magasins spécialisés, GSA/GSB/GSS, jardineries, distributeurs, CHR, aménagement d'extérieur. 3 jours pour vendre, recruter des revendeurs et exister sur le plus grand salon BBQ d'Europe. Dossier exposant 👉 barbecue-expo.fr/devenez-exposants (lien en bio).
#BarbecueExpo #BBQ #B2B #Retail #SalonProfessionnel #OutdoorCooking`,
    en: `The buyers that matter to your brand are already here: specialist stores, supermarkets, DIY & garden chains, distributors, hospitality, outdoor design. 3 days to sell, recruit resellers and stand out at Europe's biggest BBQ show. Exhibitor pack 👉 barbecue-expo.fr/devenez-exposants (link in bio).
#BarbecueExpo #BBQ #B2B #Retail #TradeShow #OutdoorCooking`,
  },
  slides: [
    { kind: "hook", eyebrow: { fr: "Espace exposant", en: "Exhibitor space" }, title: { fr: "Pourquoi exposer\nà Barbecue Expo ?", en: "Why exhibit at\nBarbecue Expo?" }, highlight: { fr: ["exposer"], en: ["exhibit"] }, photo: "bbq-expo-066.jpg" },
    { kind: "stat", value: "30 000", label: { fr: "visiteurs attendus", en: "expected visitors" }, sub: { fr: "Un public prescripteur ET grand public spécialisé qui vient pour acheter.", en: "Trade decision-makers AND a specialist public who come to buy." } },
    { kind: "logos", title: { fr: "Les magasins\nspécialisés.", en: "Specialist\nstores." }, highlight: { fr: ["spécialisés."], en: ["Specialist"] }, logos: [
      { src: "enseignes/distributeurs/barbecue-and-co.png" },
      { src: "enseignes/retailers/revendeur-01.jpg" },
      { src: "enseignes/retailers/revendeur-02.jpg" },
      { src: "enseignes/retailers/revendeur-05.png" },
      { src: "enseignes/retailers/breizh-barbecue.jpg" },
      { src: "enseignes/retailers/samo.webp" },
      { src: "enseignes/retailers/dims.png" },
      { src: "enseignes/retailers/motion-prestashio.jpg" },
      { src: "enseignes/retailers/kamado-compleet.png" },
      { src: "enseignes/retailers/revendeur-04.jpeg" },
      { src: "enseignes/retailers/bbq-2ssad.png" },
    ] },
    { kind: "logos", title: { fr: "GSA · GSB · GSS", en: "Mass & DIY retail" }, logos: [
      { src: "enseignes/gsa-gsb/carrefour.webp" },
      { src: "enseignes/gsa-gsb/monoprix.webp" },
      { src: "enseignes/gsa-gsb/intermarche.png" },
      { src: "enseignes/gsa-gsb/leroy-merlin.png" },
      { src: "enseignes/gsa-gsb/castorama.jpg" },
      { src: "enseignes/gsa-gsb/brico-depot.png" },
      { src: "enseignes/gsa-gsb/bricomarche.jpg" },
      { src: "enseignes/gsa-gsb/kingfisher.png" },
      { src: "enseignes/gsa-gsb/conforama.webp" },
    ], faded: [
      "enseignes/gsa-gsb/weldom.png",
      "enseignes/gsa-gsb/bricorama.png",
      "enseignes/gsa-gsb/bigmat.jpg",
    ] },
    { kind: "logos", title: { fr: "Les jardineries.", en: "Garden centres." }, highlight: { fr: ["jardineries."], en: ["Garden centres."] }, logos: [
      { src: "enseignes/gsa-gsb/jardiland.png" },
      { src: "enseignes/gsa-gsb/truffaut.png" },
      { src: "enseignes/gsa-gsb/botanic.jpg" },
      { src: "enseignes/gsa-gsb/gamm-vert.jpg" },
      { src: "enseignes/gsa-gsb/villaverde.webp" },
      { src: "enseignes/gsa-gsb/point-vert.jpg" },
      { src: "enseignes/gsa-gsb/delbard.jpg" },
      { src: "enseignes/gsa-gsb/teract.png" },
    ] },
    { kind: "proMix", title: { fr: "Et beaucoup\nd'autres pros.", en: "And many\nmore pros." }, highlight: { fr: ["d'autres pros."], en: ["more pros."] },
      lines: [
        { fr: "Importateurs & distributeurs", en: "Importers & distributors" },
        { fr: "CHR & restauration", en: "Hospitality & food service" },
        { fr: "Aménagement d'extérieur", en: "Outdoor design & landscaping" },
      ],
      logos: [
        "enseignes/chr/sodexo.png",
        "enseignes/chr/accor.png",
        "enseignes/chr/le-train-bleu.png",
        "enseignes/amenagement/symbiose.png",
        "enseignes/amenagement/la-cornue.webp",
        "enseignes/amenagement/logo-blue.svg",
      ],
      faded: [
        "enseignes/distributeurs/rauw.webp",
        "enseignes/distributeurs/favex.png",
        "enseignes/chr/goody-grill.png",
        "enseignes/amenagement/agave-paysage.png",
        "enseignes/amenagement/urbanica.png",
        "enseignes/amenagement/suzzoni.png",
      ],
    },
    { kind: "stats", title: { fr: "Une visibilité\nmassive", en: "Massive\nreach" }, items: [
      { value: "500 M+", label: { fr: "de contacts média", en: "media contacts" } },
      { value: "200 000", label: { fr: "abonnés", en: "followers" } },
      { value: "3 500", label: { fr: "affiches publiques", en: "public posters" } },
    ] },
    { kind: "cta", title: { fr: "Votre marque,\nau cœur du feu.", en: "Your brand,\nat the heart of\nthe fire." }, highlight: { fr: ["au cœur du feu."], en: ["the heart of\nthe fire."] }, sub: { fr: "Réservez votre stand — places limitées.", en: "Book your booth — limited spots." }, button: { fr: "Réservez votre stand", en: "Book your booth" }, url: "barbecue-expo.fr/devenez-exposants", photo: "bbq-expo-302.jpg" },
  ],
};

export default campaign;
