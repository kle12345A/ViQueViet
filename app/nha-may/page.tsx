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
      <CTASection title="Bạn muốn tìm hiểu thêm về cách sản phẩm được làm?" />
    </>
  );
}
