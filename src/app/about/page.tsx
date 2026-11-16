import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import AboutContent from './AboutContent';

export const metadata: Metadata = pageMetadata({
  title: 'درباره ما',
  description:
    'ایرفلو سیستم؛ بیش از ۱۸ سال تجربه در طراحی، تولید و اجرای سیستم‌های توزیع هوا برای پروژه‌های تجاری، صنعتی و درمانی.',
  path: '/about',
});

export default function AboutPage() {
  return <AboutContent />;
}
