export function ContactSectionBridge() {
  return (
    <div
      aria-hidden
      className="bg-[var(--color-canvas)] pb-2 pt-6 sm:pb-3 sm:pt-8"
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 border-t border-[var(--color-hairline)] pt-6 sm:gap-6 sm:pt-8">
          <span className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-primary)]/25 to-[var(--color-primary)]/40 sm:block" />
          <p className="mx-auto max-w-md text-center text-sm leading-relaxed text-[var(--color-body)] sm:text-[15px]">
            Từ kinh nghiệm thực chiến đến cơ hội hợp tác — kết nối với Hương
            ngay bên dưới.
          </p>
          <span className="hidden h-px flex-1 bg-gradient-to-l from-transparent via-[var(--color-primary)]/25 to-[var(--color-primary)]/40 sm:block" />
        </div>
      </div>
    </div>
  );
}
