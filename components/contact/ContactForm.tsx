"use client";

import { FormEvent, ReactNode, useState } from "react";
import { siteConfig } from "@/lib/site";

type Fields = "name" | "phone" | "email" | "subject" | "message" | "consent";
type Errors = Partial<Record<Fields, string>>;

const subjects = ["Tư vấn sản phẩm", "Hợp tác phân phối", "OEM/ODM", "Thăm nhà máy", "Khác"];

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  function validate(data: FormData) {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2) next.name = "Vui lòng nhập họ và tên.";
    if (phone.replace(/\D/g, "").length < 9) next.phone = "Số điện thoại chưa hợp lệ.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Email chưa hợp lệ.";
    if (!subject) next.subject = "Vui lòng chọn chủ đề.";
    if (message.length < 10) next.message = "Vui lòng mô tả nhu cầu rõ hơn.";
    if (data.get("consent") !== "on") next.consent = "Bạn cần đồng ý trước khi gửi.";
    return { next, name, phone, email, subject, message };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const result = validate(new FormData(form));
    setErrors(result.next);
    if (Object.keys(result.next).length) {
      setStatus("idle");
      return;
    }
    setStatus("loading");
    const body = [
      `Họ và tên: ${result.name}`,
      `Điện thoại: ${result.phone}`,
      `Email: ${result.email}`,
      `Chủ đề: ${result.subject}`,
      "",
      result.message,
    ].join("\n");
    window.setTimeout(() => {
      setStatus("success");
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`[Website] ${result.subject}`)}&body=${encodeURIComponent(body)}`;
    }, 350);
  }

  return (
    <form className="contact-request-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-grid">
        <FormField label="Họ và tên" name="name" error={errors.name}><input id="contact-name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} /></FormField>
        <FormField label="Số điện thoại" name="phone" error={errors.phone}><input id="contact-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "contact-phone-error" : undefined} /></FormField>
        <FormField label="Email" name="email" error={errors.email}><input id="contact-email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} /></FormField>
        <FormField label="Chủ đề" name="subject" error={errors.subject}>
          <select id="contact-subject" name="subject" defaultValue="" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "contact-subject-error" : undefined}>
            <option value="" disabled>Chọn nội dung cần trao đổi</option>
            {subjects.map((subject) => <option key={subject}>{subject}</option>)}
          </select>
        </FormField>
        <FormField label="Nội dung" name="message" error={errors.message} wide><textarea id="contact-message" name="message" rows={6} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} /></FormField>
      </div>
      <label id="chinh-sach-bao-mat" className={`contact-consent ${errors.consent ? "has-error" : ""}`}>
        <input name="consent" type="checkbox" />
        <span>Tôi đồng ý để Vị Quê Việt sử dụng thông tin này để liên hệ lại theo chính sách bảo mật.</span>
      </label>
      {errors.consent && <span className="contact-field-error" role="alert">{errors.consent}</span>}
      <button className="contact-submit" type="submit" disabled={status === "loading"}>{status === "loading" ? "Đang chuẩn bị..." : "Gửi yêu cầu"}</button>
      {status === "success" && <p className="contact-form-success" role="status">Nội dung đã được chuẩn bị trong ứng dụng email. Vui lòng kiểm tra và bấm gửi để hoàn tất.</p>}
    </form>
  );
}

function FormField({ label, name, error, wide = false, children }: { label: string; name: Fields; error?: string; wide?: boolean; children: ReactNode }) {
  return (
    <label className={`contact-field ${wide ? "is-wide" : ""}`} htmlFor={`contact-${name}`}>
      <span>{label} <b aria-hidden="true">*</b></span>
      {children}
      {error && <small id={`contact-${name}-error`} className="contact-field-error" role="alert">{error}</small>}
    </label>
  );
}
