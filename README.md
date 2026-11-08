# FSP Łukasz Dawidowicz: AI i automatyzacje

Landing page wdrożeniowca AI i automatyzacji dla małych, lokalnych firm. Sekcje: o mnie i stack, usługi, procesy, branże, kalkulator ROI, jak pracuję, demo, FAQ, kontakt. Next.js 16, Tailwind CSS 4, font Geist, jasny i ciemny motyw.

## Start

```bash
npm install
cp .env.example .env.local   # uzupełnij wartości
npm run dev
```

## Treść

Cała treść (usługi, procesy, branże, kroki współpracy, FAQ, domyślne wartości kalkulatora ROI, dane kontaktowe i firmy) jest w `src/content/site.ts`.
Uzupełnij `email`, `phone` i `location` w `site`: puste pola nie wyświetlają się na stronie.

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

## Analityka

Strona ma wpięte Vercel Web Analytics (`@vercel/analytics`, komponent `<Analytics />` w `src/app/layout.tsx`).
Po deployu włącz je w panelu Vercel: projekt → **Analytics** → **Enable**. Analityka nie używa cookies, więc nie wymaga bannera zgody.

## Dokumentacja procesów

Opisy przykładowych automatyzacji są w `docs/procesy/` (np. `leady-do-crm.md`).

## SEO

- Meta tagi, canonical, Open Graph i Twitter: `src/app/layout.tsx`, teksty w `src/lib/seo.ts`.
- Dane strukturalne JSON-LD (WebSite, Person, ProfessionalService z usługami, FAQPage): `src/components/structured-data.tsx`.
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, ikona i obrazek OG generowane przez Next.js (`src/app/`).
- Ustaw `NEXT_PUBLIC_SITE_URL` na docelową domenę. Po deployu dodaj stronę do Google Search Console,
  zweryfikuj ją (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) i zgłoś `sitemap.xml`.
- Uzupełnij `location` w `src/content/site.ts`: miasto/region wzmacnia lokalne SEO i trafia do danych strukturalnych.
