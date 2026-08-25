"use client";

import { useState } from "react";

const faqItems = [
  {
    question: "Vị Quê Việt có nhận gia công OEM/ODM không?",
    answer: "Có. Chúng tôi cung cấp dịch vụ gia công OEM/ODM linh hoạt theo yêu cầu về công thức, bao bì và thương hiệu riêng. Vui lòng liên hệ để được tư vấn chi tiết và nhận báo giá phù hợp.",
  },
  {
    question: "Tôi muốn trở thành đại lý/nhà phân phối thì liên hệ ở đâu?",
    answer: "Quý đối tác có thể gửi thông tin qua form liên hệ hoặc liên hệ trực tiếp với bộ phận kinh doanh của Vị Quê Việt để được tư vấn về chính sách phân phối và hợp tác.",
  },
  {
    question: "Sau khi gửi yêu cầu bao lâu tôi sẽ được phản hồi?",
    answer: "Đội ngũ Vị Quê Việt thường phản hồi trong vòng 24 giờ làm việc kể từ khi tiếp nhận đầy đủ thông tin từ khách hàng hoặc đối tác.",
  },
  {
    question: "Có thể đến tham quan nhà máy không?",
    answer: "Có. Quý khách và đối tác có thể đăng ký lịch tham quan nhà máy để tìm hiểu quy trình sản xuất, hệ thống kiểm soát chất lượng và năng lực gia công của Vị Quê Việt.",
  },
  {
    question: "Vị Quê Việt có hỗ trợ phát triển sản phẩm mới không?",
    answer: "Có. Chúng tôi có thể đồng hành cùng đối tác trong quá trình nghiên cứu ý tưởng, phát triển công thức, lựa chọn bao bì và triển khai sản xuất phù hợp với định hướng thương hiệu.",
  },
  {
    question: "Chính sách đặt hàng và thanh toán như thế nào?",
    answer: "Chính sách đặt hàng, số lượng tối thiểu, thời gian sản xuất và phương thức thanh toán sẽ được tư vấn cụ thể tùy theo từng sản phẩm và hình thức hợp tác.",
  },
] as const;

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="contact-faq" id="cau-hoi-thuong-gap" aria-labelledby="contact-faq-title">
      <div className="container contact-faq-grid">
        <div className="contact-faq-intro">
          <p className="contact-faq-eyebrow"><LeafIcon /><span aria-hidden="true">•</span> Vị Quê Việt <span aria-hidden="true">•</span></p>
          <h2 id="contact-faq-title">Câu hỏi<br />thường gặp</h2>
          <span className="contact-faq-rule" aria-hidden="true" />
          <p className="contact-faq-description">Những thông tin dưới đây sẽ giúp Quý đối tác, khách hàng hiểu rõ hơn về sản phẩm, dịch vụ và chính sách hợp tác cùng Vị Quê Việt.</p>
          <a className="contact-faq-cta" href="#gui-yeu-cau"><HeadsetIcon /><span>Trao đổi nhu cầu OEM/ODM</span><span aria-hidden="true">→</span></a>
        </div>

        <div className="contact-faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `contact-faq-answer-${index + 1}`;
            const triggerId = `contact-faq-trigger-${index + 1}`;

            return (
              <article className={`contact-faq-item${isOpen ? " is-open" : ""}`} key={item.question}>
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="contact-faq-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="contact-faq-question">{item.question}</span>
                    <span className="contact-faq-toggle" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                </h3>
                <div
                  className="contact-faq-answer-wrap"
                  id={answerId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                >
                  <div><p>{item.answer}</p></div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LeafIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 3C11 4 6 8 6 15c0 3 2 5 5 5 7 0 9-8 9-17Z"/><path d="M5 22c3-7 7-11 12-15M9 17l-1-5m4 2 4-2m-3-2-1-3"/></svg>;
}

function HeadsetIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13a7 7 0 0 1 14 0v5"/><path d="M5 18H3v-5h3v6H5m14-1h2v-5h-3v6h1c0 2-1 3-4 3"/></svg>;
}
