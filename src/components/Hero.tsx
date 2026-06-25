import Image from "next/image";

export function Hero() {
  return (
    <section
      aria-label="Portfolio hero"
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[var(--color-hero-navy)]"
    >
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-90"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="relative mx-auto w-fit max-w-full pl-0 sm:pl-[4%]">
          <p className="mb-1 font-[family-name:var(--font-display)] text-[9px] font-extrabold uppercase italic tracking-[0.18em] text-white sm:mb-2 sm:text-[11px] sm:tracking-[0.32em]">
            Viet Nam / Thủy Hương
          </p>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,12vw,7.5rem)] font-extrabold leading-[0.84] tracking-[-0.04em] sm:text-[clamp(3.25rem,14vw,10rem)] sm:font-black sm:leading-[0.82] sm:tracking-[-0.045em] lg:text-[clamp(3.5rem,16vw,13rem)]">
            <span className="block text-white">PORTA</span>
            <span className="flex items-end text-[var(--color-hero-ink)]">
              <span>FOLI</span>
              <span className="relative inline-block overflow-visible">
                <span className="invisible select-none" aria-hidden>
                  O
                </span>
                <span
                  className="absolute bottom-0 left-1/2 w-[1.15em] -translate-x-1/2"
                  aria-hidden
                >
                  <span className="relative block translate-y-[0.2em]">
                    <Image
                      src="/hero-avatar.png"
                      alt=""
                      width={400}
                      height={400}
                      priority
                      className="mx-auto block h-[1.3em] w-auto max-w-none object-contain"
                    />
                    <span className="pointer-events-none absolute left-1/2 top-[96%] -translate-x-1/2 whitespace-nowrap font-[family-name:var(--font-caveat)] text-[0.15em] leading-normal tracking-[0.14em] text-white">
                      2026
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
