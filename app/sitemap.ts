import type { MetadataRoute } from "next";
import { tanques } from "@/content/tanques";
import { posts } from "@/content/blog";
export const dynamic = "force-static";
const URL = "https://tanques-alfa.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/empresa/", "/galeria/", "/contato/", "/blog/", ...tanques.map((t) => `/tanques/${t.slug}/`), ...posts.map((p) => `/blog/${p.slug}/`)].map((p) => ({ url: URL + p, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
