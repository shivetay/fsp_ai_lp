// Cała treść strony w jednym miejscu. Edytuj tutaj, komponenty tylko ją renderują.

export const site = {
  brand: "FSP",
  name: "Łukasz Dawidowicz",
  role: "AI & Automation Engineer · Frontend Developer",
  tagline:
    "Automatyzuję powtarzalną pracę i wdrażam rozwiązania AI, które realnie oszczędzają czas Twojego zespołu.",
  email: "kontakt@fsplukaszdawidowicz.pl",
  linkedin: "https://www.linkedin.com/in/%C5%82ukasz-dawidowicz-698a59b6/",
  github: "https://github.com/shivetay",
  // Dane firmy do stopki: uzupełnij prawdziwymi wartościami.
  company: {
    legalName: "FSP Łukasz Dawidowicz",
    lines: ["NIP: 0000000000", "REGON: 000000000"],
  },
};

export const nav = [
  { href: "#uslugi", label: "Usługi" },
  { href: "#proces", label: "Proces" },
  { href: "#realizacje", label: "Realizacje" },
  { href: "#demo", label: "Demo" },
  { href: "#stack", label: "Stack" },
  { href: "#faq", label: "FAQ" },
];

export const stats = [
  { value: "5+", label: "lat w komercyjnych projektach" },
  { value: "AI", label: "LLM, RAG, agenci" },
  { value: "24/7", label: "automaty, które nie śpią" },
];

export const services = [
  {
    title: "Automatyzacja procesów",
    description:
      "Łączę Twoje narzędzia (CRM, maile, arkusze, faktury) w przepływy n8n / Make / Zapier albo w dedykowany kod. Koniec z kopiuj-wklej.",
    points: ["n8n, Make, Zapier", "Integracje API i webhooki", "Raporty generowane automatycznie"],
  },
  {
    title: "Chatboty i asystenci AI",
    description:
      "Asystent, który zna Twoją ofertę, dokumentację i FAQ. Na stronie, w Slacku, na Discordzie albo w panelu klienta.",
    points: ["RAG na Twoich dokumentach", "Obsługa klienta i lead generation", "Integracja z Claude / OpenAI"],
  },
  {
    title: "Agenci AI i przetwarzanie dokumentów",
    description:
      "Wyciąganie danych z PDF-ów, maili i formularzy, klasyfikacja zgłoszeń, przygotowanie odpowiedzi do akceptacji.",
    points: ["Ekstrakcja danych z dokumentów", "Klasyfikacja i routing zgłoszeń", "Człowiek zatwierdza, AI robi resztę"],
  },
  {
    title: "Aplikacje i MVP z AI",
    description:
      "Frontend to moja baza. Buduję szybkie, dopracowane aplikacje webowe z funkcjami AI, od prototypu po produkcję.",
    points: ["React, Next.js, TypeScript", "Panele, dashboardy, SaaS", "Testy E2E i jakość od pierwszego dnia"],
  },
  {
    title: "Audyt i konsultacje AI",
    description:
      "Sprawdzam, które procesy w firmie warto zautomatyzować i ile to da. Dostajesz konkretną listę kroków z wyceną.",
    points: ["Mapa procesów i quick wins", "Szacunek oszczędności czasu", "Dobór narzędzi i kosztów"],
  },
  {
    title: "Utrzymanie i rozwój",
    description:
      "Automaty wymagają opieki: monitoring, poprawki po zmianach w API, nowe scenariusze. Biorę to na siebie.",
    points: ["Monitoring i alerty", "Abonament godzinowy", "Dokumentacja dla zespołu"],
  },
];

export const process = [
  { step: "01", title: "Rozmowa", text: "30 minut online. Opowiadasz, co zabiera Ci najwięcej czasu." },
  { step: "02", title: "Analiza i wycena", text: "Mapuję proces, proponuję rozwiązanie i podaję stałą cenę oraz termin." },
  { step: "03", title: "Prototyp", text: "W kilka dni dostajesz działające demo na swoich danych." },
  { step: "04", title: "Wdrożenie", text: "Podpinam rozwiązanie pod Twoje narzędzia, testuję i szkolę zespół." },
  { step: "05", title: "Opieka", text: "Monitoruję działanie i rozwijam automaty, gdy firma rośnie." },
];

// Przykładowe realizacje: podmień na prawdziwe case studies.
export const caseStudies = [
  {
    tag: "Automatyzacja",
    title: "Obsługa zapytań ofertowych",
    problem: "Handlowcy ręcznie przepisywali zapytania z maili do CRM.",
    solution: "AI czyta maila, wyciąga dane, zakłada leada w CRM i proponuje odpowiedź.",
    result: "−12 h pracy tygodniowo",
  },
  {
    tag: "Asystent AI",
    title: "Asystent wiedzy dla zespołu",
    problem: "Nowi pracownicy w kółko pytali o te same procedury.",
    solution: "Chatbot RAG na dokumentacji firmy, dostępny w komunikatorze zespołu.",
    result: "−60% pytań do seniorów",
  },
  {
    tag: "Aplikacja",
    title: "Platforma do współpracy freelancerów",
    problem: "Projekty, pliki i feedback rozproszone w wielu narzędziach.",
    solution: "Własna aplikacja webowa (Next.js) z tablicami projektów i komentarzami.",
    result: "Jedno miejsce zamiast pięciu narzędzi",
  },
];

// Dotychczasowe elementy strony: stack technologiczny.
export const stack = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Zustand"] },
  { group: "Backend", items: ["Node.js", "Express"] },
  { group: "Testing", items: ["Jest", "Playwright", "Cypress"] },
  { group: "Database", items: ["MongoDB", "PostgreSQL"] },
  { group: "AI & Automation", items: ["Claude", "OpenAI", "RAG", "n8n", "Make"] },
];

export const faq = [
  {
    q: "Ile kosztuje automatyzacja?",
    a: "Proste przepływy zaczynają się od kilkuset złotych, większe wdrożenia AI wyceniam po analizie. Zawsze dostajesz stałą cenę przed startem.",
  },
  {
    q: "Ile trwa wdrożenie?",
    a: "Prototyp zwykle w 3 do 7 dni roboczych, pełne wdrożenie w 2 do 4 tygodnie, zależnie od liczby integracji.",
  },
  {
    q: "Czy moje dane są bezpieczne?",
    a: "Tak. Pracuję na kontach i kluczach API należących do Ciebie, podpisuję NDA i dobieram modele zgodne z RODO. Dane wrażliwe mogą zostać na Twojej infrastrukturze.",
  },
  {
    q: "Nie wiem, co mogę zautomatyzować. Czy to problem?",
    a: "Nie. Od tego jest bezpłatna rozmowa i audyt. Wspólnie znajdziemy procesy, które dadzą największy zwrot.",
  },
  {
    q: "Co jeśli coś przestanie działać?",
    a: "Oferuję opiekę powdrożeniową z monitoringiem. Gdy zewnętrzne API się zmieni, poprawiam automat, zanim zauważy to Twój zespół.",
  },
];
