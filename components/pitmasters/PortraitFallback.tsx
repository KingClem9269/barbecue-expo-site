import Image from "next/image";

/**
 * Portrait manquant : aplat jaune + monogramme « B », à la place d'une case
 * vide. À placer dans le conteneur relatif de la carte, sous le dégradé qui
 * garde le nom lisible.
 */
export default function PortraitFallback() {
  return (
    <div
      className="absolute inset-0 bg-gold-500 flex items-start justify-center pt-[18%]"
      aria-hidden="true"
    >
      <Image
        src="/b-mark-noir.png"
        alt=""
        width={96}
        height={120}
        className="w-1/3 h-auto"
      />
    </div>
  );
}
