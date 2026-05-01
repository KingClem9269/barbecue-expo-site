"use client";

import { useEffect } from "react";
import { registerComponents } from "./ComponentRenderer";

import Headline from "@/components/primitives/Headline";
import Paragraph from "@/components/primitives/Paragraph";
import LinkBlok from "@/components/primitives/LinkBlok";
import Media from "@/components/primitives/Media";
import Icon from "@/components/primitives/Icon";
import CenteredTextBlock from "@/components/primitives/CenteredTextBlock";
import PageHero from "@/components/primitives/PageHero";
import PageHeroMini from "@/components/primitives/PageHeroMini";
import IFrame from "@/components/primitives/IFrame";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import Flex from "@/components/layout/Flex";
import MasonryGrid from "@/components/layout/MasonryGrid";
import CarouselContainer from "@/components/layout/CarouselContainer";
import AccordionCard from "@/components/cards/AccordionCard";
import MasterClassCard from "@/components/cards/MasterClassCard";
import ProgrammationCard from "@/components/cards/ProgrammationCard";
import EventCard from "@/components/cards/EventCard";
import BbqCard from "@/components/cards/BbqCard";
import ChefCard from "@/components/cards/ChefCard";
import PartnerCard from "@/components/cards/PartnerCard";
import CookingEventCard from "@/components/cards/CookingEventCard";
import MovingText from "@/components/animated/MovingText";
import MovingLogos from "@/components/homepage/MovingLogos";
import { ChefsPitmasters } from "@/components/homepage/chefs-pitmasters";
import { EventBanner } from "@/components/EventBanner";
import { HeroVideo } from "@/components/HeroVideo";
import Feature from "@/components/storyblok/Feature";
import Page from "@/components/storyblok/Page";
import Teaser from "@/components/storyblok/Teaser";
import ArticleContent from "@/components/storyblok/ArticleContent";
import Programmation from "@/components/homepage/Programmation";
import { PartnersList } from "@/components/homepage/PartnersList";
import { BlogPreview } from "@/components/homepage/BlogPreview";
import ExposantsIFrame from "@/components/widget/ExposantsIFrame";
import RevolugoWidget from "@/components/widget/RevolugoWidget";
import ImaginaBilleterieIframe from "@/components/widget/ImaginaBilleterieIframe";
import HubSpotForm from "@/components/widget/HubSpotForm";
import PressWeezeventFrame from "@/components/widget/PressWeezeventFrame";
import GoogleMapsMap from "@/components/widget/GoogleMaps";
import CookingShowWidget from "@/components/widget/CookingShowWidget";
import ContactForm from "@/components/widget/ContactForm";
import { PageStreetFood } from "@/components/pages/PageStreetFood";
import Manifesto from "@/components/homepage/Manifesto";
import PathFork from "@/components/homepage/PathFork";
import FinalCTA from "@/components/homepage/FinalCTA";
import SectionBreak from "@/components/homepage/SectionBreak";
import GrillArenaTeaser from "@/components/homepage/GrillArenaTeaser";
import AwardsTeaser from "@/components/homepage/AwardsTeaser";
import PitmastersGrid from "@/components/homepage/PitmastersGrid";
import FloorPlanTeaser from "@/components/homepage/FloorPlanTeaser";
import PartnersStrip from "@/components/homepage/PartnersStrip";
import LatestStories from "@/components/homepage/LatestStories";

const clientComponents = {
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
  // Sprint 8 — signature differentiators
  "grill-arena-teaser": GrillArenaTeaser,
  "awards-teaser": AwardsTeaser,
  // Sprint 9
  "pitmasters-grid": PitmastersGrid,
  // Sprint 18 — homepage cleanup
  "floor-plan-teaser": FloorPlanTeaser,
  "partners-strip": PartnersStrip,
  "latest-stories": LatestStories,
};

// Register on module load (runs once when client bundle initializes)
registerComponents(clientComponents);

// Dummy component to include in layout tree so this module gets bundled
export function ClientRegistryInit() {
  return null;
}
