import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/constants';
import productsDetail from '@/data/products-detail.json';
import projectsDetail from '@/data/projects-detail.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_CONFIG.url}${path}`;

  return [
    { url: url('/'), changeFrequency: 'monthly', priority: 1 },
    { url: url('/products'), changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/projects'), changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/about'), changeFrequency: 'yearly', priority: 0.6 },
    { url: url('/resources'), changeFrequency: 'monthly', priority: 0.6 },
    ...Object.keys(productsDetail.fa).map((slug) => ({
      url: url(`/products/${slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...Object.keys(projectsDetail.fa).map((slug) => ({
      url: url(`/projects/${slug}`),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
