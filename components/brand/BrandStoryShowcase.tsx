import Image from "next/image";
import { Button } from "@/components/ui/Button";

const values = [
  { title: "Hương vị thân quen", description: "Giữ trọn hương vị quê nhà trong từng sản phẩm.", icon: "bowl" },
  { title: "Tiện lợi mỗi ngày", description: "Chế biến nhanh gọn, tiết kiệm thời gian.", icon: "clock" },
  { title: "Phù hợp gia đình Việt", description: "An tâm chất lượng, đáp ứng khẩu vị mọi nhà.", icon: "family" },
] as const;

function StoryIcon({ kind }: { kind: (typeof values)[number]["icon"] }) {
  if (kind === "bowl") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 23h30c0 10-6 17-15 17S9 33 9 23ZM13 40h22M16 18l18-9M21 18l16-7M15 27h18" /><path d="M17 22c0-4 3-7 7-7" /></svg>;
  }
  if (kind === "clock") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="22" cy="24" r="16" /><path d="M22 13v11l7 4M34 35c3-7 7-9 11-8-1 7-5 10-11 8Z" /></svg>;
  }
  return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="13" r="5" /><circle cx="11" cy="20" r="4" /><circle cx="37" cy="20" r="4" /><path d="M15 41v-8c0-6 4-10 9-10s9 4 9 10v8M4 41v-7c0-5 3-8 7-8 2 0 4 1 5 3M44 41v-7c0-5-3-8-7-8-2 0-4 1-5 3" /></svg>;
}

export function BrandStoryShowcase() {
  return (
    <section className="section brand-story-showcase" id="cau-chuyen-vi-que-viet">
      <div className="container brand-story-grid">
        <div className="brand-story-copy">
          <p className="brand-story-eyebrow">
            <svg viewBox="0 0 34 42" aria-hidden="true"><path d="M17 40C15 29 18 17 24 5M18 29 9 20M20 23l9-8M16 34l-9-6M22 17l7-6" /><path d="M9 20c-4-6-2-11 3-13 4 5 3 10-3 13ZM29 15c-1-7 2-11 8-11 1 6-2 10-8 11ZM7 28c-5-5-5-10-1-13 5 3 6 8 1 13ZM29 11c-1-5 2-8 6-8" /></svg>
            Chuyện của Vị Quê Việt
          </p>
          <h2>Giữ vị quen,<br />làm theo cách hôm nay</h2>
          <span className="brand-story-rule" aria-hidden="true" />
          <p className="brand-story-description">Vị Quê Việt chọn lọc nguyên liệu chất lượng và giữ trọn hương vị truyền thống, để mỗi bữa ăn gia đình luôn ngon lành, tiện lợi và gần gũi như cơm nhà.</p>
          <div className="brand-story-actions">
            <Button href="/ve-vi-que-viet">Câu chuyện thương hiệu <span aria-hidden="true">›</span></Button>
            <Button href="/san-pham" variant="secondary">Khám phá sản phẩm <span aria-hidden="true">›</span></Button>
          </div>
          <div className="brand-story-values">
            {values.map((value) => (
              <article className="brand-story-value" key={value.title}>
                <StoryIcon kind={value.icon} />
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="brand-story-collage" role="group" aria-label="Bữa cơm gia đình cùng các món Vị Quê Việt">
          <span className="brand-story-paper brand-story-paper-back" aria-hidden="true" />
          <span className="brand-story-paper brand-story-paper-middle" aria-hidden="true" />
          <figure className="brand-story-photo brand-story-photo-main">
            <Image src="/images/brand/family-meal.webp" alt="Gia đình quây quần bên bữa ăn" fill sizes="(max-width: 980px) 90vw, 46vw" />
          </figure>
          <figure className="brand-story-photo brand-story-photo-food">
            <Image src="/images/products/cha-com-tu-le/hero.webp" alt="Món chả cốm bày trên đĩa" fill sizes="(max-width: 980px) 48vw, 24vw" />
          </figure>
          <figure className="brand-story-photo brand-story-photo-product">
            <Image src="/images/brand/hero-products.webp" alt="Các món sản phẩm được bày trên bàn" fill sizes="(max-width: 980px) 36vw, 17vw" />
          </figure>
          <span className="brand-story-paperclip" aria-hidden="true" />
          <span className="brand-story-seal" aria-hidden="true"><Image src="/images/brand/vi-que-viet-logo.png" alt="" fill sizes="96px" /></span>
        </div>
      </div>
    </section>
  );
}
