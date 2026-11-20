"use client";

import { useState, useEffect, useRef, useMemo, Fragment } from "react";
import Image from "next/image";
import { Check, X as XIcon, ExternalLink, ArrowUpRight, Eye, BookOpen } from "lucide-react";
import PresentationSalon from "./PresentationSalon";
import { Sec, LangToggle } from "./blocs";
import { VarianteContext } from "./variante";
import { ESTIMATOR_CFG } from "./tarifs";
import { STAND_SURFACE, STAND_RANGES, OUTDOOR, STAND_OPTIONS, type StandOption, PARTNER_TIERS, PARTNER_FEATURE_GROUPS, COMM_STAND, COMM_PLACE_PACKS, VITROPHANIE, BRANDING, COMM_DIGITAL, COMM_DIGITAL_GLOBAL, SPONSORING, BARBECUE_MAG, PHOTO } from "./data";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LangContext, useT, translate, isLang, type Lang } from "./i18n";
import { useLocale } from "next-intl";
import {
  EstimatorProvider, EstimatorPanel, useEstimator, parsePrice, fmtEUR, tx, txMin, eur,
  Stepper, CheckRow, ChooseButton, type Zone,
} from "./Estimator";

/* ============================ catalogue interactif ============================ */

const OPT_GROUP = "Options de stand";

/** Détecte l'unité d'un tarif ("40 € HT / ml" → "ml"). */
function unitOf(price?: string): "ml" | "m²" | "heure" | null {
  if (!price) return null;
  if (/\/\s*ml/i.test(price)) return "ml";
  if (/\/\s*m²/i.test(price)) return "m²";
  if (/heure/i.test(price)) return "heure";
  return null;
}

/** Coquille de carte d'option (titre + description + contenu). */
function OptCard({ opt, children }: { opt: StandOption; children: React.ReactNode }) {
  const { t } = useT();
  return (
    <div className="bg-cream-100 border border-ink-900/10 rounded-sm p-5 flex flex-col">
      <h3 className="text-ink-900 font-bold leading-tight mb-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(opt.name)}</h3>
      {opt.desc && <p className="text-ink-600 text-sm mb-4">{t(opt.desc)}</p>}
      <div className="mt-auto">{children}</div>
    </div>
  );
}

