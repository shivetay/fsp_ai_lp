// Rejestr dem. Aby wpiąć własne demo:
// 1. Utwórz komponent w src/demos/ (np. my-demo.tsx, z "use client" jeśli interaktywny).
// 2. Zaimportuj go poniżej i ustaw jako ActiveDemo.
// Alternatywnie ustaw NEXT_PUBLIC_DEMO_URL, aby osadzić zewnętrzne demo w iframe.
import { LeadTriageDemo } from "./lead-triage-demo";

export const ActiveDemo = LeadTriageDemo;

export const demoMeta = {
  title: "Automatyczna analiza zapytania od klienta",
  description:
    "Wklej treść maila. Automat wyciągnie dane kontaktowe, nada kategorię i priorytet, a potem przygotuje szkic odpowiedzi. To uproszczona symulacja działająca w przeglądarce. W produkcji ten krok wykonuje model AI.",
};
