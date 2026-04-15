import {
  ArrowRightIcon,
  AwardIcon,
  BeefIcon,
  CalendarIcon,
  ChefHatIcon,
  ChevronsUpIcon,
  ClockIcon,
  CookingPotIcon,
  DownloadIcon,
  EarthIcon,
  HandshakeIcon,
  HeartIcon,
  HotelIcon,
  HouseIcon,
  LoaderIcon,
  MailIcon,
  MapPinnedIcon,
  MegaphoneIcon,
  MessagesSquareIcon,
  NewspaperIcon,
  NotebookIcon,
  RadioIcon,
  StarIcon,
  StoreIcon,
  SwatchBookIcon,
  TvIcon,
  UsersRoundIcon,
  UtensilsIcon,
  WalletIcon,
} from "lucide-react";
import React from "react";
import { ArrowOpenIcon } from "../icons";
type IconBlok = {
  icon: string;
  color?: string;
};

const Icon = ({ blok }: { blok: IconBlok }) => {
  const classname = `w-10 h-10 text-${blok.color || "primary"}`;

  if (blok.icon === "chef-hat") {
    return (
      <div>
        <ChefHatIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "earth") {
    return (
      <div>
        <EarthIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "users-round") {
    return (
      <div>
        <UsersRoundIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "beef") {
    return (
      <div>
        <BeefIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "clock") {
    return (
      <div>
        <ClockIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "wallet") {
    return (
      <div>
        <WalletIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "arrow-right") {
    return (
      <div>
        <ArrowRightIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "arrow-external-link") {
    return (
      <div>
        <ArrowOpenIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "cooking-pot") {
    return (
      <div>
        <CookingPotIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "download") {
    return (
      <div>
        <DownloadIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "loader") {
    return (
      <div>
        <LoaderIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "award") {
    return (
      <div>
        <AwardIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "ustensils") {
    return (
      <div>
        <UtensilsIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "map-pinned") {
    return (
      <div>
        <MapPinnedIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "hotel") {
    return (
      <div>
        <HotelIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "handshake") {
    return (
      <div>
        <HandshakeIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "notebook") {
    return (
      <div>
        <NotebookIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "tv") {
    return (
      <div>
        <TvIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "calendar") {
    return (
      <div>
        <CalendarIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "newspaper") {
    return (
      <div>
        <NewspaperIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "megaphone") {
    return (
      <div>
        <MegaphoneIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "heart") {
    return (
      <div>
        <HeartIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "store") {
    return (
      <div>
        <StoreIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "star") {
    return (
      <div>
        <StarIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "house") {
    return (
      <div>
        <HouseIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "chevrons-up") {
    return (
      <div>
        <ChevronsUpIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "messages-square") {
    return (
      <div>
        <MessagesSquareIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "mail") {
    return (
      <div>
        <MailIcon className={classname} />
      </div>
    );
  }

  if (blok.icon === "swatch-book") {
    return (
      <div>
        <SwatchBookIcon className={classname} />
      </div>
    );
  }
  if (blok.icon === "radio") {
    return (
      <div>
        <RadioIcon className={classname} />
      </div>
    );
  }
  return <div>Icon</div>;
};

export default Icon;
