"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/lib/motion";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const labels = [
  "Branding Planner",
  "Social Media Executive",
  "Marketing Intern",
] as const;

const BAR_H = 34;
const TAB_H = 108;
const TAB_RADIUS = TAB_H / 2;
const TAB_PAD_X_DESKTOP = 56;
const TAB_MIN_W_DESKTOP = 280;
const TAB_MIN_W_MOBILE = 200;

const labelClassName =
  "whitespace-nowrap font-[family-name:var(--font-display)] text-[clamp(0.62rem,2.4vw,1.55rem)] font-black leading-tight tracking-[-0.03em] sm:leading-none";

const MOVE_DURATION = 0.7;
const HOLD_DURATION = 0.85;
const EXIT_DURATION = 0.7;

export function AnimatedTextMaskDivider() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);
  const tabTextRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const tab = tabRef.current;
      const tabText = tabTextRef.current;

      if (!wrap || !tab || !tabText) return;

      let tl: gsap.core.Timeline | null = null;

      const syncTextMap = () => {
        const x = Number(gsap.getProperty(tab, "x"));
        gsap.set(tabText, { x: -x });
      };

      const measureTabWidth = () => {
        const wrapW = wrap.clientWidth;
        const isMobile = wrapW < 640;
        const padX = isMobile ? 28 : wrapW < 1024 ? 40 : TAB_PAD_X_DESKTOP;
        const minW = isMobile ? TAB_MIN_W_MOBILE : TAB_MIN_W_DESKTOP;

        const labelWidths = labelRefs.current
          .filter((el): el is HTMLSpanElement => el !== null)
          .map((el) => el.getBoundingClientRect().width);

        const maxLabelW = labelWidths.length ? Math.max(...labelWidths) : minW;

        return Math.max(maxLabelW + padX * 2, minW);
      };

      const getPositions = (tabW: number) => {
        const wrapRect = wrap.getBoundingClientRect();

        return labelRefs.current
          .map((el) => {
            if (!el) return null;

            const rect = el.getBoundingClientRect();
            const labelCenter = rect.left - wrapRect.left + rect.width / 2;

            return labelCenter - tabW / 2;
          })
          .filter((x): x is number => x !== null);
      };

      const buildAnimation = () => {
        tl?.kill();

        const wrapW = wrap.clientWidth;

        const tabW = measureTabWidth();
        const tabH = wrapW < 640 ? 96 : TAB_H;
        tab.style.width = `${tabW}px`;
        tab.style.height = `${tabH}px`;
        tab.style.borderBottomLeftRadius = `${tabH / 2}px`;
        tab.style.borderBottomRightRadius = `${tabH / 2}px`;

        tabText.style.width = `${wrapW}px`;

        const positions = getPositions(tabW);

        if (positions.length !== labels.length) return;

        if (prefersReducedMotion) {
          gsap.set(tab, { x: positions[0] });
          gsap.set(tabText, { x: -positions[0] });
          return;
        }

        const startOut = -tabW;
        const endOut = wrapW;

        gsap.set(tab, { x: startOut });
        gsap.set(tabText, { x: -startOut });

        tl = gsap.timeline({
          repeat: -1,
          defaults: {
            ease: "power2.inOut",
          },
        });

        // 1. Từ ngoài trái chạy vào label đầu
        tl.to(tab, {
          x: positions[0],
          duration: MOVE_DURATION,
          onUpdate: syncTextMap,
        });

        tl.to({}, { duration: HOLD_DURATION });

        // 2. Label 1 -> Label 2
        tl.to(tab, {
          x: positions[1],
          duration: MOVE_DURATION,
          onUpdate: syncTextMap,
        });

        tl.to({}, { duration: HOLD_DURATION });

        // 3. Label 2 -> Label 3
        tl.to(tab, {
          x: positions[2],
          duration: MOVE_DURATION,
          onUpdate: syncTextMap,
        });

        tl.to({}, { duration: HOLD_DURATION });

        // Sau label cuối, tiếp tục chạy ra hết bên phải, không reset ngay
        tl.to(tab, {
          x: endOut,
          duration: EXIT_DURATION,
          ease: "power2.in",
          onUpdate: syncTextMap,
        });

        // Khi đã ra khỏi màn hình, nhảy về ngoài trái
        tl.set(tab, {
          x: startOut,
        });

        tl.set(tabText, {
          x: -startOut,
        });
      };

      buildAnimation();

      const resizeObserver = new ResizeObserver(buildAnimation);
      resizeObserver.observe(wrap);

      window.addEventListener("resize", buildAnimation);

      return () => {
        tl?.kill();
        resizeObserver.disconnect();
        window.removeEventListener("resize", buildAnimation);
      };
    },
    { scope: wrapRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section className="relative h-[132px] w-full overflow-hidden bg-[var(--color-canvas)] sm:h-[150px]">
      <div ref={wrapRef} className="relative h-full w-full overflow-hidden">
        {/* Thanh navy trên */}
        <div
          className="absolute left-0 top-0 z-10 w-full bg-[var(--color-brand-navy)]"
          style={{ height: BAR_H }}
        />

        {/* Hàng chữ ẩn để đo vị trí */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-0 grid w-full grid-cols-3 items-center px-3 opacity-0 sm:px-[6vw] md:px-[8vw]"
          style={{ height: TAB_H }}
        >
          {labels.map((item, index) => (
            <span
              key={item}
              ref={(el) => {
                labelRefs.current[index] = el;
              }}
              className={`${labelClassName} ${
                index === 0
                  ? "justify-self-start"
                  : index === 1
                    ? "justify-self-center"
                    : "justify-self-end"
              }`}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Nửa pill navy chạy */}
        <div
          ref={tabRef}
          className="absolute left-0 top-0 z-20 min-w-[200px] overflow-hidden bg-[var(--color-brand-navy)] will-change-transform sm:min-w-[280px]"
          style={{
            height: TAB_H,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: TAB_RADIUS,
            borderBottomRightRadius: TAB_RADIUS,
          }}
        >
          {/* Chữ chỉ hiện trong vùng pill */}
          <div
            ref={tabTextRef}
            className="absolute left-0 top-0 grid w-full grid-cols-3 items-center px-3 sm:px-[6vw] md:px-[8vw]"
            style={{ height: TAB_H }}
          >
            {labels.map((item, index) => (
              <span
                key={item}
                className={`${labelClassName} text-white ${
                  index === 0
                    ? "justify-self-start"
                    : index === 1
                      ? "justify-self-center"
                      : "justify-self-end"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}