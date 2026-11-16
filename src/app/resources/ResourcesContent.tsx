"use client";

import Resources from "@/components/home/Resources/Resources";
import PageBanner from "@/components/shared/PageBanner/PageBanner";
import { useLanguage } from "@/context/LanguageContext";
import resourcesRaw from "@/data/resources.json";
import type { Bilingual, ResourcesData } from "@/types";

const LABELS = {
  fa: { title: "منابع فنی", home: "خانه" },
  en: { title: "Technical Resources", home: "Home" },
};

export default function ResourcesContent() {
  const { lang } = useLanguage();
  const resources = (resourcesRaw as unknown as Bilingual<ResourcesData>)[lang];
  const t = LABELS[lang];

  return (
    <main>
      <PageBanner
        breadcrumb={[
          { label: t.home, href: "/" },
          { label: t.title, href: "/resources" },
        ]}
        label={resources.section.tag}
        title={t.title}
        description={resources.section.subtitle}
        image="/images/banners/hero-products.webp"
        variant="wide"
      />
      {/* The banner already names the page, so the section skips its own heading. */}
      <Resources data={resources} showHeader={false} />
    </main>
  );
}
