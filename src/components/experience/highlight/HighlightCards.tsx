import { BadgeCheck, Coffee, Globe, Target } from "lucide-react";
import { HighlightReelFrame } from "@/components/experience/highlight/HighlightReelFrame";
import {
  HIGHLIGHT_BADGE,
  type HighlightFeaturedChannel,
  type HighlightSatelliteChannel,
} from "@/components/experience/highlight/highlight-data";

function HighlightBadge() {
  return (
    <span className="inline-flex rounded-[var(--radius-pill)] bg-[var(--color-brand-mist-sky)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-primary)] sm:px-3 sm:text-[11px]">
      {HIGHLIGHT_BADGE}
    </span>
  );
}

function HighlightStats({
  stats,
  variant = "boxed",
}: {
  stats: HighlightFeaturedChannel["stats"];
  variant?: "boxed" | "inline";
}) {
  if (variant === "inline") {
    return (
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <div key={label} className="min-w-0 text-center">
            <Icon
              className="mx-auto h-4 w-4 text-[var(--color-primary)] sm:h-[18px] sm:w-[18px]"
              strokeWidth={1.75}
            />
            <p className="mt-2 font-[family-name:var(--font-display)] text-sm font-extrabold tabular-nums leading-none text-[var(--color-primary-ink)] sm:text-base">
              {value}
            </p>
            <p className="mt-1 text-[10px] leading-snug text-[var(--color-body)] sm:text-[11px]">
              {label}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {stats.map(({ icon: Icon, value, label }) => (
        <div
          key={label}
          className="rounded-xl border border-[var(--color-hairline)] bg-[var(--color-white)] px-2 py-3 text-center sm:rounded-2xl sm:px-3 sm:py-4"
        >
          <Icon
            className="mx-auto h-4 w-4 text-[var(--color-primary)] sm:h-[18px] sm:w-[18px]"
            strokeWidth={1.75}
          />
          <p className="mt-2 font-[family-name:var(--font-display)] text-sm font-extrabold tabular-nums leading-none text-[var(--color-primary-ink)] sm:text-base">
            {value}
          </p>
          <p className="mt-1 text-[10px] leading-snug text-[var(--color-body)] sm:text-[11px]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

function RolePills({ roles }: { roles: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <li
          key={role}
          className="rounded-[var(--radius-pill)] bg-[var(--color-brand-mist-sky)] px-3 py-1.5 text-xs font-medium text-[var(--color-primary-ink)] sm:text-[13px]"
        >
          {role}
        </li>
      ))}
    </ul>
  );
}

export function HighlightFeaturedCard({
  channel,
}: {
  channel: HighlightFeaturedChannel;
}) {
  return (
    <article className="rounded-[var(--radius-profile)] border border-[var(--color-hairline)] bg-[var(--color-white)] p-4 shadow-[var(--shadow-profile-card)] sm:p-5 lg:p-6">
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)] lg:items-start lg:gap-5 xl:gap-6">
        <HighlightReelFrame
          channelName={channel.name}
          caption={channel.caption}
          media={channel.media}
        />

        <div className="min-w-0">
          <HighlightBadge />

          <div className="mt-3 flex items-start gap-2">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold leading-tight text-[var(--color-primary)] sm:text-xl">
              {channel.name}
            </h3>
            <BadgeCheck
              className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]"
              strokeWidth={2}
              aria-hidden
            />
          </div>

          <p className="mt-1.5 text-sm font-medium text-[var(--color-primary)]/85">
            {channel.subtitle}
          </p>

          <div className="mt-5">
            <p className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary-ink)]">
              <Target
                className="h-4 w-4 shrink-0 text-[var(--color-primary)]"
                strokeWidth={1.75}
              />
              {channel.contentTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
              {channel.contentDescription}
            </p>
          </div>

          <div className="mt-5">
            <HighlightStats stats={channel.stats} />
          </div>

          <div className="mt-5 border-t border-[var(--color-hairline)] pt-5">
            <p className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary-ink)]">
              <Globe
                className="h-4 w-4 shrink-0 text-[var(--color-primary)]"
                strokeWidth={1.75}
              />
              Vai trò & trách nhiệm
            </p>
            <div className="mt-3">
              <RolePills roles={channel.roles} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function HighlightSatelliteCard({
  channel,
}: {
  channel: HighlightSatelliteChannel;
}) {
  return (
    <article className="rounded-[var(--radius-profile)] border border-[var(--color-hairline)] bg-[var(--color-white)] p-4 shadow-[var(--shadow-profile-card)] sm:p-5 lg:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(180px,200px)_minmax(0,1fr)] lg:items-center lg:gap-6 xl:gap-10">
        <div className="min-w-0 lg:order-1">
          <div className="flex items-start gap-4 sm:gap-5">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-mist-sky)] text-[var(--color-primary)] sm:h-16 sm:w-16"
              aria-hidden
            >
              <Coffee className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.5} />
            </div>

            <div className="min-w-0 flex-1">
              <span className="inline-flex rounded-[var(--radius-pill)] bg-[var(--color-brand-mist-sky)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-primary)] sm:px-3 sm:text-[11px]">
                {channel.badge}
              </span>

              <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-extrabold leading-tight text-[var(--color-primary)] sm:text-2xl">
                {channel.name}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-[var(--color-primary)]/85">
                {channel.subtitle}
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[var(--color-body)]">
            {channel.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {channel.highlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-[var(--color-hairline)] bg-[var(--color-white)] px-3 py-1.5 text-xs font-medium text-[var(--color-primary-ink)]"
              >
                <Icon
                  className="h-3.5 w-3.5 text-[var(--color-primary)]"
                  strokeWidth={1.75}
                />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <HighlightReelFrame
          channelName={channel.name}
          captionLines={channel.captionLines}
          media={channel.media}
          variant="satellite"
          className="order-2 lg:order-2 lg:justify-self-center"
        />

        <div className="min-w-0 order-3 lg:order-3 lg:border-l lg:border-[var(--color-hairline)] lg:pl-8">
          <HighlightStats stats={channel.stats} variant="boxed" />

          <div className="mt-6 border-t border-[var(--color-hairline)] pt-6">
            <p className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary-ink)]">
              <Globe
                className="h-4 w-4 shrink-0 text-[var(--color-primary)]"
                strokeWidth={1.75}
              />
              {channel.operationTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
              {channel.operationDescription}
            </p>
            <div className="mt-4">
              <RolePills roles={channel.roles} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
