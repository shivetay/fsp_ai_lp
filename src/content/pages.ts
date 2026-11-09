// Treści podstron SEO: usługi i branże. Każda strona celuje w swoją frazę z dopiskiem „Wrocław”.

export type Faq = { q: string; a: string };

export type ServicePage = {
  slug: string;
  name: string; // nazwa usługi (karta, okruszki)
  title: string; // <title>
  description: string; // meta description
  h1: string;
  intro: string[];
  includes: { title: string; text: string }[];
  examples: string[];
  forWho: string;
  faq: Faq[];
};

export type IndustryPage = {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  problems: string[];
  automations: { title: string; text: string }[];
  scenario: { text: string; hours: number };
  faq: Faq[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "wdrozenie-ai",
    name: "Wdrożenie AI w firmie",
    title: "Wdrożenie AI w firmie | Wrocław, Dolny Śląsk",
    description:
      "Wdrożenie sztucznej inteligencji w małej firmie we Wrocławiu: asystenci AI, automatyczne odpowiedzi na zapytania, odczyt dokumentów, generowanie ofert. Bezpłatna konsultacja.",
    h1: "Wdrożenie AI w małej firmie we Wrocławiu",
    intro: [
      "Sztuczna inteligencja przestała być zabawką dla korporacji. Dziś mała firma może mieć asystenta, który odpowiada klientom o każdej porze, czyta faktury i przygotowuje oferty według Twojego cennika.",
      "Wdrażam AI tak, żeby działało na Twoich danych, w narzędziach, których już używasz, i żeby zespół umiał z niego korzystać od pierwszego dnia. Bez żargonu i bez kupowania drogich licencji na zapas.",
    ],
    includes: [
      { title: "Asystent AI dla klientów", text: "Na stronie, w Messengerze lub WhatsAppie. Zna Twoją ofertę, cennik i godziny otwarcia, a trudniejsze pytania przekazuje do Ciebie." },
      { title: "Odpowiedzi na maile", text: "AI czyta zapytania, rozpoznaje temat i przygotowuje szkic odpowiedzi. Ty tylko akceptujesz albo poprawiasz." },
      { title: "Dokumenty i dane", text: "Odczyt faktur, zamówień, umów i zdjęć dokumentów. Dane trafiają tam, gdzie trzeba, bez przepisywania." },
      { title: "Oferty i treści", text: "Szkice ofert, opisów produktów i odpowiedzi na podstawie Twoich wzorów, w Twoim stylu." },
      { title: "Asystent wiedzy dla zespołu", text: "Pracownicy pytają o procedury, cenniki i instrukcje, a AI odpowiada na podstawie firmowych dokumentów." },
      { title: "Szkolenie zespołu", text: "Praktyczne warsztaty z codziennej pracy z narzędziami AI: co warto, czego unikać, jak dbać o dane." },
    ],
    examples: [
      "Gabinet odpowiada na pytania pacjentów o ceny i terminy także wieczorem.",
      "Biuro rachunkowe automatycznie odczytuje faktury kosztowe klientów.",
      "Firma remontowa przygotowuje wstępną wycenę z formularza w kilka minut.",
    ],
    forWho:
      "Dla małych firm z Wrocławia i Dolnego Śląska, które chcą zacząć korzystać z AI, ale nie mają własnego działu IT ani czasu na testowanie dziesiątek narzędzi.",
    faq: [
      { q: "Z jakich modeli AI korzystasz?", a: "Dobieram model do zadania i budżetu: Claude, OpenAI lub modele open source. Konta i klucze API zakładamy na Twoją firmę, więc masz pełną kontrolę nad kosztami i danymi." },
      { q: "Czy AI będzie odpowiadać klientom bez mojej kontroli?", a: "Tylko jeśli tego chcesz. Najczęściej zaczynamy od trybu, w którym AI przygotowuje odpowiedź, a człowiek ją zatwierdza. Gdy wszystko działa dobrze, część odpowiedzi może iść automatycznie." },
      { q: "Ile kosztuje utrzymanie AI miesięcznie?", a: "Przy ruchu małej firmy koszt API modeli to zwykle od kilku do kilkudziesięciu złotych miesięcznie. Dokładny koszt wyliczam przed wdrożeniem." },
    ],
  },
  {
    slug: "automatyzacja-procesow",
    name: "Automatyzacja procesów",
    title: "Automatyzacja procesów w firmie | Wrocław, Dolny Śląsk",
    description:
      "Automatyzacja procesów biznesowych dla małych firm we Wrocławiu: integracja poczty, kalendarza, CRM, arkuszy i faktur w n8n, Make lub Zapier. Mniej ręcznej pracy, mniej błędów.",
    h1: "Automatyzacja procesów dla małych firm we Wrocławiu",
    intro: [
      "W każdej firmie są zadania, które ktoś robi ręcznie po raz setny: przepisywanie danych z maila do arkusza, wysyłanie przypomnień, przygotowywanie raportu na koniec tygodnia.",
      "Łączę Twoje narzędzia tak, żeby dane przepływały między nimi same. Używam n8n, Make lub Zapier, a tam, gdzie gotowe narzędzia nie wystarczają, piszę dedykowany kod.",
    ],
    includes: [
      { title: "Integracje narzędzi", text: "Poczta, kalendarz, CRM, Google Sheets, Excel, systemy faktur, sklep internetowy, formularze." },
      { title: "Przypomnienia i powiadomienia", text: "SMS lub mail przed wizytą, alert o nowym zamówieniu, przypomnienie o płatności." },
      { title: "Raporty automatyczne", text: "Podsumowanie sprzedaży, rezerwacji lub kosztów przychodzi na maila co tydzień, bez ręcznego liczenia." },
      { title: "Obieg dokumentów", text: "Umowy, protokoły i potwierdzenia uzupełniane danymi klienta i wysyłane do podpisu." },
      { title: "Dedykowany kod", text: "Gdy proces jest nietypowy, buduję rozwiązanie w Node.js, które robi dokładnie to, czego potrzebujesz." },
      { title: "Dokumentacja", text: "Każdy automat jest opisany: co robi, skąd bierze dane i co zrobić, gdy coś się zmieni." },
    ],
    examples: [
      "Zamówienia z maila i sklepu trafiają do jednego arkusza i systemu faktur.",
      "Klienci salonu dostają SMS z przypomnieniem dzień przed wizytą.",
      "Właściciel dostaje w poniedziałek rano raport z poprzedniego tygodnia.",
    ],
    forWho:
      "Dla firm, w których ktoś codziennie traci godzinę lub dwie na przepisywanie danych, pilnowanie terminów i kopiowanie informacji między programami.",
    faq: [
      { q: "Jakich narzędzi używasz do automatyzacji?", a: "Najczęściej n8n (można go postawić na własnym serwerze, więc dane zostają u Ciebie), Make i Zapier. Wybór zależy od Twoich narzędzi, budżetu i wymagań dotyczących danych." },
      { q: "Czy muszę zmieniać programy, których używam?", a: "Zwykle nie. Automatyzacja łączy narzędzia, które już masz. Zmianę proponuję tylko wtedy, gdy obecne narzędzie naprawdę blokuje usprawnienie." },
      { q: "Co jeśli zmieni się mój proces?", a: "Automaty da się łatwo modyfikować. W ramach wsparcia dostosowuję je do zmian w firmie." },
    ],
  },
  {
    slug: "wsparcie-i-utrzymanie",
    name: "Wsparcie i utrzymanie",
    title: "Wsparcie i utrzymanie automatyzacji i AI | Wrocław",
    description:
      "Opieka nad automatyzacjami i rozwiązaniami AI w firmie: monitoring, poprawki po zmianach w API, optymalizacja kosztów i rozwój. Abonament dla małych firm z Wrocławia i Dolnego Śląska.",
    h1: "Wsparcie i utrzymanie automatyzacji oraz AI",
    intro: [
      "Automat, który działa dziś, jutro może przestać, bo zewnętrzne narzędzie zmieniło API, wygasł token albo zmienił się Twój proces. Dlatego wdrożenie to dopiero początek.",
      "W ramach wsparcia pilnuję, żeby Twoje automatyzacje i rozwiązania AI działały stabilnie, kosztowały tyle, ile powinny, i rosły razem z firmą.",
    ],
    includes: [
      { title: "Monitoring i alerty", text: "Wiem o błędzie, zanim zauważy go Twój zespół lub klient." },
      { title: "Szybkie poprawki", text: "Naprawiam automaty po zmianach w zewnętrznych narzędziach i API." },
      { title: "Kontrola kosztów AI", text: "Pilnuję zużycia API i dobieram tańsze modele tam, gdzie jakość na tym nie cierpi." },
      { title: "Optymalizacja", text: "Usprawniam działające automaty na podstawie tego, jak naprawdę są używane." },
      { title: "Rozwój", text: "Dokładam kolejne procesy, gdy firma rośnie albo pojawiają się nowe potrzeby." },
      { title: "Raport miesięczny", text: "Krótkie podsumowanie: co działało, co poprawiłem i ile czasu zaoszczędziliście." },
    ],
    examples: [
      "Integracja z systemem faktur przestała działać po aktualizacji. Poprawka tego samego dnia.",
      "Koszty AI spadły po zmianie modelu do prostszych zadań.",
      "Po kwartale dołożyliśmy automatyczne prośby o opinie Google.",
    ],
    forWho:
      "Dla firm, które mają już automatyzacje lub rozwiązania AI (wdrożone przeze mnie albo przez kogoś innego) i chcą mieć pewność, że wszystko działa.",
    faq: [
      { q: "Czy przejmiesz automaty zrobione przez kogoś innego?", a: "Tak. Zaczynam od przeglądu i dokumentacji tego, co już działa, a potem obejmuję to opieką." },
      { q: "Jak rozliczasz wsparcie?", a: "Najczęściej w formie miesięcznego abonamentu z pulą godzin. Przy mniejszych potrzebach możliwe jest rozliczenie godzinowe." },
      { q: "Jak szybko reagujesz na awarie?", a: "Czas reakcji ustalamy w umowie. Krytyczne problemy, np. niedziałający formularz zamówień, mają priorytet." },
    ],
  },
];

