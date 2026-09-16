import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import DayInLife from "@/components/DayInLife";
import FamilyValue from "@/components/FamilyValue";
import FamilyInterestSection from "@/components/family-interest/FamilyInterestSection";
import FoundersPreview from "@/components/FoundersPreview";
import SecondaryPathways from "@/components/SecondaryPathways";
import ClosingCta from "@/components/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <DayInLife />
      <FamilyValue />
      <FamilyInterestSection />
      <FoundersPreview />
      <SecondaryPathways />
      <ClosingCta />
    </>
  );
}
