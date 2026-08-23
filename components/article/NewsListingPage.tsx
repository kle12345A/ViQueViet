import { ArticleCard } from "./ArticleCard";
import { Pagination } from "@/components/ui/Pagination";
import { getPosts } from "@/lib/content";
import { paginate } from "@/lib/pagination";

export function NewsListingPage({ page }: { page: number }) { const result = paginate(getPosts(), page, 6); return <section className="section"><div className="container"><div className="article-grid">{result.items.map((post) => <ArticleCard key={post.slug} post={post} />)}</div><Pagination current={result.page} total={result.totalPages} basePath="/tin-tuc" /></div></section>; }
