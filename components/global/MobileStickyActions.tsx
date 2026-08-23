import Link from "next/link";
export function MobileStickyActions() {
  return (
    <nav className="mobile-actions" aria-label="Liên hệ nhanh">
      <Link href="/san-pham">Sản phẩm</Link>
      <Link href="/lien-he">Liên hệ</Link>
      <Link href="/lien-he">Báo giá</Link>
    </nav>
  );
}
