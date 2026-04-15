  interface PageHeroMiniBlok {
    color?: string;
  }

  export default function PageHeroMini({ blok }: { blok: PageHeroMiniBlok }) {

    return (
      <div
        className={`block h-[36px] md:h-[64px] bg-${blok.color || "primary"}`}
      >

      </div>
    );
  }
  