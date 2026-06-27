"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Eye, ThumbsUp, TrendingUp } from "lucide-react";

const ECLIPSE_REEL_HREF = "https://www.facebook.com/reel/1130967974723286";

const STATS = [
  { icon: Eye, value: "1,3 triệu+", label: "Reach ads" },
  { icon: ThumbsUp, value: "52K+", label: "Lượt thích" },
  { icon: TrendingUp, value: "8,6%", label: "Tỷ lệ chuyển đổi" },
] as const;

function useLazyVisible(eager = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (eager || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [eager]);

  return { ref, visible };
}

function useContainerWidth(fallback = 480) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const update = () => {
      const next = Math.floor(node.getBoundingClientRect().width);
      if (next > 0) setWidth(next);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}

function eclipseReelIframeSrc(href: string, width: number) {
  const height = Math.round(width * 0.5625);
  const params = new URLSearchParams({
    href,
    show_text: "false",
    width: String(width),
    height: String(height),
  });
  return `https://www.facebook.com/plugins/video.php?${params.toString()}`;
}

export function EclipseClothingReelAside() {
  const { ref: lazyRef, visible } = useLazyVisible(true);
  const { ref: widthRef, width } = useContainerWidth(480);
  const mergeRef = useCallback(
    (node: HTMLDivElement | null) => {
      lazyRef.current = node;
      widthRef.current = node;
    },
    [lazyRef, widthRef],
  );

  const embedWidth = Math.max(width, 280);
  const embedHeight = Math.round(embedWidth * 0.5625);

  return (
    <div className="w-full min-w-0">
      <div
        ref={mergeRef}
        className="relative overflow-hidden rounded-[var(--radius-profile)] border border-[var(--color-hairline)] bg-[var(--color-secondary)] shadow-[var(--shadow-card)]"
      >
        <div
          className="relative w-full bg-[var(--color-secondary)]"
          style={{ aspectRatio: "16 / 9", minHeight: embedHeight }}
        >
          {visible ? (
            <iframe
              src={eclipseReelIframeSrc(ECLIPSE_REEL_HREF, embedWidth)}
              title="Eclipse Clothing — Facebook Reel"
              width={embedWidth}
              height={embedHeight}
              className="absolute inset-0 h-full w-full border-0"
              scrolling="no"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              loading="eager"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-white/70">
              Đang tải reel...
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold leading-snug text-[var(--color-primary-ink)] sm:text-lg">
          Vẻ đẹp của sự thanh lịch
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
          Tự chạy ads cho reel{" "}
          <a
            href={ECLIPSE_REEL_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--color-primary)] underline-offset-2 hover:underline"
          >
            Eclipse Clothing
          </a>{" "}
          và đạt reach{" "}
          <strong className="font-semibold text-[var(--color-primary-ink)]">
            1,3 triệu
          </strong>{" "}
          lượt tiếp cận.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
        {STATS.map(({ icon: Icon, value, label }) => (
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

      <a
        href={ECLIPSE_REEL_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary mt-4 flex w-full items-center justify-center gap-2 py-2.5 text-sm sm:mt-5"
      >
        <svg
          className="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
        </svg>
        Xem chi tiết trên Facebook
      </a>
    </div>
  );
}
