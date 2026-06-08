"use client";

import { useMemo } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import topoRaw from "./world-110m.json";

/* World choropleth — visitor provenance, coloured by share (gold scale),
   with "also present" countries in pale yellow and the rest in light grey. */

const W = 980;
const H = 520;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const topo = topoRaw as any;

// % share countries → gold gradient (strong → light)
const PCT_COLOR: Record<string, string> = {
  France: "#C97A14",
  Belgium: "#E0901C", Netherlands: "#E0901C", Luxembourg: "#E0901C", // Benelux
  Germany: "#EFAE4A",
  "United Kingdom": "#F4C170",
  Italy: "#F7D492",
  Spain: "#FAE3B4",
};

// All European countries (pale)
const EUROPE = new Set([
  "Albania", "Austria", "Belarus", "Belgium", "Bosnia and Herz.", "Bulgaria",
  "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France",
  "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo",
  "Latvia", "Lithuania", "Luxembourg", "Macedonia", "Moldova", "Montenegro",
  "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Serbia",
  "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine",
  "United Kingdom", "Greenland",
]);

// Other countries reached worldwide (pale)
const WORLD_PRESENT = new Set([
  "United States of America", "Canada", "South Korea", "Japan", "China",
  "Kazakhstan", "Armenia", "Turkey", "Russia", "Brazil", "Argentina",
  "Colombia", "Mexico", "Costa Rica",
  "Australia", "Vietnam", "Algeria", "Morocco", "Tunisia", "South Africa",
]);

const PALE = "#FBE7B5"; // pays également représentés — jaune pâle, lisible sur blanc
const GREY = "#D7D3C9"; // reste du monde

function fillFor(name: string): string {
  if (PCT_COLOR[name]) return PCT_COLOR[name];
  if (EUROPE.has(name) || WORLD_PRESENT.has(name)) return PALE;
  return GREY;
}

export default function VisitorMap() {
  const { paths, paris } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fc: any = feature(topo, topo.objects.countries);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const feats = fc.features.filter(
      (f: any) => f.properties.name !== "Antarctica" && f.properties.name !== "Fr. S. Antarctic Lands",
    );
    const proj = geoNaturalEarth1().fitExtent(
      [[12, 12], [W - 12, H - 12]],
      { type: "FeatureCollection", features: feats } as never,
    );
    const gp = geoPath(proj);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const paths = feats.map((f: any) => ({ name: f.properties.name as string, d: gp(f) || "" }));
    const p = proj([2.3522, 48.8566]); // Paris
    return { paths, paris: p };
  }, []);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Provenance des visiteurs">
      {paths.map((p: { name: string; d: string }, i: number) => (
        <path key={i} d={p.d} fill={fillFor(p.name)} stroke="#BBB7AC" strokeWidth={0.5} strokeLinejoin="round" />
      ))}
      {paris && (
        <g transform={`translate(${paris[0]}, ${paris[1]})`}>
          <circle r="9" fill="#F4AD3C" opacity="0.35" />
          <circle r="4" fill="#C97A14" stroke="#fff" strokeWidth="1.2" />
        </g>
      )}
    </svg>
  );
}
