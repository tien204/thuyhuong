import Image from "next/image";

import {
  IconBriefcase,
  IconMail,
  IconPhone,
} from "@/components/profile/ProfileIcons";

const CONTACT_ITEMS = [
  {
    label: "Điện thoại",
    value: "0399 814 954",
    href: "tel:0399814954",
    icon: IconPhone,
  },
  {
    label: "Email",
    value: "dinhthuyhuong11@gmail.com",
    href: "mailto:dinhthuyhuong11@gmail.com",
    icon: IconMail,
  },
] as const;

const ROLES = [
  "Branding Planner",
  "Social Media Executive",
  "Marketing",
] as const;

export function ContactInfoPanel() {
  return (
    <aside
      aria-label="Thông tin liên hệ trực tiếp"
      className="profile-reveal profile-reveal-delay-1 flex h-full min-h-[min(480px,62dvh)] flex-col overflow-hidden self-stretch rounded-[var(--radius-profile)] border-2 border-[var(--color-profile-navy)] bg-white shadow-[0_12px_40px_-16px_rgba(0,49,139,0.16)] lg:min-h-0"
    >
      <div className="relative shrink-0 overflow-hidden bg-[var(--color-profile-navy)] px-5 py-6 text-white sm:px-6 sm:py-7">
        <div
          className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[var(--color-green-accent)]/20 blur-2xl"
          aria-hidden
        />
        <div className="relative flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white/25 bg-white/10">
            <Image
              src="/hero-avatar.png"
              alt="Ảnh chân dung Đinh Thị Thủy Hương"
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/65">
              Liên hệ trực tiếp
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-extrabold leading-tight tracking-tight">
              Đinh Thị Thủy Hương
            </h3>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-5 py-6 sm:px-6">
        <ul className="space-y-3">
          {CONTACT_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="group flex items-start gap-3 rounded-xl border border-[var(--color-profile-border)] bg-[var(--color-profile-cream)]/35 px-4 py-3.5 transition-all duration-200 hover:border-[var(--color-profile-navy)]/30 hover:bg-[var(--color-profile-cream)]/70 active:scale-[0.99]"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-profile-navy)] text-white transition-transform duration-200 group-hover:scale-105">
                  <item.icon />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-profile-muted)]">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block break-all text-sm font-semibold text-[var(--color-profile-navy)]">
                    {item.value}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-[var(--color-profile-border)] pt-6">
          <div className="flex items-center gap-2 text-[var(--color-profile-navy)]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-profile-cream)]">
              <IconBriefcase />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.12em]">
              Vị trí quan tâm
            </p>
          </div>
          <ul className="mt-3 space-y-2">
            {ROLES.map((role) => (
              <li
                key={role}
                className="flex items-center gap-2.5 text-sm text-[var(--color-profile-body)]"
              >
                <span
                  className="h-1 w-3 shrink-0 rounded-full bg-[var(--color-green-accent)]"
                  aria-hidden
                />
                {role}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto border-t border-[var(--color-profile-border)] pt-6">
          <p className="text-[11px] leading-relaxed text-[var(--color-profile-muted)]">
            Thời gian phản hồi dự kiến trong vòng 24–48 giờ làm việc sau khi
            nhận đủ thông tin JD.
          </p>
          <a
            href="#profile"
            className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-[var(--color-profile-navy)] bg-transparent px-4 py-2.5 text-sm font-semibold text-[var(--color-profile-navy)] transition-all duration-200 hover:bg-[var(--color-profile-navy)] hover:text-white active:scale-[0.98]"
          >
            Xem hồ sơ đầy đủ
          </a>
        </div>
      </div>
    </aside>
  );
}
