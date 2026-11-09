// Cała treść strony w jednym miejscu. Edytuj tutaj, komponenty tylko ją renderują.

export const site = {
  brand: "FSP",
  name: "Łukasz Dawidowicz",
  role: "Wdrożenia AI i automatyzacja procesów dla małych firm",
  tagline:
    "Pomagam lokalnym firmom z Wrocławia i Dolnego Śląska wejść w świat AI bez ryzyka i bez żargonu. Automatyzuję powtarzalną pracę, żeby Ty i Twój zespół mieli czas na klientów.",
  // Dane kontaktowe: puste pole = element się nie wyświetla.
  email: "kontakt@fsplukaszdawidowicz.pl",
  phone: "", // np. "+48 600 000 000"
  location: "Wrocław i Dolny Śląsk, zdalnie w całej Polsce",
  city: "Wrocław",
  region: "Dolny Śląsk",
  linkedin: "https://www.linkedin.com/in/%C5%82ukasz-dawidowicz-698a59b6/",
  github: "https://github.com/shivetay",
  company: {
    legalName: "FSP Łukasz Dawidowicz",
    lines: ["NIP: 6922391957", "REGON: 52477552800000"],
  },
};

export const nav = [
  { href: "#o-mnie", label: "O mnie" },
  { href: "#uslugi", label: "Usługi" },
  { href: "#procesy", label: "Procesy" },
  { href: "#branze", label: "Branże" },
  { href: "#roi", label: "Kalkulator ROI" },
  { href: "realizacje", label: "Realizacje" },
  { href: "#jak-pracuje", label: "Jak pracuję" },
  { href: "#faq", label: "FAQ" },
];

export const heroPoints = [
  "Bezpłatna rozmowa i analiza",
  "Stała cena przed startem",
  "Działające demo w kilka dni",
];

// O mnie: wstęp, że jestem developerem, plus wdrożenia AI.
export const about = {
  title: "Developer, który wdraża AI w praktyce",
  paragraphs: [
    "Jestem programistą z kilkuletnim doświadczeniem komercyjnym. Budowałem aplikacje webowe i mobilne dla dużych marek, między innymi marketplace market.orange.pl, aplikacje mobile web w AirSlate i platformy VOD na Smart TV.",
    "Od dłuższego czasu pracuję przy projektach z AI: integracje modeli językowych, asystenci oparci na dokumentach firmy, automatyczne przetwarzanie danych. Prowadzę też własny produkt, clusterboard.pl, platformę do współpracy dla freelancerów.",
    "Teraz przenoszę to doświadczenie do małych firm. Wiem, jak zbudować rozwiązanie, które działa stabilnie, a nie tylko ładnie wygląda na prezentacji. Rozmawiam prostym językiem i zaczynam od tego, co da Ci najszybszy efekt.",
  ],
  aiInfo: [
    { title: "Modele AI", text: "Claude, OpenAI i modele open source, dobrane do zadania i budżetu." },
    { title: "Twoje dane", text: "Asystenci uczeni na Twoich dokumentach, cennikach i FAQ (RAG)." },
    { title: "Integracje", text: "Poczta, kalendarz, CRM, arkusze, systemy fakturowe, Messenger, WhatsApp." },
    { title: "Bezpieczeństwo", text: "Konta i klucze należą do Ciebie, rozwiązania zgodne z RODO." },
  ],
};

export const stack = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Zustand"] },
  { group: "Backend", items: ["Node.js", "Express"] },
  { group: "Testing", items: ["Jest", "Playwright", "Cypress"] },
  { group: "Database", items: ["MongoDB", "PostgreSQL"] },
  { group: "AI i automatyzacje", items: ["Claude", "OpenAI", "RAG", "n8n", "Make", "Activepieces", "Zapier"] },
];

