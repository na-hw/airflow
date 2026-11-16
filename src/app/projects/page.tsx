import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ProjectsContent from './ProjectsContent';

export const metadata: Metadata = pageMetadata({
  title: 'پروژه‌ها',
  description:
    'منتخبی از پروژه‌های موفق ایرفلو سیستم در سراسر ایران؛ از مراکز تجاری و بیمارستان‌ها تا مجتمع‌های اداری و صنعتی.',
  path: '/projects',
});

export default function ProjectsPage() {
  return <ProjectsContent />;
}
