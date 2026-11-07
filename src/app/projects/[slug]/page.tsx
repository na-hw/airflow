import { existsSync } from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProjectDetailContent, { type ProjectDetail } from './ProjectDetailContent';
import projectsDetail from '@/data/projects-detail.json';

type Slug = keyof (typeof projectsDetail)['fa'];

const FALLBACK_IMAGE = '/images/project-placeholder.svg';

const isSlug = (slug: string): slug is Slug => slug in projectsDetail.fa;

/** Pages are prerendered, so this file check runs once at build time. */
function withExistingImage(project: ProjectDetail): ProjectDetail {
  const exists = existsSync(path.join(process.cwd(), 'public', project.image));
  return exists ? project : { ...project, image: FALLBACK_IMAGE };
}

export function generateStaticParams() {
  return (Object.keys(projectsDetail.fa) as Slug[]).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  const project = projectsDetail.fa[slug];
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();

  // Only this project's entries reach the client, not every case study.
  return (
    <ProjectDetailContent
      slug={slug}
      project={{
        fa: withExistingImage(projectsDetail.fa[slug]),
        en: withExistingImage(projectsDetail.en[slug]),
      }}
    />
  );
}
