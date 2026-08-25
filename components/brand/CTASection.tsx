import { Button } from "@/components/ui/Button";

export function CTASection({ title = "Bạn đang có một sản phẩm cần phát triển?", description = "Gửi nhóm sản phẩm, hương vị mong muốn, quy cách và sản lượng dự kiến. Đội ngũ Vị Quê Việt sẽ tiếp nhận để cùng làm rõ phương án OEM/ODM phù hợp." }: { title?: string; description?: string }) {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div><p className="eyebrow">Bắt đầu dự án OEM/ODM</p><h2>{title}</h2><p>{description}</p></div>
        <div className="button-row"><Button href="/lien-he#gui-yeu-cau">Gửi yêu cầu OEM/ODM →</Button><Button href="/san-pham" variant="secondary">Xem nhóm sản phẩm</Button></div>
      </div>
    </section>
  );
}
