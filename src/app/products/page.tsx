import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { getAllProductCardTiles } from '@/lib/productCardInfo';
import ProductsContent from './ProductsContent';

export const metadata: Metadata = pageMetadata({
  title: 'محصولات',
  description:
    'مجموعه کامل محصولات توزیع هوا: دریچه‌های سقفی و خطی، دمپرها، کلاهک دودکش، دریچه فن‌کویل و تجهیزات جانبی.',
  path: '/products',
});

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Reading the category here (instead of useSearchParams in the client)
  // lets the full product grid render on the server, already filtered.
  const { category } = await searchParams;
  const initialCategory = typeof category === 'string' ? category : undefined;

  return (
    <ProductsContent
      // Remount when a link navigates to another category.
      key={initialCategory ?? 'all'}
      cardTiles={getAllProductCardTiles()}
      initialCategory={initialCategory}
    />
  );
}
