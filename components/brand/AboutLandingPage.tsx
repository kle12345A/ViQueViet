import Image from "next/image";
import { Button } from "@/components/ui/Button";

const values = [
  { title: "Sản phẩm chuẩn vị", description: "Phát triển món ăn phù hợp khẩu vị người Việt.", icon: "bowl" },
  { title: "Sản xuất bài bản", description: "Quy trình vận hành rõ ràng, kiểm soát chất lượng từng công đoạn.", icon: "factory" },
  { title: "Đồng hành đối tác", description: "Phát triển và sản xuất OEM/ODM theo nhu cầu thực tế.", icon: "handshake" },
] as const;

const approach = [
  { number: "01", title: "Bắt đầu từ nhu cầu", description: "Lắng nghe mục tiêu sản phẩm, nhóm khách hàng và cách sản phẩm sẽ được đưa ra thị trường." },
  { number: "02", title: "Làm rõ phương án", description: "Trao đổi về sản phẩm, quy cách và cách tổ chức sản xuất phù hợp với nhu cầu thực tế." },
  { number: "03", title: "Thực hiện theo công đoạn", description: "Sắp xếp công việc theo từng bước để thuận tiện cho thao tác và kiểm soát." },
  { number: "04", title: "Hoàn thiện và đồng hành", description: "Đối chiếu thành phẩm, tiếp nhận phản hồi và tiếp tục hoàn thiện khi cần thiết." },
] as const;

function AboutIcon({ kind }: { kind: (typeof values)[number]["icon"] }) {
  if (kind === "bowl") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 22h32c0 11-6 18-16 18S8 33 8 22Z"/><path d="M14 40h20M17 18c0-5 3-8 8-9M24 18c0-4 3-7 7-8M12 28h24"/></svg>;
  }
  if (kind === "factory") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 41V23l11 6v-8l11 7v-9l12 7v15H7Z"/><path d="M12 41v-6h6v6M27 34h4M36 34h4M8 23V10h7v16"/></svg>;
  }
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="m18 18 7-5c3-2 6-1 8 1l10 10-8 8-7-6-5 4-8-7 3-5Z"/><path d="m5 16 7-5 7 8-8 7-6-10Zm38 1-7-6-5 5 8 8 4-7ZM17 31l4 4M22 28l6 6M28 27l5 4"/></svg>;
}

function LeafMark() {
  return <svg viewBox="0 0 34 42" aria-hidden="true"><path d="M17 40C15 29 18 17 24 5M18 29 9 20M20 23l9-8M16 34l-9-6"/><path d="M9 20c-4-6-2-11 3-13 4 5 3 10-3 13ZM29 15c-1-7 2-11 8-11 1 6-2 10-8 11ZM7 28c-5-5-5-10-1-13 5 3 6 8 1 13Z"/></svg>;
}

