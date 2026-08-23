import Image from "next/image";
import Link from "next/link";

export function BrandMark({ linked = true }: { linked?: boolean }) {
  const mark = <Image className="brand-logo-image" src="/images/brand/vi-que-viet-logo.png" alt="Vị Quê Việt – Ngọn tròn vị Việt" width={512} height={512} priority={linked} sizes="(max-width: 820px) 52px, 64px" />;
  return linked ? <Link className="brand-mark" href="/" aria-label="Vị Quê Việt - Trang chủ">{mark}</Link> : <div className="brand-mark">{mark}</div>;
}
