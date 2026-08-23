import { notFound } from "next/navigation";
import { ProductListingHero } from "@/components/product/ProductListingHero";
import { ProductListingPage } from "@/components/product/ProductListingPage";
import { getProducts } from "@/lib/content";
import { paginate } from "@/lib/pagination";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { const total = paginate(getProducts(), 1, 8).totalPages; return Array.from({ length: total - 1 }, (_, index) => ({ page: String(index + 2) })); }
export async function generateMetadata({ params }: PageProps<"/san-pham/page/[page]">) { const { page } = await params; return pageMetadata(`Sản phẩm - Trang ${page}`, `Danh mục sản phẩm Vị Quê Việt, trang ${page}.`, `/san-pham/page/${page}`); }

export default async function ProductsPaginationPage({ params }: PageProps<"/san-pham/page/[page]">) {
  const page = Number((await params).page);
  const total = paginate(getProducts(), 1, 8).totalPages;
  if (!Number.isInteger(page) || page < 2 || page > total) notFound();
  return <><ProductListingHero /><ProductListingPage page={page} /></>;
}
