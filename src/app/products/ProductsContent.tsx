'use client';

import { useLanguage } from '@/context/LanguageContext';
import ProductsPageClient from '@/components/products/ProductsPageClient/ProductsPageClient';
import type { ProductCardTilesById } from '@/lib/productCardInfo';
import pageRaw from '@/data/products-page.json';
import type { Bilingual } from '@/types';

interface Props {
  cardTiles: Bilingual<ProductCardTilesById>;
  initialCategory?: string;
}

export default function ProductsContent({ cardTiles, initialCategory }: Props) {
  const { lang } = useLanguage();
  const page = pageRaw[lang];

  return (
    <main>
      <ProductsPageClient
        breadcrumb={page.header.breadcrumb}
        pageTitle={page.header.title}
        tabs={page.tabs}
        items={page.items}
        cta={page.cta}
        cardTiles={cardTiles[lang]}
        initialCategory={initialCategory}
      />
    </main>
  );
}
