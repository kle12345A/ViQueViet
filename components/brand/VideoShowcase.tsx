import { Button } from "@/components/ui/Button";

export function VideoShowcase() {
  return (
    <section className="section video-showcase" id="tu-lieu-thuc-te">
      <div className="container video-about-grid">
        <div className="youtube-frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/6d-6s5q0sto?rel=0"
            title="BTV - Phóng sự giới thiệu Công ty TNHH Thực phẩm An toàn Linh Đăng"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="video-about-copy">
          <p className="eyebrow">Về chúng tôi</p>
          <h2>Vị Quê Việt</h2>
          <p><strong>Vị Quê Việt</strong> chọn những món ăn đã quen trong bữa cơm người Việt và chuẩn bị theo cách gọn gàng hơn cho nhịp sống hôm nay. Danh mục trải từ giò chả, xúc xích, lạp xưởng đến các món ăn tiện lợi, phù hợp cho gia đình, cửa hàng và kênh phân phối.</p>
          <p>Với đối tác thương hiệu, chúng tôi bắt đầu từ nhu cầu thực tế: nhóm người mua, hương vị, quy cách, mức sản lượng và kế hoạch đưa hàng ra thị trường. Từng đề bài được đối chiếu với năng lực sản xuất, thử mẫu và hồ sơ cần thiết trước khi thống nhất bước tiếp theo.</p>
          <p>Phóng sự bên cạnh là tư liệu gốc giúp người xem quan sát rõ hơn con người, thiết bị và hoạt động bên trong khu vực sản xuất.</p>
          <div className="button-row">
            <Button href="/ve-vi-que-viet">Xem thêm về chúng tôi</Button>
            <a className="video-youtube-link" href="https://www.youtube.com/watch?v=6d-6s5q0sto" target="_blank" rel="noreferrer">Xem trên YouTube ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
