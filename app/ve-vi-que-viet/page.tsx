import { AboutLandingPage } from "@/components/brand/AboutLandingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Về Vị Quê Việt",
  "Vị Quê Việt gìn giữ hương vị quê nhà bằng sản phẩm tiện lợi, quy trình sản xuất bài bản và năng lực hợp tác OEM/ODM.",
  "/ve-vi-que-viet",
  "/images/about/about-production-team.webp",
);

export default function AboutPage() {
  return <AboutLandingPage />;
}
