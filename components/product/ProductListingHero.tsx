import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";

export function ProductListingHero() {
  return (
    <section className="product-listing-hero">
      <Image className="route-hero-background product-listing-background" src="/images/brand/product-listing-hero-bg.webp" alt="" fill priority fetchPriority="high" sizes="100vw" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} />
      <div className="container product-listing-hero-inner">
        <div className="product-listing-hero-copy">
          <p className="product-listing-eyebrow">
            <svg viewBox="0 0 32 40" aria-hidden="true"><path d="M16 38C14 27 17 16 23 4M17 28 8 19M20 21l8-8M15 33l-8-6M22 15l7-6" /><path d="M8 19c-4-6-2-10 3-12 4 5 3 9-3 12ZM28 13c-1-6 2-10 7-10 1 6-2 9-7 10ZM7 27c-5-4-5-9-1-12 5 3 6 7 1 12Z" /></svg>
            Món ngon Vị Quê Việt
          </p>
          <span className="product-listing-eyebrow-rule" aria-hidden="true" />
          <h1>Chọn một món<br />cho bữa hôm nay</h1>
          <p className="product-listing-description">Từ giò chả đến món ăn vặt, bạn có thể tìm theo tên hoặc chọn nhanh từng nhóm món.</p>
          <div className="product-listing-actions">
            <Button href="#danh-sach-san-pham">Khám phá sản phẩm <span aria-hidden="true">→</span></Button>
            <Button href="/lien-he" variant="secondary">Liên hệ tư vấn</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
