import type { Metadata } from "next";
import Hero from "@/components/Hero";
import OurApproach from "@/components/OurApproach";
import ProgramDetails from "@/components/ProgramDetails";
import FamilyInterestSection from "@/components/family-interest/FamilyInterestSection";
import FounderLine from "@/components/FounderLine";
import MobileStickyCta from "@/components/MobileStickyCta";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Minimal, factual Organization + WebSite structured data, combined into one
// graph so search engines can resolve the cross-references (WebSite.publisher
// -> Organization) via @id. Organization deliberately omits
// address/telephone/openingHours (LocalBusiness fields we can't populate
// truthfully pre-opening) — see README for why this stays Organization
// rather than LocalBusiness until there's a physical location to report.
//
// areaServed is a structured Place rather than a bare string — schema.org
// accepts either, but a Place is the more correct, machine-readable form.
//
// contactPoint.email reuses the same public inbox already published on the
// privacy page (app/privacy/page.tsx's EMAIL constant) — nothing invented.
//
// founder entries share their @id with the full Person entities defined in
// app/about/page.tsx (see FOUNDERS_JSON_LD there). Keeping the same @id on
// both pages is what lets a crawler treat them as the same real-world
// person rather than two unrelated stubs; the fuller bio/credentials live
// once, on the About page, so they don't need to be repeated here.
const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo-grid.png`,
      description:
        "The Day House is a dementia-informed adult day program and daytime community coming soon to the Boise metro area for adults living with memory loss and dementia.",
      slogan: "Purposeful days. Meaningful connection. Dependable respite.",
      areaServed: {
        "@type": "Place",
        name: "Boise metro area, Idaho",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@yourdayhouse.com",
        contactType: "customer service",
      },
      founder: [
        { "@type": "Person", "@id": `${SITE_URL}/about#elvina-hewitt`, name: "Elvina Hewitt" },
        { "@type": "Person", "@id": `${SITE_URL}/about#robbin-hewitt`, name: "Robbin Hewitt" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_JSON_LD) }}
      />
      <Hero />
      <OurApproach />
      <ProgramDetails />
      <FounderLine />
      <FamilyInterestSection />
      <MobileStickyCta />
    </>
  );
}
