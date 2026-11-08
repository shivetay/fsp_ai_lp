import { nav, site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";
import { buttonClass } from "./ui";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-semibold" aria-label="Strona główna">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary font-mono text-xs text-primary-foreground">
            {site.brand}
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#kontakt" className={`${buttonClass.primary} h-9 px-4`}>
            Kontakt
          </a>
        </div>
      </div>
    </header>
  );
}
