import { platforms } from "@/content/platforms";

// Opis platform automatyzacji: zalety, wady, koszty i dla kogo.
export function PlatformComparison({ id = "platformy", muted = false }: { id?: string; muted?: boolean }) {
  return (
    <section id={id} className={`scroll-mt-20 border-t border-border py-20 ${muted ? "bg-muted/40" : ""}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Narzędzia</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">n8n, Make, Activepieces czy Zapier?</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          Ta sama automatyzacja może działać na różnych platformach. Różnią się sposobem liczenia kosztów, miejscem
          przechowywania danych i tym, ile możesz zmienić sam. Dobieram platformę do skali i budżetu firmy, a nie
          odwrotnie.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {platforms.map((p) => (
            <article key={p.id} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.hosting}</p>

              <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
                <div className="rounded-lg bg-muted px-3 py-2">
                  <dt className="text-xs text-muted-foreground">Jak liczy koszt</dt>
                  <dd className="mt-0.5">{p.pricing}</dd>
                </div>
                <div className="rounded-lg bg-muted px-3 py-2">
                  <dt className="text-xs text-muted-foreground">Za darmo</dt>
                  <dd className="mt-0.5">{p.free}</dd>
                </div>
                <div className="rounded-lg bg-muted px-3 py-2">
                  <dt className="text-xs text-muted-foreground">Płatnie</dt>
                  <dd className="mt-0.5">{p.paid}</dd>
                </div>
              </dl>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Zalety</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {p.pros.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span aria-hidden className="text-emerald-600 dark:text-emerald-400">+</span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium">Wady</p>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    {p.cons.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span aria-hidden className="text-rose-600 dark:text-rose-400">−</span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-auto pt-5 text-sm">
                <span className="font-medium">Dla kogo: </span>
                <span className="text-muted-foreground">{p.bestFor}</span>
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-border p-6">
          <h3 className="font-semibold">Co zwykle polecam</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Jedna prosta automatyzacja, mały ruch:</span> Make albo
              Activepieces na koncie firmy. Często mieści się w darmowym planie, a klient sam widzi, co się dzieje.
            </li>
            <li>
              <span className="font-medium text-foreground">Kilka automatyzacji lub tysiące uruchomień:</span> n8n na
              własnym serwerze. Stały koszt serwera zamiast płacenia za każdy krok. Przy kilkunastu tysiącach kredytów w
              Make miesięcznie zwykle opłaca się przejść na n8n.
            </li>
            <li>
              <span className="font-medium text-foreground">Wrażliwe dane (np. gabinet medyczny):</span> n8n lub
              Activepieces na serwerze w UE, żeby dane nie wychodziły poza Twoją infrastrukturę.
            </li>
            <li>
              <span className="font-medium text-foreground">Firma już używa Zapiera:</span> zostajemy przy nim, jeśli
              koszt jest akceptowalny. Przy większym ruchu proponuję migrację.
            </li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Ceny orientacyjne, na podstawie publicznych cenników (kurs ok. 4 zł/USD). Dostawcy je zmieniają, więc przed
            ofertą zawsze sprawdzam aktualne. Konto na platformie zakładamy na Ciebie, więc to Ty jesteś właścicielem
            automatyzacji.
          </p>
        </div>
      </div>
    </section>
  );
}
