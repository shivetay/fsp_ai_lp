// Platformy automatyzacji i orientacyjne koszty miesięczne (PLN, kurs ok. 4 zł/USD).
// Ceny zmieniają się. Przed ofertą sprawdź aktualne cenniki dostawców.

export type PlatformId = "make" | "n8n" | "activepieces" | "zapier";

export type Platform = {
  id: PlatformId;
  name: string;
  hosting: string;
  pricing: string; // jak liczony jest koszt
  free: string;
  paid: string;
  pros: string[];
  cons: string[];
  bestFor: string;
};

export const platforms: Platform[] = [
  {
    id: "make",
    name: "Make",
    hosting: "Chmura (firma z UE, Praga)",
    pricing: "1 kredyt za każdy wykonany krok",
    free: "1 000 kredytów / mies.",
    paid: "Core ok. 50 zł; przy 15–30 tys. kredytów ok. 100–200 zł",
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
    paid: "Serwer ok. 20–40 zł / mies. + czas na utrzymanie",
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
    paid: "Chmura ok. 80 zł ryczałtem; własny serwer ok. 20–40 zł",
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
    paid: "Od ok. 80 zł (750 zadań), ok. 200 zł (2 000 zadań)",
    pros: ["Najprostszy interfejs", "Najwięcej gotowych aplikacji"],
    cons: ["Najdroższy przy większym ruchu", "Darmowy plan bardzo ograniczony"],
    bestFor: "Firma, która już używa Zapiera.",
  },
];

export type CostRange = { min: number; max: number; note?: string };

/**
 * Szacunkowy miesięczny koszt platformy (PLN) dla danej liczby uruchomień i kroków w przepływie.
 * Zakłada natychmiastowy wyzwalacz (webhook / mailhook), więc puste sprawdzenia nie zużywają kredytów.
 */
export function platformCost(id: PlatformId, runs: number, steps: number): CostRange {
  const s = Math.max(steps, 1);
  switch (id) {
    case "make": {
      const credits = runs * s;
      if (credits <= 1000) return { min: 0, max: 0, note: `ok. ${fmt(credits)} kredytów, plan darmowy` };
      if (credits <= 10000) return { min: 50, max: 50, note: `ok. ${fmt(credits)} kredytów, plan Core` };
      if (credits <= 30000) return { min: 100, max: 200, note: `ok. ${fmt(credits)} kredytów, plan Pro lub dokupione kredyty` };
      return { min: 200, max: 400, note: `ok. ${fmt(credits)} kredytów, tu zwykle opłaca się n8n` };
    }
    case "n8n":
      return { min: 20, max: 40, note: "serwer VPS bez limitu wykonań, plus czas na utrzymanie" };
    case "activepieces": {
      const credits = runs * s;
      if (credits <= 1000) return { min: 0, max: 0, note: `ok. ${fmt(credits)} kredytów, plan darmowy w chmurze` };
      return { min: 80, max: 80, note: "chmura ryczałtem (albo ok. 20–40 zł na własnym serwerze)" };
    }
    case "zapier": {
      const tasks = runs * Math.max(s - 1, 1);
      if (tasks <= 100 && s <= 2) return { min: 0, max: 0, note: `ok. ${fmt(tasks)} zadań, plan darmowy` };
      if (tasks <= 750) return { min: 80, max: 90, note: `ok. ${fmt(tasks)} zadań` };
      if (tasks <= 2000) return { min: 190, max: 210, note: `ok. ${fmt(tasks)} zadań` };
      if (tasks <= 5000) return { min: 340, max: 380, note: `ok. ${fmt(tasks)} zadań` };
      return { min: 500, max: 900, note: `ok. ${fmt(tasks)} zadań, plan firmowy` };
    }
  }
}

// Koszt API modelu AI (np. Claude Haiku) na jedno uruchomienie z krokiem AI: ok. 2–5 groszy.
export const aiCostPerRun = { min: 0.02, max: 0.05 };

export const fmtRange = (r: { min: number; max: number }) =>
  r.max === 0 ? "0 zł" : Math.round(r.min) === Math.round(r.max) ? `ok. ${fmt(r.min)} zł` : `${fmt(r.min)}–${fmt(r.max)} zł`;

function fmt(n: number) {
  return new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 }).format(n);
}
