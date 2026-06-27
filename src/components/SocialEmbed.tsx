"use client";

import Image from "next/image";
import Script from "next/script";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
  type Ref,
} from "react";

declare global {
  interface Window {
    FB?: {
      XFBML?: {
        parse: (element?: Element | null) => void;
      };
    };
  }
}

function useLazyLoad(rootMargin = "400px", eager = false) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(eager);

  const ref = useCallback((node: HTMLDivElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (eager || !element || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [visible, rootMargin, eager, element]);

  return { ref, element, visible };
}

function useElementWidth(fallback = 320) {
  const [width, setWidth] = useState(fallback);
  const observerRef = useRef<ResizeObserver | null>(null);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;

    if (!node) return;

    const update = () => {
      const next = Math.floor(node.getBoundingClientRect().width);
      if (next > 0) setWidth(next);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    observerRef.current = observer;
  }, []);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return { setRef, width };
}

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(node);
      else if (ref && typeof ref === "object") {
        (ref as MutableRefObject<T | null>).current = node;
      }
    });
  };
}

function EmbedSkeleton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-surface-strong)] text-sm font-medium text-[var(--color-body)] ${className}`}
    >
      Đang tải {label}...
    </div>
  );
}

function EmbedUnavailable({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-surface-soft)] px-4 text-center text-sm text-[var(--color-body)] ${className}`}
    >
      <p className="font-medium">Không thể tải {label}</p>
      <p className="text-xs text-[var(--color-body)]/70">
        Nội dung có thể bị chặn bởi nền tảng hoặc trình duyệt.
      </p>
    </div>
  );
}

function useEmbedLoadState(active: boolean, timeoutMs = 12000) {
  const [state, setState] = useState<"loading" | "ready" | "unavailable">(
    "loading",
  );

  useEffect(() => {
    if (!active) {
      setState("loading");
      return;
    }

    setState("loading");
    const timer = window.setTimeout(() => {
      setState((current) => (current === "ready" ? "ready" : "unavailable"));
    }, timeoutMs);

    return () => window.clearTimeout(timer);
  }, [active, timeoutMs]);

  const markReady = useCallback(() => setState("ready"), []);

  return { state, markReady };
}

export function FacebookSDK() {
  return (
    <>
      <div id="fb-root" />
      <Script
        id="facebook-jssdk"
        src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v25.0"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}

export const SOCIAL_EMBED_CARD = {
  width: 300,
  height: 534,
} as const;

export function SocialEmbedCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`aspect-[300/534] w-[min(300px,calc(100vw-4.5rem))] shrink-0 overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-white)] ${className}`}
    >
      {children}
    </div>
  );
}

export function TikTokEmbed({
  videoId,
  className = "",
  fillCard = false,
  eager = false,
}: {
  videoId: string;
  className?: string;
  fillCard?: boolean;
  eager?: boolean;
}) {
  const { ref, visible } = useLazyLoad("400px", eager);
  const { state, markReady } = useEmbedLoadState(visible);

  const src =
    `https://www.tiktok.com/player/v1/${videoId}` +
    "?controls=1" +
    "&progress_bar=1" +
    "&play_button=1" +
    "&volume_control=1" +
    "&fullscreen_button=1" +
    "&music_info=0" +
    "&description=0" +
    "&rel=0" +
    "&autoplay=0";

  return (
    <div
      ref={ref}
      className={`overflow-hidden bg-[var(--color-white)] ${fillCard ? "h-full w-full" : "mx-auto w-full rounded-[var(--radius-md)]"} ${className}`}
    >
      {visible ? (
        state === "unavailable" ? (
          <EmbedUnavailable
            label="TikTok"
            className={fillCard ? "h-full" : "aspect-[9/16] min-h-0"}
          />
        ) : (
          <iframe
            src={src}
            title="TikTok video"
            className={
              fillCard
                ? "h-full w-full border-0"
                : "aspect-[9/16] h-auto w-full border-0"
            }
            allow="fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            loading={eager ? "eager" : "lazy"}
            onLoad={markReady}
          />
        )
      ) : (
        <EmbedSkeleton
          label="TikTok"
          className={fillCard ? "h-full" : "aspect-[9/16] min-h-0"}
        />
      )}
    </div>
  );
}

