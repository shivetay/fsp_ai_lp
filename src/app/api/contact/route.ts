import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  topic?: string;
  message?: string;
  consent?: string;
  _gotcha?: string;
  _t?: number | string;
  "cf-turnstile-response"?: string;
};

// --- Ochrona antyspamowa -------------------------------------------------
// 1. Honeypot: ukryte pole, które wypełniają tylko boty.
// 2. Pułapka czasowa: człowiek nie wypełni formularza w mniej niż 3 sekundy.
// 3. Limit zgłoszeń: maks. 5 wiadomości z jednego IP na 10 minut (na instancję serwera).
// 4. Filtr treści: zbyt wiele linków albo typowe słowa spamowe.
// 5. Opcjonalnie Cloudflare Turnstile (niewidzialna captcha), gdy ustawione są klucze.
const MIN_FILL_MS = 3000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_LINKS = 2;
const SPAM_WORDS = /\b(viagra|casino|crypto ?invest|bitcoin profit|seo services|backlinks?|loan offer|porn)\b/i;

const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

async function turnstileOk(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile wyłączony.
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = (await res.json().catch(() => ({}))) as { success?: boolean };
  return data.success === true;
}

// Udajemy sukces, żeby bot nie wiedział, że został odfiltrowany.
const fakeOk = () => NextResponse.json({ ok: true });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";

  if (body._gotcha) return fakeOk();
  const elapsed = Number(body._t);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return fakeOk();
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Zbyt wiele wiadomości. Spróbuj ponownie za kilka minut." }, { status: 429 });
  }
  if (!(await turnstileOk(body["cf-turnstile-response"], ip))) {
    return NextResponse.json({ error: "Weryfikacja antyspamowa nie powiodła się. Odśwież stronę i spróbuj ponownie." }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 100);
  const email = (body.email ?? "").trim().slice(0, 200);
  const message = (body.message ?? "").trim().slice(0, 5000);
  const company = (body.company ?? "").trim().slice(0, 100);
  const topic = (body.topic ?? "").trim().slice(0, 100);

  if (!name || !EMAIL_RE.test(email) || !message || body.consent !== "tak") {
    return NextResponse.json({ error: "Uzupełnij wymagane pola i zaznacz zgodę." }, { status: 400 });
  }

  const links = (message.match(/https?:\/\/|www\./gi) ?? []).length;
  if (links > MAX_LINKS || SPAM_WORDS.test(`${name} ${company} ${message}`)) {
    console.warn("Formularz: odfiltrowano spam", { ip, links });
    return fakeOk();
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Formularz: brak konfiguracji RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL");
    return NextResponse.json({ error: "Formularz nie jest jeszcze skonfigurowany. Napisz bezpośrednio na e-mail." }, { status: 503 });
  }

  const html = `
    <h2>Nowe zapytanie ze strony</h2>
    <p><b>Imię i nazwisko:</b> ${escape(name)}</p>
    <p><b>E-mail:</b> ${escape(email)}</p>
    <p><b>Firma:</b> ${escape(company || "—")}</p>
    <p><b>Temat:</b> ${escape(topic || "—")}</p>
    <p><b>Wiadomość:</b><br>${escape(message).replace(/\n/g, "<br>")}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      // Można podać kilka adresów po przecinku, np. "kontakt@domena.pl, ja@gmail.com".
      to: CONTACT_TO_EMAIL.split(",").map((e) => e.trim()).filter(Boolean),
      reply_to: email,
      subject: `[Strona] ${topic || "Zapytanie"}: ${name}`,
      html,
      text: `Nowe zapytanie ze strony\n\nImię i nazwisko: ${name}\nE-mail: ${email}\nFirma: ${company || "—"}\nTemat: ${topic || "—"}\n\nWiadomość:\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return NextResponse.json({ error: "Nie udało się wysłać wiadomości. Spróbuj ponownie." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
