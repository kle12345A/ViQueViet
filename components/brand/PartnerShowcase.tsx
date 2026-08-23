import Image from "next/image";

const partners = [
  { name: "Canon Việt Nam", logo: "/images/partners/canon.png", href: "https://vn.canon/vi/consumer" },
  { name: "HasuMart", logo: "/images/partners/hasumart.png", href: "https://www.hasugroup.vn/" },
  { name: "Đôi Đũa Vàng", logo: "/images/partners/doi-dua-vang.png", href: "https://doiduavang.vn/" },
  { name: "Kwook Việt Nam", logo: "/images/partners/kwook.png", href: "https://kwookvietnam.com.vn/" },
  { name: "TP Foods", logo: "/images/partners/tp-food.png", href: "https://www.tpfood.group/tpfoodsgroupvn" },
] as const;

export function PartnerShowcase() {
  return (
    <section className="section partner-showcase" id="doi-tac-dong-hanh">
      <div className="container">
        <div className="partner-showcase-heading">
          <div>
            <p className="eyebrow">Đối tác đồng hành</p>
            <h2>Niềm tin được xây từ những lần cùng làm việc</h2>
          </div>
          <p>Danh sách các đối tác đồng hành cùng Vị Quê Việt.</p>
        </div>
        <div className="partner-heading-rule" aria-hidden="true">
          <span />
        </div>
        <div className="partner-logo-grid">
          {partners.map((partner) => (
            <a className="partner-logo-card" href={partner.href} target="_blank" rel="noreferrer" aria-label={`Truy cập website ${partner.name}`} key={partner.name}>
              <span className="partner-logo-image"><Image src={partner.logo} alt={`Logo ${partner.name}`} fill sizes="(max-width: 620px) 44vw, 220px" /></span>
              <strong>{partner.name}</strong>
              <span className="partner-card-rule" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
