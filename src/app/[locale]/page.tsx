import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "home", "/");
}

export default function HomePage() {
  return <HomeContent />;
}
