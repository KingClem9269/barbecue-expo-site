/**
 * Config tarifaire de l'estimation, dérivée des données (source unique :
 * data.ts). Commune au catalogue exposant (copie des commerciaux) et au
 * configurateur de la page des campagnes : les deux produisent les mêmes
 * lignes de devis (buildLines, Estimator.tsx).
 */

import { STAND_SURFACE, STAND_RANGES, OUTDOOR, PARTNER_TIERS, COMM_PLACE_PACKS } from "./data";
import { parsePrice } from "./Estimator";

export const ESTIMATOR_CFG = {
  zonePrice: {
    A: parsePrice(STAND_SURFACE.zones.find((z) => /A/.test(z.zone))?.price) ?? 250,
    B: parsePrice(STAND_SURFACE.zones.find((z) => /B/.test(z.zone))?.price) ?? 200,
  },
  ranges: STAND_RANGES.map((r) => ({ key: r.key, title: r.title.replace(/^Option\s*\d+\s*—\s*/, ""), surcharge: parsePrice(r.price) })),
  outdoorPerSqm: parsePrice(OUTDOOR.price) ?? 150,
  partners: PARTNER_TIERS.map((t) => ({ key: t.key, name: t.name, price: parsePrice(t.price) })),
  placePacks: COMM_PLACE_PACKS.map((p) => ({ key: p.name, name: p.name, price: parsePrice(p.price) })),
};
