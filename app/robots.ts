import type { MetadataRoute } from "next";
import { BASE_URL } from "@/constants/config";

export default function robots(): MetadataRoute.Robots {
  const base = BASE_URL ?? "https://hansnetlogistics.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
