"use client";

import Logo from "@/components/layout/Logo/Logo";
import ContactDetail from "@/components/shared/ContactDetail/ContactDetail";
import Icon from "@/components/shared/Icon/Icon";
import { useLanguage } from "@/context/LanguageContext";
import footerRaw from "@/data/footer.json";
import type { Bilingual, FooterData } from "@/types";
import Link from "next/link";
import styles from "./Footer.module.css";


export default function Footer() {
  const { lang } = useLanguage();
  const data = (footerRaw as unknown as Bilingual<FooterData>)[lang];
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.inner}>
          {/* Company Column */}
          <div className={styles.companyCol}>
            <Logo
              name={data.company.name}
              subtitle="HVAC Solutions"
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
          {data.columns.map((col) => (
            <div key={col.id} className={styles.linkCol}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul className={styles.linkList}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

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
          <p className={styles.copyright}>{data.copyright}</p>
          <Link href="/" className={styles.termsLink}>
            {data.termsLink}
          </Link>
        </div>
      </div>
    </footer>
  );
}
