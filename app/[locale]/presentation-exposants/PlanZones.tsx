"use client";

/**
 * Plan schématique du salon pour le configurateur de stand : zone A au centre
 * du hall, zone B en bordure, esplanades extérieures (hachurées). Les zones se
 * choisissent au clic ; les boutons du configurateur font la même chose au
 * clavier. Sans `onZone` / `onExterieur`, le plan est un simple aperçu.
 */

import type { Zone } from "./Estimator";
import { useT } from "./i18n";

const JAUNE = "#f4ad3c";
const CREME = "#fcf4da";
const AFFICHE = "SansPlomb-98, 'Arial Narrow', sans-serif";

export default function PlanZones({ zone, exterieur, onZone, onExterieur, className = "" }: {
  zone: Zone | null;
  exterieur: boolean;
  onZone?: (z: Zone) => void;
  onExterieur?: () => void;
  className?: string;
}) {
  const { t } = useT();
  const main = (actif: boolean) => (actif ? { cursor: "pointer" } : undefined);
  const a = zone === "A";
  const b = zone === "B";
  return (
    <svg
      viewBox="0 0 1360 1330"
      role="img"
      aria-label={t("Plan du salon : zone A au centre du hall, zone B en bordure, esplanades extérieures")}
      className={`block w-full h-auto ${className}`}
    >
      <defs>
        <pattern id="plan-ext-oui" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="44" height="44" fill="#262626" />
          <rect width="18" height="44" fill={JAUNE} />
        </pattern>
        <pattern id="plan-ext-non" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="44" height="44" fill="#262626" />
          <rect width="18" height="44" fill="#6e5518" />
        </pattern>
      </defs>

      {/* Restauration */}
      <polygon points="287,21 780,21 780,212 376,212 376,1112 287,1112 287,912 228,900 147,853 110,778 123,705 198,645 287,623" fill="#b8432a" />
      <text x="533" y="130" textAnchor="middle" fontFamily={AFFICHE} fontSize="56" fill="#ffffff">{t("Restauration").toUpperCase()}</text>

      {/* Grill Arena */}
      <rect x="27" y="118" width="230" height="349" fill="url(#plan-ext-non)" />
      <rect x="40" y="262" width="204" height="62" rx="31" fill={CREME} />
      <text x="142" y="306" textAnchor="middle" fontFamily={AFFICHE} fontSize="38" fill="#000000">GRILL ARENA</text>

      {/* Zone B : la bordure du hall */}
      <polygon
        points="376,212 780,212 780,657 1170,657 1170,990 780,990 780,1110 376,1110"
        fill={b ? CREME : "#6a665b"}
        stroke={b ? "#ffffff" : "none"}
        strokeWidth="10"
        style={main(!!onZone)}
        onClick={onZone ? () => onZone("B") : undefined}
      />
      <rect x="376" y="623" width="89" height="487" fill="#2a2a2a" />

      {/* Zone A : le centre du hall */}
      <polygon
        points="403,253 750,253 750,703 1170,703 1170,898 1067,898 1067,930 750,930 750,1100 543,1100 543,898 465,898 465,318 403,318"
        fill={a ? JAUNE : "#7a5a10"}
        stroke={a ? "#ffffff" : "none"}
        strokeWidth="10"
        style={main(!!onZone)}
        onClick={onZone ? () => onZone("A") : undefined}
      />
      <rect x="1067" y="898" width="103" height="92" fill="#000000" />
      <text x="420" y="470" textAnchor="middle" fontFamily={AFFICHE} fontSize="96" fill="#000000" style={main(!!onZone)} onClick={onZone ? () => onZone("B") : undefined}>B</text>
      <text x="600" y="520" textAnchor="middle" fontFamily={AFFICHE} fontSize="150" fill="#000000" style={main(!!onZone)} onClick={onZone ? () => onZone("A") : undefined}>A</text>

      {/* Esplanades extérieures */}
      {["339,1117 780,1117 780,1215 725,1307 380,1307 339,1270", "787,995 1210,1002 1225,1070 1135,1160 955,1220 820,1180"].map((points) => (
        <polygon
          key={points}
          points={points}
          fill={exterieur ? "url(#plan-ext-oui)" : "url(#plan-ext-non)"}
          stroke={exterieur ? "#ffffff" : "none"}
          strokeWidth="10"
          style={main(!!onExterieur)}
          onClick={onExterieur}
        />
      ))}

      {/* Entrée */}
      <rect x="1030" y="545" width="300" height="80" rx="40" fill={JAUNE} />
      <text x="1180" y="602" textAnchor="middle" fontFamily={AFFICHE} fontSize="46" fill="#000000">{t("Entrée").toUpperCase()}</text>
      <line x1="1345" y1="835" x2="1200" y2="817" stroke={JAUNE} strokeWidth="14" strokeLinecap="round" />
      <polygon points="1180,814 1225,785 1218,845" fill={JAUNE} />
    </svg>
  );
}
