import { FALLBACK_RATES, type Rates } from "@/content/platforms";

// Kurs średni NBP (tabela A), odświeżany raz dziennie. Przy błędzie kurs zapasowy.
async function nbp(code: "usd" | "eur"): Promise<{ mid: number; date: string } | null> {
  try {
    const res = await fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`, {
      next: { revalidate: 60 * 60 * 12 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { rates?: { mid: number; effectiveDate: string }[] };
    const r = data.rates?.[0];
    return r && r.mid > 0 ? { mid: r.mid, date: r.effectiveDate } : null;
  } catch {
    return null;
  }
}

export async function getRates(): Promise<Rates> {
  const [usd, eur] = await Promise.all([nbp("usd"), nbp("eur")]);
  if (!usd || !eur) return FALLBACK_RATES;
  return { usd: usd.mid, eur: eur.mid, date: usd.date };
}
