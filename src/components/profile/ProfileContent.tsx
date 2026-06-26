import Image from "next/image";
import { LogoPlaceholder } from "./LogoPlaceholder";
import {
  IconArrowRight,
  IconBriefcase,
  IconMail,
  IconPhone,
} from "./ProfileIcons";

const TOOLS = [
  {
    name: "CapCut",
    imageSrc: "/icon-app/capcut-svgrepo-com.svg",
  },
  {
    name: "Canva",
    imageSrc: "/icon-app/canva.svg",
  },
  {
    name: "Microsoft Office",
    imageSrc: "/icon-app/microsoft-office-2013-logo-svgrepo-com.svg",
  },
] as const;

const CLIENTS = [
  {
    name: "Coconama",
    imageSrc: "/agency/coconama.png",
  },
  {
    name: "Eclipse",
    imageSrc: "/agency/eclise-cloting.png",
  },
  {
    name: "NOI Creative",
    imageSrc: "/agency/noi-creative-agency.png",
  },
] as const;

const ABILITIES_LEFT = [
  "Lên kế hoạch truyền thông",
  "Nghiên cứu thị trường",
  "Xây dựng định hướng branding",
  "Quản lý KOL/KOC",
  "Tổ chức livestream",
  "Triển khai campaign đa kênh",
] as const;

const ABILITIES_RIGHT = [
  "Giao tiếp & truyền đạt ý tưởng",
  "Làm việc nhóm hiệu quả",
  "Phối hợp team Creative",
  "Quản lý công việc theo kế hoạch",
  "Nắm bắt xu hướng nhanh",
  "Duy trì quan hệ khách hàng",
] as const;

const EDUCATION = [
  {
    title: "Cử nhân Marketing Management",
    org: "Đại học Bretagne-Occidentale",
    period: "09/2022 – 11/2025",
  },
  {
    title: "VSTEP bậc 4/6 – B2",
    org: "Đại học Ngoại thương",
    period: "03/2024",
  },
  {
    title: "Content Pyramid & Content Strategy",
    org: "GIGAN Training Center",
    period: "09/2025",
  },
  {
    title: "Nghiệp vụ Sư phạm Giảng viên",
    org: "Trường Đại học Sư phạm 2",
    period: "04/2026",
  },
] as const;

const ACHIEVEMENTS = [
  {
    value: "4 lần",
    title: "Tái ký khách hàng BĐS",
    detail:
      "Hỗ trợ khách hàng bất động sản gia hạn hợp đồng branding, kéo dài đến năm 2027.",
  },
  {
    value: "~70",
    title: "Khách tham dự sự kiện",
    detail:
      "Year End Event chủ đề “Phi mã” — lên concept và điều phối tại Titan Agency.",
  },
  {
    value: "500K+",
    title: "Lượt xem video",
    detail:
      "Nội dung sản xuất cho Lạc Coffee & Desserts, Trần Sĩ Đức và các kênh đối tác.",
  },
  {
    value: "B2",
    title: "Tiếng Anh VSTEP",
    detail:
      "Chứng chỉ bậc 4/6 — đọc tài liệu và giao tiếp công việc bằng tiếng Anh.",
  },
] as const;

const SUMMARY =
  "Có kinh nghiệm trong branding, social media và content marketing. Kết hợp nghiên cứu thị trường, insight khách hàng, định hướng chiến lược và triển khai nội dung thực tế — từ campaign đa kênh, video, livestream đến sự kiện thương hiệu. Đã hỗ trợ khách hàng bất động sản tái ký 4 lần, tổ chức sự kiện khoảng 70 khách và sản xuất video đạt trên 500.000 lượt xem.";

