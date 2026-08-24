import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";

const benefits = [
  { title: "Tư vấn công thức", description: "Định hướng sản phẩm phù hợp thị hiếu và định vị thương hiệu.", icon: "idea" },
  { title: "Mẫu thử linh hoạt", description: "Phát triển mẫu nhanh, điều chỉnh theo phản hồi thực tế.", icon: "sample" },
  { title: "Sản xuất theo yêu cầu", description: "Sản xuất ổn định, kiểm soát chất lượng và tối ưu chi phí.", icon: "factory" },
] as const;

function OemHeroIcon({ kind }: { kind: (typeof benefits)[number]["icon"] }) {
  if (kind === "idea") {
    return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M14 26c-3-2-5-6-5-10a11 11 0 0 1 22 0c0 4-2 8-5 10l-2 2H16l-2-2Z" /><path d="M16 32h8M17 28v4M23 28v4M20 24v-8m0 0c-4-1-5-5-3-7 3 1 4 3 3 7Zm0 0c4-1 5-5 3-7-3 1-4 3-3 7Z" /></svg>;
  }
  if (kind === "sample") {
    return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M11 5h11M14 5v11L7 30a3 3 0 0 0 3 5h18a3 3 0 0 0 3-5l-8-14V5M10 27h18" /><path d="m18 28 3 3 5-6M29 7h5M31.5 4.5v5" /></svg>;
  }
  return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M4 34h32M7 34V21h9v13M16 34V15l9 5v14M25 34V10h8v24M28 10V6h3v4" /><path d="M10 25h3M10 29h3M20 24h2M20 29h2M28 24h2M28 29h2" /></svg>;
}

export function OemLandingHero(_legacyProps?: Record<string, unknown>) {
  void _legacyProps;
  return (
    <section className="oem-landing-hero">
      <Image className="route-hero-background" src="/images/oem/oem-landing-hero-v2.webp" alt="" fill priority fetchPriority="high" sizes="100vw" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} />
      <div className="container oem-landing-hero-inner">
        <div className="oem-landing-copy">
          <p className="oem-landing-eyebrow">OEM/ODM thực phẩm</p>
          <h1>Từ ý tưởng của bạn<br />đến một sản phẩm<br />sẵn sàng ra thị trường</h1>
          <p className="oem-landing-description">Vị Quê Việt trao đổi trực tiếp cùng thương hiệu và nhà phân phối để định hình giải pháp phù hợp với nhu cầu thực tế.</p>
          <div className="oem-landing-benefits">
            {benefits.map((benefit) => (
              <article className="oem-landing-benefit" key={benefit.title}>
                <span className="oem-landing-benefit-icon" data-icon={benefit.icon}><OemHeroIcon kind={benefit.icon} /></span>
                <h2>{benefit.title}</h2>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
          <div className="oem-landing-divider" aria-hidden="true"><span><svg viewBox="0 0 28 24"><path d="M14 22c-1-8 2-14 9-19M15 15 8 9M18 10l7-4" /><path d="M8 9C3 8 1 4 3 1c5 0 8 3 5 8ZM25 6c-1-4 1-6 4-7 1 4 0 6-4 7Z" /></svg></span></div>
          <div className="oem-landing-actions">
            <Button href="/lien-he">Trao đổi dự án</Button>
            <Button href="/nha-may" variant="secondary">Xem nhà máy</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
