import type { MetadataRoute } from "next";
import { tanques } from "@/content/tanques";
export const dynamic = "force-static";
const URL = "https://tanques-alfa.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/empresa/", "/galeria/", "/contato/", ...tanques.map((t) => `/tanques/${t.slug}/`)].map((p) => ({ url: URL + p, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
