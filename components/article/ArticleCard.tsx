import Image from "next/image";
import Link from "next/link";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image";
import type { Post } from "@/lib/content/types";

const formatDate = (value: string) => new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(`${value}T00:00:00+07:00`));

export function ArticleCard({ post }: { post: Post }) {
  return (
    <article className="article-card">
      <Link href={`/tin-tuc/${post.slug}`} className="article-image" tabIndex={-1} aria-hidden="true"><Image src={post.cover} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" placeholder="blur" blurDataURL={IMAGE_BLUR_DATA_URL} /></Link>
      <div className="article-card-body"><p className="article-meta"><span>{post.category}</span><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></p><h3><Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><Link className="text-link" href={`/tin-tuc/${post.slug}`}>Đọc bài viết →</Link></div>
    </article>
  );
}
