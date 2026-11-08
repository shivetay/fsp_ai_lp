"use client";

import { useState } from "react";
import { roiDefaults } from "@/content/site";
import { Section, SectionHeading, buttonClass } from "./ui";

const WEEKS_PER_MONTH = 4.33;

const pln = (n: number) =>
  new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(n);
const num = (n: number, d = 0) => new Intl.NumberFormat("pl-PL", { maximumFractionDigits: d }).format(n);

type Key = keyof typeof roiDefaults;

const FIELDS: { key: Key; label: string; hint: string; min: number; max: number; step: number; unit: string }[] = [
  { key: "people", label: "Liczba osób wykonujących zadanie", hint: "Ile osób w firmie robi to ręcznie", min: 1, max: 20, step: 1, unit: "os." },
  { key: "hoursPerWeek", label: "Godziny tygodniowo na osobę", hint: "Ile czasu zajmuje to zadanie jednej osobie", min: 1, max: 40, step: 1, unit: "h" },
  { key: "hourlyCost", label: "Koszt godziny pracy", hint: "Wynagrodzenie z narzutami albo wartość Twojej godziny", min: 20, max: 300, step: 5, unit: "zł" },
  { key: "automationPct", label: "Jaką część da się zautomatyzować", hint: "Zwykle 40–80%, reszta zostaje dla człowieka", min: 10, max: 100, step: 5, unit: "%" },
  { key: "setupCost", label: "Jednorazowy koszt wdrożenia", hint: "Przykładowa wartość, dokładną podam po analizie", min: 500, max: 30000, step: 500, unit: "zł" },
  { key: "monthlyCost", label: "Miesięczny koszt utrzymania", hint: "Narzędzia, API modeli AI, opieka", min: 0, max: 2000, step: 50, unit: "zł" },
];

export function RoiCalculator() {
  const [v, setV] = useState(roiDefaults);
  const set = (k: Key, value: number) => setV((s) => ({ ...s, [k]: value }));

  const hoursSaved = v.people * v.hoursPerWeek * WEEKS_PER_MONTH * (v.automationPct / 100);
  const monthlySavings = hoursSaved * v.hourlyCost;
  const netMonthly = monthlySavings - v.monthlyCost;
  const firstYear = netMonthly * 12 - v.setupCost;
  const roi = v.setupCost > 0 ? (firstYear / v.setupCost) * 100 : 0;
  const payback = netMonthly > 0 ? v.setupCost / netMonthly : Infinity;

  return (
    <Section id="roi">
      <SectionHeading
        eyebrow="Kalkulator ROI"
        title="Policz, czy automatyzacja się opłaca"
        lead="Wpisz dane jednego powtarzalnego zadania, np. odpisywanie na zapytania, przepisywanie faktur czy umawianie wizyt."
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5 rounded-xl border border-border bg-card p-6">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`roi-${f.key}`} className="text-sm font-medium">{f.label}</label>
                <span className="shrink-0 font-mono text-sm">
                  {num(v[f.key])} {f.unit}
                </span>
              </div>
              <input
                id={`roi-${f.key}`}
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={v[f.key]}
                onChange={(e) => set(f.key, Number(e.target.value))}
                className="mt-2 w-full accent-[var(--primary)]"
              />
              <p className="text-xs text-muted-foreground">{f.hint}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl bg-primary p-6 text-primary-foreground">
            <p className="text-sm opacity-70">Zwrot z inwestycji w pierwszym roku</p>
            <p className="mt-1 text-5xl font-semibold tracking-tight" aria-live="polite">
              {roi > 0 ? "+" : ""}{num(roi)}%
            </p>
            <p className="mt-2 text-sm opacity-70">
              {Number.isFinite(payback)
                ? `Wdrożenie zwraca się po ok. ${num(Math.max(payback, 0.1), 1)} mies.`
                : "Przy tych danych koszty utrzymania przewyższają oszczędności."}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            <Stat label="Zaoszczędzone godziny / mies." value={`${num(hoursSaved)} h`} />
            <Stat label="Oszczędność / mies." value={pln(monthlySavings)} />
            <Stat label="Zysk netto / mies." value={pln(netMonthly)} />
            <Stat label="Zysk netto w 1. roku" value={pln(firstYear)} />
          </dl>
          <a href="#kontakt" className={buttonClass.primary}>Omówmy Twój wynik</a>
        </div>
      </div>

      <div className="mt-10 grid gap-6 rounded-xl border border-border p-6 md:grid-cols-3">
        <div>
          <h3 className="font-semibold">Co to jest ROI?</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            ROI (return on investment) to zwrot z inwestycji. Mówi, ile zarabiasz lub oszczędzasz na każdej
            wydanej złotówce. ROI 200% oznacza, że wdrożenie za 4 000 zł oddało w ciągu roku swój koszt i
            dodatkowo 8 000 zł.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Jak liczę?</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Oszczędność = osoby × godziny tygodniowo × 4,33 tyg. × % automatyzacji × koszt godziny.
            Od oszczędności odejmuję miesięczny koszt utrzymania, a od wyniku za 12 miesięcy koszt wdrożenia.
            ROI = zysk netto ÷ koszt wdrożenia.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">O czym pamiętać?</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            To szacunek. Nie uwzględnia korzyści trudnych do wyceny: szybszej odpowiedzi dla klienta, mniejszej
            liczby błędów i mniej stresu w zespole. Dokładne wyliczenie przygotuję po bezpłatnej rozmowie.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-lg font-semibold">{value}</dd>
    </div>
  );
}
