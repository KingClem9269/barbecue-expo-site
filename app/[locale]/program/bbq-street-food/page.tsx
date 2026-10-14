import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";
import EcosystemLinks from "@/components/ecosystem/EcosystemLinks";

type Restaurateur = {
  slug: string;
  name: string;
  country: string;
  region: string;
  cuisine: string;
  description: string;
  image: string;
  // Force le continent d'affichage (sinon déduit du pays). Utile pour les
  // cuisines de style américain portées par des restaurateurs FR.
  continent?: "americas" | "asia" | "europe";
};

const RESTAURATEURS: Restaurateur[] = [
  { slug: "selva", name: "Selva", country: "ar", region: "Argentine", cuisine: "Asado patagonien", description: "Côtes longues, sel gros, feu de bois patient. La tradition gauchista intacte.", image: "/photos-2026/bbq-expo-073.jpg" },
  { slug: "h-o-m-steakhouse", name: "H.O.M. Steakhouse", country: "us", region: "Texas", cuisine: "Brisket low & slow", description: "Smoker offset, bois de pecan, 14 heures de patience pour une seule pièce. Le Texas, vraiment.", image: "/photos-2026/bbq-expo-184.jpg" },
  { slug: "le-boukane", name: "Le Boukane", country: "fr", region: "Réunion", cuisine: "Carry péï", description: "Marinades créoles, viandes fumées au boucan. Le BBQ insulaire dans toute sa générosité.", image: "/photos-2026/bbq-expo-105.jpg", continent: "americas" },
  { slug: "nicky-s-bbq", name: "Nicky's BBQ", country: "us", region: "Caroline du Sud", cuisine: "Pulled pork & vinegar sauce", description: "Le sandwich qui a fait l'histoire du BBQ américain. Vinaigre, piment, brioche.", image: "/photos-2026/bbq-expo-403.jpg" },
  { slug: "villa-marthe", name: "Villa Marthe", country: "fr", region: "Provence", cuisine: "Méditerranée au feu de bois", description: "Côtelettes d'agneau, légumes braisés, herbes du jardin. Le Sud français à la flamme.", image: "/photos-2026/bbq-expo-688.jpg" },
  { slug: "le-cochon-voyageur", name: "Le Cochon Voyageur", country: "fr", region: "Toulouse", cuisine: "Cochon entier", description: "Bête entière, broche lente, sauce de cuisson. Une seule recette, perfectionnée.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg" },
  { slug: "atelier-du-brasero", name: "Atelier du Brasero", country: "fr", region: "Paris", cuisine: "Cuisson au brasero", description: "Cuisson sur feu vif sur OFYR. Légumes carbonisés, viande à la flamme directe. Showroom du brasero.", image: "/photos-2026/bbq-expo-073.jpg" },
  { slug: "chango", name: "Chango", country: "ar", region: "Buenos Aires", cuisine: "Empanadas & parrilla", description: "L'apéro porteño et l'asado des chefs. Une parenthèse argentine au cœur de Paris.", image: "/photos-2026/bbq-expo-403.jpg" },
  { slug: "melt", name: "Melt", country: "fr", region: "Paris", cuisine: "Smoked meats USA", description: "Brisket, ribs, sandwich pulled. La référence parisienne du BBQ américain.", image: "/photos-2026/bbq-expo-184.jpg", continent: "americas" },
  { slug: "au-feu-le-saumon", name: "Au Feu Le Saumon", country: "fr", region: "Bretagne", cuisine: "Saumon fumé minute", description: "Saumon labellisé, fumage à la flamme, marinade aux herbes bretonnes. La mer dans le feu.", image: "/photos-2026/bbq-expo-720.jpg" },
  { slug: "a-feu-lent", name: "A Feu Lent", country: "fr", region: "Lyon", cuisine: "Charcuterie fumée", description: "Saucisses fumées, pancetta maison, jambon de pays. La pâte qu'on prend.", image: "/photos-2026/bbq-expo-688.jpg" },
  { slug: "pny", name: "PNY", country: "fr", region: "Paris", cuisine: "Smashed burger", description: "Le burger de référence à Paris. Pain brioche, sauce maison, frites cuites au gras.", image: "/photos-2026/bbq-expo-105.jpg", continent: "americas" },
  { slug: "marche-noir", name: "Marché Noir", country: "fr", region: "Paris", cuisine: "Sandwich BBQ", description: "Sandwiches inspirés des Etats-Unis, viandes fumées, sauces maison.", image: "/photos-2026/bbq-expo-184.jpg", continent: "americas" },
  { slug: "soon-grill", name: "Soon Grill", country: "kr", region: "Séoul", cuisine: "Korean BBQ", description: "Bulgogi, galbi, samgyeopsal. La marinade soja-poire-sésame qui change tout.", image: "/photos-2026/bbq-expo-403.jpg" },
];

