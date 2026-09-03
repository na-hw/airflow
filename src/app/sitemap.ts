import productsDetail from "@/data/products-detail.json";
import projectsDetail from "@/data/projects-detail.json";
import { BCP47 } from "@/i18n/bcp47";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

type Entry = MetadataRoute.Sitemap[number];

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: Entry["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" },
  { path: "/projects", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.6, changeFrequency: "monthly" },
];

/* One entry per locale, each carrying the full set of language alternates —
   the sitemap equivalent of the hreflang tags in the page head. */
function entriesFor(path: string, priority: number, changeFrequency: Entry["changeFrequency"], lastModified: Date): Entry[] {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [BCP47[l], absoluteUrl(l, path)]),
  );

  return routing.locales.map((locale) => ({
    url: absoluteUrl(locale, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...STATIC_ROUTES.flatMap((r) => entriesFor(r.path, r.priority, r.changeFrequency, lastModified)),
    ...Object.keys(productsDetail.fa).flatMap((slug) =>
      entriesFor(`/products/${slug}`, 0.7, "monthly", lastModified),
    ),
    ...Object.keys(projectsDetail.fa).flatMap((slug) =>
      entriesFor(`/projects/${slug}`, 0.6, "monthly", lastModified),
    ),
  ];
}
