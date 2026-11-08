import { faq } from "@/content/site";
import { Section, SectionHeading } from "./ui";

export function Faq() {
  return (
    <Section id="faq" className="bg-muted/40">
      <SectionHeading eyebrow="FAQ" title="Najczęstsze pytania" />
      <div className="max-w-3xl divide-y divide-border rounded-xl border border-border bg-background">
        {faq.map((f) => (
          <details key={f.q} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              {f.q}
              <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
