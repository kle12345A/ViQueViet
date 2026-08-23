import { ProductListingPage } from "@/components/product/ProductListingPage";
import { ProductListingHero } from "@/components/product/ProductListingHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Sản phẩm", "Khám phá giò chả, xúc xích và những món ăn quen vị của Vị Quê Việt.", "/san-pham");

export default function ProductsPage() {
  return <><ProductListingHero /><ProductListingPage page={1} /></>;
}
