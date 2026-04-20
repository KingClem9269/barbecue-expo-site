import { ChefCardBlok } from "@/types/storyblok";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const CountryFlag = ({ country }: { country: string }) => {
  return (
    <Image
      src={`/flags/${country}.svg`}
      alt={country}
      width={16}
      height={16}
      className="w-4 h-4 rounded-full object-cover"
    />
  );
};

const ChefCard = ({
  blok,
}: {
  blok: ChefCardBlok;
  index?: number;
}) => {
  const hasLink = !!blok.link?.url;
  const Wrapper = hasLink ? "a" : "div";
  const wrapperProps = hasLink
    ? {
        href: blok.link?.url,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as Record<string, string>)}
      className={`group relative block w-[280px] md:w-[320px] aspect-[3/4] overflow-hidden bg-char-800 rounded-sm ${
        hasLink
          ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          : ""
      }`}
    >
      {/* Portrait image */}
      {blok.media?.filename ? (
        <Image
          src={blok.media.filename}
          alt={blok.media.alt || blok.name || "Pitmaster portrait"}
          fill
          sizes="(max-width: 768px) 280px, 320px"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-char-800 flex items-center justify-center">
          <span className="text-cream-50/30 text-xs uppercase tracking-widest">
            {blok.name || "Pitmaster"}
          </span>
        </div>
      )}

      {/* Dark gradient — always visible for legibility, stronger on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent transition-opacity duration-500 opacity-80 group-hover:opacity-95"
        aria-hidden="true"
      />

      {/* Char-mark frame — appears on hover as a premium signature */}
      <div
        className="absolute inset-3 ring-1 ring-gold-500/0 group-hover:ring-gold-500/60 transition-all duration-500 pointer-events-none rounded-sm"
        aria-hidden="true"
      />

      {/* Content — bottom info bar */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col gap-2 text-cream-50">
        {/* Accent line */}
        <span
          className="inline-block w-8 h-px bg-gold-500 origin-left transition-transform duration-500 ease-out group-hover:scale-x-[2]"
          aria-hidden="true"
        />

        {/* Name */}
        <h3
          className="text-2xl md:text-3xl leading-tight font-bold tracking-tight"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          {blok.name}
        </h3>

        {/* Country + stand row */}
        <div className="flex items-center justify-between gap-3 text-xs md:text-sm text-cream-50/80">
          <div className="flex items-center gap-2 min-w-0">
            {blok.country && <CountryFlag country={blok.country} />}
            {blok.stand && (
              <span className="uppercase tracking-widest truncate">
                {blok.stand}
              </span>
            )}
          </div>
          {hasLink && (
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full bg-cream-50/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-gold-500 group-hover:text-ink-950 shrink-0"
              aria-hidden="true"
            >
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default ChefCard;
