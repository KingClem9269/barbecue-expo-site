import { ComponentRenderer, registerComponents } from "./ComponentRenderer";

import { ChefsPitmasters } from "@/components/homepage/chefs-pitmasters";
import { EventBanner } from "@/components/EventBanner";
import { HeroVideo } from "@/components/HeroVideo";
import ArticleContent from "@/components/storyblok/ArticleContent";
import Feature from "@/components/storyblok/Feature";
import Grid from "@/components/layout/Grid";
import Page from "@/components/storyblok/Page";
import Teaser from "@/components/storyblok/Teaser";
import Headline from "@/components/primitives/Headline";
import LinkBlok from "@/components/primitives/LinkBlok";
import Media from "@/components/primitives/Media";
import Paragraph from "@/components/primitives/Paragraph";
import CenteredTextBlock from "@/components/primitives/CenteredTextBlock";
import Programmation from "@/components/homepage/Programmation";
import ProgrammationCard from "@/components/cards/ProgrammationCard";
import { PartnersList } from "@/components/homepage/PartnersList";
import { BlogPreview } from "@/components/homepage/BlogPreview";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import CarouselContainer from "@/components/layout/CarouselContainer";
import EventCard from "@/components/cards/EventCard";
import IFrame from "@/components/primitives/IFrame";
import PageHero from "@/components/primitives/PageHero";
import ExposantsIFrame from "@/components/widget/ExposantsIFrame";
import Flex from "@/components/layout/Flex";
import MasterClassCard from "@/components/cards/MasterClassCard";
import PartnerCard from "@/components/cards/PartnerCard";
import RevolugoWidget from "@/components/widget/RevolugoWidget";
import ImaginaBilleterieIframe from "@/components/widget/ImaginaBilleterieIframe";
import HubSpotForm from "@/components/widget/HubSpotForm";
import MovingText from "@/components/animated/MovingText";
import MovingLogos from "@/components/homepage/MovingLogos";
import Icon from "@/components/primitives/Icon";
import BbqCard from "@/components/cards/BbqCard";
import ChefCard from "@/components/cards/ChefCard";
import PageHeroMini from "@/components/primitives/PageHeroMini";
import CookingEventCard from "@/components/cards/CookingEventCard";
import AccordionCard from "@/components/cards/AccordionCard";
import MasonryGrid from "@/components/layout/MasonryGrid";
import GoogleMapsMap from "@/components/widget/GoogleMaps";
import CookingShowWidget from "@/components/widget/CookingShowWidget";
import ContactForm from "@/components/widget/ContactForm";
import PressWeezeventFrame from "@/components/widget/PressWeezeventFrame";
import { PageStreetFood } from "@/components/pages/PageStreetFood";
import Manifesto from "@/components/homepage/Manifesto";
import PathFork from "@/components/homepage/PathFork";
import FinalCTA from "@/components/homepage/FinalCTA";
import SectionBreak from "@/components/homepage/SectionBreak";

// Register all components at module load time.
// This runs once when StoryRenderer is first imported.
// Components that import ComponentRenderer won't cause circular deps
// because ComponentRenderer.tsx doesn't import any components.
registerComponents({
  page: Page,
  feature: Feature,
  Grid: Grid,
  MasonryGrid: MasonryGrid,
  Flex: Flex,
  Section: Section,
  Container: Container,
  CarouselContainer: CarouselContainer,
  teaser: Teaser,
  partners: PartnersList,
  partner: PartnerCard,
  headline: Headline,
  paragraph: Paragraph,
  link: LinkBlok,
  media: Media,
  "centered-text-block": CenteredTextBlock,
  "hero-video": HeroVideo,
  "event-banner": EventBanner,
  "chefs-and-pitmasters": ChefsPitmasters,
  "article-content": ArticleContent,
  "blog-preview": BlogPreview,
  "programmation-cards-section": Programmation,
  "programmation-card": ProgrammationCard,
  EventCard: EventCard,
  iframe: IFrame,
  ExposantsIFrame: ExposantsIFrame,
  RevolugoWidget: RevolugoWidget,
  ImaginaBilleterieIframe: ImaginaBilleterieIframe,
  PressWeezeventFrame: PressWeezeventFrame,
  HubSpotForm: HubSpotForm,
  PageHero: PageHero,
  PageHeroMini: PageHeroMini,
  MasterClassCard: MasterClassCard,
  MovingText: MovingText,
  MovingLogos: MovingLogos,
  Icon: Icon,
  BbqCard: BbqCard,
  CookingEventCard: CookingEventCard,
  "chef-card": ChefCard,
  AccordionCard: AccordionCard,
  GoogleMapsMap: GoogleMapsMap,
  CookingShowWidget: CookingShowWidget,
  ContactForm: ContactForm,
  "page-street-food": PageStreetFood,
  // Sprint 2 — homepage components
  manifesto: Manifesto,
  "path-fork": PathFork,
  // Sprint 3
  "final-cta": FinalCTA,
  // Sprint 6
  "section-break": SectionBreak,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function StoryRenderer({ story }: { story: any }) {
  if (!story?.content) return null;
  return <ComponentRenderer blok={story.content} />;
}
