import Image from "next/image";
import { ArticleCard } from "@/components/article/ArticleCard";
import { BrandStoryShowcase } from "@/components/brand/BrandStoryShowcase";
import { CTASection } from "@/components/brand/CTASection";
import { HomeProductHero } from "@/components/brand/HomeProductHero";
import { OemShowcase } from "@/components/brand/OemShowcase";
import { PartnerShowcase } from "@/components/brand/PartnerShowcase";
import { VideoShowcase } from "@/components/brand/VideoShowcase";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPosts, getProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Đậm vị quê nhà", "Khám phá các món ăn quen vị Việt và dịch vụ OEM/ODM của Vị Quê Việt.", "/");

export default function Home() {
  const products = getProducts();
  const posts = getPosts();
  const values = [
    ["01", "Quen vị", "Những món đã thân thuộc trong bữa cơm và những buổi sum họp."],
    ["02", "Dễ dùng", "Gọn thời gian chuẩn bị nhưng vẫn giữ được cảm giác của một bữa ăn nhà."],
    ["03", "Làm kỹ", "Từng công đoạn được chăm chút để món ăn khi đến tay khách vẫn tròn vị."],
  ];
  return <>
    <HomeProductHero />
    <section className="section"><div className="container"><SectionHeading eyebrow="Gợi ý hôm nay" title="Sản phẩm được quan tâm" description="Những hương vị tiện lợi, gần gũi và dễ kết hợp trong bữa ăn hằng ngày." /><div className="product-grid">{products.filter((item) => item.featured).slice(0, 8).map((item) => <ProductCard key={item.slug} product={item} />)}</div><div className="button-row" style={{ justifyContent: "center" }}><Button href="/san-pham">Xem toàn bộ sản phẩm</Button></div></div></section>
    <BrandStoryShowcase />
    <section className="section"><div className="container"><SectionHeading eyebrow="Điều chúng tôi coi trọng" title="Ngon vừa miệng, tiện vừa đủ" /><div className="feature-grid">{values.map(([number, title, text]) => <article className="feature-card" key={title}><span className="feature-number">{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="section section-green"><div className="container split-grid"><div><SectionHeading align="left" eyebrow="Năng lực sản xuất" title="Theo dõi từng khu vực trong nhà máy" description="Xem hình ảnh thực tế tại khu sơ chế, khu chế biến với thiết bị inox, khu đóng gói có nhân sự thao tác và khu sắp xếp thành phẩm trước khi xuất kho." /><Button href="/nha-may" variant="secondary">Xem từng khu vực nhà máy</Button></div><div className="split-image"><Image src="/images/factory/production-line.webp" alt="Nhân sự Vị Quê Việt tại khu vực sản xuất" fill sizes="(max-width: 820px) 100vw, 50vw" /></div></div></section>
    <VideoShowcase />
    <PartnerShowcase />
    <section className="section"><div className="container"><SectionHeading eyebrow="Làm kỹ từ bên trong" title="Từ gian bếp sản xuất đến gói hàng hoàn chỉnh" description="Một món ngon ổn định cần sự cẩn thận ở từng bước, từ chuẩn bị nguyên liệu đến đóng gói." /><div className="feature-grid">{[["A","Tách từng khu vực","Mỗi công đoạn có không gian và cách thao tác riêng."],["B","Giữ vệ sinh","Trang phục bảo hộ và vệ sinh được chú ý trong suốt ca làm việc."],["C","Ghi rõ cách dùng","Quy cách và hướng dẫn bảo quản đi theo từng sản phẩm."]].map(([n,t,d])=><article className="feature-card" key={t}><span className="feature-number">{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>
    <OemShowcase />
    <section className="section partner-section"><div className="container partner-layout"><div className="partner-intro"><SectionHeading align="left" eyebrow="Dành cho đối tác" title="Bắt đầu bằng một đề bài đủ rõ" description="Bạn chưa cần có mọi câu trả lời ngay từ đầu. Chỉ cần cho chúng tôi biết nhóm sản phẩm, người mua dự kiến, quy cách mong muốn và kế hoạch bán hàng ban đầu." /><Button href="/lien-he">Gửi đề bài hợp tác</Button></div><div className="partner-steps">{[["01","Làm rõ nhu cầu","Trao đổi hương vị, cách dùng, phân khúc và mức sản lượng dự kiến."],["02","Đối chiếu năng lực","Xem tư liệu xưởng, nhóm sản phẩm phù hợp và phạm vi có thể triển khai."],["03","Thử mẫu & chốt quy cách","Điều chỉnh mẫu, bao bì, thông tin sản phẩm và tiêu chí nghiệm thu."],["04","Lên kế hoạch sản xuất","Thống nhất tiến độ, hồ sơ cần thiết và cách phối hợp khi ra hàng."]].map(([n,t,d])=><article className="partner-step" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div></div></section>
    <section className="section section-soft"><div className="container"><SectionHeading eyebrow="Góc Vị Quê" title="Thêm một chút chuyện quanh mâm cơm" /><div className="article-grid">{posts.slice(0, 3).map((post) => <ArticleCard key={post.slug} post={post} />)}</div><div className="button-row" style={{ justifyContent: "center" }}><Button href="/tin-tuc" variant="secondary">Đọc thêm</Button></div></div></section>
    <CTASection />
  </>;
}
