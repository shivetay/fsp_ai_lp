import type { Metadata } from "next";
import Link from "next/link";
import { WorkflowBuilder } from "@/components/workflow-builder";
import { CtaBlock, SubpageHero, SubpageLayout } from "@/components/subpage/layout";
import { Card } from "@/components/ui";
import { industryPages } from "@/content/pages";

export const metadata: Metadata = {
  title: { absolute: "Przykładowe realizacje automatyzacji i AI | Wrocław" },
  description:
    "Zbuduj własną automatyzację z bloków i zobacz, ile czasu oszczędzi. Gotowe scenariusze dla gabinetów, salonów, restauracji, biur rachunkowych, sklepów i zbierania leadów do CRM.",
  alternates: { canonical: "/realizacje" },
};

const leadSteps = [
  { title: "Odbiór", text: "Zapytania z formularza, maila, Messengera i Instagrama trafiają do jednego przepływu." },
  { title: "Ekstrakcja (AI)", text: "AI wyciąga imię, kontakt, temat, pilność, budżet i termin oraz pisze krótkie streszczenie." },
  { title: "Deduplikacja", text: "Jeśli klient już jest w bazie, nowe zapytanie dopisuje się do jego karty zamiast tworzyć duplikat." },
  { title: "Zapis w CRM", text: "Kontakt i szansa sprzedaży z kanałem, kategorią, priorytetem i linkiem do wiadomości." },
  { title: "Powiadomienie", text: "Właściciel dostaje SMS lub wiadomość z najważniejszymi danymi. Pilne leady są oznaczone." },
  { title: "Odpowiedź i follow-up", text: "AI przygotowuje szkic odpowiedzi. Brak reakcji przez 24 h uruchamia przypomnienie." },
];

const booksySteps = [
  { title: "Mail z Booksy", text: "n8n sprawdza skrzynkę salonu (IMAP) i przepuszcza tylko powiadomienia od Booksy." },
  { title: "Oczyszczenie treści", text: "Usunięcie HTML i zbędnych fragmentów, żeby AI dostało sam konkret." },
  { title: "AI: dane wizyty", text: "Claude zwraca typ zdarzenia, klienta, telefon, usługę, pracownika, datę, godzinę i cenę." },
  { title: "Arkusz Google", text: "Każde zdarzenie to nowy wiersz w zakładce Wizyty, gotowy do raportów." },
  { title: "Telegram", text: "Właściciel dostaje krótką wiadomość o nowej, odwołanej lub przełożonej wizycie." },
  { title: "Dalsze kroki (opcja)", text: "SMS po wizycie, prośba o opinię Google, zapis w CRM, raport tygodniowy." },
];

