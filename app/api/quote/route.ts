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

type Contact = {
  firstName?: string; lastName?: string; email?: string; phone?: string;
  company?: string; address1?: string; postalCode?: string; city?: string;
  state?: string; country?: string; countryIso?: string; siret?: string; vat?: string;
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

    // Champs obligatoires côté CRM : firstName, lastName, email.
    if (!contact.firstName?.trim() || !contact.lastName?.trim() || !contact.email?.trim()) {
      return NextResponse.json({ ok: false, errorCode: "missing_fields" }, { status: 400 });
    }
    if (!EMAIL_RE.test(String(contact.email).trim())) {
      return NextResponse.json({ ok: false, errorCode: "invalid_email" }, { status: 400 });
    }

    const res = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ contact, estimate }),
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
    return NextResponse.json({
      ok: true,
      success: true,
      quoteNumber: data.quoteNumber,
      signingUrl: data.signingUrl,
      total: data.total,
      currency: data.currency,
      emailSent: data.emailSent,
    });
  } catch (error) {
    console.error("[quote] erreur:", error);
    return NextResponse.json({ ok: false, errorCode: "unexpected_error" }, { status: 500 });
  }
}
