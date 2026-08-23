import { Button } from "@/components/ui/Button";

export function CTASection({ title = "Muốn biết thêm về sản phẩm?", description = "Vị Quê Việt sẵn sàng trao đổi về sản phẩm, phân phối và nhu cầu gia công OEM/ODM." }: { title?: string; description?: string }) {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div><p className="eyebrow">Trao đổi cùng chúng tôi</p><h2>{title}</h2><p>{description}</p></div>
        <div className="button-row"><Button href="/lien-he">Gửi yêu cầu</Button><Button href="/san-pham" variant="secondary">Xem sản phẩm</Button></div>
      </div>
    </section>
  );
}
