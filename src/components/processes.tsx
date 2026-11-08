import { processes } from "@/content/site";
import { Section, SectionHeading } from "./ui";

export function Processes() {
  return (
    <Section id="procesy">
      <SectionHeading
        eyebrow="Procesy"
        title="Co mogę zautomatyzować w Twojej firmie"
        lead="Przykłady z małych firm. Jeśli coś robisz ręcznie i regularnie, najpewniej da się to usprawnić."
      />
      <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {processes.map((p) => (
          <div key={p.title} className="bg-background p-5">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
