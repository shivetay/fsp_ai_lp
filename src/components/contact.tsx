import { site } from "@/content/site";
import { ContactForm } from "./contact-form";
import { Section, SectionHeading } from "./ui";

export function Contact() {
  return (
    <Section id="kontakt">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Kontakt"
            title="Porozmawiajmy o Twoim procesie"
            lead="Opisz krótko, co chcesz usprawnić. Odpowiadam w ciągu 24 godzin w dni robocze."
          />
          <ul className="space-y-3 text-sm">
            <li>
              <span className="text-muted-foreground">E-mail: </span>
              <a href={`mailto:${site.email}`} className="font-medium underline-offset-4 hover:underline">{site.email}</a>
            </li>
            <li>
              <span className="text-muted-foreground">LinkedIn: </span>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium underline-offset-4 hover:underline">
                {site.name}
              </a>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
