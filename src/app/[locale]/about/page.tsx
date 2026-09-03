import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import AboutContent from './AboutContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "about", "/about");
}

export default function AboutPage() {
  return <AboutContent />;
}
