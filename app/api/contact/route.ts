import { NextRequest, NextResponse } from "next/server";

/**
 * Formulaire de contact du site → CRM Pylot.
 *
 * Relaie la demande vers l'edge function CRM `contact-requests` qui retrouve/crée
 * le contact + la société et journalise la demande (sujet + message) sur la
 * fiche. Appel côté serveur uniquement : la clé n'est jamais exposée au navigateur.
 */

const CRM_ENDPOINT =
  "https://picdlgrtgaavqywehfil.supabase.co/functions/v1/contact-requests";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Contact = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.CRM_QUOTE_API_KEY;
  if (!apiKey) {
    console.error("[contact] CRM_QUOTE_API_KEY manquante");
    return NextResponse.json(
      { ok: false, errorCode: "service_unconfigured" },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const contact: Contact = body?.contact ?? {};
    const subject = String(body?.subject ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!contact.firstName?.trim() || !contact.lastName?.trim() || !contact.email?.trim()) {
      return NextResponse.json({ ok: false, errorCode: "missing_fields" }, { status: 400 });
    }
    if (!EMAIL_RE.test(String(contact.email).trim())) {
      return NextResponse.json({ ok: false, errorCode: "invalid_email" }, { status: 400 });
    }
    if (!subject) {
      return NextResponse.json({ ok: false, errorCode: "subject_required" }, { status: 400 });
    }

    const res = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ contact, subject, message }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data?.ok) {
      console.error("[contact] erreur CRM:", res.status, data?.error ?? data);
      return NextResponse.json(
        { ok: false, errorCode: data?.error ? "unable_to_send" : "crm_unreachable" },
        { status: res.status >= 400 ? res.status : 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] erreur:", error);
    return NextResponse.json(
      { ok: false, errorCode: "unexpected_error" },
      { status: 500 },
    );
  }
}
