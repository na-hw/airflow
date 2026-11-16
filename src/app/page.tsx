import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/constants';
import { pageMetadata } from '@/lib/seo';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  ...pageMetadata({ title: SITE_CONFIG.tagline, description: SITE_CONFIG.description, path: '/' }),
  // The home page leads with the brand name instead of the title template.
  title: { absolute: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}` },
};

export default function HomePage() {
  return <HomeContent />;
}
