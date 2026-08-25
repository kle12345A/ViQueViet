import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { NewsletterForm } from "./NewsletterForm";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";

type IconName = "headset" | "shield" | "handshake" | "pin" | "phone" | "mail" | "globe" | "clock" | "factory" | "process" | "leaf" | "people";

const heroFeatures: { icon: IconName; title: string; text: string }[] = [
  { icon: "headset", title: "Tư vấn tận tâm", text: "Đội ngũ chuyên viên luôn sẵn sàng hỗ trợ" },
  { icon: "shield", title: "Phản hồi nhanh", text: "Giải đáp trong 24–48 giờ" },
  { icon: "handshake", title: "Đồng hành lâu dài", text: "Hợp tác bền vững, cùng phát triển" },
];

const contactItems: { icon: IconName; title: string; content: ReactNode }[] = [
  { icon: "pin", title: "Địa chỉ", content: siteConfig.address },
  { icon: "phone", title: "Điện thoại", content: <><a href={siteConfig.phoneHref}>{siteConfig.phone}</a>{siteConfig.secondaryPhone ? <a href={siteConfig.secondaryPhoneHref}>{siteConfig.secondaryPhone}</a> : null}</> },
  { icon: "mail", title: "Email", content: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> },
  { icon: "globe", title: "Website", content: <a href={siteConfig.publicWebsite} target="_blank" rel="noreferrer">www.linhdangfoods.vn</a> },
  { icon: "clock", title: "Thời gian làm việc", content: <>{siteConfig.workingHours}<br />Chủ nhật: Nghỉ</> },
];

const values: { icon: IconName; title: string; text: string }[] = [
  { icon: "factory", title: "Nhà máy hiện đại", text: "Trang thiết bị tiên tiến, đáp ứng tiêu chuẩn" },
  { icon: "process", title: "Quy trình chuẩn hóa", text: "Kiểm soát chất lượng từng công đoạn" },
  { icon: "leaf", title: "Nguyên liệu chọn lọc", text: "Lựa chọn kỹ càng, an toàn – chất lượng" },
  { icon: "people", title: "Hợp tác bền vững", text: "Đồng hành và phát triển dài lâu cùng đối tác" },
];

