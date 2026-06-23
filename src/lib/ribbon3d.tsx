"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

export interface Ribbon3dConfig {
  number: string;
  tag: string;
  ribbonText: string;
}

const RibbonCanvas = dynamic(
  () => import("./ribbon3d-canvas").then((m) => m.RibbonCanvas),
  { ssr: false },
);

function LazyRibbonCanvas({ ribbonText }: { ribbonText: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={mountRef} className="h-full w-full" aria-hidden>
      {shouldMount ? <RibbonCanvas ribbonText={ribbonText} /> : null}
    </div>
  );
}

export function Ribbon3d({ number, tag, ribbonText }: Ribbon3dConfig) {
  return (
    <header className="relative isolate w-full overflow-hidden bg-[var(--color-canvas)]">
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[min(48vw,380px)] min-h-[260px] w-screen -translate-x-1/2">
        <div className="h-full w-[125vw] translate-x-[2vw] scale-[1.05] origin-[84%_45%]">
          <LazyRibbonCanvas ribbonText={ribbonText} />
        </div>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[1280px]">
        <div className="relative h-[min(42vw,320px)] min-h-[220px] sm:min-h-[260px] md:min-h-[300px]">
          <div className="absolute left-0 top-[14%] z-30 flex max-w-[calc(100%-2rem)] flex-col items-start gap-2 pl-4 sm:top-[16%] sm:max-w-none sm:flex-row sm:items-center sm:gap-4 sm:pl-6 md:pl-8">
            <span className="font-[family-name:var(--font-ribbon)] text-[clamp(2.25rem,10vw,5.5rem)] font-black leading-none tracking-[-0.04em] text-[var(--color-primary)]">
              {number}
            </span>
            <span className="max-w-full rounded-full border-2 border-[var(--color-primary)] px-3 py-1 font-[family-name:var(--font-ribbon)] text-[11px] font-black leading-tight tracking-[0.06em] text-[var(--color-primary)] sm:px-5 sm:py-1.5 sm:text-base sm:tracking-[0.08em]">
              {tag}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
