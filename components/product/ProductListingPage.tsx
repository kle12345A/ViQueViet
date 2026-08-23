import { ProductCatalogue } from "./ProductCatalogue";
import { Pagination } from "@/components/ui/Pagination";
import { getProducts } from "@/lib/content";
import { paginate } from "@/lib/pagination";

export function ProductListingPage({ page }: { page: number }) {
  const allProducts = getProducts();
  const result = paginate(allProducts, page, 8);
  const previews = allProducts.map((item) => ({ ...item, body: "" }));
  return <section className="section" id="danh-sach-san-pham"><div className="container"><ProductCatalogue initialProducts={result.items.map((item) => ({ ...item, body: "" }))} allProducts={previews} /><Pagination current={result.page} total={result.totalPages} basePath="/san-pham" /></div></section>;
}
