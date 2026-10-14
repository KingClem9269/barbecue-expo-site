import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Train, Car, Bike, Accessibility, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getLocale } from "next-intl/server";

const FR = {
  metaTitle: "Infos pratiques — Barbecue Expo 2027",
  eyebrow: "Édition 2027",
  heroTitle: "Tout pour préparer votre venue.",
  heroParagraph:
    "Trois jours au Parc Floral de Paris, du vendredi 12 au dimanche 14 mars 2027. Voici comment y arriver, à quelle heure, où dormir, où se garer, et tout ce qui aide à passer un bon week-end.",
  daysTitle: "Horaires d'ouverture",
  days: [
    { day: "Vendredi 12 mars", hours: "9h30 — 19h00", note: "Soirée Grill Arena · Round of 16" },
    { day: "Samedi 13 mars", hours: "9h30 — 19h00", note: "Soirée Grill Arena · Quarts & demi-finales" },
    { day: "Dimanche 14 mars", hours: "9h30 — 18h00", note: "Finale Grill Arena en après-midi" },
  ],
  accessEyebrow: "Accès",
  accessTitle: "Comment venir.",
  accessIntro: "Le Parc Floral est au bout de la ligne 1 du métro parisien. Tous les modes sont prévus, y compris en autonomie réduite.",
  modes: [
    {
      icon: "metro",
      title: "Métro",
      detail: "Ligne 1 — station Château de Vincennes (terminus). Sortie 6, suivre la signalétique du Parc Floral. Compter 10 minutes à pied jusqu'à l'entrée.",
    },
    {
      icon: "car",
      title: "Voiture",
      detail: "Parkings du Parc Floral (entrée par la Route de la Pyramide). 2 000 places + 800 places en parking-relais signalé. Tarif 5 € la journée. Recharge VE disponible (12 bornes).",
    },
    {
      icon: "bike",
      title: "Vélo & trottinette",
      detail: "1 200 places de stationnement gratuit à l'entrée principale. Vélib' Métropole : 3 stations à moins de 5 minutes à pied. Pistes cyclables sécurisées depuis Vincennes et Saint-Mandé.",
    },
    {
      icon: "rer",
      title: "RER & Transilien",
      detail: "RER A — station Vincennes (puis bus 56 ou 10 minutes à pied). RER E pour les visiteurs venant de l'Est parisien. Train direct depuis la Gare de l'Est en 25 minutes.",
    },
    {
      icon: "pmr",
      title: "Accessibilité PMR",
      detail: "Entrée et parcours intégralement accessibles. Parking PMR dédié à l'entrée principale (50 places). Borne d'accueil PMR à l'entrée. Fauteuils en prêt sur demande gratuite.",
    },
  ],
  hotelsTitle: "Où dormir.",
  hotelsBody:
    "Notre partenaire hôtellerie Revolugo négocie des tarifs préférentiels pour les visiteurs Barbecue Expo. Hôtels à 10-30 minutes du Parc Floral, en métro direct.",
  hotelsCta: "Voir les hôtels partenaires",
  faqTitle: "Questions fréquentes.",
  faq: [
    {
      q: "Y a-t-il des restaurants sur place ?",
      a: "Oui. 16 restaurateurs de street food BBQ sélectionnés sont présents tout au long du salon, ainsi qu'une zone de restauration assise et un food truck café. Tous les régimes sont pris en compte (végétarien, sans gluten).",
    },
    {
      q: "Puis-je venir avec mes enfants ?",
      a: "Oui. L'entrée est gratuite jusqu'à 12 ans accompagné d'un adulte. Une zone d'animation famille est prévue le samedi et dimanche après-midi.",
    },
    {
      q: "Puis-je venir avec mon animal de compagnie ?",
      a: "Non. Les animaux de compagnie ne sont pas admis sur le salon. Seuls les chiens guides et d'assistance sont acceptés.",
    },
    {
      q: "Peut-on acheter du matériel directement sur les stands ?",
      a: "Oui. La plupart des marques exposantes vendent leur matériel sur place aux tarifs salon. Livraison à domicile possible pour les pièces volumineuses.",
    },
    {
      q: "Y a-t-il un vestiaire ?",
      a: "Oui, vestiaire gratuit à l'entrée, ouvert pendant toute la durée d'ouverture. Des consignes sécurisées pour bagages volumineux sont disponibles à proximité de l'entrée principale.",
    },
    {
      q: "Et si je veux fumer / vapoter ?",
      a: "Le salon est non-fumeur en intérieur. Des zones fumeurs en plein air sont signalées dans le parc.",
    },
    {
      q: "Y a-t-il un dress code ?",
      a: "Aucun. Venez confortable — une bonne paire de chaussures pour marcher, et de quoi vous changer si vous comptez participer à une masterclass de fumage.",
    },
  ],
};