export function FacebookVideoEmbed({
  href,
  width = SOCIAL_EMBED_CARD.width,
  showText = false,
  className = "",
  skipSdk = false,
  fluid = false,
  fillCard = false,
  eager = false,
}: {
  href: string;
  width?: number;
  showText?: boolean;
  className?: string;
  skipSdk?: boolean;
  fluid?: boolean;
  fillCard?: boolean;
  eager?: boolean;
}) {
  const { ref: lazyRef, element, visible } = useLazyLoad("400px", eager);
  const { setRef: widthRef, width: measuredWidth } = useElementWidth(width);
  const embedWidth = fluid ? measuredWidth : width;
  const { state, markReady } = useEmbedLoadState(visible);

  useEffect(() => {
    if (!visible || !element || embedWidth < 200) return;

    let cancelled = false;

    const markIfEmbedded = () => {
      if (cancelled) return false;
      const hasIframe = element.querySelector("iframe");
      if (hasIframe) {
        markReady();
        return true;
      }
      return false;
    };

    const parseTimer = window.setTimeout(() => {
      window.FB?.XFBML?.parse(element);
    }, 300);

    const observer = new MutationObserver(() => {
      if (markIfEmbedded()) observer.disconnect();
    });
    observer.observe(element, { childList: true, subtree: true });

    return () => {
      cancelled = true;
      window.clearTimeout(parseTimer);
      observer.disconnect();
    };
  }, [visible, href, embedWidth, element, markReady]);

  return (
    <div
      ref={mergeRefs(lazyRef, fluid ? widthRef : undefined)}
      className={`overflow-hidden bg-[var(--color-white)] ${fillCard ? "flex h-full w-full items-center justify-center" : "mx-auto w-full rounded-[var(--radius-md)]"} ${className}`}
      style={fluid ? undefined : fillCard ? undefined : { maxWidth: width }}
    >
      {!skipSdk ? <FacebookSDK /> : null}

      {visible ? (
        state === "unavailable" ? (
          <EmbedUnavailable
            label="Facebook video"
            className={fillCard ? "h-full w-full" : "aspect-video min-h-[220px]"}
          />
        ) : (
          <div
            className={`fb-video [&_span]:!max-w-full ${fillCard ? "max-h-full overflow-hidden" : ""}`}
            data-href={href}
            data-width={embedWidth}
            data-show-text={showText}
            data-allowfullscreen="true"
          />
        )
      ) : (
        <EmbedSkeleton
          label="Facebook video"
          className={fillCard ? "h-full w-full" : "aspect-video min-h-[220px]"}
        />
      )}
    </div>
  );
}

function facebookReelIframeSrc(href: string, width: number) {
  const height = Math.round(width * (SOCIAL_EMBED_CARD.height / SOCIAL_EMBED_CARD.width));
  const params = new URLSearchParams({
    href,
    show_text: "false",
    width: String(width),
    height: String(height),
  });
  return `https://www.facebook.com/plugins/video.php?${params.toString()}`;
}

/** Reels: iframe plugin — ổn định hơn XFBML; vẫn có thể bị Meta chặn nhúng theo từng reel. */
export function FacebookReelEmbed({
  href,
  width = SOCIAL_EMBED_CARD.width,
  className = "",
  fillCard = false,
  eager = false,
}: {
  href: string;
  width?: number;
  className?: string;
  fillCard?: boolean;
  eager?: boolean;
}) {
  const { ref: lazyRef, visible } = useLazyLoad("400px", eager);
  const { setRef: widthRef, width: measuredWidth } = useElementWidth(width);
  const embedWidth = Math.max(measuredWidth, 200);
  const embedHeight = Math.round(
    embedWidth * (SOCIAL_EMBED_CARD.height / SOCIAL_EMBED_CARD.width),
  );

  return (
    <div
      ref={mergeRefs(lazyRef, widthRef)}
      className={`flex h-full w-full flex-col overflow-hidden bg-[var(--color-white)] ${className}`}
    >
      <div
        className={`relative min-h-0 flex-1 ${fillCard ? "" : "rounded-[var(--radius-md)]"}`}
      >
        {visible ? (
          <iframe
            src={facebookReelIframeSrc(href, embedWidth)}
            title="Facebook Reel"
            width={embedWidth}
            height={embedHeight}
            className="absolute inset-0 h-full w-full border-0"
            scrolling="no"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            loading={eager ? "eager" : "lazy"}
          />
        ) : (
          <EmbedSkeleton label="Facebook Reel" className="h-full w-full" />
        )}
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary-outlined mx-2 mb-2 mt-1.5 shrink-0 px-3 py-1.5 text-[11px] sm:text-xs"
      >
        Xem trên Facebook
      </a>
    </div>
  );
}

