import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: `Polityka prywatności i informacja o plikach cookies strony ${site.company.legalName}.`,
  alternates: { canonical: "/polityka-prywatnosci" },
};

const updated = "8 listopada 2026";

export default function PrivacyPage() {
  const contact = site.email ? `e-mailowo: ${site.email}` : "przez formularz kontaktowy na stronie";
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Dokument</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Polityka prywatności</h1>
        <p className="mt-2 text-sm text-muted-foreground">Ostatnia aktualizacja: {updated}</p>

        <div className="mt-10 space-y-8 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_p]:text-muted-foreground [&_ul]:space-y-1 [&_ul]:text-muted-foreground">
          <section className="space-y-3">
            <h2>1. Administrator danych</h2>
            <p>
              Administratorem Twoich danych osobowych jest {site.company.legalName}
              {site.company.lines.length ? ` (${site.company.lines.join(", ")})` : ""}. Kontakt w sprawach danych osobowych: {contact}.
            </p>
          </section>

          <section className="space-y-3">
            <h2>2. Jakie dane zbieram i po co</h2>
            <p>Przez formularz kontaktowy zbieram: imię i nazwisko, adres e-mail, opcjonalnie nazwę firmy, temat i treść wiadomości.</p>
            <ul>
              <li>odpowiedź na zapytanie i przygotowanie oferty (art. 6 ust. 1 lit. b RODO, działania przed zawarciem umowy),</li>
              <li>dalsza korespondencja i obrona przed roszczeniami (art. 6 ust. 1 lit. f RODO, prawnie uzasadniony interes),</li>
              <li>realizacja zawartej umowy i obowiązków księgowych, jeśli dojdzie do współpracy (art. 6 ust. 1 lit. b i c RODO).</li>
            </ul>
            <p>Podanie danych jest dobrowolne, ale bez nich nie mogę odpowiedzieć na wiadomość.</p>
          </section>

          <section className="space-y-3">
            <h2>3. Komu przekazuję dane</h2>
            <p>Dane trafiają wyłącznie do dostawców usług, z których korzystam przy prowadzeniu strony i korespondencji:</p>
            <ul>
              <li>Vercel Inc. (hosting strony),</li>
              <li>dostawca obsługi formularza i poczty e-mail (Resend lub Formspree),</li>
              {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                <li>Cloudflare Inc. (Turnstile, ochrona formularza przed spamem i botami),</li>
              )}
              <li>dostawca skrzynki e-mail, na którą trafiają wiadomości.</li>
            </ul>
            <p>
              Część z tych firm ma siedzibę w USA. Przekazanie danych odbywa się na podstawie decyzji Komisji Europejskiej
              (EU-US Data Privacy Framework) lub standardowych klauzul umownych.
            </p>
          </section>

          <section className="space-y-3">
            <h2>4. Jak długo przechowuję dane</h2>
            <p>
              Dane z zapytań przechowuję do 12 miesięcy od ostatniego kontaktu, chyba że dojdzie do współpracy. Wtedy
              przez czas trwania umowy i okres wymagany przepisami podatkowymi.
            </p>
          </section>

          <section className="space-y-3">
            <h2>5. Twoje prawa</h2>
            <p>Masz prawo do:</p>
            <ul>
              <li>dostępu do swoich danych i otrzymania ich kopii,</li>
              <li>sprostowania, usunięcia lub ograniczenia przetwarzania,</li>
              <li>sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie,</li>
              <li>przenoszenia danych,</li>
              <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2>6. Pliki cookies i analityka</h2>
            <p>
              Strona nie używa cookies reklamowych ani śledzących. Do statystyk odwiedzin używam Vercel Web Analytics,
              które działa bez plików cookies i nie identyfikuje pojedynczych osób. Zbiera tylko zanonimizowane dane:
              odwiedzane podstrony, kraj, typ urządzenia i przeglądarki.
            </p>
            <p>
              W pamięci przeglądarki (localStorage) zapisuję tylko wybrany motyw strony (jasny lub ciemny). To ustawienie
              nie opuszcza Twojego urządzenia i możesz je usunąć, czyszcząc dane strony w przeglądarce.
            </p>
            <p>Dlatego strona nie wyświetla banera zgody na cookies.</p>
          </section>

          <section className="space-y-3">
            <h2>7. Zmiany polityki</h2>
            <p>Jeśli zmienię sposób przetwarzania danych, zaktualizuję ten dokument i datę na górze strony.</p>
          </section>
        </div>

        <a href="/" className="mt-12 inline-block text-sm font-medium underline underline-offset-4">← Wróć na stronę główną</a>
      </main>
      <Footer />
    </>
  );
}