const EN: typeof FR = {
  metaTitle: "Practical information — Barbecue Expo 2027",
  eyebrow: "2027 edition",
  heroTitle: "Everything to plan your visit.",
  heroParagraph:
    "Three days at the Parc Floral de Paris, from Friday 12 to Sunday 14 March 2027. Here's how to get there, when to come, where to stay, where to park, and everything that helps make it a great weekend.",
  daysTitle: "Opening hours",
  days: [
    { day: "Friday 12 March", hours: "9:30 AM — 7:00 PM", note: "Grill Arena evening · Round of 16" },
    { day: "Saturday 13 March", hours: "9:30 AM — 7:00 PM", note: "Grill Arena evening · Quarter & semi-finals" },
    { day: "Sunday 14 March", hours: "9:30 AM — 6:00 PM", note: "Grill Arena final in the afternoon" },
  ],
  accessEyebrow: "Access",
  accessTitle: "Getting there.",
  accessIntro: "The Parc Floral is at the end of Paris metro line 1. Every way of getting there is covered, including for visitors with reduced mobility.",
  modes: [
    {
      icon: "metro",
      title: "Metro",
      detail: "Line 1 — Château de Vincennes station (end of the line). Exit 6, then follow the Parc Floral signs. Allow 10 minutes on foot to the entrance.",
    },
    {
      icon: "car",
      title: "Car",
      detail: "Parc Floral car parks (entrance via Route de la Pyramide). 2,000 spaces + 800 spaces in a signposted park-and-ride. €5 per day. EV charging available (12 charging points).",
    },
    {
      icon: "bike",
      title: "Bike & scooter",
      detail: "1,200 free parking spaces at the main entrance. Vélib' Métropole: 3 stations less than 5 minutes' walk away. Safe cycle lanes from Vincennes and Saint-Mandé.",
    },
    {
      icon: "rer",
      title: "RER & Transilien",
      detail: "RER A — Vincennes station (then bus 56 or a 10-minute walk). RER E for visitors coming from eastern Paris. Direct train from Gare de l'Est in 25 minutes.",
    },
    {
      icon: "pmr",
      title: "Accessibility",
      detail: "Entrance and route fully accessible. Dedicated disabled parking at the main entrance (50 spaces). Accessibility welcome desk at the entrance. Wheelchairs available on loan, free on request.",
    },
  ],
  hotelsTitle: "Where to stay.",
  hotelsBody:
    "Our hotel partner Revolugo negotiates preferential rates for Barbecue Expo visitors. Hotels 10-30 minutes from the Parc Floral, by direct metro.",
  hotelsCta: "See partner hotels",
  faqTitle: "Frequently asked questions.",
  faq: [
    {
      q: "Are there restaurants on site?",
      a: "Yes. 16 selected BBQ street-food vendors are on site throughout the show, along with a seated dining area and a coffee food truck. All diets are catered for (vegetarian, gluten-free).",
    },
    {
      q: "Can I bring my children?",
      a: "Yes. Entry is free for children up to 12 accompanied by an adult. A family activity area runs on Saturday and Sunday afternoons.",
    },
    {
      q: "Can I bring my pet?",
      a: "No. Pets are not allowed at the show. Only guide and assistance dogs are admitted.",
    },
    {
      q: "Can I buy equipment directly at the stands?",
      a: "Yes. Most exhibiting brands sell their equipment on site at show prices. Home delivery is available for bulky items.",
    },
    {
      q: "Is there a cloakroom?",
      a: "Yes, a free cloakroom at the entrance, open throughout opening hours. Secure lockers for large luggage are available near the main entrance.",
    },
    {
      q: "What if I want to smoke / vape?",
      a: "The show is non-smoking indoors. Outdoor smoking areas are signposted in the park.",
    },
    {
      q: "Is there a dress code?",
      a: "None. Dress comfortably — good walking shoes, and a change of clothes if you plan to join a smoking masterclass.",
    },
  ],
};

