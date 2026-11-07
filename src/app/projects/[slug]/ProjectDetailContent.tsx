"use client";

import ProjectDetailClient from "@/components/projects/ProjectDetailClient/ProjectDetailClient";
import { useLanguage, type Lang } from "@/context/LanguageContext";
import productsCatalogRaw from "@/data/products.json";
import type projectsDetailRaw from "@/data/projects-detail.json";
import projectsPageRaw from "@/data/projects-page.json";
import type { Bilingual } from "@/types";

export type ProjectDetail =
  (typeof projectsDetailRaw)["fa"][keyof (typeof projectsDetailRaw)["fa"]];

const FALLBACK_PRODUCT_IMAGE = "/images/product-detail-placeholder.svg";

const FALLBACK_DESCRIPTION: Record<Lang, string> = {
  fa: "یکی از محصولات استاندارد استفاده‌شده در این پروژه، مطابق مشخصات فنی مورد نیاز طرح.",
  en: "One of the standard products used in this project, matching the technical specifications required by the design.",
};

function resolveProduct(label: string, lang: Lang) {
  const seriesMatch = label.match(/[A-Z]{2,3}(?:-\d+)?/);
  const series = seriesMatch?.[0];
  const catalogItem = series
    ? productsCatalogRaw[lang].items.find((item) =>
        item.series.toUpperCase().includes(series.split("-")[0]),
      )
    : undefined;

  return {
    name: label,
    model: series ?? label,
    description: catalogItem ? catalogItem.name : FALLBACK_DESCRIPTION[lang],
    image: catalogItem?.image ?? FALLBACK_PRODUCT_IMAGE,
    href: catalogItem ? `/products/${catalogItem.id}` : "/products",
  };
}

interface Props {
  slug: string;
  project: Bilingual<ProjectDetail>;
}

export default function ProjectDetailContent({ slug, project: bilingualProject }: Props) {
  const { lang } = useLanguage();

  const project = bilingualProject[lang];
  const t = projectsPageRaw[lang].detail;

  const breadcrumb = [
    { label: t.breadcrumb.home, href: "/" },
    { label: t.breadcrumb.projects, href: "/projects" },
    { label: project.title, href: `/projects/${slug}` },
  ];

  const meta = [
    { icon: "building", label: t.meta.area, value: project.area },
    { icon: "location", label: t.meta.location, value: project.location },
    { icon: "calendar", label: t.meta.year, value: project.year },
    { icon: "design", label: t.meta.category, value: project.category },
    { icon: "award", label: t.meta.status, value: project.status },
  ];

  return (
    <main>
      <ProjectDetailClient
        breadcrumb={breadcrumb}
        title={project.title}
        category={project.category}
        location={project.location}
        year={project.year}
        heroImage={project.image}
        meta={meta}
        description={project.description}
        scope={project.scope}
        products={project.products.map((p) => resolveProduct(p, lang))}
        highlights={project.highlights}
        sectionLabels={t.sections}
        serviceItems={t.serviceItems}
        modelLabel={t.modelLabel}
      />
    </main>
  );
}