type Loc = "en" | "es" | "de" | "nl" | "pt" | "it";
type RT = { region?: string; cuisine?: string; description: string };

/** Traductions des fiches restaurateurs (clé = slug). Les noms restent tels quels. */
const RESTO_T: Record<string, Record<Loc, RT>> = {
  selva: {
    en: { region: "Argentina", cuisine: "Patagonian asado", description: "Long ribs, coarse salt, patient wood fire. The gaucho tradition, intact." },
    es: { region: "Argentina", cuisine: "Asado patagónico", description: "Costillas largas, sal gruesa, fuego de leña paciente. La tradición gaucha intacta." },
    de: { region: "Argentinien", cuisine: "Patagonisches Asado", description: "Lange Rippen, grobes Salz, geduldiges Holzfeuer. Die Gaucho-Tradition, unverfälscht." },
    nl: { region: "Argentinië", cuisine: "Patagonische asado", description: "Lange ribben, grof zout, geduldig houtvuur. De gaucho-traditie, ongerept." },
    pt: { region: "Argentina", cuisine: "Asado patagónico", description: "Costelas longas, sal grosso, fogo de lenha paciente. A tradição gaúcha intacta." },
    it: { region: "Argentina", cuisine: "Asado patagonico", description: "Costine lunghe, sale grosso, fuoco di legna paziente. La tradizione gaucha intatta." },
  },
  "h-o-m-steakhouse": {
    en: { description: "Offset smoker, pecan wood, 14 hours of patience for a single cut. Texas, for real." },
    es: { description: "Ahumador offset, madera de pecana, 14 horas de paciencia para una sola pieza. Texas de verdad." },
    de: { description: "Offset-Smoker, Pekannussholz, 14 Stunden Geduld für ein einziges Stück. Texas, wirklich." },
    nl: { description: "Offset-smoker, pecanhout, 14 uur geduld voor één stuk vlees. Echt Texas." },
    pt: { description: "Defumador offset, madeira de nogueira-pecã, 14 horas de paciência para uma única peça. O Texas, a sério." },
    it: { description: "Smoker offset, legno di noce pecan, 14 ore di pazienza per un solo pezzo. Il Texas, davvero." },
  },
  "le-boukane": {
    en: { region: "Réunion Island", description: "Creole marinades, meats smoked over the boucan. Island BBQ in all its generosity." },
    es: { region: "Isla de la Reunión", description: "Marinadas criollas, carnes ahumadas al boucan. La BBQ isleña en toda su generosidad." },
    de: { region: "La Réunion", description: "Kreolische Marinaden, über dem Boucan geräuchertes Fleisch. Insel-BBQ in all seiner Großzügigkeit." },
    nl: { region: "Réunion", description: "Creoolse marinades, vlees gerookt boven de boucan. Eiland-BBQ in al zijn gulheid." },
    pt: { region: "Ilha da Reunião", description: "Marinadas crioulas, carnes fumadas no boucan. O BBQ insular em toda a sua generosidade." },
    it: { region: "Isola della Riunione", description: "Marinate creole, carni affumicate al boucan. Il BBQ isolano in tutta la sua generosità." },
  },
  "nicky-s-bbq": {
    en: { region: "South Carolina", description: "The sandwich that made American BBQ history. Vinegar, chilli, brioche." },
    es: { region: "Carolina del Sur", description: "El sándwich que hizo historia en la BBQ americana. Vinagre, guindilla, brioche." },
    de: { region: "South Carolina", description: "Das Sandwich, das amerikanische BBQ-Geschichte schrieb. Essig, Chili, Brioche." },
    nl: { region: "South Carolina", description: "Het broodje dat Amerikaanse BBQ-geschiedenis schreef. Azijn, chili, brioche." },
    pt: { region: "Carolina do Sul", description: "A sandes que fez a história do BBQ americano. Vinagre, malagueta, brioche." },
    it: { region: "Carolina del Sud", description: "Il panino che ha fatto la storia del BBQ americano. Aceto, peperoncino, brioche." },
  },
  "villa-marthe": {
    en: { cuisine: "Wood-fired Mediterranean", description: "Lamb chops, braised vegetables, garden herbs. The South of France over the flame." },
    es: { region: "Provenza", cuisine: "Mediterráneo a la leña", description: "Chuletas de cordero, verduras braseadas, hierbas del huerto. El sur de Francia a la llama." },
    de: { region: "Provence", cuisine: "Mittelmeerküche vom Holzfeuer", description: "Lammkoteletts, geschmortes Gemüse, Gartenkräuter. Südfrankreich über der Flamme." },
    nl: { cuisine: "Mediterraans op houtvuur", description: "Lamskoteletten, gestoofde groenten, tuinkruiden. Zuid-Frankrijk boven de vlam." },
    pt: { region: "Provença", cuisine: "Mediterrâneo em fogo de lenha", description: "Costeletas de borrego, legumes estufados, ervas da horta. O sul de França na chama." },
    it: { region: "Provenza", cuisine: "Mediterraneo a legna", description: "Costolette d'agnello, verdure brasate, erbe dell'orto. Il Sud della Francia alla fiamma." },
  },
  "le-cochon-voyageur": {
    en: { cuisine: "Whole hog", description: "Whole animal, slow spit, basting sauce. A single recipe, perfected." },
    es: { cuisine: "Cerdo entero", description: "Animal entero, asador lento, salsa de cocción. Una sola receta, perfeccionada." },
    de: { cuisine: "Ganzes Schwein", description: "Ganzes Tier, langsamer Spieß, Bratensauce. Ein einziges Rezept, perfektioniert." },
    nl: { cuisine: "Heel varken", description: "Heel dier, langzaam aan het spit, braadsaus. Eén recept, geperfectioneerd." },
    pt: { cuisine: "Porco inteiro", description: "Animal inteiro, espeto lento, molho de assadura. Uma só receita, aperfeiçoada." },
    it: { cuisine: "Maiale intero", description: "Animale intero, spiedo lento, salsa di cottura. Una sola ricetta, perfezionata." },
  },
  "atelier-du-brasero": {
    en: { cuisine: "Brasero cooking", description: "High-heat cooking on OFYR. Charred vegetables, meat over direct flame. The brasero showroom." },
    es: { cuisine: "Cocina al brasero", description: "Cocción a fuego vivo sobre OFYR. Verduras carbonizadas, carne a la llama directa. Showroom del brasero." },
    de: { cuisine: "Kochen auf dem Brasero", description: "Garen auf starker Flamme auf OFYR. Geröstetes Gemüse, Fleisch über direkter Flamme. Brasero-Showroom." },
    nl: { cuisine: "Koken op de brasero", description: "Koken op hoog vuur op OFYR. Geblakerde groenten, vlees op directe vlam. Brasero-showroom." },
    pt: { cuisine: "Cozinha no braseiro", description: "Cozedura em fogo vivo sobre OFYR. Legumes carbonizados, carne na chama direta. Showroom do braseiro." },
    it: { cuisine: "Cottura al braciere", description: "Cottura a fiamma viva su OFYR. Verdure carbonizzate, carne a fiamma diretta. Showroom del braciere." },
  },
  chango: {
    en: { description: "The porteño aperitivo and the chefs' asado. An Argentine interlude in the heart of Paris." },
    es: { description: "El aperitivo porteño y el asado de los chefs. Un paréntesis argentino en el corazón de París." },
    de: { description: "Der Porteño-Aperitif und das Asado der Köche. Ein argentinisches Intermezzo mitten in Paris." },
    nl: { description: "Het porteño-aperitief en de asado van de chefs. Een Argentijns intermezzo in het hart van Parijs." },
    pt: { description: "O aperitivo portenho e o asado dos chefs. Um parêntese argentino no coração de Paris." },
    it: { description: "L'aperitivo porteño e l'asado degli chef. Una parentesi argentina nel cuore di Parigi." },
  },
  melt: {
    en: { description: "Brisket, ribs, pulled sandwich. Paris's benchmark for American BBQ." },
    es: { description: "Brisket, ribs, sándwich pulled. La referencia parisina de la BBQ americana." },
    de: { description: "Brisket, Ribs, Pulled-Sandwich. Die Pariser Referenz für amerikanisches BBQ." },
    nl: { description: "Brisket, ribs, pulled sandwich. Dé Parijse referentie voor Amerikaanse BBQ." },
    pt: { description: "Brisket, ribs, sandes pulled. A referência parisiense do BBQ americano." },
    it: { description: "Brisket, ribs, panino pulled. Il riferimento parigino del BBQ americano." },
  },
  "au-feu-le-saumon": {
    en: { region: "Brittany", cuisine: "Quick-smoked salmon", description: "Label-certified salmon, flame-smoked, marinated in Breton herbs. The sea in the fire." },
    es: { region: "Bretaña", cuisine: "Salmón ahumado al momento", description: "Salmón con sello de calidad, ahumado a la llama, marinada de hierbas bretonas. El mar en el fuego." },
    de: { region: "Bretagne", cuisine: "Frisch geräucherter Lachs", description: "Lachs mit Gütesiegel, flammengeräuchert, mit bretonischen Kräutern mariniert. Das Meer im Feuer." },
    nl: { region: "Bretagne", cuisine: "Snelgerookte zalm", description: "Keurmerkzalm, met de vlam gerookt, gemarineerd in Bretonse kruiden. De zee in het vuur." },
    pt: { region: "Bretanha", cuisine: "Salmão fumado na hora", description: "Salmão certificado, fumado na chama, marinada de ervas bretãs. O mar no fogo." },
    it: { region: "Bretagna", cuisine: "Salmone affumicato al momento", description: "Salmone certificato, affumicato alla fiamma, marinato alle erbe bretoni. Il mare nel fuoco." },
  },
  "a-feu-lent": {
    en: { region: "Lyon", cuisine: "Smoked charcuterie", description: "Smoked sausages, house-made pancetta, country ham. The kind you keep coming back for." },
    es: { region: "Lyon", cuisine: "Embutidos ahumados", description: "Salchichas ahumadas, panceta casera, jamón del país. De los que repites." },
    de: { region: "Lyon", cuisine: "Geräucherte Wurstwaren", description: "Geräucherte Würste, hausgemachte Pancetta, Landschinken. Davon will man mehr." },
    nl: { region: "Lyon", cuisine: "Gerookte charcuterie", description: "Gerookte worsten, huisgemaakte pancetta, boerenham. Daar kom je voor terug." },
    pt: { region: "Lyon", cuisine: "Charcutaria fumada", description: "Salsichas fumadas, pancetta caseira, presunto da terra. Do que se repete." },
    it: { region: "Lione", cuisine: "Salumi affumicati", description: "Salsicce affumicate, pancetta della casa, prosciutto di campagna. Di quelli che si ripetono." },
  },
  pny: {
    en: { description: "The benchmark burger in Paris. Brioche bun, house sauce, fries cooked in beef fat." },
    es: { description: "La hamburguesa de referencia en París. Pan brioche, salsa casera, patatas fritas en grasa." },
    de: { description: "Der Referenz-Burger in Paris. Brioche-Bun, hausgemachte Sauce, in Fett frittierte Pommes." },
    nl: { description: "Dé referentieburger van Parijs. Briochebroodje, huisgemaakte saus, frietjes in vet gebakken." },
    pt: { description: "O hambúrguer de referência em Paris. Pão brioche, molho caseiro, batatas fritas em gordura." },
    it: { description: "Il burger di riferimento a Parigi. Pane brioche, salsa della casa, patatine fritte nel grasso." },
  },
  "marche-noir": {
    en: { cuisine: "BBQ sandwich", description: "US-inspired sandwiches, smoked meats, house sauces." },
    es: { cuisine: "Sándwich BBQ", description: "Sándwiches inspirados en Estados Unidos, carnes ahumadas, salsas caseras." },
    de: { cuisine: "BBQ-Sandwich", description: "Von den USA inspirierte Sandwiches, geräuchertes Fleisch, hausgemachte Saucen." },
    nl: { cuisine: "BBQ-sandwich", description: "Door de VS geïnspireerde sandwiches, gerookt vlees, huisgemaakte sauzen." },
    pt: { cuisine: "Sandes BBQ", description: "Sandes inspiradas nos Estados Unidos, carnes fumadas, molhos caseiros." },
    it: { cuisine: "Panino BBQ", description: "Panini ispirati agli Stati Uniti, carni affumicate, salse della casa." },
  },
  "soon-grill": {
    en: { region: "Seoul", description: "Bulgogi, galbi, samgyeopsal. The soy-pear-sesame marinade that changes everything." },
    es: { region: "Seúl", description: "Bulgogi, galbi, samgyeopsal. La marinada de soja, pera y sésamo que lo cambia todo." },
    de: { region: "Seoul", description: "Bulgogi, Galbi, Samgyeopsal. Die Soja-Birnen-Sesam-Marinade, die alles verändert." },
    nl: { region: "Seoul", description: "Bulgogi, galbi, samgyeopsal. De soja-peer-sesammarinade die alles verandert." },
    pt: { region: "Seul", description: "Bulgogi, galbi, samgyeopsal. A marinada de soja, pera e sésamo que muda tudo." },
    it: { region: "Seul", description: "Bulgogi, galbi, samgyeopsal. La marinata soia-pera-sesamo che cambia tutto." },
  },
};

