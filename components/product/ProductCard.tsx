import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/content/types";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  return (
    <article className={`product-card ${product.bestSeller ? "best-seller" : ""}`} data-category={product.category}>
      <Link className="product-image" href={`/san-pham/${product.slug}`} tabIndex={-1} aria-hidden="true">
        <Image src={product.thumbnail} alt={product.imagePending ? "Hình ảnh đang cập nhật" : product.name} fill loading={eager ? "eager" : "lazy"} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} />
      </Link>
      <div className="product-card-body">
        <div className="badge-row">
          {product.badges.map((badge) => <span className="badge" key={badge}>{badge}</span>)}
          {product.imagePending && <span className="badge badge-muted">ẢNH ĐANG CẬP NHẬT</span>}
        </div>
        <p className="product-category">{product.categoryLabel}</p>
        <h3><Link href={`/san-pham/${product.slug}`}>{product.name}</Link></h3>
        <p className="product-excerpt">{product.excerpt}</p>
        <div className="product-meta"><span>{product.weight}</span><Link href={`/san-pham/${product.slug}`}>Xem chi tiết →</Link></div>
      </div>
    </article>
  );
}
