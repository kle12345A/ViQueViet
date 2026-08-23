import Link from "next/link";

export function Pagination({ current, total, basePath }: { current: number; total: number; basePath: string }) {
  const hrefFor = (page: number) => page === 1 ? basePath : `${basePath}/page/${page}`;
  return (
    <nav className="pagination" aria-label="Phân trang">
      <Link className={current === 1 ? "is-disabled" : ""} aria-disabled={current === 1} tabIndex={current === 1 ? -1 : undefined} href={hrefFor(Math.max(1, current - 1))}>← Trước</Link>
      {Array.from({ length: total }, (_, index) => index + 1).map((page) => (
        <Link key={page} href={hrefFor(page)} aria-current={page === current ? "page" : undefined}>{page}</Link>
      ))}
      <Link className={current === total ? "is-disabled" : ""} aria-disabled={current === total} tabIndex={current === total ? -1 : undefined} href={hrefFor(Math.min(total, current + 1))}>Sau →</Link>
    </nav>
  );
}
