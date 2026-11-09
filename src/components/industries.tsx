import Link from "next/link";
import { industries } from "@/content/site";
import { Card, Section, SectionHeading } from "./ui";

export function Industries() {
  return (
    <Section id="branze" className="bg-muted/40">
      <SectionHeading
        eyebrow="Branże"
        title="Dla kogo pracuję"
        lead="Lokalne małe firmy z Wrocławia i Dolnego Śląska, które chcą wejść w świat AI, ale nie mają własnego działu IT. Kilka przykładów:"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((i) => (
          <Link key={i.name} href={`/branze/${i.slug}`} className="group">
            <Card className="h-full bg-background p-5">
              <h3 className="font-semibold group-hover:underline">{i.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{i.example}</p>
              <span className="mt-3 inline-block text-xs font-medium text-muted-foreground group-hover:text-foreground">Zobacz rozwiązania →</span>
            </Card>
          </Link>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Nie widzisz swojej branży? Procesy w małych firmach są do siebie podobne.{" "}
        <a href="#kontakt" className="font-medium text-foreground underline underline-offset-4">Napisz</a>, sprawdzimy to razem.
      </p>
    </Section>
  );
}
