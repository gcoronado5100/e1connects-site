import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Every page of the site is public and may be read by search engines and by
 * the reviewers of Google and Microsoft.
 *
 * @author Gabriel Coronado
 * @since main
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
