import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ProjectsContent from './ProjectsContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "projects", "/projects");
}

export default function ProjectsPage() {
  return <ProjectsContent />;
}
