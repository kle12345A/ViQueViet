"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm({ variant = "inline" }: { variant?: "inline" | "stacked" }) {
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("newsletter-email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Vui lòng nhập một địa chỉ email hợp lệ.");
      return;
    }
    setMessage("Đang gửi...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email }),
      });
      const responseBody = await response.json().catch(() => ({})) as { message?: string };
      if (!response.ok) throw new Error(responseBody.message || "Không thể đăng ký nhận tin.");
      form.reset();
      setMessage("Đăng ký thành công. Cảm ơn bạn đã quan tâm!");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Chưa thể đăng ký. Vui lòng thử lại sau.");
    }
  }

  return (
    <form className={`contact-newsletter-form${variant === "stacked" ? " is-stacked" : ""}`} onSubmit={submit} noValidate>
      <div><label className="sr-only" htmlFor={`newsletter-email-${variant}`}>Email nhận tin</label><input id={`newsletter-email-${variant}`} name="newsletter-email" type="email" autoComplete="email" placeholder="Nhập email của bạn..." /><button type="submit" aria-label="Đăng ký nhận tin">{variant === "stacked" ? "Đăng ký ngay" : "↗"}</button></div>
      <small>Chúng tôi cam kết bảo mật thông tin của bạn.</small>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
