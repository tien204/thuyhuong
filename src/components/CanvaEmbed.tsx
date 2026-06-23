export function CanvaEmbed({
  src,
  title = "Canva design",
}: {
  src: string;
  title?: string;
}) {
  return (
    <div className="w-full overflow-hidden rounded-[var(--radius-profile)] border border-[var(--color-hairline)] bg-[var(--color-white)] shadow-sm">
      <div className="relative aspect-video w-full">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allowFullScreen
          allow="fullscreen"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
