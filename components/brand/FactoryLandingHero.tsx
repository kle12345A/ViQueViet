import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";

const factoryFacts = [
  { title: "Tách khu", label: "Theo từng công đoạn", icon: "idea" },
  { title: "Bảo hộ", label: "Khi làm việc tại xưởng", icon: "shield" },
  { title: "Thiết bị", label: "Cho chế biến và đóng gói", icon: "truck" },
  { title: "Ảnh thật", label: "Từ khu vực sản xuất", icon: "checklist" },
] as const;

function FactoryIcon({ kind }: { kind: (typeof factoryFacts)[number]["icon"] | "safe" }) {
  if (kind === "idea") return <svg viewBox="0 0 42 42" aria-hidden="true"><path d="M15 27c-3-2-5-6-5-10a11 11 0 0 1 22 0c0 4-2 8-5 10l-2 3h-8l-2-3Z" /><path d="M17 34h8M18 30v4M24 30v4M21 25v-9m0 0c-4-1-5-5-3-7 3 1 4 3 3 7Zm0 0c4-1 5-5 3-7-3 1-4 3-3 7Z" /></svg>;
  if (kind === "shield" || kind === "safe") return <svg viewBox="0 0 42 42" aria-hidden="true"><path d="M21 4c5 4 10 5 15 6v10c0 9-6 15-15 19C12 35 6 29 6 20V10c5-1 10-2 15-6Z" /><path d="m14 21 5 5 10-11" /></svg>;
  if (kind === "truck") return <svg viewBox="0 0 42 42" aria-hidden="true"><path d="M4 10h22v20H4zM26 17h7l5 6v7H26zM9 30a4 4 0 1 0 8 0M29 30a4 4 0 1 0 8 0" /></svg>;
  return <svg viewBox="0 0 42 42" aria-hidden="true"><rect x="8" y="8" width="27" height="30" rx="2" /><path d="M16 5h11v7H16zM13 19l2 2 4-5M22 19h8M13 27l2 2 4-5M22 27h8M13 35l2 2 4-5M22 35h8" /></svg>;
}

export function FactoryLandingHero() {
  return (
    <section className="factory-landing-hero">
      <Image className="route-hero-background" src="/images/factory/factory-landing-hero-v2.webp" alt="" fill priority fetchPriority="high" sizes="100vw" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} />
      <div className="container factory-landing-inner">
        <div className="factory-landing-copy">
          <p className="factory-landing-eyebrow">Khu vực sản xuất</p>
          <span className="factory-landing-rule" aria-hidden="true" />
          <h1>Nơi mỗi món ăn<br />được làm thành hình</h1>
          <p className="factory-landing-description">Không gian sạch sẽ, thao tác rõ ràng và một đội ngũ làm việc cẩn thận — đây là những hình ảnh thật từ khu vực sản xuất.</p>
          <div className="factory-landing-actions">
            <Button href="/san-pham">Khám phá sản phẩm</Button>
            <Button href="/lien-he" variant="secondary">Liên hệ tư vấn</Button>
          </div>
        </div>

        <div className="factory-safety-badge">
          <FactoryIcon kind="safe" />
          <span>Sản xuất an toàn</span>
          <strong>Đảm bảo chất lượng</strong>
        </div>

        <div className="factory-facts">
          {factoryFacts.map((fact) => (
            <article className="factory-fact" key={fact.title}>
              <span className="factory-fact-icon" data-icon={fact.icon}><FactoryIcon kind={fact.icon} /></span>
              <div><h2>{fact.title}</h2><p>{fact.label}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
