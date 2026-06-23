import Image from "next/image";

export interface LogoPlaceholderProps {
  name: string;
  abbr?: string;
  color?: string;
  imageSrc?: string;
}

const TOOL_COLORS: Record<string, string> = {
  CapCut: "#1a1a1a",
  Canva: "#00c4cc",
  "Microsoft Office": "#d83b01",
};

export function LogoPlaceholder({
  name,
  abbr,
  color,
  imageSrc,
}: LogoPlaceholderProps) {
  const bg = color ?? TOOL_COLORS[name] ?? "#4a5568";

  return (
    <div className="group flex flex-col items-center gap-2" title={name}>
      <div
        className="relative flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full border-2 border-[var(--color-profile-border)]/40 bg-white transition-transform duration-300 group-hover:scale-105 active:scale-[0.98]"
        style={!imageSrc ? { backgroundColor: bg } : undefined}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
          />
        ) : (
          <span
            className="text-[11px] font-bold tracking-tight text-white"
            aria-hidden
          >
            {abbr}
          </span>
        )}
      </div>
      <span className="max-w-[5.5rem] text-center text-[10px] font-semibold leading-tight text-[var(--color-profile-navy)]">
        {name}
      </span>
    </div>
  );
}
