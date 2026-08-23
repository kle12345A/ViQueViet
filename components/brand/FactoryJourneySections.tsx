import Image from "next/image";

const processSteps = [
  { title: "Tiếp nhận", description: "Chuẩn bị nguyên liệu và thông tin cho từng mẻ sản phẩm." },
  { title: "Sơ chế", description: "Làm sạch và chuẩn bị trong khu vực thao tác phù hợp." },
  { title: "Chế biến", description: "Thực hiện lần lượt theo đặc điểm của từng món." },
  { title: "Đóng gói", description: "Hoàn thiện quy cách trước khi lưu kho và bàn giao." },
  { title: "Kiểm tra", description: "Đối chiếu sản phẩm và thông tin trước khi hoàn tất." },
] as const;

const focusAreas = [
  { eyebrow: "Con người", title: "Máy móc hỗ trợ, con người giữ sự chỉn chu", description: "Chuẩn bị, tạo hình, cân và đóng gói đều cần sự tập trung. Chính những thao tác nhỏ lặp lại mỗi ngày tạo nên độ ổn định của sản phẩm.", image: "/images/factory/production-line.webp", alt: "Dây chuyền và nhân sự thao tác tại xưởng" },
  { eyebrow: "Kiểm tra", title: "Quan sát kỹ trước khi hoàn tất", description: "Sản phẩm được theo dõi qua từng bước và đối chiếu lại khi đóng gói để bảo đảm đúng quy cách đã thống nhất.", image: "/images/factory/quality-control.webp", alt: "Cân và kiểm tra sản phẩm tại nhà máy" },
] as const;

export function FactoryJourneySections() {
  return (
    <>
      <section className="factory-detail-section factory-process-section" id="quy-trinh-nha-may">
        <div className="container factory-detail-container">
          <header className="factory-detail-heading">
            <p>Một mẻ sản phẩm</p>
            <h2>Đi qua từng công đoạn</h2>
            <span>Mỗi bước được sắp xếp theo một trình tự rõ ràng để việc phối hợp và kiểm tra thuận tiện hơn.</span>
          </header>
          <div className="factory-process-list">
            {processSteps.map((step, index) => (
              <article className="factory-process-card" key={step.title}>
                <span className="factory-process-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="factory-detail-section factory-focus-section" id="con-nguoi-nha-may">
        <div className="container factory-detail-container factory-focus-list">
          {focusAreas.map((area, index) => (
            <article className={`factory-focus-row ${index % 2 ? "is-reverse" : ""}`} key={area.eyebrow}>
              <div className="factory-focus-image" style={{ position: "relative" }}><Image src={area.image} alt={area.alt} fill sizes="(max-width: 820px) 100vw, 50vw" /></div>
              <div className="factory-focus-copy">
                <p className="factory-detail-eyebrow">{area.eyebrow}</p>
                <h2>{area.title}</h2>
                <p className="factory-focus-description">{area.description}</p>
                <span className="factory-focus-note">Hình ảnh từ khu vực sản xuất</span>
              </div>
            </article>
          ))}
        </div>
      </section>

    </>
  );
}
