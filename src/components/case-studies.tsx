import { caseStudies } from "@/content/site";
import { Badge, Card, Section, SectionHeading } from "./ui";

export function CaseStudies() {
  return (
    <Section id="realizacje">
      <SectionHeading eyebrow="Realizacje" title="Przykłady wdrożeń" lead="Problem, rozwiązanie, efekt. Bez marketingowej waty." />
      <div className="grid gap-4 lg:grid-cols-3">
        {caseStudies.map((c) => (
          <Card key={c.title} className="flex flex-col">
            <Badge>{c.tag}</Badge>
            <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-medium">Problem</dt>
                <dd className="text-muted-foreground">{c.problem}</dd>
              </div>
              <div>
                <dt className="font-medium">Rozwiązanie</dt>
                <dd className="text-muted-foreground">{c.solution}</dd>
              </div>
            </dl>
            <p className="mt-auto border-t border-border pt-4 font-mono text-sm font-semibold">{c.result}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
