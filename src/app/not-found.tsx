import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-[var(--color-hero-navy)] px-4 text-center text-white">
      <p className="font-[family-name:var(--font-display)] text-sm font-extrabold uppercase tracking-[0.2em] text-white/70">
        404
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,3rem)] font-black tracking-tight text-balance">
        Không tìm thấy trang
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
        Đường dẫn này không tồn tại hoặc đã được chuyển đi.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-[var(--radius-pill)] bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)] transition-colors hover:bg-[var(--color-green-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-hero-navy)]"
      >
        Về trang chủ
      </Link>
    </main>
  );
}
