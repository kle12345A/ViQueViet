"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

export function NewsletterForm({ variant = "inline" }: { variant?: "inline" | "stacked" }) {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("newsletter-email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Vui lòng nhập một địa chỉ email hợp lệ.");
      return;
    }
    setMessage("Vui lòng hoàn tất đăng ký trong ứng dụng email vừa được mở.");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Đăng ký nhận tin Vị Quê Việt")}&body=${encodeURIComponent(`Email đăng ký: ${email}`)}`;
  }

  return (
    <form className={`contact-newsletter-form${variant === "stacked" ? " is-stacked" : ""}`} onSubmit={submit} noValidate>
      <div><label className="sr-only" htmlFor={`newsletter-email-${variant}`}>Email nhận tin</label><input id={`newsletter-email-${variant}`} name="newsletter-email" type="email" autoComplete="email" placeholder="Nhập email của bạn..." /><button type="submit" aria-label="Đăng ký nhận tin">{variant === "stacked" ? "Đăng ký ngay" : "↗"}</button></div>
      <small>Chúng tôi cam kết bảo mật thông tin của bạn.</small>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
