// Katalog bloków i gotowe scenariusze kreatora automatyzacji (/realizacje).

export type BlockKind = "trigger" | "ai" | "action";

export type Block = {
  id: string;
  kind: BlockKind;
  label: string;
  desc: string;
  log: string; // co blok robi w symulacji
  minutes: number; // ile minut ręcznej pracy oszczędza przy jednym uruchomieniu
};

export const kindMeta: Record<BlockKind, { label: string; dot: string }> = {
  trigger: { label: "Wyzwalacz", dot: "bg-sky-500" },
  ai: { label: "AI", dot: "bg-violet-500" },
  action: { label: "Akcja", dot: "bg-emerald-500" },
};

export const blocks: Block[] = [
  // Wyzwalacze
  { id: "form", kind: "trigger", label: "Formularz na stronie", desc: "Nowe zgłoszenie z formularza WWW", log: "Nowe zgłoszenie z formularza: Anna Kowalska, anna@przyklad.pl", minutes: 0 },
  { id: "email", kind: "trigger", label: "Nowy e-mail", desc: "Wiadomość w skrzynce firmowej", log: "Nowy e-mail w skrzynce kontakt@: „Zapytanie o termin”", minutes: 0 },
  { id: "messenger", kind: "trigger", label: "Messenger / Instagram", desc: "Wiadomość z social mediów", log: "Nowa wiadomość na Messengerze od klientki", minutes: 0 },
  { id: "booking", kind: "trigger", label: "Rezerwacja online", desc: "Nowa wizyta w systemie rezerwacji", log: "Nowa rezerwacja: czwartek 14:00", minutes: 0 },
  { id: "order", kind: "trigger", label: "Zamówienie w sklepie", desc: "Nowe zamówienie (WooCommerce, Shopify…)", log: "Nowe zamówienie #1024 na 349 zł", minutes: 0 },
  { id: "invoice", kind: "trigger", label: "Faktura PDF", desc: "Dokument w mailu lub folderze", log: "Wpłynęła faktura kosztowa FV/11/2026 (PDF)", minutes: 0 },
  { id: "schedule", kind: "trigger", label: "Harmonogram", desc: "Codziennie, co tydzień, przed terminem", log: "Uruchomienie zaplanowane: poniedziałek 8:00", minutes: 0 },

  // AI
  { id: "extract", kind: "ai", label: "AI: wyciągnij dane", desc: "Imię, kontakt, kwoty, daty z treści", log: "AI wyciągnęło dane: imię, e-mail, telefon, temat, termin", minutes: 4 },
  { id: "classify", kind: "ai", label: "AI: klasyfikuj i nadaj priorytet", desc: "Kategoria, pilność, wartość", log: "AI: kategoria „Nowy klient”, priorytet wysoki", minutes: 2 },
  { id: "reply", kind: "ai", label: "AI: szkic odpowiedzi", desc: "Odpowiedź w Twoim stylu do akceptacji", log: "AI przygotowało szkic odpowiedzi do akceptacji", minutes: 6 },
  { id: "quote", kind: "ai", label: "AI: wstępna wycena", desc: "Widełki cenowe według cennika", log: "AI wyliczyło wycenę: 4 800–5 600 zł", minutes: 15 },
  { id: "summary", kind: "ai", label: "AI: podsumowanie", desc: "Krótki raport z danych", log: "AI podsumowało tydzień: 38 rezerwacji, +12% r/r", minutes: 20 },
  { id: "content", kind: "ai", label: "AI: opis / treść", desc: "Opis oferty, produktu lub posta", log: "AI napisało opis gotowy do publikacji", minutes: 15 },

  // Akcje
  { id: "dedupe", kind: "action", label: "Sprawdź duplikaty", desc: "Czy klient już jest w bazie", log: "Brak duplikatu, nowy kontakt", minutes: 1 },
  { id: "crm", kind: "action", label: "Zapis w CRM", desc: "Kontakt i szansa sprzedaży", log: "Utworzono kontakt i szansę sprzedaży w CRM", minutes: 3 },
  { id: "sheet", kind: "action", label: "Arkusz Google / Excel", desc: "Nowy wiersz z danymi", log: "Dodano wiersz do arkusza", minutes: 2 },
  { id: "notify", kind: "action", label: "Powiadomienie", desc: "SMS, e-mail lub Telegram do Ciebie", log: "Wysłano powiadomienie do właściciela", minutes: 1 },
  { id: "sms", kind: "action", label: "SMS / e-mail do klienta", desc: "Potwierdzenie lub przypomnienie", log: "Wysłano klientowi potwierdzenie z przypomnieniem", minutes: 3 },
  { id: "calendar", kind: "action", label: "Wpis w kalendarzu", desc: "Termin w Google / Outlook", log: "Dodano termin do kalendarza", minutes: 2 },
  { id: "billing", kind: "action", label: "Faktura / księgowość", desc: "Wystawienie lub zaksięgowanie", log: "Utworzono fakturę w systemie księgowym", minutes: 5 },
  { id: "review", kind: "action", label: "Prośba o opinię Google", desc: "Po zakończonej usłudze", log: "Zaplanowano prośbę o opinię Google na jutro", minutes: 2 },
  { id: "followup", kind: "action", label: "Follow-up", desc: "Przypomnienie, gdy brak odpowiedzi", log: "Ustawiono follow-up za 3 dni, jeśli brak odpowiedzi", minutes: 3 },
  { id: "report", kind: "action", label: "Raport na e-mail", desc: "Wysyłka podsumowania", log: "Raport wysłany na e-mail właściciela", minutes: 5 },
];

