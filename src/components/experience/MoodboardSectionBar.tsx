import { CanvaEmbed } from "@/components/CanvaEmbed";
import { ExperienceSectionBar } from "@/components/experience/ExperienceSectionBar";

const CANVA_MOODBOARD_SRC =
  "https://www.canva.com/design/DAG7AX8eaKg/BmhpdSz4twVvTgwOvtOHGw/view?embed";

export function MoodboardSectionBar() {
  return (
    <ExperienceSectionBar
      label="Moodboard"
      description="Moodboard trước buổi screening campaign here.olong và Coco Nama."
    >
      <CanvaEmbed
        src={CANVA_MOODBOARD_SRC}
        title="Moodboard — Thêu hoa dệt gấm / here.olong"
      />
    </ExperienceSectionBar>
  );
}
