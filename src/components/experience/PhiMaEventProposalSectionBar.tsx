import { ExperienceSectionBar } from "@/components/experience/ExperienceSectionBar";
import { GoogleSlideEmbed } from "@/components/GoogleSlideEmbed";

const PHI_MA_SLIDE_SRC =
  "https://docs.google.com/presentation/d/1YxK1DkN5676BCPSbaU7CeMtSTgqXgkltgRLDMyQx5vs/embed?start=false&loop=false&delayms=3000";

export function PhiMaEventProposalSectionBar() {
  return (
    <ExperienceSectionBar
      compact
      label="Proposal Phi Mã"
      description="Proposal YEP Phi Mã — concept, mood và trải nghiệm cho ~70 khách."
    >
      <GoogleSlideEmbed
        src={PHI_MA_SLIDE_SRC}
        title="Proposal Year End Event Phi Mã — Google Slides"
      />
    </ExperienceSectionBar>
  );
}
