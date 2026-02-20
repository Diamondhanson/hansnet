import type { MetadataRoute } from "next";
import { BASE_URL } from "@/constants/config";

const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/contact",
  "/faq",
  "/quote",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BASE_URL ?? "https://hansnetlogistics.com";

  return STATIC_PATHS.map((path) => {
    const changeFreq: "weekly" | "monthly" | "yearly" =
      path === "" ? "weekly" : path === "/services" || path === "/about" ? "monthly" : "yearly";
    return {
      url: `${base}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency: changeFreq,
      priority: path === "" ? 1 : 0.8,
    };
  });
}
