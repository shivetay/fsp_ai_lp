// Platformy automatyzacji i orientacyjne koszty miesięczne.
// Ceny trzymam w walucie dostawcy (USD / EUR) i przeliczam na złote po kursie NBP (src/lib/rates.ts).
// Ceny zmieniają się. Przed ofertą sprawdź aktualne cenniki dostawców.

export type Currency = "USD" | "EUR";

export type Rates = {
  usd: number; // zł za 1 USD
  eur: number; // zł za 1 EUR
  date: string | null; // data tabeli NBP, null = kurs zapasowy
};

// Kurs zapasowy, gdy API NBP nie odpowiada.
export const FALLBACK_RATES: Rates = { usd: 4, eur: 4.3, date: null };

type Money = { min: number; max: number; cur: Currency };

const toPln = (m: Money, r: Rates) => {
  const k = m.cur === "USD" ? r.usd : r.eur;
  return { min: m.min * k, max: m.max * k };
};

const fmtNum = (n: number, d = 2) => new Intl.NumberFormat("pl-PL", { maximumFractionDigits: d }).format(n);

export function rateLabel(r: Rates) {
  const src = r.date ? `kurs średni NBP z ${r.date}` : "kurs orientacyjny";
  return `1 USD = ${fmtNum(r.usd)} zł, 1 EUR = ${fmtNum(r.eur)} zł (${src})`;
}

export function priceNote(r: Rates) {
  return `Ceny są szacunkowe. Plany platform i API modeli AI są w USD (Make, Activepieces, Zapier, Claude) lub w EUR (serwery VPS np. Hetzner). Przeliczam je po kursie: ${rateLabel(r)}, więc kwota w złotówkach zmienia się z kursem walut i cennikami dostawców. Przed ofertą zawsze sprawdzam aktualne ceny.`;
}

export type PlatformId = "make" | "n8n" | "activepieces" | "zapier";

export type Platform = {
  id: PlatformId;
  name: string;
  hosting: string;
  pricing: string; // jak liczony jest koszt
  free: string;
  paid: (r: Rates) => string;
  pros: string[];
  cons: string[];
  bestFor: string;
};

const zl = (m: Money, r: Rates) => fmtRange(toPln(m, r));
const USD = (min: number, max = min): Money => ({ min, max, cur: "USD" });
const EUR = (min: number, max = min): Money => ({ min, max, cur: "EUR" });

// Ceny w walucie dostawcy.
const P = {
  makeCore: USD(12),
  makePro: USD(25, 50),
  makeBig: USD(50, 100),
  vps: EUR(5, 9),
  apCloud: USD(20),
  zap750: USD(20, 22.5),
  zap2k: USD(47.5, 52.5),
  zap5k: USD(85, 95),
  zapBig: USD(125, 225),
};

export const platforms: Platform[] = [
  {
    id: "make",
    name: "Make",
    hosting: "Chmura (firma z UE, Praga)",
    pricing: "1 kredyt za każdy wykonany krok",
    free: "1 000 kredytów / mies.",
    paid: (r) => `Core ok. $12 (${zl(P.makeCore, r)}); przy 15–30 tys. kredytów ok. $25–50 (${zl(P.makePro, r)})`,
    pros: ["Najtańszy hostowany na start", "Klient sam widzi historię wykonań", "Bez serwera i aktualizacji"],
    cons: ["Nie da się postawić na własnym serwerze", "Ryzyko zmian cennika", "Trudniej przenieść przepływ gdzie indziej"],
    bestFor: "Mała firma, która chce mieć konto na siebie i nie myśleć o serwerze.",
  },
  {
    id: "n8n",
    name: "n8n (własny serwer)",
    hosting: "Twój serwer VPS (np. Hetzner)",
    pricing: "Bez limitu wykonań, płacisz za serwer",
    free: "Oprogramowanie bezpłatne",
    paid: (r) => `Serwer ok. 5–9 € (${zl(P.vps, r)}) / mies. + czas na utrzymanie`,
    pros: ["Bez limitów wykonań", "Dane zostają na Twoim serwerze", "Najwięcej możliwości i integracji"],
    cons: ["Aktualizacje i kopie zapasowe po stronie wykonawcy", "Opłaca się przy większym ruchu lub kilku automatyzacjach"],
    bestFor: "Większy ruch, wrażliwe dane albo kilka rozbudowanych automatyzacji.",
  },
  {
    id: "activepieces",
    name: "Activepieces",
    hosting: "Chmura lub własny serwer (open source, MIT)",
    pricing: "Chmura: kredyty, potem ryczałt; własny serwer: bez limitu",
    free: "1 000 kredytów / mies. w chmurze",
    paid: (r) => `Chmura ok. $20 (${zl(P.apCloud, r)}) ryczałtem; własny serwer ok. 5–9 € (${zl(P.vps, r)})`,
    pros: ["Prostszy od n8n, klient może sam coś zmienić", "Licencja MIT, można hostować u siebie", "Przewidywalny ryczałt w chmurze"],
    cons: ["Mniej gotowych integracji", "Mniejsza społeczność"],
    bestFor: "Klient, który chce prostego narzędzia i przewidywalnego kosztu.",
  },
  {
    id: "zapier",
    name: "Zapier",
    hosting: "Chmura (USA)",
    pricing: "1 zadanie za każdy krok po wyzwalaczu",
    free: "100 zadań, tylko przepływy 2-krokowe",
    paid: (r) => `Od ok. $20 (${zl(P.zap750, r)}) za 750 zadań, ok. $50 (${zl(P.zap2k, r)}) za 2 000 zadań`,
    pros: ["Najprostszy interfejs", "Najwięcej gotowych aplikacji"],
    cons: ["Najdroższy przy większym ruchu", "Darmowy plan bardzo ograniczony"],
    bestFor: "Firma, która już używa Zapiera.",
  },
];

