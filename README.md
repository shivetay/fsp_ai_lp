# FSP Łukasz Dawidowicz: AI i automatyzacje

Strona freelancera (AI, automatyzacje, aplikacje webowe). Next.js 16, Tailwind CSS 4, font Geist, jasny i ciemny motyw.

## Start

```bash
npm install
cp .env.example .env.local   # uzupełnij wartości
npm run dev
```

## Treść

Cała treść (usługi, proces, realizacje, stack, FAQ, dane firmy) jest w `src/content/site.ts`.
Podmień przykładowe realizacje na prawdziwe.

## Formularz kontaktowy

Dwie opcje, wybierana przez zmienne środowiskowe:

- **Formspree** (bez backendu): ustaw `NEXT_PUBLIC_FORMSPREE_ID`. Formularz wysyła dane prosto do Formspree.
- **Resend** (własny endpoint `/api/contact`): ustaw `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
  (nadawca z domeny zweryfikowanej w Resend).

Formularz ma walidację, honeypot antyspamowy i zgodę RODO.

## Demo

Sekcja `#demo` pokazuje jedno z dwóch:

- **Zewnętrzne demo w iframe**: ustaw `NEXT_PUBLIC_DEMO_URL` (np. Streamlit, Gradio, formularz n8n, inna aplikacja na Vercelu).
- **Własny komponent**: dodaj plik w `src/demos/` i ustaw go jako `ActiveDemo` w `src/demos/index.tsx`.
  Domyślnie jest tam `LeadTriageDemo`, czyli symulacja automatu analizującego zapytanie od klienta.

## Deploy

Najprościej na Vercelu: zaimportuj repozytorium i ustaw zmienne z `.env.example`.
