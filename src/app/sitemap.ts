import type { MetadataRoute } from "next";
import { incident } from "@/data/incident";
import { publicSite } from "@/data/public-site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: publicSite.url,
      lastModified: new Date(`${incident.lastReviewed}T00:00:00Z`),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
