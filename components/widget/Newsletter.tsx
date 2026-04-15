"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Newsletter({}: {}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const t = useTranslations("newsletter");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const listIds = ["133"];

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), listIds }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        const errorKey = data.errorCode
          ? `error_${data.errorCode}`
          : "error_default";
        setErrorMsg(t(errorKey));
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg(t("error_unexpected"));
    }
  };

  const headline = t("headline");
  const description = t("description");
  const buttonLabel = t("button");
  const successMessage = t("success");
  return (
    <div className="newsletter-widget w-full pt-8 px-4 md:px-8 lg:px-16 xl:px-64 bg-primary">
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
          <p className="text-white font-inter-tight py-2">{successMessage}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholder")}
                disabled={status === "loading"}
                required
                className="flex-1 px-4 py-3 border border-primary/30 bg-white text-primary font-inter-tight placeholder:text-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60"
                aria-label={t("placeholder")}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 bg-transparent md:bg-white text-white md:text-primary border border-white md:border-none font-bold md:hover:bg-secondary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? t("loading") : buttonLabel}
              </button>
            </div>
            {status === "error" && errorMsg && (
              <p className="text-destructive text-sm font-inter-tight">
                {errorMsg}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
