"use client";

import { ExperienceSectionBar } from "@/components/experience/ExperienceSectionBar";
import {
  SocialVideoCarousel,
  type FacebookReelItem,
} from "@/components/experience/SocialVideoCarousel";

const PHI_MA_FACEBOOK_REELS: FacebookReelItem[] = [
  {
    href: "https://www.facebook.com/reel/1618739512460257",
  },
  {
    href: "https://www.facebook.com/reel/887412110707729",
    posterSrc: "/feature01/phi-ma-reel-887412.jpg",
    posterAlt:
      "Year End Event Phi Mã — Alpha Land Thanks Party 2025 trên sân khấu",
    posterOnly: true,
  },
];

export function PhiMaEventSocialSectionBar() {
  return (
    <ExperienceSectionBar
      compact
      label="Social Post"
      description="Reels truyền thông YEP Phi Mã trên Facebook."
    >
      <SocialVideoCarousel
        facebookReels={PHI_MA_FACEBOOK_REELS}
        facebookVideos={[]}
        tiktokVideoIds={[]}
      />
    </ExperienceSectionBar>
  );
}
