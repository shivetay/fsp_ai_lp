# Proces: leady do CRM

Opis automatyzacji, która zbiera zapytania od klientów z różnych kanałów do jednej listy (CRM).
Proces został usunięty z sekcji „Procesy” na stronie, ten dokument zostaje jako materiał referencyjny,
np. do rozmów z klientami lub przyszłych case studies.

Opis na stronie brzmiał: *„Każde zapytanie z formularza, maila czy Facebooka trafia do jednej listy.”*

## Problem

Zapytania przychodzą z kilku miejsc naraz: formularz na stronie, e-mail, Messenger/Facebook, Instagram,
telefon, Google (wizytówka). Właściciel lub pracownik przepisuje je ręcznie do zeszytu, arkusza albo CRM.
Część zapytań ginie, odpowiedź przychodzi z opóźnieniem, a nie wiadomo, skąd przychodzą klienci.

## Jak to działa po automatyzacji

```
Formularz WWW ─┐
E-mail ────────┤
Messenger/FB ──┼─► 1. Odbiór ─► 2. Ekstrakcja (AI) ─► 3. Deduplikacja ─► 4. Zapis w CRM ─► 5. Powiadomienie
Instagram ─────┤                                                                          └► 6. Odpowiedź / follow-up
Telefon (notatka)┘
```

1. **Odbiór (trigger).** Każdy kanał ma swój wyzwalacz: webhook formularza, nowa wiadomość w skrzynce
   (IMAP/Gmail/Outlook), webhook Meta (Messenger, Instagram), ręczna notatka z telefonu (np. formularz w telefonie).
2. **Ekstrakcja danych (AI).** Model AI odczytuje treść i zwraca ustrukturyzowane dane:
   imię i nazwisko, e-mail, telefon, firma, czego dotyczy zapytanie (usługa/kategoria), pilność,
   budżet lub termin, jeśli padły. Zwraca też krótkie streszczenie w 1–2 zdaniach.
3. **Deduplikacja.** Sprawdzenie po e-mailu i telefonie, czy kontakt już istnieje. Jeśli tak, nowe zapytanie
   dopisuje się do istniejącego kontaktu zamiast tworzyć duplikat.
4. **Zapis w CRM.** Utworzenie lub aktualizacja kontaktu i szansy sprzedaży (deal) z polami:
   źródło (kanał), kategoria, priorytet, streszczenie, link do oryginalnej wiadomości, data.
   CRM może być pełnym systemem (Pipedrive, HubSpot, Zoho, Livespace) albo, w małej firmie, arkuszem Google/Airtable.
5. **Powiadomienie.** Krótka wiadomość do właściciela lub handlowca (e-mail, SMS, Slack/Teams, Telegram)
   z najważniejszymi danymi. Leady o wysokim priorytecie oznaczone osobno.
6. **Odpowiedź i follow-up (opcjonalnie).** AI przygotowuje szkic odpowiedzi do akceptacji jednym kliknięciem.
   Jeśli lead nie dostanie odpowiedzi w ciągu np. 24 h, przychodzi przypomnienie. Brak kontaktu ze strony
   klienta po wysłanej ofercie uruchamia uprzejmy follow-up po kilku dniach.

## Narzędzia

- Orkiestracja: n8n (self-hosted lub cloud), Make albo Zapier; przy większej skali dedykowany kod (Node.js).
- AI: Claude lub OpenAI z wymuszonym formatem JSON (structured output).
- CRM: Pipedrive, HubSpot (darmowy plan), Zoho, Livespace albo Google Sheets / Airtable.
- Kanały: webhook formularza, Gmail/Outlook API, Meta Graph API (Messenger, Instagram).

## Typowy czas wdrożenia i koszty

- Prototyp: 2–4 dni robocze (formularz + e-mail + arkusz).
- Pełne wdrożenie z kanałami Meta i CRM: 1–2 tygodnie.
- Koszty miesięczne: narzędzie automatyzacji (0–100 zł) + API modelu AI (zwykle kilka–kilkadziesiąt zł
  przy ruchu małej firmy) + ewentualny abonament CRM.

## Efekty do mierzenia

- Czas od zapytania do pierwszej odpowiedzi (przed i po).
- Liczba zapytań, które wcześniej „ginęły”.
- Godziny tygodniowo zaoszczędzone na przepisywaniu danych.
- Źródła klientów: który kanał przynosi najwięcej zapytań i zamówień.

## RODO i bezpieczeństwo

- Dane trafiają tylko do narzędzi na kontach klienta; umowa powierzenia przetwarzania danych.
- Model AI dostaje wyłącznie treść potrzebną do ekstrakcji, bez przechowywania danych do trenowania.
- Formularze z informacją o przetwarzaniu danych i zgodą na kontakt.
