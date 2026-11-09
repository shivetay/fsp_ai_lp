import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  topic?: string;
  message?: string;
  consent?: string;
  _gotcha?: string;
};

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

  // Bot wypełnił honeypot: udajemy sukces.
  if (body._gotcha) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim().slice(0, 100);
  const email = (body.email ?? "").trim().slice(0, 200);
  const message = (body.message ?? "").trim().slice(0, 5000);
  const company = (body.company ?? "").trim().slice(0, 100);
  const topic = (body.topic ?? "").trim().slice(0, 100);

  if (!name || !EMAIL_RE.test(email) || !message || body.consent !== "tak") {
    return NextResponse.json({ error: "Uzupełnij wymagane pola i zaznacz zgodę." }, { status: 400 });
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
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return NextResponse.json({ error: "Nie udało się wysłać wiadomości. Spróbuj ponownie." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
