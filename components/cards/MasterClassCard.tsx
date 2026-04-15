"use client";

import { LinkBlok, MediaBlok } from "@/types/storyblok";
import { useTranslations } from "next-intl";
import { ComponentRenderer } from "@/lib/ComponentRenderer";
import React, { useState } from "react";
import Image from "next/image";
import { ClockIcon, WalletIcon, XIcon } from "lucide-react";

interface MasterClassCardBlok {
  _uid: string;
  chefName: string;
  days: string;
  duration: string;
  price: string;
  btn: LinkBlok[];
  media: MediaBlok;
  coverMedia: MediaBlok;
  modalParagraph?: string;
}

const MasterClassCard = ({ blok }: { blok: MasterClassCardBlok }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("masterClass");

  return (
    <>
      <div
        className="flex flex-col border border-primary shadow-md "
      >
        <div className="w-full h-96 overflow-hidden">
          <Image
            src={blok.media.filename || ""}
            alt={blok.media.alt || ""}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between p-4 bg-tertiary grow">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">{blok.chefName}</h2>
            <p className="paragraph">{blok.days}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-3xl flex flex-row gap-2 items-center">
                <ClockIcon className="w-4 h-4" />
                {blok.duration}
              </h3>
              <h3 className="text-3xl flex flex-row gap-2 items-center">
                <WalletIcon className="w-4 h-4" />
                {blok.price}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-lg border border-primary text-primary px-4 py-2 w-full text-start hover:bg-primary hover:text-white transition-colors"
            >
              {t("learnMore")}
            </button>

            {blok.btn?.map((nestedBlok: any) => (
              <ComponentRenderer
                blok={nestedBlok}
                key={nestedBlok._uid}
              />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-tertiary border border-primary shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Photo couverture */}
            <div className="relative w-full h-48 md:h-64 overflow-hidden">
              {blok.coverMedia?.filename && (
                <Image
                  src={blok.coverMedia?.filename || ""}
                  alt={blok.coverMedia.alt || ""}
                  fill
                  className="object-cover"
                />
              )}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                aria-label="Fermer"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Main content - left */}
              <div className="flex-1 p-6 flex flex-col gap-4">
                <h2 id="modal-title" className="font-bold text-2xl">
                  {blok.chefName}
                </h2>
                <div className="paragraph space-y-2">
                  <p>{blok.days}</p>
                  <p>
                    Durée : {blok.duration} — Prix : {blok.price}
                  </p>
                  <p>
                    {blok.modalParagraph ||
                      "Découvrez cette masterclass en détail. Une expérience culinaire unique pour perfectionner vos techniques de barbecue avec un chef passionné."}
                  </p>
                </div>
                <div className="flex flex-col gap-2 mt-auto">
                  {blok.btn?.map((nestedBlok: any) => (
                    <ComponentRenderer
                      blok={nestedBlok}
                      key={nestedBlok._uid}
                    />
                  ))}
                </div>
              </div>

              {/* Sidebar - right */}
              <div className="md:w-48 p-6 border-t md:border-t-0 md:border-l border-primary flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-primary">
                  <Image
                    src={blok.media.filename || ""}
                    alt={blok.media.alt || ""}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-bold text-center">{blok.chefName}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MasterClassCard;
