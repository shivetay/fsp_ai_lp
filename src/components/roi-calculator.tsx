"use client";

import { useState } from "react";
import { roiDefaults } from "@/content/site";
import { aiCostPerRun, fmtRange, platformCost, platforms, type PlatformId } from "@/content/platforms";
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
  { key: "runsPerMonth", label: "Uruchomienia automatyzacji / mies.", hint: "Np. liczba zapytań, wizyt albo faktur w miesiącu", min: 10, max: 5000, step: 10, unit: "×" },
  { key: "steps", label: "Kroki w jednym przepływie", hint: "Wyzwalacz, AI i akcje. Typowo 4–8", min: 2, max: 15, step: 1, unit: "" },
  { key: "careCost", label: "Opieka i monitoring / mies.", hint: "Abonament wsparcia, 0 jeśli bez opieki", min: 0, max: 1500, step: 50, unit: "zł" },
];

const mid = (r: { min: number; max: number }) => (r.min + r.max) / 2;

export function RoiCalculator() {
  const [v, setV] = useState(roiDefaults);
  const [platform, setPlatform] = useState<PlatformId>("make");
  const set = (k: Key, value: number) => setV((s) => ({ ...s, [k]: value }));

  const hoursSaved = v.people * v.hoursPerWeek * WEEKS_PER_MONTH * (v.automationPct / 100);
  const monthlySavings = hoursSaved * v.hourlyCost;
  const comparison = platforms.map((p) => ({ ...p, cost: platformCost(p.id, v.runsPerMonth, v.steps) }));
  const cheapest = Math.min(...comparison.map((c) => mid(c.cost)));
  const platCost = platformCost(platform, v.runsPerMonth, v.steps);
  const aiCost = { min: v.runsPerMonth * aiCostPerRun.min, max: v.runsPerMonth * aiCostPerRun.max };
  const monthlyCost = mid(platCost) + mid(aiCost) + v.careCost;
  const netMonthly = monthlySavings - monthlyCost;
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
          <fieldset>
            <legend className="text-sm font-medium">Platforma automatyzacji</legend>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {platforms.map((p) => (
                <label
                  key={p.id}
                  className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-sm transition ${
                    platform === p.id ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"
                  }`}
                >
                  <input type="radio" name="roi-platform" value={p.id} checked={platform === p.id} onChange={() => setPlatform(p.id)} className="sr-only" />
                  {p.name.replace(" (własny serwer)", "")}
                </label>
              ))}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Koszt platformy liczę z cenników dla podanej liczby uruchomień i kroków.</p>
          </fieldset>
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
          <div className="rounded-xl border border-border bg-card p-4 text-sm">
            <p className="font-medium">Miesięczne koszty utrzymania</p>
            <dl className="mt-2 space-y-1">
              <Row label={`Platforma: ${platforms.find((p) => p.id === platform)!.name}`} value={fmtRange(platCost)} />
              <Row label="API modelu AI (2–5 gr / uruchomienie)" value={fmtRange(aiCost)} />
              <Row label="Opieka i monitoring" value={pln(v.careCost)} />
              <Row label="Razem (średnio)" value={pln(monthlyCost)} strong />
            </dl>
            {platCost.note && <p className="mt-2 text-xs text-muted-foreground">{platCost.note}</p>}
          </div>
          <a href="#kontakt" className={buttonClass.primary}>Omówmy Twój wynik</a>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-border p-6">
        <h3 className="font-semibold">Porównanie platform dla Twoich danych</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {num(v.runsPerMonth)} uruchomień × {v.steps} kroków miesięcznie. Kliknij wiersz, żeby przeliczyć ROI dla tej platformy.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-medium">Platforma</th>
                <th className="py-2 pr-4 font-medium">Koszt / mies.</th>
                <th className="py-2 font-medium">Uwagi</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setPlatform(c.id)}
                  className={`cursor-pointer border-b border-border last:border-0 hover:bg-muted ${platform === c.id ? "bg-muted" : ""}`}
                >
                  <td className="py-2 pr-4 font-medium">
                    {c.name}
                    {mid(c.cost) === cheapest && (
                      <span className="ml-2 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-700 dark:text-emerald-400">najtaniej</span>
                    )}
                  </td>
                  <td className="py-2 pr-4 font-mono">{fmtRange(c.cost)}</td>
                  <td className="py-2 text-muted-foreground">{c.cost.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Orientacyjne ceny z publicznych cenników (kurs ok. 4 zł/USD), mogą się zmienić. Zakładam natychmiastowy wyzwalacz
          (webhook, mailhook), więc puste sprawdzenia skrzynki nie zużywają kredytów. Własny serwer n8n wymaga też czasu na
          aktualizacje i kopie zapasowe.{" "}
          <a href="/realizacje#platformy" className="underline underline-offset-4">Porównanie platform: zalety i wady</a>
        </p>
      </div>

      <div className="mt-6 grid gap-6 rounded-xl border border-border p-6 md:grid-cols-3">
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
            Od oszczędności odejmuję koszty miesięczne: platformę (z cennika dla Twojej liczby uruchomień i kroków),
            API modelu AI i opiekę. Od wyniku za 12 miesięcy odejmuję koszt wdrożenia.
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

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? "border-t border-border pt-1 font-semibold" : ""}`}>
      <dt className={strong ? "" : "text-muted-foreground"}>{label}</dt>
      <dd className="shrink-0 font-mono">{value}</dd>
    </div>
  );
}
