import { AnimatedTextMaskDivider } from "@/components/AnimatedTextMaskDivider";
import { Hero } from "@/components/Hero";
import { CaseStudySectionBar } from "@/components/experience/CaseStudySectionBar";
import { EclipseClothingExperience } from "@/components/experience/EclipseClothingExperience";
import { ExperienceCaseStudy } from "@/components/experience/ExperienceCaseStudy";
import { MoodboardSectionBar } from "@/components/experience/MoodboardSectionBar";
import { WorkContactSection } from "@/components/contact/WorkContactSection";
import { RebrandCocoNamaSectionBar } from "@/components/experience/RebrandCocoNamaSectionBar";
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
      <ExperienceCaseStudy />
      <CaseStudySectionBar />
      <RebrandCocoNamaSectionBar />
      <MoodboardSectionBar />
      <Ribbon3d
        number="02"
        tag="Social Media Executive"
        ribbonText="Eclipse Clothing"
      />
      <EclipseClothingExperience />
      <Ribbon3d
        number="03"
        tag="Liên hệ công việc"
        ribbonText="Contact"
      />
      <WorkContactSection />
    </main>
  );
}
