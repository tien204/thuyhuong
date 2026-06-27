export function GoogleSheetEmbed({
  src = "https://docs.google.com/spreadsheets/d/1pZmQa_vmfPxpCVSf6pcpF117m2mwDEVi1CQeRRDrUWA/preview",
  title = "Google Sheets",
}: {
  src?: string;
  title?: string;
}) {
  return (
    <div className="w-full overflow-hidden rounded-[var(--radius-profile)] border border-[var(--color-hairline)] bg-[var(--color-white)] shadow-sm">
      <div className="h-[min(420px,58dvh)] w-full min-h-[300px] sm:min-h-[420px] sm:h-[min(520px,65dvh)] lg:h-[min(650px,70dvh)]">
        <iframe
          src={src}
          title={title}
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}
