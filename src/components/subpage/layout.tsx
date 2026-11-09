import type { ReactNode } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { buttonClass } from "@/components/ui";
import { siteUrl } from "@/lib/seo";

export type Crumb = { name: string; href: string };

export function SubpageLayout({ crumbs, children, jsonLd }: { crumbs: Crumb[]; children: ReactNode; jsonLd?: object[] }) {
  const all = [{ name: "Strona główna", href: "/" }, ...crumbs];
  const breadcrumbLd = {
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${siteUrl}${c.href}` })),
  };
  const graph = [breadcrumbLd, ...(jsonLd ?? [])];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main>
        <nav aria-label="Okruszki" className="mx-auto max-w-6xl px-4 pt-8 text-sm text-muted-foreground sm:px-6">
          <ol className="flex flex-wrap items-center gap-1.5">
            {all.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden>/</span>}
                {i === all.length - 1 ? (
                  <span aria-current="page" className="text-foreground">{c.name}</span>
                ) : (
                  <Link href={c.href} className="hover:text-foreground">{c.name}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {children}
      </main>
      <Footer />
    </>
  );
}

export function SubpageHero({ eyebrow, h1, lead }: { eyebrow: string; h1: string; lead: string | string[] }) {
  const paras = Array.isArray(lead) ? lead : [lead];
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{h1}</h1>
      <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
        {paras.map((p) => <p key={p}>{p}</p>)}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/#kontakt" className={buttonClass.primary}>Umów bezpłatną konsultację</Link>
        <Link href="/#roi" className={buttonClass.outline}>Policz ROI</Link>
      </div>
    </section>
  );
}

export function SubpageFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="max-w-3xl divide-y divide-border rounded-xl border border-border bg-background">
      {items.map((f) => (
        <details key={f.q} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
            {f.q}
            <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export const faqLd = (items: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export function CtaBlock({ title, text }: { title: string; text: string }) {
  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-xl bg-primary p-8 text-primary-foreground sm:p-12">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          <p className="mt-3 max-w-2xl opacity-80">{text}</p>
          <Link
            href="/#kontakt"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-primary-foreground px-5 text-sm font-medium text-primary hover:opacity-90"
          >
            Umów bezpłatną konsultację
          </Link>
        </div>
      </div>
    </section>
  );
}