/** Carte d'option de stand — interactive (cases à cocher / steppers selon le type). */
function StandOptionCard({ opt }: { opt: StandOption }) {
  const est = useEstimator();
  const { t } = useT();
  const oid = (suffix: string) => `opt:${opt.name}:${suffix}`;

  /* ---- type simple : cas particuliers ---- */
  if (opt.type === "simple") {
    // Mobilier — traité séparément, non chiffré ici
    if (/mobilier/i.test(opt.name)) {
      return <OptCard opt={opt}><div className="text-ink-500 text-sm italic">{t(opt.price ?? "")}</div></OptCard>;
    }
    // Chariot élévateur — sélecteur d'heures
    if (/chariot/i.test(opt.name)) {
      const unit = parsePrice(opt.price) ?? 0;
      const id = oid("heures");
      const qty = est.get(id)?.qty ?? 0;
      const onChange = (n: number) => n > 0
        ? est.upsert({ id, group: OPT_GROUP, label: tx("Chariot élévateur"), detail: `${n} h × ${eur(unit)}/h`, amount: unit * n, qty: n })
        : est.remove(id);
      return <OptCard opt={opt}><StepperRow price={opt.price} value={qty} onChange={onChange} suffix="h" /></OptCard>;
    }
    // Badges exposants supp. — champ nombre avec + / −
    if (/badges/i.test(opt.name)) {
      const unit = parsePrice(opt.price) ?? 0;
      const id = oid("qty");
      const qty = est.get(id)?.qty ?? 0;
      const onChange = (n: number) => n > 0
        ? est.upsert({ id, group: OPT_GROUP, label: tx("Badges exposants supp."), detail: `${n} × ${eur(unit)}`, amount: unit * n, qty: n })
        : est.remove(id);
      return <OptCard opt={opt}><StepperRow price={opt.price} value={qty} onChange={onChange} suffix="badge(s)" /></OptCard>;
    }
    // Pack invitations — sélecteur + / −
    if (/invitation/i.test(opt.name)) {
      const unit = parsePrice(opt.price); // souvent « sur demande » → null
      const id = oid("packs");
      const qty = est.get(id)?.qty ?? 0;
      const onChange = (n: number) => n > 0
        ? est.upsert({ id, group: OPT_GROUP, label: tx(opt.name), detail: unit != null ? `${n} × ${eur(unit)}` : `${n} ${tx("pack(s) — sur devis")}`, amount: unit != null ? unit * n : null, qty: n })
        : est.remove(id);
      return <OptCard opt={opt}><StepperRow price={opt.price} value={qty} onChange={onChange} suffix="pack(s)" /></OptCard>;
    }
    // simple générique → case à cocher
    const amt = parsePrice(opt.price);
    const id = oid("x");
    return (
      <OptCard opt={opt}>
        <CheckRow checked={est.has(id)} onChange={() => est.toggle({ id, group: OPT_GROUP, label: tx(opt.name), amount: amt })} className="w-full">
          <span className="flex-1 flex items-center justify-between gap-2">
            <span className="text-ink-700 text-sm">{t("Sélectionner")}</span>
            <Price>{t(opt.price ?? "")}</Price>
          </span>
        </CheckRow>
      </OptCard>
    );
  }

  /* ---- type tableau : une case à cocher par cellule chiffrée ---- */
  if (opt.type === "table" && opt.head && opt.rows) {
    const multi = opt.head.length > 2;
    return (
      <OptCard opt={opt}>
        <div className="space-y-1">
          {opt.rows.map((row, ri) => {
            const cols = opt.head!.slice(1).map((h, ci) => ({ h, cell: row[ci + 1] }));
            const selectable = cols.filter((c) => c.cell && c.cell !== "—");
            if (selectable.length === 0) return null;
            return (
              <div key={ri} className="border-t border-ink-900/10 first:border-t-0 py-2">
                <div className="text-ink-700 text-sm font-medium mb-1">{t(row[0])}</div>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {selectable.map(({ h, cell }) => {
                    const amt = parsePrice(cell);
                    const id = oid(`${row[0]}|${h}`);
                    const label = multi ? `${tx(opt.name)} — ${tx(row[0])} (${tx(h)})` : `${tx(opt.name)} — ${tx(row[0])}`;
                    return (
                      <CheckRow key={h} checked={est.has(id)} onChange={() => est.toggle({ id, group: OPT_GROUP, label, amount: amt })}>
                        <span className="text-sm whitespace-nowrap">
                          {multi && <span className="text-ink-500">{t(h)} · </span>}
                          <span className="text-gold-700 font-bold">{cell}</span>
                        </span>
                      </CheckRow>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </OptCard>
    );
  }

  /* ---- type liste : case à cocher (forfait) ou stepper (au ml / m²) ---- */
  if (opt.type === "list" && opt.options) {
    // Co-exposition = options distinctes → cases à cocher ; sinon → steppers de quantité.
    const useCheckbox = /co-exposition/i.test(opt.name);
    return (
      <OptCard opt={opt}>
        <div className="space-y-1">
          {opt.options.map((o, i) => {
            const u = unitOf(o.price);
            const amt = parsePrice(o.price);
            const id = oid(o.label);
            if (useCheckbox) {
              return (
                <CheckRow key={i} checked={est.has(id)} className="w-full border-t border-ink-900/10 first:border-t-0 py-2" onChange={() => est.toggle({ id, group: OPT_GROUP, label: tx(o.label), detail: tx(opt.name), amount: amt })}>
                  <span className="flex-1 flex items-center justify-between gap-2">
                    <span className="text-ink-700 text-sm">{t(o.label)}</span>
                    <Price>{t(o.price ?? "")}</Price>
                  </span>
                </CheckRow>
              );
            }
            const qty = est.get(id)?.qty ?? 0;
            return (
              <div key={i} className="border-t border-ink-900/10 first:border-t-0 py-2">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-ink-700 text-sm">{t(o.label)}</span>
                  <Price>{t(o.price ?? "")}</Price>
                </div>
                <Stepper value={qty} suffix={u ?? undefined} onChange={(n) => n > 0
                  ? est.upsert({ id, group: OPT_GROUP, label: tx(o.label), detail: u ? `${n} ${u} × ${eur(amt ?? 0)}/${u}` : `${n} × ${o.price}`, amount: (amt ?? 0) * n, qty: n })
                  : est.remove(id)} />
              </div>
            );
          })}
        </div>
      </OptCard>
    );
  }

  return <OptCard opt={opt}><Price>{t(opt.price ?? "")}</Price></OptCard>;
}

/** Ligne « tarif + stepper » pour les options simples quantifiables. */
function StepperRow({ price, value, onChange, suffix }: { price?: string; value: number; onChange: (n: number) => void; suffix: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Price>{price}</Price>
      <Stepper value={value} onChange={onChange} suffix={suffix} />
    </div>
  );
}

/* ---- Étape 1 : sélecteur de surface nue (m² + zone A/B) ---- */
function SurfaceSelector() {
  const est = useEstimator();
  const { t } = useT();
  return (
    <div className="mt-8 bg-ink-950 rounded-sm p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
        <div>
          <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-3">{t("Surface souhaitée")}</div>
          <Stepper value={est.sqm} onChange={est.setSqm} min={0} max={2000} step={1} suffix="m²" className="bg-cream-50" />
        </div>
        <div>
          <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-3">{t("Zone")}</div>
          <div className="inline-flex rounded-sm border border-cream-50/20 overflow-hidden">
            {(["A", "B"] as Zone[]).map((z) => (
              <button
                key={z}
                type="button"
                onClick={() => est.setZone(z)}
                aria-pressed={est.zone === z}
                className={`px-5 py-2.5 text-sm font-bold transition-colors ${est.zone === z ? "bg-gold-500 text-ink-950" : "text-cream-50/70 hover:text-cream-50"}`}
                style={{ fontFamily: "SansPlomb-98, sans-serif" }}
              >
                Zone {z}
              </button>
            ))}
          </div>
        </div>
        <p className="md:ml-auto text-cream-50/50 text-xs max-w-[16rem]">
          {t("Indiquez votre surface : l'estimation s'affiche automatiquement à droite.")}
        </p>
      </div>
    </div>
  );
}

/** Bouton « Choisir cette option » sur une gamme de stand (exclusif). */
function RangeChooseButton({ rangeKey }: { rangeKey: string }) {
  const est = useEstimator();
  const { t } = useT();
  const selected = est.rangeKey === rangeKey;
  return (
    <div className="mt-4">
      <ChooseButton selected={selected} onClick={() => est.setRangeKey(selected ? null : rangeKey)} />
      {selected && est.sqm === 0 && (
        <p className="text-gold-700 text-[11px] mt-1.5 text-center">{t("Choisissez une surface ci-dessus pour le calcul.")}</p>
      )}
    </div>
  );
}

/** Étape 3 : sélecteur de surface extérieure (m²). */
function OutdoorSelector() {
  const est = useEstimator();
  const { t, lang } = useT();
  const unit = parsePrice(OUTDOOR.price) ?? 0;
  return (
    <div className="mt-5">
      <div className="text-ink-500 text-xs uppercase tracking-widest mb-2">{t("Surface extérieure")}</div>
      <Stepper value={est.outdoorSqm} onChange={est.setOutdoorSqm} min={0} max={2000} suffix="m²" />
      {est.outdoorSqm > 0 && (
        <div className="mt-2 text-ink-700 text-sm">≈ <span className="text-gold-700 font-bold">{fmtEUR(est.outdoorSqm * unit, lang)}</span></div>
      )}
    </div>
  );
}

/** Bouton « Choisir ce pack » dans l'en-tête d'un tier (exclusif). */
function PartnerHeaderChoose({ tierKey }: { tierKey: string }) {
  const est = useEstimator();
  return (
    <div className="mt-3">
      <ChooseButton selected={est.partnerKey === tierKey} labelIdle="Choisir ce pack" onClick={() => est.setPartnerKey(est.partnerKey === tierKey ? null : tierKey)} />
    </div>
  );
}

/** Ligne « Choisir ce pack » sous le tableau partenaires (exclusif). */
function PartnerSelectRow() {
  const est = useEstimator();
  const { t } = useT();
  return (
    <tr className="border-t-2 border-gold-500/30">
      <td className="p-4 align-bottom">
        <span className="text-ink-500 text-xs uppercase tracking-widest">{t("Je choisis")}</span>
      </td>
      {PARTNER_TIERS.map((tier) => (
        <td key={tier.key} className={`p-3 align-bottom ${tier.highlight ? "bg-gold-500/[0.08]" : ""}`}>
          <div className="text-center mb-2">
            <div className={`font-bold ${tier.highlight ? "text-gold-600" : "text-ink-900"}`} style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{tier.name}</div>
            <div className="text-ink-600 text-xs">{t(tier.price)}</div>
          </div>
          <ChooseButton selected={est.partnerKey === tier.key} labelIdle="Choisir ce pack" onClick={() => est.setPartnerKey(est.partnerKey === tier.key ? null : tier.key)} />
        </td>
      ))}
    </tr>
  );
}

/** Bouton « Choisir cette option » pour un pack Communication sur place (exclusif). */
function PlaceChoose({ packKey }: { packKey: string }) {
  const est = useEstimator();
  const selected = est.placeKey === packKey;
  return <div className="mt-auto pt-5"><ChooseButton selected={selected} onClick={() => est.setPlaceKey(selected ? null : packKey)} /></div>;
}

/** Case « ajouter » sur la vitrophanie (sur devis). */
function VitrophanieCheck() {
  const est = useEstimator();
  const { t } = useT();
  const id = "place:vitrophanie";
  return (
    <CheckRow dark checked={est.has(id)} onChange={() => est.toggle({ id, group: "Communication sur place", label: tx(VITROPHANIE.title), amount: parsePrice(VITROPHANIE.price) })}>
      <span className="text-cream-50/80 text-sm">{t("Ajouter à mon estimation")}</span>
    </CheckRow>
  );
}

/** Communication sur stand — structure élinguée (case) + personnalisation cloisons (ml). */
function CommStandControls() {
  const est = useEstimator();
  const { t, lang } = useT();
  // [0] = structure élinguée, [2] = personnalisation cloisons. [1] (panneau surélevé) retiré.
  const structure = COMM_STAND.items[0];
  const perso = COMM_STAND.items[2];
  const structureAmt = parsePrice(structure.price);
  // Personnalisation : "Or : 275 € HT/ml · Argent : 200 € HT/ml"
  const parts = perso.price.split("·");
  const orMl = parsePrice(parts.find((p) => /or/i.test(p))) ?? 275;
  const argentMl = parsePrice(parts.find((p) => /argent/i.test(p))) ?? 200;

  const argentId = "comm:cloison-argent";
  const orId = "comm:cloison-or";
  const argentQty = est.get(argentId)?.qty ?? 0;
  const orQty = est.get(orId)?.qty ?? 0;

  return (
    <div className="divide-y divide-ink-900/10">
      {/* Structure élinguée — case à cocher */}
      <div className="py-4 first:pt-0">
        <CheckRow checked={est.has("comm:structure")} onChange={() => est.toggle({ id: "comm:structure", group: "Communication", label: tx(structure.name), detail: tx("À partir de"), amount: structureAmt })} className="w-full">
          <span className="flex-1">
            <span className="block text-ink-900 font-bold leading-tight" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(structure.name)}</span>
            <span className="block text-ink-600 text-sm">{t(structure.desc)}</span>
          </span>
          <span className="text-gold-700 font-bold text-sm shrink-0">{t(structure.price)}</span>
        </CheckRow>
      </div>

      {/* Personnalisation des cloisons — un sélecteur de ml par gamme */}
      <div className="py-4">
        <h3 className="text-ink-900 font-bold leading-tight" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(perso.name)}</h3>
        <p className="text-ink-600 text-sm mt-1 mb-3">{t(perso.desc)}</p>
        <div className="space-y-3">
          {[
            { id: argentId, label: "Gamme argent", unit: argentMl },
            { id: orId, label: "Gamme or", unit: orMl },
          ].map((g) => (
            <div key={g.id} className="flex items-center justify-between gap-3">
              <span className="text-ink-700 text-sm">{t(g.label)} <span className="text-gold-700 font-semibold">({fmtEUR(g.unit, lang)}/ml)</span></span>
              <Stepper
                value={g.id === argentId ? argentQty : orQty}
                suffix="ml"
                onChange={(n) => n > 0
                  ? est.upsert({ id: g.id, group: "Communication", label: `${tx("Cloisons")} ${txMin(g.label)}`, detail: `${n} ml × ${eur(g.unit)}/ml`, amount: g.unit * n, qty: n })
                  : est.remove(g.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Bouton de choix générique (case à cocher) pour une carte/option de communication. */
function PickButton({ id, group, label, price, label2 }: { id: string; group: string; label: string; price?: string | null; label2?: string }) {
  const est = useEstimator();
  return (
    <ChooseButton
      selected={est.has(id)}
      labelIdle={label2 ?? "Choisir cette option"}
      onClick={() => est.toggle({ id, group, label: tx(label), amount: parsePrice(price) })}
    />
  );
}

/** Branding — tote-bag / briquet : champ nombre (min 5000 pièces). */
function BrandingQty({ name, price, photo, desc, min }: { name: string; price: string; photo: string; desc: string; min: number }) {
  const est = useEstimator();
  const { t } = useT();
  const unit = parsePrice(price) ?? 0;
  const id = `branding:${name}`;
  const qty = est.get(id)?.qty ?? 0;
  return (
    <div className="bg-cream-100 border border-ink-900/10 rounded-sm overflow-hidden flex flex-col">
      <PhotoBox ratio="aspect-square" label={photo} />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-ink-900 font-bold text-sm leading-tight mb-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(name)}</h3>
        <p className="text-ink-600 text-xs mb-2">{t(desc)}</p>
        <Price>{price}</Price>
        <div className="mt-3">
          <Stepper
            value={qty}
            min={0}
            max={500000}
            step={1000}
            suffix="pcs"
            onChange={(n) => {
              const v = n > 0 && n < min ? min : n;
              return v > 0
                ? est.upsert({ id, group: "Branding", label: tx(name), detail: `${v.toLocaleString("fr-FR")} pcs × ${price}`, amount: unit * v, qty: v })
                : est.remove(id);
            }}
          />
          <p className="text-ink-400 text-[10px] mt-1">{t("Minimum")} {min.toLocaleString("fr-FR")} {t("pièces.")}</p>
        </div>
      </div>
    </div>
  );
}

/** Branding — option à prix fixe (case à cocher). */
function BrandingPick({ name, price, photo, desc }: { name: string; price: string; photo: string; desc: string }) {
  const est = useEstimator();
  const { t } = useT();
  const id = `branding:${name}`;
  return (
    <div className="bg-cream-100 border border-ink-900/10 rounded-sm overflow-hidden flex flex-col">
      <PhotoBox ratio="aspect-square" label={photo} />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-ink-900 font-bold text-sm leading-tight mb-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(name)}</h3>
        <p className="text-ink-600 text-xs mb-2">{t(desc)}</p>
        <Price>{price}</Price>
        <div className="mt-3 mt-auto pt-3">
          <ChooseButton selected={est.has(id)} onClick={() => est.toggle({ id, group: "Branding", label: tx(name), amount: parsePrice(price) })} />
        </div>
      </div>
    </div>
  );
}

/** Sponsoring — case à cocher par option de zone. */
function SponsoringRow({ zone, name, price }: { zone: string; name: string; price: string }) {
  const est = useEstimator();
  const { t } = useT();
  const id = `sponsoring:${zone}:${name}`;
  return (
    <li className="flex justify-between items-center gap-4 border-b border-ink-900/10 pb-2">
      <CheckRow checked={est.has(id)} onChange={() => est.toggle({ id, group: "Sponsoring", label: `${tx(zone)} — ${tx(name)}`, amount: parsePrice(price) })}>
        <span className="text-ink-700 text-sm">{t(name)}</span>
      </CheckRow>
      <Price>{price}</Price>
    </li>
  );
}

/** Barbecue Mag — case « format » + case « + publirédactionnel ». */
function MagFormatRow({ format }: { format: { name: string; priceExpo: string; pricePubliredac: string; preview: string | null } }) {
  const est = useEstimator();
  const { t } = useT();
  const fid = `mag:${format.name}`;
  const pid = `mag:${format.name}:pub`;
  const fmtSelected = est.has(fid);
  const pubAmt = parsePrice(format.pricePubliredac);
  return (
    <tr className="border-t border-cream-50/10 text-sm">
      <td className="py-3 text-cream-50/85">
        <span className="inline-flex items-center gap-2">
          <CheckRow dark checked={fmtSelected} onChange={() => {
            if (fmtSelected) { est.remove(fid); est.remove(pid); }
            else est.upsert({ id: fid, group: "Barbecue Mag", label: tx(format.name), amount: parsePrice(format.priceExpo) });
          }}>
            <span>{t(format.name)}</span>
          </CheckRow>
          {format.preview && <DispositifPreview src={format.preview} label={`Barbecue Mag — ${t(format.name)}`} />}
        </span>
      </td>
      <td className="py-3 pr-6 text-right text-gold-500 font-semibold whitespace-nowrap">{format.priceExpo}</td>
      <td className="py-3 pl-6 border-l border-cream-50/10">
        <CheckRow
          dark
          checked={est.has(pid)}
          onChange={() => {
            if (!fmtSelected) return; // publirédac uniquement si format choisi
            est.toggle({ id: pid, group: "Barbecue Mag", label: `${tx(format.name)} — ${tx("publirédac (2 pages)")}`, amount: pubAmt });
          }}
          className={!fmtSelected ? "opacity-40 pointer-events-none" : ""}
        >
          <span className="text-cream-50/70 whitespace-nowrap">{format.pricePubliredac}</span>
        </CheckRow>
      </td>
    </tr>
  );
}

/* Plan interactif zoomable / déplaçable */
function PlanViewer({ src }: { src: string }) {
  const { t } = useT();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ on: boolean; x: number; y: number }>({ on: false, x: 0, y: 0 });
  const clamp = (s: number) => Math.min(6, Math.max(1, Math.round(s * 100) / 100));

  const zoom = (delta: number) => setScale((s) => {
    const ns = clamp(s + delta);
    if (ns === 1) setPos({ x: 0, y: 0 });
    return ns;
  });
  const reset = () => { setScale(1); setPos({ x: 0, y: 0 }); };

  // molette = zoom (listener natif non-passif pour pouvoir preventDefault)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScale((s) => {
        const ns = clamp(s + (e.deltaY < 0 ? 0.25 : -0.25));
        if (ns === 1) setPos({ x: 0, y: 0 });
        return ns;
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (scale === 1) return;
    drag.current = { on: true, x: e.clientX - pos.x, y: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.on) return;
    setPos({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y });
  };
  const onPointerUp = () => { drag.current.on = false; };

  return (
    <div
      ref={wrapRef}
      className={`relative w-full aspect-[16/9] bg-cream-100 border border-ink-900/10 rounded-sm overflow-hidden touch-none select-none ${scale > 1 ? (drag.current.on ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onClick={() => scale === 1 && zoom(0.5)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={t("Plan du salon Barbecue Expo 2027")}
        draggable={false}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`, transformOrigin: "center center", transition: drag.current.on ? "none" : "transform 0.12s ease-out" }}
      />
      {/* Contrôles */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
        <button type="button" aria-label={t("Dézoomer")} onClick={(e) => { e.stopPropagation(); zoom(-0.5); }} className="w-9 h-9 rounded-full bg-ink-950/85 text-cream-50 flex items-center justify-center text-xl font-bold hover:bg-ink-950 shadow-lg">−</button>
        <button type="button" aria-label={t("Réinitialiser")} onClick={(e) => { e.stopPropagation(); reset(); }} className="px-3 h-9 rounded-full bg-ink-950/85 text-cream-50 flex items-center justify-center text-xs font-semibold hover:bg-ink-950 shadow-lg">{t("Réinit.")}</button>
        <button type="button" aria-label={t("Zoomer")} onClick={(e) => { e.stopPropagation(); zoom(0.5); }} className="w-9 h-9 rounded-full bg-gold-500 text-ink-950 flex items-center justify-center text-xl font-bold hover:bg-gold-300 shadow-lg">+</button>
      </div>
      <div className="absolute top-3 left-3 text-ink-600 text-[11px] bg-cream-50/80 backdrop-blur px-2.5 py-1 rounded-full pointer-events-none">{t("Molette ou +/− pour zoomer · glisser pour déplacer")}</div>
    </div>
  );
}

/* Œil de prévisualisation d'un dispositif (lightbox image) */
function DispositifPreview({ src, label }: { src: string; label: string }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${t("Voir le dispositif")} : ${label}`}
        title={t("Voir le dispositif")}
        className="inline-flex items-center justify-center w-6 h-6 rounded-full text-gold-600 hover:text-ink-950 hover:bg-gold-500 transition-colors align-middle"
      >
        <Eye className="w-4 h-4" strokeWidth={2} />
      </button>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-950/85 backdrop-blur-sm" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={label}>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setOpen(false)} aria-label={t("Fermer")} className="absolute -top-10 right-0 w-9 h-9 rounded-full bg-cream-50/10 hover:bg-cream-50/20 text-cream-50 flex items-center justify-center text-lg">✕</button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={label} className="w-full h-auto rounded-sm shadow-2xl" />
            <p className="text-cream-50/80 text-sm mt-3 text-center">{label}</p>
          </div>
        </div>
      )}
    </>
  );
}

/* Bouton « Feuilleter le magazine » + visionneuse PDF plein écran */
function MagFlipButton({ src, title }: { src: string; title: string }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-gold-500 text-ink-950 px-5 py-3 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gold-300 transition-colors"
      >
        <BookOpen className="w-4 h-4" strokeWidth={2.5} /> {t("Feuilleter le magazine")}
      </button>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-950/85 backdrop-blur-sm" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={title}>
          <div className="relative w-full max-w-5xl h-[88vh] bg-cream-50 rounded-sm overflow-hidden shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 p-3 border-b border-ink-900/10 shrink-0">
              <span className="text-ink-900 font-bold text-sm" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{title}</span>
              <div className="flex items-center gap-2">
                <a href={src} target="_blank" rel="noopener noreferrer" className="text-gold-700 text-xs font-semibold inline-flex items-center gap-1">{t("Ouvrir")} <ExternalLink className="w-3 h-3" /></a>
                <button type="button" onClick={() => setOpen(false)} aria-label={t("Fermer")} className="w-8 h-8 rounded-full bg-ink-900/5 hover:bg-ink-900/10 text-ink-900 flex items-center justify-center">✕</button>
              </div>
            </div>
            <iframe src={`${src}#view=FitH`} title={title} className="flex-1 w-full border-0" />
          </div>
        </div>
      )}
    </>
  );
}

/* ============================ shared bits ============================ */

/** Placeholder photo box */
function PhotoBox({ ratio = "aspect-[4/3]", label = PHOTO }: { ratio?: string; label?: string }) {
  // Si label est un chemin (image réelle), on l'affiche ; sinon placeholder.
  if (label && label.startsWith("/")) {
    return (
      <div className={`${ratio} relative w-full rounded-sm overflow-hidden bg-ink-900/5`}>
        <Image src={label} alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div className={`${ratio} w-full rounded-sm bg-ink-900/5 border border-dashed border-ink-900/20 flex items-center justify-center text-ink-400 text-xs uppercase tracking-widest`}>
      {label}
    </div>
  );
}

function Price({ children }: { children: React.ReactNode }) {
  return <span className="text-gold-700 font-bold whitespace-nowrap">{children}</span>;
}

/* ============================ sticky nav ============================ */

function StickyNav({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const { t } = useT();
  const navItems = [
    { id: "expo", label: "Présentation" },
    { id: "stand", label: "Catalogue exposant" },
  ];
  return (
    <div className="sticky top-0 z-50 bg-ink-950/90 backdrop-blur border-b border-cream-50/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex items-center gap-3 sm:gap-4">
        <span className="hidden sm:block text-cream-50 font-bold text-sm uppercase tracking-widest shrink-0" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
          {t("Exposer")}
        </span>
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
          {navItems.map((it) => (
            <a key={it.id} href={`#${it.id}`} className="px-3 py-1.5 rounded-full text-cream-50/80 hover:text-gold-500 hover:bg-cream-50/5 text-xs uppercase tracking-widest whitespace-nowrap transition-colors">
              {t(it.label)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 ml-auto shrink-0">
          <a href="#partenaires" className="hidden md:inline-flex bg-gold-500 text-ink-950 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            {t("Devenir partenaire")}
          </a>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
      </div>
    </div>
  );
}

/* ============================ main ============================ */

/**
 * La présentation du salon suivie du catalogue exposant complet (options,
 * communication, sponsoring, estimation détaillée). C'est la page des
 * commerciaux (/pres-exposants) : ni demande d'e-mail, ni événement de mesure.
 * La page des campagnes est PageCampagnes.tsx.
 */
export default function CatalogueClient() {
  const locale = useLocale();
  // La langue du catalogue est celle de l'URL : les drapeaux changent d'URL
  // (/en/pres-exposants…) pour que toute la page suive, menu, pied de page et
  // lecteur vidéo compris. Le devis en cours est gardé en localStorage.
  const lang: Lang = isLang(locale) ? locale : "fr";
  const router = useRouter();
  const pathname = usePathname();
  const setLang = (l: Lang) => router.replace(pathname, { locale: l, scroll: false });
  const t = useMemo(() => (fr: string) => translate(lang, fr), [lang]);
  // Voir scriptHautDePage (haut-de-page.ts) : ne s'applique qu'à cette page.
  useEffect(() => {
    history.scrollRestoration = "manual";
    return () => { history.scrollRestoration = "auto"; };
  }, []);
  return (
    <VarianteContext.Provider value="commerciaux">
    <LangContext.Provider value={{ lang, t }}>
    <EstimatorProvider>
    <article className="bg-cream-50">
      <StickyNav lang={lang} setLang={setLang} />
      <EstimatorPanel cfg={ESTIMATOR_CFG} />

      {/* ───────────── HERO ───────────── */}
      <section className="relative min-h-[52vh] flex items-end overflow-hidden bg-ink-950">
        <Image src="/photos-2026/bbq-expo-066.jpg" alt="" fill priority fetchPriority="high" sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 pb-16">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-6">
            <span className="inline-block w-8 h-px bg-gold-500" /> {t("Exposer · Édition 2027")}
          </div>
          <h1 className="text-cream-50 text-4xl sm:text-5xl md:text-7xl leading-[0.95] font-bold max-w-4xl" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {t("Présentation du salon & catalogue exposant.")}
          </h1>
          <p className="mt-6 text-cream-50/80 text-lg max-w-2xl">{t("12 · 13 · 14 Mars 2027 — Parc Floral de Paris")}</p>
          <a
            href="#configurateur"
            className="group mt-6 inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors"
          >
            {t("Voir les tarifs et configurer mon stand")}
            <ArrowUpRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2.5} />
          </a>
        </div>
      </section>

      {/* ════════════ PARTIE A — PRÉSENTATION (PresentationSalon.tsx) ════════════ */}

      <PresentationSalon />

      {/* ════════════ PARTIE B — CATALOGUE EXPOSANT ════════════ */}

      <div className="bg-gold-500 py-6 text-center">
        <span className="text-ink-950 text-sm md:text-base font-bold uppercase tracking-[0.3em]" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
          {t("Catalogue exposant 2027")}
        </span>
      </div>

      {/* 1. Choisir son stand */}
      <Sec id="stand" eyebrow="Stand" title="Choisir son stand">
        {/* Plan interactif du salon */}
        <div className="mb-16">
          <div className="text-ink-500 text-xs uppercase tracking-widest mb-4">{t("Plan du salon 2027")}</div>
          <PlanViewer src="/plan/plan-2027.svg" />
        </div>
        {/* Étape 1 — surface nue */}
        <div id="configurateur" className="scroll-mt-20 mb-6 flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-gold-500 text-ink-950 flex items-center justify-center text-sm font-bold shrink-0">1</span>
          <h3 className="text-ink-900 text-xl md:text-2xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t("Je choisis la taille — surface nue")}</h3>
        </div>
        <div className="grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-3">
            <div className="rounded-sm overflow-hidden border border-ink-900/10">
              <PhotoBox ratio="aspect-square" label="/stands/surface-nue.png" />
            </div>
          </div>
          <div className="md:col-span-5 bg-cream-100 border border-ink-900/10 rounded-sm p-6">
            <ul className="space-y-2.5">
              {STAND_SURFACE.includes.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-ink-700"><Check className="w-4 h-4 text-gold-600 mt-1 shrink-0" strokeWidth={2.5} />{t(it)}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4 bg-ink-950 rounded-sm p-6 flex flex-col justify-center">
            <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-4">{t("Tarif au m²")}</div>
            <ul className="space-y-3">
              {STAND_SURFACE.zones.map((z) => (
                <li key={z.zone} className="flex items-center justify-between border-b border-cream-50/10 pb-3">
                  <span className="text-cream-50 font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(z.zone)}</span>
                  <span className="text-gold-500 font-bold">{t(z.price)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sélecteur de surface + zone → déclenche l'estimation */}
        <SurfaceSelector />

        {/* Étape 2 — gamme */}
        <div className="mt-16 mb-6 flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-gold-500 text-ink-950 flex items-center justify-center text-sm font-bold shrink-0">2</span>
          <h3 className="text-ink-900 text-xl md:text-2xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t("Je choisis ma gamme de stand")}</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAND_RANGES.map((r) => (
            <div key={r.key} className={`bg-cream-100 border rounded-sm overflow-hidden ${r.popular ? "border-gold-500/60" : "border-ink-900/10"}`}>
              <PhotoBox ratio="aspect-[16/9]" label={r.photo} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="text-ink-900 text-lg font-bold leading-tight" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(r.title)}</h4>
                  <Price>{t(r.price)}</Price>
                </div>
                {r.desc && <p className="text-ink-600 text-sm mb-3">{t(r.desc)}</p>}
                {r.features.length > 0 && (
                  <ul className="space-y-1.5 mb-4">
                    {r.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-ink-700 text-sm"><Check className="w-3.5 h-3.5 text-gold-600 mt-0.5 shrink-0" strokeWidth={2.5} />{t(f)}</li>
                    ))}
                  </ul>
                )}
                {r.moquette && (
                  <div className="flex items-center gap-3 border-t border-ink-900/10 pt-3">
                    <span className="text-ink-500 text-xs uppercase tracking-widest">{t("Moquette :")}</span>
                    <div className="flex gap-2">
                      {r.moquette.map((c) => (
                        <span key={c.name} title={t(c.name)} className="w-5 h-5 rounded-full border border-ink-900/20" style={{ backgroundColor: c.hex }} />
                      ))}
                    </div>
                  </div>
                )}
                {r.cloisons && (
                  <div className="flex items-center gap-3 border-t border-ink-900/10 pt-3 mt-3">
                    <span className="text-ink-500 text-xs uppercase tracking-widest whitespace-nowrap">{t("Cloisons :")}</span>
                    {Array.isArray(r.cloisons) ? (
                      <div className="flex gap-2">
                        {r.cloisons.map((c) => (
                          <span key={c.name} title={t(c.name)} className="w-5 h-5 rounded-full border border-ink-900/20" style={{ backgroundColor: c.hex }} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1">
                        <div
                          className="h-5 w-full rounded-full border border-ink-900/20"
                          title={t("Couleur des cloisons personnalisable (nuancier complet)")}
                          style={{ background: "linear-gradient(90deg, #000 0%, #fff 8%, #e11d48 22%, #f97316 36%, #facc15 50%, #22c55e 64%, #06b6d4 78%, #6366f1 90%, #a21caf 100%)" }}
                        />
                        <span className="block text-ink-400 text-[10px] mt-1">{t("Couleur au choix — nuancier complet")}</span>
                      </div>
                    )}
                  </div>
                )}
                <RangeChooseButton rangeKey={r.key} />
              </div>
            </div>
          ))}
        </div>

        {/* Étape 3 — espace extérieur */}
        <div id="exterieur" className="scroll-mt-24 mt-16 mb-6 flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-gold-500 text-ink-950 flex items-center justify-center text-sm font-bold shrink-0">3</span>
          <h3 className="text-ink-900 text-xl md:text-2xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t("Je peux ajouter un espace extérieur")}</h3>
        </div>
        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-7 relative aspect-[16/9] rounded-sm overflow-hidden border border-ink-900/10">
            <Image src={OUTDOOR.photo} alt={t("Espace exposant extérieur")} fill sizes="(max-width:768px) 100vw, 60vw" className="object-cover" />
          </div>
          <div className="md:col-span-5 bg-cream-100 border border-ink-900/10 rounded-sm p-6 flex flex-col justify-center">
            <p className="text-ink-700 text-base md:text-lg mb-4">{t(OUTDOOR.desc)}</p>
            <div className="text-gold-700 text-3xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(OUTDOOR.price)}</div>
            <OutdoorSelector />
          </div>
        </div>
      </Sec>

      {/* 3. Options de stand */}
      <Sec id="options-stand" eyebrow="Options" title="Choisir les options de stand">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {STAND_OPTIONS.map((o) => (
            <StandOptionCard key={o.name} opt={o} />
          ))}
        </div>
      </Sec>

      {/* 4. Devenir partenaire — comparatif */}
      <Sec id="partenaires" eyebrow="Communication — en priorité" title="Devenir Partenaire Barbecue Expo">
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-[680px] border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4"></th>
                {PARTNER_TIERS.map((tier) => (
                  <th key={tier.key} className={`p-4 text-center align-bottom ${tier.highlight ? "bg-gold-500/10 rounded-t-sm" : ""}`}>
                    <div className={`text-xl font-bold ${tier.highlight ? "text-gold-600" : "text-ink-900"}`} style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(tier.name)}</div>
                    <div className="text-ink-600 text-sm mt-1">{t(tier.price)}</div>
                    <PartnerHeaderChoose tierKey={tier.key} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PARTNER_FEATURE_GROUPS.map((group) => (
                <Fragment key={group.category}>
                  <tr>
                    <td colSpan={1 + PARTNER_TIERS.length} className="pt-8 pb-3 px-4">
                      <span className="text-gold-600 text-xs font-bold uppercase tracking-widest">{t(group.category)}</span>
                    </td>
                  </tr>
                  {group.rows.map((row, i) => (
                    <tr key={i} className="border-t border-ink-900/10">
                      <td className="p-4 text-ink-900 text-sm">
                        <span className="inline-flex items-center gap-1.5">
                          {t(row.label)}
                          {row.preview && <DispositifPreview src={row.preview} label={t(row.label)} />}
                        </span>
                      </td>
                      {(["platinium", "gold", "silver"] as const).map((k) => {
                        const v = row[k];
                        return (
                          <td key={k} className={`p-4 text-center ${PARTNER_TIERS.find((pt) => pt.key === k)?.highlight ? "bg-gold-500/[0.08]" : ""}`}>
                            {v === true ? <Check className="w-5 h-5 text-gold-600 mx-auto" strokeWidth={2.5} />
                              : v === false ? <XIcon className="w-4 h-4 text-ink-900/20 mx-auto" />
                              : <span className="text-ink-900 text-sm font-semibold">{t(v)}</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </Fragment>
              ))}
              <PartnerSelectRow />
            </tbody>
          </table>
        </div>
      </Sec>

      {/* 5. Comm sur stand */}
      <Sec id="comm-stand" eyebrow="Communication" title="Communication sur stand — signalétique">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Photo stand à gauche */}
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-ink-900/10">
            <Image src={COMM_STAND.photo} alt={t("Exemple de stand personnalisé avec signalétique en hauteur")} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
          {/* Contrôles interactifs à droite */}
          <CommStandControls />
        </div>
      </Sec>

      {/* 6. Comm sur place */}
      <Sec id="comm-place" eyebrow="Communication" title="Communication sur place" dark>
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          {COMM_PLACE_PACKS.map((p) => (
            <div key={p.name} className={`rounded-sm p-6 border flex flex-col ${p.popular ? "border-gold-500/60 bg-gold-500/10" : "border-cream-50/15 bg-cream-50/[0.03]"}`}>
              <h3 className="text-cream-50 text-xl font-bold mb-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(p.name)}</h3>
              <div className="text-gold-500 font-bold mb-4">{p.price}</div>
              <ul className="space-y-2">
                {p.includes.map((inc, j) => (
                  <li key={j} className="flex items-start gap-2 text-cream-50/75 text-sm"><Check className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />{t(inc)}</li>
                ))}
              </ul>
              <PlaceChoose packKey={p.name} />
            </div>
          ))}
        </div>
        <div className="bg-cream-50/[0.03] border border-cream-50/10 rounded-sm p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-cream-50 font-bold mb-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(VITROPHANIE.title)}</h3>
            <p className="text-cream-50/70 text-sm">{t(VITROPHANIE.desc)}</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
            <div className="text-gold-500 font-bold whitespace-nowrap">{VITROPHANIE.price}</div>
            <VitrophanieCheck />
          </div>
        </div>
      </Sec>

      {/* 7. Branding */}
      <Sec id="branding" eyebrow="Communication" title="Options de branding">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRANDING.map((b) =>
            /tote|briquet/i.test(b.name)
              ? <BrandingQty key={b.name} name={b.name} price={b.price} photo={b.photo} desc={b.desc} min={5000} />
              : <BrandingPick key={b.name} name={b.name} price={b.price} photo={b.photo} desc={b.desc} />,
          )}
        </div>
      </Sec>

      {/* 8. Comm digitale */}
      <Sec id="comm-digital" eyebrow="Communication" title="Communication digitale" dark>
        <p className="text-cream-50/70 text-sm md:text-base max-w-2xl mb-8 -mt-4">{t("Trois packs pensés selon le moment : avant pour attirer, pendant pour capter, après pour relancer.")}</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {COMM_DIGITAL.map((p) => (
            <div key={p.name} className={`relative rounded-sm p-6 border flex flex-col ${p.popular ? "border-gold-500/60 bg-gold-500/10" : "border-cream-50/15 bg-cream-50/[0.03]"}`}>
              {p.popular && <span className="absolute -top-3 left-6 bg-gold-500 text-ink-950 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">{t("Le plus visible")}</span>}
              <h3 className="text-cream-50 text-xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(p.name)}</h3>
              <div className="text-gold-500 font-bold mb-2">{p.price}</div>
              <p className="text-cream-50/70 text-sm mb-5">{t(p.desc)}</p>
              <ul className="space-y-2.5 mb-5">
                {p.includes.map((inc, j) => (
                  <li key={j} className="flex items-start gap-2 text-cream-50/85 text-sm"><Check className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" strokeWidth={2.5} />{t(inc)}</li>
                ))}
              </ul>
              <div className="mt-auto">
                <PickButton id={`digital:${p.name}`} group="Communication" label={p.name} price={p.price} label2="Choisir ce plan" />
              </div>
            </div>
          ))}
        </div>

        {/* Pack global — pleine largeur */}
        <div className="mt-6 rounded-sm border border-gold-500/60 bg-gradient-to-r from-gold-500/15 to-gold-500/[0.04] p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
            <div className="lg:flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-cream-50 text-2xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(COMM_DIGITAL_GLOBAL.name)}</h3>
                <span className="bg-gold-500 text-ink-950 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">{t("Les 3 packs réunis")}</span>
              </div>
              <p className="text-cream-50/70 text-sm mt-2 max-w-2xl">{t(COMM_DIGITAL_GLOBAL.desc)}</p>
            </div>
            <div className="lg:text-right shrink-0">
              <div className="text-gold-500 text-3xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{COMM_DIGITAL_GLOBAL.price}</div>
              <div className="text-cream-50/60 text-xs mt-1">{t(COMM_DIGITAL_GLOBAL.saving)}</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 border-t border-cream-50/15 pt-6">
            {COMM_DIGITAL_GLOBAL.phases.map((ph) => (
              <div key={ph.title}>
                <div className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-3">{t(ph.title)}</div>
                <ul className="space-y-2">
                  {ph.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-2 text-cream-50/85 text-sm"><Check className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" strokeWidth={2.5} />{t(it)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 max-w-xs">
            <PickButton id="digital:global" group="Communication" label={COMM_DIGITAL_GLOBAL.name} price={COMM_DIGITAL_GLOBAL.price} label2="Choisir ce pack global" />
          </div>
        </div>
      </Sec>

      {/* 9. Sponsoring de zone */}
      <Sec id="sponsoring" eyebrow="Communication" title="Sponsoring de zone">
        <div className="space-y-6">
          {SPONSORING.map((z) => (
            <div key={z.zone} className="grid md:grid-cols-3 gap-6 items-center bg-cream-100 border border-ink-900/10 rounded-sm p-6">
              <div className="md:col-span-1">
                <PhotoBox ratio="aspect-[4/3]" label={z.photo} />
              </div>
              <div className="md:col-span-2">
                <h3 className="text-ink-900 text-2xl font-bold mb-4" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(z.zone)}</h3>
                <ul className="space-y-2">
                  {z.options.map((o) => (
                    <SponsoringRow key={o.name} zone={z.zone} name={o.name} price={o.price} />
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      {/* 10. Barbecue Mag */}
      <Sec id="barbecue-mag" eyebrow="Communication print" title={BARBECUE_MAG.title} dark>
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="min-w-0">
            <p className="text-cream-50/80 mb-6">{t(BARBECUE_MAG.desc)}</p>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {BARBECUE_MAG.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-gold-500 text-2xl md:text-3xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(s.value)}</div>
                  <div className="text-cream-50/60 text-xs uppercase tracking-widest mt-1">{t(s.label)}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {BARBECUE_MAG.photos.map((src, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-sm overflow-hidden bg-ink-900">
                  <Image src={src} alt={`Barbecue Mag ${i + 1}`} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="mt-5">
              <MagFlipButton src="/mag/barbecue-mag-n6.pdf" title="Barbecue Mag N°6 — BBQ Revolution" />
            </div>
          </div>
          <div className="min-w-0 overflow-x-auto">
            <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-3">{t("Tarifs encarts")}</div>
            <table className="w-full">
              <thead>
                <tr className="text-cream-50/50 text-xs uppercase tracking-widest">
                  <th className="text-left py-2">{t("Format")}</th><th className="text-right py-2 pr-6">{t("Exposant")}</th><th className="text-left py-2 pl-6">{t("+ Publirédac (2 pages)")}</th>
                </tr>
              </thead>
              <tbody>
                {BARBECUE_MAG.formats.map((f) => (
                  <MagFormatRow key={f.name} format={f} />
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-cream-50/40 text-[11px] leading-relaxed">{t("Publirédactionnel : 2 pages éditoriales rédigées par nos soins, en option sur n'importe quel format (+ 700 € HT).")}</p>
          </div>
        </div>
      </Sec>

      {/* CTA */}
      <section className="bg-ink-950 py-20 text-center border-t border-cream-50/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-cream-50 text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t("En 2027, toutes les flammes mènent à Paris.")}</h2>
          <a href="#stand" className="group inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-300 text-ink-950 px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors">
            {t("Réserver mon stand")} <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2.5} />
          </a>
        </div>
      </section>
    </article>
    </EstimatorProvider>
    </LangContext.Provider>
    </VarianteContext.Provider>
  );
}
