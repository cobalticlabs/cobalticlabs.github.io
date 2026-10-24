import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { work } from "@/content/work";
import { absoluteUrl } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...work.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}/`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: absoluteUrl("/blog/"),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}/`),
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