export const services = [
  {
    slug: "wdrozenie-ai",
    title: "Wdrożenie AI w firmie",
    lead: "Sztuczna inteligencja, która odpowiada, pisze i porządkuje za Ciebie.",
    points: [
      "Asystent AI na stronę, Messengera lub WhatsAppa, który zna Twoją ofertę",
      "Automatyczne odpowiedzi na maile i zapytania, do Twojej akceptacji",
      "Generowanie ofert, opisów produktów i postów do social mediów",
      "Wyciąganie danych z faktur, PDF-ów i zdjęć dokumentów",
      "Szkolenie zespołu z codziennej pracy z narzędziami AI",
    ],
  },
  {
    slug: "automatyzacja-procesow",
    title: "Automatyzacja procesów",
    lead: "Połączę Twoje narzędzia tak, żeby dane przepływały same.",
    points: [
      "Integracja poczty, kalendarza, CRM, arkuszy i systemu faktur",
      "Przepływy w n8n, Make, Activepieces lub Zapier albo dedykowany kod",
      "Automatyczne przypomnienia, raporty i powiadomienia",
      "Koniec z przepisywaniem danych między programami",
      "Monitoring i opieka po wdrożeniu",
    ],
  },
  {
    slug: "wsparcie-i-utrzymanie",
    title: "Wsparcie i utrzymanie",
    lead: "Automaty i AI działają stabilnie, a Ty nie musisz o nich myśleć.",
    points: [
      "Stały monitoring działania i alerty o błędach",
      "Szybkie poprawki, gdy zmieni się zewnętrzne narzędzie lub API",
      "Aktualizacje modeli AI i kontrola kosztów",
      "Optymalizacja i rozbudowa o kolejne procesy",
      "Pomoc dla zespołu i miesięczny raport oszczędności",
    ],
  },
];

// Przykładowe procesy, które automatyzuję.
export const processes = [
  { title: "Obsługa zapytań", text: "AI czyta maila lub wiadomość, kategoryzuje ją i przygotowuje odpowiedź." },
  { title: "Rezerwacje i przypomnienia", text: "Zapisy online, SMS lub mail dzień przed wizytą, mniej nieobecności." },
  { title: "Faktury i koszty", text: "Odczyt faktur kosztowych, wpis do arkusza lub systemu, wysyłka do księgowej." },
  { title: "Oferty i wyceny", text: "Wycena z formularza w kilka minut, wygenerowana według Twojego cennika." },
  { title: "Opinie klientów", text: "Automatyczna prośba o opinię Google po zakończonej usłudze." },
  { title: "Raporty", text: "Cotygodniowe podsumowanie sprzedaży, rezerwacji czy kosztów na maila." },
  { title: "Dokumenty i umowy", text: "Umowy, protokoły i potwierdzenia uzupełniane danymi klienta." },
  { title: "Wiedza w firmie", text: "Asystent, który odpowiada pracownikom na pytania o procedury i cenniki." },
  { title: "Zamówienia", text: "Zamówienia z maila lub sklepu trafiają prosto do magazynu i faktur." },
];

// Branże: lokalne małe firmy, które chcą wejść w AI.
export const industries = [
  { slug: "gabinety", name: "Gabinety i usługi medyczne", example: "rezerwacje, przypomnienia, odpowiedzi na pytania pacjentów" },
  { slug: "salony-beauty", name: "Salony beauty i fryzjerskie", example: "zapisy, przypomnienia, opinie Google, posty" },
  { slug: "restauracje", name: "Restauracje i kawiarnie", example: "rezerwacje stolików, zamówienia, menu i social media" },
  { slug: "biura-rachunkowe", name: "Biura rachunkowe", example: "odczyt faktur, zbieranie dokumentów od klientów" },
  { slug: "nieruchomosci", name: "Nieruchomości", example: "opisy ofert, obsługa zapytań, umawianie prezentacji" },
  { slug: "warsztaty", name: "Warsztaty i serwisy", example: "przyjęcia zleceń, statusy napraw, przypomnienia o przeglądach" },
  { slug: "firmy-budowlane", name: "Firmy budowlane i remontowe", example: "wyceny, harmonogramy, dokumentacja zdjęciowa" },
  { slug: "sklepy", name: "Sklepy lokalne i e-commerce", example: "opisy produktów, obsługa klienta, zamówienia" },
  { slug: "szkoly-i-kursy", name: "Szkoły i kursy", example: "zapisy, płatności, materiały i komunikacja z kursantami" },
];

