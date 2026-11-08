import { faq, industries, services, site } from "@/content/site";
import { seo, siteUrl } from "@/lib/seo";

// Dane strukturalne schema.org (JSON-LD) dla Google: firma, osoba, usługi, FAQ.
export function StructuredData() {
  const nip = site.company.lines.find((l) => l.startsWith("NIP"))?.replace(/\D/g, "");
  const sameAs = [site.linkedin, site.github].filter(Boolean);

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${site.brand} ${site.name}`,
      inLanguage: "pl-PL",
      publisher: { "@id": `${siteUrl}/#business` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.name,
      jobTitle: "Specjalista ds. wdrożeń AI i automatyzacji",
      url: siteUrl,
      sameAs,
      knowsAbout: ["sztuczna inteligencja", "automatyzacja procesów", "React", "Next.js", "Node.js", "n8n"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#business`,
      name: site.company.legalName,
      url: siteUrl,
      description: seo.description,
      image: `${siteUrl}/opengraph-image`,
      founder: { "@id": `${siteUrl}/#person` },
      ...(nip && { taxID: nip, vatID: `PL${nip}` }),
      ...(site.email && { email: site.email }),
      ...(site.phone && { telephone: site.phone }),
      address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: "dolnośląskie", addressCountry: "PL" },
      areaServed: [
        { "@type": "City", name: site.city },
        { "@type": "AdministrativeArea", name: site.region },
        { "@type": "Country", name: "Polska" },
      ],
      priceRange: "$$",
      sameAs,
      knowsAbout: industries.map((i) => i.name),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Usługi",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.lead, provider: { "@id": `${siteUrl}/#business` } },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }}
    />
  );
}
