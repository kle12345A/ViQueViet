import type { Metadata } from "next";
import { Footer } from "@/components/global/Footer";
import { Header } from "@/components/global/Header";
import { JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Vị Quê Việt | Đậm vị quê nhà", template: "%s | Vị Quê Việt" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: { url: "/images/brand/vi-que-viet-icon.png", type: "image/png", sizes: "192x192" },
    apple: { url: "/images/brand/vi-que-viet-apple.png", type: "image/png", sizes: "180x180" },
  },
  keywords: ["Vị Quê Việt", "thực phẩm chế biến", "giò chả", "xúc xích", "OEM thực phẩm"],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" data-scroll-behavior="smooth">
      <body>
        <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: siteConfig.legalName, url: siteConfig.url, logo: new URL("/images/brand/vi-que-viet-logo.png", siteConfig.url).toString(), telephone: siteConfig.phone || undefined }} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
