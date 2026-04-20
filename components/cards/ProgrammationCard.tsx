import { ProgrammationCardBlok } from "@/types/storyblok";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

const ProgrammationCard = ({ blok }: { blok: ProgrammationCardBlok }) => {
  const href = blok.link?.url || "#";
  const label = blok.link_label || "En savoir plus";

  return (
    <Link
      href={href}
      className="group relative block w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-ink-900 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
    >
      {/* Background image with subtle zoom on hover */}
      {blok.media?.filename && (
        <Image
          src={blok.media.filename}
          alt={blok.media.alt || blok.title || ""}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}

      {/* Gradient overlay for legibility — stronger at bottom */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/40 to-transparent"
        aria-hidden="true"
      />

      {/* Subtle gold glow on hover */}
      <div
        className="absolute inset-0 ring-1 ring-gold-500/0 group-hover:ring-gold-500/40 transition-all duration-300 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 lg:p-8">
        {/* Accent line */}
        <span
          className="inline-block w-8 h-px bg-gold-500 mb-3 md:mb-4 origin-left transition-transform duration-500 ease-out group-hover:scale-x-[2.5]"
          aria-hidden="true"
        />

        {/* Title */}
        <h3
          className="text-cream-50 text-xl md:text-2xl lg:text-3xl leading-tight font-bold tracking-tight"
          style={{ fontFamily: "SansPlomb-98, sans-serif" }}
        >
          {blok.title}
        </h3>

        {/* CTA row */}
        <div className="mt-4 md:mt-5 flex items-center justify-between text-cream-50/80 text-xs md:text-sm font-medium uppercase tracking-widest">
          <span className="transition-colors duration-200 group-hover:text-gold-500">
            {label}
          </span>
          <span
            className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-cream-50/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-gold-500 group-hover:text-ink-950"
            aria-hidden="true"
          >
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProgrammationCard;
