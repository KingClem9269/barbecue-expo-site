"use client";

/**
 * Modale « Recevoir le devis » — formulaire de coordonnées + envoi.
 * L'envoi POST /api/quote (stub pour l'instant) créera plus tard la fiche
 * contact + transaction + devis dans le CRM.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X as XIcon, ChevronDown, Search, Check, Loader2, MailCheck, ExternalLink } from "lucide-react";
import { getCountries, countryByIso } from "./countries";
import { fmtEUR, type DerivedLine } from "./Estimator";

type FormState = {
  firstName: string; lastName: string; email: string;
  phoneIso: string; phone: string;
  company: string; address1: string; postalCode: string; city: string;
  state: string; countryIso: string;
  siret: string; vat: string;
};

const EMPTY: FormState = {
  firstName: "", lastName: "", email: "", phoneIso: "fr", phone: "",
  company: "", address1: "", postalCode: "", city: "", state: "", countryIso: "fr",
  siret: "", vat: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------------ */
/* Sélecteur de pays (recherchable) — modes "country" et "dial"        */
/* ------------------------------------------------------------------ */

function CountryPicker({ value, onChange, mode, invalid }: {
  value: string; onChange: (iso: string) => void; mode: "country" | "dial"; invalid?: boolean;
}) {
  const countries = useMemo(() => getCountries(), []);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const sel = countryByIso(value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return countries;
    return countries.filter((c) => c.name.toLowerCase().includes(s) || c.dial.includes(s) || c.iso.includes(s));
  }, [q, countries]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-2 bg-cream-50 border rounded-sm px-3 h-11 text-sm text-ink-900 focus:outline-none ${invalid ? "border-red-500" : "border-ink-900/20 focus:border-gold-500"} ${mode === "dial" ? "min-w-[7rem]" : ""}`}
      >
        {sel && <Flag iso={sel.iso} />}
        <span className="truncate flex-1 text-left">
          {mode === "dial" ? (sel ? `+${sel.dial}` : "—") : (sel ? sel.name : "Sélectionner un pays")}
        </span>
        <ChevronDown className="w-4 h-4 text-ink-400 shrink-0" />
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full min-w-[16rem] bg-cream-50 border border-ink-900/15 rounded-sm shadow-xl overflow-hidden">
          <div className="flex items-center gap-2 px-3 border-b border-ink-900/10">
            <Search className="w-4 h-4 text-ink-400" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher un pays…"
              className="w-full py-2.5 bg-transparent text-sm text-ink-900 focus:outline-none"
            />
          </div>
          <ul className="max-h-60 overflow-y-auto py-1">
            {filtered.map((c) => (
              <li key={c.iso}>
                <button
                  type="button"
                  onClick={() => { onChange(c.iso); setOpen(false); setQ(""); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-ink-800 hover:bg-gold-500/15 text-left"
                >
                  <Flag iso={c.iso} />
                  <span className="flex-1 truncate">{c.name}</span>
                  {mode === "dial" && <span className="text-ink-400">+{c.dial}</span>}
                  {value === c.iso && <Check className="w-4 h-4 text-gold-600" />}
                </button>
              </li>
            ))}
            {filtered.length === 0 && <li className="px-3 py-3 text-sm text-ink-400">Aucun résultat</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

function Flag({ iso }: { iso: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/flags/${iso}.svg`} alt="" width={20} height={14} className="w-5 h-3.5 rounded-[2px] object-cover shrink-0" onError={(e) => { (e.currentTarget.style.visibility = "hidden"); }} />;
}

/* ------------------------------------------------------------------ */
/* Champ de saisie                                                     */
/* ------------------------------------------------------------------ */

function Field({ label, required, error, children, className = "" }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-ink-700 text-xs font-semibold mb-1">
        {label} {required && <span className="text-red-500">*</span>}
        {!required && <span className="text-ink-400 font-normal">(si applicable)</span>}
      </span>
      {children}
      {error && <span className="block text-red-500 text-[11px] mt-1">{error}</span>}
    </label>
  );
}

function inputCls(invalid?: boolean) {
  return `w-full bg-cream-50 border rounded-sm px-3 h-11 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none ${invalid ? "border-red-500" : "border-ink-900/20 focus:border-gold-500"}`;
}

/* ------------------------------------------------------------------ */
/* Modale                                                              */
/* ------------------------------------------------------------------ */

