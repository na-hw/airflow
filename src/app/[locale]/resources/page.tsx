import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ResourcesContent from './ResourcesContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "resources", "/resources");
}

export default function ResourcesPage() {
  return <ResourcesContent />;
}
