import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ResourcesContent from './ResourcesContent';

export const metadata: Metadata = pageMetadata({
  title: 'منابع فنی',
  description:
    'دانلود کاتالوگ محصولات، فایل‌های CAD، مدل‌های BIM، راهنمای نصب و استانداردهای ایرفلو سیستم.',
  path: '/resources',
});

export default function ResourcesPage() {
  return <ResourcesContent />;
}
