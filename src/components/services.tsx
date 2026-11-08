import { services } from "@/content/site";
import { Card, Section, SectionHeading } from "./ui";

export function Services() {
  return (
    <Section id="uslugi">
      <SectionHeading
        eyebrow="Usługi"
        title="Co mogę dla Ciebie zrobić"
        lead="Od pojedynczego automatu po pełną aplikację z AI. Zawsze z naciskiem na mierzalny efekt."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Card key={s.title}>
            <p className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {s.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-muted-foreground">→</span>
                  {p}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
