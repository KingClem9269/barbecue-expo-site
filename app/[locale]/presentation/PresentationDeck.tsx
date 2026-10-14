"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { CHIFFRES, nombre } from "@/lib/chiffres";
import {
  Flame,
  Users,
  Globe,
  Trophy,
  ChefHat,
  Utensils,
  Megaphone,
  MapPin,
  Calendar,
  Building2,
  Tv,
  ArrowUpRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Localized content (fr, en, es, de, nl, pt, it) — official deck 2027 */
/* ------------------------------------------------------------------ */

const C = {
  fr: {
    switchTo: "EN",
    // Cover
    edition: "6ᵉ édition",
    coverTitle: "L'événement barbecue européen pour les pros et les passionnés.",
    coverDate: "12 · 13 · 14 Mars 2027",
    coverVenue: "Parc Floral de Paris",
    // What
    whatEyebrow: "Le salon",
    whatTitle: "Un événement B2B & B2C au cœur d'un écosystème puissant.",
    whatBody:
      "Du 12 au 14 mars 2027, le Parc Floral de Paris accueille la 6ᵉ édition de Barbecue Expo — le plus grand salon européen dédié au barbecue et à la cuisine en plein air. En quelques années, l'événement s'est imposé comme le rendez-vous incontournable d'un secteur en pleine transformation : grand public passionné le week-end, professionnels et acheteurs en quête d'innovations et de business.",
    // Figures
    figuresEyebrow: "Les chiffres",
    figures: [
      { value: nombre(CHIFFRES.visiteurs2026, "fr"), label: "visiteurs en 2026" },
      { value: nombre(CHIFFRES.marques2027, "fr"), label: "marques internationales en 2027" },
      { value: nombre(CHIFFRES.pays2027, "fr"), label: "pays représentés en 2027" },
      { value: "20 000 m²", label: "indoor & outdoor" },
      { value: "85", label: "pitmasters & chefs" },
      { value: "3 jours", label: "d'expérience" },
    ],
    // Zones
    zonesEyebrow: "L'expérience",
    zonesTitle: "Vivez le barbecue sous toutes ses saveurs.",
    zones: [
      { icon: "flame", title: "Grill Arena", body: "Le seul format battle live d'Europe : des pitmasters internationaux s'affrontent devant le public." },
      { icon: "chef", title: "Cooking Shows", body: "Trois jours de démonstrations live par les plus grands experts du secteur." },
      { icon: "grad", title: "Masterclasses", body: "Sessions intimistes pour apprendre les techniques des meilleurs." },
      { icon: "utensils", title: "BBQ Street Food", body: "Le meilleur de la street food barbecue, sélectionné pour le salon." },
      { icon: "trophy", title: "Barbecue Expo Awards", body: "Les récompenses qui distinguent les meilleures marques du secteur." },
      { icon: "building", title: "Zone Exposants", body: `${CHIFFRES.marques2027} marques à tester en conditions réelles, achat direct possible.` },
    ],
    // Pros
    proEyebrow: "Les visiteurs professionnels",
    proTitle: "Le rendez-vous business de la cuisson outdoor.",
    proBody:
      "Barbecue Expo réunit tous les acteurs de la filière : distributeurs spécialisés, enseignes GSA & GSB, réseaux de jardinerie, acheteurs CHR, prescripteurs et marques. Trois jours pour découvrir les innovations, développer son offre et capter les tendances du marché.",
    proTags: [
      "Distributeurs spécialisés",
      "Enseignes GSA / GSB",
      "Réseaux de jardinerie",
      "Acheteurs CHR / HORECA",
      "Prescripteurs & presse",
      "Marques internationales",
    ],
    // Media
    mediaEyebrow: "Force de frappe média",
    mediaTitle: "Une visibilité à l'échelle européenne.",
    mediaBody:
      "Plus de 500 millions de contacts générés en 2025. Une communauté de 132 000+ abonnés, un affichage public massif et une présence média TV, radio et presse spécialisée.",
    mediaStats: [
      { value: "500 M+", label: "contacts média 2025" },
      { value: "132 000+", label: "communauté réseaux sociaux" },
      { value: "17 000", label: "inscrits newsletter" },
    ],
    chefsLabel: "Quelques chefs de renom",
    // Practical
    practicalEyebrow: "Infos pratiques",
    practicalTitle: "Tout pour préparer votre venue.",
    days: [
      { day: "Vendredi 12 mars", hours: "9h30 — 19h00" },
      { day: "Samedi 13 mars", hours: "9h30 — 19h00" },
      { day: "Dimanche 14 mars", hours: "9h30 — 18h00" },
    ],
    venueLabel: "Lieu",
    venueValue: "Parc Floral de Paris — 26 Route du Champ de Manœuvre, 75012 Paris",
    accessLabel: "Accès",
    accessValue: "Métro ligne 1 (Château de Vincennes) · 5 min du périphérique · Parking 500 places",
    // CTA
    ctaTitle: "En 2027, toutes les flammes mènent à Paris.",
    ctaBody: "Vous souhaitez exposer ou devenir partenaire ?",
    ctaPrimary: "Devenir exposant",
    ctaSecondary: "Nous contacter",
  },
  en: {
    switchTo: "FR",
    edition: "6th edition",
    coverTitle: "The European barbecue event for professionals and enthusiasts.",
    coverDate: "March 12 · 13 · 14, 2027",
    coverVenue: "Parc Floral de Paris",
    whatEyebrow: "The show",
    whatTitle: "A B2B & B2C event at the heart of a powerful ecosystem.",
    whatBody:
      "From March 12 to 14, 2027, the Parc Floral de Paris hosts the 6th edition of Barbecue Expo — the largest European trade show dedicated to barbecue and outdoor cooking. In just a few years, the event has become the must-attend gathering of an industry undergoing major transformation: a passionate general public on the weekend, professionals and buyers looking for innovation and business.",
    figuresEyebrow: "Key figures",
    figures: [
      { value: nombre(CHIFFRES.visiteurs2026, "en"), label: "visitors in 2026" },
      { value: nombre(CHIFFRES.marques2027, "en"), label: "international brands in 2027" },
      { value: nombre(CHIFFRES.pays2027, "en"), label: "countries represented in 2027" },
      { value: "20,000 m²", label: "indoor & outdoor" },
      { value: "85", label: "pitmasters & chefs" },
      { value: "3 days", label: "of experience" },
    ],
    zonesEyebrow: "The experience",
    zonesTitle: "Experience barbecue in all its flavors.",
    zones: [
      { icon: "flame", title: "Grill Arena", body: "Europe's only live battle format: international pitmasters compete in front of the audience." },
      { icon: "chef", title: "Cooking Shows", body: "Three days of live demonstrations by the industry's top experts." },
      { icon: "grad", title: "Masterclasses", body: "Intimate sessions to learn the techniques of the very best." },
      { icon: "utensils", title: "BBQ Street Food", body: "The best of barbecue street food, curated for the show." },
      { icon: "trophy", title: "Barbecue Expo Awards", body: "The awards that distinguish the best brands in the industry." },
      { icon: "building", title: "Exhibitor Zone", body: `${CHIFFRES.marques2027} brands to test in real conditions, with direct purchase.` },
    ],
    proEyebrow: "Professional visitors",
    proTitle: "The business hub of outdoor cooking.",
    proBody:
      "Barbecue Expo brings together every player in the industry: specialized distributors, grocery & DIY chains, garden-center networks, hospitality buyers, influencers and brands. Three days to discover innovations, expand offerings and capture market trends.",
    proTags: [
      "Specialized distributors",
      "Grocery & DIY chains",
      "Garden-center networks",
      "Hospitality / HORECA buyers",
      "Influencers & press",
      "International brands",
    ],
    mediaEyebrow: "Media reach",
    mediaTitle: "Visibility on a European scale.",
    mediaBody:
      "Over 500 million contacts generated in 2025. A community of 132,000+ followers, massive outdoor advertising and a TV, radio and trade-press presence.",
    mediaStats: [
      { value: "500 M+", label: "media contacts 2025" },
      { value: "132,000+", label: "social media community" },
      { value: "17,000", label: "newsletter subscribers" },
    ],
    chefsLabel: "Some renowned chefs",
    practicalEyebrow: "Useful information",
    practicalTitle: "Everything to plan your visit.",
    days: [
      { day: "Friday, March 12", hours: "9:30 AM — 7:00 PM" },
      { day: "Saturday, March 13", hours: "9:30 AM — 7:00 PM" },
      { day: "Sunday, March 14", hours: "9:30 AM — 6:00 PM" },
    ],
    venueLabel: "Venue",
    venueValue: "Parc Floral de Paris — 26 Route du Champ de Manœuvre, 75012 Paris",
    accessLabel: "Access",
    accessValue: "Metro line 1 (Château de Vincennes) · 5 min from the ring road · 500-space car park",
    ctaTitle: "In 2027, all flames lead to Paris.",
    ctaBody: "Would you like to exhibit or become a partner?",
    ctaPrimary: "Become an exhibitor",
    ctaSecondary: "Contact us",
  },
  es: {
    switchTo: "FR",
    edition: "6.ª edición",
    coverTitle: "El evento europeo de la barbacoa para profesionales y apasionados.",
    coverDate: "12 · 13 · 14 de marzo de 2027",
    coverVenue: "Parc Floral de Paris",
    whatEyebrow: "El salón",
    whatTitle: "Un evento B2B y B2C en el corazón de un ecosistema potente.",
    whatBody:
      "Del 12 al 14 de marzo de 2027, el Parc Floral de París acoge la 6.ª edición de Barbecue Expo, el mayor salón europeo dedicado a la barbacoa y la cocina al aire libre. En pocos años, el evento se ha consolidado como la cita imprescindible de un sector en plena transformación: público apasionado durante el fin de semana, profesionales y compradores en busca de innovación y negocio.",
    figuresEyebrow: "Las cifras",
    figures: [
      { value: nombre(CHIFFRES.visiteurs2026, "es"), label: "visitantes en 2026" },
      { value: nombre(CHIFFRES.marques2027, "es"), label: "marcas internacionales en 2027" },
      { value: nombre(CHIFFRES.pays2027, "es"), label: "países representados en 2027" },
      { value: "20.000 m²", label: "interior y exterior" },
      { value: "85", label: "pitmasters y chefs" },
      { value: "3 días", label: "de experiencia" },
    ],
    zonesEyebrow: "La experiencia",
    zonesTitle: "Vive la barbacoa en todos sus sabores.",
    zones: [
      { icon: "flame", title: "Grill Arena", body: "El único formato de batalla en directo de Europa: pitmasters internacionales se enfrentan ante el público." },
      { icon: "chef", title: "Cooking Shows", body: "Tres días de demostraciones en directo a cargo de los mayores expertos del sector." },
      { icon: "grad", title: "Masterclasses", body: "Sesiones reducidas para aprender las técnicas de los mejores." },
      { icon: "utensils", title: "BBQ Street Food", body: "Lo mejor del street food de barbacoa, seleccionado para el salón." },
      { icon: "trophy", title: "Barbecue Expo Awards", body: "Los premios que distinguen a las mejores marcas del sector." },
      { icon: "building", title: "Zona de expositores", body: `${CHIFFRES.marques2027} marcas para probar en condiciones reales, con compra directa posible.` },
    ],
    proEyebrow: "Visitantes profesionales",
    proTitle: "La cita de negocios de la cocina al aire libre.",
    proBody:
      "Barbecue Expo reúne a todos los actores del sector: distribuidores especializados, cadenas de alimentación y bricolaje, redes de centros de jardinería, compradores HORECA, prescriptores y marcas. Tres días para descubrir las novedades, ampliar la oferta y captar las tendencias del mercado.",
    proTags: [
      "Distribuidores especializados",
      "Cadenas de alimentación y bricolaje",
      "Redes de centros de jardinería",
      "Compradores HORECA",
      "Prescriptores y prensa",
      "Marcas internacionales",
    ],
    mediaEyebrow: "Alcance mediático",
    mediaTitle: "Una visibilidad a escala europea.",
    mediaBody:
      "Más de 500 millones de contactos generados en 2025. Una comunidad de más de 132.000 seguidores, una campaña masiva de publicidad exterior y presencia en televisión, radio y prensa especializada.",
    mediaStats: [
      { value: "500 M+", label: "contactos mediáticos 2025" },
      { value: "132.000+", label: "comunidad en redes sociales" },
      { value: "17.000", label: "suscriptores a la newsletter" },
    ],
    chefsLabel: "Algunos chefs de renombre",
    practicalEyebrow: "Información práctica",
    practicalTitle: "Todo para preparar tu visita.",
    days: [
      { day: "Viernes 12 de marzo", hours: "9:30 — 19:00" },
      { day: "Sábado 13 de marzo", hours: "9:30 — 19:00" },
      { day: "Domingo 14 de marzo", hours: "9:30 — 18:00" },
    ],
    venueLabel: "Lugar",
    venueValue: "Parc Floral de Paris — 26 Route du Champ de Manœuvre, 75012 París",
    accessLabel: "Acceso",
    accessValue: "Metro línea 1 (Château de Vincennes) · a 5 min del bulevar periférico · Aparcamiento de 500 plazas",
    ctaTitle: "En 2027, todas las llamas llevan a París.",
    ctaBody: "¿Quieres exponer o convertirte en socio?",
    ctaPrimary: "Ser expositor",
    ctaSecondary: "Contáctanos",
  },
  de: {
    switchTo: "FR",
    edition: "6. Ausgabe",
    coverTitle: "Das europäische Barbecue-Event für Profis und Leidenschaftliche.",
    coverDate: "12. · 13. · 14. März 2027",
    coverVenue: "Parc Floral de Paris",
    whatEyebrow: "Die Messe",
    whatTitle: "Ein B2B- & B2C-Event im Herzen eines starken Ökosystems.",
    whatBody:
      "Vom 12. bis 14. März 2027 empfängt der Parc Floral de Paris die 6. Ausgabe der Barbecue Expo – die größte europäische Messe rund um Barbecue und Outdoor-Kochen. In wenigen Jahren hat sich das Event als unverzichtbarer Treffpunkt einer Branche im Wandel etabliert: leidenschaftliches Publikum am Wochenende, Fachleute und Einkäufer auf der Suche nach Innovationen und Geschäften.",
    figuresEyebrow: "Die Zahlen",
    figures: [
      { value: nombre(CHIFFRES.visiteurs2026, "de"), label: "Besucher 2026" },
      { value: nombre(CHIFFRES.marques2027, "de"), label: "internationale Marken 2027" },
      { value: nombre(CHIFFRES.pays2027, "de"), label: "vertretene Länder 2027" },
      { value: "20.000 m²", label: "Indoor & Outdoor" },
      { value: "85", label: "Pitmaster & Köche" },
      { value: "3 Tage", label: "Erlebnis" },
    ],
    zonesEyebrow: "Das Erlebnis",
    zonesTitle: "Barbecue in all seinen Facetten erleben.",
    zones: [
      { icon: "flame", title: "Grill Arena", body: "Europas einziges Live-Battle-Format: Internationale Pitmaster treten vor Publikum gegeneinander an." },
      { icon: "chef", title: "Cooking Shows", body: "Drei Tage Live-Vorführungen der größten Experten der Branche." },
      { icon: "grad", title: "Masterclasses", body: "Sessions im kleinen Kreis, um die Techniken der Besten zu lernen." },
      { icon: "utensils", title: "BBQ Street Food", body: "Das Beste aus dem Barbecue-Streetfood, ausgewählt für die Messe." },
      { icon: "trophy", title: "Barbecue Expo Awards", body: "Die Auszeichnungen für die besten Marken der Branche." },
      { icon: "building", title: "Ausstellerbereich", body: `${CHIFFRES.marques2027} Marken zum Testen unter realen Bedingungen, Direktkauf möglich.` },
    ],
    proEyebrow: "Fachbesucher",
    proTitle: "Der Business-Treffpunkt des Outdoor-Kochens.",
    proBody:
      "Die Barbecue Expo vereint alle Akteure der Branche: Fachhändler, Lebensmittel- und Baumarktketten, Gartencenter-Netzwerke, Gastronomie-Einkäufer, Multiplikatoren und Marken. Drei Tage, um Innovationen zu entdecken, das eigene Angebot auszubauen und Markttrends aufzuspüren.",
    proTags: [
      "Fachhändler",
      "Lebensmittel- & Baumarktketten",
      "Gartencenter-Netzwerke",
      "Gastronomie-Einkäufer (HORECA)",
      "Multiplikatoren & Presse",
      "Internationale Marken",
    ],
    mediaEyebrow: "Mediale Schlagkraft",
    mediaTitle: "Sichtbarkeit auf europäischer Ebene.",
    mediaBody:
      "Über 500 Millionen Medienkontakte im Jahr 2025. Eine Community von über 132.000 Followern, großflächige Außenwerbung und Präsenz in TV, Radio und Fachpresse.",
    mediaStats: [
      { value: "500 Mio.+", label: "Medienkontakte 2025" },
      { value: "132.000+", label: "Social-Media-Community" },
      { value: "17.000", label: "Newsletter-Abonnenten" },
    ],
    chefsLabel: "Einige renommierte Köche",
    practicalEyebrow: "Praktische Infos",
    practicalTitle: "Alles für Ihren Besuch.",
    days: [
      { day: "Freitag, 12. März", hours: "9:30 — 19:00 Uhr" },
      { day: "Samstag, 13. März", hours: "9:30 — 19:00 Uhr" },
      { day: "Sonntag, 14. März", hours: "9:30 — 18:00 Uhr" },
    ],
    venueLabel: "Veranstaltungsort",
    venueValue: "Parc Floral de Paris — 26 Route du Champ de Manœuvre, 75012 Paris",
    accessLabel: "Anreise",
    accessValue: "Metro Linie 1 (Château de Vincennes) · 5 Min. vom Boulevard périphérique · Parkplatz mit 500 Stellplätzen",
    ctaTitle: "2027 führen alle Flammen nach Paris.",
    ctaBody: "Sie möchten ausstellen oder Partner werden?",
    ctaPrimary: "Aussteller werden",
    ctaSecondary: "Kontakt",
  },
  nl: {
    switchTo: "FR",
    edition: "6e editie",
    coverTitle: "Hét Europese barbecue-evenement voor professionals en liefhebbers.",
    coverDate: "12 · 13 · 14 maart 2027",
    coverVenue: "Parc Floral de Paris",
    whatEyebrow: "De beurs",
    whatTitle: "Een B2B- & B2C-evenement in het hart van een sterk ecosysteem.",
    whatBody:
      "Van 12 tot 14 maart 2027 ontvangt het Parc Floral de Paris de 6e editie van Barbecue Expo – de grootste Europese beurs voor barbecue en buitenkoken. In enkele jaren is het evenement uitgegroeid tot dé ontmoetingsplek van een sector in volle verandering: gepassioneerd publiek in het weekend, professionals en inkopers op zoek naar innovatie en business.",
    figuresEyebrow: "De cijfers",
    figures: [
      { value: nombre(CHIFFRES.visiteurs2026, "nl"), label: "bezoekers in 2026" },
      { value: nombre(CHIFFRES.marques2027, "nl"), label: "internationale merken in 2027" },
      { value: nombre(CHIFFRES.pays2027, "nl"), label: "vertegenwoordigde landen in 2027" },
      { value: "20.000 m²", label: "binnen & buiten" },
      { value: "85", label: "pitmasters & chefs" },
      { value: "3 dagen", label: "beleving" },
    ],
    zonesEyebrow: "De beleving",
    zonesTitle: "Beleef barbecue in al zijn smaken.",
    zones: [
      { icon: "flame", title: "Grill Arena", body: "Het enige live battle-formaat van Europa: internationale pitmasters strijden tegen elkaar voor publiek." },
      { icon: "chef", title: "Cooking Shows", body: "Drie dagen live demonstraties door de grootste experts uit de sector." },
      { icon: "grad", title: "Masterclasses", body: "Sessies in kleine groep om de technieken van de besten te leren." },
      { icon: "utensils", title: "BBQ Street Food", body: "Het beste van de barbecue-streetfood, geselecteerd voor de beurs." },
      { icon: "trophy", title: "Barbecue Expo Awards", body: "De prijzen die de beste merken uit de sector onderscheiden." },
      { icon: "building", title: "Exposantenzone", body: `${CHIFFRES.marques2027} merken om in echte omstandigheden te testen, direct aankopen mogelijk.` },
    ],
    proEyebrow: "Professionele bezoekers",
    proTitle: "Dé zakelijke ontmoetingsplek van het buitenkoken.",
    proBody:
      "Barbecue Expo brengt alle spelers uit de sector samen: gespecialiseerde verdelers, supermarkt- en doe-het-zelfketens, tuincentrumnetwerken, horeca-inkopers, voorschrijvers en merken. Drie dagen om innovaties te ontdekken, je aanbod uit te breiden en de markttrends op te pikken.",
    proTags: [
      "Gespecialiseerde verdelers",
      "Supermarkt- & doe-het-zelfketens",
      "Tuincentrumnetwerken",
      "Horeca-inkopers",
      "Voorschrijvers & pers",
      "Internationale merken",
    ],
    mediaEyebrow: "Mediabereik",
    mediaTitle: "Zichtbaarheid op Europese schaal.",
    mediaBody:
      "Meer dan 500 miljoen contacten gegenereerd in 2025. Een community van 132.000+ volgers, massale buitenreclame en aanwezigheid op tv, radio en in de vakpers.",
    mediaStats: [
      { value: "500 mln+", label: "mediacontacten 2025" },
      { value: "132.000+", label: "community op sociale media" },
      { value: "17.000", label: "nieuwsbriefabonnees" },
    ],
    chefsLabel: "Enkele bekende chefs",
    practicalEyebrow: "Praktische info",
    practicalTitle: "Alles om je bezoek voor te bereiden.",
    days: [
      { day: "Vrijdag 12 maart", hours: "9.30 — 19.00 uur" },
      { day: "Zaterdag 13 maart", hours: "9.30 — 19.00 uur" },
      { day: "Zondag 14 maart", hours: "9.30 — 18.00 uur" },
    ],
    venueLabel: "Locatie",
    venueValue: "Parc Floral de Paris — 26 Route du Champ de Manœuvre, 75012 Parijs",
    accessLabel: "Bereikbaarheid",
    accessValue: "Metrolijn 1 (Château de Vincennes) · 5 min van de Périphérique · Parking met 500 plaatsen",
    ctaTitle: "In 2027 leiden alle vlammen naar Parijs.",
    ctaBody: "Wil je exposeren of partner worden?",
    ctaPrimary: "Exposant worden",
    ctaSecondary: "Contact opnemen",
  },
  pt: {
    switchTo: "FR",
    edition: "6.ª edição",
    coverTitle: "O evento europeu de barbecue para profissionais e apaixonados.",
    coverDate: "12 · 13 · 14 de março de 2027",
    coverVenue: "Parc Floral de Paris",
    whatEyebrow: "O salão",
    whatTitle: "Um evento B2B e B2C no coração de um ecossistema poderoso.",
    whatBody:
      "De 12 a 14 de março de 2027, o Parc Floral de Paris acolhe a 6.ª edição da Barbecue Expo — o maior salão europeu dedicado ao barbecue e à cozinha ao ar livre. Em poucos anos, o evento tornou-se o encontro incontornável de um setor em plena transformação: público apaixonado ao fim de semana, profissionais e compradores à procura de inovação e negócios.",
    figuresEyebrow: "Os números",
    figures: [
      { value: nombre(CHIFFRES.visiteurs2026, "pt"), label: "visitantes em 2026" },
      { value: nombre(CHIFFRES.marques2027, "pt"), label: "marcas internacionais em 2027" },
      { value: nombre(CHIFFRES.pays2027, "pt"), label: "países representados em 2027" },
      { value: "20 000 m²", label: "interior e exterior" },
      { value: "85", label: "pitmasters e chefs" },
      { value: "3 dias", label: "de experiência" },
    ],
    zonesEyebrow: "A experiência",
    zonesTitle: "Viva o barbecue em todos os seus sabores.",
    zones: [
      { icon: "flame", title: "Grill Arena", body: "O único formato de batalha ao vivo da Europa: pitmasters internacionais enfrentam-se perante o público." },
      { icon: "chef", title: "Cooking Shows", body: "Três dias de demonstrações ao vivo pelos maiores especialistas do setor." },
      { icon: "grad", title: "Masterclasses", body: "Sessões intimistas para aprender as técnicas dos melhores." },
      { icon: "utensils", title: "BBQ Street Food", body: "O melhor do street food de barbecue, selecionado para o salão." },
      { icon: "trophy", title: "Barbecue Expo Awards", body: "Os prémios que distinguem as melhores marcas do setor." },
      { icon: "building", title: "Zona de expositores", body: `${CHIFFRES.marques2027} marcas para testar em condições reais, com compra direta possível.` },
    ],
    proEyebrow: "Visitantes profissionais",
    proTitle: "O encontro de negócios da cozinha ao ar livre.",
    proBody:
      "A Barbecue Expo reúne todos os intervenientes do setor: distribuidores especializados, cadeias de distribuição alimentar e de bricolage, redes de centros de jardinagem, compradores HORECA, prescritores e marcas. Três dias para descobrir as novidades, desenvolver a oferta e captar as tendências do mercado.",
    proTags: [
      "Distribuidores especializados",
      "Cadeias alimentares e de bricolage",
      "Redes de centros de jardinagem",
      "Compradores HORECA",
      "Prescritores e imprensa",
      "Marcas internacionais",
    ],
    mediaEyebrow: "Força mediática",
    mediaTitle: "Uma visibilidade à escala europeia.",
    mediaBody:
      "Mais de 500 milhões de contactos gerados em 2025. Uma comunidade de mais de 132 000 seguidores, publicidade exterior massiva e presença na televisão, rádio e imprensa especializada.",
    mediaStats: [
      { value: "500 M+", label: "contactos mediáticos 2025" },
      { value: "132 000+", label: "comunidade nas redes sociais" },
      { value: "17 000", label: "subscritores da newsletter" },
    ],
    chefsLabel: "Alguns chefs de renome",
    practicalEyebrow: "Informações práticas",
    practicalTitle: "Tudo para preparar a sua visita.",
    days: [
      { day: "Sexta-feira, 12 de março", hours: "9h30 — 19h00" },
      { day: "Sábado, 13 de março", hours: "9h30 — 19h00" },
      { day: "Domingo, 14 de março", hours: "9h30 — 18h00" },
    ],
    venueLabel: "Local",
    venueValue: "Parc Floral de Paris — 26 Route du Champ de Manœuvre, 75012 Paris",
    accessLabel: "Acesso",
    accessValue: "Metro linha 1 (Château de Vincennes) · a 5 min da circular periférica · Parque de estacionamento com 500 lugares",
    ctaTitle: "Em 2027, todas as chamas levam a Paris.",
    ctaBody: "Quer expor ou tornar-se parceiro?",
    ctaPrimary: "Tornar-se expositor",
    ctaSecondary: "Contacte-nos",
  },
  it: {
    switchTo: "FR",
    edition: "6ª edizione",
    coverTitle: "L'evento europeo del barbecue per professionisti e appassionati.",
    coverDate: "12 · 13 · 14 marzo 2027",
    coverVenue: "Parc Floral de Paris",
    whatEyebrow: "Il salone",
    whatTitle: "Un evento B2B & B2C nel cuore di un ecosistema potente.",
    whatBody:
      "Dal 12 al 14 marzo 2027, il Parc Floral di Parigi ospita la 6ª edizione di Barbecue Expo — il più grande salone europeo dedicato al barbecue e alla cucina all'aperto. In pochi anni l'evento si è affermato come l'appuntamento imperdibile di un settore in piena trasformazione: pubblico appassionato nel fine settimana, professionisti e buyer alla ricerca di innovazione e business.",
    figuresEyebrow: "I numeri",
    figures: [
      { value: nombre(CHIFFRES.visiteurs2026, "it"), label: "visitatori nel 2026" },
      { value: nombre(CHIFFRES.marques2027, "it"), label: "marchi internazionali nel 2027" },
      { value: nombre(CHIFFRES.pays2027, "it"), label: "paesi rappresentati nel 2027" },
      { value: "20.000 m²", label: "indoor & outdoor" },
      { value: "85", label: "pitmaster & chef" },
      { value: "3 giorni", label: "di esperienza" },
    ],
    zonesEyebrow: "L'esperienza",
    zonesTitle: "Vivi il barbecue in tutti i suoi sapori.",
    zones: [
      { icon: "flame", title: "Grill Arena", body: "L'unico format di sfida dal vivo in Europa: pitmaster internazionali si affrontano davanti al pubblico." },
      { icon: "chef", title: "Cooking Shows", body: "Tre giorni di dimostrazioni dal vivo dei più grandi esperti del settore." },
      { icon: "grad", title: "Masterclass", body: "Sessioni a numero ristretto per imparare le tecniche dei migliori." },
      { icon: "utensils", title: "BBQ Street Food", body: "Il meglio dello street food barbecue, selezionato per il salone." },
      { icon: "trophy", title: "Barbecue Expo Awards", body: "I premi che distinguono i migliori marchi del settore." },
      { icon: "building", title: "Area espositori", body: `${CHIFFRES.marques2027} marchi da provare in condizioni reali, con acquisto diretto possibile.` },
    ],
    proEyebrow: "Visitatori professionali",
    proTitle: "L'appuntamento business della cucina all'aperto.",
    proBody:
      "Barbecue Expo riunisce tutti gli attori della filiera: distributori specializzati, catene della GDO e del fai-da-te, reti di garden center, buyer HORECA, prescrittori e marchi. Tre giorni per scoprire le novità, sviluppare la propria offerta e cogliere le tendenze del mercato.",
    proTags: [
      "Distributori specializzati",
      "Catene GDO / fai-da-te",
      "Reti di garden center",
      "Buyer HORECA",
      "Prescrittori & stampa",
      "Marchi internazionali",
    ],
    mediaEyebrow: "Forza mediatica",
    mediaTitle: "Una visibilità su scala europea.",
    mediaBody:
      "Oltre 500 milioni di contatti generati nel 2025. Una community di oltre 132.000 follower, una massiccia campagna di affissioni e una presenza in TV, radio e stampa specializzata.",
    mediaStats: [
      { value: "500 M+", label: "contatti media 2025" },
      { value: "132.000+", label: "community sui social" },
      { value: "17.000", label: "iscritti alla newsletter" },
    ],
    chefsLabel: "Alcuni chef di fama",
    practicalEyebrow: "Informazioni pratiche",
    practicalTitle: "Tutto per preparare la tua visita.",
    days: [
      { day: "Venerdì 12 marzo", hours: "9:30 — 19:00" },
      { day: "Sabato 13 marzo", hours: "9:30 — 19:00" },
      { day: "Domenica 14 marzo", hours: "9:30 — 18:00" },
    ],
    venueLabel: "Luogo",
    venueValue: "Parc Floral de Paris — 26 Route du Champ de Manœuvre, 75012 Parigi",
    accessLabel: "Accesso",
    accessValue: "Metro linea 1 (Château de Vincennes) · 5 min dalla tangenziale · Parcheggio da 500 posti",
    ctaTitle: "Nel 2027, tutte le fiamme portano a Parigi.",
    ctaBody: "Vuoi esporre o diventare partner?",
    ctaPrimary: "Diventa espositore",
    ctaSecondary: "Contattaci",
  },
};

type Lang = keyof typeof C;

const CHEFS = [
  { name: "David W. Olson", followers: "345K", img: "/content/images/pm-david-w-olson.jpg" },
  { name: "The Barbecue Dude", followers: "271K", img: "/content/images/9c60fdfdd8_bbq_dude.jpeg" },
  { name: "Le Barbecue de Rafa", followers: "200K", img: "/content/images/pm-le-barbecue-de-rafa.jpg" },
  { name: "Diva Q", followers: "111K", img: "/content/images/pm-danielle-bennett.jpg" },
];

function zoneIcon(key: string) {
  const p = { className: "w-6 h-6 text-gold-500", strokeWidth: 1.5 };
  switch (key) {
    case "flame": return <Flame {...p} />;
    case "chef": return <ChefHat {...p} />;
    case "grad": return <Users {...p} />;
    case "utensils": return <Utensils {...p} />;
    case "trophy": return <Trophy {...p} />;
    case "building": return <Building2 {...p} />;
    default: return <Flame {...p} />;
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PresentationDeck() {
  const locale = useLocale();
  const pageLang: Lang = locale in C ? (locale as Lang) : "fr";
  // Le sélecteur bascule entre le FR (source) et la langue de la page (EN depuis /fr).
  const altLang: Lang = pageLang === "fr" ? "en" : pageLang;
  const [lang, setLang] = useState<Lang>(pageLang);
  const t = C[lang];

  return (
    <article className="bg-cream-50">
      {/* Language switcher — sticky */}
      <div className="sticky top-0 z-50 flex justify-end px-6 md:px-12 py-3 bg-ink-950/80 backdrop-blur-sm border-b border-cream-50/10">
        <div className="inline-flex items-center rounded-full border border-cream-50/20 overflow-hidden text-xs font-bold uppercase tracking-widest">
          <button
            type="button"
            onClick={() => setLang("fr")}
            className={`px-4 py-1.5 transition-colors ${lang === "fr" ? "bg-gold-500 text-ink-950" : "text-cream-50/70 hover:text-cream-50"}`}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => setLang(altLang)}
            className={`px-4 py-1.5 transition-colors ${lang === altLang ? "bg-gold-500 text-ink-950" : "text-cream-50/70 hover:text-cream-50"}`}
          >
            {altLang.toUpperCase()}
          </button>
        </div>
      </div>

      {/* ── Cover ── */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden bg-ink-950">
        <Image src="/photos-2026/bbq-expo-008.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 pb-16 md:pb-24">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {t.edition}
          </div>
          <h1 className="text-cream-50 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] font-bold max-w-4xl" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {t.coverTitle}
          </h1>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
            <span className="text-cream-50 text-2xl md:text-3xl font-bold tracking-wide uppercase" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
              {t.coverDate}
            </span>
            <span className="text-cream-50/80 text-base md:text-lg uppercase tracking-widest">{t.coverVenue}</span>
          </div>
        </div>
      </section>

      {/* ── What ── */}
      <Section eyebrow={t.whatEyebrow}>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <h2 className="lg:col-span-6 text-ink-900 text-3xl sm:text-4xl md:text-5xl leading-tight font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {t.whatTitle}
          </h2>
          <p className="lg:col-span-6 text-ink-600 text-lg md:text-xl leading-relaxed">{t.whatBody}</p>
        </div>
      </Section>

      {/* ── Figures ── */}
      <section className="bg-ink-950 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Eyebrow light>{t.figuresEyebrow}</Eyebrow>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 mt-10">
            {t.figures.map((f) => (
              <div key={f.label}>
                <div className="text-gold-500 text-4xl sm:text-5xl md:text-6xl font-bold leading-none" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
                  {f.value}
                </div>
                <div className="mt-2 text-cream-50/70 text-sm md:text-base uppercase tracking-widest">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Zones ── */}
      <Section eyebrow={t.zonesEyebrow}>
        <h2 className="text-ink-900 text-3xl sm:text-4xl md:text-5xl leading-tight font-bold mb-12 max-w-3xl" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
          {t.zonesTitle}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.zones.map((z) => (
            <div key={z.title} className="bg-cream-100 border border-ink-900/10 rounded-sm p-7 hover:border-gold-500/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mb-5">{zoneIcon(z.icon)}</div>
              <h3 className="text-ink-900 text-xl font-bold mb-2" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{z.title}</h3>
              <p className="text-ink-600 text-base leading-relaxed">{z.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Pros ── */}
      <section className="relative bg-ink-950 py-16 md:py-24 overflow-hidden">
        <Image src="/photos-2026/william-plin-jpc-120426-533a6497.jpg" alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-ink-950/70" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <Eyebrow light>{t.proEyebrow}</Eyebrow>
          <h2 className="text-cream-50 text-3xl sm:text-4xl md:text-5xl leading-tight font-bold mt-6 mb-6 max-w-3xl" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {t.proTitle}
          </h2>
          <p className="text-cream-50/85 text-lg md:text-xl leading-relaxed max-w-3xl mb-10">{t.proBody}</p>
          <div className="flex flex-wrap gap-3">
            {t.proTags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-2 border border-cream-50/20 rounded-full px-4 py-2 text-cream-50/90 text-sm">
                <Users className="w-4 h-4 text-gold-500" strokeWidth={1.5} />{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media ── */}
      <Section eyebrow={t.mediaEyebrow}>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12">
          <h2 className="lg:col-span-5 text-ink-900 text-3xl sm:text-4xl md:text-5xl leading-tight font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {t.mediaTitle}
          </h2>
          <div className="lg:col-span-7">
            <p className="text-ink-600 text-lg md:text-xl leading-relaxed mb-8">{t.mediaBody}</p>
            <div className="grid grid-cols-3 gap-6">
              {t.mediaStats.map((s) => (
                <div key={s.label}>
                  <div className="text-ink-900 text-2xl md:text-4xl font-bold leading-none" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{s.value}</div>
                  <div className="mt-1 text-ink-500 text-xs md:text-sm uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Chefs */}
        <div className="text-ink-500 text-xs uppercase tracking-widest font-semibold mb-5">{t.chefsLabel}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CHEFS.map((c) => (
            <div key={c.name} className="relative aspect-[4/5] rounded-sm overflow-hidden bg-ink-900">
              <Image src={c.img} alt={c.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 inset-x-0 p-4">
                <div className="text-cream-50 font-bold text-sm md:text-base leading-tight" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{c.name}</div>
                <div className="text-gold-500 text-xs font-semibold">{c.followers}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Practical ── */}
      <section className="bg-cream-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Eyebrow>{t.practicalEyebrow}</Eyebrow>
          <h2 className="text-ink-900 text-3xl sm:text-4xl md:text-5xl leading-tight font-bold mt-6 mb-12" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {t.practicalTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 text-gold-700 text-sm font-semibold uppercase tracking-widest mb-4">
                <Calendar className="w-4 h-4" strokeWidth={2} /> {t.coverDate}
              </div>
              <ul className="space-y-2">
                {t.days.map((d) => (
                  <li key={d.day} className="flex justify-between gap-4 text-ink-700 border-b border-ink-900/10 py-2">
                    <span className="font-medium">{d.day}</span><span className="text-ink-500">{d.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gold-700 text-sm font-semibold uppercase tracking-widest mb-4">
                <MapPin className="w-4 h-4" strokeWidth={2} /> {t.venueLabel}
              </div>
              <p className="text-ink-700 leading-relaxed">{t.venueValue}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gold-700 text-sm font-semibold uppercase tracking-widest mb-4">
                <Tv className="w-4 h-4" strokeWidth={2} /> {t.accessLabel}
              </div>
              <p className="text-ink-700 leading-relaxed">{t.accessValue}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-ink-950 py-20 md:py-28 text-center">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Megaphone className="w-10 h-10 text-gold-500 mx-auto mb-6" strokeWidth={1.5} />
          <h2 className="text-cream-50 text-3xl sm:text-4xl md:text-5xl leading-tight font-bold mb-4" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {t.ctaTitle}
          </h2>
          <p className="text-cream-50/80 text-lg mb-10">{t.ctaBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/presentation-exposants" className="group inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-300 text-ink-950 px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors">
              {t.ctaPrimary}
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
            </a>
            <a href="/infos-pratiques#contact" className="inline-flex items-center justify-center gap-3 border border-cream-50/30 hover:border-gold-500 text-cream-50 hover:text-gold-500 px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors">
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}

/* ---- small helpers ---- */
function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-xs md:text-sm uppercase tracking-widest font-semibold ${light ? "text-gold-500" : "text-ink-900"}`}>
      <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
      {children}
    </div>
  );
}

function Section({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <section className="bg-cream-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10"><Eyebrow>{eyebrow}</Eyebrow></div>
        {children}
      </div>
    </section>
  );
}
