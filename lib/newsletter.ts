/**
 * Inscription à la newsletter — POST direct vers la fonction Pylot (Supabase
 * edge function). La clé `apikey` est une clé PUBLIABLE (sb_publishable_…),
 * conçue pour un usage navigateur — à ne pas confondre avec la clé secrète du
 * CRM (devis). Utilisée par le pied de page et par l'alerte d'ouverture de
 * la billetterie : même formulaire, même liste.
 */
const PYLOT_FORM_URL =
  "https://picdlgrtgaavqywehfil.supabase.co/functions/v1/form-submit";
const PYLOT_FORM_ID = "0bff2fd4-671d-4f16-afe3-ab318eab3804";
const PYLOT_PUBLISHABLE_KEY = "sb_publishable_UpBJ_VV92fea9pj4yPaBng_23H9dCNM";

/** Lève une exception si le réseau échoue ; `message` vient du serveur. */
export async function inscrireNewsletter(
  email: string,
): Promise<{ ok: boolean; message?: string }> {
  const res = await fetch(PYLOT_FORM_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: PYLOT_PUBLISHABLE_KEY,
    },
    body: JSON.stringify({
      form_id: PYLOT_FORM_ID,
      data: { email: email.trim(), edition: "barbecue_expo" },
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.error) return { ok: false, message: data?.error };
  return { ok: true, message: data?.message };
}
