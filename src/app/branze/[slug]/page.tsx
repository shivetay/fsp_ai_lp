import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industryPages, servicePages } from "@/content/pages";
import { Card } from "@/components/ui";
import { CtaBlock, SubpageFaq, SubpageHero, SubpageLayout, faqLd } from "@/components/subpage/layout";
import { serviceLd } from "@/lib/business";
import { siteUrl } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return industryPages.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = industryPages.find((p) => p.slug === slug);
  if (!page) return {};
  const url = `/branze/${page.slug}`;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    openGraph: { title: page.title, description: page.description, url, type: "website", locale: "pl_PL" },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const page = industryPages.find((p) => p.slug === slug);
  if (!page) notFound();
  const others = industryPages.filter((p) => p.slug !== page.slug);
  const url = `${siteUrl}/branze/${page.slug}`;
  const saved = Math.round(page.scenario.hours * 0.6);

  return (
    <SubpageLayout
      crumbs={[{ name: "Branże", href: "/branze" }, { name: page.name, href: `/branze/${page.slug}` }]}
      jsonLd={[serviceLd(`Automatyzacja i AI: ${page.name}`, page.description, url, page.name), faqLd(page.faq)]}
    >
      <SubpageHero eyebrow={page.name} h1={page.h1} lead={page.intro} />

      <section className="border-t border-border bg-muted/40 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Znasz to?</h2>
            <ul className="mt-6 space-y-3">
              {page.problems.map((p) => (
                <li key={p} className="flex gap-3"><span className="text-muted-foreground">✕</span>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Co mogę zautomatyzować</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {page.automations.map((a) => (
                <Card key={a.title} className="bg-background p-5">
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 rounded-xl border border-border p-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Przykładowe wyliczenie</p>
              <p className="mt-3 text-lg leading-relaxed">{page.scenario.text}</p>
              <p className="mt-2 text-muted-foreground">
                To ok. {page.scenario.hours} godzin miesięcznie. Przy automatyzacji 60% tej pracy odzyskujesz ok. {saved} godzin co miesiąc.
              </p>
            </div>
            <div className="rounded-xl bg-primary p-6 text-primary-foreground">
              <p className="text-sm opacity-70">Odzyskany czas</p>
              <p className="mt-1 text-4xl font-semibold">~{saved} h / mies.</p>
              <Link href="/#roi" className="mt-3 inline-block text-sm underline underline-offset-4 opacity-80 hover:opacity-100">
                Policz dla swojej firmy →
              </Link>
              <Link href={`/realizacje?scenariusz=${page.slug}#kreator`} className="mt-1 block text-sm underline underline-offset-4 opacity-80 hover:opacity-100">
                Zobacz przykładowy schemat →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-8 text-3xl font-semibold tracking-tight">Najczęstsze pytania</h2>
          <SubpageFaq items={page.faq} />
          <div className="mt-10 grid gap-6 text-sm sm:grid-cols-2">
            <div>
              <p className="font-medium">Usługi</p>
              <ul className="mt-2 space-y-1">
                {servicePages.map((s) => (
                  <li key={s.slug}><Link href={`/uslugi/${s.slug}`} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">{s.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium">Inne branże</p>
              <ul className="mt-2 space-y-1">
                {others.map((o) => (
                  <li key={o.slug}><Link href={`/branze/${o.slug}`} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">{o.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBlock title={`Prowadzisz firmę w branży: ${page.name.toLowerCase()}?`} text="Na bezpłatnej konsultacji sprawdzimy, które z tych automatyzacji dadzą Ci najwięcej czasu, i policzymy, ile to realnie da." />
    </SubpageLayout>
  );
}