type UIT = {
  eyebrow: string; h1a: string; h1b: string; h1c: string; intro: string;
  regions: Record<"americas" | "asia" | "europe", { title: string; body: string }>;
  cta1: string; cta2: string; metaDesc: string;
};

const UI: Record<string, UIT> = {
  fr: {
    eyebrow: "BBQ Street Food · Édition 2027",
    h1a: "Le BBQ ", h1b: "du monde", h1c: ", sous une seule tente.",
    intro: "Quatorze restaurateurs sélectionnés. Argentine, Texas, Corée, Provence, Bretagne, Caroline du Sud. Pas de chaîne, pas de food truck générique — uniquement des passionnés qui défendent leur région et leur tradition. Trois jours pour faire un tour du monde sans bouger.",
    regions: {
      americas: { title: "Les Amériques", body: "L'asado argentin, le brisket texan, le pulled pork de Caroline. Le continent qui a élevé le BBQ au rang d'art national." },
      asia: { title: "L'Asie", body: "Marinades complexes, cuissons rapides, côtés ciselés. Une autre philosophie du feu, qui se fait redécouvrir en Europe." },
      europe: { title: "L'Europe", body: "Provence, Bretagne, Toulouse, Réunion, Lyon, Paris. Le BBQ français contemporain et ses voisins. Une scène qui a énormément évolué en cinq ans." },
    },
    cta1: "Réserver ma place",
    cta2: "Voir tout le programme",
    metaDesc: "16 restaurateurs sélectionnés. Le BBQ du monde entier, en un seul lieu, pendant trois jours.",
  },
  en: {
    eyebrow: "BBQ Street Food · 2027 Edition",
    h1a: "The world's ", h1b: "BBQ", h1c: ", under one tent.",
    intro: "Fourteen hand-picked restaurateurs. Argentina, Texas, Korea, Provence, Brittany, South Carolina. No chains, no generic food trucks — only passionate cooks standing up for their region and their tradition. Three days to travel the world without moving.",
    regions: {
      americas: { title: "The Americas", body: "Argentine asado, Texas brisket, Carolina pulled pork. The continent that raised BBQ to a national art." },
      asia: { title: "Asia", body: "Complex marinades, quick cooking, finely cut sides. Another philosophy of fire, being rediscovered in Europe." },
      europe: { title: "Europe", body: "Provence, Brittany, Toulouse, Réunion, Lyon, Paris. Contemporary French BBQ and its neighbours. A scene that has changed enormously in five years." },
    },
    cta1: "Book my place",
    cta2: "See the full programme",
    metaDesc: "16 hand-picked restaurateurs. BBQ from around the world, in one place, for three days.",
  },
  es: {
    eyebrow: "BBQ Street Food · Edición 2027",
    h1a: "La BBQ ", h1b: "del mundo", h1c: ", bajo una sola carpa.",
    intro: "Catorce restauradores seleccionados. Argentina, Texas, Corea, Provenza, Bretaña, Carolina del Sur. Sin cadenas, sin food trucks genéricos: solo apasionados que defienden su región y su tradición. Tres días para dar la vuelta al mundo sin moverse.",
    regions: {
      americas: { title: "Las Américas", body: "El asado argentino, el brisket texano, el pulled pork de Carolina. El continente que elevó la BBQ a arte nacional." },
      asia: { title: "Asia", body: "Marinadas complejas, cocciones rápidas, guarniciones finamente cortadas. Otra filosofía del fuego, que Europa está redescubriendo." },
      europe: { title: "Europa", body: "Provenza, Bretaña, Toulouse, Reunión, Lyon, París. La BBQ francesa contemporánea y sus vecinos. Una escena que ha evolucionado enormemente en cinco años." },
    },
    cta1: "Reservar mi plaza",
    cta2: "Ver todo el programa",
    metaDesc: "16 restauradores seleccionados. La BBQ de todo el mundo, en un solo lugar, durante tres días.",
  },
  de: {
    eyebrow: "BBQ Street Food · Ausgabe 2027",
    h1a: "Das BBQ ", h1b: "der Welt", h1c: ", unter einem Zelt.",
    intro: "Vierzehn ausgewählte Gastronomen. Argentinien, Texas, Korea, Provence, Bretagne, South Carolina. Keine Ketten, keine austauschbaren Foodtrucks — nur Leidenschaftliche, die ihre Region und ihre Tradition verteidigen. Drei Tage, um die Welt zu bereisen, ohne sich zu bewegen.",
    regions: {
      americas: { title: "Amerika", body: "Argentinisches Asado, texanisches Brisket, Pulled Pork aus Carolina. Der Kontinent, der BBQ zur Nationalkunst erhoben hat." },
      asia: { title: "Asien", body: "Komplexe Marinaden, schnelles Garen, fein geschnittene Beilagen. Eine andere Philosophie des Feuers, die Europa neu entdeckt." },
      europe: { title: "Europa", body: "Provence, Bretagne, Toulouse, Réunion, Lyon, Paris. Zeitgenössisches französisches BBQ und seine Nachbarn. Eine Szene, die sich in fünf Jahren enorm entwickelt hat." },
    },
    cta1: "Meinen Platz buchen",
    cta2: "Das ganze Programm ansehen",
    metaDesc: "16 ausgewählte Gastronomen. BBQ aus der ganzen Welt, an einem Ort, drei Tage lang.",
  },
  nl: {
    eyebrow: "BBQ Street Food · Editie 2027",
    h1a: "De BBQ ", h1b: "van de wereld", h1c: ", onder één tent.",
    intro: "Veertien geselecteerde restaurateurs. Argentinië, Texas, Korea, Provence, Bretagne, South Carolina. Geen ketens, geen standaard foodtrucks — alleen gepassioneerden die hun regio en traditie verdedigen. Drie dagen om de wereld rond te reizen zonder te bewegen.",
    regions: {
      americas: { title: "Amerika", body: "Argentijnse asado, Texaanse brisket, pulled pork uit Carolina. Het continent dat BBQ tot nationale kunst verhief." },
      asia: { title: "Azië", body: "Complexe marinades, snelle bereidingen, fijngesneden bijgerechten. Een andere filosofie van het vuur, die Europa herontdekt." },
      europe: { title: "Europa", body: "Provence, Bretagne, Toulouse, Réunion, Lyon, Parijs. De hedendaagse Franse BBQ en zijn buren. Een scène die in vijf jaar enorm is geëvolueerd." },
    },
    cta1: "Mijn plaats reserveren",
    cta2: "Bekijk het hele programma",
    metaDesc: "16 geselecteerde restaurateurs. BBQ uit de hele wereld, op één plek, drie dagen lang.",
  },
  pt: {
    eyebrow: "BBQ Street Food · Edição 2027",
    h1a: "O BBQ ", h1b: "do mundo", h1c: ", debaixo de uma só tenda.",
    intro: "Catorze restauradores selecionados. Argentina, Texas, Coreia, Provença, Bretanha, Carolina do Sul. Sem cadeias, sem food trucks genéricos — apenas apaixonados que defendem a sua região e a sua tradição. Três dias para dar a volta ao mundo sem sair do lugar.",
    regions: {
      americas: { title: "As Américas", body: "O asado argentino, o brisket texano, o pulled pork da Carolina. O continente que elevou o BBQ a arte nacional." },
      asia: { title: "A Ásia", body: "Marinadas complexas, cozeduras rápidas, acompanhamentos finamente cortados. Outra filosofia do fogo, que a Europa está a redescobrir." },
      europe: { title: "A Europa", body: "Provença, Bretanha, Toulouse, Reunião, Lyon, Paris. O BBQ francês contemporâneo e os seus vizinhos. Uma cena que evoluiu enormemente em cinco anos." },
    },
    cta1: "Reservar o meu lugar",
    cta2: "Ver todo o programa",
    metaDesc: "16 restauradores selecionados. O BBQ do mundo inteiro, num só lugar, durante três dias.",
  },
  it: {
    eyebrow: "BBQ Street Food · Edizione 2027",
    h1a: "Il BBQ ", h1b: "del mondo", h1c: ", sotto un'unica tenda.",
    intro: "Quattordici ristoratori selezionati. Argentina, Texas, Corea, Provenza, Bretagna, Carolina del Sud. Niente catene, niente food truck generici — solo appassionati che difendono la loro regione e la loro tradizione. Tre giorni per fare il giro del mondo senza muoversi.",
    regions: {
      americas: { title: "Le Americhe", body: "L'asado argentino, il brisket texano, il pulled pork della Carolina. Il continente che ha elevato il BBQ ad arte nazionale." },
      asia: { title: "L'Asia", body: "Marinate complesse, cotture rapide, contorni tagliati finemente. Un'altra filosofia del fuoco, che l'Europa sta riscoprendo." },
      europe: { title: "L'Europa", body: "Provenza, Bretagna, Tolosa, Riunione, Lione, Parigi. Il BBQ francese contemporaneo e i suoi vicini. Una scena che si è evoluta enormemente in cinque anni." },
    },
    cta1: "Prenota il mio posto",
    cta2: "Vedi tutto il programma",
    metaDesc: "16 ristoratori selezionati. Il BBQ di tutto il mondo, in un solo luogo, per tre giorni.",
  },
};