const ES: typeof FR = {
  metaTitle: "Información práctica — Barbecue Expo 2027",
  eyebrow: "Edición 2027",
  heroTitle: "Todo para preparar tu visita.",
  heroParagraph:
    "Tres días en el Parc Floral de París, del viernes 12 al domingo 14 de marzo de 2027. Aquí tienes cómo llegar, a qué hora, dónde dormir, dónde aparcar y todo lo que ayuda a pasar un buen fin de semana.",
  daysTitle: "Horario de apertura",
  days: [
    { day: "Viernes 12 de marzo", hours: "9:30 — 19:00", note: "Velada Grill Arena · Octavos de final" },
    { day: "Sábado 13 de marzo", hours: "9:30 — 19:00", note: "Velada Grill Arena · Cuartos y semifinales" },
    { day: "Domingo 14 de marzo", hours: "9:30 — 18:00", note: "Final de la Grill Arena por la tarde" },
  ],
  accessEyebrow: "Acceso",
  accessTitle: "Cómo llegar.",
  accessIntro: "El Parc Floral está al final de la línea 1 del metro de París. Todos los medios están previstos, también para personas con movilidad reducida.",
  modes: [
    {
      icon: "metro",
      title: "Metro",
      detail: "Línea 1 — estación Château de Vincennes (final de línea). Salida 6, seguir la señalización del Parc Floral. Unos 10 minutos a pie hasta la entrada.",
    },
    {
      icon: "car",
      title: "Coche",
      detail: "Aparcamientos del Parc Floral (entrada por la Route de la Pyramide). 2.000 plazas + 800 plazas en aparcamiento disuasorio señalizado. Tarifa: 5 € al día. Recarga de vehículos eléctricos disponible (12 puntos).",
    },
    {
      icon: "bike",
      title: "Bici y patinete",
      detail: "1.200 plazas de aparcamiento gratuito en la entrada principal. Vélib' Métropole: 3 estaciones a menos de 5 minutos a pie. Carriles bici seguros desde Vincennes y Saint-Mandé.",
    },
    {
      icon: "rer",
      title: "RER y Transilien",
      detail: "RER A — estación Vincennes (después autobús 56 o 10 minutos a pie). RER E para los visitantes que vienen del este de París. Tren directo desde la Gare de l'Est en 25 minutos.",
    },
    {
      icon: "pmr",
      title: "Accesibilidad PMR",
      detail: "Entrada y recorrido totalmente accesibles. Aparcamiento PMR reservado en la entrada principal (50 plazas). Punto de acogida PMR en la entrada. Préstamo gratuito de sillas de ruedas bajo petición.",
    },
  ],
  hotelsTitle: "Dónde dormir.",
  hotelsBody:
    "Nuestro socio hotelero Revolugo negocia tarifas preferentes para los visitantes de Barbecue Expo. Hoteles a 10-30 minutos del Parc Floral, en metro directo.",
  hotelsCta: "Ver los hoteles asociados",
  faqTitle: "Preguntas frecuentes.",
  faq: [
    {
      q: "¿Hay restaurantes en el recinto?",
      a: "Sí. 16 restauradores seleccionados de street food BBQ están presentes durante todo el salón, además de una zona de comida con asientos y un food truck de café. Se tienen en cuenta todas las dietas (vegetariana, sin gluten).",
    },
    {
      q: "¿Puedo venir con mis hijos?",
      a: "Sí. La entrada es gratuita hasta los 12 años acompañados de un adulto. Hay una zona de animación familiar el sábado y el domingo por la tarde.",
    },
    {
      q: "¿Puedo venir con mi mascota?",
      a: "No. Las mascotas no están admitidas en el salón. Solo se aceptan perros guía y de asistencia.",
    },
    {
      q: "¿Se puede comprar material directamente en los stands?",
      a: "Sí. La mayoría de las marcas expositoras venden su material in situ a precios de salón. Entrega a domicilio posible para los artículos voluminosos.",
    },
    {
      q: "¿Hay guardarropa?",
      a: "Sí, guardarropa gratuito en la entrada, abierto durante todo el horario del salón. Hay consignas seguras para equipaje voluminoso cerca de la entrada principal.",
    },
    {
      q: "¿Y si quiero fumar o vapear?",
      a: "El salón es libre de humo en interior. Hay zonas para fumadores al aire libre señalizadas en el parque.",
    },
    {
      q: "¿Hay código de vestimenta?",
      a: "Ninguno. Ven cómodo: un buen calzado para caminar y ropa de recambio si piensas participar en una masterclass de ahumado.",
    },
  ],
};

