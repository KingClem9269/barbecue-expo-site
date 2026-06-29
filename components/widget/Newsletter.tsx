"use client";

import { useTranslations } from "next-intl";

/**
 * Newsletter — formulaire embarqué via le widget Pylot (app.pylot-ai.com).
 * Remplace l'ancien formulaire Brevo. NB : l'inscription a lieu dans l'iframe
 * (cross-origin) → l'événement GA4 `newsletter_signup` n'est plus émis ici ;
 * le suivi des inscriptions est géré côté Pylot.
 */
export default function Newsletter() {
  const t = useTranslations("newsletter");
  const headline = t("headline");
  const description = t("description");

  return (
    <div className="newsletter-widget w-full pt-8 pb-8 px-4 md:px-8 lg:px-16 xl:px-64 bg-primary">
      <div className="flex flex-col gap-4 rounded-lg">
        <h3 className="text-white font-sans-plomb text-2xl md:text-3xl">
          {headline}
        </h3>
        {description && (
          <p className="text-white font-inter-tight text-sm md:text-base">
            {description}
          </p>
        )}
        <iframe
          src="https://app.pylot-ai.com/form/newsletter-barbecue-expo"
          title={headline}
          loading="lazy"
          className="w-full border-0 mt-2"
          style={{ maxWidth: 500, height: 600 }}
        />
      </div>
    </div>
  );
}
