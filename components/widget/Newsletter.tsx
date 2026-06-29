"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * Newsletter — POST direct vers la fonction Pylot (Supabase edge function).
 * La clé `apikey` est une clé PUBLIABLE (sb_publishable_…), conçue pour un
 * usage navigateur — à ne pas confondre avec la clé secrète du CRM (devis).
 * L'inscription a lieu sur la page → l'événement GA4 `newsletter_signup` est émis.
 */
const PYLOT_FORM_URL =
  "https://picdlgrtgaavqywehfil.supabase.co/functions/v1/form-submit";
const PYLOT_FORM_ID = "0bff2fd4-671d-4f16-afe3-ab318eab3804";
const PYLOT_PUBLISHABLE_KEY = "sb_publishable_UpBJ_VV92fea9pj4yPaBng_23H9dCNM";

export default function Newsletter() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(PYLOT_FORM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: PYLOT_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({
          form_id: PYLOT_FORM_ID,
          data: { email: email.trim(), edition: "barbecue_expo" },
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.error) {
        setStatus("error");
        setMessage(data?.error || t("error_unexpected"));
        return;
      }

      setStatus("success");
      setMessage(data?.message || t("success"));
      // Conversion GA4 : inscription newsletter réussie
      sendGAEvent("event", "newsletter_signup", { method: "footer" });
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(t("error_unexpected"));
    }
  };

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

        {status === "success" ? (
          <p className="text-white font-inter-tight py-2">{message}</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
            noValidate
          >
            <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholder")}
                disabled={status === "loading"}
                required
                className="flex-1 min-w-0 px-4 py-3 rounded-sm bg-white text-primary font-inter-tight placeholder:text-primary/60 focus:outline-none focus:ring-2 focus:ring-gold-500 disabled:opacity-60"
                aria-label={t("placeholder")}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-7 py-3 rounded-sm bg-gold-500 hover:bg-gold-300 text-ink-950 font-bold uppercase tracking-widest text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? t("loading") : t("button")}
              </button>
            </div>
            {status === "error" && message && (
              <p className="text-sm font-inter-tight text-[#ffb4a8]">{message}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
