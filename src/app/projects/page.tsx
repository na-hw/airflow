import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ProjectsContent from './ProjectsContent';

export const metadata: Metadata = pageMetadata({
  title: 'پروژه‌ها',
  description:
    'منتخبی از پروژه‌های موفق ایرفلو سیستم در سراسر ایران؛ از مراکز تجاری و بیمارستان‌ها تا مجتمع‌های اداری و صنعتی.',
  path: '/projects',
});

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Lets links such as the footer's open the page already filtered.
  const { category } = await searchParams;
  const initialCategory = typeof category === 'string' ? category : undefined;

  // Remount when a link navigates to another category.
  return <ProjectsContent key={initialCategory ?? 'all'} initialCategory={initialCategory} />;
}
