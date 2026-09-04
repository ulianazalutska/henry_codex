import type { MetadataRoute } from "next";
import { blogPosts } from "./blog-data";
import { collections } from "./collections-data";
import { siteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/kolekcje`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/personalizacja`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/filozofia-henry`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/kontakt`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const collectionPages: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${siteUrl}/kolekcje/${collection.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = collections.flatMap((collection) =>
    collection.products.map((product) => ({
      url: `${siteUrl}/kolekcje/${collection.slug}/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...collectionPages, ...productPages, ...blogPages];
}