const DE: typeof FR = {
  metaTitle: "Praktische Infos — Barbecue Expo 2027",
  eyebrow: "Ausgabe 2027",
  heroTitle: "Alles für Ihren Besuch.",
  heroParagraph:
    "Drei Tage im Parc Floral de Paris, von Freitag, 12., bis Sonntag, 14. März 2027. Hier erfahren Sie, wie Sie hinkommen, wann geöffnet ist, wo Sie übernachten und parken können – und alles, was zu einem gelungenen Wochenende beiträgt.",
  daysTitle: "Öffnungszeiten",
  days: [
    { day: "Freitag, 12. März", hours: "9:30 — 19:00 Uhr", note: "Grill-Arena-Abend · Achtelfinale" },
    { day: "Samstag, 13. März", hours: "9:30 — 19:00 Uhr", note: "Grill-Arena-Abend · Viertel- & Halbfinale" },
    { day: "Sonntag, 14. März", hours: "9:30 — 18:00 Uhr", note: "Grill-Arena-Finale am Nachmittag" },
  ],
  accessEyebrow: "Anreise",
  accessTitle: "So kommen Sie hin.",
  accessIntro: "Der Parc Floral liegt an der Endstation der Pariser Metrolinie 1. Für jede Anreiseart ist gesorgt – auch für Menschen mit eingeschränkter Mobilität.",
  modes: [
    {
      icon: "metro",
      title: "Metro",
      detail: "Linie 1 — Station Château de Vincennes (Endstation). Ausgang 6, der Beschilderung zum Parc Floral folgen. Etwa 10 Minuten Fußweg bis zum Eingang.",
    },
    {
      icon: "car",
      title: "Auto",
      detail: "Parkplätze des Parc Floral (Einfahrt über die Route de la Pyramide). 2.000 Stellplätze + 800 Stellplätze auf einem ausgeschilderten Park-and-Ride-Platz. 5 € pro Tag. E-Ladestationen vorhanden (12 Ladepunkte).",
    },
    {
      icon: "bike",
      title: "Fahrrad & E-Scooter",
      detail: "1.200 kostenlose Abstellplätze am Haupteingang. Vélib' Métropole: 3 Stationen weniger als 5 Gehminuten entfernt. Sichere Radwege ab Vincennes und Saint-Mandé.",
    },
    {
      icon: "rer",
      title: "RER & Transilien",
      detail: "RER A — Station Vincennes (dann Bus 56 oder 10 Minuten zu Fuß). RER E für Besucher aus dem Osten von Paris. Direktzug ab Gare de l'Est in 25 Minuten.",
    },
    {
      icon: "pmr",
      title: "Barrierefreiheit",
      detail: "Eingang und Rundgang vollständig barrierefrei. Behindertenparkplätze am Haupteingang (50 Plätze). Empfangsschalter für Menschen mit Behinderung am Eingang. Rollstühle kostenlos auf Anfrage leihbar.",
    },
  ],
  hotelsTitle: "Übernachten.",
  hotelsBody:
    "Unser Hotelpartner Revolugo verhandelt Vorzugspreise für Besucher der Barbecue Expo. Hotels 10–30 Minuten vom Parc Floral entfernt, mit direkter Metroverbindung.",
  hotelsCta: "Partnerhotels ansehen",
  faqTitle: "Häufige Fragen.",
  faq: [
    {
      q: "Gibt es Restaurants vor Ort?",
      a: "Ja. 16 ausgewählte BBQ-Streetfood-Anbieter sind während der gesamten Messe vor Ort, dazu ein Sitzbereich zum Essen und ein Kaffee-Foodtruck. Alle Ernährungsweisen werden berücksichtigt (vegetarisch, glutenfrei).",
    },
    {
      q: "Kann ich mit meinen Kindern kommen?",
      a: "Ja. Der Eintritt ist für Kinder bis 12 Jahre in Begleitung eines Erwachsenen frei. Am Samstag- und Sonntagnachmittag gibt es einen Familienbereich mit Programm.",
    },
    {
      q: "Darf ich mein Haustier mitbringen?",
      a: "Nein. Haustiere sind auf der Messe nicht zugelassen. Nur Blinden- und Assistenzhunde sind erlaubt.",
    },
    {
      q: "Kann man Ausrüstung direkt an den Ständen kaufen?",
      a: "Ja. Die meisten ausstellenden Marken verkaufen ihre Produkte vor Ort zu Messepreisen. Lieferung nach Hause ist für sperrige Artikel möglich.",
    },
    {
      q: "Gibt es eine Garderobe?",
      a: "Ja, eine kostenlose Garderobe am Eingang, während der gesamten Öffnungszeiten geöffnet. Sichere Schließfächer für großes Gepäck befinden sich in der Nähe des Haupteingangs.",
    },
    {
      q: "Und wenn ich rauchen / dampfen möchte?",
      a: "In den Innenbereichen gilt Rauchverbot. Ausgeschilderte Raucherzonen im Freien gibt es im Park.",
    },
    {
      q: "Gibt es einen Dresscode?",
      a: "Nein. Kommen Sie bequem – mit gutem Schuhwerk zum Laufen und Wechselkleidung, falls Sie an einer Räucher-Masterclass teilnehmen möchten.",
    },
  ],
};

