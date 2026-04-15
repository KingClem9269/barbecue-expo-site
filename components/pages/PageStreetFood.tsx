import { ComponentRenderer } from "@/lib/ComponentRenderer";
import Image from "next/image";
import LinkBlok from "../primitives/LinkBlok";

export function PageStreetFood({ blok }: { blok: any }) {
  return (
    <>
      <div
        className="w-full py-4 bg-primary text-white text-center"
      >
        <div className="mt-4">Découvrez nos restauranteurs Street Food</div>
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
              label: "Voir les autres restaurateurs Street Food",
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
