import { AnimatedTextMaskDivider } from "@/components/AnimatedTextMaskDivider";
import { Hero } from "@/components/Hero";
import { HighlightSection } from "@/components/experience/highlight/HighlightSection";
import { EclipseClothingExperience } from "@/components/experience/EclipseClothingExperience";
import { FeaturedProjectsSection } from "@/components/experience/FeaturedProjectsSection";
import { TitanAgencyExperience } from "@/components/experience/TitanAgencyExperience";
import { WorkContactSection } from "@/components/contact/WorkContactSection";
import { ProfileContent } from "@/components/profile/ProfileContent";
import { Ribbon3d } from "@/lib/ribbon3d";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <AnimatedTextMaskDivider />
      <ProfileContent />
      <Ribbon3d
        number="01"
        tag="Branding Planner"
        ribbonText="Titan Agency"
      />
      <TitanAgencyExperience />
      <FeaturedProjectsSection />
      <Ribbon3d
        number="02"
        tag="Social Media Executive"
        ribbonText="Eclipse Clothing"
      />
      <EclipseClothingExperience />
      <Ribbon3d
        number="03"
        tag="Other Brands"
        ribbonText="Highlight"
      />
      <HighlightSection />
      <Ribbon3d
        number="04"
        tag="Liên hệ công việc"
        ribbonText="Contact"
      />
      <WorkContactSection />
    </main>
  );
}