export function ContactLandingPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`;

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <Image className="route-hero-background" src="/images/news/news-watercolor-bg.webp" alt="" fill priority fetchPriority="high" sizes="100vw" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} />
        <div className="container contact-hero-grid">
          <div className="contact-hero-copy">
            <p className="contact-eyebrow">Liên hệ</p>
            <h1>Chúng tôi luôn sẵn sàng<br />nghe và đồng hành cùng bạn</h1>
            <p className="contact-hero-description">Bạn có câu hỏi về sản phẩm, cần tư vấn OEM/ODM hoặc muốn hợp tác phân phối? Hãy liên hệ với Linh Đăng Foods — chúng tôi sẽ phản hồi trong thời gian sớm nhất.</p>
            <div className="contact-hero-features">
              {heroFeatures.map((item) => <div className="contact-hero-feature" key={item.title}><Icon name={item.icon} /><div><strong>{item.title}</strong><span>{item.text}</span></div></div>)}
            </div>
          </div>
          <div className="contact-hero-media">
            <span className="contact-hero-pigment" aria-hidden="true" />
            <div className="contact-hero-photo">
              <Image className="contact-hero-image" src="/images/contact/contact-factory.webp" alt="Khu vực sản xuất thực tế của Linh Đăng Foods" fill priority unoptimized sizes="(max-width: 900px) 100vw, 52vw" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} />
            </div>
            <span className="contact-hero-bamboo contact-hero-bamboo-top" aria-hidden="true" />
            <span className="contact-hero-bamboo contact-hero-bamboo-bottom" aria-hidden="true" />
            <aside className="contact-hero-note" aria-label="Cam kết đồng hành">Tư vấn tận tâm<br />— Đồng hành lâu dài</aside>
            <div className="contact-hero-badge" role="img" aria-label="Dấu thương hiệu Vị Quê Việt"><Image src="/images/brand/vi-que-viet-logo.png" alt="" fill sizes="112px" /></div>
          </div>
        </div>
      </section>

      <section className="contact-main-section" id="gui-yeu-cau">
        <div className="container contact-main-grid">
          <article className="contact-info-panel">
            <p className="contact-eyebrow">Thông tin liên hệ</p>
            <h2>Kết nối trực tiếp với Vị Quê Việt</h2>
            <div className="contact-info-list">
              {contactItems.map((item) => <div className="contact-info-item" key={item.title}><Icon name={item.icon} /><div><strong>{item.title}</strong><span>{item.content}</span></div></div>)}
            </div>
          </article>
          <article className="contact-form-panel">
            <p className="contact-eyebrow">Gửi yêu cầu liên hệ</p>
            <h2>Chúng tôi có thể hỗ trợ bạn điều gì?</h2>
            <p>Để lại thông tin và nội dung cần trao đổi, đội ngũ Vị Quê Việt sẽ liên hệ lại qua kênh phù hợp.</p>
            <ContactForm />
          </article>
        </div>
      </section>

      <section className="contact-visit-section" id="tham-quan">
        <div className="container contact-visit-grid">
          <div className="contact-visit-copy">
            <p className="contact-eyebrow">Đến với chúng tôi</p>
            <h2>Tham quan nhà máy</h2>
            <p>Chúng tôi luôn chào đón đối tác, khách hàng đến tham quan nhà máy và tìm hiểu quy trình sản xuất của Vị Quê Việt.</p>
            <Button href="#gui-yeu-cau" variant="secondary">Đặt lịch tham quan</Button>
          </div>
          <div className="contact-map"><iframe src={mapSrc} title={`Bản đồ ${siteConfig.address}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </div>
      </section>

      <section className="contact-values-section" aria-label="Giá trị hợp tác">
        <div className="container contact-values-grid">
          {values.map((item) => <article className="contact-value" key={item.title}><Icon name={item.icon} /><div><h2>{item.title}</h2><p>{item.text}</p></div></article>)}
        </div>
      </section>

      <section className="contact-newsletter">
        <div className="container contact-newsletter-inner"><div><p className="contact-eyebrow">Đăng ký nhận thông tin</p><h2>Cập nhật tin tức từ Vị Quê Việt</h2><span>Nhận tin tức, sản phẩm mới và thông tin ưu đãi.</span></div><NewsletterForm /></div>
      </section>
    </div>
  );
}

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    headset: <><path d="M5 13a7 7 0 0 1 14 0v5"/><path d="M5 18H3v-5h3v6H5m14-1h2v-5h-3v6h1c0 2-1 3-4 3"/></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.3 8.3-8 10-4.7-1.7-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    handshake: <><path d="m8 12 3 3c1 1 2.4-.4 1.4-1.4l-2.5-2.5"/><path d="m12.4 13.6 1.2 1.2c1 1 2.4-.4 1.4-1.4l-3.2-3.2"/><path d="m15 13.4.4.4c1 1 2.4-.4 1.4-1.4L13 8.6c-.8-.8-1.8-.8-2.6 0L9 10c-.7.7-1.8.7-2.5 0L6 9.5l4-4c.8-.8 2-.8 2.8 0l.7.7"/><path d="m3 6 3-2 3 3m12-1-3-2-3 3M3 6l3 6-2 2m17-8-3 6 2 2"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    phone: <path d="M7 3H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3l-4-1-1.4 2.2a15 15 0 0 1-9.8-9.8L8 7 7 3Z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    factory: <><path d="M3 21V10l6 3V9l6 4V5h6v16Z"/><path d="M7 17h2m3 0h2m3 0h2"/></>,
    process: <><path d="M7 5h10v4H7zM5 9h14v12H5z"/><path d="m9 15 2 2 4-5"/></>,
    leaf: <><path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16Z"/><path d="M4 21c3-6 7-9 12-12"/></>,
    people: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 21v-2c0-4 2-6 6-6s6 2 6 6v2m0-7c3 0 6 2 6 6v1"/></>,
  };
  return <span className="contact-icon" data-icon={name} aria-hidden="true"><svg viewBox="0 0 24 24">{paths[name]}</svg></span>;
}
