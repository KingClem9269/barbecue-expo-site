import { ComponentRenderer } from "@/lib/ComponentRenderer";
import Image from "next/image";
import LinkBlok from "../primitives/LinkBlok";
import { useLocale } from "next-intl";

const LIBELLES: Record<string, { decouvrez: string; autres: string }> = {
  fr: { decouvrez: "Découvrez nos restaurateurs Street Food", autres: "Voir les autres restaurateurs Street Food" },
  en: { decouvrez: "Meet our Street Food vendors", autres: "See the other Street Food vendors" },
  es: { decouvrez: "Descubra nuestros restauradores de Street Food", autres: "Ver los demás restauradores de Street Food" },
  de: { decouvrez: "Entdecken Sie unsere Street-Food-Anbieter", autres: "Weitere Street-Food-Anbieter ansehen" },
  nl: { decouvrez: "Ontdek onze streetfoodkoks", autres: "Bekijk de andere streetfoodkoks" },
  pt: { decouvrez: "Descubra os nossos restauradores de Street Food", autres: "Ver os outros restauradores de Street Food" },
  it: { decouvrez: "Scopri i nostri ristoratori Street Food", autres: "Vedi gli altri ristoratori Street Food" },
};

export function PageStreetFood({ blok }: { blok: any }) {
  const t = LIBELLES[useLocale()] ?? LIBELLES.fr;
  return (
    <>
      <div
        className="w-full py-4 bg-primary text-white text-center"
      >
        <div className="mt-4">{t.decouvrez}</div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="mt-16 font-bold text-6xl ">{blok.title}</h1>
          <div className="w-32 h-[1px] bg-white my-4"></div>
          <h3 className="text-lg font-inter-tight font-medium mb-4">
            {blok.shortdescription}
          </h3>
        </div>

        {blok.media?.filename ? (
          <Image
            src={blok.media?.filename || ""}
            alt={blok.media?.alt || ""}
            width={600}
            height={600}
            className={`h-96 md:h-128 px-4 md:px-16 lg:px-64 w-full object-cover`}
          />
        ) : (
          <div className="w-full h-full bg-slate-200"></div>
        )}
        <div className="mt-4 px-4 md:px-16 lg:px-64 article-content-body [&>*:not(:last-child)]:mb-4 text-white">
          {blok.body?.map((content: any) => (
            <ComponentRenderer blok={content} key={content._uid} />
          ))}
        </div>
        <div className="mt-4 flex justify-center mb-16 px-4">
          <LinkBlok
            blok={{
              label: t.autres,
              path: "/program/bbq-street-food",
              style: "filled-light",
              icon: "arrow-right",
            }}
          />
        </div>
      </div>
    </>
  );
}
