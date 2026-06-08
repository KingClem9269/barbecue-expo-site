"use client";

/**
 * Estimateur de coût de participation — Catalogue exposant.
 *
 * Contexte de calcul partagé + panneau flottant (centré à droite) + contrôles
 * réutilisables (steppers, cases à cocher, boutons « choisir cette option »).
 *
 * Source unique de vérité pour les prix = les chaînes de data.ts, lues via
 * parsePrice(). Aucune valeur n'est dupliquée ici.
 */

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { X as XIcon, Calculator, Minus, Plus, ChevronDown, RotateCcw, FileText } from "lucide-react";
import { QuoteModal } from "./QuoteModal";

const STORAGE_KEY = "bbq-estimator-v1";

/* ------------------------------------------------------------------ */
/* Utilitaires prix                                                    */
/* ------------------------------------------------------------------ */

/** Extrait le premier nombre d'une chaîne tarifaire FR. "1 250 € HT / m²" → 1250.
 *  Renvoie null pour « Sur devis », « Sur demande », etc. */
export function parsePrice(s?: string | null): number | null {
  if (!s) return null;
  const cleaned = s.replace(/[\s  ]/g, "");
  const m = cleaned.match(/\d+(?:,\d+)?/);
  if (!m) return null;
  return parseFloat(m[0].replace(",", "."));
}

/** Formate un montant en euros HT, format français. 12000 → "12 000 € HT". */
export function fmtEUR(n: number): string {
  return `${Math.round(n).toLocaleString("fr-FR")} € HT`;
}

/* ------------------------------------------------------------------ */
/* Modèle                                                              */
/* ------------------------------------------------------------------ */

export type Zone = "A" | "B";

/** Ligne générique du devis (case à cocher / stepper / option). */
export type Item = {
  id: string;
  group: string;
  label: string;
  detail?: string;
  amount: number | null; // total de la ligne (null = sur devis)
  qty?: number; // pour les steppers
};

type EstimatorState = {
  /* Surface nue (étape 1) */
  sqm: number;
  zone: Zone;
  setSqm: (n: number) => void;
  setZone: (z: Zone) => void;
  /* Gamme de stand (étape 2) — clé exclusive */
  rangeKey: string | null;
  setRangeKey: (k: string | null) => void;
  /* Espace extérieur (étape 3) */
  outdoorSqm: number;
  setOutdoorSqm: (n: number) => void;
  /* Partenariat — exclusif */
  partnerKey: string | null;
  setPartnerKey: (k: string | null) => void;
  /* Pack com' sur place — exclusif */
  placeKey: string | null;
  setPlaceKey: (k: string | null) => void;
  /* Lignes génériques */
  items: Record<string, Item>;
  has: (id: string) => boolean;
  get: (id: string) => Item | undefined;
  upsert: (item: Item) => void;
  remove: (id: string) => void;
  toggle: (item: Item) => void;
  reset: () => void;
  /* UI */
  started: boolean;
};

const Ctx = createContext<EstimatorState | null>(null);

export function useEstimator(): EstimatorState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useEstimator must be used within EstimatorProvider");
  return v;
}

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

