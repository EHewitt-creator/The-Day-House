import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import DayInLife from "@/components/DayInLife";
import FamilyValue from "@/components/FamilyValue";
import FamilyInterestSection from "@/components/family-interest/FamilyInterestSection";
import FoundersPreview from "@/components/FoundersPreview";
import SecondaryPathways from "@/components/SecondaryPathways";
import ClosingCta from "@/components/ClosingCta";
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
        "The Day House is a dementia-informed adult day program and daytime community coming soon to the Treasure Valley for adults living with memory loss and dementia.",
      areaServed: "Treasure Valley, Idaho",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
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
      <Pillars />
      <DayInLife showApproachLink />
      <FamilyValue />
      <FamilyInterestSection />
      <FoundersPreview />
      <SecondaryPathways />
      <ClosingCta />
      <MobileStickyCta />
    </>
  );
}
