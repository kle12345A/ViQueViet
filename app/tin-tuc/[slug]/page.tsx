import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article/ArticleCard";
import { CTASection } from "@/components/brand/CTASection";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPost, getPosts } from "@/lib/content";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams() { return getPosts().map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: PageProps<"/tin-tuc/[slug]">): Promise<Metadata> { const post = getPost((await params).slug); return post ? pageMetadata(post.title, post.excerpt, `/tin-tuc/${post.slug}`, post.cover) : {}; }
export default async function ArticlePage({ params }: PageProps<"/tin-tuc/[slug]">) { const post = getPost((await params).slug); if (!post) notFound(); const related = getPosts().filter((item) => item.slug !== post.slug).slice(0, 3); return <><JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: post.title, image: new URL(post.cover, siteConfig.url).toString(), datePublished: post.publishedAt, author: { "@type": "Organization", name: post.author }, publisher: { "@type": "Organization", name: siteConfig.name } }} /><div className="container"><Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Tin tức", href: "/tin-tuc" }, { label: post.title }]} /><header className="article-header"><p className="eyebrow">{post.category} · {new Intl.DateTimeFormat("vi-VN").format(new Date(`${post.publishedAt}T00:00:00+07:00`))}</p><h1>{post.title}</h1><p>{post.excerpt}</p></header></div><div className="article-cover"><Image src={post.cover} alt={post.title} fill loading="eager" fetchPriority="high" sizes="(max-width: 1100px) 100vw, 1060px" /></div><section className="section" style={{ paddingTop: 0 }}><div className="container article-layout"><MarkdownContent source={post.body} /><aside className="article-aside"><p><strong>Tác giả</strong><br />{post.author}</p><p>Nội dung mang tính tham khảo. Hãy đọc hướng dẫn trên bao bì của từng sản phẩm.</p></aside></div></section><section className="section section-soft"><div className="container"><SectionHeading eyebrow="Đọc tiếp" title="Bài viết liên quan" /><div className="article-grid">{related.map((item) => <ArticleCard post={item} key={item.slug} />)}</div></div></section><CTASection /></>; }
