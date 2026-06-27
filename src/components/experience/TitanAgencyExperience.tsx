import {
  BarChart2,
  Calendar,
  Megaphone,
  Play,
  PlayCircle,
  Search,
  Shapes,
  Star,
  Tag,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const ACHIEVEMENTS: {
  icon: typeof Shapes;
  text: string;
  filled?: boolean;
}[] = [
  {
    icon: Shapes,
    text: "Phụ trách triển khai hoạt động branding cho nhiều khách hàng đa ngành, đảm bảo định vị và tính nhất quán thương hiệu.",
  },
  {
    icon: Search,
    text: "Nghiên cứu thị trường & insight khách hàng, xây dựng định hướng chiến lược và phối hợp triển khai campaign đa kênh cùng team Creative.",
  },
  {
    icon: TrendingUp,
    text: "Tối ưu hiệu quả chiến dịch và duy trì quan hệ khách hàng, góp phần giúp khách hàng BĐS tái ký 4 lần (gia hạn đến 2027).",
  },
  {
    icon: Megaphone,
    text: 'Lên concept và tổ chức thành công Year End Event (~70 khách) với chủ đề "Phi mã".',
  },
  {
    icon: Play,
    filled: true,
    text: 'Triển khai campaign Tết "Thêu hoa dệt gấm" cho here.olong; phát triển và truyền thông các BST mới cho Cocolama; đồng thời sản xuất nhiều video đạt 500.000+ views cho Lạc Coffee & Desserts và Trần Sĩ Đức.',
  },
];

const TAGS: {
  icon: typeof Tag;
  label: string;
  filled?: boolean;
}[] = [
  { icon: Tag, label: "Branding", filled: true },
  { icon: Target, label: "Strategy" },
  { icon: Megaphone, label: "Campaign", filled: true },
  { icon: PlayCircle, label: "Content", filled: true },
  { icon: Calendar, label: "Event" },
];

const ORBIT_ICONS: {
  icon: typeof Target;
  top: string;
  left: string;
  accent?: boolean;
}[] = [
  { icon: Target, top: "0%", left: "50%", accent: true },
  { icon: Users, top: "25%", left: "6.7%" },
  { icon: Megaphone, top: "25%", left: "93.3%" },
  { icon: BarChart2, top: "75%", left: "6.7%" },
  { icon: Calendar, top: "75%", left: "93.3%" },
];

function OrbitIcon({
  icon: Icon,
  top,
  left,
  accent = false,
}: {
  icon: typeof Target;
  top: string;
  left: string;
  accent?: boolean;
}) {
  return (
    <div
      className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-hairline)] bg-[var(--color-white)] p-2 shadow-[var(--shadow-card)] sm:p-2.5"
      style={{ top, left }}
    >
      <Icon
        className={`h-4 w-4 sm:h-[18px] sm:w-[18px] ${accent ? "text-[var(--color-primary)]" : "text-[var(--color-muted-soft)]"}`}
        strokeWidth={2}
      />
    </div>
  );
}

