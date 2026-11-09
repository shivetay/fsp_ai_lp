import type { Metadata } from "next";
import Link from "next/link";
import { servicePages } from "@/content/pages";
import { CtaBlock, SubpageHero, SubpageLayout } from "@/components/subpage/layout";

export const metadata: Metadata = {
  title: { absolute: "Usługi: wdrożenia AI i automatyzacja procesów | Wrocław" },
  description: "Wdrożenie AI, automatyzacja procesów oraz wsparcie i utrzymanie dla małych firm z Wrocławia i Dolnego Śląska.",
  alternates: { canonical: "/uslugi" },
};

export default function ServicesIndex() {
  return (
    <SubpageLayout crumbs={[{ name: "Usługi", href: "/uslugi" }]}>
      <SubpageHero eyebrow="Usługi" h1="Usługi: AI i automatyzacja dla małych firm" lead="Trzy obszary, w których pomagam firmom z Wrocławia i Dolnego Śląska oszczędzać czas i pieniądze." />
      <section className="border-t border-border py-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-3">
          {servicePages.map((s) => (
            <Link key={s.slug} href={`/uslugi/${s.slug}`} className="group rounded-xl border border-border p-6 transition-colors hover:border-ring">
              <h2 className="text-xl font-semibold">{s.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <span className="mt-4 inline-block text-sm font-medium group-hover:underline">Dowiedz się więcej →</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBlock title="Nie wiesz, od czego zacząć?" text="Na bezpłatnej konsultacji wspólnie znajdziemy procesy, które dadzą największy zwrot." />
    </SubpageLayout>
  );
}
