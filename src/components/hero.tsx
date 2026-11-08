import { site, stats } from "@/content/site";
import { buttonClass } from "./ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 sm:pt-32">
        <div className="fade-up max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Przyjmuję nowe projekty
          </span>
          <p className="mt-8 font-mono text-sm text-muted-foreground">{site.brand}</p>
          <h1 className="mt-2 text-5xl font-semibold tracking-tight sm:text-7xl">{site.name}</h1>
          <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">{site.role}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{site.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#kontakt" className={buttonClass.primary}>
              Umów bezpłatną konsultację
            </a>
            <a href="#demo" className={buttonClass.outline}>
              Zobacz demo
            </a>
          </div>
        </div>
        <dl className="mt-20 grid max-w-3xl grid-cols-3 gap-6 border-t border-border pt-8">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-2xl font-semibold sm:text-3xl">{s.value}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
