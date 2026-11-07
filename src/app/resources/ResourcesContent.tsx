"use client";

import Resources from "@/components/home/Resources/Resources";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import Container from "@/components/shared/Container/Container";
import { useLanguage } from "@/context/LanguageContext";
import resourcesRaw from "@/data/resources.json";
import type { Bilingual, ResourcesData } from "@/types";


const labels = {
  fa: { title: "منابع فنی", home: "خانه" },
  en: { title: "Technical Resources", home: "Home" },
};

export default function ResourcesContent() {
  const { lang, dir } = useLanguage();

  const resources = (resourcesRaw as unknown as Bilingual<ResourcesData>)[lang];
  const t = labels[lang];

  return (
    <main>
      <div
        style={{
          background: "var(--color-bg-secondary)",
          paddingTop: "calc(var(--header-height) + var(--space-10))",
          paddingBottom: "2rem",
          borderBottom: "1px solid var(--color-border)",
          direction: dir,
        }}
      >
        <Container>
          <h1
            style={{
              fontSize: "var(--text-4xl)",
              fontWeight: "var(--font-bold)",
              color: "var(--color-text-primary)",
              margin: "0 0 0.75rem",
            }}
          >
            {t.title}
          </h1>
          <Breadcrumb
            items={[
              { label: t.home, href: "/" },
              { label: t.title, href: "/resources" },
            ]}
          />
        </Container>
      </div>
      <Resources data={resources} />
    </main>
  );
}
