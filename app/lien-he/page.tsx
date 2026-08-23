import { ContactLandingPage } from "@/components/contact/ContactLandingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Liên hệ",
  "Liên hệ Vị Quê Việt để hỏi về sản phẩm, phân phối hoặc OEM/ODM.",
  "/lien-he",
);

export default function ContactPage() {
  return <ContactLandingPage />;
}
