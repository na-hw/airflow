import ProductDetailContent from "./ProductDetailContent";
import productsDetail from "@/data/products-detail.json";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
  return {
    title: `${product.name} ${product.model}`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();

  // Only this product's entries reach the client, not the whole catalog.
  return (
    <ProductDetailContent
      slug={slug}
      product={{ fa: productsDetail.fa[slug], en: productsDetail.en[slug] }}
    />
  );
}
