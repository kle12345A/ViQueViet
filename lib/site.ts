const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "0888 72 75 75";
const secondaryPhone = process.env.NEXT_PUBLIC_SECONDARY_PHONE ?? "0942 668 699";
const zaloUrl = process.env.NEXT_PUBLIC_ZALO_URL ?? "";

export const siteConfig = {
  name: "Vị Quê Việt",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME ?? "Vị Quê Việt",
  description:
    "Những món ăn quen vị Việt, được làm chỉn chu để mỗi bữa cơm thêm tiện và ngon.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: contactPhone,
  secondaryPhone,
  phoneHref: contactPhone ? `tel:${contactPhone.replace(/\s/g, "")}` : "/lien-he",
  secondaryPhoneHref: secondaryPhone ? `tel:${secondaryPhone.replace(/\s/g, "")}` : "/lien-he",
  zaloHref: zaloUrl || "/lien-he",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "lienhe@linhdangfoods.vn",
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? "Lô C12-1/2, đường Quang Trung, P. Bồng Lai, TX. Quế Võ, Bắc Ninh",
  publicWebsite: process.env.NEXT_PUBLIC_PUBLIC_WEBSITE ?? "https://linhdangfoods.vn",
  workingHours: process.env.NEXT_PUBLIC_WORKING_HOURS ?? "Thứ 2 – Thứ 7 · 08:00 – 17:30",
};

export const navigation = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/oem-odm", label: "OEM/ODM" },
  { href: "/nha-may", label: "Nhà máy" },
  { href: "/ve-vi-que-viet", label: "Về chúng tôi" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];
