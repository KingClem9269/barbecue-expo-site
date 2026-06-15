"use client";

import { ContactFormBlok } from "@/types/storyblok";
import { useState } from "react";
import { useTranslations } from "next-intl";

// Stable subject slugs — sent to the CRM, labels are localised per locale.
const SUBJECT_KEYS = [
  "stand",
  "sponsoring",
  "media",
  "presse",
  "technique",
  "autre",
] as const;

const inputClass =
  "w-full px-4 py-3 border border-primary/30 rounded-sm bg-white text-primary font-inter-tight placeholder:text-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60";

// `blok` is supplied by the Storyblok registry but this widget renders from
// i18n, so the prop is accepted (typed) and intentionally ignored.
export default function ContactForm({}: { blok?: ContactFormBlok }) {
  const t = useTranslations("contact");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) return;
    if (!subject) {
      setStatus("error");
      setErrorMsg(t("error_subject_required"));
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            phone: phone.trim() || undefined,
            company: company.trim() || undefined,
          },
          subject,
          message: message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data?.ok === false) {
        setStatus("error");
        const errorKey = data.errorCode ? `error_${data.errorCode}` : "error_default";
        setErrorMsg(t.has(errorKey) ? t(errorKey) : t("error_default"));
        return;
      }

      setStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg(t("error_unexpected"));
    }
  };

  return (
    <div className="contact-form w-full px-4 md:px-8 lg:px-16 xl:px-64">
      <div className="flex flex-col gap-4">
        <h2 className="text-primary font-sans-plomb">{t("headline")}</h2>
        <p className="text-primary/90 font-inter-tight text-sm md:text-base">
          {t("description")}
        </p>

        {status === "success" ? (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h4 className="text-primary font-sans-plomb text-xl">{t("success_title")}</h4>
            <p className="text-primary/90 font-inter-tight text-sm">{t("success_description")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={t("firstname_placeholder")}
                aria-label={t("firstname_placeholder")}
                disabled={status === "loading"}
                required
                maxLength={120}
                className={`flex-1 ${inputClass}`}
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={t("lastname_placeholder")}
                aria-label={t("lastname_placeholder")}
                disabled={status === "loading"}
                required
                maxLength={120}
                className={`flex-1 ${inputClass}`}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("email_placeholder")}
                aria-label={t("email_placeholder")}
                disabled={status === "loading"}
                required
                className={`flex-1 ${inputClass}`}
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("phone_placeholder")}
                aria-label={t("phone_placeholder")}
                disabled={status === "loading"}
                maxLength={40}
                className={`flex-1 ${inputClass}`}
              />
            </div>

            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={t("company_placeholder")}
              aria-label={t("company_placeholder")}
              disabled={status === "loading"}
              maxLength={200}
              className={inputClass}
            />

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              aria-label={t("subject_label")}
              disabled={status === "loading"}
              required
              className={`${inputClass} ${subject ? "" : "text-primary/60"}`}
            >
              <option value="" disabled>
                {t("subject_placeholder")}
              </option>
              {SUBJECT_KEYS.map((key) => (
                <option key={key} value={key} className="text-primary">
                  {t(`subjects.${key}`)}
                </option>
              ))}
            </select>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("message_placeholder")}
              aria-label={t("message_placeholder")}
              disabled={status === "loading"}
              required
              rows={4}
              maxLength={5000}
              className={`${inputClass} resize-y`}
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-6 py-3 bg-white text-primary font-bold hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? t("loading") : t("button")}
            </button>

            {status === "error" && errorMsg && (
              <p className="text-destructive text-sm font-inter-tight">{errorMsg}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
