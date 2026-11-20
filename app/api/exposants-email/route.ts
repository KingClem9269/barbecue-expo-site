import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo";

/**
 * E-mail laissé sur /presentation-exposants pour ouvrir le configurateur de
 * stand → CRM (Fred).
 *
 * Relaie l'adresse au point d'envoi des formulaires du CRM, celui qu'appelait
 * l'ancien mur d'e-mail affiché en iframe. Mêmes effets : fiche contact,
 * catégorie Barbecue Expo, liste « Présentation exposants ». Ce point d'envoi
 * est public (sans clé) ; l'appel passe par notre serveur pour ne dépendre ni
 * de l'iframe ni des règles d'origine du CRM.
 *
 * Réponse du CRM : { success: true, message } — avec team: true quand
 * l'adresse est celle de l'équipe : rien n'est alors enregistré, la page se
 * débloque quand même, et elle n'envoie pas d'événement de mesure.
 */

const CRM_ENDPOINT = "https://picdlgrtgaavqywehfil.supabase.co/functions/v1/form-submit";
// Identifiant du formulaire « barbecue-expo-presentation-exposant » (lu une fois
// sur form-public-view?slug=…). Ce n'est pas un secret.
const FORM_ID = "218d7e93-6381-4fac-9bee-53bd0f683d08";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Adresses de la page autorisées dans page_url (avec ou sans préfixe de langue).
const PAGE_RE = /^(\/[a-z]{2})?\/presentation-exposants$/;

/**
 * Le CRM (fonctions Supabase de Fred) a sa base à Paris. Deux réglages pour ne
 * pas traverser l'Atlantique à chaque requête qu'il fait à sa base :
 *  - cette route tourne à Paris (cdg1) au lieu de la région Vercel par défaut
 *    (Washington, iad1) ;
 *  - l'en-tête x-region demande à Supabase d'exécuter la fonction à Paris,
 *    où que tourne l'appelant.
 */
export const preferredRegion = "cdg1";
const CRM_REGION = "eu-west-3";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "").trim().toLowerCase();
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ ok: false, errorCode: "invalid_email" }, { status: 400 });
    }
    // Le CRM tient la fiche en français ou en anglais.
    const lang = String(body?.lang ?? "fr").slice(0, 2).toLowerCase() === "fr" ? "fr" : "en";
    const page = typeof body?.page === "string" && PAGE_RE.test(body.page) ? body.page : "/presentation-exposants";

    const debut = Date.now();
    const res = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-region": CRM_REGION },
      body: JSON.stringify({ form_id: FORM_ID, data: { email }, lang, page_url: `${SITE_URL}${page}` }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok || data?.success !== true) {
      console.error("[exposants-email] erreur CRM:", res.status, data?.error ?? data?.message ?? data);
      return NextResponse.json({ ok: false, errorCode: "crm_error" }, { status: 502 });
    }
    // crmMs : durée de l'appel au CRM vue d'ici, pour suivre les temps de réponse.
    return NextResponse.json({
      ok: true,
      team: data.team === true,
      crmMs: Date.now() - debut,
      crmRegion: res.headers.get("x-sb-edge-region"),
    });
  } catch (error) {
    console.error("[exposants-email] erreur:", error);
    return NextResponse.json({ ok: false, errorCode: "unexpected_error" }, { status: 500 });
  }
}