const NL: typeof FR = {
  metaTitle: "Praktische info — Barbecue Expo 2027",
  eyebrow: "Editie 2027",
  heroTitle: "Alles om je bezoek voor te bereiden.",
  heroParagraph:
    "Drie dagen in het Parc Floral de Paris, van vrijdag 12 tot zondag 14 maart 2027. Zo kom je er, zo laat ben je welkom, hier kun je overnachten en parkeren – en alles wat helpt om er een mooi weekend van te maken.",
  daysTitle: "Openingstijden",
  days: [
    { day: "Vrijdag 12 maart", hours: "9.30 — 19.00 uur", note: "Grill Arena-avond · Achtste finales" },
    { day: "Zaterdag 13 maart", hours: "9.30 — 19.00 uur", note: "Grill Arena-avond · Kwart- & halve finales" },
    { day: "Zondag 14 maart", hours: "9.30 — 18.00 uur", note: "Finale Grill Arena in de middag" },
  ],
  accessEyebrow: "Bereikbaarheid",
  accessTitle: "Zo kom je er.",
  accessIntro: "Het Parc Floral ligt aan het eindpunt van metrolijn 1 in Parijs. Elke vervoerswijze is voorzien, ook voor bezoekers met beperkte mobiliteit.",
  modes: [
    {
      icon: "metro",
      title: "Metro",
      detail: "Lijn 1 — station Château de Vincennes (eindpunt). Uitgang 6, volg de borden naar het Parc Floral. Reken op 10 minuten lopen tot de ingang.",
    },
    {
      icon: "car",
      title: "Auto",
      detail: "Parkeerterreinen van het Parc Floral (ingang via de Route de la Pyramide). 2.000 plaatsen + 800 plaatsen op een aangegeven P+R-terrein. € 5 per dag. Laadpalen voor elektrische auto's (12 laadpunten).",
    },
    {
      icon: "bike",
      title: "Fiets & step",
      detail: "1.200 gratis stallingsplaatsen bij de hoofdingang. Vélib' Métropole: 3 stations op minder dan 5 minuten lopen. Veilige fietspaden vanuit Vincennes en Saint-Mandé.",
    },
    {
      icon: "rer",
      title: "RER & Transilien",
      detail: "RER A — station Vincennes (daarna bus 56 of 10 minuten lopen). RER E voor bezoekers uit het oosten van Parijs. Rechtstreekse trein vanaf Gare de l'Est in 25 minuten.",
    },
    {
      icon: "pmr",
      title: "Toegankelijkheid",
      detail: "Ingang en route volledig toegankelijk. Gereserveerde invalidenparkeerplaatsen bij de hoofdingang (50 plaatsen). Onthaalbalie voor bezoekers met een beperking bij de ingang. Rolstoelen gratis te leen op aanvraag.",
    },
  ],
  hotelsTitle: "Overnachten.",
  hotelsBody:
    "Onze hotelpartner Revolugo onderhandelt voordelige tarieven voor bezoekers van Barbecue Expo. Hotels op 10-30 minuten van het Parc Floral, met directe metroverbinding.",
  hotelsCta: "Bekijk de partnerhotels",
  faqTitle: "Veelgestelde vragen.",
  faq: [
    {
      q: "Zijn er restaurants ter plaatse?",
      a: "Ja. 16 geselecteerde BBQ-streetfoodzaken zijn de hele beurs aanwezig, plus een zitgedeelte om te eten en een koffiefoodtruck. Met alle diëten wordt rekening gehouden (vegetarisch, glutenvrij).",
    },
    {
      q: "Mag ik mijn kinderen meenemen?",
      a: "Ja. Toegang is gratis tot 12 jaar onder begeleiding van een volwassene. Op zaterdag- en zondagmiddag is er een familiezone met activiteiten.",
    },
    {
      q: "Mag ik mijn huisdier meenemen?",
      a: "Nee. Huisdieren zijn niet toegelaten op de beurs. Alleen blindengeleide- en assistentiehonden zijn welkom.",
    },
    {
      q: "Kan ik materiaal direct op de stands kopen?",
      a: "Ja. De meeste exposerende merken verkopen hun materiaal ter plaatse tegen beursprijzen. Thuislevering is mogelijk voor grote artikelen.",
    },
    {
      q: "Is er een garderobe?",
      a: "Ja, een gratis garderobe bij de ingang, open tijdens alle openingsuren. Beveiligde kluisjes voor grote bagage vind je vlak bij de hoofdingang.",
    },
    {
      q: "En als ik wil roken / vapen?",
      a: "Binnen is de beurs rookvrij. In het park zijn rookzones in de buitenlucht aangegeven.",
    },
    {
      q: "Is er een dresscode?",
      a: "Nee. Kom comfortabel gekleed – goede wandelschoenen, en iets om je om te kleden als je aan een masterclass roken wilt deelnemen.",
    },
  ],
};

