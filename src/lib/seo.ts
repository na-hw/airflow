import { SITE_CONFIG } from "@/constants";
import { BCP47 } from "@/i18n/bcp47";
import { routing, type Locale } from "@/i18n/routing";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

/* localePrefix is "as-needed", so the default locale (fa) has no prefix:
   /about is Persian, /en/about is English. */
export function localizedPath(locale: Locale, path = ""): string {
  const clean = path === "/" ? "" : path;
  return locale === routing.defaultLocale ? clean || "/" : `/${locale}${clean}`;
}

export function absoluteUrl(locale: Locale, path = ""): string {
  const p = localizedPath(locale, path);
  return `${SITE_CONFIG.url}${p === "/" ? "" : p}`;
}

/**
 * canonical + hreflang for one page.
 *
 * Every page must declare the full set of language versions, each pointing at
 * the same set — otherwise Google ignores the annotations. x-default goes to
 * the Persian version, which is the primary audience.
 */
export function alternatesFor(locale: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};

  for (const l of routing.locales) {
    languages[BCP47[l]] = absoluteUrl(l, path);
  }
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);

  return {
    canonical: absoluteUrl(locale, path),
    languages,
  };
}

/**
 * Metadata for a standard content page: localized title/description from the
 * "pageMeta" namespace, plus canonical and hreflang for its path.
 */
export async function pageMetadata(
  locale: string,
  key: string,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pageMeta" });
  const l = locale as Locale;

  const title = t(`${key}.title`);
  const description = t(`${key}.description`);

  return {
    title,
    description,
    alternates: alternatesFor(l, path),
    openGraph: { title, description, url: absoluteUrl(l, path) },
  };
}
