import { ActiveDemo, demoMeta } from "@/demos";
import { Section, SectionHeading } from "./ui";

export function DemoSection() {
  const demoUrl = process.env.NEXT_PUBLIC_DEMO_URL;

  return (
    <Section id="demo">
      <SectionHeading eyebrow="Demo" title={demoMeta.title} lead={demoUrl ? undefined : demoMeta.description} />
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        {demoUrl ? (
          <iframe
            src={demoUrl}
            title="Demo"
            loading="lazy"
            className="h-[640px] w-full rounded-lg border border-border bg-background"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            allow="clipboard-write"
          />
        ) : (
          <ActiveDemo />
        )}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Chcesz zobaczyć więcej?{" "}
        <a href="/realizacje" className="font-medium text-foreground underline underline-offset-4">
          Zbuduj własną automatyzację z bloków
        </a>{" "}
        na przykładach z różnych branż.
      </p>
    </Section>
  );
}