export type Preset = {
  id: string;
  name: string;
  industrySlug?: string;
  description: string;
  runsPerMonth: number;
  chain: string[];
};

export const presets: Preset[] = [
  {
    id: "leady",
    name: "Zbieranie leadów do CRM",
    description: "Zapytania z formularza, maila i social mediów trafiają do jednej listy w CRM, z priorytetem, powiadomieniem i follow-upem.",
    runsPerMonth: 80,
    chain: ["form", "extract", "dedupe", "classify", "crm", "notify", "reply", "followup"],
  },
  {
    id: "gabinety",
    name: "Gabinet: rezerwacje i przypomnienia",
    industrySlug: "gabinety",
    description: "Nowa wizyta dostaje potwierdzenie i przypomnienie, a po wizycie pacjent dostaje prośbę o opinię.",
    runsPerMonth: 200,
    chain: ["booking", "calendar", "sms", "review"],
  },
  {
    id: "salony-beauty",
    name: "Salon: wiadomości i zapisy",
    industrySlug: "salony-beauty",
    description: "AI odpowiada na wiadomości z Instagrama, podsyła link do rezerwacji i dopisuje klientkę do bazy.",
    runsPerMonth: 150,
    chain: ["messenger", "classify", "reply", "sheet", "notify"],
  },
  {
    id: "restauracje",
    name: "Restauracja: zamówienia i rezerwacje",
    industrySlug: "restauracje",
    description: "Zapytania o stolik i catering z maila trafiają na jedną listę, a klient dostaje potwierdzenie.",
    runsPerMonth: 180,
    chain: ["email", "extract", "calendar", "sms", "notify"],
  },
  {
    id: "biura-rachunkowe",
    name: "Biuro rachunkowe: odczyt faktur",
    industrySlug: "biura-rachunkowe",
    description: "AI odczytuje fakturę z maila, zapisuje dane do arkusza i przygotowuje do zaksięgowania.",
    runsPerMonth: 400,
    chain: ["invoice", "extract", "classify", "sheet", "billing"],
  },
  {
    id: "nieruchomosci",
    name: "Nieruchomości: zapytania z portali",
    industrySlug: "nieruchomosci",
    description: "Zapytania z portali trafiają do CRM, a AI przygotowuje odpowiedź z propozycją terminu prezentacji.",
    runsPerMonth: 120,
    chain: ["email", "extract", "dedupe", "crm", "reply", "calendar", "followup"],
  },
  {
    id: "warsztaty",
    name: "Warsztat: zlecenia i statusy",
    industrySlug: "warsztaty",
    description: "Zgłoszenie naprawy z formularza trafia na listę zleceń, a klient dostaje SMS o statusie.",
    runsPerMonth: 100,
    chain: ["form", "extract", "sheet", "sms", "notify"],
  },
  {
    id: "firmy-budowlane",
    name: "Firma remontowa: szybka wycena",
    industrySlug: "firmy-budowlane",
    description: "Klient wypełnia formularz, AI liczy widełki według cennika i przygotowuje odpowiedź.",
    runsPerMonth: 40,
    chain: ["form", "extract", "quote", "reply", "crm", "followup"],
  },
  {
    id: "sklepy",
    name: "Sklep: zamówienia i faktury",
    industrySlug: "sklepy",
    description: "Nowe zamówienie tworzy fakturę, wpis w arkuszu i potwierdzenie dla klienta.",
    runsPerMonth: 300,
    chain: ["order", "billing", "sheet", "sms"],
  },
  {
    id: "szkoly-i-kursy",
    name: "Szkoła: zapisy i płatności",
    industrySlug: "szkoly-i-kursy",
    description: "Zapis z formularza trafia do listy grupy, kursant dostaje potwierdzenie, a raty są pilnowane automatycznie.",
    runsPerMonth: 60,
    chain: ["form", "extract", "sheet", "sms", "billing", "followup"],
  },
  {
    id: "raport",
    name: "Raport tygodniowy dla właściciela",
    description: "W każdy poniedziałek AI podsumowuje sprzedaż i rezerwacje i wysyła raport na maila.",
    runsPerMonth: 4,
    chain: ["schedule", "summary", "report"],
  },
];
