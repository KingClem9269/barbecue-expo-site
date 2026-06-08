"use client";

import { useState, useEffect, useRef, useMemo, Fragment } from "react";
import Image from "next/image";
import { Check, X as XIcon, Globe, MapPin, Play, Instagram, ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight, Eye, BookOpen } from "lucide-react";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import BrandLogoMarquee from "@/components/BrandLogoMarquee";
import PhotoMarquee from "@/components/PhotoMarquee";
import ExperienceZones from "@/components/visitor/ExperienceZones";
import VisitorMap from "./VisitorMap";
import pitmastersData from "@/content/pitmasters/index.json";
import {
  PRESENTATION_NAV, CATALOGUE_NAV, STAND_SURFACE, STAND_RANGES, OUTDOOR, STAND_OPTIONS, type StandOption,
  PARTNER_TIERS, PARTNER_FEATURE_GROUPS, COMM_STAND, COMM_PLACE_PACKS, VITROPHANIE,
  BRANDING, COMM_DIGITAL, COMM_DIGITAL_GLOBAL, SPONSORING, BARBECUE_MAG, PHOTO,
  VISITOR_PROVENANCE, MAP_LEGEND, PRO_TYPES, PRODUCT_CATEGORIES,
  MEDIA_FEATURED, MEDIA_MENTIONS, AFFICHAGE,
  SOCIAL_REACH, SOCIAL_ACCOUNTS, SOCIAL_POSTS,
} from "./data";
import InstagramEmbed from "@/components/InstagramEmbed";
import { EN, LangContext, useT, type Lang } from "./i18n";
import {
  EstimatorProvider, EstimatorPanel, useEstimator, parsePrice, fmtEUR,
  Stepper, CheckRow, ChooseButton, type Zone,
} from "./Estimator";

