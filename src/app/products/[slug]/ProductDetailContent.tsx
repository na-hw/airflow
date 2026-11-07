"use client";

import ProductDetailClient from "@/components/products/ProductDetailClient/ProductDetailClient";
import { useLanguage } from "@/context/LanguageContext";
import type productsDetailRaw from "@/data/products-detail.json";
import productsPageRaw from "@/data/products-page.json";
import type { Bilingual } from "@/types";

type ProductDetail = (typeof productsDetailRaw)["fa"][keyof (typeof productsDetailRaw)["fa"]];

interface Props {
  slug: string;
  product: Bilingual<ProductDetail>;
}

export default function ProductDetailContent({ slug, product: bilingualProduct }: Props) {
  const { lang } = useLanguage();

  const product = bilingualProduct[lang];
  const t = productsPageRaw[lang].detail;

  const breadcrumb = [
    { label: t.breadcrumb.home, href: "/" },
    { label: t.breadcrumb.products, href: "/products" },
    { label: `${product.name} ${product.model}`, href: `/products/${slug}` },
  ];

  const tabs = [
    { id: "specs", label: t.tabs.specs },
    { id: "dimensions", label: t.tabs.dimensions },
    { id: "documents", label: t.tabs.documents },
    { id: "faq", label: t.tabs.faq },
  ];

  return (
    <main>
      <ProductDetailClient
        breadcrumb={breadcrumb}
        name={product.name}
        model={product.model}
        description={product.description}
        features={product.features}
        images={product.images}
        cta={{
          inquiry: { label: t.cta.inquiry, href: "/#contact" },
          catalog: { label: t.cta.catalog, href: "#catalog" },
        }}
        tabs={tabs}
        specs={product.specs}
        faq={product.faq}
        dimensionsNote={t.dimensionsNote}
        documents={t.documents}
        downloadLabel={t.downloadLabel}
      />
    </main>
  );
}
