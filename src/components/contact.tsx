import { site } from "@/content/site";
import { ContactForm } from "./contact-form";
import { Section, SectionHeading } from "./ui";

export function Contact() {
  const items = [
    site.email && { label: "E-mail", value: site.email, href: `mailto:${site.email}` },
    site.phone && { label: "Telefon", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    site.location && { label: "Obszar działania", value: site.location },
    { label: "LinkedIn", value: site.name, href: site.linkedin, external: true },
  ].filter(Boolean) as { label: string; value: string; href?: string; external?: boolean }[];

  return (
    <Section id="kontakt">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Kontakt"
            title="Porozmawiajmy o Twojej firmie"
            lead="Opisz krótko, co zabiera Ci najwięcej czasu. Odpowiadam w ciągu 24 godzin w dni robocze. Pierwsza rozmowa jest bezpłatna."
          />
          <dl className="space-y-3 text-sm">
            {items.map((i) => (
              <div key={i.label}>
                <dt className="text-muted-foreground">{i.label}</dt>
                <dd className="font-medium">
                  {i.href ? (
                    <a href={i.href} {...(i.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="underline-offset-4 hover:underline">{i.value}</a>
                  ) : i.value}
                </dd>
              </div>
            ))}
            <div>
              <dt className="text-muted-foreground">Dane firmy</dt>
              <dd className="font-medium">{site.company.legalName}</dd>
              {site.company.lines.map((l) => <dd key={l} className="text-muted-foreground">{l}</dd>)}
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
