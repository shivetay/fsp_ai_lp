import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industryPages, servicePages } from "@/content/pages";
import { workSteps } from "@/content/site";
import { Card } from "@/components/ui";
import { PlatformComparison } from "@/components/platform-comparison";
import { CtaBlock, SubpageFaq, SubpageHero, SubpageLayout, faqLd } from "@/components/subpage/layout";
import { serviceLd } from "@/lib/business";
import { siteUrl } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePages.find((p) => p.slug === slug);
  if (!page) return {};
  const url = `/uslugi/${page.slug}`;
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    openGraph: { title: page.title, description: page.description, url, type: "website", locale: "pl_PL" },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const page = servicePages.find((p) => p.slug === slug);
  if (!page) notFound();
  const others = servicePages.filter((p) => p.slug !== page.slug);
  const url = `${siteUrl}/uslugi/${page.slug}`;

  return (
    <SubpageLayout
      crumbs={[{ name: "Usługi", href: "/uslugi" }, { name: page.name, href: `/uslugi/${page.slug}` }]}
      jsonLd={[serviceLd(page.name, page.description, url, "Małe firmy"), faqLd(page.faq)]}
    >
      <SubpageHero eyebrow="Usługa" h1={page.h1} lead={page.intro} />

      <section className="border-t border-border bg-muted/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight">Co obejmuje usługa</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.includes.map((i) => (
              <Card key={i.title} className="bg-background">
                <h3 className="font-semibold">{i.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Przykłady z małych firm</h2>
            <ul className="mt-6 space-y-3">
              {page.examples.map((e) => (
                <li key={e} className="flex gap-3"><span className="text-muted-foreground">→</span>{e}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Dla kogo</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">{page.forWho}</p>
            <p className="mt-6 text-sm font-medium">Zobacz rozwiązania dla branż:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {industryPages.map((i) => (
                <Link key={i.slug} href={`/branze/${i.slug}`}
                  className="rounded-md border border-border px-2.5 py-1 text-xs hover:bg-muted">{i.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight">Jak wygląda współpraca</h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {workSteps.map((s) => (
              <li key={s.step} className="bg-background p-5">
                <span className="font-mono text-sm text-muted-foreground">{s.step}</span>
                <h3 className="mt-2 font-semibold">{s.title}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {page.slug === "automatyzacja-procesow" && <PlatformComparison />}

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-8 text-3xl font-semibold tracking-tight">Pytania o {page.name.toLowerCase()}</h2>
          <SubpageFaq items={page.faq} />
          <p className="mt-10 text-sm text-muted-foreground">
            Inne usługi:{" "}
            {others.map((o, i) => (
              <span key={o.slug}>
                {i > 0 && " · "}
                <Link href={`/uslugi/${o.slug}`} className="font-medium text-foreground underline underline-offset-4">{o.name}</Link>
              </span>
            ))}
          </p>
        </div>
      </section>

      <CtaBlock title="Porozmawiajmy o Twojej firmie" text="Pierwsza rozmowa jest bezpłatna. Powiesz, co zabiera Ci najwięcej czasu, a ja wskażę, gdzie AI i automatyzacja dadzą najszybszy efekt." />
    </SubpageLayout>
  );
}
