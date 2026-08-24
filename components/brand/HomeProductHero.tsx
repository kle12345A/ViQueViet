import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";

const highlights = [
  { value: "19+", label: "Món trong danh mục", icon: "bowl" },
  { value: "5 nhóm", label: "Hương vị để lựa chọn", icon: "leaf" },
  { value: "OEM/ODM", label: "Hợp tác phát triển sản phẩm", icon: "handshake" },
  { value: "Trực tiếp", label: "Trao đổi theo nhu cầu", icon: "chat" },
] as const;

export function HomeProductHero() {
  return (
    <section className="home-product-hero">
      <Image
        className="home-product-background"
        src="/images/brand/home-countryside-bg.webp"
        alt=""
        fill
        priority
        fetchPriority="high"
        quality={70}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={IMAGE_BLUR_DATA_URL}
      />
      <div className="container home-product-hero-grid">
        <div className="home-product-copy">
          <p className="home-product-eyebrow">Vị Quê Việt</p>
          <h1>Món quê thân thuộc, tiện cho bữa cơm nhà</h1>
          <span className="home-product-rule" aria-hidden="true" />
          <p className="home-product-description">Từ giò chả, xúc xích đến chả cốm, nem chua rán — những món quen được chuẩn bị gọn gàng để bạn dễ chọn cho bữa ăn mỗi ngày.</p>
          <p className="home-product-note">Giữ vị quen thuộc, tối ưu cho nhịp sống hiện đại.</p>
          <div className="home-product-actions"><Button href="/san-pham">Khám phá sản phẩm <span>→</span></Button><Button href="/lien-he" variant="secondary">Liên hệ tư vấn <span>→</span></Button></div>
        </div>

        <div className="home-product-visual">
          <figure className="home-product-main-image"><Image src="/images/home/home-food-main.webp" alt="Mẹt món Việt gồm giò chả, xúc xích, món chiên, rau thơm và nước chấm" fill priority sizes="(max-width: 820px) 100vw, 58vw" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} /></figure>
          <figure className="home-product-secondary-image"><Image src="/images/home/home-food-secondary.webp" alt="Giò chả thái lát bày trên mẹt tre cùng rau thơm và nước chấm" fill sizes="(max-width: 620px) 54vw, 24vw" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} /></figure>
          <div className="home-product-seal" role="img" aria-label="Logo Vị Quê Việt"><Image src="/images/brand/vi-que-viet-logo.png" alt="" fill sizes="76px" /></div>
        </div>
      </div>

      <div className="container home-product-highlights">
        {highlights.map((item) => <article className="home-product-highlight" key={item.value}><HighlightIcon name={item.icon} /><div><strong>{item.value}</strong><span>{item.label}</span></div></article>)}
      </div>
    </section>
  );
}

function HighlightIcon({ name }: { name: (typeof highlights)[number]["icon"] }) {
  return <span className="home-highlight-icon" data-icon={name} aria-hidden="true"><svg viewBox="0 0 24 24">{name === "bowl" ? <><path d="M4 11h16c0 5-3 8-8 8s-8-3-8-8Z"/><path d="M8 7c-1-2 1-3 0-5m4 5c-1-2 1-3 0-5m4 5c-1-2 1-3 0-5M7 21h10"/></> : name === "leaf" ? <><path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16Z"/><path d="M4 21c3-6 7-9 12-12"/></> : name === "handshake" ? <><path d="m8 12 4 4c1 1 2.5-.5 1.5-1.5l-3-3"/><path d="m13.5 14.5 1 1c1 1 2.5-.5 1.5-1.5l-4-4"/><path d="M3 7 6 5l4 3 2-2c1-1 2-1 3 0l3 2 3-1M3 7l3 7-2 2m17-9-3 7 2 2"/></> : <><path d="M4 5h16v11H9l-5 4V5Z"/><circle cx="9" cy="10.5" r=".7"/><circle cx="12" cy="10.5" r=".7"/><circle cx="15" cy="10.5" r=".7"/></>}</svg></span>;
}
