"use client";

import AboutIntro from "@/components/about/AboutIntro/AboutIntro";
import AboutValues from "@/components/about/AboutValues/AboutValues";
import PageBanner from "@/components/shared/PageBanner/PageBanner";
import { useLanguage } from "@/context/LanguageContext";
import aboutRaw from "@/data/about.json";
import type { Bilingual } from "@/types";

type AboutData = typeof aboutRaw.fa;

export default function AboutContent() {
  const { lang } = useLanguage();

  const about = (aboutRaw as unknown as Bilingual<AboutData>)[lang];

  return (
    <main>
      <PageBanner
        breadcrumb={about.breadcrumb}
        label={about.banner.label}
        title={about.banner.title}
        description={about.banner.description}
        image={about.banner.image}
        imageAlt={about.banner.imageAlt}
      />
      <AboutIntro
        title={about.intro.title}
        paragraphs={about.intro.paragraphs}
        button={about.intro.button}
        image={about.intro.image}
        imageAlt={about.intro.imageAlt}
        stats={about.intro.stats}
      />
      <AboutValues title={about.values.title} items={about.values.items} />
    </main>
  );
}