export function QuoteModal({ open, onClose, lines, total, hasQuote }: {
  open: boolean; onClose: () => void; lines: DerivedLine[]; total: number; hasQuote: boolean;
}) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [result, setResult] = useState<{ quoteNumber?: string; signingUrl?: string }>({});
  const [serverError, setServerError] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // À chaque (ré)ouverture, repartir d'un statut neutre (évite de réafficher
  // l'écran de succès après une 1re demande).
  useEffect(() => { if (open) { setStatus("idle"); setServerError(""); } }, [open]);

  if (!open || !mounted) return null;

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) e.firstName = "Requis";
    if (!form.lastName.trim()) e.lastName = "Requis";
    if (!form.email.trim()) e.email = "Requis";
    else if (!EMAIL_RE.test(form.email.trim())) e.email = "Email invalide";
    if (!form.phone.trim()) e.phone = "Requis";
    if (!form.company.trim()) e.company = "Requis";
    if (!form.address1.trim()) e.address1 = "Requis";
    if (!form.postalCode.trim()) e.postalCode = "Requis";
    if (!form.city.trim()) e.city = "Requis";
    if (!form.countryIso) e.countryIso = "Requis";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setServerError("");
    const dial = countryByIso(form.phoneIso)?.dial ?? "";
    const country = countryByIso(form.countryIso);
    const payload = {
      contact: {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: `+${dial} ${form.phone.trim()}`.trim(),
        phoneCountry: form.phoneIso,
        company: form.company.trim(),
        address1: form.address1.trim(),
        postalCode: form.postalCode.trim(),
        city: form.city.trim(),
        state: form.state.trim() || undefined,
        country: country?.name,
        countryIso: form.countryIso,
        siret: form.siret.trim() || undefined,
        vat: form.vat.trim() || undefined,
      },
      estimate: {
        total,
        hasQuote,
        lines: lines.map((l) => ({ label: l.label, detail: l.detail, amount: l.amount })),
      },
    };
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || data?.errorCode || "unexpected_error");
      }
      setResult({ quoteNumber: data.quoteNumber, signingUrl: data.signingUrl });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "unexpected_error");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-start md:items-center justify-center p-3 md:p-6 bg-ink-950/80 backdrop-blur-sm overflow-y-auto" role="dialog" aria-modal="true" aria-label="Recevoir le devis" onMouseDown={onClose}>
      <div className="relative w-full max-w-2xl my-6 bg-cream-50 rounded-sm shadow-2xl" onMouseDown={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 md:px-7 py-4 border-b border-ink-900/10 bg-ink-950 rounded-t-sm">
          <div>
            <h2 className="text-cream-50 font-bold text-lg" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>Recevoir mon devis</h2>
            <p className="text-cream-50/60 text-xs mt-0.5">
              Total estimé : <span className="text-gold-500 font-semibold">{fmtEUR(total)}{hasQuote ? " +" : ""}</span>
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer" className="shrink-0 w-9 h-9 rounded-full bg-cream-50/10 hover:bg-cream-50/20 text-cream-50 flex items-center justify-center">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {status === "success" ? (
          <div className="px-6 py-12 text-center">
            <div className="w-14 h-14 rounded-full bg-gold-500/20 text-gold-600 flex items-center justify-center mx-auto mb-5">
              <MailCheck className="w-7 h-7" />
            </div>
            <h3 className="text-ink-900 text-xl font-bold mb-2" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>Devis envoyé !</h3>
            <p className="text-ink-600 text-sm max-w-md mx-auto">
              Merci {form.firstName}. Votre devis{result.quoteNumber ? <> <span className="font-semibold text-ink-900">n° {result.quoteNumber}</span></> : ""} vient d&apos;être envoyé à <span className="font-semibold text-ink-900">{form.email}</span>. Vérifiez votre boîte de réception (et vos spams).
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {result.signingUrl && (
                <a href={result.signingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gold-500 text-ink-950 px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gold-300">
                  Voir &amp; signer mon devis <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button type="button" onClick={onClose} className="inline-flex bg-ink-950 text-cream-50 px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-ink-900">Fermer</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="px-5 md:px-7 py-5 max-h-[70vh] overflow-y-auto">
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-4">
              <Field label="Prénom" required error={errors.firstName}>
                <input value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className={inputCls(!!errors.firstName)} />
              </Field>
              <Field label="Nom" required error={errors.lastName}>
                <input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className={inputCls(!!errors.lastName)} />
              </Field>
              <Field label="Email" required error={errors.email} className="sm:col-span-2">
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls(!!errors.email)} placeholder="vous@societe.com" />
              </Field>

              <Field label="Téléphone" required error={errors.phone} className="sm:col-span-2">
                <div className="flex gap-2">
                  <CountryPicker mode="dial" value={form.phoneIso} onChange={(iso) => set("phoneIso", iso)} />
                  <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls(!!errors.phone)} placeholder="6 12 34 56 78" />
                </div>
              </Field>

              <Field label="Société" required error={errors.company} className="sm:col-span-2">
                <input value={form.company} onChange={(e) => set("company", e.target.value)} className={inputCls(!!errors.company)} />
              </Field>

              <Field label="Adresse" required error={errors.address1} className="sm:col-span-2">
                <input value={form.address1} onChange={(e) => set("address1", e.target.value)} className={inputCls(!!errors.address1)} placeholder="N° et rue" />
              </Field>

              <Field label="Code postal" required error={errors.postalCode}>
                <input value={form.postalCode} onChange={(e) => set("postalCode", e.target.value)} className={inputCls(!!errors.postalCode)} />
              </Field>
              <Field label="Ville" required error={errors.city}>
                <input value={form.city} onChange={(e) => set("city", e.target.value)} className={inputCls(!!errors.city)} />
              </Field>

              <Field label="État / Province">
                <input value={form.state} onChange={(e) => set("state", e.target.value)} className={inputCls()} />
              </Field>
              <Field label="Pays" required error={errors.countryIso}>
                <CountryPicker mode="country" value={form.countryIso} onChange={(iso) => set("countryIso", iso)} invalid={!!errors.countryIso} />
              </Field>

              <Field label="SIRET">
                <input value={form.siret} onChange={(e) => set("siret", e.target.value)} className={inputCls()} />
              </Field>
              <Field label="Numéro de TVA">
                <input value={form.vat} onChange={(e) => set("vat", e.target.value)} className={inputCls()} placeholder="FR…" />
              </Field>
            </div>

            {status === "error" && (
              <p className="mt-4 text-red-600 text-sm bg-red-50 border border-red-200 rounded-sm px-3 py-2">
                Une erreur est survenue lors de l’envoi. Merci de réessayer.{serverError ? ` (${serverError})` : ""}
              </p>
            )}

            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-ink-400 text-[11px] leading-snug max-w-xs">
                En envoyant ce formulaire, vous acceptez d’être recontacté par l’équipe Barbecue Expo au sujet de votre devis.
              </p>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="shrink-0 inline-flex items-center gap-2 bg-gold-500 text-ink-950 px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gold-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {status === "submitting" && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === "submitting" ? "Envoi…" : "Recevoir mon devis"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
