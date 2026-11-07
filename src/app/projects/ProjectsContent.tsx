'use client';

import { useLanguage } from '@/context/LanguageContext';
import ProjectsPageClient from '@/components/projects/ProjectsPageClient/ProjectsPageClient';
import type { Bilingual, Project } from '@/types';
import projectsRaw from '@/data/projects.json';
import pageRaw from '@/data/projects-page.json';

type ProjectsData = typeof projectsRaw.fa;
type PageData = typeof pageRaw.fa;

export default function ProjectsContent() {
  const { lang } = useLanguage();

  const projects = (projectsRaw as unknown as Bilingual<ProjectsData>)[lang];
  const page     = (pageRaw     as unknown as Bilingual<PageData>)[lang];

  return (
    <main>
      <ProjectsPageClient
        breadcrumb={page.header.breadcrumb}
        pageTitle={page.header.title}
        pageLabel={page.header.label}
        pageDescription={page.header.description}
        tabs={page.tabs}
        items={projects.items as unknown as Project[]}
      />
    </main>
  );
}
