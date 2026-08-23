import Image from "next/image";
import { BrandMark } from "@/components/global/BrandMark";
import { Button } from "@/components/ui/Button";

const benefits = [
  { title: "Tư vấn công thức", icon: "flask" },
  { title: "Mẫu thử linh hoạt", icon: "sample" },
  { title: "Sản xuất theo yêu cầu", icon: "factory" },
] as const;

function BenefitIcon({ kind }: { kind: (typeof benefits)[number]["icon"] }) {
  if (kind === "flask") {
    return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 4h10M14 4v8L7 24a3 3 0 0 0 2.6 4.5h12.8A3 3 0 0 0 25 24l-7-12V4M9 21h14M20 24l2 2" /></svg>;
  }
  if (kind === "sample") {
    return <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="7" y="6" width="18" height="22" rx="2" /><path d="M12 4h8v5h-8zM11 14h3M18 14h4M11 19h3M18 19h4M11 24h3M18 24h4" /></svg>;
  }
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 27h24M6 27V15h7v12M13 27V10h8v17M21 27V18h5v9M8 15l4-5 4 5M23 10l3-3" /><path d="M9 19h2M16 15h2M23 22h1" /></svg>;
}

export function OemShowcase() {
  return (
    <section className="section oem-showcase" id="oem-odm-home">
      <div className="container">
        <div className="oem-showcase-grid">
          <div className="oem-collage" aria-label="Hình ảnh minh họa dịch vụ OEM/ODM">
            <div className="oem-board">
              <div className="oem-collage-brand"><BrandMark linked={false} /></div>
              <svg className="oem-collage-branch" viewBox="0 0 270 110" aria-hidden="true">
                <path d="M8 82C62 75 88 47 131 34c42-13 73-10 123-25" />
                <path d="M66 67c-7-17-2-31 13-43M110 45c-3-16 3-27 15-36M151 34c5-13 14-20 27-25M190 29c9-11 21-15 35-14" />
                <path className="leaf" d="M71 52C51 44 48 30 61 20c15 7 19 19 10 32ZM87 54C89 34 101 26 115 31c-1 16-10 25-28 23ZM119 35c-2-17 7-27 22-29 6 14-1 25-22 29ZM143 33c8-16 21-20 33-12-5 14-15 19-33 12ZM181 28c12-13 25-12 34-2-8 11-19 12-34 2ZM218 23c14-8 25-3 28 8-11 7-21 4-28-8Z" />
              </svg>

              <figure className="oem-collage-photo oem-collage-photo-main"><Image src="/images/factory/factory-hero.webp" alt="" fill sizes="(max-width: 820px) 70vw, 34vw" /></figure>
              <figure className="oem-collage-photo oem-collage-photo-left"><Image src="/images/factory/quality-control.webp" alt="" fill sizes="(max-width: 820px) 24vw, 12vw" /></figure>
              <figure className="oem-collage-photo oem-collage-photo-right"><Image src="/images/products/cha-com-tu-le/hero.webp" alt="" fill sizes="(max-width: 820px) 24vw, 12vw" /></figure>
              <p className="oem-collage-caption">Chất lượng từ tâm, hương vị từ quê hương</p>
              <span className="oem-collage-seal" aria-hidden="true">VQ</span>
            </div>
          </div>

          <div className="oem-showcase-copy">
            <p className="oem-showcase-eyebrow">OEM/ODM <span aria-hidden="true" /></p>
            <h2>Đồng hành từ<br />ý tưởng đến sản phẩm</h2>
            <span className="oem-showcase-rule" aria-hidden="true" />
            <p className="oem-showcase-description">Trao đổi định hướng sản phẩm, quy cách, mẫu thử và kế hoạch sản xuất phù hợp với nhu cầu của thương hiệu hoặc kênh phân phối.</p>
            <div className="oem-benefits">
              {benefits.map((benefit) => (
                <article className="oem-benefit" key={benefit.title}>
                  <BenefitIcon kind={benefit.icon} />
                  <strong>{benefit.title}</strong>
                </article>
              ))}
            </div>
            <Button href="/oem-odm">Khám phá dịch vụ OEM/ODM</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