export type CostRange = { min: number; max: number; note?: string };

const ZERO = { min: 0, max: 0 };

/**
 * Szacunkowy miesięczny koszt platformy (PLN) dla danej liczby uruchomień i kroków w przepływie.
 * Zakłada natychmiastowy wyzwalacz (webhook / mailhook), więc puste sprawdzenia nie zużywają kredytów.
 */
export function platformCost(id: PlatformId, runs: number, steps: number, r: Rates): CostRange {
  const s = Math.max(steps, 1);
  switch (id) {
    case "make": {
      const credits = runs * s;
      if (credits <= 1000) return { ...ZERO, note: `ok. ${fmt(credits)} kredytów, plan darmowy` };
      if (credits <= 10000) return { ...toPln(P.makeCore, r), note: `ok. ${fmt(credits)} kredytów, plan Core` };
      if (credits <= 30000) return { ...toPln(P.makePro, r), note: `ok. ${fmt(credits)} kredytów, plan Pro lub dokupione kredyty` };
      return { ...toPln(P.makeBig, r), note: `ok. ${fmt(credits)} kredytów, tu zwykle opłaca się n8n` };
    }
    case "n8n":
      return { ...toPln(P.vps, r), note: "serwer VPS bez limitu wykonań, plus czas na utrzymanie" };
    case "activepieces": {
      const credits = runs * s;
      if (credits <= 1000) return { ...ZERO, note: `ok. ${fmt(credits)} kredytów, plan darmowy w chmurze` };
      return { ...toPln(P.apCloud, r), note: `chmura ryczałtem (albo ${zl(P.vps, r)} na własnym serwerze)` };
    }
    case "zapier": {
      const tasks = runs * Math.max(s - 1, 1);
      if (tasks <= 100 && s <= 2) return { ...ZERO, note: `ok. ${fmt(tasks)} zadań, plan darmowy` };
      if (tasks <= 750) return { ...toPln(P.zap750, r), note: `ok. ${fmt(tasks)} zadań` };
      if (tasks <= 2000) return { ...toPln(P.zap2k, r), note: `ok. ${fmt(tasks)} zadań` };
      if (tasks <= 5000) return { ...toPln(P.zap5k, r), note: `ok. ${fmt(tasks)} zadań` };
      return { ...toPln(P.zapBig, r), note: `ok. ${fmt(tasks)} zadań, plan firmowy` };
    }
  }
}

// Koszt API modelu AI (np. Claude Haiku) na jedno uruchomienie z krokiem AI: ok. 0,5–1,25 centa.
const AI_PER_RUN = USD(0.005, 0.0125);
export const aiCostPerRun = (r: Rates) => toPln(AI_PER_RUN, r);

export const fmtRange = (r: { min: number; max: number }) =>
  r.max === 0 ? "0 zł" : Math.round(r.min) === Math.round(r.max) ? `ok. ${fmt(r.min)} zł` : `${fmt(r.min)}–${fmt(r.max)} zł`;

function fmt(n: number) {
  return new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(n);
}
