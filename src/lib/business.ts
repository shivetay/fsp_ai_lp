import { site } from "@/content/site";
import { siteUrl } from "@/lib/seo";

export const businessRef = { "@id": `${siteUrl}/#business` };

export const areaServed = [
  { "@type": "City", name: site.city },
  { "@type": "AdministrativeArea", name: site.region },
];

export const serviceLd = (name: string, description: string, url: string, audience?: string) => ({
  "@type": "Service",
  name,
  description,
  url,
  provider: { "@type": "ProfessionalService", ...businessRef, name: site.company.legalName, url: siteUrl },
  areaServed,
  ...(audience && { audience: { "@type": "BusinessAudience", name: audience } }),
});