export function AboutLandingPage() {
  return (
    <main className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="container about-hero-grid">
          <div className="about-hero-copy">
            <p className="about-eyebrow"><LeafMark />Về chúng tôi</p>
            <h1 id="about-title">Vị Quê Việt – gìn giữ hương vị quê nhà bằng một quy trình hiện đại</h1>
            <span className="about-rule" aria-hidden="true" />
            <p>Vị Quê Việt là doanh nghiệp thực phẩm Việt Nam tập trung phát triển các sản phẩm tiện lợi mang hương vị quen thuộc của bữa cơm Việt. Chúng tôi lựa chọn nguyên liệu phù hợp, chuẩn hóa quy trình và không ngừng hoàn thiện sản phẩm để đáp ứng nhu cầu của gia đình hiện đại.</p>
            <p>Bên cạnh thương hiệu riêng, Vị Quê Việt phát triển năng lực sản xuất và hợp tác OEM/ODM nhằm đồng hành cùng doanh nghiệp, nhà phân phối và các đối tác trong quá trình đưa sản phẩm thực phẩm ra thị trường.</p>
            <div className="about-actions">
              <Button href="/oem-odm">Khám phá năng lực <span aria-hidden="true">→</span></Button>
              <Button href="/nha-may" variant="secondary">Xem nhà máy <span aria-hidden="true">→</span></Button>
            </div>
          </div>

          <div className="about-collage" role="group" aria-label="Hình ảnh thực tế từ hoạt động sản xuất">
            <span className="about-collage-paper" aria-hidden="true" />
            <figure className="about-collage-photo about-collage-main">
              <Image src="/images/about/about-production-team.webp" alt="Đội ngũ thao tác tại khu vực sản xuất" fill priority sizes="(max-width: 980px) 92vw, 48vw" />
            </figure>
            <figure className="about-collage-photo about-collage-small">
              <Image src="/images/about/about-finished-products.webp" alt="Các phần sản phẩm đã được chuẩn bị và đóng khay" fill sizes="(max-width: 980px) 58vw, 25vw" />
            </figure>
            <span className="about-paperclip" aria-hidden="true" />
            <span className="about-seal" aria-hidden="true"><Image src="/images/brand/vi-que-viet-logo.png" alt="" fill sizes="94px" /></span>
          </div>
        </div>
      </section>

      <section className="about-values-section" aria-labelledby="about-values-title">
        <div className="container">
          <header className="about-section-heading">
            <p className="about-eyebrow">Nền tảng phát triển</p>
            <h2 id="about-values-title">Giữ điều thân thuộc, làm theo cách rõ ràng hơn</h2>
            <p>Ba định hướng được đặt cạnh nhau để sản phẩm, hoạt động sản xuất và việc hợp tác luôn cùng đi về một mục tiêu.</p>
          </header>
          <div className="about-values-grid">
            {values.map((value) => (
              <article className="about-value-card" key={value.title}>
                <span className="about-value-icon"><AboutIcon kind={value.icon} /></span>
                <div><h3>{value.title}</h3><p>{value.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-capability-section" aria-labelledby="about-capability-title">
        <div className="container about-capability-grid">
          <figure className="about-capability-image">
            <Image src="/images/about/about-quality-check.webp" alt="Nhân sự ghi nhận thông tin trong khu vực sản xuất" fill sizes="(max-width: 820px) 100vw, 48vw" />
            <figcaption>Hình ảnh thực tế tại khu vực sản xuất</figcaption>
          </figure>
          <div className="about-capability-copy">
            <p className="about-eyebrow">Năng lực thực hiện</p>
            <h2 id="about-capability-title">Không chỉ làm sản phẩm, chúng tôi xây dựng một cách làm có thể đồng hành lâu dài</h2>
            <span className="about-rule" aria-hidden="true" />
            <p>Vị Quê Việt kết nối việc phát triển sản phẩm với năng lực sản xuất thực tế. Mỗi trao đổi đều bắt đầu từ nhu cầu cụ thể, sau đó được làm rõ thành phương án để các bên dễ theo dõi và phối hợp.</p>
            <div className="about-capability-links">
              <Button href="/san-pham" variant="text">Khám phá sản phẩm →</Button>
              <Button href="/oem-odm" variant="text">Tìm hiểu OEM/ODM →</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="about-approach-section" aria-labelledby="about-approach-title">
        <div className="container">
          <header className="about-section-heading">
            <p className="about-eyebrow">Cách chúng tôi làm việc</p>
            <h2 id="about-approach-title">Một hành trình được sắp xếp theo từng bước</h2>
          </header>
          <div className="about-approach-grid">
            {approach.map((item) => (
              <article className="about-approach-card" key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-final-cta">
        <div className="container about-final-cta-inner">
          <div>
            <p className="about-eyebrow">Cùng phát triển sản phẩm</p>
            <h2>Bắt đầu từ một nhu cầu thực tế</h2>
            <p>Khám phá danh mục hiện có hoặc trao đổi thêm về năng lực sản xuất và hợp tác OEM/ODM.</p>
          </div>
          <div className="about-actions">
            <Button href="/san-pham">Xem sản phẩm</Button>
            <Button href="/lien-he" variant="secondary">Liên hệ</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
