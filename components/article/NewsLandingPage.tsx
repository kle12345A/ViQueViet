"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { NewsletterForm } from "@/components/contact/NewsletterForm";
import type { NewsArticle } from "@/lib/content/types";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";

const categories = ["Tất cả", "Tin doanh nghiệp", "Sản phẩm", "Sản xuất", "Ẩm thực", "Sự kiện", "OEM/ODM"] as const;
const pageSize = 6;

function displayCategory(category: string) {
  if (category === "Món ngon") return "Ẩm thực";
  if (category === "Chất lượng") return "Sản xuất";
  return category;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${value}T00:00:00+07:00`));
}

export function NewsLandingPage({ articles }: { articles: NewsArticle[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Tất cả");
  const [page, setPage] = useState(1);
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const isFiltering = query.trim().length > 0 || category !== "Tất cả";

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("vi");
    return articles.filter((article) => {
      const articleCategory = displayCategory(article.category);
      const matchesCategory = category === "Tất cả" || articleCategory === category;
      const haystack = `${article.title} ${article.excerpt} ${articleCategory}`.toLocaleLowerCase("vi");
      return matchesCategory && (!normalized || haystack.includes(normalized));
    });
  }, [articles, category, query]);

  const listing = isFiltering ? filtered : articles.filter((article) => article.slug !== featured?.slug);
  const totalPages = Math.max(1, Math.ceil(listing.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visible = listing.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="news-page">
      <section className="news-hero">
        <Image className="route-hero-background" src="/images/news/news-watercolor-bg.webp" alt="" fill priority fetchPriority="high" sizes="100vw" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} />
        <div className="container news-hero-grid">
          <div className="news-hero-copy">
            <p className="news-eyebrow">Tin tức</p>
            <h1>Cập nhật câu chuyện từ Vị Quê Việt</h1>
            <p>Những câu chuyện về sản phẩm, hoạt động doanh nghiệp, quy trình sản xuất, ẩm thực và hành trình gìn giữ hương vị quê nhà.</p>
            <label className="news-search"><span className="sr-only">Tìm kiếm tin tức</span><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Tìm kiếm tin tức..." /><span aria-hidden="true"><SearchIcon /></span></label>
          </div>
          <figure className="news-hero-media"><Image src="/images/news/news-hero-factory.webp" alt="Nhân viên đang thao tác trong khu vực sản xuất" fill priority sizes="(max-width: 900px) 100vw, 58vw" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} /><figcaption>Tin từ Vị Quê Việt</figcaption></figure>
        </div>
      </section>

      <section className="news-content-section">
        <div className="container">
          <nav className="news-categories" aria-label="Chủ đề tin tức">
            {categories.map((item) => <button type="button" key={item} className={category === item ? "is-active" : ""} onClick={() => { setCategory(item); setPage(1); }}><CategoryIcon category={item} />{item}</button>)}
          </nav>

          {!isFiltering && featured && <article className="news-featured">
            <Link className="news-featured-image" href={`/tin-tuc/${featured.slug}`} tabIndex={-1} aria-hidden="true"><Image src={featured.image} alt="" fill sizes="(max-width: 900px) 100vw, 55vw" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} /></Link>
            <div className="news-featured-copy"><p className="news-eyebrow">{displayCategory(featured.category)} · Tin nổi bật</p><h2><Link href={`/tin-tuc/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time><Link className="news-read-link" href={`/tin-tuc/${featured.slug}`}>Đọc bài viết <span>→</span></Link></div>
          </article>}

          <div className="news-results-heading"><div><p className="news-eyebrow">Bài viết mới</p><h2>{isFiltering ? "Kết quả tìm kiếm" : "Khám phá thêm câu chuyện"}</h2></div><span>{listing.length} bài viết</span></div>
          {visible.length ? <div className="news-grid">{visible.map((article, index) => <NewsCard article={article} eager={index < 3} key={article.slug} />)}</div> : <div className="news-empty"><h2>Chưa tìm thấy bài viết phù hợp</h2><p>Hãy thử từ khóa khác hoặc chọn lại chủ đề.</p><button type="button" onClick={() => { setQuery(""); setCategory("Tất cả"); }}>Xem tất cả bài viết</button></div>}

          {visible.length > 0 && <Pagination page={safePage} total={totalPages} onChange={setPage} />}
        </div>
      </section>

      <section className="news-newsletter"><div className="container news-newsletter-inner"><div><p className="news-eyebrow">Đăng ký nhận tin</p><h2>Nhận tin tức mới từ Vị Quê Việt</h2><span>Cập nhật sản phẩm mới, hoạt động doanh nghiệp và những câu chuyện từ Vị Quê Việt.</span></div><NewsletterForm /></div></section>
    </div>
  );
}

function NewsCard({ article, eager = false }: { article: NewsArticle; eager?: boolean }) {
  return <article className="news-card"><Link className="news-card-image" href={`/tin-tuc/${article.slug}`} tabIndex={-1} aria-hidden="true"><Image src={article.image} alt="" fill loading={eager ? "eager" : "lazy"} sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 33vw" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} /></Link><div className="news-card-body"><p className="news-eyebrow">{displayCategory(article.category)}</p><h3><Link href={`/tin-tuc/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><div><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time><Link href={`/tin-tuc/${article.slug}`}>Xem thêm <span>→</span></Link></div></div></article>;
}

function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (page: number) => void }) {
  return <nav className="news-pagination" aria-label="Phân trang"><button type="button" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Trang trước">←</button><div className="news-pagination-desktop">{Array.from({ length: total }, (_, index) => index + 1).map((item) => <button type="button" className={page === item ? "is-active" : ""} aria-current={page === item ? "page" : undefined} key={item} onClick={() => onChange(item)}>{item}</button>)}</div><span className="news-pagination-mobile">{page} / {total}</span><button type="button" disabled={page === total} onClick={() => onChange(page + 1)} aria-label="Trang sau">→</button></nav>;
}

function SearchIcon() { return <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg>; }
function CategoryIcon({ category }: { category: string }) { return <svg viewBox="0 0 24 24" aria-hidden="true">{category === "Sản phẩm" ? <><path d="M7 8h10l1 13H6L7 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></> : category === "Sản xuất" ? <><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2"/></> : category === "Ẩm thực" ? <><path d="M5 3v8m3-8v8M5 7h3m-1 4v10M16 3c3 4 3 8 0 11v7"/></> : category === "OEM/ODM" ? <><path d="M3 21V10l6 3V9l6 4V5h6v16Z"/></> : <><rect x="5" y="4" width="14" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>}</svg>; }
