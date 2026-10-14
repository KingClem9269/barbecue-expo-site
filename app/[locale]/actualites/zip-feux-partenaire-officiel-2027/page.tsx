import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import EcosystemLinks from "@/components/ecosystem/EcosystemLinks";

const PATH = "/actualites/zip-feux-partenaire-officiel-2027";

type Section = { h: string; p: string[]; list?: string[] };
type Article = {
  kicker: string;
  title: string;
  lead: string;
  badge: string;
  sections: Section[];
  productsCaption: string;
  quote: string;
  quoteAuthor: string;
  ctaTitle: string;
  ctaText: string;
  ctaArena: string;
  ctaExpo: string;
  more: string;
};

const ARTICLE: Record<string, Article> = {
  fr: {
    kicker: "Partenaire officiel 2027",
    title: "Zip Feux, partenaire officiel de Barbecue Expo et sponsor de la Grill Arena",
    lead: "Après trois éditions passées à nos côtés, la marque d'allume-feux à l'héritage irlandais franchit un cap : elle devient partenaire officiel du salon et sponsor de la Grill Arena, le cœur battant de la compétition. Portrait d'un acteur qui maîtrise le feu depuis près d'un siècle.",
    badge: "Partenaire officiel · Sponsor de la Grill Arena",
    sections: [
      {
        h: "Trois ans de présence, un partenariat qui s'impose",
        p: [
          "Il y a des marques qui passent, et d'autres qui s'installent. Depuis trois ans, Zip Feux fait partie du paysage de Barbecue Expo : un stand fidèle, une équipe passionnée et un produit que tout barbecuist connaît, même sans toujours le nommer — l'allume-feu, ce petit geste qui transforme une pile de charbon en braise prête à cuire.",
          "En 2027, cette présence devient une véritable alliance. Zip Feux rejoint le cercle des partenaires officiels du salon et appose son nom sur l'événement le plus spectaculaire du Parc Floral : la Grill Arena, où s'affrontent en direct les meilleurs pitmasters. Un symbole limpide — car avant chaque battle, avant chaque braise, il y a une étincelle. Et cette étincelle, c'est précisément le métier de Zip.",
        ],
      },
      {
        h: "Plus de 80 ans à maîtriser le feu",
        p: [
          "Derrière Zip Feux se cache Zip®, une marque à l'héritage irlandais revendiqué, éditée par Standard Brands au sein du groupe SHS. Son slogan dit tout : « Zip®, dans le feu de l'action depuis 80 ans ». Une longévité rare, née d'une invention fondatrice — l'allume-feu au kérosène — qui a lancé une longue tradition d'innovation et de fiabilité.",
          "De son site historique de Castlebellingham, en Irlande, la marque rayonne aujourd'hui sur de nombreux marchés : Royaume-Uni, Irlande, France, Belgique, Canada et États-Unis. Un acteur international, mais qui a gardé l'exigence d'un fabricant attaché à son savoir-faire, attentif à ses responsabilités en matière de santé-sécurité, d'environnement et de contrôle qualité.",
        ],
      },
      {
        h: "Une gamme pensée pour tous les feux",
        p: ["Si Zip est née de l'allume-feu, sa gamme couvre aujourd'hui l'ensemble du rituel du feu :"],
        list: [
          "Allume-feux au kérosène — l'original, gage d'allumage rapide et fiable ;",
          "Allume-feux naturels — la gamme écologique, qui représente déjà 25 % des ventes de la marque ;",
          "Charbon de bois pour barbecue — pour passer de l'étincelle à la cuisson ;",
          "Combustibles d'hiver — pour la cheminée, le poêle et le brasero.",
        ],
      },
      {
        h: "Un partenaire engagé pour un feu plus responsable",
        p: [
          "C'est sans doute là que Zip Feux surprend le plus. Loin de l'image parfois polluante des produits d'allumage, la marque mène un programme de développement durable sur cinq ans aux résultats très concrets :",
        ],
        list: [
          "Énergie : le site de Castlebellingham fonctionne désormais 100 % à l'énergie renouvelable (contre 10 % avant mars 2022) ;",
          "Eau : 9,5 millions de litres économisés sur cinq ans, soit −50 % de consommation sur la fabrication ;",
          "Déchets : zéro enfouissement, tout est valorisé énergétiquement ;",
          "Emballages : refonte en 2023 avec des matériaux renouvelables (comme la canne à sucre), soit l'équivalent de 1 430 arbres préservés. Produits certifiés FSC®.",
        ],
      },
      {
        h: "Sponsor de la Grill Arena : au cœur du feu de l'action",
        p: [
          "En s'associant à la Grill Arena, Zip Feux ne choisit pas n'importe quelle zone du salon. C'est le théâtre du salon : seize pitmasters, des duels en direct, un champion couronné devant le public. Et tout commence par un allumage. Difficile d'imaginer association plus naturelle entre une marque dont le métier est de déclencher le feu et un format dont l'ADN est l'intensité du feu vif.",
          "Pour les visiteurs comme pour les exposants, ce partenariat envoie un signal fort : Barbecue Expo 2027 s'entoure d'acteurs historiques, fiables et engagés, qui partagent une même passion — celle du feu bien maîtrisé.",
        ],
      },
    ],
    productsCaption: "La gamme Zip Feux : allume-feux, charbon et combustibles.",
    quote:
      "Après trois éditions, devenir partenaire officiel de Barbecue Expo et sponsor de la Grill Arena était une évidence. C'est l'événement qui rassemble toute notre communauté autour de ce que nous faisons depuis 80 ans : allumer le feu.",
    quoteAuthor: "Laurene Parkin — Zip Feux",
    ctaTitle: "Retrouvez Zip Feux à Barbecue Expo 2027",
    ctaText:
      "Rendez-vous les 12, 13 et 14 mars 2027 au Parc Floral de Paris pour découvrir Zip Feux et assister aux affrontements de la Grill Arena qu'ils sponsorisent.",
    ctaArena: "Découvrir la Grill Arena",
    ctaExpo: "Devenir partenaire / exposant",
    more: "Pour aller plus loin",
  },
  en: {
    kicker: "Official partner 2027",
    title: "Zip Feux, official partner of Barbecue Expo and Grill Arena sponsor",
    lead: "After three editions by our side, the firelighter brand with Irish heritage steps up: it becomes an official partner of the show and sponsor of the Grill Arena, the beating heart of the competition. Portrait of a company that has mastered fire for nearly a century.",
    badge: "Official partner · Grill Arena sponsor",
    sections: [
      {
        h: "Three years of presence, a partnership that became obvious",
        p: [
          "Some brands pass through; others put down roots. For three years, Zip Feux has been part of the Barbecue Expo landscape: a loyal stand, a passionate team and a product every barbecue lover knows — the firelighter, the small gesture that turns a pile of charcoal into cooking-ready embers.",
          "In 2027, that presence becomes a true alliance. Zip Feux joins the circle of official partners and puts its name on the show's most spectacular event: the Grill Arena, where the best pitmasters go head-to-head live. A clear symbol — because before every battle, before every ember, there is a spark. And that spark is exactly Zip's craft.",
        ],
      },
      {
        h: "Over 80 years mastering fire",
        p: [
          "Behind Zip Feux is Zip®, a brand with proud Irish heritage, made by Standard Brands within the SHS Group. Its tagline says it all: “Zip®, in the heat of the action for 80 years.” A rare longevity, born of a founding invention — the kerosene firelighter — that launched a long tradition of innovation and reliability.",
          "From its historic Castlebellingham site in Ireland, the brand now reaches many markets: the UK, Ireland, France, Belgium, Canada and the United States. An international player that has kept the standards of a maker attached to its craft, attentive to its responsibilities in health & safety, the environment and quality control.",
        ],
      },
      {
        h: "A range for every fire",
        p: ["Born from the firelighter, Zip's range now covers the whole fire ritual:"],
        list: [
          "Kerosene firelighters — the original, for fast, reliable lighting;",
          "Natural firelighters — the eco range, already 25% of the brand's sales;",
          "Barbecue charcoal — from spark to cooking;",
          "Winter fuels — for the fireplace, stove and fire pit.",
        ],
      },
      {
        h: "A partner committed to more responsible fire",
        p: [
          "This is perhaps where Zip Feux surprises most. Far from the sometimes-polluting image of lighting products, the brand runs a five-year sustainability programme with very concrete results:",
        ],
        list: [
          "Energy: the Castlebellingham site now runs on 100% renewable energy (vs 10% before March 2022);",
          "Water: 9.5 million litres saved over five years, i.e. −50% manufacturing consumption;",
          "Waste: zero landfill, everything recovered for energy;",
          "Packaging: redesigned in 2023 with renewable materials (such as sugarcane), saving the equivalent of 1,430 trees. FSC® certified products.",
        ],
      },
      {
        h: "Grill Arena sponsor: at the heart of the action",
        p: [
          "By backing the Grill Arena, Zip Feux doesn't pick just any zone. It's the show's main stage: sixteen pitmasters, live duels, a champion crowned in front of the crowd. And it all starts with a light. Hard to imagine a more natural match between a brand whose job is to start the fire and a format whose DNA is the intensity of live flame.",
          "For visitors and exhibitors alike, this partnership sends a strong signal: Barbecue Expo 2027 surrounds itself with established, reliable and committed players who share one passion — fire, well mastered.",
        ],
      },
    ],
    productsCaption: "The Zip Feux range: firelighters, charcoal and fuels.",
    quote:
      "After three editions, becoming an official partner of Barbecue Expo and sponsor of the Grill Arena was obvious. It's the event that brings our whole community together around what we've been doing for 80 years: lighting the fire.",
    quoteAuthor: "Laurene Parkin — Zip Feux",
    ctaTitle: "Meet Zip Feux at Barbecue Expo 2027",
    ctaText:
      "Join us on 12, 13 and 14 March 2027 at Parc Floral de Paris to discover Zip Feux and watch the Grill Arena battles they sponsor.",
    ctaArena: "Discover the Grill Arena",
    ctaExpo: "Become a partner / exhibitor",
    more: "Read more",
  },
  es: {
    kicker: "Socio oficial 2027",
    title: "Zip Feux, socio oficial de Barbecue Expo y patrocinador de la Grill Arena",
    lead: "Tras tres ediciones a nuestro lado, la marca de pastillas de encendido de herencia irlandesa da un paso más: se convierte en socio oficial de la feria y patrocinador de la Grill Arena, el corazón palpitante de la competición. Retrato de una empresa que domina el fuego desde hace casi un siglo.",
    badge: "Socio oficial · Patrocinador de la Grill Arena",
    sections: [
      {
        h: "Tres años de presencia, una alianza que se impone",
        p: [
          "Hay marcas que pasan y otras que se quedan. Desde hace tres años, Zip Feux forma parte del paisaje de Barbecue Expo: un stand fiel, un equipo apasionado y un producto que todo amante de la barbacoa conoce, aunque no siempre lo nombre — la pastilla de encendido, ese pequeño gesto que convierte un montón de carbón en brasas listas para cocinar.",
          "En 2027, esa presencia se convierte en una verdadera alianza. Zip Feux se une al círculo de socios oficiales de la feria y pone su nombre en el evento más espectacular del Parc Floral: la Grill Arena, donde los mejores pitmasters se enfrentan en directo. Un símbolo evidente — porque antes de cada battle, antes de cada brasa, hay una chispa. Y esa chispa es precisamente el oficio de Zip.",
        ],
      },
      {
        h: "Más de 80 años dominando el fuego",
        p: [
          "Detrás de Zip Feux está Zip®, una marca que reivindica su herencia irlandesa, editada por Standard Brands dentro del grupo SHS. Su eslogan lo dice todo: «Zip®, en el fuego de la acción desde hace 80 años». Una longevidad poco común, nacida de un invento fundacional — la pastilla de encendido de queroseno — que inauguró una larga tradición de innovación y fiabilidad.",
          "Desde su histórica planta de Castlebellingham, en Irlanda, la marca está presente hoy en numerosos mercados: Reino Unido, Irlanda, Francia, Bélgica, Canadá y Estados Unidos. Un actor internacional que ha conservado la exigencia de un fabricante apegado a su saber hacer, atento a sus responsabilidades en materia de salud y seguridad, medio ambiente y control de calidad.",
        ],
      },
      {
        h: "Una gama pensada para todos los fuegos",
        p: ["Aunque Zip nació con la pastilla de encendido, hoy su gama cubre todo el ritual del fuego:"],
        list: [
          "Pastillas de encendido de queroseno — el original, garantía de un encendido rápido y fiable;",
          "Pastillas de encendido naturales — la gama ecológica, que ya representa el 25 % de las ventas de la marca;",
          "Carbón vegetal para barbacoa — para pasar de la chispa a la cocción;",
          "Combustibles de invierno — para la chimenea, la estufa y el brasero.",
        ],
      },
      {
        h: "Un socio comprometido con un fuego más responsable",
        p: [
          "Es sin duda aquí donde Zip Feux más sorprende. Lejos de la imagen a veces contaminante de los productos de encendido, la marca lleva a cabo un programa de sostenibilidad a cinco años con resultados muy concretos:",
        ],
        list: [
          "Energía: la planta de Castlebellingham funciona ya al 100 % con energía renovable (frente al 10 % antes de marzo de 2022);",
          "Agua: 9,5 millones de litros ahorrados en cinco años, es decir, −50 % de consumo en la fabricación;",
          "Residuos: cero vertedero, todo se valoriza energéticamente;",
          "Envases: rediseñados en 2023 con materiales renovables (como la caña de azúcar), el equivalente a 1.430 árboles preservados. Productos con certificación FSC®.",
        ],
      },
      {
        h: "Patrocinador de la Grill Arena: en el corazón del fuego de la acción",
        p: [
          "Al asociarse con la Grill Arena, Zip Feux no elige una zona cualquiera de la feria. Es el gran escenario de la feria: dieciséis pitmasters, duelos en directo, un campeón coronado ante el público. Y todo empieza con un encendido. Difícil imaginar una asociación más natural entre una marca cuyo oficio es prender el fuego y un formato cuyo ADN es la intensidad de la llama viva.",
          "Para visitantes y expositores, esta alianza envía una señal fuerte: Barbecue Expo 2027 se rodea de actores históricos, fiables y comprometidos que comparten una misma pasión — la del fuego bien dominado.",
        ],
      },
    ],
    productsCaption: "La gama Zip Feux: pastillas de encendido, carbón y combustibles.",
    quote:
      "Tras tres ediciones, convertirnos en socio oficial de Barbecue Expo y patrocinador de la Grill Arena era evidente. Es el evento que reúne a toda nuestra comunidad en torno a lo que hacemos desde hace 80 años: encender el fuego.",
    quoteAuthor: "Laurene Parkin — Zip Feux",
    ctaTitle: "Encuentre a Zip Feux en Barbecue Expo 2027",
    ctaText:
      "Le esperamos los días 12, 13 y 14 de marzo de 2027 en el Parc Floral de París para descubrir Zip Feux y asistir a los enfrentamientos de la Grill Arena que patrocinan.",
    ctaArena: "Descubrir la Grill Arena",
    ctaExpo: "Ser socio / expositor",
    more: "Para saber más",
  },
  de: {
    kicker: "Offizieller Partner 2027",
    title: "Zip Feux, offizieller Partner der Barbecue Expo und Sponsor der Grill Arena",
    lead: "Nach drei Ausgaben an unserer Seite geht die Anzündermarke mit irischen Wurzeln einen Schritt weiter: Sie wird offizieller Partner der Messe und Sponsor der Grill Arena, des pulsierenden Herzens des Wettbewerbs. Porträt eines Unternehmens, das das Feuer seit fast einem Jahrhundert beherrscht.",
    badge: "Offizieller Partner · Sponsor der Grill Arena",
    sections: [
      {
        h: "Drei Jahre Präsenz – eine Partnerschaft, die sich aufdrängt",
        p: [
          "Manche Marken kommen und gehen, andere bleiben. Seit drei Jahren gehört Zip Feux fest zur Barbecue Expo: ein treuer Stand, ein leidenschaftliches Team und ein Produkt, das jeder Grillfan kennt, auch wenn er es nicht immer beim Namen nennt – der Anzünder, dieser kleine Handgriff, der einen Haufen Holzkohle in garbereite Glut verwandelt.",
          "2027 wird aus dieser Präsenz eine echte Allianz. Zip Feux tritt dem Kreis der offiziellen Partner der Messe bei und setzt seinen Namen auf das spektakulärste Event im Parc Floral: die Grill Arena, in der die besten Pitmasters live gegeneinander antreten. Ein klares Symbol – denn vor jedem Battle, vor jeder Glut steht ein Funke. Und genau dieser Funke ist Zips Handwerk.",
        ],
      },
      {
        h: "Über 80 Jahre Meisterschaft im Umgang mit Feuer",
        p: [
          "Hinter Zip Feux steht Zip®, eine Marke mit bewusst gepflegtem irischem Erbe, herausgegeben von Standard Brands innerhalb der SHS-Gruppe. Ihr Slogan sagt alles: „Zip®, seit 80 Jahren mitten im Feuer des Geschehens“. Eine seltene Beständigkeit, entstanden aus einer grundlegenden Erfindung – dem Kerosin-Anzünder –, die eine lange Tradition von Innovation und Zuverlässigkeit begründete.",
          "Von ihrem historischen Standort in Castlebellingham in Irland aus ist die Marke heute auf zahlreichen Märkten präsent: Vereinigtes Königreich, Irland, Frankreich, Belgien, Kanada und USA. Ein internationaler Akteur, der sich den Anspruch eines Herstellers bewahrt hat, der seinem Know-how verbunden ist und seine Verantwortung in den Bereichen Gesundheit und Sicherheit, Umwelt und Qualitätskontrolle ernst nimmt.",
        ],
      },
      {
        h: "Ein Sortiment für jedes Feuer",
        p: ["Auch wenn Zip mit dem Anzünder begann, deckt das Sortiment heute das gesamte Feuerritual ab:"],
        list: [
          "Kerosin-Anzünder – das Original, für schnelles und zuverlässiges Anzünden;",
          "Natürliche Anzünder – die ökologische Linie, die bereits 25 % des Umsatzes der Marke ausmacht;",
          "Grillholzkohle – vom Funken bis zum Garen;",
          "Winterbrennstoffe – für Kamin, Ofen und Feuerschale.",
        ],
      },
      {
        h: "Ein engagierter Partner für ein verantwortungsvolleres Feuer",
        p: [
          "Hier überrascht Zip Feux wohl am meisten. Fernab vom mitunter umweltbelastenden Image von Anzündprodukten verfolgt die Marke ein fünfjähriges Nachhaltigkeitsprogramm mit sehr konkreten Ergebnissen:",
        ],
        list: [
          "Energie: Der Standort Castlebellingham läuft inzwischen zu 100 % mit erneuerbarer Energie (gegenüber 10 % vor März 2022);",
          "Wasser: 9,5 Millionen Liter in fünf Jahren eingespart, also −50 % Verbrauch in der Produktion;",
          "Abfall: null Deponie, alles wird energetisch verwertet;",
          "Verpackungen: 2023 mit erneuerbaren Materialien (wie Zuckerrohr) neu gestaltet, was 1.430 erhaltenen Bäumen entspricht. FSC®-zertifizierte Produkte.",
        ],
      },
      {
        h: "Sponsor der Grill Arena: mitten im Feuer des Geschehens",
        p: [
          "Mit der Grill Arena wählt Zip Feux nicht irgendeinen Bereich der Messe. Sie ist die große Bühne der Messe: sechzehn Pitmasters, Live-Duelle, ein vor Publikum gekürter Champion. Und alles beginnt mit dem Anzünden. Schwer vorstellbar, dass eine Marke, deren Handwerk das Entfachen des Feuers ist, besser zu einem Format passen könnte, dessen DNA die Intensität der offenen Flamme ist.",
          "Für Besucher wie Aussteller sendet diese Partnerschaft ein starkes Signal: Die Barbecue Expo 2027 umgibt sich mit traditionsreichen, zuverlässigen und engagierten Akteuren, die eine gemeinsame Leidenschaft teilen – die für ein gut beherrschtes Feuer.",
        ],
      },
    ],
    productsCaption: "Das Zip-Feux-Sortiment: Anzünder, Holzkohle und Brennstoffe.",
    quote:
      "Nach drei Ausgaben war es selbstverständlich, offizieller Partner der Barbecue Expo und Sponsor der Grill Arena zu werden. Es ist das Event, das unsere gesamte Community um das versammelt, was wir seit 80 Jahren tun: das Feuer entfachen.",
    quoteAuthor: "Laurene Parkin — Zip Feux",
    ctaTitle: "Treffen Sie Zip Feux auf der Barbecue Expo 2027",
    ctaText:
      "Wir sehen uns am 12., 13. und 14. März 2027 im Parc Floral de Paris – entdecken Sie Zip Feux und erleben Sie die von ihnen gesponserten Duelle der Grill Arena.",
    ctaArena: "Die Grill Arena entdecken",
    ctaExpo: "Partner / Aussteller werden",
    more: "Weiterlesen",
  },
  nl: {
    kicker: "Officiële partner 2027",
    title: "Zip Feux, officiële partner van Barbecue Expo en sponsor van de Grill Arena",
    lead: "Na drie edities aan onze zijde zet het aanmaakmerk met Ierse roots een stap verder: het wordt officiële partner van de beurs en sponsor van de Grill Arena, het kloppende hart van de competitie. Portret van een bedrijf dat het vuur al bijna een eeuw beheerst.",
    badge: "Officiële partner · Sponsor van de Grill Arena",
    sections: [
      {
        h: "Drie jaar aanwezig, een partnerschap dat voor de hand lag",
        p: [
          "Sommige merken komen en gaan, andere blijven. Al drie jaar maakt Zip Feux deel uit van het landschap van Barbecue Expo: een trouwe stand, een gepassioneerd team en een product dat elke barbecueliefhebber kent, ook al noemt hij het niet altijd bij naam — de aanmaakblokjes, dat kleine gebaar dat een hoop houtskool verandert in gloeiende kolen, klaar om op te koken.",
          "In 2027 wordt die aanwezigheid een echte alliantie. Zip Feux treedt toe tot de kring van officiële partners van de beurs en verbindt zijn naam aan het meest spectaculaire evenement van het Parc Floral: de Grill Arena, waar de beste pitmasters het live tegen elkaar opnemen. Een helder symbool — want vóór elke battle, vóór elke gloeiende kool, is er een vonk. En die vonk is precies het vak van Zip.",
        ],
      },
      {
        h: "Meer dan 80 jaar vuur beheersen",
        p: [
          "Achter Zip Feux schuilt Zip®, een merk dat trots is op zijn Ierse erfgoed, uitgegeven door Standard Brands binnen de SHS-groep. De slogan zegt alles: „Zip®, al 80 jaar in het vuur van de actie”. Een zeldzame levensduur, geboren uit een baanbrekende uitvinding — het aanmaakblokje op kerosine — die een lange traditie van innovatie en betrouwbaarheid inluidde.",
          "Vanuit zijn historische vestiging in Castlebellingham, Ierland, is het merk vandaag actief op tal van markten: het Verenigd Koninkrijk, Ierland, Frankrijk, België, Canada en de Verenigde Staten. Een internationale speler die de veeleisendheid heeft behouden van een fabrikant die gehecht is aan zijn vakmanschap en aandacht heeft voor zijn verantwoordelijkheden op het gebied van gezondheid en veiligheid, milieu en kwaliteitscontrole.",
        ],
      },
      {
        h: "Een assortiment voor elk vuur",
        p: ["Hoewel Zip begon met het aanmaakblokje, omvat het assortiment vandaag het volledige vuurritueel:"],
        list: [
          "Aanmaakblokjes op kerosine — het origineel, garantie voor snel en betrouwbaar aansteken;",
          "Natuurlijke aanmaakblokjes — het ecologische assortiment, al goed voor 25 % van de verkoop van het merk;",
          "Barbecuehoutskool — van vonk tot bereiding;",
          "Winterbrandstoffen — voor open haard, kachel en vuurschaal.",
        ],
      },
      {
        h: "Een geëngageerde partner voor een verantwoordelijker vuur",
        p: [
          "Hier verrast Zip Feux waarschijnlijk het meest. Ver weg van het soms vervuilende imago van aanmaakproducten voert het merk een vijfjarig duurzaamheidsprogramma met zeer concrete resultaten:",
        ],
        list: [
          "Energie: de vestiging in Castlebellingham draait nu voor 100 % op hernieuwbare energie (tegenover 10 % vóór maart 2022);",
          "Water: 9,5 miljoen liter bespaard in vijf jaar, oftewel −50 % verbruik in de productie;",
          "Afval: nul storten, alles wordt energetisch gevaloriseerd;",
          "Verpakkingen: in 2023 herontworpen met hernieuwbare materialen (zoals suikerriet), het equivalent van 1.430 gespaarde bomen. FSC®-gecertificeerde producten.",
        ],
      },
      {
        h: "Sponsor van de Grill Arena: in het hart van het vuur van de actie",
        p: [
          "Door zich te verbinden aan de Grill Arena kiest Zip Feux niet zomaar een zone van de beurs. Het is het grote podium van de beurs: zestien pitmasters, live duels, een kampioen die voor het publiek wordt gekroond. En alles begint met het aansteken. Een natuurlijkere combinatie is nauwelijks denkbaar tussen een merk dat vuur doet ontbranden en een format waarvan het DNA de intensiteit van de open vlam is.",
          "Voor bezoekers en exposanten zendt dit partnerschap een sterk signaal uit: Barbecue Expo 2027 omringt zich met gevestigde, betrouwbare en geëngageerde spelers die één passie delen — die voor goed beheerst vuur.",
        ],
      },
    ],
    productsCaption: "Het Zip Feux-assortiment: aanmaakblokjes, houtskool en brandstoffen.",
    quote:
      "Na drie edities was het vanzelfsprekend om officiële partner van Barbecue Expo en sponsor van de Grill Arena te worden. Het is het evenement dat onze hele community samenbrengt rond wat we al 80 jaar doen: het vuur aansteken.",
    quoteAuthor: "Laurene Parkin — Zip Feux",
    ctaTitle: "Ontmoet Zip Feux op Barbecue Expo 2027",
    ctaText:
      "Afspraak op 12, 13 en 14 maart 2027 in het Parc Floral de Paris om Zip Feux te ontdekken en de door hen gesponsorde duels van de Grill Arena bij te wonen.",
    ctaArena: "Ontdek de Grill Arena",
    ctaExpo: "Partner / exposant worden",
    more: "Verder lezen",
  },
  pt: {
    kicker: "Parceiro oficial 2027",
    title: "Zip Feux, parceiro oficial da Barbecue Expo e patrocinador da Grill Arena",
    lead: "Depois de três edições ao nosso lado, a marca de acendalhas de herança irlandesa dá um passo em frente: torna-se parceiro oficial da feira e patrocinador da Grill Arena, o coração pulsante da competição. Retrato de uma empresa que domina o fogo há quase um século.",
    badge: "Parceiro oficial · Patrocinador da Grill Arena",
    sections: [
      {
        h: "Três anos de presença, uma parceria que se impõe",
        p: [
          "Há marcas que passam e outras que ficam. Há três anos que a Zip Feux faz parte da paisagem da Barbecue Expo: um stand fiel, uma equipa apaixonada e um produto que qualquer amante de churrasco conhece, mesmo sem sempre o nomear — a acendalha, esse pequeno gesto que transforma um monte de carvão em brasas prontas para cozinhar.",
          "Em 2027, essa presença torna-se uma verdadeira aliança. A Zip Feux junta-se ao círculo de parceiros oficiais da feira e associa o seu nome ao evento mais espetacular do Parc Floral: a Grill Arena, onde os melhores pitmasters se defrontam ao vivo. Um símbolo evidente — porque antes de cada battle, antes de cada brasa, há uma faísca. E essa faísca é precisamente o ofício da Zip.",
        ],
      },
      {
        h: "Mais de 80 anos a dominar o fogo",
        p: [
          "Por trás da Zip Feux está a Zip®, uma marca que assume a sua herança irlandesa, editada pela Standard Brands no seio do grupo SHS. O seu slogan diz tudo: «Zip®, no fogo da ação há 80 anos». Uma longevidade rara, nascida de uma invenção fundadora — a acendalha a querosene — que lançou uma longa tradição de inovação e fiabilidade.",
          "A partir da sua histórica fábrica de Castlebellingham, na Irlanda, a marca está hoje presente em numerosos mercados: Reino Unido, Irlanda, França, Bélgica, Canadá e Estados Unidos. Um ator internacional que manteve a exigência de um fabricante ligado ao seu saber-fazer, atento às suas responsabilidades em matéria de saúde e segurança, ambiente e controlo de qualidade.",
        ],
      },
      {
        h: "Uma gama pensada para todos os fogos",
        p: ["Embora a Zip tenha nascido com a acendalha, a sua gama cobre hoje todo o ritual do fogo:"],
        list: [
          "Acendalhas a querosene — o original, garantia de um acendimento rápido e fiável;",
          "Acendalhas naturais — a gama ecológica, que já representa 25 % das vendas da marca;",
          "Carvão vegetal para churrasco — para passar da faísca à confeção;",
          "Combustíveis de inverno — para a lareira, o recuperador e o braseiro.",
        ],
      },
      {
        h: "Um parceiro empenhado num fogo mais responsável",
        p: [
          "É talvez aqui que a Zip Feux mais surpreende. Longe da imagem por vezes poluente dos produtos de acendimento, a marca conduz um programa de sustentabilidade a cinco anos com resultados muito concretos:",
        ],
        list: [
          "Energia: a fábrica de Castlebellingham funciona agora a 100 % com energia renovável (contra 10 % antes de março de 2022);",
          "Água: 9,5 milhões de litros poupados em cinco anos, ou seja, −50 % de consumo na produção;",
          "Resíduos: zero aterro, tudo é valorizado energeticamente;",
          "Embalagens: redesenhadas em 2023 com materiais renováveis (como a cana-de-açúcar), o equivalente a 1.430 árvores preservadas. Produtos com certificação FSC®.",
        ],
      },
      {
        h: "Patrocinador da Grill Arena: no coração do fogo da ação",
        p: [
          "Ao associar-se à Grill Arena, a Zip Feux não escolhe uma zona qualquer da feira. É o grande palco da feira: dezasseis pitmasters, duelos ao vivo, um campeão coroado perante o público. E tudo começa com um acendimento. Difícil imaginar uma associação mais natural entre uma marca cujo ofício é acender o fogo e um formato cujo ADN é a intensidade da chama viva.",
          "Para visitantes e expositores, esta parceria envia um sinal forte: a Barbecue Expo 2027 rodeia-se de atores históricos, fiáveis e empenhados, que partilham uma mesma paixão — a do fogo bem dominado.",
        ],
      },
    ],
    productsCaption: "A gama Zip Feux: acendalhas, carvão e combustíveis.",
    quote:
      "Depois de três edições, tornarmo-nos parceiro oficial da Barbecue Expo e patrocinador da Grill Arena era uma evidência. É o evento que reúne toda a nossa comunidade em torno daquilo que fazemos há 80 anos: acender o fogo.",
    quoteAuthor: "Laurene Parkin — Zip Feux",
    ctaTitle: "Encontre a Zip Feux na Barbecue Expo 2027",
    ctaText:
      "Encontro marcado a 12, 13 e 14 de março de 2027 no Parc Floral de Paris para descobrir a Zip Feux e assistir aos confrontos da Grill Arena que patrocinam.",
    ctaArena: "Descobrir a Grill Arena",
    ctaExpo: "Tornar-se parceiro / expositor",
    more: "Para saber mais",
  },
  it: {
    kicker: "Partner ufficiale 2027",
    title: "Zip Feux, partner ufficiale di Barbecue Expo e sponsor della Grill Arena",
    lead: "Dopo tre edizioni al nostro fianco, il marchio di accendifuoco dalle radici irlandesi compie un salto: diventa partner ufficiale della fiera e sponsor della Grill Arena, il cuore pulsante della competizione. Ritratto di un'azienda che domina il fuoco da quasi un secolo.",
    badge: "Partner ufficiale · Sponsor della Grill Arena",
    sections: [
      {
        h: "Tre anni di presenza, una partnership che si impone",
        p: [
          "Ci sono marchi che passano e altri che restano. Da tre anni Zip Feux fa parte del panorama di Barbecue Expo: uno stand fedele, un team appassionato e un prodotto che ogni appassionato di barbecue conosce, anche senza sempre nominarlo — l'accendifuoco, quel piccolo gesto che trasforma un mucchio di carbone in brace pronta per cucinare.",
          "Nel 2027 questa presenza diventa una vera alleanza. Zip Feux entra nella cerchia dei partner ufficiali della fiera e lega il suo nome all'evento più spettacolare del Parc Floral: la Grill Arena, dove i migliori pitmaster si sfidano dal vivo. Un simbolo chiarissimo — perché prima di ogni battle, prima di ogni brace, c'è una scintilla. E quella scintilla è esattamente il mestiere di Zip.",
        ],
      },
      {
        h: "Oltre 80 anni a domare il fuoco",
        p: [
          "Dietro Zip Feux c'è Zip®, un marchio che rivendica le proprie radici irlandesi, prodotto da Standard Brands all'interno del gruppo SHS. Il suo slogan dice tutto: «Zip®, nel fuoco dell'azione da 80 anni». Una longevità rara, nata da un'invenzione fondativa — l'accendifuoco al cherosene — che ha dato il via a una lunga tradizione di innovazione e affidabilità.",
          "Dal suo storico stabilimento di Castlebellingham, in Irlanda, il marchio è oggi presente su numerosi mercati: Regno Unito, Irlanda, Francia, Belgio, Canada e Stati Uniti. Un player internazionale che ha conservato il rigore di un produttore legato al proprio know-how, attento alle proprie responsabilità in materia di salute e sicurezza, ambiente e controllo qualità.",
        ],
      },
      {
        h: "Una gamma pensata per ogni fuoco",
        p: ["Se Zip è nata con l'accendifuoco, oggi la sua gamma copre l'intero rituale del fuoco:"],
        list: [
          "Accendifuoco al cherosene — l'originale, garanzia di un'accensione rapida e affidabile;",
          "Accendifuoco naturali — la gamma ecologica, che rappresenta già il 25 % delle vendite del marchio;",
          "Carbone di legna per barbecue — per passare dalla scintilla alla cottura;",
          "Combustibili invernali — per il camino, la stufa e il braciere.",
        ],
      },
      {
        h: "Un partner impegnato per un fuoco più responsabile",
        p: [
          "È forse qui che Zip Feux sorprende di più. Lontano dall'immagine talvolta inquinante dei prodotti per l'accensione, il marchio porta avanti un programma di sostenibilità quinquennale con risultati molto concreti:",
        ],
        list: [
          "Energia: lo stabilimento di Castlebellingham funziona ormai al 100 % con energia rinnovabile (contro il 10 % prima di marzo 2022);",
          "Acqua: 9,5 milioni di litri risparmiati in cinque anni, ovvero −50 % di consumi nella produzione;",
          "Rifiuti: zero discarica, tutto viene valorizzato energeticamente;",
          "Imballaggi: ridisegnati nel 2023 con materiali rinnovabili (come la canna da zucchero), l'equivalente di 1.430 alberi preservati. Prodotti certificati FSC®.",
        ],
      },
      {
        h: "Sponsor della Grill Arena: nel cuore del fuoco dell'azione",
        p: [
          "Associandosi alla Grill Arena, Zip Feux non sceglie una zona qualsiasi della fiera. È il palcoscenico principale della fiera: sedici pitmaster, duelli dal vivo, un campione incoronato davanti al pubblico. E tutto inizia con un'accensione. Difficile immaginare un'associazione più naturale tra un marchio il cui mestiere è accendere il fuoco e un format il cui DNA è l'intensità della fiamma viva.",
          "Per visitatori ed espositori, questa partnership lancia un segnale forte: Barbecue Expo 2027 si circonda di player storici, affidabili e impegnati, che condividono una stessa passione — quella del fuoco ben domato.",
        ],
      },
    ],
    productsCaption: "La gamma Zip Feux: accendifuoco, carbone e combustibili.",
    quote:
      "Dopo tre edizioni, diventare partner ufficiale di Barbecue Expo e sponsor della Grill Arena era naturale. È l'evento che riunisce tutta la nostra community attorno a ciò che facciamo da 80 anni: accendere il fuoco.",
    quoteAuthor: "Laurene Parkin — Zip Feux",
    ctaTitle: "Incontrate Zip Feux a Barbecue Expo 2027",
    ctaText:
      "Appuntamento il 12, 13 e 14 marzo 2027 al Parc Floral de Paris per scoprire Zip Feux e assistere alle sfide della Grill Arena che sponsorizzano.",
    ctaArena: "Scopri la Grill Arena",
    ctaExpo: "Diventa partner / espositore",
    more: "Per approfondire",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const a = ARTICLE[locale] || ARTICLE.fr;
  return buildMetadata(locale, PATH, {
    title: `${a.title} — Barbecue Expo`,
    description: a.lead,
  });
}

export default async function ZipFeuxArticle() {
  const locale = await getLocale();
  const a = ARTICLE[locale] || ARTICLE.fr;

  return (
    <article className="bg-cream-50">
      {/* Hero */}
      <header className="relative w-full min-h-[60dvh] md:min-h-[70dvh] overflow-hidden bg-ink-950 flex items-end">
        <Image
          src="/partners/zip-feux/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/20" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto w-full px-6 md:px-12 pb-12 md:pb-16">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-5">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {a.kicker}
          </div>
          <h1
            className="text-cream-50 text-4xl sm:text-5xl md:text-6xl leading-[1.02] font-bold"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {a.title}
          </h1>
        </div>
      </header>

      {/* Corps */}
      <div className="max-w-2xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Badge partenaire + logo */}
        <div className="flex items-center gap-4 rounded-lg border border-ink-200 bg-white p-4 mb-10">
          <div className="relative w-20 h-20 shrink-0 rounded-md bg-white ring-1 ring-ink-100 overflow-hidden">
            <Image src="/partners/zip-feux/logo.png" alt="Zip Feux" fill sizes="80px" className="object-contain p-1.5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gold-600">Zip Feux</p>
            <p className="text-ink-700 text-sm">{a.badge}</p>
          </div>
        </div>

        <p className="text-ink-800 text-lg md:text-xl leading-relaxed font-medium mb-10">{a.lead}</p>

        {a.sections.map((s, i) => (
          <section key={i} className="mb-10">
            <h2
              className="text-ink-900 text-2xl md:text-3xl font-bold leading-tight mb-4"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {s.h}
            </h2>
            {s.p.map((para, j) => (
              <p key={j} className="text-ink-700 leading-relaxed mb-4">
                {para}
              </p>
            ))}
            {s.list && (
              <ul className="flex flex-col gap-2 mt-2">
                {s.list.map((li, k) => (
                  <li key={k} className="flex gap-3 text-ink-700 leading-relaxed">
                    <span className="mt-2 inline-block w-1.5 h-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Visuel gamme après la section "gamme" (index 2) */}
            {i === 2 && (
              <figure className="mt-8">
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-white ring-1 ring-ink-100">
                  <Image
                    src="/partners/zip-feux/produits.png"
                    alt={a.productsCaption}
                    fill
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-contain p-4"
                  />
                </div>
                <figcaption className="mt-2 text-center text-ink-500 text-sm">{a.productsCaption}</figcaption>
              </figure>
            )}
          </section>
        ))}

        {/* Citation */}
        <blockquote className="my-12 border-l-4 border-gold-500 pl-6">
          <p
            className="text-ink-900 text-xl md:text-2xl leading-snug italic"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            « {a.quote} »
          </p>
          <footer className="mt-3 text-sm font-bold uppercase tracking-widest text-gold-700">
            {a.quoteAuthor}
          </footer>
        </blockquote>

        {/* CTA */}
        <div className="rounded-lg bg-ink-950 text-cream-50 p-7 md:p-9">
          <h2
            className="text-2xl md:text-3xl font-bold leading-tight"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {a.ctaTitle}
          </h2>
          <p className="mt-3 text-cream-50/80 leading-relaxed">{a.ctaText}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/grill-arena"
              className="group inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
            >
              {a.ctaArena}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </Link>
            <Link
              href="/presentation-exposants"
              className="group inline-flex items-center justify-center gap-2 border border-cream-50/30 hover:border-gold-500 text-cream-50 hover:text-gold-500 px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
            >
              {a.ctaExpo}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* Maillage écosystème */}
        <div className="mt-10">
          <EcosystemLinks locale={locale} items={["mag"]} title={a.more} />
        </div>
      </div>
    </article>
  );
}
