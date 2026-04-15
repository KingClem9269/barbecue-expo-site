"use client";

import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

const LOVABLE_BASE_URL = "https://cookingshow2026.lovable.app";

export default function CookingShowWidget({
  blok,
}: {
  blok?: { _uid?: string; [key: string]: unknown };
}) {
  const locale = useLocale();
  const t = useTranslations("cookingShowWidget");

  const iframeLocale = locale === "fr" ? "fr" : "en";
  const src = `${LOVABLE_BASE_URL}/${iframeLocale}`;
  const title = t("title");

  return (
    <div
      className="w-full overflow-hidden rounded-xl"
    >
      <iframe
        src={src}
        width="100%"
        height={2200}
        frameBorder={0}
        title={title}
        className="cooking-show-widget-iframe"
        style={{
          border: "none",
          borderRadius: "12px",
          display: "block",
          width: "100%",
        }}
      />
    </div>
  );
}
