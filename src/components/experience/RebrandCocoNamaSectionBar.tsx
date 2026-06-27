import { ExperienceSectionBar } from "@/components/experience/ExperienceSectionBar";
import { GoogleSlideEmbed } from "@/components/GoogleSlideEmbed";

export function RebrandCocoNamaSectionBar() {
  return (
    <ExperienceSectionBar
      compact
      label="Rebrand Coco Nama"
      description="Presentation rebrand Coco Nama trên Google Slides."
    >
      <GoogleSlideEmbed title="Rebrand Coco Nama — Google Slides" />
    </ExperienceSectionBar>
  );
}