export const industryPages: IndustryPage[] = [
  {
    slug: "gabinety",
    name: "Gabinety i usługi medyczne",
    title: "Automatyzacja i AI dla gabinetów | Wrocław",
    description:
      "Automatyzacja rezerwacji, przypomnień i odpowiedzi na pytania pacjentów dla gabinetów lekarskich, stomatologicznych i fizjoterapii we Wrocławiu. Mniej nieobecności, mniej telefonów.",
    h1: "Automatyzacja i AI dla gabinetów we Wrocławiu",
    intro:
      "Recepcja w gabinecie to ciągłe telefony, przekładanie wizyt i odpowiadanie na te same pytania. Część tej pracy mogą przejąć automaty, a recepcja może zająć się pacjentami, którzy są na miejscu.",
    problems: [
      "Pacjenci nie przychodzą na wizyty i nie odwołują ich wcześniej",
      "Telefon dzwoni non stop z pytaniami o ceny i wolne terminy",
      "Wiadomości z Facebooka i maili giną albo czekają na odpowiedź kilka dni",
      "Ręczne przepisywanie danych pacjentów między systemami",
    ],
    automations: [
      { title: "Przypomnienia o wizytach", text: "SMS lub mail dzień przed wizytą z linkiem do potwierdzenia lub odwołania." },
      { title: "Asystent AI dla pacjentów", text: "Odpowiada na pytania o cennik, przygotowanie do zabiegu i godziny otwarcia. Nie udziela porad medycznych." },
      { title: "Lista oczekujących", text: "Gdy ktoś odwoła wizytę, kolejna osoba z listy dostaje propozycję terminu." },
      { title: "Prośby o opinię", text: "Po wizycie pacjent dostaje uprzejmą prośbę o opinię w Google." },
    ],
    scenario: { text: "Recepcja spędza dziennie ok. 1,5 godziny na telefonach z przypomnieniami i pytaniami o ceny.", hours: 30 },
    faq: [
      { q: "Czy to jest zgodne z RODO i tajemnicą medyczną?", a: "Tak, pod warunkiem dobrej konfiguracji. Automaty przetwarzają tylko dane potrzebne do umówienia wizyty, a asystent AI nie ma dostępu do dokumentacji medycznej." },
      { q: "Czy zadziała z moim systemem rezerwacji?", a: "Większość popularnych systemów (np. Booksy, Znany Lekarz, kalendarze Google) ma integracje lub API. Sprawdzę to na bezpłatnej konsultacji." },
    ],
  },
  {
    slug: "salony-beauty",
    name: "Salony beauty i fryzjerskie",
    title: "Automatyzacja i AI dla salonów beauty | Wrocław",
    description:
      "Automatyczne zapisy, przypomnienia SMS, prośby o opinie Google i posty do social mediów dla salonów kosmetycznych i fryzjerskich we Wrocławiu i na Dolnym Śląsku.",
    h1: "Automatyzacja i AI dla salonów beauty we Wrocławiu",
    intro:
      "W salonie liczy się czas przy kliencie. Zamiast odpisywać na wiadomości między zabiegami, możesz oddać zapisy, przypomnienia i część komunikacji automatom.",
    problems: [
      "Wiadomości na Instagramie i Facebooku czekają, bo ręce są zajęte",
      "Puste okienka po odwołanych wizytach",
      "Za mało opinii w Google mimo zadowolonych klientek",
      "Brak czasu na regularne posty w social mediach",
    ],
    automations: [
      { title: "Odpowiedzi w Messengerze i na Instagramie", text: "Asystent AI odpowiada na pytania o ceny i usługi oraz podsyła link do rezerwacji." },
      { title: "Przypomnienia i potwierdzenia", text: "SMS przed wizytą i automatyczne zwalnianie terminu przy odwołaniu." },
      { title: "Opinie Google", text: "Po wizycie klientka dostaje prośbę o opinię z bezpośrednim linkiem." },
      { title: "Szkice postów", text: "AI przygotowuje opisy do zdjęć Twoich realizacji, Ty tylko akceptujesz." },
    ],
    scenario: { text: "Właścicielka odpisuje na wiadomości i potwierdza wizyty przez ok. 1 godzinę dziennie.", hours: 20 },
    faq: [
      { q: "Czy klientki zauważą, że odpisuje AI?", a: "Asystent pisze w Twoim stylu, ale zawsze przedstawia się jako asystent salonu. Trudniejsze sprawy przekazuje do Ciebie." },
      { q: "Czy to zadziała z Booksy?", a: "Tak, można to połączyć z popularnymi systemami rezerwacji. Szczegóły sprawdzę na konsultacji." },
    ],
  },
  {
    slug: "restauracje",
    name: "Restauracje i kawiarnie",
    title: "Automatyzacja i AI dla restauracji | Wrocław",
    description:
      "Automatyzacja rezerwacji stolików, zamówień, odpowiedzi na wiadomości i social mediów dla restauracji i kawiarni we Wrocławiu. Więcej czasu na gości.",
    h1: "Automatyzacja i AI dla restauracji i kawiarni we Wrocławiu",
    intro:
      "W gastronomii najwięcej dzieje się w godzinach szczytu, czyli wtedy, gdy nikt nie ma czasu odebrać telefonu. Automaty przyjmą rezerwację, odpowiedzą na pytanie o menu i przypomną o zamówieniu na catering.",
    problems: [
      "Telefon z rezerwacją dzwoni w środku największego ruchu",
      "Pytania o menu, alergeny i godziny otwarcia w wiadomościach",
      "Zamówienia cateringowe i na wynos z wielu kanałów naraz",
      "Ręczne liczenie utargów i kosztów na koniec tygodnia",
    ],
    automations: [
      { title: "Rezerwacje stolików", text: "Rezerwacja online z potwierdzeniem i przypomnieniem. Mniej pustych stolików." },
      { title: "Asystent AI na wiadomości", text: "Odpowiada o menu, alergenach, godzinach i dojeździe, przyjmuje wstępne zamówienia." },
      { title: "Zamówienia w jednym miejscu", text: "Zamówienia z maila, telefonu i formularza trafiają na jedną listę dla kuchni." },
      { title: "Raport tygodniowy", text: "Podsumowanie rezerwacji i zamówień przychodzi na maila w poniedziałek rano." },
    ],
    scenario: { text: "Obsługa telefonów i wiadomości zajmuje personelowi ok. 1,5 godziny dziennie.", hours: 35 },
    faq: [
      { q: "Czy asystent poda poprawne informacje o alergenach?", a: "Asystent odpowiada wyłącznie na podstawie Twojego menu i opisu alergenów. Przy wątpliwościach zawsze odsyła do obsługi." },
      { q: "Czy to zadziała z moim systemem POS?", a: "To zależy od systemu. Wiele z nich ma eksport lub API. Sprawdzę to na bezpłatnej konsultacji." },
    ],
  },
  {
    slug: "biura-rachunkowe",
    name: "Biura rachunkowe",
    title: "Automatyzacja i AI dla biur rachunkowych | Wrocław",
    description:
      "Automatyczny odczyt faktur, zbieranie dokumentów od klientów i przypomnienia o terminach dla biur rachunkowych we Wrocławiu i na Dolnym Śląsku.",
    h1: "Automatyzacja i AI dla biur rachunkowych we Wrocławiu",
    intro:
      "Biuro rachunkowe to setki dokumentów co miesiąc i ciągłe przypominanie klientom o terminach. AI potrafi odczytać fakturę, a automat dopilnować, żeby dokumenty dotarły na czas.",
    problems: [
      "Klienci przysyłają dokumenty w ostatniej chwili i różnymi kanałami",
      "Ręczne przepisywanie danych z faktur i paragonów",
      "Te same pytania klientów o terminy i wymagane dokumenty",
      "Pilnowanie terminów płatności i deklaracji",
    ],
    automations: [
      { title: "Odczyt faktur i paragonów", text: "AI wyciąga dane z PDF-ów i zdjęć dokumentów i przygotowuje je do zaksięgowania." },
      { title: "Zbieranie dokumentów", text: "Automatyczne przypomnienia dla klientów z listą brakujących dokumentów." },
      { title: "Porządek w skrzynce", text: "Maile z dokumentami są rozpoznawane, opisywane i zapisywane w folderze klienta." },
      { title: "Asystent dla klientów", text: "Odpowiada na typowe pytania o terminy, wymagane dokumenty i zasady współpracy." },
    ],
    scenario: { text: "Dwie osoby spędzają łącznie ok. 2 godziny dziennie na przepisywaniu danych i przypominaniu klientom.", hours: 40 },
    faq: [
      { q: "Czy AI może samo księgować dokumenty?", a: "AI przygotowuje dane do zaksięgowania, ale decyzja i odpowiedzialność zostają po stronie księgowej. To przyspiesza pracę, nie zastępuje fachowca." },
      { q: "Czy dane klientów są bezpieczne?", a: "Tak. Dobieram narzędzia zgodne z RODO, podpisujemy umowę powierzenia danych, a wrażliwe dane mogą zostać na Twojej infrastrukturze." },
    ],
  },
  {
    slug: "nieruchomosci",
    name: "Nieruchomości",
    title: "Automatyzacja i AI dla biur nieruchomości | Wrocław",
    description:
      "Opisy ofert generowane przez AI, automatyczna obsługa zapytań i umawianie prezentacji dla biur nieruchomości i pośredników we Wrocławiu.",
    h1: "Automatyzacja i AI dla nieruchomości we Wrocławiu",
    intro:
      "Pośrednik nieruchomości dostaje dziesiątki zapytań z portali i musi szybko odpowiedzieć, zanim klient zadzwoni do konkurencji. Automaty pomagają odpowiedzieć szybciej i niczego nie zgubić.",
    problems: [
      "Zapytania z kilku portali ogłoszeniowych naraz",
      "Pisanie opisów ofert zajmuje godziny",
      "Umawianie prezentacji to wymiana wielu wiadomości",
      "Trudno pamiętać o kontakcie z klientami, którzy jeszcze szukają",
    ],
    automations: [
      { title: "Zapytania w jednym miejscu", text: "Wiadomości z portali, maila i strony trafiają na jedną listę z priorytetem." },
      { title: "Opisy ofert", text: "AI przygotowuje opis na podstawie parametrów i zdjęć mieszkania, gotowy do poprawek." },
      { title: "Umawianie prezentacji", text: "Klient wybiera termin z Twojego kalendarza i dostaje przypomnienie." },
      { title: "Follow-up", text: "Klienci, którzy jeszcze szukają, dostają nowe dopasowane oferty." },
    ],
    scenario: { text: "Agent spędza ok. 2 godziny dziennie na odpisywaniu na zapytania i pisaniu opisów.", hours: 40 },
    faq: [
      { q: "Czy opisy z AI nie będą brzmiały sztucznie?", a: "AI pisze na podstawie Twoich wcześniejszych opisów i stylu. Każdy opis i tak przechodzi przez Ciebie przed publikacją." },
      { q: "Czy da się to połączyć z moim CRM?", a: "Większość CRM dla nieruchomości ma API lub import. Sprawdzę to na konsultacji." },
    ],
  },
  {
    slug: "warsztaty",
    name: "Warsztaty i serwisy",
    title: "Automatyzacja i AI dla warsztatów i serwisów | Wrocław",
    description:
      "Automatyczne przyjmowanie zleceń, powiadomienia o statusie naprawy i przypomnienia o przeglądach dla warsztatów samochodowych i serwisów we Wrocławiu.",
    h1: "Automatyzacja i AI dla warsztatów i serwisów we Wrocławiu",
    intro:
      "W warsztacie ręce są brudne, a telefon dzwoni z pytaniem „czy auto już gotowe?”. Automaty mogą informować klientów o statusie i przypominać o przeglądach, zanim klient pojedzie gdzie indziej.",
    problems: [
      "Ciągłe telefony z pytaniem o status naprawy",
      "Przyjmowanie zleceń przez telefon i na kartkach",
      "Klienci zapominają o przeglądach i wymianie opon",
      "Wyceny przygotowywane ręcznie wieczorami",
    ],
    automations: [
      { title: "Formularz zgłoszenia", text: "Klient opisuje problem online, a zgłoszenie trafia na listę z danymi auta." },
      { title: "Status naprawy", text: "SMS przy zmianie statusu: przyjęte, w naprawie, gotowe do odbioru." },
      { title: "Przypomnienia o przeglądach", text: "Automatyczne przypomnienie o przeglądzie, wymianie oleju czy opon." },
      { title: "Wstępne wyceny", text: "AI przygotowuje szkic wyceny na podstawie cennika i opisu usterki." },
    ],
    scenario: { text: "Obsługa telefonów o status i przyjmowanie zleceń zajmuje ok. 1 godzinę dziennie.", hours: 20 },
    faq: [
      { q: "Czy klienci będą chcieli dostawać SMS-y?", a: "Tak, zwykle to doceniają, bo nie muszą dzwonić. Wysyłamy tylko informacje o ich zleceniu i przypomnienia, na które się zgodzili." },
      { q: "Czy potrzebuję specjalnego programu?", a: "Nie. Na start wystarczy arkusz lub prosty system zleceń, który podłączę do powiadomień." },
    ],
  },
  {
    slug: "firmy-budowlane",
    name: "Firmy budowlane i remontowe",
    title: "Automatyzacja i AI dla firm budowlanych i remontowych | Wrocław",
    description:
      "Szybkie wyceny z formularza, harmonogramy, dokumentacja zdjęciowa i obsługa zapytań dla firm budowlanych i remontowych we Wrocławiu i na Dolnym Śląsku.",
    h1: "Automatyzacja i AI dla firm budowlanych i remontowych we Wrocławiu",
    intro:
      "Właściciel firmy remontowej w dzień jest na budowie, a wieczorem odpisuje na zapytania i liczy wyceny. Część tej pracy mogą przejąć automaty, a klient dostanie odpowiedź szybciej niż od konkurencji.",
    problems: [
      "Zapytania czekają do wieczora, a klient w tym czasie pyta konkurencję",
      "Wyceny liczone ręcznie, często po godzinach",
      "Zdjęcia i notatki z budowy rozproszone w telefonie",
      "Klienci dopytują o postęp prac",
    ],
    automations: [
      { title: "Wstępna wycena z formularza", text: "Klient podaje metraż i zakres, a AI przygotowuje widełki cenowe według Twojego cennika." },
      { title: "Zapytania pod kontrolą", text: "Każde zapytanie trafia na listę z priorytetem i przypomnieniem o odpowiedzi." },
      { title: "Dokumentacja zdjęciowa", text: "Zdjęcia z telefonu trafiają do folderu zlecenia z datą i opisem." },
      { title: "Raport dla klienta", text: "Cotygodniowe podsumowanie postępu prac wysyłane automatycznie." },
    ],
    scenario: { text: "Właściciel spędza wieczorami ok. 1,5 godziny na wycenach i odpisywaniu.", hours: 30 },
    faq: [
      { q: "Czy automatyczna wycena nie będzie zbyt niedokładna?", a: "To wstępne widełki, nie oferta. Pozwalają szybko odpowiedzieć klientowi i odsiać zapytania spoza budżetu. Dokładną wycenę robisz po oględzinach." },
      { q: "Czy to zadziała na telefonie?", a: "Tak. Większość rozwiązań projektuję tak, żeby obsługiwać je z telefonu, bez siedzenia przy komputerze." },
    ],
  },
  {
    slug: "sklepy",
    name: "Sklepy lokalne i e-commerce",
    title: "Automatyzacja i AI dla sklepów i e-commerce | Wrocław",
    description:
      "Opisy produktów generowane przez AI, obsługa klienta, automatyzacja zamówień i faktur dla sklepów lokalnych i internetowych we Wrocławiu.",
    h1: "Automatyzacja i AI dla sklepów i e-commerce we Wrocławiu",
    intro:
      "Mały sklep internetowy to dziesiątki drobnych zadań: opisy produktów, pytania klientów, przepisywanie zamówień do faktur. Automaty pozwalają sprzedawać więcej bez zatrudniania kolejnej osoby.",
    problems: [
      "Ręczne przepisywanie zamówień do systemu faktur i magazynu",
      "Te same pytania o dostawę, zwroty i dostępność",
      "Pisanie opisów produktów zajmuje godziny",
      "Brak czasu na analizę sprzedaży",
    ],
    automations: [
      { title: "Zamówienia do faktur i magazynu", text: "Nowe zamówienie automatycznie tworzy fakturę i aktualizuje stan magazynu." },
      { title: "Asystent obsługi klienta", text: "Odpowiada o dostawie, zwrotach i statusie zamówienia, trudniejsze sprawy przekazuje do Ciebie." },
      { title: "Opisy produktów", text: "AI przygotowuje opisy i tytuły zoptymalizowane pod wyszukiwarkę." },
      { title: "Raporty sprzedaży", text: "Cotygodniowe podsumowanie bestsellerów, marż i stanów magazynowych." },
    ],
    scenario: { text: "Obsługa zamówień i pytań klientów zajmuje ok. 2 godziny dziennie.", hours: 40 },
    faq: [
      { q: "Z jakimi platformami sklepowymi to działa?", a: "Między innymi z WooCommerce, Shopify, Shoper i IdoSell, a także z systemami faktur jak Fakturownia czy inFakt." },
      { q: "Czy opisy z AI są dobre dla SEO?", a: "Tak, jeśli są unikalne i dopasowane do produktu. AI pisze na podstawie parametrów, a Ty zatwierdzasz treść." },
    ],
  },
  {
    slug: "szkoly-i-kursy",
    name: "Szkoły i kursy",
    title: "Automatyzacja i AI dla szkół językowych i kursów | Wrocław",
    description:
      "Automatyczne zapisy, płatności, przypomnienia i komunikacja z kursantami dla szkół językowych, kursów i szkoleń we Wrocławiu i na Dolnym Śląsku.",
    h1: "Automatyzacja i AI dla szkół i kursów we Wrocławiu",
    intro:
      "Szkoła językowa czy firma szkoleniowa to zapisy, płatności, listy obecności i ciągła komunikacja z kursantami. Automaty zajmą się administracją, a Ty możesz skupić się na uczeniu.",
    problems: [
      "Ręczne zapisy i przepisywanie danych kursantów",
      "Pilnowanie płatności i wysyłanie przypomnień",
      "Te same pytania o terminy, poziomy i ceny",
      "Wysyłanie materiałów po zajęciach",
    ],
    automations: [
      { title: "Zapisy online", text: "Formularz zapisu tworzy kursanta na liście grupy i wysyła potwierdzenie." },
      { title: "Płatności i przypomnienia", text: "Automatyczne przypomnienia o ratach i potwierdzenia wpłat." },
      { title: "Asystent dla kursantów", text: "Odpowiada o terminach, poziomach i cenach, pomaga dobrać kurs." },
      { title: "Materiały po zajęciach", text: "Materiały i zadania wysyłane do grupy automatycznie po lekcji." },
    ],
    scenario: { text: "Administracja zapisami i płatnościami zajmuje ok. 1 godzinę dziennie.", hours: 20 },
    faq: [
      { q: "Czy asystent pomoże dobrać poziom kursu?", a: "Tak, może przeprowadzić krótki test lub zadać kilka pytań i zaproponować grupę. Ostateczną decyzję podejmuje lektor." },
      { q: "Czy to zadziała z moją platformą e-learningową?", a: "Większość platform ma integracje lub API. Sprawdzę to na konsultacji." },
    ],
  },
];
