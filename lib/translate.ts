/**
 * AI translation helper (OpenAI) for exhibitor-provided text.
 *
 * The source language is unknown (an exhibitor may write in FR, EN, …).
 * We ask the model to translate into the TARGET locale, returning the text
 * unchanged when it's already in that language — so detection is implicit.
 *
 * - Batched: many strings per API call (cost-efficient).
 * - Cached in-memory per (locale, text) for the lifetime of the instance.
 * - Fallback: if OPENAI_API_KEY is missing or the call fails, returns the
 *   original text untouched (site never breaks, just stays in source lang).
 *
 * ── Required env var (.env.local + Vercel) ──
 *   OPENAI_API_KEY   your OpenAI API key
 *   OPENAI_TRANSLATE_MODEL  (optional) defaults to "gpt-4o-mini"
 */

const ENDPOINT = "https://api.openai.com/v1/chat/completions";
const MAX_BATCH = 25;

const LANGUAGE_NAMES: Record<string, string> = {
  fr: "French",
  en: "English",
  es: "Spanish",
  de: "German",
  nl: "Dutch",
  pt: "Portuguese",
  it: "Italian",
};

// Process-lifetime cache: key = `${locale}::${text}` → translation.
const cache = new Map<string, string>();

/**
 * Translate a list of texts into `targetLocale`.
 * Returns an array the SAME length/order as the input.
 * Empty/whitespace items are returned as-is.
 */
export async function translateMany(
  texts: (string | undefined | null)[],
  targetLocale: string,
): Promise<(string | undefined)[]> {
  const lang = LANGUAGE_NAMES[targetLocale];
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_TRANSLATE_MODEL || "gpt-4o-mini";

  // Normalize input.
  const normalized = texts.map((t) => (t && String(t).trim()) || undefined);

  // No key, no target language, or nothing to do → return as-is.
  if (!apiKey || !lang) {
    return normalized;
  }

  // Resolve from cache; collect the ones still needing translation.
  const result: (string | undefined)[] = new Array(normalized.length);
  const pending: { index: number; text: string }[] = [];

  normalized.forEach((text, i) => {
    if (!text) {
      result[i] = undefined;
      return;
    }
    const cached = cache.get(`${targetLocale}::${text}`);
    if (cached !== undefined) {
      result[i] = cached;
    } else {
      pending.push({ index: i, text });
    }
  });

  // Translate pending in batches.
  for (let start = 0; start < pending.length; start += MAX_BATCH) {
    const chunk = pending.slice(start, start + MAX_BATCH);
    let translations: string[];
    try {
      translations = await translateChunk(
        chunk.map((c) => c.text),
        lang,
        apiKey,
        model,
      );
    } catch (err) {
      console.error("[translate] batch failed — keeping original text", err);
      translations = chunk.map((c) => c.text);
    }

    chunk.forEach((c, j) => {
      const out = translations[j] ?? c.text;
      cache.set(`${targetLocale}::${c.text}`, out);
      result[c.index] = out;
    });
  }

  return result;
}

/** Convenience for a single string. */
export async function translateText(
  text: string | undefined | null,
  targetLocale: string,
): Promise<string | undefined> {
  const [out] = await translateMany([text], targetLocale);
  return out;
}

/* ------------------------------------------------------------------ */
/*  OpenAI call (one batch)                                           */
/* ------------------------------------------------------------------ */

async function translateChunk(
  texts: string[],
  languageName: string,
  apiKey: string,
  model: string,
): Promise<string[]> {
  const system =
    `You are a professional translator for a barbecue trade-show website. ` +
    `Translate each item of the given JSON array into ${languageName}. ` +
    `If an item is already written in ${languageName}, return it unchanged. ` +
    `Preserve meaning, brand names, tone and basic formatting. ` +
    `Do not add quotes, comments or extra text. ` +
    `Respond ONLY with a JSON object of the form {"translations": string[]} ` +
    `whose array has EXACTLY the same length and order as the input.`;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: JSON.stringify({ items: texts }) },
      ],
    }),
    // Translations can change independently of the source; cache daily.
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!res.ok) {
    throw new Error(`OpenAI ${res.status}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI empty response");

  const parsed = JSON.parse(content);
  const out = parsed?.translations ?? parsed?.items ?? parsed;
  if (!Array.isArray(out) || out.length !== texts.length) {
    throw new Error("OpenAI length mismatch");
  }
  return out.map((x: unknown) => String(x));
}
