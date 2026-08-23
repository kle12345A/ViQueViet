import "server-only";

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parseContent } from "./parser";
import type { Post, Product } from "./types";

const contentRoot = join(process.cwd(), "content");

function readCollection<T>(folder: string): T[] {
  const directory = join(contentRoot, folder);
  return readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const parsed = parseContent(readFileSync(join(directory, file), "utf8"));
      return { ...parsed.data, body: parsed.body } as T;
    });
}

export function getProducts(): Product[] {
  return readCollection<Product>("products")
    .filter((item) => item.status === "published")
    .map((item) => ({
      ...item,
      badges: item.badges.filter(Boolean),
      gallery: item.gallery.filter(Boolean),
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProduct(slug: string) {
  return getProducts().find((item) => item.slug === slug);
}

export function getPosts(): Post[] {
  return readCollection<Post>("posts")
    .filter((item) => item.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPost(slug: string) {
  return getPosts().find((item) => item.slug === slug);
}
