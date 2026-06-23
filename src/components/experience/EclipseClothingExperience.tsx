import { ExperienceRoleSection } from "@/components/experience/ExperienceRoleSection";

const RESPONSIBILITIES = [
  "Lên kế hoạch và triển khai định hướng truyền thông trên Facebook và TikTok.",
  "Sản xuất nội dung nhằm tăng nhận diện thương hiệu và cải thiện tệp khách hàng trung thành.",
  "Tối ưu chi phí quảng cáo; booking, đàm phán và quản lý KOL/KOC.",
  "Mở rộng độ phủ mạng xã hội và nâng cao hiệu quả chuyển đổi.",
  "Tham gia xây dựng kịch bản, quay dựng và sản xuất video.",
  "Nắm bắt xu hướng nội dung và duy trì tần suất 2–3 video/ngày.",
  "Tham gia đạo diễn và điều phối các buổi quay định kỳ.",
  "Tổ chức và vận hành livestream, đảm bảo chất lượng nội dung và trải nghiệm người xem.",
] as const;

const SKILLS = [
  "Social media planning",
  "Facebook & TikTok content",
  "KOL/KOC management",
  "Video scripting",
  "Video production",
  "Trend research",
  "Livestream operation",
  "Brand awareness growth",
  "Performance-oriented content",
] as const;

const METRICS = [
  { value: "2–3", label: "Video mỗi ngày" },
  { value: "2+", label: "Năm kinh nghiệm" },
  { value: "FB·TT", label: "Kênh chính" },
] as const;

export function EclipseClothingExperience() {
  return (
    <ExperienceRoleSection
      role="Social Media Executive"
      company="Eclipse Clothing"
      period="05/2023 – 07/2025"
      logo={{
        src: "/agency/eclise-cloting.png",
        alt: "Logo Eclipse Clothing",
      }}
      responsibilities={RESPONSIBILITIES}
      skills={SKILLS}
      metrics={METRICS}
    />
  );
}
