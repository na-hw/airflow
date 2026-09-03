import { SITE_CONFIG } from "@/constants";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

/**
 * Organization schema for the site root.
 *
 * Emitted as a plain <script> rather than next/script so the JSON is part of
 * the server-rendered HTML, which is what crawlers parse.
 */
export default async function StructuredData({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "siteMeta" });

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t("name"),
    alternateName: "Airflow System",
    url: absoluteUrl(locale),
    logo: `${SITE_CONFIG.url}/icons/airflow-logo.svg`,
    description: t("description"),
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address,
      addressLocality: "Tehran",
      addressCountry: "IR",
    },
    areaServed: { "@type": "Country", name: "Iran" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
