import { NextRequest, NextResponse } from "next/server";

/**
 * Demande de devis exposant → CRM Pylot.
 *
 * Relaie la demande vers l'edge function CRM qui crée le contact + la
 * transaction + le devis et envoie l'email (avec lien de signature).
 * Appel côté serveur uniquement : la clé n'est jamais exposée au navigateur.
 */

const CRM_ENDPOINT = "https://picdlgrtgaavqywehfil.supabase.co/functions/v1/quote-requests";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

type Contact = {
  firstName?: string; lastName?: string; email?: string; phone?: string;
  company?: string; address1?: string; postalCode?: string; city?: string;
  state?: string; country?: string; countryIso?: string;
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.CRM_QUOTE_API_KEY;
  if (!apiKey) {
    console.error("[quote] CRM_QUOTE_API_KEY manquante");
    return NextResponse.json({ ok: false, errorCode: "service_unconfigured" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const contact: Contact = body?.contact ?? {};
    const estimate = body?.estimate ?? {};
    // Langue du visiteur en deux lettres (fr, en, it…) ; Fred choisit la
    // langue du devis. Pas de conversion ici : on transmet la vraie langue.
    const lang = String(body?.lang ?? "fr").slice(0, 2).toLowerCase();
    const dryRun = body?.dryRun === true;

    // Champs obligatoires côté CRM : firstName, lastName, email.
    if (!contact.firstName?.trim() || !contact.lastName?.trim() || !contact.email?.trim()) {
      return NextResponse.json({ ok: false, errorCode: "missing_fields" }, { status: 400 });
    }
    if (!EMAIL_RE.test(String(contact.email).trim())) {
      return NextResponse.json({ ok: false, errorCode: "invalid_email" }, { status: 400 });
    }

    const debut = Date.now();
    const res = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "x-region": CRM_REGION,
      },
      body: JSON.stringify({
        lang, event: "barbecue-expo", contact, estimate,
        // Provenance du visiteur (UTM, identifiants de clic, site d'origine) :
        // Fred en déduit l'origine de la demande (publicité Meta, LinkedIn…).
        provenance: body?.provenance && typeof body.provenance === "object" ? body.provenance : null,
        ...(dryRun ? { dryRun: true } : {}),
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data?.ok) {
      console.error("[quote] erreur CRM:", res.status, data?.error ?? data);
      return NextResponse.json(
        { ok: false, errorCode: data?.error ? "crm_error" : "crm_unreachable", message: data?.error },
        { status: res.status >= 400 ? res.status : 502 },
      );
    }

    // Succès : on remonte le n° de devis et le lien de signature au front.
    // Depuis le 21 novembre 2026, Fred répond dès que le devis est créé :
    // l'e-mail part ensuite (emailSent vaut null, emailQueued vaut true).
    // timings (prepare, create, total, en ms), crmMs (durée de l'appel vue
    // d'ici) et crmRegion (région où Supabase a exécuté la fonction) servent à
    // suivre les temps de réponse.
    return NextResponse.json({
      ok: true,
      success: true,
      quoteNumber: data.quoteNumber,
      signingUrl: data.signingUrl,
      total: data.total,
      currency: data.currency,
      emailSent: data.emailSent,
      emailQueued: data.emailQueued,
      language: data.language,
      timings: data.timings,
      crmMs: Date.now() - debut,
      crmRegion: res.headers.get("x-sb-edge-region"),
    });
  } catch (error) {
    console.error("[quote] erreur:", error);
    return NextResponse.json({ ok: false, errorCode: "unexpected_error" }, { status: 500 });
  }
}
