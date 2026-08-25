import type { MetadataRoute } from "next";
import { publicSite } from "@/data/public-site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${publicSite.url}/sitemap.xml`,
  };
}
