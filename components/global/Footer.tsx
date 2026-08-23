import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand"><BrandMark linked={false} /></div>
          <p>Vị Quê Việt là doanh nghiệp thực phẩm Việt Nam chuyên sản xuất các món ăn truyền thống và sản phẩm tiện lợi mang hương vị quê nhà.</p>
        </div>
        <div>
          <h2>Về chúng tôi</h2>
          <Link href="/ve-vi-que-viet">Giới thiệu</Link><Link href="/nha-may">Nhà máy</Link><Link href="/oem-odm">OEM/ODM</Link><Link href="/tin-tuc">Tin tức</Link>
        </div>
        <div>
          <h2>Sản phẩm</h2>
          <Link href="/san-pham">Món ăn truyền thống</Link><Link href="/san-pham">Món ăn tiện lợi</Link><Link href="/san-pham">Gia vị – Nước chấm</Link>
        </div>
        <div>
          <h2>Hỗ trợ</h2>
          <Link href="/lien-he#gui-yeu-cau">Chính sách chất lượng</Link>
          <Link href="/lien-he#gui-yeu-cau">Chính sách đổi trả</Link>
          <Link href="/lien-he#gui-yeu-cau">Câu hỏi thường gặp</Link>
        </div>
        <div>
          <h2>Liên hệ</h2>
          <a href={siteConfig.phoneHref}>{siteConfig.phone}</a><a href={siteConfig.secondaryPhoneHref}>{siteConfig.secondaryPhone}</a><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><span>{siteConfig.address}</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Vị Quê Việt. All rights reserved.</span>
        <Link href="/lien-he#chinh-sach-bao-mat">Chính sách bảo mật</Link>
      </div>
    </footer>
  );
}