export function EstimatorProvider({ children }: { children: ReactNode }) {
  const [sqm, setSqm] = useState(0);
  const [zone, setZone] = useState<Zone>("A");
  const [rangeKey, setRangeKey] = useState<string | null>(null);
  const [outdoorSqm, setOutdoorSqm] = useState(0);
  const [partnerKey, setPartnerKey] = useState<string | null>(null);
  const [placeKey, setPlaceKey] = useState<string | null>(null);
  const [items, setItems] = useState<Record<string, Item>>({});

  // Restaure la sélection depuis le localStorage au montage (après l'hydratation
  // SSR, pour éviter tout décalage serveur/client).
  const loaded = useRef(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (typeof s.sqm === "number") setSqm(s.sqm);
        if (s.zone === "A" || s.zone === "B") setZone(s.zone);
        if (s.rangeKey === null || typeof s.rangeKey === "string") setRangeKey(s.rangeKey);
        if (typeof s.outdoorSqm === "number") setOutdoorSqm(s.outdoorSqm);
        if (s.partnerKey === null || typeof s.partnerKey === "string") setPartnerKey(s.partnerKey);
        if (s.placeKey === null || typeof s.placeKey === "string") setPlaceKey(s.placeKey);
        if (s.items && typeof s.items === "object") setItems(s.items);
      }
    } catch { /* localStorage indisponible */ }
    loaded.current = true;
  }, []);

  // Sauvegarde à chaque changement (une fois la restauration faite).
  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ sqm, zone, rangeKey, outdoorSqm, partnerKey, placeKey, items }));
    } catch { /* localStorage indisponible */ }
  }, [sqm, zone, rangeKey, outdoorSqm, partnerKey, placeKey, items]);

  const value = useMemo<EstimatorState>(() => {
    const has = (id: string) => id in items;
    const get = (id: string) => items[id];
    const upsert = (item: Item) => setItems((p) => ({ ...p, [item.id]: item }));
    const remove = (id: string) =>
      setItems((p) => {
        const n = { ...p };
        delete n[id];
        return n;
      });
    const toggle = (item: Item) =>
      setItems((p) => {
        if (item.id in p) {
          const n = { ...p };
          delete n[item.id];
          return n;
        }
        return { ...p, [item.id]: item };
      });
    const reset = () => {
      setSqm(0); setZone("A"); setRangeKey(null); setOutdoorSqm(0);
      setPartnerKey(null); setPlaceKey(null); setItems({});
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
    };
    const started =
      sqm > 0 ||
      outdoorSqm > 0 ||
      rangeKey !== null ||
      partnerKey !== null ||
      placeKey !== null ||
      Object.keys(items).length > 0;
    return {
      sqm, zone, setSqm, setZone,
      rangeKey, setRangeKey,
      outdoorSqm, setOutdoorSqm,
      partnerKey, setPartnerKey,
      placeKey, setPlaceKey,
      items, has, get, upsert, remove, toggle, reset,
      started,
    };
  }, [sqm, zone, rangeKey, outdoorSqm, partnerKey, placeKey, items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/* ------------------------------------------------------------------ */
/* Calcul des lignes de base (surface / gamme / extérieur / packs)     */
/* ------------------------------------------------------------------ */

export type DerivedLine = { id: string; group: string; label: string; detail?: string; amount: number | null };

type BaseConfig = {
  zonePrice: Record<Zone, number>;
  ranges: { key: string; title: string; surcharge: number | null }[];
  outdoorPerSqm: number;
  partners: { key: string; name: string; price: number | null }[];
  placePacks: { key: string; name: string; price: number | null }[];
};

/** Construit la liste complète des lignes du devis (base + génériques). */
export function buildLines(s: EstimatorState, cfg: BaseConfig): DerivedLine[] {
  const lines: DerivedLine[] = [];

  // Surface nue
  if (s.sqm > 0) {
    const u = cfg.zonePrice[s.zone];
    lines.push({
      id: "surface",
      group: "Stand",
      label: `Surface nue — Zone ${s.zone}`,
      detail: `${s.sqm} m² × ${fmtEUR(u)}/m²`,
      amount: s.sqm * u,
    });
  }

  // Gamme de stand
  if (s.rangeKey) {
    const r = cfg.ranges.find((x) => x.key === s.rangeKey);
    if (r) {
      if (r.surcharge == null) {
        lines.push({ id: "range", group: "Stand", label: r.title, detail: "Sur devis", amount: null });
      } else if (s.sqm > 0) {
        lines.push({
          id: "range",
          group: "Stand",
          label: r.title,
          detail: `${s.sqm} m² × +${fmtEUR(r.surcharge)}/m²`,
          amount: s.sqm * r.surcharge,
        });
      } else {
        lines.push({ id: "range", group: "Stand", label: r.title, detail: "Choisissez une surface", amount: 0 });
      }
    }
  }

  // Espace extérieur
  if (s.outdoorSqm > 0) {
    lines.push({
      id: "outdoor",
      group: "Stand",
      label: "Espace extérieur",
      detail: `${s.outdoorSqm} m² × ${fmtEUR(cfg.outdoorPerSqm)}/m²`,
      amount: s.outdoorSqm * cfg.outdoorPerSqm,
    });
  }

  // Lignes génériques (options, com', branding…)
  for (const it of Object.values(s.items)) {
    lines.push({ id: it.id, group: it.group, label: it.label, detail: it.detail, amount: it.amount });
  }

  // Partenariat
  if (s.partnerKey) {
    const p = cfg.partners.find((x) => x.key === s.partnerKey);
    if (p) lines.push({ id: "partner", group: "Partenariat", label: `Partenaire ${p.name}`, amount: p.price });
  }

  // Pack com' sur place
  if (s.placeKey) {
    const p = cfg.placePacks.find((x) => x.key === s.placeKey);
    if (p) lines.push({ id: "place", group: "Communication sur place", label: p.name, amount: p.price });
  }

  return lines;
}

/* ------------------------------------------------------------------ */
/* Contrôles réutilisables                                             */
/* ------------------------------------------------------------------ */

/** Stepper +/- numérique. */
export function Stepper({
  value, onChange, min = 0, max = 9999, step = 1, suffix, className = "",
}: {
  value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number; suffix?: string; className?: string;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  return (
    <div className={`inline-flex items-center rounded-sm border border-ink-900/20 bg-cream-50 ${className}`}>
      <button
        type="button"
        aria-label="Diminuer"
        onClick={() => onChange(clamp(value - step))}
        className="w-9 h-9 flex items-center justify-center text-ink-700 hover:bg-ink-900/5 disabled:opacity-30"
        disabled={value <= min}
      >
        <Minus className="w-4 h-4" strokeWidth={2.5} />
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(clamp(Number(e.target.value) || 0))}
        className="w-14 text-center bg-transparent text-ink-900 font-bold text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        style={{ fontFamily: "SansPlomb-98, sans-serif" }}
      />
      {suffix && <span className="pr-2 text-ink-500 text-xs">{suffix}</span>}
      <button
        type="button"
        aria-label="Augmenter"
        onClick={() => onChange(clamp(value + step))}
        className="w-9 h-9 flex items-center justify-center text-ink-700 hover:bg-ink-900/5 disabled:opacity-30"
        disabled={value >= max}
      >
        <Plus className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}

/** Case à cocher carrée + label. */
export function CheckRow({
  checked, onChange, children, className = "", dark = false,
}: {
  checked: boolean; onChange: () => void; children: ReactNode; className?: string; dark?: boolean;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={`group flex items-center gap-2.5 text-left ${className}`}
    >
      <span
        className={`shrink-0 w-5 h-5 rounded-[4px] border flex items-center justify-center transition-colors ${
          checked
            ? "bg-gold-500 border-gold-500 text-ink-950"
            : dark
              ? "border-cream-50/30 group-hover:border-gold-500"
              : "border-ink-900/30 group-hover:border-gold-500"
        }`}
      >
        {checked && <CheckMark />}
      </span>
      {children}
    </button>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

/** Bouton « Choisir cette option » / état sélectionné. */
export function ChooseButton({
  selected, onClick, labelIdle = "Choisir cette option", labelOn = "✓ Sélectionné", className = "",
}: {
  selected: boolean; onClick: () => void; labelIdle?: string; labelOn?: string; className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-colors ${
        selected
          ? "bg-ink-950 text-gold-500 border border-gold-500"
          : "bg-gold-500 text-ink-950 hover:bg-gold-300"
      } ${className}`}
    >
      {selected ? labelOn : labelIdle}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Panneau flottant                                                    */
/* ------------------------------------------------------------------ */

const GROUP_ORDER = ["Stand", "Options de stand", "Partenariat", "Communication", "Communication sur place", "Branding", "Sponsoring", "Barbecue Mag"];

export function EstimatorPanel({ cfg }: { cfg: BaseConfig }) {
  const s = useEstimator();
  const [collapsed, setCollapsed] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const lines = buildLines(s, cfg);
  const total = lines.reduce((sum, l) => sum + (l.amount ?? 0), 0);
  const hasQuote = lines.some((l) => l.amount == null);

  const removeLine = (id: string) => {
    if (id === "surface") s.setSqm(0);
    else if (id === "range") s.setRangeKey(null);
    else if (id === "outdoor") s.setOutdoorSqm(0);
    else if (id === "partner") s.setPartnerKey(null);
    else if (id === "place") s.setPlaceKey(null);
    else s.remove(id);
  };

  if (!s.started) return null;

  // groupes ordonnés
  const groups = Array.from(new Set(lines.map((l) => l.group))).sort(
    (a, b) => (GROUP_ORDER.indexOf(a) + 1 || 99) - (GROUP_ORDER.indexOf(b) + 1 || 99),
  );

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        className="fixed z-[90] right-4 bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 inline-flex items-center gap-3 bg-ink-950 text-cream-50 rounded-full shadow-2xl pl-4 pr-5 py-3 hover:bg-ink-900 transition-colors border border-gold-500/40"
      >
        <Calculator className="w-5 h-5 text-gold-500" strokeWidth={2} />
        <span className="text-left leading-tight">
          <span className="block text-[10px] uppercase tracking-widest text-cream-50/60">Mon estimation</span>
          <span className="block font-bold text-gold-500" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{fmtEUR(total)}{hasQuote ? " +" : ""}</span>
        </span>
      </button>
    );
  }

  return (
    <div className="fixed z-[90] inset-x-2 bottom-2 md:inset-x-auto md:right-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:w-[340px] max-h-[70vh] md:max-h-[82vh] flex flex-col bg-cream-50 border border-ink-900/15 rounded-sm shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 bg-ink-950 px-4 py-3 shrink-0">
        <span className="inline-flex items-center gap-2 text-cream-50 font-bold text-sm uppercase tracking-widest" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
          <Calculator className="w-4 h-4 text-gold-500" strokeWidth={2} /> Mon estimation
        </span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => s.reset()} aria-label="Réinitialiser ma sélection" title="Tout réinitialiser" className="w-7 h-7 rounded-full text-cream-50/70 hover:text-cream-50 hover:bg-cream-50/10 flex items-center justify-center">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={() => setCollapsed(true)} aria-label="Réduire" className="w-7 h-7 rounded-full text-cream-50/70 hover:text-cream-50 hover:bg-cream-50/10 flex items-center justify-center">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lignes */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {groups.map((g) => (
          <div key={g} className="mb-3 last:mb-0">
            <div className="text-gold-600 text-[10px] font-bold uppercase tracking-widest mb-1.5">{g}</div>
            <ul className="space-y-1.5">
              {lines.filter((l) => l.group === g).map((l) => (
                <li key={l.id} className="flex items-start gap-2 text-sm">
                  <button type="button" onClick={() => removeLine(l.id)} aria-label={`Retirer ${l.label}`} className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-ink-900/5 hover:bg-ink-900/15 text-ink-500 flex items-center justify-center">
                    <XIcon className="w-3 h-3" />
                  </button>
                  <span className="flex-1 min-w-0">
                    <span className="block text-ink-800 leading-tight">{l.label}</span>
                    {l.detail && <span className="block text-ink-400 text-xs">{l.detail}</span>}
                  </span>
                  <span className="shrink-0 font-bold text-ink-900 tabular-nums" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
                    {l.amount == null ? "Sur devis" : l.amount === 0 ? "—" : fmtEUR(l.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {lines.length === 0 && (
          <p className="text-ink-500 text-sm py-6 text-center">Commencez par choisir une surface de stand.</p>
        )}
      </div>

      {/* Total */}
      <div className="shrink-0 border-t border-ink-900/10 px-4 py-3 bg-cream-100">
        <div className="flex items-center justify-between">
          <span className="text-ink-600 text-xs uppercase tracking-widest">Total estimé</span>
          <span className="text-gold-700 text-xl font-bold tabular-nums" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {fmtEUR(total)}{hasQuote ? " +" : ""}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setQuoteOpen(true)}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-gold-500 text-ink-950 px-4 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gold-300 transition-colors"
        >
          <FileText className="w-4 h-4" strokeWidth={2.5} /> Recevoir le devis
        </button>
        <p className="text-ink-400 text-[10px] leading-snug mt-2">
          Estimation indicative HT{hasQuote ? ", hors éléments « sur devis »" : ""}. Hors taxes, hors mobilier. Devis ferme à la réservation.
        </p>
      </div>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} lines={lines} total={total} hasQuote={hasQuote} />
    </div>
  );
}