function localize(r: Restaurateur, locale: string): Restaurateur {
  const t = RESTO_T[r.slug]?.[locale as Loc];
  if (!t) return r;
  return { ...r, region: t.region ?? r.region, cuisine: t.cuisine ?? r.cuisine, description: t.description };
}

const REGIONS = [
  { slug: "all", label: "Tout voir", count: RESTAURATEURS.length },
  { slug: "americas", label: "Amériques", filter: ["us", "ar"] },
  { slug: "asia", label: "Asie", filter: ["kr", "jp"] },
  { slug: "europe", label: "Europe", filter: ["fr", "es", "it", "gb", "de"] },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, "/program/bbq-street-food", {
    title: "BBQ Street Food — Barbecue Expo 2027",
    description: (UI[locale] || UI.fr).metaDesc,
  });
}

export default async function StreetFoodPage() {
  const locale = await getLocale();
  const t = UI[locale] || UI.fr;
  const list = RESTAURATEURS.map((r) => localize(r, locale));

  // Continent d'affichage : override explicite, sinon déduit du pays.
  const continentOf = (r: Restaurateur): "americas" | "asia" | "europe" =>
    r.continent ??
    (["us", "ar"].includes(r.country)
      ? "americas"
      : ["kr", "jp"].includes(r.country)
        ? "asia"
        : "europe");

  // Group by region
  const byRegion = {
    americas: list.filter((r) => continentOf(r) === "americas"),
    asia: list.filter((r) => continentOf(r) === "asia"),
    europe: list.filter((r) => continentOf(r) === "europe"),
  };

  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="relative w-full min-h-[70dvh] overflow-hidden bg-ink-950">
        <Image
          src="/photos-2026/bbq-expo-720.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col justify-end min-h-[70dvh]">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {t.eyebrow}
          </div>
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.92] font-bold max-w-5xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {t.h1a}<span className="text-gold-500">{t.h1b}</span>{t.h1c}
          </h1>
          <p className="mt-10 text-cream-50/90 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Regions */}
      {[
        { key: "americas", ...t.regions.americas, list: byRegion.americas },
        { key: "asia", ...t.regions.asia, list: byRegion.asia },
        { key: "europe", ...t.regions.europe, list: byRegion.europe },
      ].map((region) => (
        <section key={region.key} className="py-12 md:py-16 first:pt-0">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12">
              <h2
                className="lg:col-span-7 text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-[0.95] font-bold"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {region.title}
              </h2>
              <p className="lg:col-span-5 text-ink-600 text-base md:text-lg leading-relaxed">
                {region.body}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {region.list.map((r) => (
                <Link
                  key={r.slug}
                  href={`/program/bbq-street-food/${r.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden bg-char-800 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent opacity-90"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end text-cream-50">
                    <div className="flex items-center gap-2 mb-2 text-[11px] md:text-xs uppercase tracking-widest text-cream-50/80">
                      <Image
                        src={`/flags/${r.country}.svg`}
                        alt=""
                        width={12}
                        height={12}
                        className="w-3 h-3 rounded-full object-cover"
                      />
                      <span>{r.region}</span>
                    </div>
                    <h3
                      className="text-2xl md:text-3xl leading-tight font-bold mb-1"
                      style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                    >
                      {r.name}
                    </h3>
                    <p className="text-gold-500 text-xs md:text-sm font-semibold uppercase tracking-widest mb-2">
                      {r.cuisine}
                    </p>
                    <p className="text-cream-50/80 text-sm leading-relaxed line-clamp-2">
                      {r.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-cream-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row gap-4">
          <Link
            href="/billetterie"
            className="group inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>{t.cta1}</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
          </Link>
          <Link
            href="/programme"
            className="group inline-flex items-center gap-4 border border-ink-900/30 hover:border-gold-500 text-ink-900 hover:text-gold-700 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>{t.cta2}</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2} />
          </Link>
        </div>
      </section>

      <section className="bg-cream-100 pb-12 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <EcosystemLinks locale={locale} items={["fest", "mag"]} />
        </div>
      </section>
    </div>
  );
}
