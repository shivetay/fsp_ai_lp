import type { Metadata } from "next";
import Link from "next/link";
import { industryPages } from "@/content/pages";
import { CtaBlock, SubpageHero, SubpageLayout } from "@/components/subpage/layout";

export const metadata: Metadata = {
  title: { absolute: "Automatyzacja i AI dla branż | Wrocław, Dolny Śląsk" },
  description: "Rozwiązania AI i automatyzacje dla gabinetów, salonów, restauracji, biur rachunkowych, warsztatów, sklepów i innych małych firm z Wrocławia.",
  alternates: { canonical: "/branze" },
};

export default function IndustriesIndex() {
  return (
    <SubpageLayout crumbs={[{ name: "Branże", href: "/branze" }]}>
      <SubpageHero eyebrow="Branże" h1="AI i automatyzacja dla lokalnych firm" lead="Zobacz, co konkretnie mogę zautomatyzować w Twojej branży. Procesy w małych firmach są podobne, więc jeśli nie widzisz swojej, napisz." />
      <section className="border-t border-border py-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {industryPages.map((i) => (
            <Link key={i.slug} href={`/branze/${i.slug}`} className="group rounded-xl border border-border p-6 transition-colors hover:border-ring">
              <h2 className="text-lg font-semibold">{i.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{i.intro}</p>
              <span className="mt-4 inline-block text-sm font-medium group-hover:underline">Zobacz rozwiązania →</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBlock title="Twojej branży nie ma na liście?" text="Napisz, czym zajmuje się Twoja firma. Sprawdzimy razem, co da się usprawnić." />
    </SubpageLayout>
  );
}
