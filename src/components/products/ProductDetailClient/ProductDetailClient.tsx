"use client";

import type { BreadcrumbItem } from "@/components/shared/Breadcrumb/Breadcrumb";
import Breadcrumb from "@/components/shared/Breadcrumb/Breadcrumb";
import Button from "@/components/shared/Button/Button";
import Container from "@/components/shared/Container/Container";
import Icon from "@/components/shared/Icon/Icon";
import ImageGallery from "@/components/shared/ImageGallery/ImageGallery";
import Tabs from "@/components/shared/Tabs/Tabs";
import { SITE_CONFIG } from "@/constants";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import styles from "./ProductDetailClient.module.css";

/* ─── Types ───────────────────────────────────────────────── */
interface Feature {
  icon: string;
  label: string;
}
interface CtaConfig {
  label: string;
  href: string;
}
interface Tab {
  id: string;
  label: string;
}
interface SpecItem {
  label: string;
  value: string;
}
interface FaqItem {
  question: string;
  answer: string;
}
interface ImageItem {
  src: string;
  alt: string;
}
interface DocumentItem {
  name: string;
  size: string;
  type: string;
}

interface Props {
  breadcrumb: BreadcrumbItem[];
  name: string;
  model: string;
  description: string;
  features: Feature[];
  images: ImageItem[];
  cta: { inquiry: CtaConfig; catalog: CtaConfig };
  tabs: Tab[];
  specs: SpecItem[];
  faq: FaqItem[];
  dimensionsNote: string;
  documents: DocumentItem[];
  downloadLabel: string;
}

export default function ProductDetailClient({
  breadcrumb,
  name,
  model,
  description,
  features,
  images,
  cta,
  tabs,
  specs,
  faq,
  dimensionsNote,
  documents,
  downloadLabel,
}: Props) {
  const { lang } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const half = Math.ceil(specs.length / 2);
  const specsLeft = specs.slice(0, half);
  const specsRight = specs.slice(half);

  // The page URL is only known in the browser, so it is appended on click.
  // Rendering it into `href` would make server and client HTML differ.
  const buildWhatsappHref = (pageUrl?: string) => {
    const message =
      lang === "fa"
        ? `سلام، من به محصول ${name} ${model} علاقه‌مندم و می‌خواهم استعلام قیمت بگیرم.`
        : `Hello, I'm interested in ${name} ${model} and would like to request a quote.`;
    const text = pageUrl ? `${message}\n${pageUrl}` : message;
    return `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      {/* ─── Breadcrumb ──────────────────────────────────────── */}
      <div className={styles.breadcrumbBar}>
        <Container>
          <Breadcrumb items={breadcrumb} />
        </Container>
      </div>

      {/* ─── Product Hero ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroGrid}>
            {/* Info Column */}
            <div className={styles.infoCol}>
              <h1 className={styles.productName}>{name}</h1>
              <div className={styles.modelTag}>{model}</div>
              <p className={styles.description}>{description}</p>

              {/* Features Grid */}
              <div className={styles.featuresGrid}>
                {features.map((f) => (
                  <div key={f.label} className={styles.featureItem}>
                    <span className={styles.featureIcon}>
                      <Icon name={f.icon} size={20} />
                    </span>
                    <span className={styles.featureLabel}>{f.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className={styles.ctaButtons}>
                <Button
                  href={buildWhatsappHref()}
                  variant="primary"
                  size="lg"
                  iconStart={<Icon name="whatsapp" size={18} />}
                  onClick={(e) => {
                    e.preventDefault();
                    const pageUrl = `${window.location.origin}${window.location.pathname}`;
                    window.open(buildWhatsappHref(pageUrl), "_blank", "noopener,noreferrer");
                  }}
                >
                  {cta.inquiry.label}
                </Button>
                <Button
                  href={cta.catalog.href}
                  variant="outline"
                  size="lg"
                  iconStart={<Icon name="download" size={18} />}
                >
                  {cta.catalog.label}
                </Button>
              </div>
            </div>

            {/* Image Column */}
            <div className={styles.imageCol}>
              <ImageGallery images={images} />
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Tabs Section ─────────────────────────────────────── */}
      <section className={styles.tabsSection}>
        <Container>
          <Tabs tabs={tabs} defaultTab="specs">
            {(activeTab) => (
              <>
                {activeTab === "specs" && (
                  <div className={styles.specsGrid}>
                    <SpecTable rows={specsLeft} />
                    <SpecTable rows={specsRight} />
                  </div>
                )}

                {activeTab === "dimensions" && (
                  <div className={styles.dimensionsPane}>
                    <div className={styles.dimPlaceholder}>
                      <Image
                        src="/images/dimensions-diagram.svg"
                        alt=""
                        fill
                        unoptimized
                        className={styles.dimSvg}
                      />
                    </div>
                    <p className={styles.dimNote}>{dimensionsNote}</p>
                  </div>
                )}

                {activeTab === "documents" && (
                  <div className={styles.documentsPane}>
                    {documents.map((doc) => (
                      <div key={doc.name} className={styles.docItem}>
                        <span className={styles.docIcon}>
                          <Icon name="file-pdf" />
                        </span>
                        <div className={styles.docInfo}>
                          <span className={styles.docName}>{doc.name}</span>
                          <span className={styles.docMeta}>
                            {doc.type} · {doc.size}
                          </span>
                        </div>
                        <button
                          className={styles.docDownload}
                          aria-label={downloadLabel.replace("{name}", doc.name)}
                        >
                          <Icon name="download" size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "faq" && (
                  <div className={styles.faqPane}>
                    {faq.map((item, i) => (
                      <div key={i} className={styles.faqItem}>
                        <button
                          className={[
                            styles.faqQuestion,
                            openFaq === i ? styles.faqOpen : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        >
                          <span>{item.question}</span>
                          <span className={styles.faqChevron}>
                            <Icon name="chevron-down" size={18} />
                          </span>
                        </button>
                        <AnimatePresence>
                          {openFaq === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                              style={{ overflow: "hidden" }}
                            >
                              <p className={styles.faqAnswer}>{item.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </Tabs>
        </Container>
      </section>
    </>
  );
}

function SpecTable({ rows }: { rows: SpecItem[] }) {
  return (
    <table className={styles.specTable}>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className={styles.specRow}>
            <td className={styles.specLabel}>{row.label}</td>
            <td className={styles.specValue}>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
