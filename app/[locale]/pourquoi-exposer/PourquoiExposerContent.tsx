"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { CHIFFRES, nombre } from "@/lib/chiffres";
import {
  ArrowUpRight,
  Users,
  Globe,
  Target,
  BarChart3,
  Eye,
  Flame,
  ChefHat,
  Utensils,
  Leaf,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

/* ------------------------------------------------------------------ */
/*  Counter hook                                                       */
/* ------------------------------------------------------------------ */
function useCountUp(target: number, duration = 1800) {
  // Valeur finale par défaut : c'est ce que voient le rendu serveur, les
  // navigateurs sans JavaScript et le mode « mouvement réduit ».
  const [count, setCount] = useState(target);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let first = true;
    const obs = new IntersectionObserver(
      ([entry]) => {
        // Premier relevé : déjà visible au chargement, on garde le chiffre tel
        // quel plutôt que de le faire retomber à 0 sous les yeux du visiteur ;
        // hors écran, on le met à 0 pour le décompte (changement invisible).
        if (first) {
          first = false;
          if (entry.isIntersecting) {
            obs.disconnect();
            return;
          }
          setCount(0);
          return;
        }
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setCount(Math.round(ease * target));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return { count, ref };
}

/* ------------------------------------------------------------------ */
/*  Media logos                                                        */
/* ------------------------------------------------------------------ */
const MEDIA_LOGOS = [
  { file: "601ceb6719_tf1.jpeg", alt: "TF1" },
  { file: "a432333a48_m6.jpeg", alt: "M6" },
  { file: "f56c29df25_tmc.jpeg", alt: "TMC" },
  { file: "36b048c175_bfmtv.jpeg", alt: "BFM TV" },
  { file: "573c7ca1c5_franceinfo.jpeg", alt: "France Info" },
  { file: "a7ee06bae4_franceinter.jpeg", alt: "France Inter" },
  { file: "c96cc6f02f_radiofrance.jpeg", alt: "Radio France" },
  { file: "a0e33f5345_europe2.jpeg", alt: "Europe 2" },
  { file: "8c90408a64_20min.jpeg", alt: "20 Minutes" },
  { file: "e244e9ccbf_habitat.jpeg", alt: "Habitat" },
  { file: "ed8659d918_france1.jpeg", alt: "France TV" },
];

/* ------------------------------------------------------------------ */
/*  Partner brand logos                                                */
/* ------------------------------------------------------------------ */
const BRAND_LOGOS = [
  "7a5907deca_napoleoin.png",
  "0710c00822_campingaz.png",
  "c03ec5ca0a_charbroil.png",
  "8dbe912df5_logo-weber-svg-1.png",
  "25eb4257c0_pitboss.png",
  "9ffc7e2043_kamado-joe.png",
  "d37c7b4e80_grillobois.png",
  "efa4b26c2c_barbecook.png",
  "fd46ad7c34_monolith.png",
  "ce441e7ae5_masterbuilt.png",
  "0ee44fae1e_traeger.png",
  "46a68bad93_ofyr2.png",
  "7a1e7585f5_oklahoma-joe-s.png",
  "0404b28de9_char-griller.png",
  "78c2396828_le-marquier.png",
  "c6aae8d21e_bastard.png",
  "406e7d7fe6_eno.png",
];

/* ------------------------------------------------------------------ */
/*  Icon helper                                                        */
/* ------------------------------------------------------------------ */
function getIcon(name: string, className: string) {
  const props = { className, strokeWidth: 1.5 };
  switch (name) {
    case "target": return <Target {...props} />;
    case "chart": return <BarChart3 {...props} />;
    case "sparkles": return <Sparkles {...props} />;
    case "globe": return <Globe {...props} />;
    case "eye": return <Eye {...props} />;
    case "flame": return <Flame {...props} />;
    case "utensils": return <Utensils {...props} />;
    case "leaf": return <Leaf {...props} />;
    case "chef": return <ChefHat {...props} />;
    case "bag": return <ShoppingBag {...props} />;
    default: return <Sparkles {...props} />;
  }
}

/* ------------------------------------------------------------------ */
/*  Stat counter                                                       */
/* ------------------------------------------------------------------ */
function StatBlock({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  const locale = useLocale();
  return (
    <div ref={ref} className="text-center">
      <div
        className="text-gold-500 text-5xl sm:text-6xl md:text-7xl font-bold leading-none"
        style={{ fontFamily: "SansPlomb-98, sans-serif" }}
      >
        {nombre(count, locale)}
        <span className="text-3xl sm:text-4xl md:text-5xl">{suffix}</span>
      </div>
      <div className="mt-2 text-cream-50/70 text-sm md:text-base uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  i18n content                                                       */
/* ------------------------------------------------------------------ */
const UI = {
  fr: {
    eyebrow: "Pour les marques · Édition 2027",
    heroTitle: { line1: "Pourquoi exposer", line2: "à Barbecue Expo ?" },
    heroSubtitle:
      "Le salon de référence en Europe pour développer vos ventes, votre réseau et votre notoriété.",
    statsEyebrow: "Les chiffres",
    stats: [
      { value: 20000, suffix: " m²", label: "Exposition indoor & outdoor" },
      { value: CHIFFRES.marques2027, suffix: "", label: "Marques internationales en 2027" },
      { value: CHIFFRES.visiteurs2026, suffix: "", label: "Visiteurs en 2026 (dont 5 000 pro)" },
      { value: CHIFFRES.pays2027, suffix: "", label: "Pays représentés en 2027" },
    ],
    benefitsTitle: "En trois jours, accélérez votre croissance.",
    benefits: [
      { icon: "target", title: "Générer des leads qualifiés", desc: "Rencontrez vos futurs clients, prescripteurs et distributeurs lors de rendez-vous B2B pré-qualifiés." },
      { icon: "chart", title: "Vendre plus vite", desc: "Présentez vos nouveautés à un public expert prêt à acheter, tester et référencer." },
      { icon: "sparkles", title: "Lancer vos nouveautés", desc: "Le salon est la scène idéale pour créer l'événement autour de votre innovation." },
      { icon: "globe", title: "Accélérer à l'international", desc: "Acheteurs internationaux, distributeurs européens, HORECA — développez vos exports depuis un seul stand." },
      { icon: "eye", title: "Renforcer votre image de marque", desc: "Visibilité presse, cooking shows sponsorisés, masterclass — positionnez-vous comme leader." },
    ],
    reasonsTitle: "Cinq raisons concrètes d'exposer en 2027.",
    reasons: [
      {
        number: "01",
        title: "Une audience qui n'est pas en balade.",
        body: `${nombre(CHIFFRES.visiteurs2026, "fr")} visiteurs en 2026. Plus de la moitié sont des prescripteurs : journalistes spécialisés, chefs, pitmasters, revendeurs, distributeurs. Vos cibles sont déjà là.`,
        image: "/photos-2026/bbq-expo-184.jpg",
      },
      {
        number: "02",
        title: "Le matchmaking B2B, vraiment.",
        body: "Trois mois avant le salon, vous recevez la liste complète des acheteurs présents : enseignes spécialisées, GMS, e-commerçants, distributeurs européens, HORECA. Vous demandez vos rendez-vous, nous bloquons les créneaux.",
        image: "/photos-2026/william-plin-jpc-120426-533a6497.jpg",
      },
      {
        number: "03",
        title: "L'Europe en trois jours.",
        body: `${CHIFFRES.pays2027} pays représentés en 2027. Le seul endroit en Europe où votre marque peut, depuis un seul stand, parler à un acheteur belge, à un distributeur allemand et à un e-commerçant espagnol.`,
        image: "/photos-2026/bbq-expo-403.jpg",
      },
      {
        number: "04",
        title: "Les Awards 2027 distinguent les meilleurs.",
        body: "Première édition des Barbecue Expo Awards. Or, argent, bronze dans six catégories : Best Innovation, Best BBQ, Best Accessory, Best Food Product, Best Stand Design, Best Live Experience. Une médaille, c'est un argument de vente pendant un an.",
        image: "/photos-2026/bbq-expo-105.jpg",
      },
      {
        number: "05",
        title: "Votre présence presse multipliée.",
        body: "Médias gastronomiques, presse outdoor, podcasts BBQ, blogueurs — cinq communiqués envoyés par mois pendant les six mois précédant le salon. Photos HD de votre stand partagées avec la presse partenaire.",
        image: "/photos-2026/bbq-expo-720.jpg",
      },
    ],
    segmentTitle: "Tous les univers du barbecue.",
    segments: [
      { icon: "flame", title: "Fabricants BBQ", desc: "Barbecues charbon, gaz, pellets, kamados, électriques, hybrides." },
      { icon: "utensils", title: "Accessoires & équipements", desc: "Planches, thermomètres, ustensiles, housses, fumoirs, rotissoires." },
      { icon: "leaf", title: "Combustibles & innovations", desc: "Charbon, briquettes, pellets, allumage, bois de fumage." },
      { icon: "chef", title: "Cuisines d'extérieur", desc: "Îlots, planchas, fours à pizza, braseros, mobilier outdoor." },
      { icon: "bag", title: "Food & ingrédients", desc: "Rubs, sauces, marinades, épices, viandes premium, fumoirs alimentaires." },
      { icon: "sparkles", title: "Nouveaux entrants", desc: "Startups, marques D2C, innovations tech, IoT & smart grilling." },
    ],
    visitorsTitle: "Qui vient au salon ?",
    visitors: [
      "Retailers spécialisés",
      "Acheteurs GSA / GSB / GSS",
      "Distributeurs européens",
      "HORECA & CHR",
      "Prescripteurs & presse",
      "Pitmasters & chefs",
    ],
    b2bTitle: "Plateforme B2B intégrée.",
    b2bFeatures: [
      "Prise de rendez-vous en ligne avant le salon",
      "Profils acheteurs vérifiés et qualifiés",
      "Matchmaking intelligent marque ↔ acheteur",
      "Agenda partagé et rappels automatiques",
      "Suivi post-salon et analytics de contacts",
    ],
    visibilityTitle: "Quatre formats de visibilité.",
    visibilityFormats: [
      { title: "Cooking shows sponsorisés", desc: "Votre marque en scène devant 500 spectateurs par session." },
      { title: "Masterclass & démonstrations", desc: "Positionnez-vous comme expert avec des sessions dédiées." },
      { title: "Visibilité digitale", desc: "Site, newsletters, réseaux sociaux — 200 000 impressions garanties." },
      { title: "Branding zones", desc: "Entrées, allées, zones dégustation — votre marque partout." },
    ],
    mediaTitle: "Ils en ont parlé.",
    brandsTitle: "Ils nous font confiance.",
    brandsCta: "Voir tous les exposants",
    closingQuote:
      "Le bon salon, au bon moment, avec les bonnes personnes. Trois jours, et un an de retour sur investissement.",
    cta: { label: "Demander le dossier exposant", href: "/presentation-exposants" },
    ctaSecondary: { label: "Voir l'espace Pro & B2B", href: "/espace-pro-b2b" },
  },
  en: {
    eyebrow: "For brands · 2027 edition",
    heroTitle: { line1: "Why exhibit", line2: "at Barbecue Expo?" },
    heroSubtitle:
      "Europe's leading trade show to grow your sales, network and brand awareness.",
    statsEyebrow: "Key figures",
    stats: [
      { value: 20000, suffix: " m²", label: "Indoor & outdoor exhibition" },
      { value: CHIFFRES.marques2027, suffix: "", label: "International brands in 2027" },
      { value: CHIFFRES.visiteurs2026, suffix: "", label: "Visitors in 2026 (incl. 5,000 trade)" },
      { value: CHIFFRES.pays2027, suffix: "", label: "Countries represented in 2027" },
    ],
    benefitsTitle: "In three days, accelerate your growth.",
    benefits: [
      { icon: "target", title: "Generate qualified leads", desc: "Meet future clients, specifiers and distributors via pre-qualified B2B meetings." },
      { icon: "chart", title: "Sell faster", desc: "Present your new products to an expert audience ready to buy, test and stock." },
      { icon: "sparkles", title: "Launch your innovations", desc: "The show is the ideal stage to create buzz around your latest product." },
      { icon: "globe", title: "Accelerate internationally", desc: "International buyers, European distributors, HORECA — grow your exports from a single booth." },
      { icon: "eye", title: "Strengthen your brand", desc: "Press visibility, sponsored cooking shows, masterclass — position yourself as a leader." },
    ],
    reasonsTitle: "Five concrete reasons to exhibit in 2027.",
    reasons: [
      { number: "01", title: "An audience that isn't strolling.", body: `${nombre(CHIFFRES.visiteurs2026, "en")} visitors in 2026. Over half are specifiers: specialist journalists, chefs, pitmasters, resellers, distributors. Your targets are already there.`, image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "B2B matchmaking, for real.", body: "Three months before the show, you receive the complete list of attending buyers: specialty chains, mass retailers, e-commerce, European distributors, HORECA. You request meetings, we lock the slots.", image: "/photos-2026/william-plin-jpc-120426-533a6497.jpg" },
      { number: "03", title: "Europe in three days.", body: `${CHIFFRES.pays2027} countries represented in 2027. The only place in Europe where your brand can, from a single booth, talk to a Belgian buyer, German distributor, and Spanish e-retailer.`, image: "/photos-2026/bbq-expo-403.jpg" },
      { number: "04", title: "The 2027 Awards distinguish the best.", body: "First edition of the Barbecue Expo Awards. Gold, silver, bronze in six categories: Best Innovation, Best BBQ, Best Accessory, Best Food Product, Best Stand Design, Best Live Experience. A medal is a selling argument for a full year.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "05", title: "Your press presence multiplied.", body: "Food media, outdoor press, BBQ podcasts, bloggers — five releases per month during the six months before the show. HD photos of your booth shared with press partners.", image: "/photos-2026/bbq-expo-720.jpg" },
    ],
    segmentTitle: "Every BBQ universe.",
    segments: [
      { icon: "flame", title: "BBQ Manufacturers", desc: "Charcoal, gas, pellet, kamado, electric, hybrid barbecues." },
      { icon: "utensils", title: "Accessories & equipment", desc: "Planks, thermometers, tools, covers, smokers, rotisseries." },
      { icon: "leaf", title: "Fuels & innovations", desc: "Charcoal, briquettes, pellets, firestarters, smoking wood." },
      { icon: "chef", title: "Outdoor kitchens", desc: "Islands, planchas, pizza ovens, fire pits, outdoor furniture." },
      { icon: "bag", title: "Food & ingredients", desc: "Rubs, sauces, marinades, spices, premium meats, food smokers." },
      { icon: "sparkles", title: "New entrants", desc: "Startups, D2C brands, tech innovations, IoT & smart grilling." },
    ],
    visitorsTitle: "Who visits the show?",
    visitors: [
      "Specialist retailers",
      "GSA / GSB / GSS buyers",
      "European distributors",
      "HORECA & CHR",
      "Specifiers & press",
      "Pitmasters & chefs",
    ],
    b2bTitle: "Integrated B2B platform.",
    b2bFeatures: [
      "Online meeting scheduling before the show",
      "Verified and qualified buyer profiles",
      "Smart brand ↔ buyer matchmaking",
      "Shared agenda and automatic reminders",
      "Post-show follow-up and contact analytics",
    ],
    visibilityTitle: "Four visibility formats.",
    visibilityFormats: [
      { title: "Sponsored cooking shows", desc: "Your brand on stage in front of 500 spectators per session." },
      { title: "Masterclass & demos", desc: "Position yourself as an expert with dedicated sessions." },
      { title: "Digital visibility", desc: "Website, newsletters, social media — 200,000 guaranteed impressions." },
      { title: "Branding zones", desc: "Entrances, aisles, tasting areas — your brand everywhere." },
    ],
    mediaTitle: "Featured in.",
    brandsTitle: "They trust us.",
    brandsCta: "See all exhibitors",
    closingQuote: "The right show, at the right time, with the right people. Three days, one full year of ROI.",
    cta: { label: "Request the exhibitor kit", href: "/presentation-exposants" },
    ctaSecondary: { label: "See Pro & B2B area", href: "/espace-pro-b2b" },
  },
  es: {
    eyebrow: "Para las marcas · Edición 2027",
    heroTitle: { line1: "¿Por qué exponer", line2: "en Barbecue Expo?" },
    heroSubtitle:
      "La feria de referencia en Europa para impulsar sus ventas, su red de contactos y su notoriedad.",
    statsEyebrow: "Las cifras",
    stats: [
      { value: 20000, suffix: " m²", label: "Exposición interior y exterior" },
      { value: CHIFFRES.marques2027, suffix: "", label: "Marcas internacionales en 2027" },
      { value: CHIFFRES.visiteurs2026, suffix: "", label: "Visitantes en 2026 (5.000 profesionales)" },
      { value: CHIFFRES.pays2027, suffix: "", label: "Países representados en 2027" },
    ],
    benefitsTitle: "En tres días, acelere su crecimiento.",
    benefits: [
      { icon: "target", title: "Generar leads cualificados", desc: "Conozca a sus futuros clientes, prescriptores y distribuidores en citas B2B precualificadas." },
      { icon: "chart", title: "Vender más rápido", desc: "Presente sus novedades a un público experto listo para comprar, probar y referenciar." },
      { icon: "sparkles", title: "Lanzar sus novedades", desc: "La feria es el escenario ideal para convertir su innovación en un acontecimiento." },
      { icon: "globe", title: "Acelerar a nivel internacional", desc: "Compradores internacionales, distribuidores europeos, HORECA: desarrolle sus exportaciones desde un solo stand." },
      { icon: "eye", title: "Reforzar su imagen de marca", desc: "Visibilidad en prensa, cooking shows patrocinados, masterclasses: posiciónese como líder." },
    ],
    reasonsTitle: "Cinco razones concretas para exponer en 2027.",
    reasons: [
      { number: "01", title: "Un público que no viene de paseo.", body: `${nombre(CHIFFRES.visiteurs2026, "es")} visitantes en 2026. Más de la mitad son prescriptores: periodistas especializados, chefs, pitmasters, revendedores, distribuidores. Sus objetivos ya están aquí.`, image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "Matchmaking B2B, de verdad.", body: "Tres meses antes de la feria, recibe la lista completa de los compradores asistentes: cadenas especializadas, gran distribución, e-commerce, distribuidores europeos, HORECA. Usted solicita sus citas, nosotros reservamos los horarios.", image: "/photos-2026/william-plin-jpc-120426-533a6497.jpg" },
      { number: "03", title: "Europa en tres días.", body: `${CHIFFRES.pays2027} países representados en 2027. El único lugar de Europa donde su marca puede, desde un solo stand, hablar con un comprador belga, un distribuidor alemán y un e-commerce español.`, image: "/photos-2026/bbq-expo-403.jpg" },
      { number: "04", title: "Los Awards 2027 premian a los mejores.", body: "Primera edición de los Barbecue Expo Awards. Oro, plata y bronce en seis categorías: Best Innovation, Best BBQ, Best Accessory, Best Food Product, Best Stand Design, Best Live Experience. Una medalla es un argumento de venta durante todo un año.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "05", title: "Su presencia en prensa, multiplicada.", body: "Medios gastronómicos, prensa outdoor, pódcasts de BBQ, blogueros: cinco comunicados enviados al mes durante los seis meses previos a la feria. Fotos HD de su stand compartidas con la prensa asociada.", image: "/photos-2026/bbq-expo-720.jpg" },
    ],
    segmentTitle: "Todos los universos de la barbacoa.",
    segments: [
      { icon: "flame", title: "Fabricantes de barbacoas", desc: "Barbacoas de carbón, gas, pellets, kamados, eléctricas, híbridas." },
      { icon: "utensils", title: "Accesorios y equipamiento", desc: "Tablas, termómetros, utensilios, fundas, ahumadores, asadores giratorios." },
      { icon: "leaf", title: "Combustibles e innovaciones", desc: "Carbón, briquetas, pellets, encendido, madera para ahumar." },
      { icon: "chef", title: "Cocinas de exterior", desc: "Islas, planchas, hornos de pizza, braseros, mobiliario de exterior." },
      { icon: "bag", title: "Alimentación e ingredientes", desc: "Rubs, salsas, marinadas, especias, carnes premium, ahumados." },
      { icon: "sparkles", title: "Nuevos actores", desc: "Startups, marcas D2C, innovaciones tecnológicas, IoT y smart grilling." },
    ],
    visitorsTitle: "¿Quién visita la feria?",
    visitors: [
      "Minoristas especializados",
      "Compradores de gran distribución",
      "Distribuidores europeos",
      "HORECA",
      "Prescriptores y prensa",
      "Pitmasters y chefs",
    ],
    b2bTitle: "Plataforma B2B integrada.",
    b2bFeatures: [
      "Reserva de citas en línea antes de la feria",
      "Perfiles de compradores verificados y cualificados",
      "Matchmaking inteligente marca ↔ comprador",
      "Agenda compartida y recordatorios automáticos",
      "Seguimiento posferia y analítica de contactos",
    ],
    visibilityTitle: "Cuatro formatos de visibilidad.",
    visibilityFormats: [
      { title: "Cooking shows patrocinados", desc: "Su marca en escena ante 500 espectadores por sesión." },
      { title: "Masterclasses y demostraciones", desc: "Posiciónese como experto con sesiones dedicadas." },
      { title: "Visibilidad digital", desc: "Web, newsletters, redes sociales: 200.000 impresiones garantizadas." },
      { title: "Zonas de branding", desc: "Entradas, pasillos, zonas de degustación: su marca en todas partes." },
    ],
    mediaTitle: "Han hablado de nosotros.",
    brandsTitle: "Confían en nosotros.",
    brandsCta: "Ver todos los expositores",
    closingQuote: "La feria adecuada, en el momento adecuado, con las personas adecuadas. Tres días y un año de retorno de la inversión.",
    cta: { label: "Solicitar el dossier de expositor", href: "/presentation-exposants" },
    ctaSecondary: { label: "Ver el espacio Pro y B2B", href: "/espace-pro-b2b" },
  },
  de: {
    eyebrow: "Für Marken · Ausgabe 2027",
    heroTitle: { line1: "Warum auf der", line2: "Barbecue Expo ausstellen?" },
    heroSubtitle:
      "Die führende Fachmesse Europas, um Ihren Umsatz, Ihr Netzwerk und Ihre Bekanntheit zu steigern.",
    statsEyebrow: "Die Zahlen",
    stats: [
      { value: 20000, suffix: " m²", label: "Ausstellungsfläche innen & außen" },
      { value: CHIFFRES.marques2027, suffix: "", label: "Internationale Marken 2027" },
      { value: CHIFFRES.visiteurs2026, suffix: "", label: "Besucher 2026 (davon 5.000 Fachbesucher)" },
      { value: CHIFFRES.pays2027, suffix: "", label: "Vertretene Länder 2027" },
    ],
    benefitsTitle: "In drei Tagen Ihr Wachstum beschleunigen.",
    benefits: [
      { icon: "target", title: "Qualifizierte Leads generieren", desc: "Treffen Sie künftige Kunden, Multiplikatoren und Händler in vorqualifizierten B2B-Terminen." },
      { icon: "chart", title: "Schneller verkaufen", desc: "Präsentieren Sie Ihre Neuheiten einem Fachpublikum, das bereit ist zu kaufen, zu testen und zu listen." },
      { icon: "sparkles", title: "Neuheiten lancieren", desc: "Die Messe ist die ideale Bühne, um Ihre Innovation zum Ereignis zu machen." },
      { icon: "globe", title: "International wachsen", desc: "Internationale Einkäufer, europäische Händler, HORECA – bauen Sie Ihren Export von einem einzigen Stand aus." },
      { icon: "eye", title: "Ihr Markenimage stärken", desc: "Pressepräsenz, gesponserte Cooking Shows, Masterclasses – positionieren Sie sich als Marktführer." },
    ],
    reasonsTitle: "Fünf konkrete Gründe, 2027 auszustellen.",
    reasons: [
      { number: "01", title: "Ein Publikum, das nicht nur bummelt.", body: `${nombre(CHIFFRES.visiteurs2026, "de")} Besucher im Jahr 2026. Mehr als die Hälfte sind Multiplikatoren: Fachjournalisten, Köche, Pitmasters, Wiederverkäufer, Händler. Ihre Zielgruppen sind bereits da.`, image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "B2B-Matchmaking, wirklich.", body: "Drei Monate vor der Messe erhalten Sie die vollständige Liste der anwesenden Einkäufer: Fachhandelsketten, Lebensmittelhandel, Onlinehändler, europäische Händler, HORECA. Sie fragen Ihre Termine an, wir reservieren die Zeitfenster.", image: "/photos-2026/william-plin-jpc-120426-533a6497.jpg" },
      { number: "03", title: "Europa in drei Tagen.", body: `${CHIFFRES.pays2027} vertretene Länder im Jahr 2027. Der einzige Ort in Europa, an dem Ihre Marke von einem einzigen Stand aus mit einem belgischen Einkäufer, einem deutschen Händler und einem spanischen Onlinehändler sprechen kann.`, image: "/photos-2026/bbq-expo-403.jpg" },
      { number: "04", title: "Die Awards 2027 zeichnen die Besten aus.", body: "Erste Ausgabe der Barbecue Expo Awards. Gold, Silber und Bronze in sechs Kategorien: Best Innovation, Best BBQ, Best Accessory, Best Food Product, Best Stand Design, Best Live Experience. Eine Medaille ist ein Verkaufsargument für ein ganzes Jahr.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "05", title: "Ihre Pressepräsenz vervielfacht.", body: "Gastronomiemedien, Outdoor-Presse, BBQ-Podcasts, Blogger – fünf Pressemitteilungen pro Monat in den sechs Monaten vor der Messe. HD-Fotos Ihres Stands werden mit der Partnerpresse geteilt.", image: "/photos-2026/bbq-expo-720.jpg" },
    ],
    segmentTitle: "Alle Welten des Grillens.",
    segments: [
      { icon: "flame", title: "Grillhersteller", desc: "Holzkohle-, Gas-, Pellet-, Kamado-, Elektro- und Hybridgrills." },
      { icon: "utensils", title: "Zubehör & Ausstattung", desc: "Grillbretter, Thermometer, Grillbesteck, Abdeckhauben, Smoker, Drehspieße." },
      { icon: "leaf", title: "Brennstoffe & Innovationen", desc: "Holzkohle, Briketts, Pellets, Anzünder, Räucherholz." },
      { icon: "chef", title: "Outdoor-Küchen", desc: "Kochinseln, Planchas, Pizzaöfen, Feuerschalen, Outdoor-Möbel." },
      { icon: "bag", title: "Food & Zutaten", desc: "Rubs, Saucen, Marinaden, Gewürze, Premiumfleisch, Räucherwaren." },
      { icon: "sparkles", title: "Neue Player", desc: "Start-ups, D2C-Marken, technische Innovationen, IoT & Smart Grilling." },
    ],
    visitorsTitle: "Wer besucht die Messe?",
    visitors: [
      "Fachhändler",
      "Einkäufer aus Groß- und Fachmärkten",
      "Europäische Händler",
      "HORECA",
      "Multiplikatoren & Presse",
      "Pitmasters & Köche",
    ],
    b2bTitle: "Integrierte B2B-Plattform.",
    b2bFeatures: [
      "Online-Terminbuchung vor der Messe",
      "Verifizierte und qualifizierte Einkäuferprofile",
      "Intelligentes Matchmaking Marke ↔ Einkäufer",
      "Gemeinsamer Kalender und automatische Erinnerungen",
      "Nachbereitung nach der Messe und Kontaktanalysen",
    ],
    visibilityTitle: "Vier Sichtbarkeitsformate.",
    visibilityFormats: [
      { title: "Gesponserte Cooking Shows", desc: "Ihre Marke auf der Bühne vor 500 Zuschauern pro Session." },
      { title: "Masterclasses & Vorführungen", desc: "Positionieren Sie sich mit eigenen Sessions als Experte." },
      { title: "Digitale Sichtbarkeit", desc: "Website, Newsletter, soziale Netzwerke – 200.000 garantierte Impressionen." },
      { title: "Branding-Zonen", desc: "Eingänge, Gänge, Verkostungsbereiche – Ihre Marke überall." },
    ],
    mediaTitle: "Sie haben über uns berichtet.",
    brandsTitle: "Sie vertrauen uns.",
    brandsCta: "Alle Aussteller ansehen",
    closingQuote: "Die richtige Messe, zur richtigen Zeit, mit den richtigen Menschen. Drei Tage – und ein Jahr Return on Investment.",
    cta: { label: "Ausstellerunterlagen anfordern", href: "/presentation-exposants" },
    ctaSecondary: { label: "Zum Pro- & B2B-Bereich", href: "/espace-pro-b2b" },
  },
  nl: {
    eyebrow: "Voor merken · Editie 2027",
    heroTitle: { line1: "Waarom exposeren", line2: "op Barbecue Expo?" },
    heroSubtitle:
      "Dé toonaangevende beurs in Europa om uw verkoop, netwerk en naamsbekendheid te laten groeien.",
    statsEyebrow: "De cijfers",
    stats: [
      { value: 20000, suffix: " m²", label: "Expositie binnen & buiten" },
      { value: CHIFFRES.marques2027, suffix: "", label: "Internationale merken in 2027" },
      { value: CHIFFRES.visiteurs2026, suffix: "", label: "Bezoekers in 2026 (waarvan 5.000 vakbezoekers)" },
      { value: CHIFFRES.pays2027, suffix: "", label: "Vertegenwoordigde landen in 2027" },
    ],
    benefitsTitle: "Versnel uw groei in drie dagen.",
    benefits: [
      { icon: "target", title: "Gekwalificeerde leads genereren", desc: "Ontmoet uw toekomstige klanten, voorschrijvers en distributeurs tijdens voorgekwalificeerde B2B-afspraken." },
      { icon: "chart", title: "Sneller verkopen", desc: "Presenteer uw nieuwigheden aan een deskundig publiek dat klaar is om te kopen, te testen en op te nemen in het assortiment." },
      { icon: "sparkles", title: "Uw nieuwigheden lanceren", desc: "De beurs is het ideale podium om van uw innovatie een evenement te maken." },
      { icon: "globe", title: "Internationaal versnellen", desc: "Internationale inkopers, Europese distributeurs, HORECA — ontwikkel uw export vanaf één stand." },
      { icon: "eye", title: "Uw merkimago versterken", desc: "Persaandacht, gesponsorde cooking shows, masterclasses — positioneer u als marktleider." },
    ],
    reasonsTitle: "Vijf concrete redenen om in 2027 te exposeren.",
    reasons: [
      { number: "01", title: "Een publiek dat niet zomaar rondslentert.", body: `${nombre(CHIFFRES.visiteurs2026, "nl")} bezoekers in 2026. Meer dan de helft zijn voorschrijvers: vakjournalisten, chefs, pitmasters, wederverkopers, distributeurs. Uw doelgroepen zijn er al.`, image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "B2B-matchmaking, echt.", body: "Drie maanden voor de beurs ontvangt u de volledige lijst van aanwezige inkopers: speciaalzaakketens, supermarkten, webwinkels, Europese distributeurs, HORECA. U vraagt uw afspraken aan, wij reserveren de tijdslots.", image: "/photos-2026/william-plin-jpc-120426-533a6497.jpg" },
      { number: "03", title: "Europa in drie dagen.", body: `${CHIFFRES.pays2027} vertegenwoordigde landen in 2027. De enige plek in Europa waar uw merk vanaf één stand kan praten met een Belgische inkoper, een Duitse distributeur en een Spaanse webwinkel.`, image: "/photos-2026/bbq-expo-403.jpg" },
      { number: "04", title: "De Awards 2027 belonen de besten.", body: "Eerste editie van de Barbecue Expo Awards. Goud, zilver en brons in zes categorieën: Best Innovation, Best BBQ, Best Accessory, Best Food Product, Best Stand Design, Best Live Experience. Een medaille is een jaar lang een verkoopargument.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "05", title: "Uw persaanwezigheid vermenigvuldigd.", body: "Culinaire media, outdoorpers, BBQ-podcasts, bloggers — vijf persberichten per maand gedurende de zes maanden voor de beurs. HD-foto's van uw stand gedeeld met de partnerpers.", image: "/photos-2026/bbq-expo-720.jpg" },
    ],
    segmentTitle: "Alle werelden van de barbecue.",
    segments: [
      { icon: "flame", title: "Barbecuefabrikanten", desc: "Houtskool-, gas-, pellet-, kamado-, elektrische en hybride barbecues." },
      { icon: "utensils", title: "Accessoires & uitrusting", desc: "Planken, thermometers, gereedschap, hoezen, smokers, rotisserieën." },
      { icon: "leaf", title: "Brandstoffen & innovaties", desc: "Houtskool, briketten, pellets, aanmaakproducten, rookhout." },
      { icon: "chef", title: "Buitenkeukens", desc: "Kookeilanden, plancha's, pizzaovens, vuurschalen, buitenmeubilair." },
      { icon: "bag", title: "Food & ingrediënten", desc: "Rubs, sauzen, marinades, kruiden, premium vlees, gerookte producten." },
      { icon: "sparkles", title: "Nieuwkomers", desc: "Start-ups, D2C-merken, tech-innovaties, IoT & smart grilling." },
    ],
    visitorsTitle: "Wie bezoekt de beurs?",
    visitors: [
      "Gespecialiseerde retailers",
      "Inkopers van supermarkten en bouwmarkten",
      "Europese distributeurs",
      "HORECA",
      "Voorschrijvers & pers",
      "Pitmasters & chefs",
    ],
    b2bTitle: "Geïntegreerd B2B-platform.",
    b2bFeatures: [
      "Online afspraken maken vóór de beurs",
      "Geverifieerde en gekwalificeerde inkopersprofielen",
      "Slimme matchmaking merk ↔ inkoper",
      "Gedeelde agenda en automatische herinneringen",
      "Opvolging na de beurs en contactanalyses",
    ],
    visibilityTitle: "Vier zichtbaarheidsformats.",
    visibilityFormats: [
      { title: "Gesponsorde cooking shows", desc: "Uw merk op het podium voor 500 toeschouwers per sessie." },
      { title: "Masterclasses & demonstraties", desc: "Positioneer u als expert met eigen sessies." },
      { title: "Digitale zichtbaarheid", desc: "Website, nieuwsbrieven, sociale media — 200.000 gegarandeerde impressies." },
      { title: "Brandingzones", desc: "Ingangen, gangpaden, proeverijzones — uw merk overal." },
    ],
    mediaTitle: "Zij schreven over ons.",
    brandsTitle: "Zij vertrouwen ons.",
    brandsCta: "Alle exposanten bekijken",
    closingQuote: "De juiste beurs, op het juiste moment, met de juiste mensen. Drie dagen, en een jaar rendement op uw investering.",
    cta: { label: "Exposantendossier aanvragen", href: "/presentation-exposants" },
    ctaSecondary: { label: "Naar de Pro- & B2B-ruimte", href: "/espace-pro-b2b" },
  },
  pt: {
    eyebrow: "Para as marcas · Edição 2027",
    heroTitle: { line1: "Porquê expor", line2: "na Barbecue Expo?" },
    heroSubtitle:
      "A feira de referência na Europa para desenvolver as suas vendas, a sua rede e a sua notoriedade.",
    statsEyebrow: "Os números",
    stats: [
      { value: 20000, suffix: " m²", label: "Exposição interior e exterior" },
      { value: CHIFFRES.marques2027, suffix: "", label: "Marcas internacionais em 2027" },
      { value: CHIFFRES.visiteurs2026, suffix: "", label: "Visitantes em 2026 (dos quais 5.000 profissionais)" },
      { value: CHIFFRES.pays2027, suffix: "", label: "Países representados em 2027" },
    ],
    benefitsTitle: "Em três dias, acelere o seu crescimento.",
    benefits: [
      { icon: "target", title: "Gerar leads qualificados", desc: "Conheça os seus futuros clientes, prescritores e distribuidores em reuniões B2B pré-qualificadas." },
      { icon: "chart", title: "Vender mais depressa", desc: "Apresente as suas novidades a um público especializado pronto para comprar, testar e referenciar." },
      { icon: "sparkles", title: "Lançar as suas novidades", desc: "A feira é o palco ideal para transformar a sua inovação num acontecimento." },
      { icon: "globe", title: "Acelerar a nível internacional", desc: "Compradores internacionais, distribuidores europeus, HORECA — desenvolva as suas exportações a partir de um único stand." },
      { icon: "eye", title: "Reforçar a sua imagem de marca", desc: "Visibilidade na imprensa, cooking shows patrocinados, masterclasses — posicione-se como líder." },
    ],
    reasonsTitle: "Cinco razões concretas para expor em 2027.",
    reasons: [
      { number: "01", title: "Um público que não está a passear.", body: `${nombre(CHIFFRES.visiteurs2026, "pt")} visitantes em 2026. Mais de metade são prescritores: jornalistas especializados, chefs, pitmasters, revendedores, distribuidores. Os seus alvos já estão lá.`, image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "Matchmaking B2B, a sério.", body: "Três meses antes da feira, recebe a lista completa dos compradores presentes: cadeias especializadas, grande distribuição, e-commerce, distribuidores europeus, HORECA. Pede as suas reuniões, nós reservamos os horários.", image: "/photos-2026/william-plin-jpc-120426-533a6497.jpg" },
      { number: "03", title: "A Europa em três dias.", body: `${CHIFFRES.pays2027} países representados em 2027. O único lugar na Europa onde a sua marca pode, a partir de um único stand, falar com um comprador belga, um distribuidor alemão e um e-commerce espanhol.`, image: "/photos-2026/bbq-expo-403.jpg" },
      { number: "04", title: "Os Awards 2027 distinguem os melhores.", body: "Primeira edição dos Barbecue Expo Awards. Ouro, prata e bronze em seis categorias: Best Innovation, Best BBQ, Best Accessory, Best Food Product, Best Stand Design, Best Live Experience. Uma medalha é um argumento de venda durante um ano inteiro.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "05", title: "A sua presença na imprensa multiplicada.", body: "Media gastronómicos, imprensa outdoor, podcasts de BBQ, bloggers — cinco comunicados enviados por mês durante os seis meses que antecedem a feira. Fotos HD do seu stand partilhadas com a imprensa parceira.", image: "/photos-2026/bbq-expo-720.jpg" },
    ],
    segmentTitle: "Todos os universos do churrasco.",
    segments: [
      { icon: "flame", title: "Fabricantes de grelhadores", desc: "Grelhadores a carvão, gás, pellets, kamados, elétricos, híbridos." },
      { icon: "utensils", title: "Acessórios e equipamentos", desc: "Tábuas, termómetros, utensílios, capas, fumadores, espetos rotativos." },
      { icon: "leaf", title: "Combustíveis e inovações", desc: "Carvão, briquetes, pellets, acendalhas, madeira para fumar." },
      { icon: "chef", title: "Cozinhas de exterior", desc: "Ilhas, planchas, fornos de pizza, braseiros, mobiliário de exterior." },
      { icon: "bag", title: "Alimentação e ingredientes", desc: "Rubs, molhos, marinadas, especiarias, carnes premium, fumados." },
      { icon: "sparkles", title: "Novos intervenientes", desc: "Startups, marcas D2C, inovações tecnológicas, IoT e smart grilling." },
    ],
    visitorsTitle: "Quem visita a feira?",
    visitors: [
      "Retalhistas especializados",
      "Compradores da grande distribuição",
      "Distribuidores europeus",
      "HORECA",
      "Prescritores e imprensa",
      "Pitmasters e chefs",
    ],
    b2bTitle: "Plataforma B2B integrada.",
    b2bFeatures: [
      "Marcação de reuniões online antes da feira",
      "Perfis de compradores verificados e qualificados",
      "Matchmaking inteligente marca ↔ comprador",
      "Agenda partilhada e lembretes automáticos",
      "Acompanhamento pós-feira e análise de contactos",
    ],
    visibilityTitle: "Quatro formatos de visibilidade.",
    visibilityFormats: [
      { title: "Cooking shows patrocinados", desc: "A sua marca em palco perante 500 espectadores por sessão." },
      { title: "Masterclasses e demonstrações", desc: "Posicione-se como especialista com sessões dedicadas." },
      { title: "Visibilidade digital", desc: "Site, newsletters, redes sociais — 200.000 impressões garantidas." },
      { title: "Zonas de branding", desc: "Entradas, corredores, zonas de degustação — a sua marca em todo o lado." },
    ],
    mediaTitle: "Falaram de nós.",
    brandsTitle: "Confiam em nós.",
    brandsCta: "Ver todos os expositores",
    closingQuote: "A feira certa, no momento certo, com as pessoas certas. Três dias, e um ano de retorno do investimento.",
    cta: { label: "Pedir o dossier de expositor", href: "/presentation-exposants" },
    ctaSecondary: { label: "Ver o espaço Pro e B2B", href: "/espace-pro-b2b" },
  },
  it: {
    eyebrow: "Per i brand · Edizione 2027",
    heroTitle: { line1: "Perché esporre", line2: "a Barbecue Expo?" },
    heroSubtitle:
      "La fiera di riferimento in Europa per sviluppare le vostre vendite, la vostra rete e la vostra notorietà.",
    statsEyebrow: "I numeri",
    stats: [
      { value: 20000, suffix: " m²", label: "Esposizione indoor e outdoor" },
      { value: CHIFFRES.marques2027, suffix: "", label: "Brand internazionali nel 2027" },
      { value: CHIFFRES.visiteurs2026, suffix: "", label: "Visitatori nel 2026 (di cui 5.000 professionisti)" },
      { value: CHIFFRES.pays2027, suffix: "", label: "Paesi rappresentati nel 2027" },
    ],
    benefitsTitle: "In tre giorni, accelerate la vostra crescita.",
    benefits: [
      { icon: "target", title: "Generare lead qualificati", desc: "Incontrate futuri clienti, prescrittori e distributori in appuntamenti B2B prequalificati." },
      { icon: "chart", title: "Vendere più velocemente", desc: "Presentate le vostre novità a un pubblico esperto pronto ad acquistare, testare e inserire a listino." },
      { icon: "sparkles", title: "Lanciare le vostre novità", desc: "La fiera è il palcoscenico ideale per trasformare la vostra innovazione in un evento." },
      { icon: "globe", title: "Accelerare a livello internazionale", desc: "Buyer internazionali, distributori europei, HORECA: sviluppate l'export da un unico stand." },
      { icon: "eye", title: "Rafforzare la vostra immagine di marca", desc: "Visibilità sulla stampa, cooking show sponsorizzati, masterclass: posizionatevi come leader." },
    ],
    reasonsTitle: "Cinque ragioni concrete per esporre nel 2027.",
    reasons: [
      { number: "01", title: "Un pubblico che non è lì per passeggiare.", body: `${nombre(CHIFFRES.visiteurs2026, "it")} visitatori nel 2026. Più della metà sono prescrittori: giornalisti specializzati, chef, pitmaster, rivenditori, distributori. I vostri target sono già lì.`, image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "Matchmaking B2B, davvero.", body: "Tre mesi prima della fiera ricevete l'elenco completo dei buyer presenti: catene specializzate, grande distribuzione, e-commerce, distributori europei, HORECA. Voi richiedete gli appuntamenti, noi blocchiamo gli slot.", image: "/photos-2026/william-plin-jpc-120426-533a6497.jpg" },
      { number: "03", title: "L'Europa in tre giorni.", body: `${CHIFFRES.pays2027} Paesi rappresentati nel 2027. L'unico luogo in Europa dove il vostro brand può, da un unico stand, parlare con un buyer belga, un distributore tedesco e un e-commerce spagnolo.`, image: "/photos-2026/bbq-expo-403.jpg" },
      { number: "04", title: "Gli Awards 2027 premiano i migliori.", body: "Prima edizione dei Barbecue Expo Awards. Oro, argento e bronzo in sei categorie: Best Innovation, Best BBQ, Best Accessory, Best Food Product, Best Stand Design, Best Live Experience. Una medaglia è un argomento di vendita per un anno intero.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "05", title: "La vostra presenza sulla stampa, moltiplicata.", body: "Media gastronomici, stampa outdoor, podcast BBQ, blogger: cinque comunicati inviati al mese nei sei mesi che precedono la fiera. Foto HD del vostro stand condivise con la stampa partner.", image: "/photos-2026/bbq-expo-720.jpg" },
    ],
    segmentTitle: "Tutti gli universi del barbecue.",
    segments: [
      { icon: "flame", title: "Produttori di barbecue", desc: "Barbecue a carbone, gas, pellet, kamado, elettrici, ibridi." },
      { icon: "utensils", title: "Accessori e attrezzature", desc: "Taglieri, termometri, utensili, coperture, affumicatori, girarrosti." },
      { icon: "leaf", title: "Combustibili e innovazioni", desc: "Carbone, bricchetti, pellet, accensione, legno per affumicatura." },
      { icon: "chef", title: "Cucine da esterno", desc: "Isole, plancha, forni per pizza, bracieri, arredo outdoor." },
      { icon: "bag", title: "Food e ingredienti", desc: "Rub, salse, marinate, spezie, carni premium, prodotti affumicati." },
      { icon: "sparkles", title: "Nuovi player", desc: "Startup, brand D2C, innovazioni tecnologiche, IoT e smart grilling." },
    ],
    visitorsTitle: "Chi visita la fiera?",
    visitors: [
      "Rivenditori specializzati",
      "Buyer della grande distribuzione",
      "Distributori europei",
      "HORECA",
      "Prescrittori e stampa",
      "Pitmaster e chef",
    ],
    b2bTitle: "Piattaforma B2B integrata.",
    b2bFeatures: [
      "Prenotazione degli appuntamenti online prima della fiera",
      "Profili buyer verificati e qualificati",
      "Matchmaking intelligente brand ↔ buyer",
      "Agenda condivisa e promemoria automatici",
      "Follow-up post-fiera e analisi dei contatti",
    ],
    visibilityTitle: "Quattro formati di visibilità.",
    visibilityFormats: [
      { title: "Cooking show sponsorizzati", desc: "Il vostro brand sul palco davanti a 500 spettatori per sessione." },
      { title: "Masterclass e dimostrazioni", desc: "Posizionatevi come esperti con sessioni dedicate." },
      { title: "Visibilità digitale", desc: "Sito, newsletter, social network: 200.000 impression garantite." },
      { title: "Zone di branding", desc: "Ingressi, corridoi, aree degustazione: il vostro brand ovunque." },
    ],
    mediaTitle: "Hanno parlato di noi.",
    brandsTitle: "Si fidano di noi.",
    brandsCta: "Vedi tutti gli espositori",
    closingQuote: "La fiera giusta, al momento giusto, con le persone giuste. Tre giorni, e un anno di ritorno sull'investimento.",
    cta: { label: "Richiedi il dossier espositore", href: "/presentation-exposants" },
    ctaSecondary: { label: "Vedi l'area Pro e B2B", href: "/espace-pro-b2b" },
  },
};

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function PourquoiExposerContent({ locale }: { locale: string }) {
  const ui = (UI as Record<string, typeof UI.fr>)[locale] || UI.fr;

  return (
    <article className="bg-cream-50">
      {/* ── Hero ── */}
      <section className="relative w-full min-h-[100dvh] overflow-hidden bg-ink-950">
        <Image
          src="/photos-2026/bbq-expo-008.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col justify-end min-h-[100dvh]">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-10 md:mb-14">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.eyebrow}
          </div>

          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.92] font-bold max-w-5xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            <span className="block">{ui.heroTitle.line1}</span>
            <span className="block text-gold-500">{ui.heroTitle.line2}</span>
          </h1>

          <p className="mt-10 md:mt-14 text-cream-50/90 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl font-light">
            {ui.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ── Key figures ── */}
      <section className="bg-ink-950 py-12 md:py-16 border-t border-cream-50/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-12 justify-center">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.statsEyebrow}
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {ui.stats.map((s) => (
              <StatBlock key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits grid ── */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2
            className="text-ink-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold mb-16 max-w-4xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.benefitsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ui.benefits.map((b) => (
              <div
                key={b.title}
                className="group bg-cream-100 border border-ink-900/10 rounded-sm p-8 hover:border-gold-500/40 hover:shadow-[0_8px_30px_-8px_rgba(244,173,60,0.2)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mb-6 group-hover:bg-gold-500/20 transition-colors">
                  {getIcon(b.icon, "w-6 h-6 text-gold-600")}
                </div>
                <h3 className="text-ink-900 text-lg md:text-xl font-bold mb-3" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
                  {b.title}
                </h3>
                <p className="text-ink-600 text-sm md:text-base leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 reasons — alternating photo/text ── */}
      <section className="bg-cream-100 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2
            className="text-ink-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold mb-20 max-w-4xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.reasonsTitle}
          </h2>
          <div className="space-y-24 md:space-y-40">
            {ui.reasons.map((r, i) => {
              const reverse = i % 2 === 1;
              return (
                <div
                  key={r.number}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden rounded-sm">
                    <Image src={r.image} alt="" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
                  </div>
                  <div className="lg:col-span-5">
                    <div
                      className="text-gold-600 text-sm md:text-base font-bold tabular-nums mb-4"
                      style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                    >
                      — {r.number}
                    </div>
                    <h3
                      className="text-ink-900 text-3xl md:text-4xl lg:text-5xl leading-tight font-bold mb-6"
                      style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                    >
                      {r.title}
                    </h3>
                    <p className="text-ink-600 text-base md:text-lg leading-relaxed">{r.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Product segmentation ── */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2
            className="text-ink-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold mb-16 max-w-4xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.segmentTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ui.segments.map((s) => (
              <div
                key={s.title}
                className="flex items-start gap-5 bg-cream-100 border border-ink-900/10 rounded-sm p-6 hover:border-gold-500/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-ink-950 flex items-center justify-center flex-shrink-0 mt-1">
                  {getIcon(s.icon, "w-5 h-5 text-gold-500")}
                </div>
                <div>
                  <h3 className="text-ink-900 text-base md:text-lg font-bold mb-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
                    {s.title}
                  </h3>
                  <p className="text-ink-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visitor profiles + B2B platform ── */}
      <section className="bg-ink-950 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Visitors */}
            <div>
              <h2
                className="text-cream-50 text-3xl md:text-4xl lg:text-5xl leading-tight font-bold mb-10"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {ui.visitorsTitle}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ui.visitors.map((v) => (
                  <div key={v} className="flex items-center gap-3 text-cream-50/80">
                    <Users className="w-5 h-5 text-gold-500 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-base md:text-lg">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* B2B platform */}
            <div>
              <h2
                className="text-cream-50 text-3xl md:text-4xl lg:text-5xl leading-tight font-bold mb-10"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {ui.b2bTitle}
              </h2>
              <div className="space-y-4">
                {ui.b2bFeatures.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-cream-50/80">
                    <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-base md:text-lg">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visibility formats ── */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2
            className="text-ink-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-bold mb-16 max-w-4xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.visibilityTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {ui.visibilityFormats.map((f, i) => (
              <div
                key={f.title}
                className="relative overflow-hidden bg-cream-100 border border-ink-900/10 rounded-sm p-8 hover:border-gold-500/40 hover:shadow-[0_8px_30px_-8px_rgba(244,173,60,0.2)] transition-all duration-300"
              >
                <div
                  className="text-gold-500/20 text-7xl md:text-8xl font-bold absolute -top-2 -right-2 leading-none"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="relative text-ink-900 text-lg md:text-xl font-bold mb-3" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
                  {f.title}
                </h3>
                <p className="relative text-ink-600 text-sm md:text-base leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media logos ── */}
      <section className="bg-cream-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-10">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.mediaTitle}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4 md:gap-6 items-center">
            {MEDIA_LOGOS.map((logo) => (
              <div
                key={logo.file}
                className="aspect-[3/2] flex items-center justify-center bg-white border border-ink-900/10 rounded-sm p-3 hover:border-gold-500/40 transition-all duration-300"
              >
                <Image
                  src={`/content/images/${logo.file}`}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  className="w-auto h-auto max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand logos ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-10">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.brandsTitle}
          </div>
          <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
            {BRAND_LOGOS.map((file) => (
              <li
                key={file}
                className="group aspect-[5/3] flex items-center justify-center bg-cream-100 border border-ink-900/10 rounded-sm p-3 md:p-4 hover:border-gold-500/40 hover:shadow-[0_4px_20px_-6px_rgba(244,173,60,0.25)] transition-all duration-300"
              >
                <Image
                  src={`/content/images/${file}`}
                  alt=""
                  width={140}
                  height={70}
                  className="w-auto h-auto max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href="/exposants"
              className="group inline-flex items-center gap-3 text-ink-900 hover:text-gold-700 text-sm md:text-base font-bold uppercase tracking-widest transition-colors"
            >
              <span>{ui.brandsCta}</span>
              <span aria-hidden="true" className="inline-block w-10 h-px bg-gold-600 origin-left transition-transform duration-300 group-hover:scale-x-[1.6]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Closing quote ── */}
      <section className="bg-ink-950 py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <span
            className="block text-gold-500 text-5xl md:text-7xl leading-none mb-6"
            aria-hidden="true"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            &laquo;
          </span>
          <p
            className="text-cream-50 text-2xl md:text-3xl lg:text-4xl leading-snug italic"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.closingQuote}
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-cream-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row gap-4">
          <Link
            href={ui.cta.href}
            className="group inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>{ui.cta.label}</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
          </Link>
          <Link
            href={ui.ctaSecondary.href}
            className="group inline-flex items-center gap-4 border border-ink-900/30 hover:border-gold-500 text-ink-900 hover:text-gold-700 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>{ui.ctaSecondary.label}</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </article>
  );
}
