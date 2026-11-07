"use client";

import Logo from "@/components/layout/Logo/Logo";
import ContactDetail from "@/components/shared/ContactDetail/ContactDetail";
import Icon from "@/components/shared/Icon/Icon";
import { useLanguage, type Lang } from "@/context/LanguageContext";
import footerRaw from "@/data/footer.json";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Bilingual, FooterData } from "@/types";
import Link from "next/link";
import { useState } from "react";
import styles from "./Footer.module.css";

/** Current year in the calendar readers expect: Solar Hijri for Persian. */
function currentYear(lang: Lang): string {
  return lang === "fa"
    ? new Intl.DateTimeFormat("fa-IR-u-ca-persian", { year: "numeric" }).format(new Date())
    : String(new Date().getFullYear());
}

export default function Footer() {
  const { lang } = useLanguage();
  const data = (footerRaw as unknown as Bilingual<FooterData>)[lang];
  // On phones the link columns collapse into an accordion to shorten the page.
  const isCompact = useMediaQuery("(max-width: 480px)");
  const [openColumn, setOpenColumn] = useState<string | null>(null);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.inner}>
          {/* Company Column */}
          <div className={styles.companyCol}>
            <Logo
              name={data.company.name}
              subtitle={data.company.subtitle}
              size={40}
              className={styles.logoWrap}
            />
            <p className={styles.companyDesc}>{data.company.tagline}</p>
            <div className={styles.socials}>
              {data.company.socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  className={styles.socialLink}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {data.columns.map((col) => {
            const listId = `footer-links-${col.id}`;
            const open = !isCompact || openColumn === col.id;

            return (
              <div key={col.id} className={styles.linkCol}>
                {isCompact ? (
                  <h3 className={`${styles.colTitle} ${styles.colTitleCompact}`}>
                    <button
                      type="button"
                      className={styles.colToggle}
                      aria-expanded={open}
                      aria-controls={listId}
                      onClick={() => setOpenColumn(open ? null : col.id)}
                    >
                      {col.title}
                      <Icon
                        name="chevron-down"
                        size={16}
                        className={open ? styles.colChevronOpen : styles.colChevron}
                      />
                    </button>
                  </h3>
                ) : (
                  <h3 className={styles.colTitle}>{col.title}</h3>
                )}
                <ul id={listId} className={styles.linkList} hidden={!open}>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={styles.footerLink}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Contact Column */}
          <div className={styles.contactCol}>
            <h3 className={styles.colTitle}>{data.contact.title}</h3>
            <div className={styles.contactList}>
              {data.contact.items.map((item) => (
                <ContactDetail key={item.icon} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.bottomInner}>
          {/* The year is computed at render time; a static page built in an
              earlier year would otherwise trigger a hydration warning. */}
          <p className={styles.copyright} suppressHydrationWarning>
            {data.copyright.replace("{year}", currentYear(lang))}
          </p>
          <Link href="/" className={styles.termsLink}>
            {data.termsLink}
          </Link>
        </div>
      </div>
    </footer>
  );
}
