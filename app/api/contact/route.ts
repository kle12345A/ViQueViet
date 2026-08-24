import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  type?: "contact" | "newsletter";
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
  consent?: boolean;
  company?: string;
};

const attempts = new Map<string, { count: number; expiresAt: number }>();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  })[character] ?? character);
}

function isRateLimited(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwardedFor || request.headers.get("x-real-ip") || "local";
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.expiresAt <= now) {
    attempts.set(key, { count: 1, expiresAt: now + 10 * 60_000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return Response.json({ message: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau." }, { status: 429 });
  }

  let payload: ContactPayload;
  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return Response.json({ message: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  if (clean(payload.company, 120)) return Response.json({ ok: true });

  const type = payload.type === "newsletter" ? "newsletter" : "contact";
  const email = clean(payload.email, 160).toLowerCase();
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ message: "Email chưa hợp lệ." }, { status: 400 });
  }

  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPassword = process.env.SMTP_PASS?.replace(/\s/g, "");
  const recipient = process.env.CONTACT_TO_EMAIL?.trim() || smtpUser || "Viqueviet2026@gmail.com";
  if (!smtpUser || !smtpPassword) {
    return Response.json({ message: "Hệ thống email chưa được cấu hình đầy đủ." }, { status: 503 });
  }

  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: smtpPort,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPassword },
  });

  let subject: string;
  let text: string;
  let html: string;

  if (type === "newsletter") {
    subject = "[Website] Đăng ký nhận tin mới";
    text = `Email đăng ký: ${email}`;
    html = `<h2>Đăng ký nhận tin mới</h2><p><strong>Email:</strong> ${escapeHtml(email)}</p>`;
  } else {
    const name = clean(payload.name, 100);
    const phone = clean(payload.phone, 30);
    const topic = clean(payload.subject, 120).replace(/[\r\n]+/g, " ");
    const message = clean(payload.message, 4_000);
    if (name.length < 2 || phone.replace(/\D/g, "").length < 9 || !topic || message.length < 10 || payload.consent !== true) {
      return Response.json({ message: "Vui lòng kiểm tra lại các trường bắt buộc." }, { status: 400 });
    }
    subject = `[Website Vị Quê Việt] ${topic}`;
    text = [`Họ và tên: ${name}`, `Điện thoại: ${phone}`, `Email: ${email}`, `Chủ đề: ${topic}`, "", message].join("\n");
    html = `<h2>Yêu cầu liên hệ mới từ website</h2><p><strong>Họ và tên:</strong> ${escapeHtml(name)}</p><p><strong>Điện thoại:</strong> ${escapeHtml(phone)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Chủ đề:</strong> ${escapeHtml(topic)}</p><p><strong>Nội dung:</strong></p><p style="white-space:pre-line">${escapeHtml(message)}</p>`;
  }

  try {
    await transporter.sendMail({
      from: `"Website Vị Quê Việt" <${smtpUser}>`,
      to: recipient,
      replyTo: email,
      subject,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Unable to send contact email:", error instanceof Error ? error.message : "Unknown SMTP error");
    return Response.json({ message: "Chưa thể gửi email lúc này. Vui lòng thử lại sau." }, { status: 502 });
  }
}
