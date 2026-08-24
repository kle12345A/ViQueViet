import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleShare } from "@/components/article/ArticleShare";
import { NewsletterForm } from "@/components/contact/NewsletterForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { getPost, getPosts } from "@/lib/content";
import type { Post } from "@/lib/content/types";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

const formatDate = (value: string) => new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${value}T00:00:00+07:00`));
const readingTime = (body: string) => Math.max(1, Math.ceil(body.replace(/[#>*_`-]/g, " ").split(/\s+/).filter(Boolean).length / 200));

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tin-tuc/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? pageMetadata(post.title, post.excerpt, `/tin-tuc/${post.slug}`, post.cover) : {};
}

export default async function ArticlePage({ params }: PageProps<"/tin-tuc/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const posts = getPosts();
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const newerPost = currentIndex > 0 ? posts[currentIndex - 1] : undefined;
  const olderPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined;
  const recommended = [...posts.filter((item) => item.slug !== post.slug && item.category === post.category), ...posts.filter((item) => item.slug !== post.slug && item.category !== post.category)].slice(0, 4);
  const featured = posts.filter((item) => item.slug !== post.slug).slice(0, 4);
  const categoryCounts = Array.from(new Set(posts.map((item) => item.category))).map((category) => ({ category, count: posts.filter((item) => item.category === category).length }));
  const tags = post.tags?.length ? post.tags : [post.category, "Vị Quê Việt"];
  const canonical = new URL(`/tin-tuc/${post.slug}`, siteConfig.url).toString();

  return (
    <main className="article-detail-page">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.excerpt, image: new URL(post.cover, siteConfig.url).toString(), datePublished: post.publishedAt, mainEntityOfPage: canonical, author: { "@type": "Organization", name: post.author }, publisher: { "@type": "Organization", name: siteConfig.name } }} />
      <div className="container article-detail-breadcrumb"><Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Tin tức", href: "/tin-tuc" }, { label: post.title }]} /></div>

      <div className="container article-detail-layout">
        <article className="article-detail-main">
          <header className="article-detail-header">
            <p className="article-detail-eyebrow">{post.category}</p>
            <h1>{post.title}</h1>
            <div className="article-detail-meta">
              <span><MetaIcon name="calendar" /><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></span>
              <span><MetaIcon name="clock" />{readingTime(post.body)} phút đọc</span>
              <span><MetaIcon name="author" />{post.author}</span>
            </div>
          </header>

          <figure className="article-detail-cover"><Image src={post.cover} alt={post.title} fill priority fetchPriority="high" sizes="(max-width: 900px) 100vw, 850px" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} /></figure>
          <p className="article-detail-lead">{post.excerpt}</p>
          <MarkdownContent source={post.body} hideFirstHeading />

          {post.tip ? <aside className="article-tip"><span aria-hidden="true">♧</span><p><strong>Mẹo nhỏ:</strong> {post.tip}</p></aside> : null}

          <div className="article-tags"><strong>Từ khóa:</strong><div>{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
          <ArticleShare title={post.title} />
          <nav className="article-neighbors" aria-label="Điều hướng bài viết">
            {olderPost ? <Neighbor post={olderPost} direction="previous" /> : <span />}
            {newerPost ? <Neighbor post={newerPost} direction="next" /> : <span />}
          </nav>
        </article>

        <aside className="article-detail-sidebar">
          <section className="article-sidebar-card article-categories">
            <h2><span aria-hidden="true">⌑</span> Danh mục tin tức</h2>
            <Link className="is-active" href="/tin-tuc"><span>Tất cả</span><b>{posts.length}</b></Link>
            {categoryCounts.map((item) => <Link href="/tin-tuc" key={item.category}><span>{item.category}</span><b>{item.count}</b></Link>)}
          </section>

          <section className="article-sidebar-card article-sidebar-newsletter">
            <span className="article-sidebar-mail" aria-hidden="true">✉</span>
            <h2>Nhận tin tức mới nhất</h2>
            <p>Đăng ký để nhận thông tin sản phẩm mới và những câu chuyện từ Vị Quê Việt.</p>
            <NewsletterForm variant="stacked" />
          </section>

          <section className="article-sidebar-card article-featured-list">
            <h2><span aria-hidden="true">☆</span> Bài viết nổi bật</h2>
            {featured.map((item) => <MiniArticle post={item} key={item.slug} />)}
          </section>
        </aside>
      </div>

      <section className="article-related-section">
        <div className="container">
          <div className="article-related-heading"><p>Có thể bạn quan tâm</p><span /></div>
          <div className="article-related-grid">{recommended.map((item) => <RelatedArticle post={item} key={item.slug} />)}</div>
        </div>
      </section>
    </main>
  );
}

function MetaIcon({ name }: { name: "calendar" | "clock" | "author" }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{name === "calendar" ? <><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4m8-4v4M4 10h16"/></> : name === "clock" ? <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></> : <><circle cx="12" cy="8" r="3"/><path d="M5 21c0-5 2.5-8 7-8s7 3 7 8"/></>}</svg>;
}

function Neighbor({ post, direction }: { post: Post; direction: "previous" | "next" }) {
  return <Link className={direction === "next" ? "is-next" : ""} href={`/tin-tuc/${post.slug}`}><span>{direction === "previous" ? "← Bài viết trước" : "Bài viết tiếp theo →"}</span><div><Image src={post.cover} alt="" width={84} height={62} /><strong>{post.title}</strong></div></Link>;
}

function MiniArticle({ post }: { post: Post }) {
  return <Link className="article-mini" href={`/tin-tuc/${post.slug}`}><Image src={post.cover} alt="" width={92} height={72} /><span><strong>{post.title}</strong><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></span></Link>;
}

function RelatedArticle({ post }: { post: Post }) {
  return <article className="article-related-card"><Link href={`/tin-tuc/${post.slug}`} className="article-related-image" tabIndex={-1} aria-hidden="true"><Image src={post.cover} alt="" fill sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 25vw" /></Link><div><p><span>{post.category}</span> · <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></p><h3><Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link></h3></div></article>;
}
