import Link from "next/link";
import { services } from "@/content/site";
import { Section, SectionHeading, buttonClass } from "./ui";

export function Services() {
  return (
    <Section id="uslugi" className="bg-muted/40">
      <SectionHeading
        eyebrow="Usługi"
        title="W czym mogę pomóc"
        lead="Wdrażam AI tam, gdzie oszczędza czas, automatyzuję procesy tam, gdzie ktoś robi to samo po raz setny, i dbam, żeby wszystko działało także po wdrożeniu."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {services.map((s, i) => (
          <div key={s.title} className="flex flex-col rounded-xl border border-border bg-background p-8">
            <p className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-2 text-muted-foreground">{s.lead}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {s.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-0.5 text-muted-foreground">→</span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-2">
              <Link href={`/uslugi/${s.slug}`} className={buttonClass.outline}>
                Więcej o usłudze
              </Link>
              <a href="#kontakt" className={`${buttonClass.outline} border-transparent`}>
                Zapytaj o wycenę
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