/* Sous-titre dans une section sombre */
function SubLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-6 ${className}`}>
      <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
      {children}
    </div>
  );
}

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
  return (
    <div className="bg-cream-100 border border-ink-900/10 rounded-sm p-5 flex flex-col">
      <h3 className="text-ink-900 font-bold leading-tight mb-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{opt.name}</h3>
      {opt.desc && <p className="text-ink-600 text-sm mb-4">{opt.desc}</p>}
      <div className="mt-auto">{children}</div>
    </div>
  );
}

/** Carte d'option de stand — interactive (cases à cocher / steppers selon le type). */
function StandOptionCard({ opt }: { opt: StandOption }) {
  const est = useEstimator();
  const oid = (suffix: string) => `opt:${opt.name}:${suffix}`;

  /* ---- type simple : cas particuliers ---- */
  if (opt.type === "simple") {
    // Mobilier — traité séparément, non chiffré ici
    if (/mobilier/i.test(opt.name)) {
      return <OptCard opt={opt}><div className="text-ink-500 text-sm italic">{opt.price}</div></OptCard>;
    }
    // Chariot élévateur — sélecteur d'heures
    if (/chariot/i.test(opt.name)) {
      const unit = parsePrice(opt.price) ?? 0;
      const id = oid("heures");
      const qty = est.get(id)?.qty ?? 0;
      const onChange = (n: number) => n > 0
        ? est.upsert({ id, group: OPT_GROUP, label: "Chariot élévateur", detail: `${n} h × ${fmtEUR(unit)}/h`, amount: unit * n, qty: n })
        : est.remove(id);
      return <OptCard opt={opt}><StepperRow price={opt.price} value={qty} onChange={onChange} suffix="h" /></OptCard>;
    }
    // Badges exposants supp. — champ nombre avec + / −
    if (/badges/i.test(opt.name)) {
      const unit = parsePrice(opt.price) ?? 0;
      const id = oid("qty");
      const qty = est.get(id)?.qty ?? 0;
      const onChange = (n: number) => n > 0
        ? est.upsert({ id, group: OPT_GROUP, label: "Badges exposants supp.", detail: `${n} × ${fmtEUR(unit)}`, amount: unit * n, qty: n })
        : est.remove(id);
      return <OptCard opt={opt}><StepperRow price={opt.price} value={qty} onChange={onChange} suffix="badge(s)" /></OptCard>;
    }
    // Pack invitations — sélecteur + / −
    if (/invitation/i.test(opt.name)) {
      const unit = parsePrice(opt.price); // souvent « sur demande » → null
      const id = oid("packs");
      const qty = est.get(id)?.qty ?? 0;
      const onChange = (n: number) => n > 0
        ? est.upsert({ id, group: OPT_GROUP, label: opt.name, detail: unit != null ? `${n} × ${fmtEUR(unit)}` : `${n} pack(s) — sur devis`, amount: unit != null ? unit * n : null, qty: n })
        : est.remove(id);
      return <OptCard opt={opt}><StepperRow price={opt.price} value={qty} onChange={onChange} suffix="pack(s)" /></OptCard>;
    }
    // simple générique → case à cocher
    const amt = parsePrice(opt.price);
    const id = oid("x");
    return (
      <OptCard opt={opt}>
        <CheckRow checked={est.has(id)} onChange={() => est.toggle({ id, group: OPT_GROUP, label: opt.name, amount: amt })} className="w-full">
          <span className="flex-1 flex items-center justify-between gap-2">
            <span className="text-ink-700 text-sm">Sélectionner</span>
            <Price>{opt.price}</Price>
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
                <div className="text-ink-700 text-sm font-medium mb-1">{row[0]}</div>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {selectable.map(({ h, cell }) => {
                    const amt = parsePrice(cell);
                    const id = oid(`${row[0]}|${h}`);
                    const label = multi ? `${opt.name} — ${row[0]} (${h})` : `${opt.name} — ${row[0]}`;
                    return (
                      <CheckRow key={h} checked={est.has(id)} onChange={() => est.toggle({ id, group: OPT_GROUP, label, amount: amt })}>
                        <span className="text-sm whitespace-nowrap">
                          {multi && <span className="text-ink-500">{h} · </span>}
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
                <CheckRow key={i} checked={est.has(id)} className="w-full border-t border-ink-900/10 first:border-t-0 py-2" onChange={() => est.toggle({ id, group: OPT_GROUP, label: o.label, detail: opt.name, amount: amt })}>
                  <span className="flex-1 flex items-center justify-between gap-2">
                    <span className="text-ink-700 text-sm">{o.label}</span>
                    <Price>{o.price}</Price>
                  </span>
                </CheckRow>
              );
            }
            const qty = est.get(id)?.qty ?? 0;
            return (
              <div key={i} className="border-t border-ink-900/10 first:border-t-0 py-2">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-ink-700 text-sm">{o.label}</span>
                  <Price>{o.price}</Price>
                </div>
                <Stepper value={qty} suffix={u ?? undefined} onChange={(n) => n > 0
                  ? est.upsert({ id, group: OPT_GROUP, label: o.label, detail: u ? `${n} ${u} × ${fmtEUR(amt ?? 0)}/${u}` : `${n} × ${o.price}`, amount: (amt ?? 0) * n, qty: n })
                  : est.remove(id)} />
              </div>
            );
          })}
        </div>
      </OptCard>
    );
  }

  return <OptCard opt={opt}><Price>{opt.price}</Price></OptCard>;
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
  return (
    <div className="mt-8 bg-ink-950 rounded-sm p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
        <div>
          <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-3">Surface souhaitée</div>
          <Stepper value={est.sqm} onChange={est.setSqm} min={0} max={2000} step={1} suffix="m²" className="bg-cream-50" />
        </div>
        <div>
          <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-3">Zone</div>
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
          Indiquez votre surface : l'estimation s'affiche automatiquement à droite.
        </p>
      </div>
    </div>
  );
}

/** Bouton « Choisir cette option » sur une gamme de stand (exclusif). */
function RangeChooseButton({ rangeKey }: { rangeKey: string }) {
  const est = useEstimator();
  const selected = est.rangeKey === rangeKey;
  return (
    <div className="mt-4">
      <ChooseButton selected={selected} onClick={() => est.setRangeKey(selected ? null : rangeKey)} />
      {selected && est.sqm === 0 && (
        <p className="text-gold-700 text-[11px] mt-1.5 text-center">Choisissez une surface ci-dessus pour le calcul.</p>
      )}
    </div>
  );
}

/** Étape 3 : sélecteur de surface extérieure (m²). */
function OutdoorSelector() {
  const est = useEstimator();
  const unit = parsePrice(OUTDOOR.price) ?? 0;
  return (
    <div className="mt-5">
      <div className="text-ink-500 text-xs uppercase tracking-widest mb-2">Surface extérieure</div>
      <Stepper value={est.outdoorSqm} onChange={est.setOutdoorSqm} min={0} max={2000} suffix="m²" />
      {est.outdoorSqm > 0 && (
        <div className="mt-2 text-ink-700 text-sm">≈ <span className="text-gold-700 font-bold">{fmtEUR(est.outdoorSqm * unit)}</span></div>
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
  return (
    <tr className="border-t-2 border-gold-500/30">
      <td className="p-4 align-bottom">
        <span className="text-ink-500 text-xs uppercase tracking-widest">Je choisis</span>
      </td>
      {PARTNER_TIERS.map((tier) => (
        <td key={tier.key} className={`p-3 align-bottom ${tier.highlight ? "bg-gold-500/[0.08]" : ""}`}>
          <div className="text-center mb-2">
            <div className={`font-bold ${tier.highlight ? "text-gold-600" : "text-ink-900"}`} style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{tier.name}</div>
            <div className="text-ink-600 text-xs">{tier.price}</div>
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
  const id = "place:vitrophanie";
  return (
    <CheckRow dark checked={est.has(id)} onChange={() => est.toggle({ id, group: "Communication sur place", label: VITROPHANIE.title, amount: parsePrice(VITROPHANIE.price) })}>
      <span className="text-cream-50/80 text-sm">Ajouter à mon estimation</span>
    </CheckRow>
  );
}

/** Communication sur stand — structure élinguée (case) + personnalisation cloisons (ml). */
function CommStandControls() {
  const est = useEstimator();
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
        <CheckRow checked={est.has("comm:structure")} onChange={() => est.toggle({ id: "comm:structure", group: "Communication", label: structure.name, detail: "À partir de", amount: structureAmt })} className="w-full">
          <span className="flex-1">
            <span className="block text-ink-900 font-bold leading-tight" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{structure.name}</span>
            <span className="block text-ink-600 text-sm">{structure.desc}</span>
          </span>
          <span className="text-gold-700 font-bold text-sm shrink-0">{structure.price}</span>
        </CheckRow>
      </div>

      {/* Personnalisation des cloisons — un sélecteur de ml par gamme */}
      <div className="py-4">
        <h3 className="text-ink-900 font-bold leading-tight" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{perso.name}</h3>
        <p className="text-ink-600 text-sm mt-1 mb-3">{perso.desc}</p>
        <div className="space-y-3">
          {[
            { id: argentId, label: "Gamme argent", unit: argentMl },
            { id: orId, label: "Gamme or", unit: orMl },
          ].map((g) => (
            <div key={g.id} className="flex items-center justify-between gap-3">
              <span className="text-ink-700 text-sm">{g.label} <span className="text-gold-700 font-semibold">({fmtEUR(g.unit)}/ml)</span></span>
              <Stepper
                value={g.id === argentId ? argentQty : orQty}
                suffix="ml"
                onChange={(n) => n > 0
                  ? est.upsert({ id: g.id, group: "Communication", label: `Cloisons ${g.label.toLowerCase()}`, detail: `${n} ml × ${fmtEUR(g.unit)}/ml`, amount: g.unit * n, qty: n })
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
      onClick={() => est.toggle({ id, group, label, amount: parsePrice(price) })}
    />
  );
}

/** Branding — tote-bag / briquet : champ nombre (min 5000 pièces). */
function BrandingQty({ name, price, photo, desc, min }: { name: string; price: string; photo: string; desc: string; min: number }) {
  const est = useEstimator();
  const unit = parsePrice(price) ?? 0;
  const id = `branding:${name}`;
  const qty = est.get(id)?.qty ?? 0;
  return (
    <div className="bg-cream-100 border border-ink-900/10 rounded-sm overflow-hidden flex flex-col">
      <PhotoBox ratio="aspect-square" label={photo} />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-ink-900 font-bold text-sm leading-tight mb-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{name}</h3>
        <p className="text-ink-600 text-xs mb-2">{desc}</p>
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
                ? est.upsert({ id, group: "Branding", label: name, detail: `${v.toLocaleString("fr-FR")} pcs × ${price}`, amount: unit * v, qty: v })
                : est.remove(id);
            }}
          />
          <p className="text-ink-400 text-[10px] mt-1">Minimum {min.toLocaleString("fr-FR")} pièces.</p>
        </div>
      </div>
    </div>
  );
}

/** Branding — option à prix fixe (case à cocher). */
function BrandingPick({ name, price, photo, desc }: { name: string; price: string; photo: string; desc: string }) {
  const est = useEstimator();
  const id = `branding:${name}`;
  return (
    <div className="bg-cream-100 border border-ink-900/10 rounded-sm overflow-hidden flex flex-col">
      <PhotoBox ratio="aspect-square" label={photo} />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-ink-900 font-bold text-sm leading-tight mb-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{name}</h3>
        <p className="text-ink-600 text-xs mb-2">{desc}</p>
        <Price>{price}</Price>
        <div className="mt-3 mt-auto pt-3">
          <ChooseButton selected={est.has(id)} onClick={() => est.toggle({ id, group: "Branding", label: name, amount: parsePrice(price) })} />
        </div>
      </div>
    </div>
  );
}

/** Sponsoring — case à cocher par option de zone. */
function SponsoringRow({ zone, name, price }: { zone: string; name: string; price: string }) {
  const est = useEstimator();
  const id = `sponsoring:${zone}:${name}`;
  return (
    <li className="flex justify-between items-center gap-4 border-b border-ink-900/10 pb-2">
      <CheckRow checked={est.has(id)} onChange={() => est.toggle({ id, group: "Sponsoring", label: `${zone} — ${name}`, amount: parsePrice(price) })}>
        <span className="text-ink-700 text-sm">{name}</span>
      </CheckRow>
      <Price>{price}</Price>
    </li>
  );
}

/** Barbecue Mag — case « format » + case « + publirédactionnel ». */
function MagFormatRow({ format }: { format: { name: string; priceExpo: string; pricePubliredac: string; preview: string | null } }) {
  const est = useEstimator();
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
            else est.upsert({ id: fid, group: "Barbecue Mag", label: format.name, amount: parsePrice(format.priceExpo) });
          }}>
            <span>{format.name}</span>
          </CheckRow>
          {format.preview && <DispositifPreview src={format.preview} label={`Barbecue Mag — ${format.name}`} />}
        </span>
      </td>
      <td className="py-3 pr-6 text-right text-gold-500 font-semibold whitespace-nowrap">{format.priceExpo}</td>
      <td className="py-3 pl-6 border-l border-cream-50/10">
        <CheckRow
          dark
          checked={est.has(pid)}
          onChange={() => {
            if (!fmtSelected) return; // publirédac uniquement si format choisi
            est.toggle({ id: pid, group: "Barbecue Mag", label: `${format.name} — publirédac (2 pages)`, amount: pubAmt });
          }}
          className={!fmtSelected ? "opacity-40 pointer-events-none" : ""}
        >
          <span className="text-cream-50/70 whitespace-nowrap">{format.pricePubliredac}</span>
        </CheckRow>
      </td>
    </tr>
  );
}

/* Logo média — vrai logo si dispo, sinon wordmark texte (repli si échec de chargement) */
function MediaLogo({ name, logo }: { domain?: string; name: string; logo?: string | null }) {
  const [err, setErr] = useState(false);
  const [outlet, show] = name.split(" — ");
  if (logo && !err) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logo} alt={name} onError={() => setErr(true)} className="max-h-[80%] max-w-[85%] object-contain" />
    );
  }
  return (
    <div className="flex flex-col items-center justify-center text-center px-3 leading-tight">
      <span className="text-ink-900 font-bold text-base md:text-lg" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{outlet}</span>
      {show && <span className="text-ink-400 text-[11px] font-medium mt-0.5">{show}</span>}
    </div>
  );
}

/* Carrousel de pitmasters (défilement horizontal) */
function PitmastersCarousel() {
  const chefs = (pitmastersData as { slug: string; name: string; portrait?: string; social?: { followers?: number } }[]);
  const fmt = (n?: number) => (n ? (n >= 1000 ? `${Math.round(n / 1000)}K` : String(n)) : null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative -mx-6 md:-mx-12">
      <div ref={scrollRef} className="px-6 md:px-12 overflow-x-auto pb-4 scroll-smooth">
        <div className="flex gap-4 w-max">
          {chefs.map((c) => (
            <div key={c.slug} className="w-44 md:w-52 shrink-0">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-ink-900">
                {c.portrait && <Image src={c.portrait} alt={c.name} fill sizes="208px" className="object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute bottom-0 inset-x-0 p-3">
                  <div className="text-cream-50 font-bold text-sm leading-tight" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{c.name}</div>
                  {fmt(c.social?.followers) && <div className="text-gold-500 text-xs font-semibold">{fmt(c.social?.followers)} abonnés</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="Précédent"
        onClick={() => scrollBy(-1)}
        disabled={!canLeft}
        className={`hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-gold-500 text-ink-950 shadow-lg transition-opacity ${canLeft ? "opacity-100 hover:bg-gold-300" : "opacity-0 pointer-events-none"}`}
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
      </button>
      <button
        type="button"
        aria-label="Suivant"
        onClick={() => scrollBy(1)}
        disabled={!canRight}
        className={`hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-gold-500 text-ink-950 shadow-lg transition-opacity ${canRight ? "opacity-100 hover:bg-gold-300" : "opacity-0 pointer-events-none"}`}
      >
        <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
      </button>
    </div>
  );
}

/* Sélecteur de types de professionnels + logos enseignes (placeholders) */
function ProTypesSelector() {
  const { t } = useT();
  const [active, setActive] = useState(PRO_TYPES[0].key);
  const cur = PRO_TYPES.find((p) => p.key === active) ?? PRO_TYPES[0];
  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Liste cliquable */}
      <div className="lg:col-span-5 flex flex-col gap-2">
        {PRO_TYPES.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setActive(p.key)}
            className={`text-left rounded-sm px-5 py-4 transition-colors border ${
              active === p.key
                ? "bg-ink-950 border-ink-950 text-cream-50"
                : "bg-cream-100 border-ink-900/10 text-ink-800 hover:border-gold-500/50"
            }`}
          >
            <span className="font-bold leading-tight block" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(p.title)}</span>
          </button>
        ))}
      </div>
      {/* Panneau enseignes */}
      <div className="lg:col-span-7">
        <div className="bg-cream-100 border border-ink-900/10 rounded-sm p-6 md:p-8 h-full">
          <p className="text-ink-600 text-base md:text-lg leading-relaxed mb-6">{t(cur.desc)}</p>
          <div className="text-ink-500 text-xs uppercase tracking-widest mb-4">{t("Enseignes correspondantes")}</div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {cur.brands ? (
              <>
                {cur.brands.map((b) =>
                  b.cover ? (
                    <div key={b.src} className="relative aspect-[5/3] rounded-sm overflow-hidden bg-ink-900 border border-ink-900/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.src} alt={b.name} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" aria-hidden="true" />
                      <span className="absolute bottom-1.5 left-2 right-2 text-cream-50 text-xs font-bold leading-tight" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{b.name}</span>
                    </div>
                  ) : (
                    <div key={b.src} className={`aspect-[5/3] rounded-sm border flex items-center justify-center p-2 overflow-hidden ${b.dark ? "bg-ink-900 border-ink-900" : "bg-white border-ink-900/10"}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.src} alt={b.name} className="max-h-full max-w-full object-contain" />
                    </div>
                  )
                )}
                {cur.blurredFill
                  ? Array.from({ length: cur.blurredFill }).map((_, i) => {
                      const b = cur.brands![i % cur.brands!.length];
                      return (
                        <div key={`blur-${i}`} className="aspect-[5/3] rounded-sm bg-white border border-ink-900/10 flex items-center justify-center p-2 overflow-hidden" aria-hidden="true">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={b.src} alt="" className="max-h-full max-w-full object-contain blur-[7px] grayscale opacity-50 select-none" draggable={false} />
                        </div>
                      );
                    })
                  : null}
              </>
            ) : (
              Array.from({ length: cur.logos }).map((_, i) => (
                <div key={i} className="aspect-[5/3] rounded-sm bg-cream-50 border border-dashed border-ink-900/20 flex items-center justify-center text-ink-300 text-[10px] uppercase tracking-widest">
                  Logo
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Plan interactif zoomable / déplaçable */
function PlanViewer({ src }: { src: string }) {
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
        alt="Plan du salon Barbecue Expo 2027"
        draggable={false}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`, transformOrigin: "center center", transition: drag.current.on ? "none" : "transform 0.12s ease-out" }}
      />
      {/* Contrôles */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
        <button type="button" aria-label="Dézoomer" onClick={(e) => { e.stopPropagation(); zoom(-0.5); }} className="w-9 h-9 rounded-full bg-ink-950/85 text-cream-50 flex items-center justify-center text-xl font-bold hover:bg-ink-950 shadow-lg">−</button>
        <button type="button" aria-label="Réinitialiser" onClick={(e) => { e.stopPropagation(); reset(); }} className="px-3 h-9 rounded-full bg-ink-950/85 text-cream-50 flex items-center justify-center text-xs font-semibold hover:bg-ink-950 shadow-lg">Réinit.</button>
        <button type="button" aria-label="Zoomer" onClick={(e) => { e.stopPropagation(); zoom(0.5); }} className="w-9 h-9 rounded-full bg-gold-500 text-ink-950 flex items-center justify-center text-xl font-bold hover:bg-gold-300 shadow-lg">+</button>
      </div>
      <div className="absolute top-3 left-3 text-ink-600 text-[11px] bg-cream-50/80 backdrop-blur px-2.5 py-1 rounded-full pointer-events-none">Molette ou +/− pour zoomer · glisser pour déplacer</div>
    </div>
  );
}

/* Sélecteur de posts Instagram par catégorie */
function SocialPostsTabs() {
  const [active, setActive] = useState(SOCIAL_POSTS[0].category);
  const group = SOCIAL_POSTS.find((g) => g.category === active) ?? SOCIAL_POSTS[0];
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {SOCIAL_POSTS.map((g) => (
          <button
            key={g.category}
            type="button"
            onClick={() => setActive(g.category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              active === g.category
                ? "bg-gold-500 text-ink-950"
                : "border border-cream-50/20 text-cream-50/70 hover:border-gold-500/50 hover:text-cream-50"
            }`}
          >
            {g.category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {group.urls.map((u) => (
          <div key={u} className="w-full">
            <InstagramEmbed url={u} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Chargement de Leaflet via CDN (côté navigateur), une seule fois */
let leafletPromise: Promise<unknown> | null = null;
function loadLeaflet(): Promise<unknown> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).L) return Promise.resolve((window as any).L);
  if (leafletPromise) return leafletPromise;
  leafletPromise = new Promise((resolve, reject) => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }
    const s = document.createElement("script");
    s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    s.async = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    s.onload = () => resolve((window as any).L);
    s.onerror = () => reject(new Error("leaflet load failed"));
    document.body.appendChild(s);
  });
  return leafletPromise;
}

/* Bouton « Voir la carte » + popup carte d'accès (Parc Floral, aéroports, gares) */
function VenueMapButton() {
  const [open, setOpen] = useState(false);
  const mapDivRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  const lat = 48.837, lon = 2.4453; // Hall de la Pinède, Parc Floral de Paris

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let disposed = false;
    loadLeaflet().then((Lib) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = Lib as any;
      if (disposed || !mapDivRef.current || mapRef.current) return;
      const map = L.map(mapDivRef.current, { scrollWheelZoom: true });
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(map);

      const circle = (size: number, inner: string) =>
        `<div style="width:${size}px;height:${size}px;border-radius:50%;background:#f4ad3c;border:${size > 38 ? 3 : 2}px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center">${inner}</div>`;
      const planeSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="#0e0e0e"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>`;
      const trainSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="#0e0e0e"><path d="M12 2c-4 0-8 .5-8 4v9.5A3.5 3.5 0 0 0 7.5 19L6 20.5V21h12v-.5L16.5 19a3.5 3.5 0 0 0 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17A1.5 1.5 0 1 1 9 15.5 1.5 1.5 0 0 1 7.5 17zM11 10H6V6h5zm2 0V6h5v4zm3.5 7a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"/></svg>`;
      const icon = (size: number, inner: string) => L.divIcon({ className: "", html: circle(size, inner), iconSize: [size, size], iconAnchor: [size / 2, size / 2] });
      const bIcon = icon(42, `<img src="/logo_b_white.svg" style="width:22px;height:22px" alt="B"/>`);
      const planeIcon = icon(32, planeSvg);
      const trainIcon = icon(32, trainSvg);

      const pts: { ll: [number, number]; ic: unknown; label: string }[] = [
        { ll: [lat, lon], ic: bIcon, label: "Barbecue Expo — Hall de la Pinède" },
        { ll: [48.7262, 2.3652], ic: planeIcon, label: "Aéroport Paris-Orly" },
        { ll: [49.0097, 2.5479], ic: planeIcon, label: "Paris-Charles de Gaulle (Roissy)" },
        { ll: [48.8443, 2.3743], ic: trainIcon, label: "Gare de Lyon" },
        { ll: [48.842, 2.3655], ic: trainIcon, label: "Gare d'Austerlitz" },
      ];
      const markers = pts.map((p) => L.marker(p.ll, { icon: p.ic }).bindTooltip(p.label, { direction: "top", offset: [0, -16] }).addTo(map));
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.18));
      setTimeout(() => { try { map.invalidateSize(); } catch { /* noop */ } }, 150);
    }).catch(() => { /* leaflet indisponible */ });
    return () => {
      disposed = true;
      if (mapRef.current) { try { mapRef.current.remove(); } catch { /* noop */ } mapRef.current = null; }
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-gold-500 text-ink-950 px-4 py-2 rounded-full text-sm font-bold hover:bg-gold-300 transition-colors"
      >
        <MapPin className="w-4 h-4" strokeWidth={2.5} /> Voir la carte
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Carte d'accès au salon"
        >
          <div className="relative w-full max-w-3xl bg-cream-50 rounded-sm overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 p-4 border-b border-ink-900/10">
              <div>
                <div className="text-ink-900 font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>Espace événementiel — Hall de la Pinède</div>
                <div className="text-ink-600 text-sm">Parc Floral de Paris · Bois de Vincennes</div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fermer" className="shrink-0 w-9 h-9 rounded-full bg-ink-900/5 hover:bg-ink-900/10 text-ink-900 flex items-center justify-center text-lg">✕</button>
            </div>
            <div ref={mapDivRef} className="w-full h-[60vh] max-h-[480px] bg-ink-900/5" style={{ zIndex: 0 }} />
            <div className="flex items-center justify-between gap-3 p-3">
              <span className="text-ink-500 text-xs inline-flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full bg-gold-500" /> Salon</span>
                <span>✈︎ Orly · Roissy</span>
                <span>🚆 Gare de Lyon · Austerlitz</span>
              </span>
              <a href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`} target="_blank" rel="noopener noreferrer" className="text-gold-700 text-xs font-semibold whitespace-nowrap inline-flex items-center gap-1">Plein écran <ExternalLink className="w-3 h-3" /></a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* Œil de prévisualisation d'un dispositif (lightbox image) */
function DispositifPreview({ src, label }: { src: string; label: string }) {
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
        aria-label={`Voir le dispositif : ${label}`}
        title="Voir le dispositif"
        className="inline-flex items-center justify-center w-6 h-6 rounded-full text-gold-600 hover:text-ink-950 hover:bg-gold-500 transition-colors align-middle"
      >
        <Eye className="w-4 h-4" strokeWidth={2} />
      </button>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-950/85 backdrop-blur-sm" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={label}>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fermer" className="absolute -top-10 right-0 w-9 h-9 rounded-full bg-cream-50/10 hover:bg-cream-50/20 text-cream-50 flex items-center justify-center text-lg">✕</button>
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
        <BookOpen className="w-4 h-4" strokeWidth={2.5} /> Feuilleter le magazine
      </button>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-950/85 backdrop-blur-sm" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={title}>
          <div className="relative w-full max-w-5xl h-[88vh] bg-cream-50 rounded-sm overflow-hidden shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 p-3 border-b border-ink-900/10 shrink-0">
              <span className="text-ink-900 font-bold text-sm" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{title}</span>
              <div className="flex items-center gap-2">
                <a href={src} target="_blank" rel="noopener noreferrer" className="text-gold-700 text-xs font-semibold inline-flex items-center gap-1">Ouvrir <ExternalLink className="w-3 h-3" /></a>
                <button type="button" onClick={() => setOpen(false)} aria-label="Fermer" className="w-8 h-8 rounded-full bg-ink-900/5 hover:bg-ink-900/10 text-ink-900 flex items-center justify-center">✕</button>
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

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-xs md:text-sm uppercase tracking-widest font-semibold ${light ? "text-gold-500" : "text-ink-900"}`}>
      <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
      {children}
    </div>
  );
}