export default function RealizationsPage() {
  return (
    <SubpageLayout crumbs={[{ name: "Realizacje", href: "/realizacje" }]}>
      <SubpageHero
        eyebrow="Realizacje"
        h1="Zbuduj automatyzację z bloków"
        lead={[
          "Każda automatyzacja to łańcuch prostych kroków: coś się dzieje (wyzwalacz), AI to analizuje, a system wykonuje akcje. Poniżej możesz sam ułożyć taki łańcuch i zobaczyć, ile czasu oszczędzi.",
          "Wybierz scenariusz dla swojej branży, przeciągaj bloki, zmieniaj kolejność, dodawaj i usuwaj. Na końcu uruchom symulację.",
        ]}
      />

      <section id="kreator" className="scroll-mt-20 border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <WorkflowBuilder />
          <p className="mt-6 text-xs text-muted-foreground">
            To interaktywna symulacja. Prawdziwe wdrożenie działa w n8n, Make, Zapier lub w dedykowanym kodzie, na Twoich kontach i danych.
            Czas oszczędności to szacunek na podstawie typowych czasów ręcznej pracy.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Przykładowa realizacja</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Zbieranie leadów do CRM</h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">Problem:</strong> zapytania przychodzą z kilku miejsc naraz: formularz, e-mail, Messenger,
                Instagram, telefon. Ktoś przepisuje je ręcznie do zeszytu albo arkusza. Część ginie, odpowiedź przychodzi z opóźnieniem,
                a nie wiadomo, który kanał przynosi klientów.
              </p>
              <p>
                <strong className="text-foreground">Rozwiązanie:</strong> jeden przepływ zbiera wszystkie zapytania, AI porządkuje dane,
                a CRM (Pipedrive, HubSpot albo zwykły arkusz Google) staje się jedną listą klientów z priorytetami i przypomnieniami.
              </p>
              <p>
                <strong className="text-foreground">Efekt:</strong> szybsza pierwsza odpowiedź, zero zgubionych zapytań, mniej
                przepisywania i jasny obraz, skąd przychodzą klienci.
              </p>
              <p className="text-sm">
                Narzędzia: n8n / Make / Zapier, Claude lub OpenAI, CRM lub Google Sheets. Prototyp w 2–4 dni robocze.
              </p>
              <Link href="/realizacje?scenariusz=leady#kreator" className="inline-block text-sm font-medium text-foreground underline underline-offset-4">
                Otwórz ten scenariusz w kreatorze →
              </Link>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {leadSteps.map((s, i) => (
                <li key={s.title}>
                  <Card className="h-full bg-background p-5">
                    <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="booksy" className="scroll-mt-20 border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Przykładowa realizacja · integracja</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Booksy + n8n: wizyty w arkuszu i na Telegramie</h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">Problem:</strong> salon prowadzi kalendarz w Booksy, ale chce mieć wizyty także
                we własnym arkuszu, CRM albo dostawać szybkie powiadomienia. Booksy nie udostępnia publicznego API (tylko partnerskie),
                a w n8n i Zapier nie ma gotowej integracji.
              </p>
              <p>
                <strong className="text-foreground">Rozwiązanie:</strong> przepływ w n8n czyta maile z powiadomieniami Booksy,
                a AI (Claude) wyciąga z nich typ zdarzenia (nowa, odwołana, przełożona wizyta), klienta, telefon, usługę, pracownika,
                termin i cenę. Dane trafiają do Google Sheets, a właściciel dostaje powiadomienie na Telegramie.
              </p>
              <p>
                <strong className="text-foreground">Co dalej można podpiąć:</strong> SMS z podziękowaniem dzień po wizycie, prośbę
                o opinię Google, zapis w CRM albo raport tygodniowy z obłożenia.
              </p>
              <p className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
                Uczciwie o ograniczeniach: integracja działa w jedną stronę, czyli odczytuje zdarzenia z Booksy, ale nie tworzy
                w nim wizyt. Do dwustronnej integracji potrzebny jest program partnerski Booksy.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <Link href="/realizacje?scenariusz=booksy#kreator" className="font-medium text-foreground underline underline-offset-4">
                  Otwórz w kreatorze →
                </Link>
                <Link href="/branze/salony-beauty" className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                  Automatyzacje dla salonów beauty
                </Link>
              </div>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {booksySteps.map((s, i) => (
                <li key={s.title}>
                  <Card className="h-full p-5">
                    <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/40 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight">Scenariusze dla branż</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industryPages.map((i) => (
              <div key={i.slug} className="rounded-xl border border-border bg-background p-5">
                <h3 className="font-semibold">{i.name}</h3>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <Link href={`/realizacje?scenariusz=${i.slug}#kreator`} className="underline underline-offset-4">Schemat w kreatorze</Link>
                  <Link href={`/branze/${i.slug}`} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">Opis branży</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock title="Chcesz taką automatyzację u siebie?" text="Zbuduj schemat w kreatorze i kliknij „Zapytaj o ten scenariusz”. Jego opis trafi od razu do formularza kontaktowego." />
    </SubpageLayout>
  );
}
