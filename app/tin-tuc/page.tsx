import { NewsLandingPage } from "@/components/article/NewsLandingPage";
import { getPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Tin tức Vị Quê Việt", "Cập nhật câu chuyện về sản phẩm, hoạt động doanh nghiệp, quy trình sản xuất, ẩm thực và hành trình gìn giữ hương vị quê nhà.", "/tin-tuc", "/images/news/news-hero-factory.webp");
export default function NewsPage() {
  const articles = getPosts().map((post, index) => ({ slug: post.slug, title: post.title, excerpt: post.excerpt, category: post.category, publishedAt: post.publishedAt, image: post.cover, featured: index === 0 }));
  return <NewsLandingPage articles={articles} />;
}
