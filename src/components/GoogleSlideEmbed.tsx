export function GoogleSlideEmbed({
  src = "https://docs.google.com/presentation/d/1bXoIwWN9Skj8uBHvu9YbbePYTCNESfhuOhxS7aP8C44/embed?start=false&loop=false&delayms=3000",
  title = "Google Slides Presentation",
}: {
  src?: string;
  title?: string;
}) {
  return (
    <div className="w-full overflow-hidden rounded-[var(--radius-profile)] border border-[var(--color-hairline)] bg-[var(--color-white)] shadow-sm">
      <div className="relative aspect-video w-full">
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