/** Poster tĩnh + mở reel trên Facebook — dùng khi Meta chặn nhúng iframe. */
export function FacebookReelPosterCard({
  href,
  posterSrc,
  posterAlt,
  eager = false,
}: {
  href: string;
  posterSrc: string;
  posterAlt: string;
  eager?: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[var(--color-white)]">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative min-h-0 flex-1 overflow-hidden"
      >
        <Image
          src={posterSrc}
          alt={posterAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="300px"
          priority={eager}
        />
        <span className="absolute inset-0 flex items-center justify-center bg-[rgba(21,42,64,0.28)] transition-colors duration-300 group-hover:bg-[rgba(21,42,64,0.38)]">
          <span className="rounded-[var(--radius-pill)] bg-[var(--color-white)] px-4 py-2 text-xs font-semibold text-[var(--color-primary-ink)] shadow-[var(--shadow-card)]">
            Phát trên Facebook
          </span>
        </span>
      </a>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary-outlined mx-2 mb-2 mt-1.5 shrink-0 px-3 py-1.5 text-[11px] sm:text-xs"
      >
        Xem trên Facebook
      </a>
    </div>
  );
}

export function FacebookPostEmbed({
  href,
  width,
  showText = true,
  className = "",
  skipSdk = false,
  fluid = true,
  fillCard = false,
  eager = false,
}: {
  href: string;
  width?: number;
  showText?: boolean;
  className?: string;
  skipSdk?: boolean;
  fluid?: boolean;
  fillCard?: boolean;
  eager?: boolean;
}) {
  const { ref: lazyRef, element, visible } = useLazyLoad("400px", eager);
  const { setRef: widthRef, width: measuredWidth } = useElementWidth(width ?? 480);
  const embedWidth = fluid ? measuredWidth : (width ?? 480);
  const { state, markReady } = useEmbedLoadState(visible);

  useEffect(() => {
    if (!visible || !element || embedWidth < 200) return;

    let cancelled = false;

    const markIfEmbedded = () => {
      if (cancelled) return false;
      const hasIframe = element.querySelector("iframe");
      if (hasIframe) {
        markReady();
        return true;
      }
      return false;
    };

    const parseTimer = window.setTimeout(() => {
      window.FB?.XFBML?.parse(element);
    }, 300);

    const observer = new MutationObserver(() => {
      if (markIfEmbedded()) observer.disconnect();
    });
    observer.observe(element, { childList: true, subtree: true });

    return () => {
      cancelled = true;
      window.clearTimeout(parseTimer);
      observer.disconnect();
    };
  }, [visible, href, embedWidth, element, markReady]);

  return (
    <div
      ref={mergeRefs(lazyRef, fluid ? widthRef : undefined)}
      className={`overflow-hidden bg-[var(--color-white)] ${fillCard ? "flex h-full w-full items-center justify-center" : "mx-auto w-full rounded-[var(--radius-md)]"} ${className}`}
      style={fluid && !fillCard ? undefined : fillCard ? undefined : { maxWidth: width }}
    >
      {!skipSdk ? <FacebookSDK /> : null}

      {visible ? (
        state === "unavailable" ? (
          <EmbedUnavailable
            label="Facebook post"
            className={fillCard ? "h-full w-full" : "min-h-[320px]"}
          />
        ) : (
          <div
            className={`fb-post [&_span]:!max-w-full ${fillCard ? "max-h-full overflow-hidden" : ""}`}
            data-href={href}
            data-width={embedWidth}
            data-show-text={showText}
          />
        )
      ) : (
        <EmbedSkeleton
          label="Facebook post"
          className={fillCard ? "h-full w-full" : "min-h-[320px]"}
        />
      )}
    </div>
  );
}
