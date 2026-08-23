export type FrontmatterValue = string | number | boolean | string[];

export type Product = {
  name: string;
  slug: string;
  category: string;
  categoryLabel: string;
  excerpt: string;
  weight: string;
  thumbnail: string;
  heroImage: string;
  featured: boolean;
  bestSeller: boolean;
  status: string;
  sortOrder: number;
  imagePending: boolean;
  badges: string[];
  gallery: string[];
  body: string;
};

export type Post = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  cover: string;
  publishedAt: string;
  author: string;
  status: string;
  body: string;
};

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  image: string;
  featured?: boolean;
};
