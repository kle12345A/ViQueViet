import Image from "next/image";
import Link from "next/link";

const gallery = [
  { src: "/images/factory/factory-hero.webp", label: "Khu sơ chế", alt: "Không gian sơ chế và chuẩn bị sản phẩm trong nhà máy" },
  { src: "/images/factory/equipment.webp", label: "Khu chế biến", alt: "Thiết bị inox trong khu vực chế biến" },
  { src: "/images/factory/workers.webp", label: "Khu đóng gói", alt: "Nhân sự thao tác và hoàn thiện sản phẩm" },
] as const;

const features = [
  { title: "Phân tách theo công đoạn", icon: "flow" },
  { title: "Dễ kiểm soát vệ sinh", icon: "shield" },
  { title: "Tối ưu thao tác", icon: "process" },
] as const;

const zones = [
  { title: "Khu sơ chế", description: "Chuẩn bị nguyên liệu gọn gàng", icon: "prep" },
  { title: "Khu chế biến", description: "Vận hành theo quy trình rõ ràng", icon: "cook" },
  { title: "Khu đóng gói", description: "Đảm bảo đồng đều và sạch sẽ", icon: "package" },
  { title: "Khu bảo quản", description: "Sắp xếp thành phẩm khoa học", icon: "storage" },
] as const;

type IconKind = (typeof features)[number]["icon"] | (typeof zones)[number]["icon"];

function SpaceIcon({ kind }: { kind: IconKind }) {
  if (kind === "flow") return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M7 12h10v7H7zM23 21h10v7H23zM17 15h5a4 4 0 0 1 4 4v2M12 19v8h11" /><circle cx="7" cy="12" r="1" /><circle cx="33" cy="28" r="1" /></svg>;
  if (kind === "shield") return <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4c5 4 10 5 14 6v9c0 9-5 14-14 18C11 33 6 28 6 19v-9c4-1 9-2 14-6Z" /><path d="m13 20 5 5 9-10" /></svg>;
  if (kind === "process") return <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="6" /><path d="M20 5v5M20 30v5M5 20h5M30 20h5M9 9l4 4M27 27l4 4M31 9l-4 4M13 27l-4 4" /><path d="m17 20 2 2 4-5" /></svg>;
  if (kind === "prep") return <svg viewBox="0 0 44 44" aria-hidden="true"><path d="M7 22h30c-1 10-6 15-15 15S8 32 7 22ZM13 38h18M15 18c2-5 6-7 12-7M22 17c-1-7 2-11 7-13 2 6 0 10-7 13Z" /></svg>;
  if (kind === "cook") return <svg viewBox="0 0 44 44" aria-hidden="true"><rect x="9" y="10" width="26" height="28" rx="3" /><path d="M14 7h16M15 38v3M29 38v3M13 17h18M18 13h8" /></svg>;
  if (kind === "package") return <svg viewBox="0 0 44 44" aria-hidden="true"><path d="m7 13 15-8 15 8v19l-15 8-15-8V13Z" /><path d="m7 13 15 8 15-8M22 21v19M14 9l15 8" /></svg>;
  return <svg viewBox="0 0 44 44" aria-hidden="true"><rect x="8" y="7" width="28" height="31" rx="3" /><path d="M13 14h18M13 31h8M29 23v10M24 25l3 2 4-4M11 11h2" /></svg>;
}

export function FactorySpacesSection() {
  return (
    <section className="factory-spaces-section" id="khong-gian-nha-may">
      <div className="container factory-spaces-container">
        <div className="factory-spaces-top">
          <div className="factory-spaces-intro">
            <p className="factory-spaces-eyebrow">Không gian</p>
            <h2>Mỗi việc có<br />một khu vực riêng</h2>
            <p className="factory-spaces-description">Từ khâu sơ chế, chế biến đến đóng gói và bảo quản, mỗi khu vực được bố trí theo dòng chảy công việc để vận hành gọn gàng, vệ sinh và dễ kiểm soát.</p>
            <div className="factory-spaces-features">
              {features.map((feature) => (
                <div className="factory-spaces-feature" key={feature.title}>
                  <span data-icon={feature.icon}><SpaceIcon kind={feature.icon} /></span>
                  <strong>{feature.title}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="factory-spaces-gallery">
            {gallery.map((image, index) => (
              <figure className={`factory-space-image ${index === 0 ? "is-large" : ""}`} key={image.src}>
                <div className="factory-space-image-media" style={{ position: "relative" }}><Image src={image.src} alt={image.alt} fill sizes={index === 0 ? "(max-width: 620px) 100vw, (max-width: 980px) 60vw, 36vw" : "(max-width: 620px) 50vw, (max-width: 980px) 40vw, 25vw"} /></div>
                <figcaption><span data-icon={index === 0 ? "prep" : index === 1 ? "cook" : "package"}><SpaceIcon kind={index === 0 ? "prep" : index === 1 ? "cook" : "package"} /></span>{image.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="factory-zones">
          {zones.map((zone) => (
            <article className="factory-zone-card" key={zone.title}>
              <span className="factory-zone-icon" data-icon={zone.icon}><SpaceIcon kind={zone.icon} /></span>
              <h3>{zone.title}</h3>
              <p>{zone.description}</p>
            </article>
          ))}
        </div>

        <div className="factory-spaces-cta"><Link href="#con-nguoi-nha-may">Xem thêm hình ảnh nhà máy <span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
  );
}
