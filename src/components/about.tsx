import { about, site, stack } from "@/content/site";
import { Badge, Card, Section, SectionHeading } from "./ui";

export function About() {
  return (
    <Section id="o-mnie">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionHeading eyebrow="O mnie" title={about.title} />
          <div className="-mt-6 space-y-4 leading-relaxed text-muted-foreground">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-6 font-medium">
            {site.name} <span className="font-normal text-muted-foreground">· {site.brand}</span>
          </p>
        </div>
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {about.aiInfo.map((i) => (
              <Card key={i.title} className="p-5">
                <h3 className="font-semibold">{i.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{i.text}</p>
              </Card>
            ))}
          </div>
          <div className="divide-y divide-border rounded-xl border border-border">
            <p className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Mój stack</p>
            {stack.map((g) => (
              <div key={g.group} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center">
                <h3 className="w-40 shrink-0 font-mono text-sm text-muted-foreground">{g.group}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((i) => (
                    <Badge key={i}>{i}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
