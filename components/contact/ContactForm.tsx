"use client";

import { FormEvent, ReactNode, useState } from "react";

type Fields = "name" | "phone" | "email" | "subject" | "message" | "consent";
type Errors = Partial<Record<Fields, string>>;

const subjects = ["Tư vấn sản phẩm", "Hợp tác phân phối", "OEM/ODM", "Thăm nhà máy", "Khác"];

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const result = validate(new FormData(form));
    setErrors(result.next);
    if (Object.keys(result.next).length) {
      setStatus("idle");
      return;
    }
    setStatus("loading");
    setSubmitMessage("");
    try {
      const formData = new FormData(form);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: result.name,
          phone: result.phone,
          email: result.email,
          subject: result.subject,
          message: result.message,
          consent: true,
          company: String(formData.get("company") ?? ""),
        }),
      });
      const responseBody = await response.json().catch(() => ({})) as { message?: string };
      if (!response.ok) throw new Error(responseBody.message || "Không thể gửi yêu cầu.");
      form.reset();
      setStatus("success");
      setSubmitMessage("Yêu cầu đã được gửi. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.");
    } catch (error) {
      setStatus("error");
      setSubmitMessage(error instanceof Error ? error.message : "Chưa thể gửi yêu cầu. Vui lòng thử lại sau.");
    }
  }

  return (
    <form className="contact-request-form" onSubmit={handleSubmit} noValidate>
      <label className="contact-honeypot" aria-hidden="true">Công ty<input name="company" tabIndex={-1} autoComplete="off" /></label>
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
      {submitMessage && <p className={status === "success" ? "contact-form-success" : "contact-form-error"} role="status">{submitMessage}</p>}
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
