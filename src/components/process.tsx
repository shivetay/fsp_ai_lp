import { workSteps } from "@/content/site";
import { Section, SectionHeading } from "./ui";

export function Process() {
  return (
    <Section id="jak-pracuje" className="bg-muted/40">
      <SectionHeading
        eyebrow="Jak pracuję"
        title="Współpraca krok po kroku"
        lead="Bez długich umów na start i bez niespodzianek w fakturze. Najpierw efekt, potem kolejne kroki."
      />
      <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {workSteps.map((p) => (
          <li key={p.step} className="bg-background p-6">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-sm text-muted-foreground">{p.step}</span>
              {"free" in p && p.free && (
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  Bezpłatnie
                </span>
              )}
            </div>
            <h3 className="mt-3 font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
