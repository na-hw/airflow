import { SITE_CONFIG } from "@/constants";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* design-system is an internal reference page; it also sets noindex. */
      disallow: ["/api/", "/design-system", "/en/design-system"],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