function H2({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className={`${light ? "text-cream-50" : "text-ink-900"} text-3xl sm:text-4xl md:text-5xl leading-tight font-bold`} style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
      {children}
    </h2>
  );
}

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

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center rounded-full border border-cream-50/20 overflow-hidden shrink-0 text-[11px] font-bold uppercase tracking-widest">
      {(["fr", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1.5 transition-colors ${lang === l ? "bg-gold-500 text-ink-950" : "text-cream-50/70 hover:text-cream-50"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function StickyNav({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const { t } = useT();
  const groups = [
    { title: "Présentation", items: PRESENTATION_NAV },
    { title: "Catalogue exposant", items: CATALOGUE_NAV },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50 bg-ink-950/90 backdrop-blur border-b border-cream-50/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex items-center gap-4">
        <span className="text-cream-50 font-bold text-sm uppercase tracking-widest shrink-0" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
          {t("Exposer")}
        </span>
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto">
          {groups.flatMap((g) => g.items).map((it) => (
            <a key={it.id} href={`#${it.id}`} className="px-3 py-1.5 rounded-full text-cream-50/70 hover:text-gold-500 hover:bg-cream-50/5 text-xs uppercase tracking-widest whitespace-nowrap transition-colors">
              {t(it.label)}
            </a>
          ))}
        </nav>
        <button type="button" onClick={() => setOpen(!open)} className="lg:hidden ml-auto text-cream-50 text-xs uppercase tracking-widest border border-cream-50/20 rounded-full px-3 py-1.5">
          {t("Sommaire")}
        </button>
        <div className="hidden lg:flex items-center gap-3 ml-auto shrink-0">
          <LangToggle lang={lang} setLang={setLang} />
          <a href="#partenaires" className="inline-flex bg-gold-500 text-ink-950 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            {t("Devenir partenaire")}
          </a>
        </div>
        <div className="lg:hidden"><LangToggle lang={lang} setLang={setLang} /></div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-cream-50/10 px-6 py-4 grid grid-cols-2 gap-x-4 gap-y-2">
          {groups.flatMap((g) => g.items).map((it) => (
            <a key={it.id} href={`#${it.id}`} onClick={() => setOpen(false)} className="text-cream-50/80 hover:text-gold-500 text-sm py-1">
              {t(it.label)}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* small wrapper for a catalog section */
function Sec({ id, eyebrow, title, children, dark }: { id: string; eyebrow: string; title: string; children: React.ReactNode; dark?: boolean }) {
  const { t } = useT();
  return (
    <section id={id} className={`scroll-mt-20 py-16 md:py-24 ${dark ? "bg-ink-950" : "bg-cream-50"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Eyebrow light={dark}>{t(eyebrow)}</Eyebrow>
        <div className="mt-5 mb-10"><H2 light={dark}>{t(title)}</H2></div>
        {children}
      </div>
    </section>
  );
}

/* ============================ main ============================ */

/** Config tarifaire pour l'estimateur — dérivée des données (source unique). */
const ESTIMATOR_CFG = {
  zonePrice: {
    A: parsePrice(STAND_SURFACE.zones.find((z) => /A/.test(z.zone))?.price) ?? 250,
    B: parsePrice(STAND_SURFACE.zones.find((z) => /B/.test(z.zone))?.price) ?? 200,
  },
  ranges: STAND_RANGES.map((r) => ({ key: r.key, title: r.title.replace(/^Option\s*\d+\s*—\s*/, ""), surcharge: parsePrice(r.price) })),
  outdoorPerSqm: parsePrice(OUTDOOR.price) ?? 150,
  partners: PARTNER_TIERS.map((t) => ({ key: t.key, name: t.name, price: parsePrice(t.price) })),
  placePacks: COMM_PLACE_PACKS.map((p) => ({ key: p.name, name: p.name, price: parsePrice(p.price) })),
};

export default function CatalogueClient() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = useMemo(() => (fr: string) => (lang === "en" ? (EN[fr] ?? fr) : fr), [lang]);
  return (
    <LangContext.Provider value={{ lang, t }}>
    <EstimatorProvider>
    <article className="bg-cream-50">
      <StickyNav lang={lang} setLang={setLang} />
      <EstimatorPanel cfg={ESTIMATOR_CFG} />

      {/* ───────────── HERO ───────────── */}
      <section className="relative min-h-[52vh] flex items-end overflow-hidden bg-ink-950">
        <Image src="/photos-2026/bbq-expo-066.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/30" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 pb-16">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-6">
            <span className="inline-block w-8 h-px bg-gold-500" /> {t("Exposer · Édition 2027")}
          </div>
          <h1 className="text-cream-50 text-4xl sm:text-5xl md:text-7xl leading-[0.95] font-bold max-w-4xl" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
            {t("Présentation du salon & catalogue exposant.")}
          </h1>
          <p className="mt-6 text-cream-50/80 text-lg max-w-2xl">{t("12 · 13 · 14 Mars 2027 — Parc Floral de Paris")}</p>
        </div>
      </section>

      {/* ════════════ PARTIE A — PRÉSENTATION ════════════ */}

      <Sec id="expo" eyebrow="Partie 1" title="Barbecue Expo — histoire & écosystème">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Texte + métriques */}
          <div>
            <p className="text-ink-600 text-lg leading-relaxed mb-8">
              Depuis 2020, Barbecue Expo réunit chaque année les passionnés et les professionnels
              de la cuisson au feu. En quelques éditions, l'événement s'est imposé comme le plus grand
              salon européen dédié au barbecue et à la cuisine en plein air — porté par un écosystème
              unique : <span className="font-semibold text-ink-900">le salon</span>, des <span className="font-semibold text-ink-900">festivals</span>,
              le <span className="font-semibold text-ink-900">magazine</span> (Barbecue Mag &amp; Smoked Magazine),
              des <span className="font-semibold text-ink-900">championnats</span>, et bien plus encore.
            </p>

            <div className="text-gold-700 text-sm uppercase tracking-widest font-semibold mb-5">
              Depuis 2020, Barbecue Expo c'est…
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                ["5", "éditions"],
                ["93 000", "visiteurs"],
                ["650", "exposants"],
                ["85", "pitmasters & chefs"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-ink-900 text-3xl md:text-4xl font-bold leading-none" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{v}</div>
                  <div className="mt-1 text-ink-500 text-xs uppercase tracking-widest">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Vidéo (même que le hero du site, en boucle, muette) */}
          <div className="relative aspect-video w-full rounded-sm overflow-hidden bg-ink-950 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]">
            <YouTubeEmbed />
          </div>
        </div>
      </Sec>

      <Sec id="salon" eyebrow="Partie 2" title="Le salon 2027" dark>
        <p className="text-cream-50/75 text-base md:text-lg max-w-2xl mb-10">
          L'édition à venir, plus grande et plus internationale que jamais. Le salon 2027, c'est…
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 md:mb-20">
          {[
            ["30 000", "visiteurs attendus"],
            ["250", "marques internationales"],
            ["20", "pays représentés"],
            ["20 000 m²", "indoor & outdoor"],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="text-gold-500 text-4xl md:text-5xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{v}</div>
              <div className="mt-1 text-cream-50/70 text-sm uppercase tracking-widest">{l}</div>
            </div>
          ))}
        </div>
        {/* Galerie photo — slider défilant */}
        <div className="mb-14 md:mb-20">
          <div className="text-cream-50/70 text-xs uppercase tracking-widest mb-5">En images</div>
          <div className="-mx-6 md:-mx-12">
            <PhotoMarquee />
          </div>
        </div>

        {/* Catégories (gauche) + Plan du salon (droite) */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Catégories de produits — gauche */}
          <div>
            <div className="text-cream-50/70 text-xs uppercase tracking-widest mb-6">{t("Les catégories de produits")}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRODUCT_CATEGORIES.map((c, i) => (
                <div key={c.name} className="bg-cream-50/[0.04] border border-cream-50/10 rounded-sm p-5 hover:border-gold-500/40 transition-colors">
                  <div className="text-gold-500 text-xs font-bold tabular-nums mb-2" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-cream-50 font-bold leading-tight mb-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(c.name)}</h3>
                  <p className="text-cream-50/60 text-sm leading-relaxed">{t(c.detail)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Plan du salon — droite */}
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3 mb-6">
              <span className="text-cream-50/70 text-xs uppercase tracking-widest">{t("Le plan du salon")}</span>
              <VenueMapButton />
            </div>
            <div className="relative aspect-square w-full">
              <Image
                src="/content/images/27866dc7c3_planbbq_hd.png"
                alt="Plan du salon Barbecue Expo 2027"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>
        </div>
      </Sec>

      {/* Les zones & rubriques — réutilise la section de la homepage */}
      <ExperienceZones />

      {/* Les marques présentes — slider 2 rangées (band sombre) */}
      <div className="bg-ink-950 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            Les marques présentes
          </div>
        </div>
        <BrandLogoMarquee />
      </div>

      <Sec id="visiteurs" eyebrow="Partie 3" title="Les visiteurs">
        {/* Carte + tableau de provenance */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-16">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-3 text-ink-700 text-sm md:text-base font-semibold mb-4">
              <MapPin className="w-5 h-5 text-gold-600" strokeWidth={2} />
              Lieu de l'événement : <span className="italic font-normal">Parc Floral de Paris</span>
              <VenueMapButton />
            </div>
            <div className="rounded-sm bg-white border border-ink-900/10 p-3 md:p-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]">
              <VisitorMap />
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
              {MAP_LEGEND.map((l) => (
                <span key={l.label} className="inline-flex items-center gap-2 text-ink-600 text-xs">
                  <span className="inline-block w-4 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="text-ink-500 text-xs uppercase tracking-widest mb-4">Provenance des visiteurs</div>
            <ul className="divide-y divide-ink-900/10 border-y border-ink-900/10">
              {VISITOR_PROVENANCE.map((c) => (
                <li key={c.name} className="flex items-center justify-between gap-3 py-3">
                  <span className="flex items-center gap-3 min-w-0">
                    {c.flag ? (
                      <Image src={`/flags/${c.flag}.svg`} alt="" width={22} height={16} className="w-5.5 h-4 rounded-sm object-cover shrink-0" />
                    ) : (
                      <Globe className="w-5 h-5 text-ink-400 shrink-0" strokeWidth={1.5} />
                    )}
                    <span className="text-ink-800 text-sm md:text-base truncate">{c.name}</span>
                  </span>
                  <span className="text-ink-900 font-bold tabular-nums" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{c.pct}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Types de professionnels — sélecteur */}
        <div className="text-ink-500 text-xs uppercase tracking-widest mb-2">{t("Les professionnels que nous attirons")}</div>
        <p className="text-ink-600 text-base md:text-lg mb-8 max-w-2xl">{t("Sélectionnez un type de professionnel pour voir les enseignes correspondantes.")}</p>
        <ProTypesSelector />
      </Sec>

      <Sec id="communication" eyebrow="Partie 4" title="Le plan de communication" dark>
        {/* 4.1 — Pitmasters */}
        <SubLabel>Les pitmasters internationaux</SubLabel>
        <p className="text-cream-50/75 text-base md:text-lg max-w-2xl mb-8">
          Des stars du barbecue venues du monde entier, présentes en 2026 et lors des éditions précédentes.
        </p>
        <PitmastersCarousel />

        {/* 4.2 — Retombées médiatiques */}
        <SubLabel className="mt-20">Les retombées médiatiques</SubLabel>
        <div className="flex flex-wrap gap-x-10 gap-y-3 mb-10">
          {[["500 M+", "contacts générés"], ["TV · Radio · Presse", "couverture nationale"]].map(([v, l]) => (
            <div key={l}>
              <div className="text-gold-500 text-2xl md:text-3xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{v}</div>
              <div className="text-cream-50/60 text-xs uppercase tracking-widest mt-1">{l}</div>
            </div>
          ))}
        </div>

        {/* Vidéos principales — encadrées */}
        <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-4">{t("Vidéos principales")}</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {MEDIA_FEATURED.map((m) => (
            <a key={m.show} href={m.url} target="_blank" rel="noopener noreferrer" className="group block rounded-sm overflow-hidden border-2 border-gold-500/60 hover:border-gold-500 transition-colors">
              <div className="relative aspect-video bg-ink-900 flex items-center justify-center overflow-hidden">
                <Image src={m.thumb} alt={`${m.outlet} — ${m.show}`} fill unoptimized sizes="(max-width:1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-ink-950/30 group-hover:bg-ink-950/20 transition-colors" aria-hidden="true" />
                <span className="relative z-10 w-12 h-12 rounded-full bg-gold-500 text-ink-950 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Play className="w-5 h-5 ml-0.5" fill="currentColor" strokeWidth={0} />
                </span>
              </div>
              <div className="p-3 bg-ink-950">
                <div className="text-cream-50 font-bold text-sm" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{m.outlet}</div>
                <div className="text-cream-50/60 text-xs">{m.show}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Toutes les retombées */}
        <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-4">{t("Ils en ont parlé")}</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {MEDIA_MENTIONS.map((m, i) => {
            const inner = (
              <div className="h-full flex flex-col items-center justify-center text-center gap-2 bg-cream-50/[0.04] border border-cream-50/10 rounded-sm p-4 hover:border-gold-500/40 transition-colors">
                <div className="w-full aspect-[5/2] rounded-sm bg-white flex items-center justify-center overflow-hidden">
                  <MediaLogo domain={m.domain} name={m.name} logo={m.logo} />
                </div>
                {m.url
                  ? <span className="text-gold-500 text-xs font-semibold flex items-center gap-1">{t("Voir le sujet")}<ExternalLink className="w-3 h-3" /></span>
                  : <span className="text-cream-50/40 text-xs font-medium">{t("Diffusé")}</span>}
              </div>
            );
            return m.url ? (
              <a key={i} href={m.url} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>
            ) : (
              <div key={i}>{inner}</div>
            );
          })}
        </div>

        {/* 4.3 — Affichage public */}
        <SubLabel className="mt-20">{t("L'affichage public massif")}</SubLabel>
        <div className="grid grid-cols-3 gap-8 mb-10 max-w-2xl">
          {AFFICHAGE.stats.map((s) => (
            <div key={s.label}>
              <div className="text-gold-500 text-3xl md:text-5xl font-bold leading-none" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{s.value}</div>
              <div className="text-cream-50/60 text-xs uppercase tracking-widest mt-2">{t(s.label)}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {AFFICHAGE.photos.map((p, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-sm overflow-hidden bg-ink-900">
              <Image src={p.src} alt={`Affichage public Barbecue Expo ${i + 1}`} fill unoptimized sizes="(max-width:768px) 50vw, 20vw" className="object-cover" style={{ objectPosition: p.pos ?? "center" }} />
            </div>
          ))}
        </div>

        {/* 4.4 — Réseaux sociaux & newsletter */}
        <SubLabel className="mt-20">Les réseaux sociaux & la newsletter</SubLabel>
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8 mb-8">
          <div>
            <span className="text-gold-500 text-5xl md:text-7xl font-bold leading-none" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{SOCIAL_REACH.headline}</span>
            <span className="text-cream-50 text-xl md:text-2xl font-bold ml-3" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t(SOCIAL_REACH.unit)}</span>
          </div>
          <p className="text-cream-50/70 text-sm md:text-base max-w-md">{t(SOCIAL_REACH.sub)}</p>
        </div>

        {/* Comptes */}
        <div className="flex flex-wrap gap-2 mb-12">
          {SOCIAL_ACCOUNTS.map((a) => {
            const has = a.url && a.url !== "[À compléter]";
            const inner = (
              <span className="inline-flex items-center gap-2 border border-cream-50/15 rounded-full px-4 py-2 text-cream-50/90 text-sm hover:border-gold-500/50 transition-colors">
                <Instagram className="w-4 h-4 text-gold-500" strokeWidth={1.5} />{a.brand}
              </span>
            );
            return has ? <a key={a.brand} href={a.url} target="_blank" rel="noopener noreferrer">{inner}</a> : <span key={a.brand}>{inner}</span>;
          })}
        </div>

        {/* Exemples de posts */}
        <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-6">Exemples de posts</div>
        <SocialPostsTabs />
      </Sec>

      {/* ════════════ PARTIE B — CATALOGUE EXPOSANT ════════════ */}

      <div className="bg-gold-500 py-6 text-center">
        <span className="text-ink-950 text-sm md:text-base font-bold uppercase tracking-[0.3em]" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>
          Catalogue exposant 2027
        </span>
      </div>

      {/* 1. Choisir son stand */}
      <Sec id="stand" eyebrow="Stand" title="Choisir son stand">
        {/* Plan interactif du salon */}
        <div className="mb-16">
          <div className="text-ink-500 text-xs uppercase tracking-widest mb-4">Plan du salon 2027</div>
          <PlanViewer src="/plan/plan-2027.svg" />
        </div>
        {/* Étape 1 — surface nue */}
        <div className="mb-6 flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-gold-500 text-ink-950 flex items-center justify-center text-sm font-bold shrink-0">1</span>
          <h3 className="text-ink-900 text-xl md:text-2xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>Je choisis la taille — surface nue</h3>
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
                <li key={it} className="flex items-start gap-2.5 text-ink-700"><Check className="w-4 h-4 text-gold-600 mt-1 shrink-0" strokeWidth={2.5} />{it}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4 bg-ink-950 rounded-sm p-6 flex flex-col justify-center">
            <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-4">Tarif au m²</div>
            <ul className="space-y-3">
              {STAND_SURFACE.zones.map((z) => (
                <li key={z.zone} className="flex items-center justify-between border-b border-cream-50/10 pb-3">
                  <span className="text-cream-50 font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{z.zone}</span>
                  <span className="text-gold-500 font-bold">{z.price}</span>
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
          <h3 className="text-ink-900 text-xl md:text-2xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>Je choisis ma gamme de stand</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAND_RANGES.map((r) => (
            <div key={r.key} className={`bg-cream-100 border rounded-sm overflow-hidden ${r.popular ? "border-gold-500/60" : "border-ink-900/10"}`}>
              <PhotoBox ratio="aspect-[16/9]" label={r.photo} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="text-ink-900 text-lg font-bold leading-tight" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{r.title}</h4>
                  <Price>{r.price}</Price>
                </div>
                {r.desc && <p className="text-ink-600 text-sm mb-3">{r.desc}</p>}
                {r.features.length > 0 && (
                  <ul className="space-y-1.5 mb-4">
                    {r.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-ink-700 text-sm"><Check className="w-3.5 h-3.5 text-gold-600 mt-0.5 shrink-0" strokeWidth={2.5} />{f}</li>
                    ))}
                  </ul>
                )}
                {r.moquette && (
                  <div className="flex items-center gap-3 border-t border-ink-900/10 pt-3">
                    <span className="text-ink-500 text-xs uppercase tracking-widest">Moquette :</span>
                    <div className="flex gap-2">
                      {r.moquette.map((c) => (
                        <span key={c.name} title={c.name} className="w-5 h-5 rounded-full border border-ink-900/20" style={{ backgroundColor: c.hex }} />
                      ))}
                    </div>
                  </div>
                )}
                {r.cloisons && (
                  <div className="flex items-center gap-3 border-t border-ink-900/10 pt-3 mt-3">
                    <span className="text-ink-500 text-xs uppercase tracking-widest whitespace-nowrap">Cloisons :</span>
                    {Array.isArray(r.cloisons) ? (
                      <div className="flex gap-2">
                        {r.cloisons.map((c) => (
                          <span key={c.name} title={c.name} className="w-5 h-5 rounded-full border border-ink-900/20" style={{ backgroundColor: c.hex }} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1">
                        <div
                          className="h-5 w-full rounded-full border border-ink-900/20"
                          title="Couleur des cloisons personnalisable (nuancier complet)"
                          style={{ background: "linear-gradient(90deg, #000 0%, #fff 8%, #e11d48 22%, #f97316 36%, #facc15 50%, #22c55e 64%, #06b6d4 78%, #6366f1 90%, #a21caf 100%)" }}
                        />
                        <span className="block text-ink-400 text-[10px] mt-1">Couleur au choix — nuancier complet</span>
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
          <h3 className="text-ink-900 text-xl md:text-2xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>Je peux ajouter un espace extérieur</h3>
        </div>
        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-7 relative aspect-[16/9] rounded-sm overflow-hidden border border-ink-900/10">
            <Image src={OUTDOOR.photo} alt="Espace exposant extérieur" fill sizes="(max-width:768px) 100vw, 60vw" className="object-cover" />
          </div>
          <div className="md:col-span-5 bg-cream-100 border border-ink-900/10 rounded-sm p-6 flex flex-col justify-center">
            <p className="text-ink-700 text-base md:text-lg mb-4">{OUTDOOR.desc}</p>
            <div className="text-gold-700 text-3xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{OUTDOOR.price}</div>
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
                {PARTNER_TIERS.map((t) => (
                  <th key={t.key} className={`p-4 text-center align-bottom ${t.highlight ? "bg-gold-500/10 rounded-t-sm" : ""}`}>
                    <div className={`text-xl font-bold ${t.highlight ? "text-gold-600" : "text-ink-900"}`} style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{t.name}</div>
                    <div className="text-ink-600 text-sm mt-1">{t.price}</div>
                    <PartnerHeaderChoose tierKey={t.key} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PARTNER_FEATURE_GROUPS.map((group) => (
                <Fragment key={group.category}>
                  <tr>
                    <td colSpan={1 + PARTNER_TIERS.length} className="pt-8 pb-3 px-4">
                      <span className="text-gold-600 text-xs font-bold uppercase tracking-widest">{group.category}</span>
                    </td>
                  </tr>
                  {group.rows.map((row, i) => (
                    <tr key={i} className="border-t border-ink-900/10">
                      <td className="p-4 text-ink-900 text-sm">
                        <span className="inline-flex items-center gap-1.5">
                          {row.label}
                          {row.preview && <DispositifPreview src={row.preview} label={row.label} />}
                        </span>
                      </td>
                      {(["platinium", "gold", "silver"] as const).map((k) => {
                        const v = row[k];
                        return (
                          <td key={k} className={`p-4 text-center ${PARTNER_TIERS.find(t => t.key === k)?.highlight ? "bg-gold-500/[0.08]" : ""}`}>
                            {v === true ? <Check className="w-5 h-5 text-gold-600 mx-auto" strokeWidth={2.5} />
                              : v === false ? <XIcon className="w-4 h-4 text-ink-900/20 mx-auto" />
                              : <span className="text-ink-900 text-sm font-semibold">{v}</span>}
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
            <Image src={COMM_STAND.photo} alt="Exemple de stand personnalisé avec signalétique en hauteur" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
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
              <h3 className="text-cream-50 text-xl font-bold mb-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{p.name}</h3>
              <div className="text-gold-500 font-bold mb-4">{p.price}</div>
              <ul className="space-y-2">
                {p.includes.map((inc, j) => (
                  <li key={j} className="flex items-start gap-2 text-cream-50/75 text-sm"><Check className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />{inc}</li>
                ))}
              </ul>
              <PlaceChoose packKey={p.name} />
            </div>
          ))}
        </div>
        <div className="bg-cream-50/[0.03] border border-cream-50/10 rounded-sm p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-cream-50 font-bold mb-1" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{VITROPHANIE.title}</h3>
            <p className="text-cream-50/70 text-sm">{VITROPHANIE.desc}</p>
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
        <p className="text-cream-50/70 text-sm md:text-base max-w-2xl mb-8 -mt-4">Trois packs pensés selon le moment : <span className="text-cream-50">avant</span> pour attirer, <span className="text-cream-50">pendant</span> pour capter, <span className="text-cream-50">après</span> pour relancer.</p>
        <div className="grid sm:grid-cols-3 gap-6">
          {COMM_DIGITAL.map((p) => (
            <div key={p.name} className={`relative rounded-sm p-6 border flex flex-col ${p.popular ? "border-gold-500/60 bg-gold-500/10" : "border-cream-50/15 bg-cream-50/[0.03]"}`}>
              {p.popular && <span className="absolute -top-3 left-6 bg-gold-500 text-ink-950 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Le plus visible</span>}
              <h3 className="text-cream-50 text-xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{p.name}</h3>
              <div className="text-gold-500 font-bold mb-2">{p.price}</div>
              <p className="text-cream-50/70 text-sm mb-5">{p.desc}</p>
              <ul className="space-y-2.5 mb-5">
                {p.includes.map((inc, j) => (
                  <li key={j} className="flex items-start gap-2 text-cream-50/85 text-sm"><Check className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" strokeWidth={2.5} />{inc}</li>
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
                <h3 className="text-cream-50 text-2xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{COMM_DIGITAL_GLOBAL.name}</h3>
                <span className="bg-gold-500 text-ink-950 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">Les 3 packs réunis</span>
              </div>
              <p className="text-cream-50/70 text-sm mt-2 max-w-2xl">{COMM_DIGITAL_GLOBAL.desc}</p>
            </div>
            <div className="lg:text-right shrink-0">
              <div className="text-gold-500 text-3xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{COMM_DIGITAL_GLOBAL.price}</div>
              <div className="text-cream-50/60 text-xs mt-1">{COMM_DIGITAL_GLOBAL.saving}</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 border-t border-cream-50/15 pt-6">
            {COMM_DIGITAL_GLOBAL.phases.map((ph) => (
              <div key={ph.title}>
                <div className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-3">{ph.title}</div>
                <ul className="space-y-2">
                  {ph.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-2 text-cream-50/85 text-sm"><Check className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" strokeWidth={2.5} />{it}</li>
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
                <h3 className="text-ink-900 text-2xl font-bold mb-4" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{z.zone}</h3>
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
          <div>
            <p className="text-cream-50/80 mb-6">{BARBECUE_MAG.desc}</p>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {BARBECUE_MAG.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-gold-500 text-2xl md:text-3xl font-bold" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>{s.value}</div>
                  <div className="text-cream-50/60 text-xs uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {BARBECUE_MAG.photos.map((src, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-sm overflow-hidden bg-ink-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Barbecue Mag ${i + 1}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="mt-5">
              <MagFlipButton src="/mag/barbecue-mag-n6.pdf" title="Barbecue Mag N°6 — BBQ Revolution" />
            </div>
          </div>
          <div>
            <div className="text-cream-50/60 text-xs uppercase tracking-widest mb-3">Tarifs encarts</div>
            <table className="w-full">
              <thead>
                <tr className="text-cream-50/50 text-xs uppercase tracking-widest">
                  <th className="text-left py-2">Format</th><th className="text-right py-2 pr-6">Exposant</th><th className="text-left py-2 pl-6">+ Publirédac (2 pages)</th>
                </tr>
              </thead>
              <tbody>
                {BARBECUE_MAG.formats.map((f) => (
                  <MagFormatRow key={f.name} format={f} />
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-cream-50/40 text-[11px] leading-relaxed">Publirédactionnel : 2 pages éditoriales rédigées par nos soins, en option sur n'importe quel format (+ 700 € HT).</p>
          </div>
        </div>
      </Sec>

      {/* CTA */}
      <section className="bg-ink-950 py-20 text-center border-t border-cream-50/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-cream-50 text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "SansPlomb-98, sans-serif" }}>En 2027, toutes les flammes mènent à Paris.</h2>
          <a href="/devenez-exposants" className="group inline-flex items-center gap-3 bg-gold-500 hover:bg-gold-300 text-ink-950 px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors">
            Réserver mon stand <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2.5} />
          </a>
        </div>
      </section>
    </article>
    </EstimatorProvider>
    </LangContext.Provider>
  );
}
