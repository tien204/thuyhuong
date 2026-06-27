"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { CaseStudySectionBar } from "@/components/experience/CaseStudySectionBar";
import { ExperienceCaseStudy } from "@/components/experience/ExperienceCaseStudy";
import { MoodboardSectionBar } from "@/components/experience/MoodboardSectionBar";
import { PhiMaEventChecklistSectionBar } from "@/components/experience/PhiMaEventChecklistSectionBar";
import { PhiMaEventProposalSectionBar } from "@/components/experience/PhiMaEventProposalSectionBar";
import { PhiMaEventSocialSectionBar } from "@/components/experience/PhiMaEventSocialSectionBar";
import { RebrandCocoNamaSectionBar } from "@/components/experience/RebrandCocoNamaSectionBar";
import { cn } from "@/lib/utils";

type ProjectId = "content" | "event" | "branding";

const PROJECTS: {
  id: ProjectId;
  label: string;
  shortLabel: string;
  imageSrc: string;
  imageAlt: string;
}[] = [
  {
    id: "content",
    label: "Nhà sáng tạo nội dung",
    shortLabel: "Sáng tạo nội dung",
    imageSrc: "/feature01/contentcreator.png",
    imageAlt: "Nhà sáng tạo nội dung — dự án tại Titan Agency",
  },
  {
    id: "event",
    label: "Tổ chức sự kiện",
    shortLabel: "Tổ chức sự kiện",
    imageSrc: "/feature01/sukien.png",
    imageAlt: "Tổ chức sự kiện — Year End Event Phi Mã tại Titan Agency",
  },
  {
    id: "branding",
    label: "Định vị thương hiệu",
    shortLabel: "Định vị thương hiệu",
    imageSrc: "/feature01/rebrand.png",
    imageAlt: "Định vị thương hiệu — Rebrand Coco Nama",
  },
];

function ProjectPanels({ selected }: { selected: ProjectId }) {
  if (selected === "content") {
    return (
      <>
        <ExperienceCaseStudy embedded />
        <CaseStudySectionBar />
        <MoodboardSectionBar />
      </>
    );
  }

  if (selected === "branding") {
    return (
      <>
        <RebrandCocoNamaSectionBar />
        <MoodboardSectionBar />
      </>
    );
  }

  if (selected === "event") {
    return (
      <>
        <PhiMaEventProposalSectionBar />
        <PhiMaEventSocialSectionBar />
        <PhiMaEventChecklistSectionBar />
      </>
    );
  }

  return null;
}

export function FeaturedProjectsSection() {
  const [selected, setSelected] = useState<ProjectId | null>(null);

  const handleSelect = (id: ProjectId) => {
    setSelected((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (!selected) return;

    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById("featured-project-panels")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [selected]);

  return (
    <>
      <section
        className="bg-[var(--color-canvas)] pb-4 pt-0 sm:pb-6"
        aria-label="Featured Projects"
      >
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-[var(--radius-profile)] border border-[var(--color-hairline)] bg-[var(--color-white)] p-4 shadow-[var(--shadow-profile-card)] sm:p-6 md:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--color-primary)] sm:h-11 sm:w-11">
                  <div className="absolute inset-0 rounded-full bg-[var(--color-accent)]" />
                  <Star
                    className="relative z-10 h-4 w-4 sm:h-5 sm:w-5"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[var(--color-primary-ink)] md:text-xl">
                    Featured Projects
                  </h2>
                  <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-body)] sm:text-sm">
                    <span className="sm:hidden">Dự án tiêu biểu tại Titan Agency.</span>
                    <span className="hidden sm:inline">
                      Một số dự án tiêu biểu tại Titan Agency.
                    </span>
                  </p>
                </div>
              </div>

              <div
                className="flex items-center gap-1.5 sm:shrink-0 sm:pt-1"
                role="tablist"
                aria-label="Danh mục dự án"
              >
                {PROJECTS.map((project) => (
                  <span
                    key={project.id}
                    role="tab"
                    aria-selected={selected === project.id}
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors duration-200",
                      selected === project.id
                        ? "bg-[var(--color-primary)]"
                        : "bg-[var(--color-hairline)]",
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="featured-project-cards -mx-1 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] sm:mx-0 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
              {PROJECTS.map((project) => {
                const isActive = selected === project.id;

                return (
                  <article
                    key={project.id}
                    role="tab"
                    aria-selected={isActive}
                    className={cn(
                      "w-[min(78vw,260px)] shrink-0 snap-center overflow-hidden rounded-[var(--radius-profile)] border bg-[var(--color-white)] shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] sm:w-auto sm:shrink",
                      isActive
                        ? "border-[var(--color-primary)] shadow-[0_4px_16px_color-mix(in_srgb,var(--color-primary)_14%,transparent)]"
                        : "border-[var(--color-hairline)]",
                    )}
                  >
                    <div className="relative aspect-[5/4] w-full overflow-hidden sm:aspect-[4/3]">
                      <Image
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 78vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-col gap-2.5 border-t border-[var(--color-hairline)] px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4 sm:py-3">
                      <p className="min-w-0 text-xs font-semibold leading-snug text-[var(--color-primary-ink)] sm:text-sm">
                        <span className="sm:hidden">{project.shortLabel}</span>
                        <span className="hidden sm:inline">{project.label}</span>
                      </p>
                      <button
                        type="button"
                        aria-expanded={isActive}
                        onClick={() => handleSelect(project.id)}
                        className={cn(
                          "btn w-full shrink-0 px-3 py-1.5 text-xs sm:w-auto sm:px-4 sm:py-2",
                          isActive ? "btn-primary" : "btn-primary-outlined",
                        )}
                      >
                        {isActive ? "Thu gọn" : "Chi tiết"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {selected ? (
        <div
          id="featured-project-panels"
          className="scroll-mt-20 animate-[profile-fade-up_0.55s_cubic-bezier(0.16,1,0.3,1)_both] [&>section:first-child]:!pt-0 [&>section]:!pb-5 sm:[&>section]:!pb-8"
        >
          <ProjectPanels selected={selected} />
        </div>
      ) : null}
    </>
  );
}