function AbilityList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-sm leading-snug text-[var(--color-profile-body)]"
        >
          <span
            className="mt-2 h-1 w-3 shrink-0 rounded-full bg-[var(--color-profile-navy)]"
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProfileContent() {
  return (
    <section
      id="profile"
      className="relative overflow-hidden bg-[var(--color-profile-cream)] py-8 sm:py-10 md:py-14 lg:py-16"
    >
      <div className="profile-reveal mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-8 xl:grid-cols-[minmax(0,360px)_1fr]">
          {/* Profile card — left */}
          <article className="relative lg:row-span-2">
            <div className="overflow-hidden rounded-[var(--radius-profile)] bg-white shadow-[var(--shadow-profile-card)]">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/real-avatar.jpg"
                  alt="Ảnh chân dung Đinh Thị Thủy Hương"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 360px"
                  priority
                />
              </div>

              <div className="relative bg-[var(--color-profile-navy)] px-6 pb-8 pt-6 text-white md:px-7 md:pb-9">
                <p className="text-sm font-medium tracking-wide text-white/80">
                  Xin chào, tôi là
                </p>
                <h2 className="mt-1 font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.35rem)] font-extrabold leading-[1.1] tracking-tight text-balance">
                  Đinh Thị
                  <br />
                  Thủy Hương
                </h2>

                <ul className="mt-6 space-y-3.5">
                  <li>
                    <a
                      href="tel:0399814954"
                      className="group flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-white"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                        <IconPhone />
                      </span>
                      0399 814 954
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:dinhthuyhuong11@gmail.com"
                      className="group flex items-center gap-3 text-sm text-white/90 transition-colors hover:text-white"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                        <IconMail />
                      </span>
                      <span className="break-all">dinhthuyhuong11@gmail.com</span>
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white/90">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <IconBriefcase />
                    </span>
                    <span className="text-pretty leading-snug">
                      Branding Planner · Social Media · Marketing
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <a
              href="#profile-summary"
              className="absolute -right-1 top-[38%] z-10 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[var(--color-profile-cream)] bg-[var(--color-profile-navy)] text-white shadow-lg transition-transform duration-300 hover:scale-105 active:scale-[0.98] sm:-right-3 sm:top-[42%] sm:h-12 sm:w-12 md:-right-4 md:h-14 md:w-14"
              aria-label="Xem tóm tắt hồ sơ"
            >
              <IconArrowRight />
            </a>
          </article>

          {/* Main content — right */}
          <div className="flex flex-col gap-0 lg:col-start-2">
            <article className="divide-y divide-[var(--color-profile-border)] rounded-[var(--radius-profile)] border border-[var(--color-profile-border)] bg-white/90">
              {/* Tools, clients & highlights */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
                  <div className="min-w-0 lg:col-span-1">
                    <div>
                      <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--color-profile-navy)] md:text-xl">
                        Công cụ
                      </h2>
                      <div className="mt-5 flex flex-wrap gap-5 sm:gap-6">
                        {TOOLS.map((tool) => (
                          <LogoPlaceholder
                            key={tool.name}
                            name={tool.name}
                            imageSrc={tool.imageSrc}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 border-t border-[var(--color-profile-border)] pt-8">
                      <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--color-profile-navy)] md:text-xl">
                        Khách hàng & dự án
                      </h2>
                      <div className="mt-5 flex flex-wrap gap-5 sm:gap-6">
                        {CLIENTS.map((client) => (
                          <LogoPlaceholder
                            key={client.name}
                            name={client.name}
                            imageSrc={client.imageSrc}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 border-t border-[var(--color-profile-border)] pt-8 lg:col-span-2 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0 xl:pl-6">
                    <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--color-profile-navy)] md:text-xl">
                      Kết quả đạt được
                    </h2>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--color-profile-muted)] sm:text-[13px]">
                      Số liệu nổi bật từ các dự án branding, sự kiện và sản xuất
                      nội dung.
                    </p>
                    <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-4">
                      {ACHIEVEMENTS.map((item) => (
                        <li key={item.title} className="min-w-0">
                          <p className="font-[family-name:var(--font-display)] text-xl font-extrabold tabular-nums leading-none text-[var(--color-profile-navy)] sm:text-2xl">
                            {item.value}
                          </p>
                          <p className="mt-1.5 text-xs font-semibold leading-snug text-[var(--color-profile-navy)] sm:text-sm">
                            {item.title}
                          </p>
                          <p className="mt-1 text-[11px] leading-relaxed text-[var(--color-profile-body)] sm:text-xs">
                            {item.detail}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Abilities & education */}
              <div className="p-6 md:p-8">
                <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--color-profile-navy)] md:text-xl">
                  Kỹ năng nổi bật
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                  <AbilityList items={ABILITIES_LEFT} />
                  <AbilityList items={ABILITIES_RIGHT} />
                </div>

                <div className="mt-8 border-t border-[var(--color-profile-border)] pt-8">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-[var(--color-profile-navy)]">
                    Học vấn và chứng chỉ
                  </h3>
                  <ul className="mt-4 divide-y divide-[var(--color-profile-border)]">
                    {EDUCATION.map((item) => (
                      <li
                        key={item.title}
                        className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[var(--color-profile-navy)]">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs text-[var(--color-profile-muted)]">
                            {item.org}
                          </p>
                        </div>
                        <time className="shrink-0 text-xs font-medium tabular-nums text-[var(--color-profile-body)] sm:text-right">
                          {item.period}
                        </time>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Summary bar */}
        <article
          id="profile-summary"
          className="profile-reveal profile-reveal-delay-2 mt-8 rounded-[var(--radius-profile-pill)] bg-[var(--color-profile-navy)] p-6 text-white md:mt-10 md:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto] lg:gap-10">
            <p className="text-pretty text-sm leading-relaxed text-white/92 md:text-[15px]">
              {SUMMARY}
            </p>

            <div className="shrink-0 lg:self-center">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white/30 bg-white">
                <Image
                  src="/hero-avatar.png"
                  alt="Avatar Đinh Thị Thủy Hương"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
