import { stack } from "@/content/site";
import { Badge, Section, SectionHeading } from "./ui";

export function Stack() {
  return (
    <Section id="stack">
      <SectionHeading eyebrow="Stack" title="Technologie, z którymi pracuję" />
      <div className="divide-y divide-border rounded-xl border border-border">
        {stack.map((g) => (
          <div key={g.group} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
            <h3 className="w-44 shrink-0 font-mono text-sm text-muted-foreground">{g.group}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((i) => (
                <Badge key={i}>{i}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
