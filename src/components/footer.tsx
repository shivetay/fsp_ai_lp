import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <div>
          <p className="font-medium text-foreground">{site.company.legalName}</p>
          {site.company.lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          {site.email && <a href={`mailto:${site.email}`} className="hover:text-foreground">{site.email}</a>}
          {site.phone && <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-foreground">{site.phone}</a>}
          <div className="flex gap-4">
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">LinkedIn</a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a>
          </div>
          <div className="flex gap-4">
            <a href="/uslugi" className="hover:text-foreground">Usługi</a>
            <a href="/branze" className="hover:text-foreground">Branże</a>
            <a href="/polityka-prywatnosci" className="hover:text-foreground">Polityka prywatności</a>
          </div>
          <p>© {new Date().getFullYear()} {site.company.legalName}</p>
        </div>
      </div>
    </footer>
  );
}
