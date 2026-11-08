import { heroPoints, site } from "@/content/site";
import { buttonClass } from "./ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 sm:pt-32">
        <div className="fade-up max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {site.brand} {site.name}
          </span>
          <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-6xl">
            AI i automatyzacje dla małych, lokalnych firm
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{site.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#kontakt" className={buttonClass.primary}>
              Umów bezpłatną rozmowę
            </a>
            <a href="#roi" className={buttonClass.outline}>
              Policz, ile zaoszczędzisz
            </a>
          </div>
        </div>
        <ul className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-8 text-sm">
          {heroPoints.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">✓</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
