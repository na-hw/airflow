import type { Metadata } from 'next';
import { getAllProductCardTiles } from '@/lib/productCardInfo';
import ProductsContent from './ProductsContent';

export const metadata: Metadata = {
  title: 'Products | محصولات',
  description: 'A complete range of air distribution products — diffusers, dampers, control equipment and accessories.',
};

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
