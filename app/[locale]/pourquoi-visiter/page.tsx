import EditorialManifesto from "@/components/editorial/EditorialManifesto";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";

const CONTENT: Record<string, Parameters<typeof EditorialManifesto>[0]> = {
  fr: {
    eyebrow: "Pour le grand public · Édition 2027",
    heroImage: "/photos-2026/bbq-expo-403.jpg",
    heroTitle: { line1: "Cinq raisons", line2_highlight: "d'être", line3: "à Paris en mars." },
    heroSubtitle:
      "On ne vient pas à Barbecue Expo par hasard. On y vient parce qu'on n'en est pas à son premier feu, parce qu'on cherche le bon kamado, parce qu'on veut goûter, comparer, apprendre. Voici ce qu'on y trouve.",
    reasons: [
      {
        number: "01",
        title: "Voir 200+ marques en trois jours.",
        body: "Weber, Traeger, Kamado Joe, OFYR, Big Green Egg, Monolith, Napoleon, Broil King — et 190 autres. C'est le seul endroit en Europe où vous pouvez tout comparer côte à côte, demander des conseils techniques aux concepteurs, tester avant d'acheter. Un trimestre de recherches gagné.",
        image: "/photos-2026/bbq-expo-184.jpg",
      },
      {
        number: "02",
        title: "Apprendre avec les meilleurs pitmasters.",
        body: "Vingt pitmasters internationaux. Douze masterclasses en petit comité, vingt places maximum. Ils viennent du Texas, de Buenos Aires, de Tokyo, de Florence. Ils enseignent ce qu'ils ne mettent jamais sur Instagram. Trois jours pour progresser autant qu'en deux ans seul devant son grill.",
        image: "/photos-2026/bbq-expo-105.jpg",
      },
      {
        number: "03",
        title: "Manger, vraiment manger.",
        body: "Quatorze restaurateurs de street food BBQ sélectionnés. Brisket texan, asado argentin, yakitori japonais, bulgogi coréen, bistecca toscane. Vous arrivez en connaisseur, vous repartez avec trois nouvelles obsessions et l'envie de refaire à la maison.",
        image: "/photos-2026/bbq-expo-720.jpg",
      },
      {
        number: "04",
        title: "Voir Grill Arena en direct.",
        body: "Pour la première fois en 2027, le format battle. Seize pitmasters s'affrontent en duel pendant 90 minutes. Mêmes braises, même viande, même temps. Un jury, un titre, une seule arène. Trois soirs de spectacle culinaire qui n'existe nulle part ailleurs.",
        image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg",
      },
      {
        number: "05",
        title: "Repartir avec ce qu'il vous faut.",
        body: "Beaucoup de marques font du salon une vitrine. Chez Barbecue Expo, on peut acheter sur place. Tarifs salon, conseils du concepteur, livraison à la maison. Vous repartez avec votre futur grill ou votre nouveau couteau, pas seulement avec une carte de visite.",
        image: "/photos-2026/bbq-expo-008.jpg",
      },
    ],
    cta: { label: "Réserver ma place", href: "/billetterie/particulier" },
    ctaSecondary: { label: "Voir le programme complet", href: "/programme" },
    closingQuote:
      "Trois jours au Parc Floral. Le feu, la braise, l'Europe. Tout ce qu'il faut savoir sur le BBQ, en un seul endroit.",
  },
  en: {
    eyebrow: "For the public · 2027 edition",
    heroImage: "/photos-2026/bbq-expo-403.jpg",
    heroTitle: { line1: "Five reasons", line2_highlight: "to be", line3: "in Paris this March." },
    heroSubtitle:
      "Nobody comes to Barbecue Expo by accident. They come because they aren't at their first fire, because they're looking for the right kamado, because they want to taste, compare, learn. Here is what's there.",
    reasons: [
      { number: "01", title: "See 200+ brands in three days.", body: "Weber, Traeger, Kamado Joe, OFYR, Big Green Egg, Monolith, Napoleon, Broil King — and 190 others. The only place in Europe where you can compare side by side, ask the designers technical questions, test before you buy. A quarter of research saved.", image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "Learn from the best pitmasters.", body: "Twenty international pitmasters. Twelve masterclasses in small groups, twenty seats max. They come from Texas, Buenos Aires, Tokyo, Florence. They teach what they never put on Instagram. Three days to progress as much as two years alone in front of your grill.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "03", title: "Eat — really eat.", body: "Fourteen curated BBQ street food restaurateurs. Texan brisket, Argentine asado, Japanese yakitori, Korean bulgogi, Tuscan bistecca. You arrive as a connoisseur, you leave with three new obsessions and the urge to redo it all at home.", image: "/photos-2026/bbq-expo-720.jpg" },
      { number: "04", title: "See Grill Arena live.", body: "For the first time in 2027, the battle format. Sixteen pitmasters duel for 90 minutes. Same embers, same meat, same time. One jury, one title, one arena. Three nights of culinary spectacle that exists nowhere else.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg" },
      { number: "05", title: "Leave with what you need.", body: "Many brands turn the show into a window. At Barbecue Expo, you can buy on the spot. Show prices, designer advice, home delivery. You leave with your future grill or new knife, not just a business card.", image: "/photos-2026/bbq-expo-008.jpg" },
    ],
    cta: { label: "Book my ticket", href: "/billetterie/particulier" },
    ctaSecondary: { label: "See the full programme", href: "/programme" },
    closingQuote: "Three days at Parc Floral. The fire, the embers, Europe. Everything you need to know about BBQ, in one place.",
  },
  es: {
    eyebrow: "Para el público · Edición 2027",
    heroImage: "/photos-2026/bbq-expo-403.jpg",
    heroTitle: { line1: "Cinco razones", line2_highlight: "para estar", line3: "en París en marzo." },
    heroSubtitle: "Nadie viene a Barbecue Expo por azar. Se viene porque no se está en el primer fuego, porque se busca el kamado adecuado, porque se quiere probar, comparar, aprender.",
    reasons: [
      { number: "01", title: "Ver 200+ marcas en tres días.", body: "Weber, Traeger, Kamado Joe, OFYR, Big Green Egg y 195 más. El único lugar de Europa donde se puede comparar todo, pedir consejos técnicos a los diseñadores, probar antes de comprar.", image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "Aprender con los mejores pitmasters.", body: "Veinte pitmasters internacionales. Doce masterclasses con veinte plazas máximo. Vienen de Texas, Buenos Aires, Tokio, Florencia. Enseñan lo que nunca cuelgan en Instagram.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "03", title: "Comer, comer de verdad.", body: "Catorce restauradores de street food BBQ seleccionados. Brisket texano, asado argentino, yakitori japonés, bulgogi coreano, bistecca toscana.", image: "/photos-2026/bbq-expo-720.jpg" },
      { number: "04", title: "Ver Grill Arena en directo.", body: "Por primera vez en 2027, el formato battle. Dieciséis pitmasters se enfrentan en duelo durante 90 minutos. Mismas brasas, misma carne. Un jurado, un título, una arena.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg" },
      { number: "05", title: "Llevarse lo que se necesita.", body: "Muchas marcas hacen del salón un escaparate. En Barbecue Expo, se puede comprar in situ. Precios de salón, consejos del diseñador, entrega a domicilio.", image: "/photos-2026/bbq-expo-008.jpg" },
    ],
    cta: { label: "Reservar mi entrada", href: "/billetterie/particulier" },
    ctaSecondary: { label: "Ver el programa completo", href: "/programme" },
    closingQuote: "Tres días en el Parc Floral. El fuego, la brasa, Europa. Todo sobre el BBQ, en un solo lugar.",
  },
  de: {
    eyebrow: "Für das Publikum · Ausgabe 2027",
    heroImage: "/photos-2026/bbq-expo-403.jpg",
    heroTitle: { line1: "Fünf Gründe,", line2_highlight: "im März", line3: "in Paris zu sein." },
    heroSubtitle: "Niemand kommt zufällig zu Barbecue Expo. Man kommt, weil man nicht beim ersten Feuer ist, weil man den richtigen Kamado sucht, weil man probieren, vergleichen, lernen will.",
    reasons: [
      { number: "01", title: "200+ Marken in drei Tagen sehen.", body: "Weber, Traeger, Kamado Joe, OFYR, Big Green Egg und 195 weitere. Der einzige Ort in Europa, an dem Sie alles vergleichen, technische Fragen an die Designer stellen und vor dem Kauf testen können.", image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "Mit den besten Pitmastern lernen.", body: "Zwanzig internationale Pitmaster. Zwölf Masterclasses mit maximal zwanzig Plätzen. Aus Texas, Buenos Aires, Tokio, Florenz. Sie lehren, was sie niemals auf Instagram zeigen.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "03", title: "Essen, wirklich essen.", body: "Vierzehn kuratierte BBQ-Street-Food-Stände. Texanisches Brisket, argentinischer Asado, japanisches Yakitori, koreanischer Bulgogi, toskanische Bistecca.", image: "/photos-2026/bbq-expo-720.jpg" },
      { number: "04", title: "Grill Arena live erleben.", body: "Zum ersten Mal 2027, das Battle-Format. Sechzehn Pitmaster duellieren sich 90 Minuten lang. Gleiche Glut, gleiches Fleisch. Eine Jury, ein Titel, eine Arena.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg" },
      { number: "05", title: "Mit dem nach Hause gehen, was Sie brauchen.", body: "Viele Marken machen die Messe zum Schaufenster. Bei Barbecue Expo können Sie vor Ort kaufen. Messepreise, Beratung vom Designer, Heimlieferung.", image: "/photos-2026/bbq-expo-008.jpg" },
    ],
    cta: { label: "Ticket buchen", href: "/billetterie/particulier" },
    ctaSecondary: { label: "Programm ansehen", href: "/programme" },
    closingQuote: "Drei Tage im Parc Floral. Das Feuer, die Glut, Europa. Alles über BBQ an einem Ort.",
  },
  nl: {
    eyebrow: "Voor het publiek · Editie 2027",
    heroImage: "/photos-2026/bbq-expo-403.jpg",
    heroTitle: { line1: "Vijf redenen", line2_highlight: "om in maart", line3: "in Parijs te zijn." },
    heroSubtitle: "Niemand komt toevallig naar Barbecue Expo. Je komt omdat je niet aan je eerste vuur toe bent, omdat je de juiste kamado zoekt, omdat je wilt proeven, vergelijken, leren.",
    reasons: [
      { number: "01", title: "200+ merken in drie dagen zien.", body: "Weber, Traeger, Kamado Joe, OFYR, Big Green Egg en 195 anderen. De enige plek in Europa waar u alles naast elkaar kunt vergelijken, ontwerpers technische vragen kunt stellen, kunt testen voor u koopt.", image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "Leren met de beste pitmasters.", body: "Twintig internationale pitmasters. Twaalf masterclasses, maximaal twintig plaatsen. Ze komen uit Texas, Buenos Aires, Tokio, Florence. Ze leren wat ze nooit op Instagram zetten.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "03", title: "Eten, écht eten.", body: "Veertien geselecteerde BBQ-street-food-restauranthouders. Texaanse brisket, Argentijnse asado, Japanse yakitori, Koreaanse bulgogi, Toscaanse bistecca.", image: "/photos-2026/bbq-expo-720.jpg" },
      { number: "04", title: "Grill Arena live zien.", body: "Voor het eerst in 2027, het battle-formaat. Zestien pitmasters duelleren 90 minuten lang. Dezelfde gloed, hetzelfde vlees. Eén jury, één titel, één arena.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg" },
      { number: "05", title: "Vertrekken met wat u nodig heeft.", body: "Veel merken maken van de beurs een etalage. Bij Barbecue Expo kunt u ter plaatse kopen. Beursprijzen, advies van de ontwerper, thuislevering.", image: "/photos-2026/bbq-expo-008.jpg" },
    ],
    cta: { label: "Mijn ticket boeken", href: "/billetterie/particulier" },
    ctaSecondary: { label: "Bekijk het programma", href: "/programme" },
    closingQuote: "Drie dagen in het Parc Floral. Het vuur, de gloed, Europa. Alles over BBQ op één plek.",
  },
  pt: {
    eyebrow: "Para o público · Edição 2027",
    heroImage: "/photos-2026/bbq-expo-403.jpg",
    heroTitle: { line1: "Cinco razões", line2_highlight: "para estar", line3: "em Paris em março." },
    heroSubtitle: "Ninguém vem a Barbecue Expo por acaso. Vem-se porque não se está no primeiro fogo, porque se procura o kamado certo, porque se quer provar, comparar, aprender.",
    reasons: [
      { number: "01", title: "Ver 200+ marcas em três dias.", body: "Weber, Traeger, Kamado Joe, OFYR, Big Green Egg e 195 outras. O único lugar na Europa onde se pode comparar lado a lado, fazer perguntas técnicas aos designers, testar antes de comprar.", image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "Aprender com os melhores pitmasters.", body: "Vinte pitmasters internacionais. Doze masterclasses em pequenos grupos. Vêm do Texas, Buenos Aires, Tóquio, Florença. Ensinam o que nunca colocam no Instagram.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "03", title: "Comer, comer a sério.", body: "Catorze restauradores de street food BBQ selecionados. Brisket texano, asado argentino, yakitori japonês, bulgogi coreano, bistecca toscana.", image: "/photos-2026/bbq-expo-720.jpg" },
      { number: "04", title: "Ver Grill Arena ao vivo.", body: "Pela primeira vez em 2027, o formato battle. Dezasseis pitmasters duelam durante 90 minutos. Mesmas brasas, mesma carne. Um júri, um título, uma arena.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg" },
      { number: "05", title: "Sair com o que precisa.", body: "Muitas marcas fazem da feira uma montra. Em Barbecue Expo, pode-se comprar no local. Preços de feira, conselhos do designer, entrega ao domicílio.", image: "/photos-2026/bbq-expo-008.jpg" },
    ],
    cta: { label: "Reservar o meu bilhete", href: "/billetterie/particulier" },
    ctaSecondary: { label: "Ver o programa completo", href: "/programme" },
    closingQuote: "Três dias no Parc Floral. O fogo, a brasa, a Europa. Tudo sobre BBQ, num só lugar.",
  },
  it: {
    eyebrow: "Per il pubblico · Edizione 2027",
    heroImage: "/photos-2026/bbq-expo-403.jpg",
    heroTitle: { line1: "Cinque motivi", line2_highlight: "per essere", line3: "a Parigi in marzo." },
    heroSubtitle: "Nessuno viene a Barbecue Expo per caso. Si viene perché non si è al primo fuoco, perché si cerca il kamado giusto, perché si vuole assaggiare, confrontare, imparare.",
    reasons: [
      { number: "01", title: "Vedere 200+ marchi in tre giorni.", body: "Weber, Traeger, Kamado Joe, OFYR, Big Green Egg e altri 195. L'unico posto in Europa dove si può confrontare tutto, fare domande tecniche ai progettisti, provare prima di comprare.", image: "/photos-2026/bbq-expo-184.jpg" },
      { number: "02", title: "Imparare con i migliori pitmaster.", body: "Venti pitmaster internazionali. Dodici masterclass in piccolo gruppo, venti posti massimo. Vengono dal Texas, Buenos Aires, Tokyo, Firenze. Insegnano ciò che non mettono mai su Instagram.", image: "/photos-2026/bbq-expo-105.jpg" },
      { number: "03", title: "Mangiare, mangiare davvero.", body: "Quattordici ristoratori di BBQ street food selezionati. Brisket texano, asado argentino, yakitori giapponese, bulgogi coreano, bistecca toscana.", image: "/photos-2026/bbq-expo-720.jpg" },
      { number: "04", title: "Vedere Grill Arena dal vivo.", body: "Per la prima volta nel 2027, il formato battle. Sedici pitmaster si sfidano in duello per 90 minuti. Stesse braci, stessa carne. Una giuria, un titolo, un'arena.", image: "/photos-2026/william-plin-jpc-110426-533a3756.jpg" },
      { number: "05", title: "Andarsene con ciò che serve.", body: "Molti marchi fanno della fiera una vetrina. A Barbecue Expo, si può comprare sul posto. Prezzi fiera, consigli del progettista, consegna a casa.", image: "/photos-2026/bbq-expo-008.jpg" },
    ],
    cta: { label: "Prenota il mio biglietto", href: "/billetterie/particulier" },
    ctaSecondary: { label: "Vedi il programma completo", href: "/programme" },
    closingQuote: "Tre giorni al Parc Floral. Il fuoco, la brace, l'Europa. Tutto sul BBQ, in un solo posto.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.fr;
  return buildMetadata(locale, "/pourquoi-visiter", {
    title: "Pourquoi visiter — Barbecue Expo 2027",
    description: c.heroSubtitle,
  });
}

export default async function PourquoiVisiterPage() {
  const locale = await getLocale();
  const c = CONTENT[locale] || CONTENT.fr;
  return <EditorialManifesto {...c} />;
}
