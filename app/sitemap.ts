import type { MetadataRoute } from "next";
import { getPosts, getProducts } from "@/lib/content";
import { paginate } from "@/lib/pagination";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteConfig.url).toString();
  const staticPages = ["/", "/san-pham", "/oem-odm", "/nha-may", "/ve-vi-que-viet", "/tin-tuc", "/lien-he"];
  const productPages = getProducts().map((item) => `/san-pham/${item.slug}`);
  const productPagination = Array.from({ length: paginate(getProducts(), 1, 8).totalPages - 1 }, (_, index) => `/san-pham/page/${index + 2}`);
  const postPages = getPosts().map((item) => `/tin-tuc/${item.slug}`);
  const newsPagination = Array.from({ length: paginate(getPosts(), 1, 6).totalPages - 1 }, (_, index) => `/tin-tuc/page/${index + 2}`);
  return [...staticPages, ...productPages, ...productPagination, ...postPages, ...newsPagination].map((path) => ({ url: url(path), changeFrequency: path.includes("tin-tuc") ? "monthly" : "weekly", priority: path === "/" ? 1 : path.split("/").length <= 2 ? .8 : .6 }));
}
