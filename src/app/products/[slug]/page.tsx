import ProductDetailContent from "./ProductDetailContent";
import productsDetail from "@/data/products-detail.json";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/constants";
import { pageMetadata, toJsonLd } from "@/lib/seo";

type Slug = keyof (typeof productsDetail)["fa"];

const isSlug = (slug: string): slug is Slug => slug in productsDetail.fa;

export function generateStaticParams() {
  return (Object.keys(productsDetail.fa) as Slug[]).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  const product = productsDetail.fa[slug];
  return pageMetadata({
    title: `${product.name} ${product.model}`,
    description: product.description,
    path: `/products/${slug}`,
    image: product.images[0]?.src,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();

  const product = productsDetail.fa[slug];
  // Lets search engines show the product as a rich result.
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} ${product.model}`,
    model: product.model,
    description: product.description,
    image: product.images.map((image) => `${SITE_CONFIG.url}${image.src}`),
    url: `${SITE_CONFIG.url}/products/${slug}`,
    brand: { "@type": "Brand", name: SITE_CONFIG.name },
  };

  // Only this product's entries reach the client, not the whole catalog.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(productJsonLd) }}
      />
      <ProductDetailContent
        slug={slug}
        product={{ fa: product, en: productsDetail.en[slug] }}
      />
    </>
  );
}
