import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import DayInLife from "@/components/DayInLife";
import FamilyValue from "@/components/FamilyValue";
import FoundersPreview from "@/components/FoundersPreview";
import FamilyInterestSection from "@/components/family-interest/FamilyInterestSection";
import CareersSection from "@/components/CareersSection";
import { BrandStatementBanner } from "@/components/BrandStatement";
import CommunityContact from "@/components/CommunityContact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <DayInLife />
      <FamilyValue />
      <FoundersPreview />
      <FamilyInterestSection />
      <CareersSection />
      <BrandStatementBanner />
      <CommunityContact />
    </>
  );
}