const PT: typeof FR = {
  metaTitle: "Informações práticas — Barbecue Expo 2027",
  eyebrow: "Edição 2027",
  heroTitle: "Tudo para preparar a sua visita.",
  heroParagraph:
    "Três dias no Parc Floral de Paris, de sexta-feira 12 a domingo 14 de março de 2027. Saiba como chegar, a que horas, onde dormir, onde estacionar e tudo o que ajuda a passar um bom fim de semana.",
  daysTitle: "Horário de abertura",
  days: [
    { day: "Sexta-feira, 12 de março", hours: "9h30 — 19h00", note: "Noite Grill Arena · Oitavos de final" },
    { day: "Sábado, 13 de março", hours: "9h30 — 19h00", note: "Noite Grill Arena · Quartos e meias-finais" },
    { day: "Domingo, 14 de março", hours: "9h30 — 18h00", note: "Final da Grill Arena à tarde" },
  ],
  accessEyebrow: "Acesso",
  accessTitle: "Como chegar.",
  accessIntro: "O Parc Floral fica no fim da linha 1 do metro de Paris. Todos os meios estão previstos, incluindo para pessoas com mobilidade reduzida.",
  modes: [
    {
      icon: "metro",
      title: "Metro",
      detail: "Linha 1 — estação Château de Vincennes (terminal). Saída 6, seguir a sinalética do Parc Floral. Cerca de 10 minutos a pé até à entrada.",
    },
    {
      icon: "car",
      title: "Carro",
      detail: "Parques de estacionamento do Parc Floral (entrada pela Route de la Pyramide). 2 000 lugares + 800 lugares num parque dissuasor sinalizado. Tarifa de 5 € por dia. Carregamento de veículos elétricos disponível (12 postos).",
    },
    {
      icon: "bike",
      title: "Bicicleta e trotinete",
      detail: "1 200 lugares de estacionamento gratuito na entrada principal. Vélib' Métropole: 3 estações a menos de 5 minutos a pé. Ciclovias seguras a partir de Vincennes e Saint-Mandé.",
    },
    {
      icon: "rer",
      title: "RER e Transilien",
      detail: "RER A — estação Vincennes (depois autocarro 56 ou 10 minutos a pé). RER E para visitantes vindos do leste de Paris. Comboio direto a partir da Gare de l'Est em 25 minutos.",
    },
    {
      icon: "pmr",
      title: "Acessibilidade PMR",
      detail: "Entrada e percurso totalmente acessíveis. Estacionamento PMR reservado na entrada principal (50 lugares). Balcão de acolhimento PMR na entrada. Empréstimo gratuito de cadeiras de rodas mediante pedido.",
    },
  ],
  hotelsTitle: "Onde dormir.",
  hotelsBody:
    "O nosso parceiro hoteleiro Revolugo negoceia tarifas preferenciais para os visitantes da Barbecue Expo. Hotéis a 10-30 minutos do Parc Floral, com metro direto.",
  hotelsCta: "Ver os hotéis parceiros",
  faqTitle: "Perguntas frequentes.",
  faq: [
    {
      q: "Há restaurantes no local?",
      a: "Sim. 16 vendedores selecionados de street food BBQ estão presentes durante todo o salão, além de uma zona de refeições com lugares sentados e um food truck de café. Todas as dietas são tidas em conta (vegetariana, sem glúten).",
    },
    {
      q: "Posso vir com os meus filhos?",
      a: "Sim. A entrada é gratuita até aos 12 anos, acompanhados por um adulto. Há uma zona de animação para famílias no sábado e domingo à tarde.",
    },
    {
      q: "Posso vir com o meu animal de estimação?",
      a: "Não. Os animais de estimação não são admitidos no salão. Apenas cães-guia e de assistência são aceites.",
    },
    {
      q: "Posso comprar material diretamente nos stands?",
      a: "Sim. A maioria das marcas expositoras vende o seu material no local a preços de salão. Entrega ao domicílio possível para artigos volumosos.",
    },
    {
      q: "Existe bengaleiro?",
      a: "Sim, bengaleiro gratuito na entrada, aberto durante todo o horário do salão. Cacifos seguros para bagagem volumosa estão disponíveis perto da entrada principal.",
    },
    {
      q: "E se eu quiser fumar / vaporizar?",
      a: "O salão é para não fumadores no interior. Há zonas de fumadores ao ar livre sinalizadas no parque.",
    },
    {
      q: "Há código de vestuário?",
      a: "Nenhum. Venha confortável — um bom par de sapatos para caminhar e roupa para trocar se pretende participar numa masterclass de fumagem.",
    },
  ],
};

