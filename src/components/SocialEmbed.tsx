"use client";

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

export function FacebookPostEmbed({
  href,
  width,
  showText = true,
  className = "",
  skipSdk = false,
  fluid = true,
}: {
  href: string;
  width?: number;
  showText?: boolean;
  className?: string;
  skipSdk?: boolean;
  fluid?: boolean;
}) {
  const { ref: lazyRef, element, visible } = useLazyLoad();
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
      className={`mx-auto w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-white)] ${className}`}
      style={fluid ? undefined : { maxWidth: width }}
    >
      {!skipSdk ? <FacebookSDK /> : null}

      {visible ? (
        state === "unavailable" ? (
          <EmbedUnavailable label="Facebook post" className="min-h-[320px]" />
        ) : (
          <div
            className="fb-post [&_span]:!max-w-full"
            data-href={href}
            data-width={embedWidth}
            data-show-text={showText}
          />
        )
      ) : (
        <EmbedSkeleton label="Facebook post" className="min-h-[320px]" />
      )}
    </div>
  );
}
