import type { ReactNode } from "react";

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`border-t border-border py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-lg text-muted-foreground">{lead}</p>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-card p-6 transition-colors hover:border-ring ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium">
      {children}
    </span>
  );
}

const btnBase =
  "inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50";

export const buttonClass = {
  primary: `${btnBase} bg-primary text-primary-foreground hover:opacity-90`,
  outline: `${btnBase} border border-border hover:bg-muted`,
};
