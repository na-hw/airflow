import ProductDetailContent from "./ProductDetailContent";
import productsDetail from "@/data/products-detail.json";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl, alternatesFor } from "@/lib/seo";

type Slug = keyof (typeof productsDetail)["fa"];

export function generateStaticParams() {
  return (Object.keys(productsDetail.fa) as Slug[]).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  /* Read the requested locale, not a hardcoded one, so /en pages get English
     titles and descriptions. */
  const product = productsDetail[l]?.[slug as Slug] ?? productsDetail.fa[slug as Slug];
  if (!product) return {};

  const path = `/products/${slug}`;
  const title = `${product.name} ${product.model}`;

  return {
    title,
    description: product.description,
    alternates: alternatesFor(l, path),
    openGraph: {
      type: "article",
      title,
      description: product.description,
      url: absoluteUrl(l, path),
      images: product.images?.length
        ? [{ url: product.images[0].src, alt: product.images[0].alt }]
        : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!productsDetail.fa[slug as Slug]) notFound();

  return <ProductDetailContent slug={slug as Slug} />;
}