export function TitanAgencyExperience() {
  return (
    <section className="bg-[var(--color-canvas)] pb-8 pt-2 sm:pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-[var(--radius-profile)] border border-[var(--color-hairline)] bg-[var(--color-white)] p-4 shadow-[var(--shadow-profile-card)] sm:p-8 md:p-10 lg:flex lg:gap-12 xl:gap-20">
          {/* Left column */}
          <div className="flex flex-1 flex-col lg:max-w-[420px] lg:shrink-0">
            {/* Projects orbit graphic */}
            <div className="relative flex flex-col items-center rounded-[var(--radius-profile)] border border-[var(--color-brand-mist-sky-deep)] bg-[var(--color-brand-mist-sky)] p-4 shadow-[inset_0_2px_12px_color-mix(in_srgb,var(--color-primary)_6%,transparent)] sm:p-8">
              <div className="flex w-full items-center justify-center py-4 sm:py-8">
                <div className="relative aspect-square w-[min(100%,200px)] sm:w-[280px]">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[var(--color-brand-mist-sky-deep)] opacity-80" />
                  <div className="absolute left-[25%] top-[13.4%] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]" />
                  <div className="absolute left-[75%] top-[13.4%] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]" />
                  <div className="absolute left-[0%] top-[50%] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]" />
                  <div className="absolute left-[100%] top-[50%] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]" />

                  {ORBIT_ICONS.map(({ icon, top, left, accent }) => (
                    <OrbitIcon
                      key={`${top}-${left}`}
                      icon={icon}
                      top={top}
                      left={left}
                      accent={accent}
                    />
                  ))}

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="select-none bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-primary-active)] bg-clip-text font-[family-name:var(--font-display)] text-[clamp(3rem,14vw,6.5rem)] font-extrabold leading-none tabular-nums text-transparent sm:text-[6.5rem]"
                      style={{
                        filter:
                          "drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-primary-active) 22%, transparent))",
                      }}
                    >
                      11
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2.5 pb-0.5 sm:gap-4">
                <div className="rounded-[var(--radius-pill)] bg-[var(--color-primary)] px-4 py-2 text-[11px] font-semibold text-[var(--color-on-primary)] shadow-[0_4px_12px_color-mix(in_srgb,var(--color-primary)_25%,transparent)] sm:px-6 sm:py-3 sm:text-sm">
                  Dự án duy trì cùng lúc
                </div>

                <p className="text-center text-xs font-medium leading-relaxed text-[var(--color-body)] sm:text-sm">
                  <span className="sm:hidden">
                    Duy trì{" "}
                    <strong className="font-semibold text-[var(--color-primary-active)]">
                      11 dự án
                    </strong>{" "}
                    cùng lúc
                  </span>
                  <span className="hidden sm:inline">
                    Có thể đảm nhiệm và duy trì{" "}
                    <strong className="font-semibold text-[var(--color-primary-active)]">
                      11 dự án
                    </strong>{" "}
                    cùng lúc
                  </span>
                </p>
              </div>
            </div>

            {/* Skill tags */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
              {TAGS.map(({ icon: Icon, label, filled }) => (
                <div
                  key={label}
                  className="flex cursor-default items-center justify-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--color-hairline)] bg-[var(--color-white)] px-2.5 py-1.5 text-[11px] font-medium text-[var(--color-primary-ink)] shadow-[var(--shadow-card)] sm:px-3 sm:text-xs"
                >
                  <Icon
                    className="h-3.5 w-3.5"
                    fill={filled ? "currentColor" : "none"}
                    strokeWidth={filled ? 0 : 2}
                  />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right column — achievements */}
          <div className="mt-8 flex flex-[1.2] flex-col pt-0 lg:mt-0 lg:min-w-0">
            <div className="mb-5 flex items-center gap-3 sm:mb-8 sm:gap-4">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--color-primary)] sm:h-12 sm:w-12">
                <div className="absolute inset-0 rounded-full bg-[var(--color-accent)]" />
                <Star className="relative z-10 h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-[var(--color-primary-ink)] sm:text-lg md:text-xl">
                <span className="sm:hidden">Thành tựu nổi bật</span>
                <span className="hidden sm:inline">Vai trò & thành tựu nổi bật</span>
              </h3>
            </div>

            <div className="flex flex-col">
              {ACHIEVEMENTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text.slice(0, 32)}
                    className={`flex gap-3 sm:gap-6 ${
                      idx !== ACHIEVEMENTS.length - 1
                        ? "mb-5 border-b border-dashed border-[var(--color-hairline)] pb-5 sm:mb-7 sm:pb-7"
                        : ""
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-mist-sky)] text-[var(--color-primary)] sm:h-11 sm:w-11">
                      <Icon
                        className="h-5 w-5"
                        fill={item.filled ? "currentColor" : "none"}
                        strokeWidth={item.filled ? 0 : 1.5}
                      />
                    </div>
                    <p className="flex-1 text-xs leading-relaxed text-[var(--color-body)] sm:pt-0.5 sm:text-sm">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
