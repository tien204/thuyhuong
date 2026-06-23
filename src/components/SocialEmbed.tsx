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
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (eager || !ref.current || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [visible, rootMargin, eager]);

  return { ref, visible };
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
        />
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
  const { ref: lazyRef, visible } = useLazyLoad("400px", eager);
  const { setRef: widthRef, width: measuredWidth } = useElementWidth(width);
  const embedWidth = fluid ? measuredWidth : width;

  useEffect(() => {
    if (!visible || !lazyRef.current || embedWidth < 200) return;

    const element = lazyRef.current;
    const timer = window.setTimeout(() => {
      window.FB?.XFBML?.parse(element);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [visible, href, embedWidth]);

  return (
    <div
      ref={mergeRefs(lazyRef, fluid ? widthRef : undefined)}
      className={`overflow-hidden bg-[var(--color-white)] ${fillCard ? "flex h-full w-full items-center justify-center" : "mx-auto w-full rounded-[var(--radius-md)]"} ${className}`}
      style={fluid ? undefined : fillCard ? undefined : { maxWidth: width }}
    >
      {!skipSdk ? <FacebookSDK /> : null}

      {visible ? (
        <div
          className={`fb-video [&_span]:!max-w-full ${fillCard ? "max-h-full overflow-hidden" : ""}`}
          data-href={href}
          data-width={embedWidth}
          data-show-text={showText}
          data-allowfullscreen="true"
        />
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
  const { ref: lazyRef, visible } = useLazyLoad();
  const { setRef: widthRef, width: measuredWidth } = useElementWidth(width ?? 480);
  const embedWidth = fluid ? measuredWidth : (width ?? 480);

  useEffect(() => {
    if (!visible || !lazyRef.current || embedWidth < 200) return;

    const element = lazyRef.current;
    const timer = window.setTimeout(() => {
      window.FB?.XFBML?.parse(element);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [visible, href, embedWidth]);

  return (
    <div
      ref={mergeRefs(lazyRef, fluid ? widthRef : undefined)}
      className={`mx-auto w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-white)] ${className}`}
      style={fluid ? undefined : { maxWidth: width }}
    >
      {!skipSdk ? <FacebookSDK /> : null}

      {visible ? (
        <div
          className="fb-post [&_span]:!max-w-full"
          data-href={href}
          data-width={embedWidth}
          data-show-text={showText}
        />
      ) : (
        <EmbedSkeleton label="Facebook post" className="min-h-[320px]" />
      )}
    </div>
  );
}
