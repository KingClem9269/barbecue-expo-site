/**
 * Pays + indicatifs téléphoniques pour le formulaire de devis.
 * Les noms sont localisés en français via Intl.DisplayNames (déterministe
 * côté serveur et client → pas de décalage d'hydratation).
 */

// ISO2 (minuscule) → indicatif international (sans le +)
export const COUNTRY_DIAL: Record<string, string> = {
  af: "93", al: "355", dz: "213", ad: "376", ao: "244", ag: "1", ar: "54", am: "374",
  au: "61", at: "43", az: "994", bs: "1", bh: "973", bd: "880", bb: "1", by: "375",
  be: "32", bz: "501", bj: "229", bt: "975", bo: "591", ba: "387", bw: "267", br: "55",
  bn: "673", bg: "359", bf: "226", bi: "257", kh: "855", cm: "237", ca: "1", cv: "238",
  cf: "236", td: "235", cl: "56", cn: "86", co: "57", km: "269", cg: "242", cd: "243",
  cr: "506", ci: "225", hr: "385", cu: "53", cy: "357", cz: "420", dk: "45", dj: "253",
  dm: "1", do: "1", ec: "593", eg: "20", sv: "503", gq: "240", er: "291", ee: "372",
  et: "251", fj: "679", fi: "358", fr: "33", ga: "241", gm: "220", ge: "995", de: "49",
  gh: "233", gr: "30", gd: "1", gt: "502", gn: "224", gw: "245", gy: "592", ht: "509",
  hn: "504", hu: "36", is: "354", in: "91", id: "62", ir: "98", iq: "964", ie: "353",
  il: "972", it: "39", jm: "1", jp: "81", jo: "962", kz: "7", ke: "254", ki: "686",
  kw: "965", kg: "996", la: "856", lv: "371", lb: "961", ls: "266", lr: "231", ly: "218",
  li: "423", lt: "370", lu: "352", mg: "261", mw: "265", my: "60", mv: "960", ml: "223",
  mt: "356", mh: "692", mr: "222", mu: "230", mx: "52", fm: "691", md: "373", mc: "377",
  mn: "976", me: "382", ma: "212", mz: "258", mm: "95", na: "264", nr: "674", np: "977",
  nl: "31", nz: "64", ni: "505", ne: "227", ng: "234", kp: "850", mk: "389", no: "47",
  om: "968", pk: "92", pw: "680", pa: "507", pg: "675", py: "595", pe: "51", ph: "63",
  pl: "48", pt: "351", qa: "974", ro: "40", ru: "7", rw: "250", kn: "1", lc: "1",
  vc: "1", ws: "685", sm: "378", st: "239", sa: "966", sn: "221", rs: "381", sc: "248",
  sl: "232", sg: "65", sk: "421", si: "386", sb: "677", so: "252", za: "27", kr: "82",
  ss: "211", es: "34", lk: "94", sd: "249", sr: "597", sz: "268", se: "46", ch: "41",
  sy: "963", tw: "886", tj: "992", tz: "255", th: "66", tl: "670", tg: "228", to: "676",
  tt: "1", tn: "216", tr: "90", tm: "993", tv: "688", ug: "256", ua: "380", ae: "971",
  gb: "44", us: "1", uy: "598", uz: "998", vu: "678", va: "39", ve: "58", vn: "84",
  ye: "967", zm: "260", zw: "263", hk: "852", mo: "853", pr: "1", re: "262", gp: "590",
  mq: "596", gf: "594", pf: "689", nc: "687", yt: "262",
};

export type Country = { iso: string; dial: string; name: string };

// Construit la liste localisée FR, triée alphabétiquement.
let _cache: Country[] | null = null;
export function getCountries(): Country[] {
  if (_cache) return _cache;
  let display: Intl.DisplayNames | null = null;
  try {
    display = new Intl.DisplayNames(["fr"], { type: "region" });
  } catch {
    display = null;
  }
  const list: Country[] = Object.entries(COUNTRY_DIAL).map(([iso, dial]) => ({
    iso,
    dial,
    name: display?.of(iso.toUpperCase()) ?? iso.toUpperCase(),
  }));
  list.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  _cache = list;
  return list;
}

export function countryByIso(iso: string): Country | undefined {
  return getCountries().find((c) => c.iso === iso);
}
