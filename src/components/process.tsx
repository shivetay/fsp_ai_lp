import { process } from "@/content/site";
import { Section, SectionHeading } from "./ui";

export function Process() {
  return (
    <Section id="proces" className="bg-muted/40">
      <SectionHeading eyebrow="Proces" title="Jak wygląda współpraca" lead="Prosto, przejrzyście i bez niespodzianek w fakturze." />
      <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {process.map((p) => (
          <li key={p.step} className="bg-background p-6">
            <span className="font-mono text-sm text-muted-foreground">{p.step}</span>
            <h3 className="mt-3 font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
