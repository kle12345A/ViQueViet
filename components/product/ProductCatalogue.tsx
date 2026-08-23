"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/content/types";
import { ProductCard } from "./ProductCard";

export function ProductCatalogue({ initialProducts, allProducts }: { initialProducts: Product[]; allProducts: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const categories = useMemo(() => Array.from(new Map(allProducts.map((item) => [item.category, item.categoryLabel]))), [allProducts]);
  const filtered = useMemo(() => {
    if (!query && category === "all") return initialProducts;
    const needle = query.trim().toLocaleLowerCase("vi");
    return allProducts.filter((item) => (category === "all" || item.category === category) && (!needle || `${item.name} ${item.excerpt}`.toLocaleLowerCase("vi").includes(needle)));
  }, [allProducts, category, initialProducts, query]);

  return (
    <div>
      <div className="product-tools">
        <label className="search-box"><span className="sr-only">Tìm sản phẩm</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm sản phẩm…" /></label>
        <div className="filter-chips" aria-label="Lọc theo danh mục">
          <button className={category === "all" ? "active" : ""} onClick={() => setCategory("all")} type="button">Tất cả</button>
          {categories.map(([value, label]) => <button className={category === value ? "active" : ""} key={value} onClick={() => setCategory(value)} type="button">{label}</button>)}
        </div>
      </div>
      <p className="result-count" aria-live="polite">Hiển thị {filtered.length} sản phẩm</p>
      {filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard product={product} key={product.slug} />)}</div> : <div className="empty-state"><h2>Chưa tìm thấy sản phẩm</h2><p>Thử một từ khóa hoặc danh mục khác.</p></div>}
    </div>
  );
}
