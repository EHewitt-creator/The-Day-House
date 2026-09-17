import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import DayInLife from "@/components/DayInLife";
import FamilyValue from "@/components/FamilyValue";
import FamilyInterestSection from "@/components/family-interest/FamilyInterestSection";
import FoundersPreview from "@/components/FoundersPreview";
import SecondaryPathways from "@/components/SecondaryPathways";
import ClosingCta from "@/components/ClosingCta";
import MobileStickyCta from "@/components/MobileStickyCta";

// Minimal, factual Organization structured data. Deliberately omits
// address/telephone/openingHours (LocalBusiness fields we can't populate
// truthfully pre-opening) — see README for why this stays Organization
// rather than LocalBusiness until there's a physical location to report.
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Day House",
  url: "https://www.yourdayhouse.com",
  logo: "https://www.yourdayhouse.com/brand/logo-grid.png",
  description:
    "The Day House is a dementia-informed adult day program and daytime community coming soon to the Treasure Valley for adults living with memory loss and dementia.",
  areaServed: "Treasure Valley, Idaho",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
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
