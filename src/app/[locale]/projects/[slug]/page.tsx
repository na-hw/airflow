import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectDetailContent, { type Slug } from './ProjectDetailContent';
import projectsDetail from '@/data/projects-detail.json';
import type { Locale } from '@/i18n/routing';
import { absoluteUrl, alternatesFor } from '@/lib/seo';

export function generateStaticParams() {
  return (Object.keys(projectsDetail.fa) as Slug[]).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; slug: string }> }
): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  /* Read the requested locale, not a hardcoded one, so /en pages get English
     titles and descriptions. */
  const project = projectsDetail[l]?.[slug as Slug] ?? projectsDetail.fa[slug as Slug];
  if (!project) return {};

  const path = `/projects/${slug}`;

  return {
    title: project.title,
    description: project.description,
    alternates: alternatesFor(l, path),
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.description,
      url: absoluteUrl(l, path),
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!projectsDetail.fa[slug as Slug]) notFound();

  return <ProjectDetailContent slug={slug as Slug} />;
}
