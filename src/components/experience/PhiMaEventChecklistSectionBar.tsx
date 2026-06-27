import { ExperienceSectionBar } from "@/components/experience/ExperienceSectionBar";
import { GoogleSheetEmbed } from "@/components/GoogleSheetEmbed";

const PHI_MA_CHECKLIST_SRC =
  "https://docs.google.com/spreadsheets/d/1pZmQa_vmfPxpCVSf6pcpF117m2mwDEVi1CQeRRDrUWA/preview";

export function PhiMaEventChecklistSectionBar() {
  return (
    <ExperienceSectionBar
      compact
      label="Checklist Phi Mã"
      description="Checklist YEP Alpha Land — timeline, phân công và tiến độ chuẩn bị."
    >
      <GoogleSheetEmbed
        src={PHI_MA_CHECKLIST_SRC}
        title="Checklist YEP Alpha Land — Phi Mã"
      />
    </ExperienceSectionBar>
  );
}
