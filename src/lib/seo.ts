import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/constants';

interface PageSeo {
  /** Persian title; the root layout appends the site name. */
  title: string;
  description: string;
  /** Path of the page, e.g. `/products`. */
  path: string;
  /** Share image; defaults to the site-wide one. */
  image?: string;
}

/**
 * Metadata for one page. Next replaces (not merges) `openGraph` from the
 * layout, so every page sets the full block with its own URL and canonical.
 */
export function pageMetadata({ title, description, path, image = SITE_CONFIG.ogImage }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: SITE_CONFIG.locale,
      siteName: SITE_CONFIG.name,
      url: path,
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      images: [image],
    },
  };
}

/** Serializes structured data for a `<script type="application/ld+json">`; escaping `<` keeps content from closing the tag. */
export function toJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
