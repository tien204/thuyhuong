"use client";

import { ExperienceSectionBar } from "@/components/experience/ExperienceSectionBar";
import { SocialVideoCarousel } from "@/components/experience/SocialVideoCarousel";

export function CaseStudySectionBar() {
  return (
    <ExperienceSectionBar
      label="Social Post"
      description="Video social campaign here.olong trên Facebook và TikTok."
    >
      <SocialVideoCarousel />
    </ExperienceSectionBar>
  );
}
