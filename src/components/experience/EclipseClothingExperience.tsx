import {
  BarChart2,
  Calendar,
  Clock,
  Megaphone,
  Video,
} from "lucide-react";
import { EclipseClothingReelAside } from "@/components/experience/EclipseClothingReelAside";

const INTRO =
  "Lên kế hoạch và triển khai định hướng truyền thông trên Facebook và TikTok, tối ưu chi phí quảng cáo và nâng cao hiệu quả chuyển đổi cho thương hiệu thời trang.";

const RESPONSIBILITIES = [
  {
    icon: Calendar,
    text: "Lên kế hoạch và triển khai định hướng truyền thông trên Facebook và TikTok.",
  },
  {
    icon: Megaphone,
    text: "Sản xuất nội dung nhằm tăng nhận diện thương hiệu và cải thiện tệp khách hàng trung thành.",
  },
  {
    icon: Video,
    text: "Tham gia xây dựng kịch bản, quay dựng và sản xuất video.",
  },
  {
    icon: BarChart2,
    text: "Tối ưu chi phí quảng cáo; booking, đàm phán và quản lý KOL/KOC.",
  },
  {
    icon: Clock,
    text: "Nắm bắt xu hướng nội dung và duy trì tần suất 2–3 video/ngày.",
  },
] as const;

const SKILLS = [
  "Lên kế hoạch social media",
  "Nội dung Facebook & TikTok",
  "Quản lý KOL/KOC",
  "Kịch bản video",
  "Sản xuất video",
  "Nghiên cứu xu hướng",
  "Vận hành livestream",
  "Phân tích hiệu quả",
] as const;

export function EclipseClothingExperience() {
  return (
    <section className="bg-[var(--color-canvas)] pb-10 pt-2 sm:pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-[var(--radius-profile)] border border-[var(--color-hairline)] bg-[var(--color-white)] p-5 shadow-[var(--shadow-profile-card)] sm:p-8 lg:p-10">
          <span className="inline-flex rounded-[var(--radius-pill)] bg-[var(--color-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--color-on-primary)] sm:text-[11px]">
            Vai trò
          </span>

          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(300px,1.08fr)] lg:items-start lg:gap-x-10 lg:gap-y-6 xl:gap-x-14">
            <h2 className="order-1 min-w-0 self-start font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold leading-tight tracking-tight text-[var(--color-primary-ink)] lg:col-start-1 lg:row-start-1">
              Social Media Executive
            </h2>

            <aside className="order-2 min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-8 lg:self-start">
              <EclipseClothingReelAside />
            </aside>

            <div className="order-3 min-w-0 space-y-8 lg:col-start-1 lg:row-start-2">
              <p className="max-w-[52ch] text-sm leading-relaxed text-[var(--color-body)] sm:text-[15px]">
                {INTRO}
              </p>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary-ink)]">
                  Trách nhiệm chính
                </p>
                <ul className="mt-4 space-y-4">
                  {RESPONSIBILITIES.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-mist-sky)] text-[var(--color-primary)]">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <p className="pt-1 text-sm leading-relaxed text-[var(--color-body)]">
                        {text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[var(--color-hairline)] pt-8">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary-ink)]">
                  Kỹ năng nổi bật
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-[var(--radius-pill)] bg-[var(--color-brand-mist-sky)] px-3 py-1.5 text-xs font-medium text-[var(--color-primary-ink)] sm:text-[13px]"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
