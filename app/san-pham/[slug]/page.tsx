import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductDetailsAccordion } from "@/components/product/ProductDetailsAccordion";
import { ProductGallery } from "@/components/product/ProductGallery";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProduct, getProducts } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return getProducts().map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }: PageProps<"/san-pham/[slug]">): Promise<Metadata> { const product = getProduct((await params).slug); return product ? pageMetadata(product.name, product.excerpt, `/san-pham/${product.slug}`, product.heroImage) : {}; }

export default async function ProductDetailPage({ params }: PageProps<"/san-pham/[slug]">) {
  const product = getProduct((await params).slug); if (!product) notFound();
  const related = getProducts().filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 4);
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Product", name: product.name, image: product.gallery.map((image) => new URL(image, siteConfig.url).toString()), description: product.excerpt, brand: { "@type": "Brand", name: siteConfig.name } }} />
    <div className="product-detail-page">
      <section className="container product-detail-panel">
        <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm", href: "/san-pham" }, { label: product.name }]} />
        <div className="product-detail-layout">
          <ProductGallery images={product.gallery} name={product.name} />
          <div className="product-detail-information">
            <p className="product-detail-eyebrow">{product.categoryLabel}</p>
            <h1>{product.name}</h1>
            <p className="product-detail-excerpt">{product.excerpt}</p>
            {product.imagePending && <p className="todo-note">Ảnh riêng của sản phẩm đang được cập nhật.</p>}
            <div className="product-quick-info">
              <article><QuickIcon name="package" /><div><span>Quy cách</span><strong>{product.weight}</strong><small>Thông tin theo từng sản phẩm</small></div></article>
              <article><QuickIcon name="tag" /><div><span>Giá bán</span><strong>Liên hệ báo giá</strong><small>Áp dụng theo số lượng và thời điểm</small></div></article>
            </div>
            <div className="product-detail-actions"><Button href="/lien-he#gui-yeu-cau">Nhận báo giá <span>→</span></Button><Button href="/san-pham" variant="secondary">Xem sản phẩm khác <span>→</span></Button></div>
            <ProductDetailsAccordion body={product.body} />
          </div>
        </div>
      </section>
      {related.length > 0 && <section className="product-related-section"><div className="container"><SectionHeading eyebrow="Có thể bạn quan tâm" title="Sản phẩm cùng nhóm" /><div className="product-grid">{related.map((item) => <ProductCard product={item} key={item.slug} />)}</div></div></section>}
    </div>
  </>;
}

function QuickIcon({ name }: { name: "package" | "tag" }) {
  return <span className="product-quick-icon" aria-hidden="true"><svg viewBox="0 0 24 24">{name === "package" ? <><path d="m4 7 8-4 8 4v10l-8 4-8-4Z"/><path d="m4 7 8 4 8-4m-8 4v10M8 5l8 4v4"/></> : <><path d="M4 4h8l8 8-8 8-8-8Z"/><circle cx="9" cy="9" r="1"/></>}</svg></span>;
}
