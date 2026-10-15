import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * The pages of the site for search engines. The date is the day the policies
 * took effect, not the day of the build, so the file does not change on its
 * own.
 *
 * @author Gabriel Coronado
 * @since main
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = site.legal.effective;

  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];
}
