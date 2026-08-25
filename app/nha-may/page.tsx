import { CTASection } from "@/components/brand/CTASection";
import { FactoryJourneySections } from "@/components/brand/FactoryJourneySections";
import { FactoryLandingHero } from "@/components/brand/FactoryLandingHero";
import { FactorySpacesSection } from "@/components/brand/FactorySpacesSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Nhà máy sản xuất",
  "Hình ảnh thực tế về không gian, con người và các công đoạn sản xuất.",
  "/nha-may",
  "/images/factory/factory-hero.webp",
);

export default function FactoryPage() {
  return (
    <>
      <FactoryLandingHero />
      <FactorySpacesSection />
      <FactoryJourneySections />
      <CTASection title="Bạn cần đánh giá nhà máy trước khi bắt đầu dự án?" description="Gửi nhóm sản phẩm và yêu cầu dự kiến để đội ngũ Vị Quê Việt chuẩn bị nội dung trao đổi, hình ảnh khu vực phù hợp hoặc lịch tham quan nhà máy." />
    </>
  );
}
