import type { ReactNode } from "react";

type ExperienceSectionBarProps = {
  label: string;
  description: string;
  children: ReactNode;
  contentClassName?: string;
  compact?: boolean;
};

export function ExperienceSectionBar({
  label,
  description,
  children,
  contentClassName = "",
  compact = false,
}: ExperienceSectionBarProps) {
  return (
    <section
      className={`bg-[var(--color-canvas)] ${compact ? "pb-5 pt-0 sm:pb-8" : "pb-8 pt-2 sm:pb-12"}`}
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-stretch gap-2 sm:items-center sm:gap-6">
          <span
            className="hidden h-3 w-3 shrink-0 self-center rounded-full bg-[var(--color-primary)] sm:block sm:h-3.5 sm:w-3.5"
            aria-hidden
          />

          <div className="shadow-frap flex min-w-0 flex-1 flex-col gap-2 rounded-[var(--radius-pill)] bg-[var(--color-primary)] px-3 py-2.5 sm:flex-row sm:items-center sm:gap-5 sm:px-7 sm:py-4 md:px-8">
            <span className="shadow-card w-fit max-w-full shrink-0 rounded-[var(--radius-pill)] bg-[var(--color-white)] px-3 py-1.5 font-[family-name:var(--font-display)] text-xs font-bold tracking-tight text-[var(--color-primary-ink)] sm:px-8 sm:py-3 sm:text-lg">
              {label}
            </span>

            <p className="min-w-0 font-[family-name:var(--font-display)] text-xs italic leading-snug text-[var(--color-on-primary)] line-clamp-2 sm:line-clamp-none sm:flex-1 sm:text-base md:text-lg">
              {description}
            </p>
          </div>

          <span
            className="hidden h-3 w-3 shrink-0 self-center rounded-full bg-[var(--color-primary)] sm:block sm:h-3.5 sm:w-3.5"
            aria-hidden
          />
        </div>

        <div
          className={`mt-3 overflow-hidden rounded-[var(--radius-profile)] border border-[var(--color-hairline)] bg-[var(--color-surface-soft)] p-2 sm:mt-6 sm:p-6 sm:py-8 lg:p-8 ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
