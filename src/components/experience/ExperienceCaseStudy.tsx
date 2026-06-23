"use client";

import Image from "next/image";

export function ExperienceCaseStudy() {
  return (
    <section className="overflow-x-hidden bg-[var(--color-canvas)] pb-12 md:pb-20">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-[24px] bg-[var(--color-surface-soft)] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:rounded-[32px] sm:p-7 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:items-start xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
            <div className="min-w-0">
              <p className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,4vw,2rem)] font-extrabold leading-tight text-[var(--color-primary)]">
                Thêu hoa dệt gấm
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--color-legal-link)] sm:text-base">
                here.olong
              </p>

              <div className="relative mt-5 min-h-[280px] overflow-hidden sm:mt-6 sm:min-h-[400px] sm:overflow-visible">
                <div className="relative z-10 mx-auto max-w-[min(100%,420px)] rotate-[-2deg] rounded-[16px] border border-[var(--color-border-strong)] bg-[var(--color-canvas)] p-3 shadow-[0_18px_35px_rgba(0,0,0,0.12)] sm:rounded-[20px] sm:p-5">
                  <div className="absolute left-6 top-[-10px] h-5 w-8 rounded-t-md bg-[var(--color-surface-strong)] sm:left-8" />
                  <div className="absolute right-6 top-[-10px] h-5 w-8 rounded-t-md bg-[var(--color-surface-strong)] sm:right-8" />

                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:rounded-[16px]">
                    <Image
                      src="/theuhoadetgam/main.jpg"
                      alt="Campaign Thêu hoa dệt gấm — here.olong Tết Bính Ngọ 2026"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 420px) 100vw, 420px"
                      priority
                    />
                  </div>
                </div>

                <div className="pointer-events-none absolute -right-2 top-[42%] z-[15] h-[200px] w-[170px] sm:-right-28 sm:top-[38%] sm:h-[420px] sm:w-[360px] lg:-right-32">
                  <Image
                    src="/theuhoadetgam/lynuoc.png"
                    alt="Ly nước Thêu hoa dệt gấm — here.olong"
                    fill
                    className="object-contain object-right-bottom"
                    sizes="(max-width: 640px) 170px, 360px"
                  />
                </div>

                <div className="relative z-20 -mt-10 ml-0 h-[200px] w-full max-w-full sm:-mt-20 sm:h-[320px] sm:max-w-[500px]">
                  <Image
                    src="/theuhoadetgam/laptop.png"
                    alt="Mockup social here.olong trên laptop"
                    fill
                    className="object-contain object-left-bottom"
                    sizes="(max-width: 640px) 100vw, 500px"
                  />
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="max-w-none lg:ml-auto lg:max-w-[360px]">
                <p className="text-sm leading-relaxed text-[var(--color-body)]">
                  Section này được dựng theo bố cục editorial của board trình bày
                  campaign. Các vùng có hình ảnh thật được thay bằng placeholder
                  để giữ cấu trúc layout trước khi gắn asset chính thức.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-body)]">
                  Trọng tâm là một hero poster lớn, stamp mockup bên phải và bộ
                  deliverables trải rộng phía dưới để thể hiện hệ sinh thái ấn
                  phẩm của dự án.
                </p>

                <div className="mt-6 flex justify-center sm:mt-8 lg:justify-start">
                  <div className="relative h-[180px] w-[150px] sm:h-[220px] sm:w-[180px]">
                    <Image
                      src="/theuhoadetgam/tui.png"
                      alt="Túi thêu hoa dệt gấm — here.olong"
                      fill
                      className="object-contain object-center"
                      sizes="180px"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <div className="relative mx-auto max-w-[260px] overflow-hidden sm:ml-auto sm:max-w-[320px] sm:overflow-visible">
                  <div className="relative z-0 ml-auto w-full max-w-[220px] rotate-[-2deg] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-[0_14px_30px_rgba(0,0,0,0.16)] sm:max-w-[260px]">
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src="/theuhoadetgam/hereolong/outside.png"
                        alt="here.olong — ngoại cảnh cửa hàng"
                        fill
                        className="object-cover object-center"
                        sizes="260px"
                      />
                    </div>
                  </div>

                  <div className="relative z-10 -mt-28 -ml-6 w-full max-w-[220px] rotate-[2deg] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-[0_20px_40px_rgba(0,0,0,0.22)] sm:-mt-60 sm:-ml-36 sm:max-w-[260px]">
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src="/theuhoadetgam/hereolong/inside.webp"
                        alt="here.olong — không gian nội thất"
                        fill
                        className="object-cover object-center"
                        sizes="260px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
