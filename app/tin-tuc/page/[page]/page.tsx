import { permanentRedirect } from "next/navigation";
import { getPosts } from "@/lib/content";
import { paginate } from "@/lib/pagination";
export const dynamicParams = false;
export function generateStaticParams() { const total = paginate(getPosts(), 1, 6).totalPages; return Array.from({ length: total - 1 }, (_, index) => ({ page: String(index + 2) })); }
export default function NewsPaginationPage() { permanentRedirect("/tin-tuc"); }
