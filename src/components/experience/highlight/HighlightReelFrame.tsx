"use client";

import {
  FacebookReelEmbed,
  FacebookReelPosterCard,
  FacebookVideoEmbed,
  TikTokEmbed,
  TikTokPostEmbed,
} from "@/components/SocialEmbed";
import type { HighlightMedia } from "@/components/experience/highlight/highlight-data";
import { cn } from "@/lib/utils";

type HighlightReelFrameProps = {
  channelName: string;
  caption?: string;
  captionLines?: string[];
  media: HighlightMedia;
  className?: string;
  /** Satellite card — wider min width for readable TikTok preview */
  variant?: "featured" | "satellite";
};

export function HighlightReelFrame({
  channelName,
  caption,
  captionLines,
  media,
  className,
  variant = "featured",
}: HighlightReelFrameProps) {
  const captionContent =
    captionLines && captionLines.length > 0
      ? captionLines
      : caption
        ? [caption]
        : [];

  const isSatellite = variant === "satellite";

  return (
    <div
      className={cn(
        "relative mx-auto w-full shrink-0 overflow-hidden rounded-[var(--radius-profile)] border border-[var(--color-hairline)] bg-[var(--color-secondary)] shadow-[var(--shadow-card)]",
        isSatellite
          ? "max-w-[200px]"
          : "max-w-[220px] sm:max-w-[200px]",
        className,
      )}
    >
      <div className="relative aspect-[9/16] w-full">
        <div className="absolute inset-0 z-0 [&_.btn]:hidden">
          <HighlightMediaEmbed media={media} />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[rgba(21,42,64,0.55)] to-transparent px-3 pb-8 pt-3">
          <p className="truncate text-[11px] font-semibold text-white sm:text-xs">
            {channelName}
          </p>
        </div>

        {captionContent.length > 0 ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[rgba(21,42,64,0.78)] via-[rgba(21,42,64,0.35)] to-transparent px-3 pb-3 pt-10">
            {captionContent.map((line) => (
              <p
                key={line}
                className="text-[11px] leading-snug text-white/95 sm:text-xs"
              >
                {line}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function HighlightMediaEmbed({ media }: { media: HighlightMedia }) {
  if (media.type === "tiktok") {
    return <TikTokEmbed videoId={media.videoId} fillCard eager />;
  }

  if (media.type === "tiktok-photo") {
    return (
      <TikTokPostEmbed
        postId={media.postId}
        href={media.href}
        fillCard
        eager
      />
    );
  }

  if (media.type === "facebook-video") {
    return (
      <FacebookVideoEmbed
        href={media.href}
        fillCard
        fluid
        showText={false}
        skipSdk={false}
        eager
        className="h-full"
      />
    );
  }

  if (media.posterOnly && media.posterSrc) {
    return (
      <FacebookReelPosterCard
        href={media.href}
        posterSrc={media.posterSrc}
        posterAlt="Facebook Reel"
        eager
      />
    );
  }

  return (
    <FacebookReelEmbed
      href={media.href}
      fillCard
      eager
      showFooterLink={false}
    />
  );
}