const IT: typeof FR = {
  metaTitle: "Informazioni pratiche — Barbecue Expo 2027",
  eyebrow: "Edizione 2027",
  heroTitle: "Tutto per preparare la tua visita.",
  heroParagraph:
    "Tre giorni al Parc Floral di Parigi, da venerdì 12 a domenica 14 marzo 2027. Ecco come arrivare, a che ora, dove dormire, dove parcheggiare e tutto ciò che aiuta a passare un bel weekend.",
  daysTitle: "Orari di apertura",
  days: [
    { day: "Venerdì 12 marzo", hours: "9:30 — 19:00", note: "Serata Grill Arena · Ottavi di finale" },
    { day: "Sabato 13 marzo", hours: "9:30 — 19:00", note: "Serata Grill Arena · Quarti e semifinali" },
    { day: "Domenica 14 marzo", hours: "9:30 — 18:00", note: "Finale Grill Arena nel pomeriggio" },
  ],
  accessEyebrow: "Accesso",
  accessTitle: "Come arrivare.",
  accessIntro: "Il Parc Floral si trova al capolinea della linea 1 della metropolitana di Parigi. Ogni mezzo è previsto, anche per le persone a mobilità ridotta.",
  modes: [
    {
      icon: "metro",
      title: "Metro",
      detail: "Linea 1 — stazione Château de Vincennes (capolinea). Uscita 6, seguire la segnaletica del Parc Floral. Circa 10 minuti a piedi fino all'ingresso.",
    },
    {
      icon: "car",
      title: "Auto",
      detail: "Parcheggi del Parc Floral (ingresso dalla Route de la Pyramide). 2.000 posti + 800 posti in un parcheggio di interscambio segnalato. Tariffa 5 € al giorno. Ricarica per veicoli elettrici disponibile (12 colonnine).",
    },
    {
      icon: "bike",
      title: "Bici e monopattino",
      detail: "1.200 posti di parcheggio gratuito all'ingresso principale. Vélib' Métropole: 3 stazioni a meno di 5 minuti a piedi. Piste ciclabili sicure da Vincennes e Saint-Mandé.",
    },
    {
      icon: "rer",
      title: "RER e Transilien",
      detail: "RER A — stazione Vincennes (poi bus 56 o 10 minuti a piedi). RER E per chi arriva dall'est di Parigi. Treno diretto dalla Gare de l'Est in 25 minuti.",
    },
    {
      icon: "pmr",
      title: "Accessibilità",
      detail: "Ingresso e percorso interamente accessibili. Parcheggio riservato alle persone con disabilità all'ingresso principale (50 posti). Punto di accoglienza dedicato all'ingresso. Sedie a rotelle in prestito gratuito su richiesta.",
    },
  ],
  hotelsTitle: "Dove dormire.",
  hotelsBody:
    "Il nostro partner alberghiero Revolugo negozia tariffe agevolate per i visitatori di Barbecue Expo. Hotel a 10-30 minuti dal Parc Floral, con metro diretta.",
  hotelsCta: "Vedi gli hotel partner",
  faqTitle: "Domande frequenti.",
  faq: [
    {
      q: "Ci sono ristoranti in loco?",
      a: "Sì. 16 ristoratori selezionati di street food BBQ sono presenti per tutta la durata del salone, oltre a un'area ristoro con posti a sedere e un food truck caffè. Tutte le diete sono considerate (vegetariana, senza glutine).",
    },
    {
      q: "Posso venire con i miei figli?",
      a: "Sì. L'ingresso è gratuito fino a 12 anni se accompagnati da un adulto. Il sabato e la domenica pomeriggio è prevista un'area di animazione per famiglie.",
    },
    {
      q: "Posso venire con il mio animale domestico?",
      a: "No. Gli animali domestici non sono ammessi al salone. Sono accettati solo i cani guida e di assistenza.",
    },
    {
      q: "Si può acquistare attrezzatura direttamente agli stand?",
      a: "Sì. La maggior parte dei marchi espositori vende i propri prodotti sul posto a prezzi fiera. Consegna a domicilio possibile per gli articoli ingombranti.",
    },
    {
      q: "C'è un guardaroba?",
      a: "Sì, guardaroba gratuito all'ingresso, aperto per tutto l'orario di apertura. Armadietti sicuri per bagagli voluminosi sono disponibili vicino all'ingresso principale.",
    },
    {
      q: "E se voglio fumare / svapare?",
      a: "All'interno il salone è non fumatori. Nel parco sono segnalate aree fumatori all'aperto.",
    },
    {
      q: "C'è un dress code?",
      a: "Nessuno. Vieni comodo: un buon paio di scarpe per camminare e un cambio se pensi di partecipare a una masterclass di affumicatura.",
    },
  ],
};

