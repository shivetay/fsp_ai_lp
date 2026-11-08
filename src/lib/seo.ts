import { site } from "@/content/site";

// Docelowy adres strony. Ustaw NEXT_PUBLIC_SITE_URL w Vercelu (bez "/" na końcu).
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.fsplukaszdawidowicz.pl").replace(/\/$/, "");

export const seo = {
  title: "Wdrożenia AI i automatyzacja procesów dla małych firm | FSP Łukasz Dawidowicz",
  shortTitle: "Wdrożenia AI i automatyzacje dla małych firm",
  description:
    "Wdrażam sztuczną inteligencję i automatyzuję procesy w małych, lokalnych firmach: chatboty AI, obsługa zapytań, rezerwacje, faktury, oferty. Bezpłatna konsultacja i kalkulator ROI.",
  keywords: [
    "wdrożenie AI",
    "wdrożenia sztucznej inteligencji",
    "automatyzacja procesów",
    "automatyzacja dla małych firm",
    "AI dla małych firm",
    "chatbot AI dla firmy",
    "asystent AI",
    "automatyzacja n8n",
    "automatyzacja Make Zapier",
    "konsultant AI",
    "kalkulator ROI automatyzacji",
    site.name,
  ],
  locale: "pl_PL",
};
