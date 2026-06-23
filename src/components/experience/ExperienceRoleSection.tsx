import Image from "next/image";

export type ExperienceRoleMetric = {
  value: string;
  label: string;
};

export type ExperienceRoleSectionProps = {
  role: string;
  company: string;
  period: string;
  logo: { src: string; alt: string };
  responsibilities: readonly string[];
  skills: readonly string[];
  metrics?: readonly ExperienceRoleMetric[];
  reversed?: boolean;
};

function ResponsibilityList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--color-body)]"
        >
          <span
            className="mt-2 h-1 w-3 shrink-0 rounded-full bg-[var(--color-primary)]"
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function SkillTags({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((skill) => (
        <li
          key={skill}
          className="rounded-[var(--radius-pill)] border border-[var(--color-hairline)] bg-[var(--color-white)] px-3 py-1.5 text-xs font-medium text-[var(--color-primary)]"
        >
          {skill}
        </li>
      ))}
    </ul>
  );
}

export function ExperienceRoleSection({
  role,
  company,
  period,
  logo,
  responsibilities,
  skills,
  metrics,
  reversed = false,
}: ExperienceRoleSectionProps) {
  return (
    <section className="bg-[var(--color-canvas)] pb-10 pt-2 sm:pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-[var(--color-hairline)]/80 bg-[var(--color-surface-soft)] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.05)] sm:rounded-[32px] sm:p-7 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,1.1fr)] lg:items-start lg:gap-12">
            <div className={reversed ? "lg:col-start-2" : "lg:pr-4"}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-legal-link)]">
                Nhiệm vụ chính
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.25rem,2.2vw,1.65rem)] font-extrabold leading-tight tracking-tight text-[var(--color-primary)]">
                {role}
              </h2>

              <div className="mt-6">
                <ResponsibilityList items={responsibilities} />
              </div>

              <div className="mt-8 border-t border-[var(--color-hairline)] pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                  Kỹ năng
                </p>
                <div className="mt-3">
                  <SkillTags items={skills} />
                </div>
              </div>
            </div>

            <aside
              className={`relative lg:sticky lg:top-8 ${
                reversed ? "lg:col-start-1 lg:row-start-1 lg:-mr-2" : "lg:-ml-2"
              }`}
            >
              <div className="rounded-[24px] border border-[var(--color-border-strong)] bg-[var(--color-canvas)] p-6 shadow-[0_12px_28px_rgba(0,0,0,0.08)] sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-white)] p-2 sm:h-[72px] sm:w-[72px]">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={56}
                      height={56}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <time className="shrink-0 rounded-[var(--radius-pill)] bg-[var(--color-green-light)] px-3 py-1.5 text-[11px] font-semibold tabular-nums text-[var(--color-green-house)] sm:text-xs">
                    {period}
                  </time>
                </div>

                <p className="mt-5 font-[family-name:var(--font-display)] text-2xl font-extrabold leading-tight tracking-tight text-[var(--color-primary)] sm:text-[1.65rem]">
                  {company}
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--color-body)]">
                  {role}
                </p>

                {metrics && metrics.length > 0 ? (
                  <div className="mt-6 grid grid-cols-3 gap-1.5 border-t border-[var(--color-hairline)] pt-6 sm:gap-2">
                    {metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl bg-[var(--color-white)] px-1.5 py-2.5 text-center sm:rounded-2xl sm:px-2 sm:py-3"
                      >
                        <p className="font-[family-name:var(--font-display)] text-base font-extrabold tabular-nums leading-none text-[var(--color-primary)] sm:text-xl">
                          {metric.value}
                        </p>
                        <p className="mt-1 text-[9px] font-medium leading-snug text-[var(--color-body)] sm:mt-1.5 sm:text-[10px]">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
