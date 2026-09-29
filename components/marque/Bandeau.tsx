import Image from "next/image";

/**
 * Le bandeau partenaires, comme en pied d'affiche : une bande blanche fixe.
 * Remplace les bandeaux de logos qui défilent.
 */
export default function Bandeau({
  logos,
  className = "",
}: {
  logos: Array<{ src: string; alt: string }>;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border-t border-charbon/10 px-5 md:px-8 py-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 ${className}`}
    >
      {logos.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          width={120}
          height={48}
          className="h-8 md:h-10 w-auto object-contain"
        />
      ))}
    </div>
  );
}
