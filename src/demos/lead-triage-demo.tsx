"use client";

import { useState } from "react";

const SAMPLE = `Dzień dobry,
prowadzę sklep internetowy i codziennie ręcznie przepisuję zamówienia z maili do arkusza i do systemu faktur. Zajmuje mi to ok. 2 godziny dziennie. Czy da się to zautomatyzować? Zależy mi na szybkim terminie.

Anna Kowalska
anna@sklep-przyklad.pl, tel. 600 100 200`;

const CATEGORIES: { name: string; keywords: string[] }[] = [
  { name: "Automatyzacja procesu", keywords: ["automat", "ręcznie", "arkusz", "excel", "przepis", "faktur", "crm"] },
  { name: "Chatbot / asystent AI", keywords: ["chatbot", "bot", "asystent", "czat", "obsługa klienta", "faq"] },
  { name: "Aplikacja / MVP", keywords: ["aplikac", "mvp", "platform", "panel", "saas", "strona"] },
  { name: "Konsultacja", keywords: ["audyt", "konsultac", "doradz", "porad"] },
];

type Result = {
  name?: string;
  email?: string;
  phone?: string;
  category: string;
  priority: "Wysoki" | "Średni" | "Niski";
  reply: string;
};

function analyze(text: string): Result {
  const lower = text.toLowerCase();
  const email = text.match(/[\w.+-]+@[\w-]+\.[\w.]+/)?.[0];
  const phone = text.match(/(\+?48[\s-]?)?\d{3}[\s-]?\d{3}[\s-]?\d{3}/)?.[0];
  const lines = text.trim().split("\n").map((l) => l.trim()).filter(Boolean);
  const name = lines.find((l) => /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+ [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż-]+$/.test(l));

  let best = { name: "Ogólne zapytanie", score: 0 };
  for (const c of CATEGORIES) {
    const score = c.keywords.filter((k) => lower.includes(k)).length;
    if (score > best.score) best = { name: c.name, score };
  }

  const urgent = ["pilne", "szybk", "asap", "jak najszybciej", "termin"].some((k) => lower.includes(k));
  const priority = urgent ? "Wysoki" : best.score >= 2 ? "Średni" : "Niski";
  const greeting = "Dzień dobry,";
  const reply = `${greeting}\n\ndziękuję za wiadomość. Temat „${best.name.toLowerCase()}” to dokładnie to, czym się zajmuję. Proponuję krótką, bezpłatną rozmowę (30 min), na której omówimy proces i oszacujemy oszczędność czasu.\n\nCzy pasuje Pani/Panu termin w tym tygodniu?\n\nPozdrawiam,\nŁukasz`;

  return { name, email, phone, category: best.name, priority, reply };
}

const STEPS = ["Odczyt wiadomości", "Ekstrakcja danych", "Klasyfikacja", "Szkic odpowiedzi"];

export function LeadTriageDemo() {
  const [text, setText] = useState(SAMPLE);
  const [step, setStep] = useState(-1);
  const [result, setResult] = useState<Result | null>(null);

  const run = async () => {
    setResult(null);
    for (let i = 0; i < STEPS.length; i++) {
      setStep(i);
      await new Promise((r) => setTimeout(r, 450));
    }
    setResult(analyze(text));
    setStep(STEPS.length);
  };

  const running = step >= 0 && step < STEPS.length;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        <label htmlFor="demo-input" className="text-sm font-medium">Treść maila od klienta</label>
        <textarea
          id="demo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={11}
          className="w-full resize-y rounded-lg border border-border bg-background p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="button"
          onClick={run}
          disabled={running || !text.trim()}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {running ? "Przetwarzam…" : "Uruchom automat"}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s}
              className={`rounded-md border px-2 py-2 text-center text-xs transition-colors ${
                step > i || step === STEPS.length
                  ? "border-emerald-500/50 bg-emerald-500/10"
                  : step === i
                    ? "animate-pulse border-ring bg-muted"
                    : "border-border text-muted-foreground"
              }`}
            >
              {s}
            </li>
          ))}
        </ol>

        {result ? (
          <div className="space-y-4 rounded-lg border border-border bg-muted/40 p-4 text-sm">
            <dl className="grid grid-cols-2 gap-3">
              <Field label="Klient" value={result.name} />
              <Field label="E-mail" value={result.email} />
              <Field label="Telefon" value={result.phone} />
              <Field label="Kategoria" value={result.category} />
              <Field label="Priorytet" value={result.priority} />
              <Field label="Następny krok" value="Lead w CRM + odpowiedź do akceptacji" />
            </dl>
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">Szkic odpowiedzi</p>
              <pre className="whitespace-pre-wrap rounded-md border border-border bg-background p-3 font-sans text-sm">{result.reply}</pre>
            </div>
          </div>
        ) : (
          <div className="grid flex-1 place-items-center rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Wynik pojawi się tutaj po uruchomieniu automatu.
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value || "—"}</dd>
    </div>
  );
}
