"use client";

import { ContactFormBlok } from "@/types/storyblok";
import { useState } from "react";
import { useTranslations } from "next-intl";

const MOCK_OPTIONS = [
  { value: "", label: "Success" },
  { value: "name_required", label: "Error: name_required" },
  { value: "email_required", label: "Error: email_required" },
  { value: "invalid_email", label: "Error: invalid_email" },
  { value: "message_required", label: "Error: message_required" },
  { value: "unable_to_send", label: "Error: unable_to_send" },
  { value: "unexpected_error", label: "Error: unexpected_error" },
  { value: "service_unconfigured", label: "Error: service_unconfigured" },
] as const;

export default function ContactForm({ blok }: { blok: ContactFormBlok }) {
  const isMockMode = process.env.NEXT_PUBLIC_CONTACT_MOCK_MODE === "true";
  const [mockResponse, setMockResponse] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const t = useTranslations("contact");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
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
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg(t("error_unexpected"));
    }
  };

  return (
    <div
      className="contact-form w-full px-4 md:px-8 lg:px-16 xl:px-64"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-primary font-sans-plomb">{t("headline")}</h2>
        <p className="text-primary/90 font-inter-tight text-sm md:text-base">
          {t("description")}
        </p>

        {status === "success" ? (
          <div className="rounded-lg border border-white/30 bg-white/10 p-6 flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h4 className="text-primary font-sans-plomb text-xl">
              {t("success_title")}
            </h4>
            <p className="text-primary/90 font-inter-tight text-sm">
              {t("success_description")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label htmlFor="contact-name" className="sr-only">
                {t("name_label")}
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("name_placeholder")}
                disabled={status === "loading"}
                required
                maxLength={200}
                className="w-full px-4 py-3 border border-primary/30 rounded-sm bg-white text-primary font-inter-tight placeholder:text-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60"
                aria-label={t("name_placeholder")}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">
                {t("email_label")}
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("email_placeholder")}
                disabled={status === "loading"}
                required
                className="w-full px-4 py-3 border border-primary/30 rounded-sm bg-white text-primary font-inter-tight placeholder:text-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60"
                aria-label={t("email_placeholder")}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">
                {t("message_label")}
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("message_placeholder")}
                disabled={status === "loading"}
                required
                rows={4}
                maxLength={5000}
                className="w-full px-4 py-3 border border-primary/30 rounded-sm bg-white text-primary font-inter-tight placeholder:text-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-60 resize-y"
                aria-label={t("message_placeholder")}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-6 py-3 bg-white text-primary font-bold hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? t("loading") : t("button")}
            </button>
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