// Opis pracy: jak wygląda współpraca.
export const workSteps = [
  {
    step: "01",
    title: "Bezpłatna konsultacja",
    text: "Rozmawiamy online albo spotykamy się na miejscu we Wrocławiu lub na Dolnym Śląsku. Zbieram informacje o tym, jak dziś pracujecie, i szukam miejsc, w których AI sprawdzi się najlepiej. Bez opłat i bez zobowiązań.",
    free: true,
  },
  {
    step: "02",
    title: "Analiza procesów",
    text: "Robię pełny przegląd procesów w firmie: kto, co i jak często robi ręcznie. Wskazuję, co warto zautomatyzować najpierw i ile to da, razem z wyliczeniem ROI.",
  },
  {
    step: "03",
    title: "Projekt i pokaz rozwiązania",
    text: "Projektuję automatyzację i pokazuję działający prototyp na Twoich danych. Widzisz efekt, zanim zdecydujesz o wdrożeniu. Dostajesz stałą cenę i termin.",
  },
  {
    step: "04",
    title: "Wdrożenie",
    text: "Podłączam rozwiązanie do Twoich narzędzi, testuję je w codziennej pracy i szkolę zespół. Dostajesz prostą instrukcję obsługi.",
  },
  {
    step: "05",
    title: "Wsparcie i optymalizacja",
    text: "Monitoruję działanie, poprawiam to, co wymaga dopracowania, i rozwijam automaty razem z firmą. Regularnie sprawdzamy, ile czasu realnie oszczędzacie.",
  },
];

export const faq = [
  {
    q: "Mam małą firmę. Czy AI ma dla mnie sens?",
    a: "Tak, często większy niż w dużej firmie. Przy kilku osobach każda zaoszczędzona godzina jest od razu widoczna. Zaczynamy od jednego procesu i sprawdzamy efekt w kalkulatorze ROI.",
  },
  {
    q: "Nie znam się na technologii. Czy to problem?",
    a: "Nie. Moją rolą jest przełożenie technologii na prosty efekt. Ty mówisz, co Cię męczy, ja proponuję rozwiązanie i uczę z niego korzystać.",
  },
  {
    q: "Ile to kosztuje?",
    a: "Proste automaty to koszt rzędu kilkuset złotych, większe wdrożenia AI wyceniam po analizie. Zawsze dostajesz stałą cenę przed startem. Dochodzą niewielkie miesięczne koszty platformy (Make, n8n lub Activepieces, zwykle 0–200 zł) i API modelu AI (zwykle kilka do kilkunastu złotych). Wszystkie wyliczam z góry, a kalkulator ROI pokazuje różnice między platformami.",
  },
  {
    q: "Ile trwa wdrożenie?",
    a: "Prototyp zwykle w 3 do 7 dni roboczych, pełne wdrożenie w 2 do 4 tygodnie, zależnie od liczby narzędzi do połączenia.",
  },
  {
    q: "Czy moje dane i dane klientów są bezpieczne?",
    a: "Tak. Pracuję na kontach należących do Ciebie, podpisuję NDA i umowę powierzenia danych. Dobieram narzędzia zgodne z RODO.",
  },
  {
    q: "Co jeśli coś przestanie działać?",
    a: "W ramach opieki monitoruję automaty i naprawiam problemy, zanim zauważy je Twój zespół.",
  },
];

// Domyślne wartości kalkulatora ROI.
export const roiDefaults = {
  people: 2,
  hoursPerWeek: 5,
  hourlyCost: 60,
  automationPct: 60,
  setupCost: 4000,
  runsPerMonth: 150, // ile razy miesięcznie uruchamia się automatyzacja
  steps: 5, // ile kroków ma jeden przepływ
  careCost: 150, // opieka i monitoring miesięcznie
};