const CONTENT: Record<string, typeof FR> = {
  fr: FR,
  en: EN,
  es: ES,
  de: DE,
  nl: NL,
  pt: PT,
  it: IT,
};

function ModeIcon({ name }: { name: string }) {
  const cls = "w-6 h-6 text-gold-600";
  if (name === "metro" || name === "rer") return <Train className={cls} strokeWidth={2} />;
  if (name === "car") return <Car className={cls} strokeWidth={2} />;
  if (name === "bike") return <Bike className={cls} strokeWidth={2} />;
  if (name === "pmr") return <Accessibility className={cls} strokeWidth={2} />;
  return <MapPin className={cls} strokeWidth={2} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const ui = CONTENT[locale] || CONTENT.fr;
  return buildMetadata(locale, "/infos-pratiques", {
    title: ui.metaTitle,
    description: ui.heroParagraph,
  });
}

export default async function InfosPratiquesPage() {
  const locale = await getLocale();
  const ui = CONTENT[locale] || CONTENT.fr;

  return (
    <div className="bg-cream-50">
      {/* Hero */}
      <section className="relative w-full min-h-[60dvh] overflow-hidden bg-ink-950">
        <Image
          src="/photos-2026/bbq-expo-403.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col justify-end min-h-[60dvh]">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.eyebrow}
          </div>
          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.92] font-bold max-w-5xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.heroTitle}
          </h1>
          <p className="mt-8 text-cream-50/85 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
            {ui.heroParagraph}
          </p>
        </div>
      </section>

      {/* Hours */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex items-center gap-3 text-ink-900 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
          <Clock className="w-4 h-4 text-gold-500" strokeWidth={2} />
          {ui.daysTitle}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {ui.days.map((d, i) => (
            <div key={i} className="border-t-2 border-gold-500 pt-6">
              <h3
                className="text-ink-900 text-2xl md:text-3xl leading-tight font-bold mb-2"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {d.day}
              </h3>
              <div
                className="text-gold-700 text-xl md:text-2xl tabular-nums mb-3"
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                {d.hours}
              </div>
              <p className="text-ink-600 text-sm leading-relaxed">{d.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Access modes */}
      <section className="bg-ink-950 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-8">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {ui.accessEyebrow}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 md:mb-16">
            <h2
              className="lg:col-span-7 text-cream-50 text-4xl sm:text-5xl md:text-6xl leading-[0.95] font-bold"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {ui.accessTitle}
            </h2>
            <p className="lg:col-span-5 text-cream-50/85 text-base md:text-lg leading-relaxed">
              {ui.accessIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-x-16 md:gap-y-12">
            {ui.modes.map((m, i) => (
              <div key={i} className="flex gap-5">
                <div className="shrink-0 mt-1">
                  <ModeIcon name={m.icon} />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-cream-50 text-xl md:text-2xl leading-tight font-bold mb-2"
                    style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                  >
                    {m.title}
                  </h3>
                  <p className="text-cream-50/75 text-sm md:text-base leading-relaxed">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotels */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative aspect-[4/3] rounded-sm overflow-hidden">
          <Image
            src="/photos-2026/bbq-expo-073.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-7">
          <h2
            className="text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-[0.95] font-bold mb-6"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.hotelsTitle}
          </h2>
          <p className="text-ink-600 text-base md:text-lg leading-relaxed mb-10">
            {ui.hotelsBody}
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>{ui.hotelsCta}</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream-100 py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <h2
            className="text-ink-900 text-4xl sm:text-5xl md:text-6xl leading-[0.95] font-bold mb-12"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            {ui.faqTitle}
          </h2>
          <ul className="divide-y divide-ink-900/15">
            {ui.faq.map((item, i) => (
              <li key={i} className="py-6">
                <h3 className="text-ink-900 text-lg md:text-xl font-bold mb-2">{item.q}</h3>
                <p className="text-ink-600 text-base leading-relaxed">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
