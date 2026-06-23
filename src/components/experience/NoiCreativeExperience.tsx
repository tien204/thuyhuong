import { ExperienceRoleSection } from "@/components/experience/ExperienceRoleSection";

const RESPONSIBILITIES = [
  "Quản lý và xây dựng trang Facebook của công ty.",
  "Lập kế hoạch tổng thể cho fanpage trong giai đoạn 3–6 tháng.",
  "Tiến hành nghiên cứu và phân tích để hiểu rõ hơn về khách hàng đối với trang fanpage.",
  "Sáng tạo nội dung và thiết kế các bài viết đơn giản cho Facebook.",
] as const;

const SKILLS = [
  "Facebook page management",
  "Basic content planning",
  "Customer research",
  "Simple design",
  "Entry-level marketing execution",
] as const;

export function NoiCreativeExperience() {
  return (
    <ExperienceRoleSection
      role="Marketing Intern"
      company="Nối Creative Agency"
      period="12/2022 – 03/2023"
      logo={{
        src: "/agency/noi-creative-agency.png",
        alt: "Logo Nối Creative Agency",
      }}
      responsibilities={RESPONSIBILITIES}
      skills={SKILLS}
      reversed
    />
  );
}
