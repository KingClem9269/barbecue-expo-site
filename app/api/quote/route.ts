import { NextRequest, NextResponse } from "next/server";

/**
 * Demande de devis exposant.
 *
 * STUB — pour l'instant, valide la charge utile et la journalise.
 * TODO (CRM) :
 *   1. Rechercher le contact par email dans le CRM.
 *   2. Si trouvé → créer une transaction + un devis et l'envoyer.
 *      Sinon → créer la fiche contact, puis transaction + devis.
 *   Brancher ici (HubSpot / Brevo / Pipedrive…) avec la clé en variable
 *   d'environnement, comme app/api/newsletter/route.ts.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Contact = {
  firstName?: string; lastName?: string; email?: string; phone?: string;
  company?: string; address1?: string; postalCode?: string; city?: string;
  state?: string; country?: string; countryIso?: string; siret?: string; vat?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const contact: Contact = body?.contact ?? {};
    const estimate = body?.estimate ?? {};

    // Validation des champs obligatoires
    const required: (keyof Contact)[] = ["firstName", "lastName", "email", "phone", "company", "address1", "postalCode", "city", "countryIso"];
    const missing = required.filter((k) => !contact[k] || String(contact[k]).trim() === "");
    if (missing.length > 0) {
      return NextResponse.json({ errorCode: "missing_fields", fields: missing }, { status: 400 });
    }
    if (!EMAIL_RE.test(String(contact.email).trim())) {
      return NextResponse.json({ errorCode: "invalid_email" }, { status: 400 });
    }

    // STUB : journalisation en attendant le branchement CRM.
    console.info("[quote] nouvelle demande de devis", {
      email: contact.email,
      company: contact.company,
      total: estimate?.total,
      hasQuote: estimate?.hasQuote,
      lineCount: Array.isArray(estimate?.lines) ? estimate.lines.length : 0,
    });

    // TODO : créer contact + transaction + devis dans le CRM ici.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[quote] erreur:", error);
    return NextResponse.json({ errorCode: "unexpected_error" }, { status: 500 });
  }
}
